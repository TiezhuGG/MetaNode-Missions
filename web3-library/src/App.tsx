import WalletConnect from "./components/WalletConnect";
import { Web3Provider } from "./context/WalletContext";

const chains = [
  {
    id: 1,
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_KEY",
    currencySymbol: "ETH",
  },
  {
    id: 56,
    name: "BNB Chain",
    rpcUrl: "https://bsc-dataseed.binance.org",
    currencySymbol: "BNB",
  },
];

function App() {
  return (
    <Web3Provider chains={chains}>
      <div className="p-8">
        <WalletConnect chains={chains} />
      </div>
    </Web3Provider>
  );
}

export default App;
