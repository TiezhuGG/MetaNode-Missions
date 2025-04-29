import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChainConfig, WalletProvider } from "../types/web3";
import { ethers } from "ethers";

interface Web3State {
  account?: string;
  chainId?: number;
  selectedWallet?: string;
}

const Web3Context = createContext<{
  state: Web3State;
  connectWallet: (provider: WalletProvider) => Promise<void>;
  switchChain: (chainConfig: ChainConfig) => Promise<void>;
}>({
  state: {},
  connectWallet: async () => {},
  switchChain: async () => {},
});

export function Web3Provider({
  children,
  chains,
}: {
  children: ReactNode;
  chains: ChainConfig[];
}) {
  const [state, setState] = useState<Web3State>({});

  // 监听账户变化
  useEffect(() => {
    console.log("listening accounts changed");
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setState((prev) => ({ ...prev, account: accounts[0] }));
    };

    const handleChainChanged = (chainId: number) => {
      setState((prev) => ({
        ...prev,
        chainId: Number(chainId),
      }));
    };

    window.ethereum.on("accountsChanged", () => handleAccountsChanged);

    window.ethereum.on("chainChanged", () => handleChainChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [state]);

  const connectWallet = async (provider: WalletProvider) => {
    console.log("connecting wallet", provider);

    if (provider.id === "metamask" && !window.ethereum?.isMetaMask) {
      window.open(provider?.installUrl, "_blank");
      return;
    }

    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await ethersProvider.send("eth_requestAccounts", []);
      const { chainId } = await ethersProvider.getNetwork();

      console.log("Account:", accounts);

      setState({
        account: accounts[0],
        chainId: Number(ethers.formatUnits(chainId, 0)),
        selectedWallet: provider.id,
      });
    } catch (error) {
      console.log("Error getting account:", error);
    }
  };

  const switchChain = useCallback(async (chainConfig: ChainConfig) => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        ethersProvider.send("wallet_switchEthereumChain", [
          {
            chainId: `0x${chainConfig.id.toString(16)}`,
            chainName: chainConfig.name,
            rpcUrls: [chainConfig.rpcUrl],
            nativeCurrency: {
              name: chainConfig.currencySymbol,
              symbol: chainConfig.currencySymbol,
              decimals: 18,
            },
          },
        ]);

        setState({
          ...state,
          chainId: chainConfig.id,
        });
      }
    } catch (error) {
      console.log("switch failed", error);
    }
  }, []);

  return (
    <Web3Context.Provider value={{ state, connectWallet, switchChain }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
