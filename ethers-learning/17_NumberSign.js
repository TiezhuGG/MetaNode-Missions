import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";

const wallet = new ethers.Wallet(privateKey, provider);

// 1.打包消息
const account = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const tokenId = "0";
const msgHash = ethers.solidityPackedKeccak256(
  ["address", "uint256"],
  [account, tokenId]
);
console.log(`msgHash: ${msgHash}`);

// 2.签名
const messageHashBytes = ethers.getBytes(msgHash);
const signature = await wallet.signMessage(messageHashBytes);
console.log(`签名：${signature}`);

// 3.创建工厂合约
// NFT的人类可读abi
// NFT的人类可读abi
const abiNFT = [
  "constructor(string memory _name, string memory _symbol, address _signer)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function mint(address _account, uint256 _tokenId, bytes memory _signature) external",
  "function ownerOf(uint256) view returns (address)",
  "function balanceOf(address) view returns (uint256)",
];
// 合约字节码，在remix中，你可以在两个地方找到Bytecode
// i. 部署面板的Bytecode按钮
// ii. 文件面板artifact文件夹下与合约同名的json文件中
// 里面"object"字段对应的数据就是Bytecode，挺长的，608060起始
// "object": "608060405260646000553480156100...
const bytecodeNFT = contractJson.default.object;
const factoryNFT = new ethers.ContractFactory(abiNFT, bytecodeNFT, wallet);

// 部署合约，填入constructor的参数
const contractNFT = await factoryNFT.deploy(
  "WTF Signature",
  "WTF",
  wallet.address
);
console.log(`合约地址: ${contractNFT.target}`);
console.log("等待合约部署上链");
await contractNFT.waitForDeployment();
// 也可以用 contractNFT.deployTransaction.wait()
console.log("合约已上链");
console.log(`NFT名称: ${await contractNFT.name()}`);
console.log(`NFT代号: ${await contractNFT.symbol()}`);
let tx = await contractNFT.mint(account, tokenId, signature);
console.log("铸造中，等待交易上链");
await tx.wait();
console.log(
  `mint成功，地址${account} 的NFT余额: ${await contractNFT.balanceOf(
    account
  )}\n`
);
