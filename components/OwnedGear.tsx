import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import LoadingSection from "./LoadingSection";
import styles from "../styles/Home.module.scss";
import { BigNumber } from "ethers";
import { MINING_CONTRACT_ADDRESS } from "../const/contract";

type Props = {
  initialContract: EditionDrop;
  miningContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - Initials the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGear({ initialContract, miningContract }: Props) {
  const address = useAddress();
  const { data: ownedInitials, isLoading } = useOwnedNFTs(
    initialContract,
    address
  );

  if (isLoading) {
    return <LoadingSection />;
  }

  async function equip(id: BigNumber) {
    if (!address) return;

    // The contract requires approval to be able to transfer the initial
    const hasApproval = await initialContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await initialContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", id);

    // Refresh the page
    window.location.reload();
  }

  return (
    <>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
            Item kamu
          </h2>
          <div
            style={{
              width: "100%",
              minHeight: "10rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
            }}
          >
      <div className={styles.nftBoxGrid}>
        {ownedInitials?.map((p) => (
          <div className={styles.nftBox} key={p.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={p.metadata}
              className={`${styles.nftMedia} ${styles.spacerTop}`}
              height={"64"}
            />
            <h3>{p.metadata.name}</h3>

            <button
              onClick={() => equip(p.metadata.id)}
              className={`${styles.miniBtn} ${styles.spacerBottom}`}
            >
              Pakai
            </button>
          </div>
        ))}
          </div>
      </div>
    </>
  );
}
