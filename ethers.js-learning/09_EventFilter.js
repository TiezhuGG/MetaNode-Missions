import { ethers } from "ethers";

// const provider = new ethers.JsonRpcProvider(
//   "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
// );

// const address = "0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323";
// const account = "0xc310b98aD04E3F1CE9CaDeF69Fb903c534fd6F38";

// const abi = [
//   "event Transfer(address indexed from, address indexed to, uint amount)",
//   "function balanceOf(address) public view returns(uint)",
// ];

// const contract = new ethers.Contract(address, abi, provider);

// const balance = await contract.balanceOf(account);
// console.log(`余额： ${ethers.formatEther(balance)} ETH`);

// console.log("创建过滤器，监听转进账号");
// // 创建过滤器 监听转进
// let filterAccountIn = contract.filters.Transfer(null, account);
// console.log("过滤器详情：");
// console.log(filterAccountIn);

// contract.on(filterAccountIn, (res) => {
//   console.log("------监听转进...-------");
//   console.log(res);
//   console.log(
//     `${res.args[0]} -> ${res.args[1]} ${ethers.formatEther(res.args[2])}`
//   );
// });

// // 创建过滤器，监听转出
// const filterAccountOut = contract.filters.Transfer(account);
// console.log("创建过滤器，监听转出账号");
// console.log("过滤器详情：");
// console.log(filterAccountOut);

// contract.on(filterAccountOut, (res) => {
//   console.log("------监听转出...-------");
//   console.log(res);
//   console.log(
//     `${res.args[0]} -> ${res.args[1]} ${ethers.formatEther(res.args[2])}`
//   );
// });


const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN");
// 合约地址
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 交易所地址
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// 构建ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);
const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT,6)}\n`)
// 2. 创建过滤器，监听转移USDT进交易所
console.log("\n2. 创建过滤器，监听USDT转进交易所")
let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
console.log("过滤器详情：")
console.log(filterBinanceIn);
contractUSDT.on(filterBinanceIn, (res) => {
  console.log('---------监听USDT进入交易所--------');
  console.log(
    `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
  )
})
  // 3. 创建过滤器，监听交易所转出USDT
  let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
  console.log("\n3. 创建过滤器，监听USDT转出交易所")
  console.log("过滤器详情：")
  console.log(filterToBinanceOut);
  contractUSDT.on(filterToBinanceOut, (res) => {
    console.log('---------监听USDT转出交易所--------');
    console.log(
      `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2],6)}`
    )
  }
  );
