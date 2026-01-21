# Performance Considerations

> Understanding RAM, CPU cores, and process isolation in ElectroBun apps.

## Memory (RAM) Usage

### Per-Webview Overhead
Each webview (whether via `BrowserWindow` or `<electrobun-webview>`) runs in its own process with:

| Component | Approx. Memory |
|-----------|---------------|
| V8/JavaScriptCore engine | ~20-40 MB |
| DOM + rendering context | ~10-30 MB |
| Your app's JS/assets | Variable |
| **Baseline per webview** | **~50-100 MB** |

> [!NOTE]
> For power users with 8GB+ RAM, running 5-10 webviews is comfortable. Colab itself runs multiple browser tabs + code editor this way.

### Memory Limits
- **Per-process JS heap**: ~1.4-4 GB (V8/JSC limits, configurable)
- **Total RAM**: Limited by OS, each process competes independently
- **Benefit of isolation**: OS can swap out inactive webview processes to disk

---

## CPU & Multi-Core Usage

### How Processes Map to Cores

**Key insight**: The OS scheduler decides which process runs on which core. You don't get "one core per webview" guaranteed.

```
┌─────────────────────────────────────────────────────────┐
│                    macOS / Linux Scheduler              │
├─────────────────────────────────────────────────────────┤
│  Core 0    │  Core 1    │  Core 2    │  Core 3    │ ... │
│  ┌──────┐  │  ┌──────┐  │  ┌──────┐  │  ┌──────┐  │     │
│  │Bun   │  │  │WebV1 │  │  │WebV2 │  │  │Map   │  │     │
│  │main  │  │  │render│  │  │render│  │  │embed │  │     │
│  └──────┘  │  └──────┘  │  └──────┘  │  └──────┘  │     │
└─────────────────────────────────────────────────────────┘
```

**Separate webviews CAN run on different cores simultaneously** - this is the performance win. If your map is doing heavy work on Core 2, your spreadsheet on Core 3 stays responsive.

### Single Webview - Can It Use Multiple Cores?

**JavaScript main thread**: Single-threaded by design. One core at a time.

**But you CAN parallelize via:**

| Mechanism | Runs On | Use Case |
|-----------|---------|----------|
| **Web Workers** | Separate threads (can use other cores) | Heavy computation |
| **OffscreenCanvas** | Separate thread | Graphics/canvas work |
| **WASM threads** | Multiple cores | Performance-critical code |
| **Bun main process** | Its own thread(s) | File I/O, heavy backend work |

```javascript
// Example: Offload work to a Web Worker
const worker = new Worker('heavy-calc.js');
worker.postMessage({ data: largeDataset });
worker.onmessage = (e) => updateUI(e.data);
```

---

## When to Use Separate Webviews

### ✅ Good Use Cases

| Scenario | Why |
|----------|-----|
| **Third-party embeds** (maps, videos) | Isolation, crash protection |
| **Browser tabs** (like Colab) | Each tab = independent session |
| **Untrusted content** | Security sandbox |
| **Heavy independent workloads** | Parallel processing |

### ❌ Probably Overkill

| Scenario | Why Not |
|----------|---------|
| **Tightly coupled components** | IPC overhead, complex state sync |
| **Simple UI panels** | Memory overhead not worth it |
| **Frequent data exchange** | RPC latency adds up |

---

## Practical Guidelines for Power Users (8GB+ RAM)

| Webview Count | RAM Impact | Recommendation |
|---------------|------------|----------------|
| 1-3 | ~150-300 MB | ✅ Comfortable |
| 5-10 | ~500 MB - 1 GB | ✅ Fine for power users |
| 10-20 | ~1-2 GB | ⚠️ Monitor, consider lazy loading |
| 20+ | 2+ GB | ⚠️ Implement tab unloading |

### Optimization Strategies

1. **Lazy webview creation**: Don't create until needed
2. **Tab unloading**: Destroy inactive webviews, recreate on focus
3. **Shared storage partitions**: Reduce per-webview session overhead
4. **Use `native` renderer for lightweight views**: WKWebView lighter than CEF

---

## Summary

| Question | Answer |
|----------|--------|
| Is ~50-100MB per webview RAM? | **Yes** |
| 8GB+ for power users okay? | **Yes**, comfortable for 5-10+ webviews |
| Do webviews get their own core? | **OS decides**, but they CAN run in parallel |
| Can one webview use multiple cores? | **JS main thread: no**. But Web Workers/WASM can. |
| Can one webview access more RAM? | **Yes**, up to V8/JSC heap limits (~1.4-4 GB) |
