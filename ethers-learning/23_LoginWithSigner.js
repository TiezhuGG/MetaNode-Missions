import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
const signButton = document.querySelector(".sign");
const showAccount = document.querySelector(".showAccount");
const showNonce = document.querySelector(".showNonce");
const showSignature = document.querySelector(".showSignature");
const showSignStatus = document.querySelector(".showSignStatus");

//假设这是后台的数据库，users表里保存了user对象，user对象包含用户的地址和关联的nonce
//{"address": 用户地址, "nonce": 返回给前端的随机数nonce}
export const users = {};

/**
 * 通过地址获取后端生成的随机数 nonce，用于签名
 * @param address  用户地址
 * @returns {number} 返回随机数 nonce
 *
 * 这个方法充当后台服务，从后台中获取需要签名的数据
 */
function auth(address) {
  let user = users[address];
  if (!user) {
    user = {
      address,
      nonce: Math.floor(Math.random() * 10000000),
    };
    users[address] = user;
  } else {
    const nonce = Math.floor(Math.random() * 10000000);
    user.nonce = nonce;
    users[address] = user;
  }
  return user.nonce;
}

/**
 * 验证用户签名是否正确
 * @param address   用户地址
 * @param signature 签名数据
 * @returns {boolean} 返回签名是否正确
 *
 * 这个方法充当后台服务，后台验证签名正确后，就返回相关登录态数据，完成登录流程
 */
function verify(address, signature) {
  console.log("开始验证签名");
  let signValid = false;
  //从数据库中取出nonce
  let nonce = users[address].nonce;
  //验证对nonce进行签名的地址
  const decodedAddress = ethers.verifyMessage(
    nonce.toString(),
    signature.toString()
  );
  console.log(`decodedAddress: ${decodedAddress}`);
  //比较地址和签名的地址是否一致
  if (address.toLowerCase() === decodedAddress.toLowerCase()) {
    signValid = true;
    //出于安全原因，更改nonce，防止下次直接使用相同的nonce进行登录
    users[address].nonce = Math.floor(Math.random() * 10000000);
  }
  return signValid;
}

// 前端签名流程
async function onClickHandler() {
  console.log("连接钱包");
  // 获得provider
  const provider = new ethers.BrowserProvider(window.ethereum);
  // 读取钱包地址
  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0];
  console.log(`钱包地址: ${account}`);
  showAccount.innerHTML = account;

  //从后台获取需要进行签名的数据
  const nonce = auth(account);
  showNonce.innerHTML = nonce;
  console.log(`获取后台需要签名的数据: ${nonce}`);
  //签名
  const signer = await provider.getSigner();
  const signature = await signer.signMessage(nonce.toString());
  showSignature.innerHTML = signature;
  //去后台验证签名，完成登录
  const signStatus = verify(account, signature);
  showSignStatus.innerHTML = signStatus;
}

signButton.addEventListener(`click`, onClickHandler);
