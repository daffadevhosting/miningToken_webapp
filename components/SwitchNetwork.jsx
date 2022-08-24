import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import styles from "../styles/Home.module.scss";


export default function SwitchNetwork() {
  const router = useRouter();

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress();

function Switch() {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork();
      }
}

  return (
<>
{networkMismatch ? (
    <Button onClick={() => switchNetwork(ChainId.FantomTestnet)} className={`${styles.mainButton} ${styles.loading}`}>
      Switch Network
    </Button>
) : (
      <Button
        className={`${styles.mainButton} ${styles.loading}`}
        onClick={() => router.push(`/mining`)}
      >
        Start Mining
      </Button>
)}
</>
    );
}
