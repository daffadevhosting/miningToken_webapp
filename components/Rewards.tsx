import {
  ThirdwebNftMedia,
  useAddress,
  useMetadata,
  useTokenBalance,
  useContract,
  useContractData
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { GOLD_GEMS_ADDRESS } from "../const/contractAddresses";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ApproxRewards from "./ApproxRewards";

const noContract = GOLD_GEMS_ADDRESS;

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
  tokenSymbol: Token;
};

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards({ miningContract, tokenContract, tokenSymbol }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract, tokenSymbol);
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
    <div className={styles.rewardBox}
    >
{tokenMetadata && (
<>
      <p style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '5px'}}>        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"25"}
        />
<b>{tokenMetadata.name}</b>      
      </p>
<small>smartcontracts: {noContract}</small>
      <p className={styles.noGapBottom}>

        Saldo di wallet: <b>{currentBalance?.displayValue} <small>{tokenMetadata.symbol}</small></b>
      </p>
      <p>
       Offline Mining:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)} <small>{tokenMetadata.symbol}</small></b>
      </p>
</>
      )}
      <ApproxRewards miningContract={miningContract} />

      <button
        onClick={() => claim()}
        className={`${styles.miniBtn} ${styles.spacerBottom}`}
      >
        Claim
      </button>
    </div>
  );
}
