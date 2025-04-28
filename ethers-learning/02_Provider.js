import { ethers } from "ethers";

const { JsonRpcProvider } = ethers;
const main = async () => {
  const providerETH = new JsonRpcProvider("https://eth.llamarpc.com");
  const providerSepolia = new JsonRpcProvider(
    "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
  );
  const balanceSepolia = await providerSepolia.getBalance(
    "0xc310b98aD04E3F1CE9CaDeF69Fb903c534fd6F38"
  );
  const balanceETH = await providerETH.getBalance(
    "0xc310b98aD04E3F1CE9CaDeF69Fb903c534fd6F38"
  );
  console.log(
    `Sepolia ETH Balance of me: ${ethers.formatEther(balanceETH)} ETH`
  );
  console.log(
    `Sepolia ETH Balance of me: ${ethers.formatEther(balanceSepolia)} ETH`
  );

  const networkETH = await providerETH.getNetwork();
  const networkSepolia = await providerSepolia.getNetwork();
  console.log(JSON.stringify(networkETH));
  console.log(JSON.stringify(networkSepolia));

  const blockNumber = await providerSepolia.getBlockNumber();
  console.log(blockNumber);

  const txCount = await providerSepolia.getTransactionCount(
    "0xc310b98aD04E3F1CE9CaDeF69Fb903c534fd6F38"
  );
  console.log("查询当前钱包交易次数", txCount);

  const feeData = await providerSepolia.getFeeData();
  console.log("查询当前建议的gas设置", feeData);

  const block = await providerSepolia.getBlock(0);
  console.log("查询区块信息", block);

  const code = await providerSepolia.getCode(
    "0xc778417e063141139fce010982780140aa0cd5ab"
  );
  console.log("给定合约地址查询合约bytecode，例子用的WETH地址", code);
};

main();
