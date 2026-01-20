bun dev
$ bun build:dev && bun start:dev
$ bun setup && electrobun build
$ bun run scripts/setup-deps.ts
Setting up build dependencies...
--------> Zig already vendored
--------> llama.cpp already vendored
--------> Building llama.cpp libraries...
--------> llama.cpp already vendored
--------> llama.cpp libraries already exist, skipping build
✅ All dependencies ready!
Using config file: electrobun.config.ts
Building for macos-x64 (dev)
CEF dependencies found for macos-x64, using cached version
Running postBuild script: ./scripts/postBuild.ts
post build script
[baseline-browser-mapping] The data in this module is over two months old.  To ensure accurate Baseline data, please update: `npm i baseline-browser-mapping@latest -D`
--------> esbuild ivde
--------> Injecting analytics configuration...
--------> Analytics config for build: {
  mixpanelToken: null,
}
--------> Analytics configuration injected successfully
--------> Mixpanel token: none
--------> Analytics behavior: User opt-in required (default: disabled)
--------> Building PTY binary...
--------> PTY binary copied to MacOS folder
--------> PTY binary built and copied
--------> Building llama-cli binary (assumes dependencies are ready)...
--------> llama.cpp libraries found, proceeding with Zig build
--------> Set has_llama = true in build options
--------> Building llama-cli with Zig...
--------> Real llama-cli binary copied to MacOS folder
--------> Real llama-cli binary built and copied successfully
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme

Rebuilding...

Done in 104ms.
skipping codesign
skipping notarization
$ electrobun dev
Using config file: electrobun.config.ts
Building for macos-x64 (dev)
Launcher starting on macos...
Current directory: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS
Spawning: ./bun /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/main.js
Child process spawned with PID 34951
[LAUNCHER] Loaded identifier: sh.blackboard.colab, channel: dev
[LAUNCHER] Loading app code from flat files
2026-01-19 21:18:47.004 bun[34951:373442] Initialized global AbstractView tracking map
2026-01-19 21:18:47.005 bun[34951:373442] Initialized webview HTML content storage
Server started at http://localhost:50000
2026-01-19 21:18:47.091 bun[34951:373442] [CEF] Using app: sh.blackboard.colab-dev
[0119/211847.092708:WARNING:alloy_main_delegate.cc(560)] Alloy bootstrap is deprecated and will be removed in ~M127. See https://github.com/chromiumembedded/cef/issues/3685
2026-01-19 21:18:47.127 bun[34951:373456] setJSUtils called but using map-based approach instead of callbacks
getPath /Users/james /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/~
Skipping analytics event (not enabled): app_launch
is biome installed?  /Users/james/.colab-dev/.deps/biome true 1.4.1 1.4.1
2026-01-19 21:18:47.201 bun[34951:373456] Setting application menu from JSON in objc
---->1 creating main window
DEBUG: BrowserView constructor - no HTML provided for webview 1
2026-01-19 21:18:47.332 bun[34951:373442] DEBUG CEF: CreateRequestContextForPartition called for webview 1, partition: persist:default
setting webviewId:  1
---->222 creating main window
[main] Window workspaces.1.1768787362984 received native focus event
setFocusedWindow: workspace=workspaces.1, window=workspaces.1.1768787362984
2026-01-19 21:18:47.335 bun[34951:373442] DEBUG CEF: Registered scheme handler factory for partition 'persist:default' - success: yes
2026-01-19 21:18:47.335 bun[34951:373442] DEBUG CEF: Creating browser, OSR mode: NO, view size: 1500x900
2026-01-19 21:18:47.368 bun[34951:373442] DEBUG CEF: Browser created successfully
2026-01-19 21:18:47.368 bun[34951:373442] DEBUG CEF Mapping: Registered browser 1 -> webview 1
2026-01-19 21:18:47.374 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/index.html
2026-01-19 21:18:47.374 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.374 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.374 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/index.html
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/index.html'
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/index.html' with 'internal/index.html'
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/index.html
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/index.html
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 547
2026-01-19 21:18:47.376 bun[34951:373442] DEBUG CEF: Set MIME type 'text/html' for file: ivde/index.html
2026-01-19 21:18:47.376 bun[34951:373485] Creating response filter for HTML content
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/tailwind.css
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.442 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/index.css
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.442 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/xterm.css
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.442 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/styles/blackboard.css
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.442 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.442 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/tailwind.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/tailwind.css'
2026-01-19 21:18:47.443 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/index.js
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/tailwind.css' with 'internal/index.html'
2026-01-19 21:18:47.443 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/tailwind.css
2026-01-19 21:18:47.443 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.443 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/tailwind.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 2228
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Set MIME type 'text/css' for file: ivde/tailwind.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/index.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/index.css'
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/index.css' with 'internal/index.html'
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/index.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/index.css
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 501120
2026-01-19 21:18:47.443 bun[34951:373442] DEBUG CEF: Set MIME type 'text/css' for file: ivde/index.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/xterm.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/xterm.css'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/xterm.css' with 'internal/index.html'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/xterm.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/xterm.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 7112
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Set MIME type 'text/css' for file: ivde/xterm.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/styles/blackboard.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/styles/blackboard.css'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/styles/blackboard.css' with 'internal/index.html'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/styles/blackboard.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/styles/blackboard.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: file exists=NO
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Failed to read views file: views://ivde/styles/blackboard.css
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/index.js
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/index.js'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/index.js' with 'internal/index.html'
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/index.js
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/index.js
2026-01-19 21:18:47.445 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.449 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 11057903
2026-01-19 21:18:47.449 bun[34951:373442] DEBUG CEF: Set MIME type 'text/javascript' for file: ivde/index.js
2026-01-19 21:18:47.938 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://ivde/editor.main.css
2026-01-19 21:18:47.938 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:47.938 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:47.938 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://ivde/editor.main.css
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'ivde/editor.main.css'
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG CEF: Comparing relativePath 'ivde/editor.main.css' with 'internal/index.html'
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://ivde/editor.main.css
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/ivde/editor.main.css
2026-01-19 21:18:47.938 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:47.939 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 326835
2026-01-19 21:18:47.939 bun[34951:373442] DEBUG CEF: Set MIME type 'text/css' for file: ivde/editor.main.css
[0119/211847.956740:INFO:CONSOLE(254478)] "[pluginSlateRegistry] Registry initialized (plugins will be loaded dynamically)", source: views://ivde/index.js (254478)
[0119/211848.080622:INFO:CONSOLE(275620)] "🟢 DEBUG: index.tsx module loaded and executing", source: views://ivde/index.js (275620)
[0119/211848.080771:INFO:CONSOLE(275672)] "🔵 DEBUG: About to call getInitialState", source: views://ivde/index.js (275672)
[0119/211848.080836:INFO:CONSOLE(275630)] "renderer getInitialState - making RPC call...", source: views://ivde/index.js (275630)
setFocusedWindow: workspace=workspaces.1, window=workspaces.1.1768787362984
getInitialState - calling fetchProjects...
fetchProjects - loaded appSettings: {
  distinctId: "1768787361392.681",
  analyticsEnabled: false,
  analyticsConsentPrompted: false,
  userId: undefined,
  llama: {
    enabled: true,
    baseUrl: "llama.cpp",
    model: "qwen2.5-coder-7b-instruct-q4_k_m.gguf",
    temperature: 0.1,
    inlineEnabled: true,
  },
  github: {
    accessToken: "",
    username: "",
    connectedAt: 0,
    scopes: [],
  },
  colabCloud: undefined,
  id: "appSettings.1",
  date_created: 1768787361392,
  date_updated: undefined,
}
getInitialState - received data: {
  workspace: {
    name: "default workspace",
    color: "#000",
    projectIds: [],
    visible: true,
    windows: [
      [Object ...]
    ],
    id: "workspaces.1",
    date_created: 1768787362983,
    date_updated: 1768790819595,
  },
  projects: [],
  tokens: [],
  appSettings: {
    distinctId: "1768787361392.681",
    analyticsEnabled: false,
    analyticsConsentPrompted: false,
    userId: undefined,
    llama: {
      enabled: true,
      baseUrl: "llama.cpp",
      model: "qwen2.5-coder-7b-instruct-q4_k_m.gguf",
      temperature: 0.1,
      inlineEnabled: true,
    },
    github: {
      accessToken: "",
      username: "",
      connectedAt: 0,
      scopes: [],
    },
    colabCloud: undefined,
    id: "appSettings.1",
    date_created: 1768787361392,
    date_updated: undefined,
  },
}
[0119/211848.083904:INFO:CONSOLE(278265)] "rendering Sidebar", source: views://ivde/index.js (278265)
[0119/211848.088606:INFO:CONSOLE(259601)] "StatusBar: onMount called, starting checkLlamaStatus", source: views://ivde/index.js (259601)
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/sidebar-left.svg
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.089 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/new-window.svg
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.089 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.089 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/icon_32x32@2x.png
2026-01-19 21:18:48.090 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.090 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.090 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/chrome-logo.svg
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.091 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/webkit-logo.svg
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.091 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/sidebar-left.svg
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/sidebar-left.svg'
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/terminal.svg
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/sidebar-left.svg' with 'internal/index.html'
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/sidebar-left.svg
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.091 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/sidebar-left.svg
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.091 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 591
2026-01-19 21:18:48.091 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/agent.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/sidebar-left.svg
2026-01-19 21:18:48.092 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.092 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.092 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/new-window.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/new-window.svg'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/new-window.svg' with 'internal/index.html'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/new-window.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/new-window.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 624
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/new-window.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/icon_32x32@2x.png
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/icon_32x32@2x.png'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/icon_32x32@2x.png' with 'internal/index.html'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/icon_32x32@2x.png
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/icon_32x32@2x.png
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 4679
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Set MIME type 'image/png' for file: assets/icon_32x32@2x.png
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/webkit-logo.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/webkit-logo.svg'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/webkit-logo.svg' with 'internal/index.html'
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/webkit-logo.svg
2026-01-19 21:18:48.092 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/webkit-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 822
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/webkit-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/chrome-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/chrome-logo.svg'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/chrome-logo.svg' with 'internal/index.html'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/chrome-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/chrome-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 473
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/chrome-logo.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/terminal.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/terminal.svg'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/terminal.svg' with 'internal/index.html'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/terminal.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/terminal.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 1074
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/terminal.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/agent.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/agent.svg'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/agent.svg' with 'internal/index.html'
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/agent.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/agent.svg
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 1424
2026-01-19 21:18:48.093 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/agent.svg
is biome installed?  /Users/james/.colab-dev/.deps/biome true 1.4.1 1.4.1
error running /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/vendor/git 221 |       stderr = null,
222 |       exitCode,
223 |       signalCode,
224 |       exitedDueToTimeout,
225 |       exitedDueToMaxBuffer,
226 |     } = Bun.spawnSync({
                                ^
EBADARCH: unknown error, posix_spawn '/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/vendor/git'
      path: "/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/vendor/git",
   syscall: "spawnSync /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/vendor/git",
     errno: -86,
 spawnargs: [
  "--version"
],
      code: "EBADARCH"

      at spawnSync (node:child_process:226:22)
      at execSpawnSync (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:16239:27)
      at getVersion3 (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:16324:31)
      at getInitialState (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:26169:37)
      at handler (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:11715:40)
      at handler (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:11701:28)
      at <anonymous> (/Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/Resources/app/bun/index.js:15452:25)

[0119/211848.186261:INFO:CONSOLE(275646)] "renderer getInitialState - received appSettings: [object Object]", source: views://ivde/index.js (275646)
[0119/211848.187116:INFO:CONSOLE(274534)] "WebSlate component created: [object Object]", source: views://ivde/index.js (274534)
[0119/211848.187181:INFO:CONSOLE(274574)] "WebSlate init: [object Object]", source: views://ivde/index.js (274574)
[0119/211848.187913:INFO:CONSOLE(274534)] "WebSlate component created: [object Object]", source: views://ivde/index.js (274534)
[0119/211848.187981:INFO:CONSOLE(274574)] "WebSlate init: [object Object]", source: views://ivde/index.js (274574)
[0119/211848.188265:INFO:CONSOLE(274534)] "WebSlate component created: [object Object]", source: views://ivde/index.js (274534)
[0119/211848.188314:INFO:CONSOLE(274574)] "WebSlate init: [object Object]", source: views://ivde/index.js (274574)
[0119/211848.188608:INFO:CONSOLE(274534)] "WebSlate component created: [object Object]", source: views://ivde/index.js (274534)
[0119/211848.188672:INFO:CONSOLE(274574)] "WebSlate init: [object Object]", source: views://ivde/index.js (274574)
[0119/211848.191354:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211848.191627:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211848.191760:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211848.191807:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211848.191925:INFO:CONSOLE(276745)] "PaneTab effect - URL: https://blackboard.sh/ Title: blackboard.sh", source: views://ivde/index.js (276745)
[0119/211848.192014:INFO:CONSOLE(276800)] "Initial load - fetching favicon for: https://blackboard.sh/", source: views://ivde/index.js (276800)
[0119/211848.192334:INFO:CONSOLE(276745)] "PaneTab effect - URL: https://blackboard.sh/ Title: blackboard.sh", source: views://ivde/index.js (276745)
[0119/211848.192397:INFO:CONSOLE(276800)] "Initial load - fetching favicon for: https://blackboard.sh/", source: views://ivde/index.js (276800)
[0119/211848.192436:INFO:CONSOLE(276745)] "PaneTab effect - URL: https://blackboard.sh/ Title: blackboard.sh", source: views://ivde/index.js (276745)
[0119/211848.192470:INFO:CONSOLE(276800)] "Initial load - fetching favicon for: https://blackboard.sh/", source: views://ivde/index.js (276800)
[0119/211848.192557:INFO:CONSOLE(276745)] "PaneTab effect - URL: https://blackboard.sh Title: undefined", source: views://ivde/index.js (276745)
[0119/211848.192616:INFO:CONSOLE(276800)] "Initial load - fetching favicon for: https://blackboard.sh", source: views://ivde/index.js (276800)
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/sidebar-left-filled.svg
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.193 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/browser-back.svg
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.193 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/browser-forward.svg
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.193 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/browser-reload.svg
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.193 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.193 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/browser-home.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/sidebar-left-filled.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/sidebar-left-filled.svg'
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/sidebar-left-filled.svg' with 'internal/index.html'
2026-01-19 21:18:48.194 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/sidebar-left-filled.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/browser-add-bookmark.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/sidebar-left-filled.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.194 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 590
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/sidebar-left-filled.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/browser-back.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/browser-back.svg'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/browser-back.svg' with 'internal/index.html'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/browser-back.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/horizontal-split-right.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/browser-back.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.194 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 323
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/browser-back.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Create called for URL: views://assets/file-icons/vertical-split-down.svg
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Creating handler for browser 1 -> webview 1
2026-01-19 21:18:48.194 bun[34951:373485] DEBUG CEF Factory: Current browser-to-webview mappings:
2026-01-19 21:18:48.194 bun[34951:373485]   Browser 1 -> Webview 1
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/browser-forward.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/browser-forward.svg'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/browser-forward.svg' with 'internal/index.html'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/browser-forward.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/browser-forward.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 323
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/browser-forward.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/browser-reload.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/browser-reload.svg'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/browser-reload.svg' with 'internal/index.html'
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/browser-reload.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/browser-reload.svg
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 509
2026-01-19 21:18:48.194 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/browser-reload.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/browser-home.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/browser-home.svg'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/browser-home.svg' with 'internal/index.html'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/browser-home.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/browser-home.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 388
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/browser-home.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/browser-add-bookmark.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/browser-add-bookmark.svg'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/browser-add-bookmark.svg' with 'internal/index.html'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/browser-add-bookmark.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/browser-add-bookmark.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 399
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/browser-add-bookmark.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/horizontal-split-right.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/horizontal-split-right.svg'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/horizontal-split-right.svg' with 'internal/index.html'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/horizontal-split-right.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/horizontal-split-right.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 491
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/horizontal-split-right.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Processing views:// URL: views://assets/file-icons/vertical-split-down.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF FIXED: relativePath = 'assets/file-icons/vertical-split-down.svg'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Comparing relativePath 'assets/file-icons/vertical-split-down.svg' with 'internal/index.html'
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Attempting to read views file: views://assets/file-icons/vertical-split-down.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: Attempting flat file read: /Users/james/Documents/Software/Blackboard/colab-clone/build/dev-macos-x64/co(lab)-dev.app/Contents/MacOS/../Resources/app/views/assets/file-icons/vertical-split-down.svg
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG readViewsFile: file exists=YES
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Successfully read views file, length: 490
2026-01-19 21:18:48.195 bun[34951:373442] DEBUG CEF: Set MIME type 'image/svg+xml' for file: assets/file-icons/vertical-split-down.svg
get favicon request https://blackboard.sh/
get favicon request https://blackboard.sh/
get favicon request https://blackboard.sh/
get favicon request https://blackboard.sh
[PluginManager] getAllPreloadScripts called. Active plugins: 0, Preload scripts registered: 0
[PluginManager] Returning 0 total preload scripts
---->:: 2 main window dom-ready
[0119/211848.221755:INFO:CONSOLE(275153)] "setting webviewRef [object HTMLElement] undefined", source: views://ivde/index.js (275153)
[0119/211848.221887:INFO:CONSOLE(275155)] "webviewRef created with ID: undefined", source: views://ivde/index.js (275155)
[0119/211848.221943:INFO:CONSOLE(275156)] "webviewRef object: [object HTMLElement]", source: views://ivde/index.js (275156)
[0119/211848.221980:INFO:CONSOLE(241840)] "updateIFrameSrc called on removed webview", source: views://ivde/index.js (241840)
[0119/211848.222015:INFO:CONSOLE(241860)] "updateIFramePreload called on removed webview", source: views://ivde/index.js (241860)
[0119/211848.222216:INFO:CONSOLE(275153)] "setting webviewRef [object HTMLElement] undefined", source: views://ivde/index.js (275153)
[0119/211848.222273:INFO:CONSOLE(275155)] "webviewRef created with ID: undefined", source: views://ivde/index.js (275155)
[0119/211848.222312:INFO:CONSOLE(275156)] "webviewRef object: [object HTMLElement]", source: views://ivde/index.js (275156)
[0119/211848.222347:INFO:CONSOLE(241840)] "updateIFrameSrc called on removed webview", source: views://ivde/index.js (241840)
[0119/211848.222380:INFO:CONSOLE(241860)] "updateIFramePreload called on removed webview", source: views://ivde/index.js (241860)
[0119/211848.222412:INFO:CONSOLE(275153)] "setting webviewRef [object HTMLElement] undefined", source: views://ivde/index.js (275153)
[0119/211848.222451:INFO:CONSOLE(275155)] "webviewRef created with ID: undefined", source: views://ivde/index.js (275155)
[0119/211848.222483:INFO:CONSOLE(275156)] "webviewRef object: [object HTMLElement]", source: views://ivde/index.js (275156)
[0119/211848.222515:INFO:CONSOLE(241840)] "updateIFrameSrc called on removed webview", source: views://ivde/index.js (241840)
[0119/211848.222551:INFO:CONSOLE(241860)] "updateIFramePreload called on removed webview", source: views://ivde/index.js (241860)
[0119/211848.222622:INFO:CONSOLE(275153)] "setting webviewRef [object HTMLElement] undefined", source: views://ivde/index.js (275153)
[0119/211848.222679:INFO:CONSOLE(275155)] "webviewRef created with ID: undefined", source: views://ivde/index.js (275155)
[0119/211848.222719:INFO:CONSOLE(275156)] "webviewRef object: [object HTMLElement]", source: views://ivde/index.js (275156)
[0119/211848.222753:INFO:CONSOLE(241840)] "updateIFrameSrc called on removed webview", source: views://ivde/index.js (241840)
[0119/211848.222786:INFO:CONSOLE(241860)] "updateIFramePreload called on removed webview", source: views://ivde/index.js (241860)
2026-01-19 21:18:48.252 bun[34951:373456] WARNING initWebview: width is NaN/Inf/invalid for webview 2, using 100
2026-01-19 21:18:48.252 bun[34951:373456] WARNING initWebview: height is NaN/Inf/invalid for webview 2, using 100
2026-01-19 21:18:48.253 bun[34951:373442] [Session] Partition-specific data stores require macOS 14.0+, using default store
DEBUG: BrowserView constructor - no HTML provided for webview 2
2026-01-19 21:18:48.287 bun[34951:373442] DEBUG WKWebView Constructor: URL check - url=0x13801c82ca0, url='https://blackboard.sh/', strlen=22
2026-01-19 21:18:48.287 bun[34951:373442] DEBUG WKWebView Constructor: Loading initial URL: https://blackboard.sh/
[0119/211848.325253:INFO:CONSOLE(241626)] "electrobun webviewid:  2", source: views://ivde/index.js (241626)
2026-01-19 21:18:48.326 bun[34951:373456] WARNING initWebview: width is NaN/Inf/invalid for webview 3, using 100
2026-01-19 21:18:48.326 bun[34951:373456] WARNING initWebview: height is NaN/Inf/invalid for webview 3, using 100
DEBUG: BrowserView constructor - no HTML provided for webview 3
2026-01-19 21:18:48.327 bun[34951:373442] DEBUG CEF: CreateRequestContextForPartition called for webview 3, partition: persist:sites:workspaces.1:cef
2026-01-19 21:18:48.328 bun[34951:373456] WARNING initWebview: width is NaN/Inf/invalid for webview 4, using 100
2026-01-19 21:18:48.328 bun[34951:373456] WARNING initWebview: height is NaN/Inf/invalid for webview 4, using 100
2026-01-19 21:18:48.331 bun[34951:373442] DEBUG CEF: Registered scheme handler factory for partition 'persist:sites:workspaces.1:cef' - success: yes
2026-01-19 21:18:48.331 bun[34951:373442] DEBUG CEF: Creating browser, OSR mode: NO, view size: 100x100
2026-01-19 21:18:48.338 bun[34951:373442] DEBUG CEF: Browser created successfully
2026-01-19 21:18:48.338 bun[34951:373442] DEBUG CEF Mapping: Registered browser 2 -> webview 3
2026-01-19 21:18:48.352 bun[34951:373442] DEBUG CEF: CreateRequestContextForPartition called for webview 4, partition: persist:sites:workspaces.1:cef
2026-01-19 21:18:48.352 bun[34951:373442] DEBUG CEF: Registered scheme handler factory for partition 'persist:sites:workspaces.1:cef' - success: yes
2026-01-19 21:18:48.352 bun[34951:373442] DEBUG CEF: Creating browser, OSR mode: NO, view size: 100x100
DEBUG: BrowserView constructor - no HTML provided for webview 4
2026-01-19 21:18:48.355 bun[34951:373442] DEBUG CEF: Browser created successfully
2026-01-19 21:18:48.355 bun[34951:373442] DEBUG CEF Mapping: Registered browser 3 -> webview 4
2026-01-19 21:18:48.357 bun[34951:373442] [Session] Partition-specific data stores require macOS 14.0+, using default store
DEBUG: BrowserView constructor - no HTML provided for webview 5
2026-01-19 21:18:48.359 bun[34951:373442] DEBUG WKWebView Constructor: URL check - url=0x138012990a0, url='https://blackboard.sh', strlen=21
2026-01-19 21:18:48.359 bun[34951:373442] DEBUG WKWebView Constructor: Loading initial URL: https://blackboard.sh
[0119/211848.377091:INFO:CONSOLE(241626)] "electrobun webviewid:  3", source: views://ivde/index.js (241626)
[0119/211848.377684:INFO:CONSOLE(241626)] "electrobun webviewid:  4", source: views://ivde/index.js (241626)
[0119/211848.377787:INFO:CONSOLE(241626)] "electrobun webviewid:  5", source: views://ivde/index.js (241626)
[0119/211848.467281:INFO:CONSOLE(275186)] "did-navigate event: about:blank", source: views://ivde/index.js (275186)
[0119/211848.467365:INFO:CONSOLE(275189)] "Ignoring non-web URL: about:blank", source: views://ivde/index.js (275189)
2026-01-19 21:18:48.504 bun[34951:373442] DEBUG WKWebView Navigation: webview 2 navigating to https://blackboard.sh/
2026-01-19 21:18:48.506 bun[34951:373442] DEBUG WKWebView Navigation: webview 5 navigating to https://blackboard.sh/
[0119/211848.507393:INFO:CONSOLE(275186)] "did-navigate event: about:blank", source: views://ivde/index.js (275186)
[0119/211848.507464:INFO:CONSOLE(275189)] "Ignoring non-web URL: about:blank", source: views://ivde/index.js (275189)
[0119/211848.523902:INFO:CONSOLE(241738)] "WAS NOT ZERO RECT 2", source: views://ivde/index.js (241738)
[0119/211848.524105:INFO:CONSOLE(241738)] "WAS NOT ZERO RECT 3", source: views://ivde/index.js (241738)
[0119/211848.524202:INFO:CONSOLE(241738)] "WAS NOT ZERO RECT 4", source: views://ivde/index.js (241738)
2026-01-19 21:18:48.650 bun[34951:373485] Creating response filter for HTML content
[0119/211848.659413:INFO:CONSOLE(275271)] "[WebSlate] Page loaded message received from preload", source: views://ivde/index.js (275271)
[0119/211848.659491:INFO:CONSOLE(274685)] "[WebSlate] Clearing load timeout", source: views://ivde/index.js (274685)
[0119/211848.687760:INFO:CONSOLE(275271)] "[WebSlate] Page loaded message received from preload", source: views://ivde/index.js (275271)
[0119/211848.687844:INFO:CONSOLE(274685)] "[WebSlate] Clearing load timeout", source: views://ivde/index.js (274685)
[0119/211848.687934:INFO:CONSOLE(275271)] "[WebSlate] Page loaded message received from preload", source: views://ivde/index.js (275271)
[0119/211848.687991:INFO:CONSOLE(274685)] "[WebSlate] Clearing load timeout", source: views://ivde/index.js (274685)
2026-01-19 21:18:48.703 bun[34951:373485] Creating response filter for HTML content
[0119/211848.711659:INFO:CONSOLE(275271)] "[WebSlate] Page loaded message received from preload", source: views://ivde/index.js (275271)
[0119/211848.711749:INFO:CONSOLE(274685)] "[WebSlate] Clearing load timeout", source: views://ivde/index.js (274685)
[0119/211848.847025:INFO:CONSOLE(260)] "Prism loaded with TypeScript support, highlighting all code blocks", source: https://blackboard.sh/ (260)
[0119/211848.847135:INFO:CONSOLE(260)] "Prism loaded with TypeScript support, highlighting all code blocks", source: https://blackboard.sh/ (260)
[0119/211849.001684:INFO:CONSOLE(275186)] "did-navigate event: https://blackboard.sh/", source: views://ivde/index.js (275186)
get favicon request https://blackboard.sh/
[0119/211849.153344:INFO:CONSOLE(275186)] "did-navigate event: https://blackboard.sh/", source: views://ivde/index.js (275186)
[0119/211849.155701:INFO:CONSOLE(275186)] "did-navigate event: https://blackboard.sh/", source: views://ivde/index.js (275186)
get favicon request https://blackboard.sh/
[0119/211849.156310:INFO:CONSOLE(275164)] "dom-ready event fired for webview: 4", source: views://ivde/index.js (275164)
[0119/211849.156406:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211849.156531:INFO:CONSOLE(275167)] "getTitle result: undefined", source: views://ivde/index.js (275167)
[0119/211849.156621:INFO:CONSOLE(275164)] "dom-ready event fired for webview: 3", source: views://ivde/index.js (275164)
[0119/211849.156681:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211849.156719:INFO:CONSOLE(275167)] "getTitle result: undefined", source: views://ivde/index.js (275167)
get favicon request https://blackboard.sh/
[0119/211849.163356:INFO:CONSOLE(274703)] "Set webviewUrl to: https://blackboard.sh/", source: views://ivde/index.js (274703)
[0119/211849.166189:INFO:CONSOLE(274703)] "Set webviewUrl to: https://blackboard.sh/", source: views://ivde/index.js (274703)
[0119/211849.329250:INFO:CONSOLE(275164)] "dom-ready event fired for webview: 2", source: views://ivde/index.js (275164)
[0119/211849.329354:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211849.329456:INFO:CONSOLE(275167)] "getTitle result: undefined", source: views://ivde/index.js (275167)
[0119/211849.334921:INFO:CONSOLE(274703)] "Set webviewUrl to: https://blackboard.sh/", source: views://ivde/index.js (274703)
[0119/211849.359626:INFO:CONSOLE(275186)] "did-navigate event: https://blackboard.sh/", source: views://ivde/index.js (275186)
[0119/211849.359813:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211849.359867:INFO:CONSOLE(276745)] "PaneTab effect - URL: https://blackboard.sh/ Title: blackboard.sh", source: views://ivde/index.js (276745)
[0119/211849.359903:INFO:CONSOLE(276800)] "Initial load - fetching favicon for: https://blackboard.sh/", source: views://ivde/index.js (276800)
get favicon request https://blackboard.sh/
get favicon request https://blackboard.sh/
[0119/211849.363540:INFO:CONSOLE(275164)] "dom-ready event fired for webview: 5", source: views://ivde/index.js (275164)
[0119/211849.363648:INFO:CONSOLE(274694)] "WebSlate effect: [object Object]", source: views://ivde/index.js (274694)
[0119/211849.363746:INFO:CONSOLE(275167)] "getTitle result: undefined", source: views://ivde/index.js (275167)
[0119/211849.369391:INFO:CONSOLE(274703)] "Set webviewUrl to: https://blackboard.sh/", source: views://ivde/index.js (274703)
2026-01-19 21:18:49.372 bun[34951:373442] DEBUG WKWebView Navigation: webview 2 navigating to about:blank
2026-01-19 21:18:49.374 bun[34951:373442] DEBUG WKWebView Navigation: webview 2 navigating to about:blank
2026-01-19 21:18:49.384 bun[34951:373442] DEBUG WKWebView Navigation: webview 5 navigating to about:blank
2026-01-19 21:18:49.388 bun[34951:373442] DEBUG WKWebView Navigation: webview 5 navigating to about:blank
2026-01-19 21:18:55.500 bun[34951:373456] webviewRemove: ENTRY - abstractView=0x1380281ac00
2026-01-19 21:18:55.500 bun[34951:373456] webviewRemove: webviewId=5, globalAbstractViews=0x1380022c120, count=5
2026-01-19 21:18:55.500 bun[34951:373456] webviewRemove: Removed webview 5 from global tracking (remaining: 4)
2026-01-19 21:18:55.500 bun[34951:373456] webviewRemove: About to call [abstractView remove] for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] WKWebViewImpl remove: evaluating cleanup JavaScript for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] WKWebViewImpl remove: releasing webView object for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] WKWebViewImpl remove: webView set to nil for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] WKWebViewImpl remove: scheduling delayed removeFromSuperview for webview 5
2026-01-19 21:18:55.501 bun[34951:373442] WKWebViewImpl remove: executing delayed removeFromSuperview for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] WKWebViewImpl remove: COMPLETED cleanup for webview 5
2026-01-19 21:18:55.501 bun[34951:373456] webviewRemove: COMPLETED for webview 5
2026-01-19 21:18:55.501 bun[34951:373442] WKWebViewImpl remove: delayed removeFromSuperview completed for webview 5
2026-01-19 21:18:55.501 bun[34951:373442] WKWebViewImpl remove: delayed removeFromSuperview attempt finished for webview 5
Child process terminated by signal: 11