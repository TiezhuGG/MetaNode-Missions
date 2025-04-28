import { ethers } from "ethers";

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const wallet = new ethers.Wallet(privateKey, provider);

// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function deposit() public payable",
  "function transfer(address, uint) public returns (bool)",
  "function withdraw(uint) public",
];
const addressWETH = "0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323"; // WETH Contract

// 声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
// 也可以声明一个只读合约，再用connect(wallet)函数转换成可写合约。
// const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)
// contractWETH.connect(wallet)

// 读取余额
const address = await wallet.getAddress();
const balance = await contractWETH.balanceOf(address);
console.log(`存款前WETH持仓: ${ethers.formatEther(balance)}\n`);

// 存款
console.log(`调用deposit函数，存入0.001ETH`);
const tx = await contractWETH.deposit({ value: ethers.parseEther("0.001") });
// 等待链上交易
await tx.wait();
console.log(`交易详情：`);
console.log(tx);
const balanceWETH_deposit = await contractWETH.balanceOf(address);
console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`);

console.log('调用transfer函数，转账0.001 WETH')
const tx2 = await contractWETH.transfer("0x704843127a46EAAa4Ba8999b1Eb9Bc5b49264e75", ethers.parseEther("0.001"))
await tx2.wait();
const balanceWETH_transfer = await contractWETH.balanceOf(address)
console.log(`转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`)