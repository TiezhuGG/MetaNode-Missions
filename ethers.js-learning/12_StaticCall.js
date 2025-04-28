import { ethers } from "ethers";

const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/TTH8vjmnx_e_meAvtAju9w9jTSeX7cIv";
const privateKey =
  "0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b";

// 创建provider和wallet对象
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
const wallet = new ethers.Wallet(privateKey, provider);

// DAI的ABI
const abiDAI = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
];

// DAI合约地址（主网）
const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// 创建合约实例
const contractDAI = new ethers.Contract(addressDAI, abiDAI, provider);

const address = await wallet.getAddress();
console.log(`测试钱包的DAI余额`);
const balanceDAI = await contractDAI.balanceOf(address);
console.log(`DAI余额：${ethers.formatEther(balanceDAI)} EHT`);

console.log(
  "\n2.  用staticCall尝试调用transfer转账1 DAI，msg.sender为Vitalik地址"
);
// 发起交易
const tx = await contractDAI.transfer.staticCall(
  "vitalik.eth",
  ethers.parseEther("1"),
  { from: await provider.resolveName("vitalik.eth") }
);
console.log("交易是否成功？", tx);

console.log(
  "\n3.  用staticCall尝试调用transfer转账10000 DAI，msg.sender为测试钱包地址"
);
// 将from参数改为测试钱包地址，交易将失败（测试钱包没有足够的DAI）
const tx2 = await contractDAI.transfer.staticCall(
  "vitalik.eth",
  ethers.parseEther("10000"),
  { from: address }
);
console.log("交易会成功吗", tx2);
