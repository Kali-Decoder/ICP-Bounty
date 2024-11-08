import { sepolia, baseSepolia, arbitrumSepolia } from "@wagmi/core/chains";
import { http } from "viem";
 const bitfinity = {
  id: 355113,
  name: "Bitfinity Testnet",
  nativeCurrency: { name: "Bitfinity", symbol: "BTF", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.bitfinity.network/"] },
  },
  blockExplorers: {
    default: { name: "Bitfinity", url: "https://explorer.testnet.bitfinity.network" },
  },
 
};
export const chainArray = [bitfinity];
export const transportsObject = {
  [bitfinity.id]: http(),
};
