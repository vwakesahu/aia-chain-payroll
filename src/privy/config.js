import { fhenixNetwork, aiaNetwork } from "./chains";

export const privyConfig = {
  appId: "cm2vpnu5606elij5dxqxknyhx",
  config: {
    logo: "https://your.logo.url",
    appearance: { theme: "dark" },
    loginMethods: ["wallet", 'email',],
    appearance: {
      walletList: ["metamask", "detected_wallets", "rainbow"],
      theme: "dark",
    },
    defaultChain: aiaNetwork,
    supportedChains: [aiaNetwork, fhenixNetwork],
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
    },
  },
};
