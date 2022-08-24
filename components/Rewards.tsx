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

    await miningContract.call("claim");
  }

  return (
    <Card className={styles.rewardBox}
    >
{tokenMetadata && (
<>
      <Card.Title style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"25"}
        /> {tokenMetadata.name}      
      </Card.Title>
<small>smartcontracts: {numberContract}</small>
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
        className={`${styles.miniBtn} ${styles.spacerBottom}`}
      >
        Claim
      </Button>
   </Card>
  );
}
