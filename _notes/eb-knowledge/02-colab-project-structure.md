# Colab Project Structure

> **Colab** is a hybrid browser + code editor built with ElectroBun. This documents its architecture.

## Directory Layout

```
colab-clone/
├── electrobun.config.ts    # EB configuration
├── package.json            # Dependencies (bun, solid, monaco, etc.)
├── tsconfig.json
│
├── src/
│   ├── main/               # Main process (Bun runtime)
│   │   ├── index.ts        # Entry point (~3000 lines, core logic)
│   │   ├── workspaceWindows.ts
│   │   ├── goldfishdb/     # Encrypted local database
│   │   ├── plugins/        # Plugin system
│   │   ├── utils/          # Git, file, analytics utilities
│   │   └── consts/         # Path constants
│   │
│   ├── renderers/          # UI (browser context)
│   │   ├── ivde/           # Main IDE view
│   │   │   ├── index.tsx   # Root SolidJS component
│   │   │   ├── index.html
│   │   │   ├── rpc.ts      # RPC schema definition
│   │   │   ├── store.tsx   # SolidJS store (state management)
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── DiffEditor.tsx
│   │   │   ├── FileTree.tsx
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── settings/
│   │   │   └── slates/
│   │   ├── components/     # Shared components
│   │   └── utils/
│   │
│   ├── shared/             # Shared types between main/renderer
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── bun/                # Bun-specific utilities
│   └── pty/                # Terminal/PTY handling
│
├── scripts/                # Build scripts
│   ├── setup-deps.ts
│   └── postBuild.ts
│
├── assets/                 # Static assets
├── vendor/                 # Vendored dependencies
├── llama-cli/              # Local LLM integration
└── webflow-plugin/         # Webflow integration plugin
```

---

## Key Files Explained

### `src/main/index.ts` (Main Process)
The heart of the application (~3000 lines):
- **Imports** ElectroBun APIs: `BrowserWindow`, `BrowserView`, `ApplicationMenu`, `Tray`, `Updater`
- **RPC Handlers** for all renderer requests
- **Application Menu** setup with shortcuts
- **Window Management** via `workspaceWindows.ts`
- **Update Checking** on startup

### `src/renderers/ivde/rpc.ts` (RPC Schema)
Type definitions for main↔renderer communication:
- **80+ request types** including:
  - File operations: `readFile`, `writeFile`, `mkdir`, `rename`
  - Git: `gitCommit`, `gitPush`, `gitDiff`, `gitBranch`, etc.
  - Terminal: `createTerminal`, `writeToTerminal`, `killTerminal`
  - Plugins: `pluginInstall`, `pluginSearch`, `pluginExecuteCommand`
  - LLM: `llamaCompletion`, `llamaListModels`, `llamaInstallModel`

### `src/main/goldfishdb/` (Persistence)
Encrypted local database using [GoldfishDB](https://www.npmjs.com/package/goldfishdb):
- Versioned schema migrations
- Collections: `workspaces`, `settings`, `analytics`, etc.
- Encrypted with passphrase

### `src/renderers/ivde/store.tsx` (State Management)
SolidJS reactive store containing:
- `WorkspaceType` - project workspaces
- `AppSettings` - user preferences  
- File tree state, open tabs, etc.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Bun |
| **UI Framework** | SolidJS |
| **Code Editor** | Monaco Editor |
| **Styling** | TailwindCSS |
| **Terminal** | xterm.js |
| **Git** | simple-git |
| **Database** | GoldfishDB |
| **Build** | esbuild |

---

## Build Commands

```bash
# Development
bun run dev          # Build + run dev mode

# Production builds
bun run build:stable # Production build
bun run build:canary # Canary release

# Documentation
bun run docs:dev     # Run docs dev server
```
