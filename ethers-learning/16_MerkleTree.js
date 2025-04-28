import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import * as contractJson from "./merkleTree.json" assert { type: "json" };

// 生成merkle tree
console.log("\n1. 生成merkle tree");
// 白名单
const tokens = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
];

const leaf = tokens.map((x) => ethers.keccak256(x));
const merkletree = new MerkleTree(leaf, ethers.keccak256, { sortPairs: true });
const proof = merkletree.getHexProof(leaf[0]);
const root = merkletree.getHexRoot();
console.log("Leaf:");
console.log(leaf);
console.log("\nMerkleTree:");
console.log(merkletree.toString());
console.log("\nProof:");
console.log(proof);
console.log("\nRoot:");
console.log(root);

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/9f5945b0c11c473ebce00a1c2f7804ae"
);

const privateKey =
  "bfcc5f254b33c583482ed6c1e0fb73bb5a551780599a190870a7396d8293a2f2";

const wallet = new ethers.Wallet(privateKey, provider);

// 3. 创建合约工厂
// NFT的abi
const abiNFT = [
  "constructor(string memory name, string memory symbol, bytes32 merkleroot)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function mint(address account, uint256 tokenId, bytes32[] calldata proof) external",
  "function ownerOf(uint256) view returns (address)",
  "function balanceOf(address) view returns (uint256)",
];

const bytecodeNFT = contractJson.default.object;
const factoryNFT = new ethers.ContractFactory(abiNFT, bytecodeNFT, wallet);
console.log("\n2. 利用contractFactory部署NFT合约");
// 部署合约
const contractNFT = await factoryNFT.deploy("WTF Merkle Tree", "WTF", root);
console.log(`合约地址: ${contractNFT.target}`);
console.log("等待合约部署上链");
await contractNFT.waitForDeployment();
console.log("合约已上链");

console.log(
  "\n3. 调用mint()函数，利用merkle tree验证白名单，给第一个地址铸造NFT"
);
console.log(`NFT名称: ${await contractNFT.name()}`);
console.log(`NFT代号: ${await contractNFT.symbol()}`);
let tx = await contractNFT.mint(tokens[0], "0", proof);
console.log("铸造中，等待交易上链");
await tx.wait();
console.log(
  `mint成功，地址${tokens[0]} 的NFT余额: ${await contractNFT.balanceOf(
    tokens[0]
  )}\n`
);
