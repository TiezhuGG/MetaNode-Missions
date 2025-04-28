import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";
const wallet = new ethers.Wallet(privateKey, provider);

const abi = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
];

const contractAddress = "0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323";
const contract = new ethers.Contract(contractAddress, abi, wallet);

const walletAddress = await wallet.getAddress();
// const balance = await provider.getBalance(walletAddress);
console.log("读取WETH余额");
const param1 = contract.interface.encodeFunctionData("balanceOf", [
  walletAddress,
]);
console.log(`编码结果：${param1}`);
// 创建交易
const tx1 = {
  to: contractAddress,
  data: param1,
};
// 发起交易
const balance = await provider.call(tx1);
console.log(`存款前持仓: ${ethers.formatEther(balance)}\n`);

const param2 = contract.interface.encodeFunctionData("deposit");
console.log(`编码结果：${param2}`);
// 创建交易2
const tx2 = {
  to: contractAddress,
  data: param2,
  value: ethers.parseEther("0.001"),
};
// 发起交易
const receipt1 = await wallet.sendTransaction(tx2);
// 等待链上交易
await receipt1.wait();
console.log(`交易详情`);
console.log(receipt1);
const balance_deposit = await contract.balanceOf(walletAddress);
console.log(`存款后持仓： ${ethers.formatEther(balance_deposit)}`);
