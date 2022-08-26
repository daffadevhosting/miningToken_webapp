import {
  ThirdwebNftMedia,
  useAddress,
  useMetadata,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { INITIAL_TOKEN_ADDRESS } from "../const/contract";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/Home.module.scss";
import ApproxRewards from "./ApproxRewards";

const numberContract = INITIAL_TOKEN_ADDRESS;

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

export default function Rewards({ miningContract, tokenContract }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);

  const [unclaimedAmount, setUnclaimedAmount] = useState<BigNumber>();

  useEffect(() => {
    (async () => {
      if (!address) return;

      const u = await miningContract.call("calculateRewards", address);
      setUnclaimedAmount(u);

    })();
  }, [address, miningContract]);

  async function claim() {
    if (!address) return;

    await miningContract.call("claim")
    {
    try {
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Token berhasil di claim...',
          showConfirmButton: false,
          timer: 3800
        });
    } catch (error) {
        Swal.fire({
          position: 'middle',
          icon: 'error',
          title: 'Token gagal di claim...',
          showConfirmButton: false,
          timer: 3800
        });
    }
  }
}

  return (
    <Card className={styles.rewardBox}
    >
{tokenMetadata && (
<>
      <Card.Title>
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
<div className={styles.titleLeft}>
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"25"}
        /> {tokenMetadata.name} </div>
<div className={styles.titleRight}>
<a target='_blank' href='https://testnet.ftmscan.com/token/0xb6d72C734d5118E17f79ac7878C5f17a88ad17c6' rel="noreferrer"><Image src='/logo-ftmscan.svg' width={120} height={20}/></a></div>
</div>
      </Card.Title>
<small style={{marginBottom: 10}}>smartcontracts: {numberContract}</small>
      <p className={styles.noGapBottom}>

        Saldo di wallet: <b>{currentBalance?.displayValue} <small>ID</small></b>
      </p>
      <p>
       Offline Mining:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)} <small>ID</small></b>
      </p>
</>
      )}
      <ApproxRewards miningContract={miningContract} />

      <Button variant="primary"
        onClick={() => claim()}
        className={styles.miniBtn}
        style={{display: 'block', width: '-webkit-fill-available'}}
      >
        Claim
      </Button>
   </Card>
  );
}
