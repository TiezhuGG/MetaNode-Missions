import { useState } from "react";
import { useWeb3 } from "../context/WalletContext";
import { ChainConfig, WalletProvider } from "../types/web3";

const WALLETS: WalletProvider[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "../assets/metamask.svg",
    installUrl: "https://metamask.io/download/",
  },
  {
    id: "okx",
    name: "OKX",
    icon: "../assets/metamask.svg",
  },
];

export default function WalletConnect({ chains }: { chains: ChainConfig[] }) {
  const { state, connectWallet, switchChain } = useWeb3();
  const [selectedChain, setSelectedChain] = useState(chains[0]);

  const handleChangeChain = (value: number) => {
    console.log("switch chain", value);
    setSelectedChain(chains.find((c) => c.id === value)!);
    switchChain(selectedChain);
  };

  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedChain.id}
        onChange={(e) => handleChangeChain(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {chains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>

      {WALLETS.map((wallet) => (
        <button
          key={wallet.id}
          onClick={() => connectWallet(wallet)}
          className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          <img src={wallet.icon} alt={wallet.name} className="w-6 h-6" />
          {wallet.name}
        </button>
      ))}

      {state.account && (
        <div className="ml-4">
          <span>
            {state.account.slice(0, 6)}...{state.account.slice(-4)}
          </span>
        </div>
      )}
    </div>
  );
}
