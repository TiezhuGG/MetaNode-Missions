import { ethers } from "ethers";

const provider = new ethers.WebSocketProvider(
  "wss://eth-sepolia.g.alchemy.com/v2/TTH8vjmnx_e_meAvtAju9w9jTSeX7cIv"
);

function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}

// 监听mempool的未决交易
let i = 0;
provider.on("pending", async (txHash) => {
  if (txHash && i < 10) {
    console.log(
      `[${new Date().toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`
    );
    i++;
  }
});

// 通过未决哈希，获取交易详情
let j = 0;
provider.on(
  "pending",
  throttle(async (txHash) => {
    if (txHash && j <= 30) {
      // 获取tx详情
      let tx = await provider.getTransaction(txHash);
      console.log(
        `\n[${new Date().toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`
      );
      console.log(tx);
      j++;
    }
  }),
  1000
);
