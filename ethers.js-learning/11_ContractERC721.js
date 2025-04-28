import { ethers } from "ethers";

const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/TTH8vjmnx_e_meAvtAju9w9jTSeX7cIv";

const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// 合约abi
const abiERC721 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function supportsInterface(bytes4) public view returns(bool)",
];

// ERC721的合约地址，这里用的BAYC
const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider);

// 读取ERC721合约的链上信息
const nameERC721 = await contractERC721.name();
const symbolERC721 = await contractERC721.symbol();
console.log("\n1. 读取ERC721合约信息");
console.log(`合约地址: ${addressBAYC}`);
console.log(`名称: ${nameERC721}`);
console.log(`代号: ${symbolERC721}`);

// 2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准
// ERC721接口的ERC165 identifier
const interfaceIdERC721 = "0x80ac58cd";
const isERC721 = await contractERC721.supportsInterface(interfaceIdERC721);
console.log("\n2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准");
console.log(`合约是否为ERC721标准: ${isERC721}`);
