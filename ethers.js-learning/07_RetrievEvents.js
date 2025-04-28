import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

// WETH ABI，只包含我们关心的Transfer事件
const abiWETH = [
  "event transfer(address indexed from, address indexed to, uint amount)",
];

// 测试网WETH地址
const addressWETH = "0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323";
// 声明合约实例
const contract = new ethers.Contract(addressWETH, abiWETH, provider);

// 得到当前block
const block = await provider.getBlockNumber();
console.log(`当前区块高度: ${block}`);
console.log(`打印事件详情:`);
const transferEvents = await contract.queryFilter(
  "transfer",
  block - 10,
  block
);
// 打印第1个Transfer事件
console.log(transferEvents[0]);
