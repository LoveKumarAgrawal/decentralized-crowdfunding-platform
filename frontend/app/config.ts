import { http, createConfig } from 'wagmi'
import { Chain } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

// Define a custom chain configuration for Anvil
const anvil: Chain = {
  id: 31337, // This is the default chain ID for Anvil (you can verify it by checking Anvil's output)
  name: 'Anvil',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
}

export const config = createConfig({
  chains: [anvil], // Use Anvil as your chain
  connectors: [
    metaMask(),
  ],
  transports: {
    [anvil.id]: http(), // Connect using HTTP transport
  },
})
