export const chainsName = { aia: "AIA" };

export const aiaNetwork = {
  id: 1320,
  network: "AIA",
  name: "AIA Testnet",
  nativeCurrency: {
    name: "AIA",
    symbol: "AIA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://aia-dataseed1-testnet.aiachain.org"],
    },
    public: {
      http: ["https://aia-dataseed1-testnet.aiachain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "AIA Chain Explorer Testnet",
      url: "https://testnet.aiascan.com/", 
    },
  },
};

export const fhenixNetwork = {
  id: 8008135,
  network: "Fhenix",
  name: "Fhenix Helium",
  nativeCurrency: {
    name: "Fhenix Helium",
    symbol: "tFHE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.helium.fhenix.zone"],
      webSocket: ["wss://api.helium.fhenix.zone:8548"],
    },
    public: {
      http: ["https://api.helium.fhenix.zone"],
      webSocket: ["wss://api.helium.fhenix.zone:8548"],
    },
  },
  blockExplorers: {
    default: {
      name: "Fhenix Explorer",
      url: "https://explorer.helium.fhenix.zone",
    },
  },
  testnet: true,
  contracts: {
    bridge: "https://bridge.helium.fhenix.zone/",
    faucet: "https://get-helium.fhenix.zone/",
  },
};