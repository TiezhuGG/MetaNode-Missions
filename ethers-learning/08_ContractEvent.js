import { ethers } from "ethers";

// 监听USDT合约
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

// USDT的合约地址
const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
];
// 生成USDT合约对象
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

console.log("利用contract.once(), 监听一次Transfer对象");

contractUSDT.once("Transfer", (from, to, value) => {
  // 打印结果
  console.log(
    `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
  );
});

console.log(`利用contract.on()，持续监听Transfer事件`);

contractUSDT.on("Transfer", (from, to, value) => {
  console.log(
    // 打印结果
    `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
  );
});
