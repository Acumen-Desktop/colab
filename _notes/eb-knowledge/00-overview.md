# ElectroBun Knowledge Base

> **Learning notes for the ElectroBun desktop app framework and the Colab reference application.**

## What is ElectroBun?

ElectroBun is a **modern alternative to Electron** for building cross-platform desktop applications. Key differentiators:

| Feature | ElectroBun | Electron | Tauri |
|---------|------------|----------|-------|
| **JS Runtime** | Bun | Node.js | N/A (Rust backend) |
| **Native Layer** | Zig + Objective-C/C++ | C++ | Rust |
| **Webview Engine** | WKWebView (native) + CEF | Chromium (bundled) | System webview |
| **Bundle Size** | Smaller | Large (~150MB+) | Smallest |
| **Build Speed** | Fast (Bun) | Slow | Medium |

## Core Architecture

```mermaid
graph TB
    subgraph "Main Process (Bun Runtime)"
        A[index.ts - Application Logic]
        B[RPC Handlers]
        C[GoldfishDB - Persistence]
        D[Plugin Manager]
    end
    
    subgraph "Native Layer (Zig/Obj-C)"
        E[Window Manager]
        F[Webview Bridge]
        G[System APIs]
    end
    
    subgraph "Renderer (Browser Context)"
        H[SolidJS UI]
        I[Monaco Editor]
        J[Electroview RPC Client]
    end
    
    A <--> B
    B <-->|"RPC (WebSocket/stdio)"| F
    F <--> J
    H --> J
