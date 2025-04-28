// 使用 CDN 引入 ethers
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";

const ethereumButton = document.querySelector(".connect");
const showAccount = document.querySelector(".showAccount");
const showChainID = document.querySelector(".showChainID");
const showETHBalance = document.querySelector(".showETHBalance");

const onClickHandler = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  // 读取钱包地址
  const accounts = await provider.send("eth_requestAccounts", []);
  const address = accounts[0];
  console.log(`钱包地址：${address}`, accounts);
  showAccount.innerHTML = address;

  // 读取ChainID
  const { chainId } = await provider.getNetwork();
  console.log(`ChainID：${chainId}`);
  showChainID.innerHTML = chainId;

  // 读取ETH余额
  const signer = await provider.getSigner();
  const balance = await provider.getBalance(signer.getAddress());
  console.log(`以太坊余额： ${ethers.formatUnits(balance)}`);
  showETHBalance.innerHTML = ethers.formatUnits(balance);
};

ethereumButton.addEventListener(`click`, onClickHandler);
