import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import React, { useState } from "react";


export default function SwitchNetwork({ switch }) {

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress();


  async function switch() {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.FantomTestnet);
        return;
      }
  }
  return (

)
}
