import React from "react";
import { useAccount, useBalance } from "wagmi";

export const Info: React.FC = () => {
  const { address } = useAccount();
  const { data, error } = useBalance({ address });
  console.log("data", address, data);
  // const {data: rccTokenData} = useBalance({})

  return (
    <div>
      <div>Address: {address}</div>
      <div>ETH Balance: {data?.formatted}</div>
    </div>
  );
};

export default Info;
