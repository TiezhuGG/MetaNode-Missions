import {
  formatUnits,
  getBigInt,
  formatEther,
  parseUnits,
  parseEther,
} from "ethers";

const oneGwei = getBigInt("1000000000");
console.log(oneGwei);
console.log(getBigInt("0x3b9aca00"));
console.log(getBigInt(1000000000));
console.log("js中最大安全整数：", Number.MAX_SAFE_INTEGER);

console.log("加法：", oneGwei + 1n);
console.log("减法：", oneGwei - 1n);
console.log("乘法：", oneGwei * 2n);
console.log("除法：", oneGwei / 2n);

console.log("是否相等：", oneGwei == 1000000000n);

console.group("格式化：小单位转大单位 formatUnits");
console.log(formatUnits(oneGwei, 0));
console.log(formatUnits(oneGwei, "gwei"));
console.log(formatUnits(oneGwei, 9));
console.log(formatUnits(oneGwei, "ether"));
console.log(formatUnits(1000000000, "gwei"));
console.log(formatEther(oneGwei));
console.groupEnd();

console.group("解析：大单位转小单位, parseUnits");
console.log(parseUnits("1.0").toString());
console.log(parseUnits("1.0", "ether").toString());
console.log(parseUnits("1.0", 18).toString());
console.log(parseUnits("1.0", "gwei").toString());
console.log(parseUnits("1.0", 9).toString());
console.log(parseUnits("1.0", "wei").toString());
console.log(parseEther("1.0").toString());
console.groupEnd();
