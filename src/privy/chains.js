export const chainsName = { aia: "AIA" };
export const chainsId = { AIA: 1320, FHENIX: 8008135, INCO: 21097 };

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

export const incoNetwork = {
  id: 21097,
  network: "Rivest",
  name: "Rivest Testnet",
  nativeCurrency: {
    name: "INCO",
    symbol: "INCO",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://validator.rivest.inco.org"],
    },
    public: {
      http: ["https://validator.rivest.inco.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.rivest.inco.org",
    },
  },
};
