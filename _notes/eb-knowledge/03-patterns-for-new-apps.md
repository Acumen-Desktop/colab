# Patterns for Building New ElectroBun Apps

> Lessons from studying the Colab codebase for building your own EB app.

## Project Setup Checklist

1. **Create `electrobun.config.ts`** with app name, identifier, and build config
2. **Set up `src/main/index.ts`** as the main process entry
3. **Create renderer views** in `src/renderers/`
4. **Define RPC schema** in a shared `rpc.ts` file
5. **Configure copy rules** for HTML and static assets

---

## Main Process Patterns

### Entry Point Structure
```typescript
import Electrobun, { BrowserWindow, ApplicationMenu, Tray } from "electrobun";

// 1. Initialize database/persistence
const db = initDatabase();

// 2. Set up application menu
ApplicationMenu.setMenus([/* ... */]);
ApplicationMenu.on("application-menu-clicked", handleMenuAction);

// 3. Create main window
const mainWindow = new BrowserWindow({
  title: "My App",
  frame: { width: 1280, height: 800 },
  url: "views://main/index.html"
});

// 4. Set up RPC handlers (respond to renderer requests)
mainWindow.view.rpc.addRequestHandler("getState", async () => {
  return db.getState();
});

// 5. Register global shortcuts, tray, etc.
```

### Window Management Pattern
Colab uses a `workspaceWindows.ts` module to:
- Track all open windows
- Broadcast messages to all windows
- Find focused window for targeted messages

```typescript
// Pattern from Colab
export function broadcastToAllWindows(messageName: string, data: any) {
  for (const [id, win] of windowMap) {
    win.view.rpc.sendMessage(messageName, data);
  }
}

export function sendToFocusedWindow(messageName: string, data: any) {
  const focused = Array.from(windowMap.values()).find(w => w.isFocused());
  focused?.view.rpc.sendMessage(messageName, data);
}
```

---

## RPC Best Practices

### Type-Safe Schema
Always define full request/response types:
```typescript
export type AppRPC = {
  bun: RPCSchema<{
    requests: {
      saveDocument: {
        params: { path: string; content: string };
        response: { success: boolean; savedAt: number };
      };
    };
    messages: {
      userAction: { action: string; timestamp: number };
    };
  }>;
  webview: RPCSchema<{
    messages: {
      documentSaved: { path: string };
      stateUpdated: { partialState: Partial<AppState> };
    };
  }>;
};
```

### Request Handler Pattern
```typescript
// Main process
view.rpc.addRequestHandler("saveDocument", async ({ path, content }) => {
  await Bun.write(path, content);
  // Broadcast to all views
  broadcastToAllWindows("documentSaved", { path });
  return { success: true, savedAt: Date.now() };
});
```

---

## Renderer Patterns

### SolidJS Store + RPC Integration
```typescript
// store.tsx
import { createStore } from "solid-js/store";
import Electroview from "electrobun/view";

const [state, setState] = createStore<AppState>({ documents: [] });

// Listen for updates from main process
Electroview.rpc.addMessageHandler("stateUpdated", (data) => {
  setState(reconcile(data.partialState));
});

// Request initial state on mount
onMount(async () => {
  const initial = await Electroview.rpc.request.getState();
  setState(initial);
});
```

### Monaco Editor Integration
Colab bundles Monaco with custom workers:
```typescript
// electrobun.config.ts
copy: {
  "assets/custom.editor.worker.js": "views/ivde/custom.editor.worker.js"
}
```

---

## Database Pattern (GoldfishDB)

### Versioned Schema Migrations
```typescript
import DB, { type SchemaToDocumentTypes } from "goldfishdb";

const schema1 = {
  collections: {
    documents: { fields: { path: "string", content: "string" } }
  }
};

const schema2 = {
  collections: {
    documents: { fields: { path: "string", content: "string", tags: "array" } }
  }
};

const db = new DB().init({
  schemaHistory: [
    { v: 1, schema: schema1, migrationSteps: false },
    { v: 2, schema: schema2, migrationSteps: false },
  ],
  db_folder: "~/.myapp/db",
  passphrase: "encryption-key"
});
```

---

## Plugin System Pattern

Colab implements a full plugin system:
- **Registry**: NPM-based package discovery
- **Lifecycle**: install → activate → deactivate → uninstall
- **Commands**: Plugins register commands executable via RPC
- **Keybindings**: Plugins can register keyboard shortcuts

```typescript
// Plugin provides
export default {
  activate(context) {
    context.registerCommand("myPlugin.sayHello", () => {
      console.log("Hello from plugin!");
    });
  },
  deactivate() {}
};
```

---

## Tips & Gotchas

1. **Use `views://` protocol** for bundled content, not `file://`
2. **CEF vs WKWebView**: CEF gives full Chromium (DevTools), WKWebView is lighter
3. **RPC encryption**: WebSocket messages are AES-GCM encrypted by default
4. **Hot reload**: Not built-in yet, use `bun run dev` to restart
5. **File watchers**: Use Bun's `watch` API in main process, broadcast changes via RPC
