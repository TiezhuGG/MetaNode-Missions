import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

module.exports = buildModule("FFCoin", (m) => {
  const FFCoin = m.contract("FFCoin", []);
  return { FFCoin };
});
