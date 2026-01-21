# Quick Reference: ElectroBun Commands

## Development

```bash
# Start dev mode (build + run)
bun run dev

# Or separately:
bun run build:dev    # Build for development
bun run start:dev    # electrobun dev

# Watch mode (recommended for development)
electrobun dev
```

## Production Builds

```bash
# Stable release
bun run build:stable

# Canary (pre-release)
bun run build:canary
```

## Version Bumping

```bash
bun run push:canary  # Bump prerelease version + push
bun run push:patch   # Bump prepatch + push
bun run push:minor   # Bump preminor + push  
bun run push:major   # Bump premajor + push
bun run push:stable  # Bump patch + push (stable)
```

---

## ElectroBun CLI

```bash
# Create new project
npx electrobun init my-app

# Build
electrobun build
electrobun build --env=canary
electrobun build --env=stable

# Development mode
electrobun dev
```

---

## Key Imports

### Main Process
```typescript
import Electrobun, {
  BrowserWindow,
  BrowserView,
  ApplicationMenu,
  Tray,
  Updater,
  Utils
} from "electrobun";
```

### Renderer
```typescript
import Electroview from "electrobun/view";
import type { RPCSchema } from "electrobun/view";
```

---

## File Protocols

| Protocol | Use |
|----------|-----|
| `views://` | Bundled views (HTML/JS/CSS) |
| `file://` | Local filesystem |
| `https://` | Remote URLs |

---

## Configuration File Location

- **macOS**: `~/Library/Application Support/<app-identifier>/`
- **Linux**: `~/.config/<app-identifier>/`
- **Windows**: `%APPDATA%/<app-identifier>/`

---

## Debugging

- Enable CEF mode in config for Chrome DevTools
- Use `console.log` in main process (outputs to terminal)
- Renderer console available in webview DevTools
