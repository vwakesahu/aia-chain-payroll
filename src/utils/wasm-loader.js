export async function loadWasm() {
    try {
      const wasmModule = await import('fhenixjs/lib/esm/sdk/fhe/tfhe_bg.wasm');
      return wasmModule;
    } catch (error) {
      console.error('Failed to load WASM:', error);
      throw error;
    }
  }