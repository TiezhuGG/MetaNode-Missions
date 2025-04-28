import { ethers } from "ethers";

// 生成随机助记词
const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));

// 创建HD基钱包
// 基路径："m / purpose' / coin_type' / account' / change"
const basePath = "44'/60'/0'/0";
const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
// console.log(baseWallet);

// 通过HD钱包派生20个钱包
const numWallet = 20;
// 派生路径：基路径 + "/ address_index"
const wallets = [];
for (let i = 0; i < numWallet; i++) {
  let baseWalletNew = baseWallet.derivePath(i.toString());
  //   console.log(`第${i + 1}个钱包地址： ${baseWalletNew.address}`);
  wallets.push(baseWalletNew.address);
}
// console.log(wallets);
const amounts = Array(20).fill(ethers.parseEther("0.0001"));
console.log(`发送数额：${amounts}`);

// 创建provider和wallet，发送代币用
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";

const wallet = new ethers.Wallet(privateKey, provider);

// 创建Airdrop合约
// Airdrop的ABI
const abiAirdrop = [
  "function multiTransferToken(address,address[],uint256[]) external",
  "function multiTransferETH(address[],uint256[]) public payable",
];

const addressAirdrop = "0x2E5A5705806F8Bd4c470E1aFb94e56cA491C89d2";
const contractAirdrop = new ethers.Contract(addressAirdrop, abiAirdrop, wallet);

// 创建WETH合约
// WETH的ABI
const abiWETH = [
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
  "function approve(address, uint256) public returns (bool)",
];
const addressWETH = "0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323";
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet);
console.log("\n3. 读取第10个钱包的ETH和WETH余额");
const balanceWETH = await contractWETH.balanceOf(wallets[10]);
console.log(`WETH持仓: ${ethers.formatEther(balanceWETH)}\n`);
//读取ETH余额
const balanceETH = await provider.getBalance(wallets[10]);
console.log(`ETH持仓: ${ethers.formatEther(balanceETH)}\n`);
console.log("\n4. 调用multiTransferETH()函数，给每个钱包转 0.0001 ETH");
// 发起交易
const tx = await contractAirdrop.multiTransferETH(wallets, amounts, {
  value: ethers.parseEther("0.00001"),
});
// 等待交易上链
await tx.wait();
const balanceETH2 = await provider.getBalance(wallets[10]);
console.log(`发送后该钱包ETH持仓: ${ethers.formatEther(balanceETH2)}\n`);

// console.log("\n5. 调用multiTransferToken()函数，给每个钱包转 0.0001 WETH");
// const txApprove = await contractWETH.approve(
//   addressAirdrop,
//   ethers.parseEther("1")
// );
// await txApprove.wait();

// // 发起交易
// const tx2 = await contractAirdrop.multiTransferToken(
//   addressWETH,
//   wallets,
//   amounts
// );
// await tx2.wait();

// const balanceWETH2 = await contractWETH.balanceOf(wallets[10]);
// console.log(`发送后该钱包WETH持仓: ${ethers.formatEther(balanceWETH2)}\n`);
