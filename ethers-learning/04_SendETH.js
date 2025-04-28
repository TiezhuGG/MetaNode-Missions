import { ethers } from "ethers";

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const wallet = new ethers.Wallet(privateKey, provider);

// 创建随机的wallet对象
const walletRandom = ethers.Wallet.createRandom();
const walletRandomWithProvider = walletRandom.connect(provider);
const mnemonicRandom = walletRandom.mnemonic;
console.log("随机钱包助记词", mnemonicRandom);

const address = await wallet.getAddress();
const addressRandom = await walletRandom.getAddress();
console.log(`钱包地址: ${address}`);
console.log(`随机钱包地址: ${addressRandom}`);

console.log(`钱包私钥地址:${wallet.privateKey}`);

const transactionCount = await provider.getTransactionCount(wallet);
console.log(`钱包发送交易次数：${transactionCount}`);

const balance = await provider.getBalance(wallet);
console.log(`钱包余额：${ethers.formatEther(balance)} ETH`);

const tx = {
  to: address,
  value: ethers.parseEther("0.001"),
};
const txRes = await wallet.sendTransaction(tx);
const receipt = await txRes.wait(); // 等待链上确认交易
console.log(receipt); //打印交易的收据
