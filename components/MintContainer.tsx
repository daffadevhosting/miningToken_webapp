import {
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useEditionDrop,
} from "@thirdweb-dev/react";
import React from "react";
import Image from 'next/image';
import { CHARACTER_EDITION_ADDRESS } from "../const/contract";
import styles from "../styles/Home.module.scss";

export default function MintContainer() {
  const editionDrop = useEditionDrop(CHARACTER_EDITION_ADDRESS);
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();

  return (
    <div className={styles.collectionContainer}>
      <h1>Edition Drop</h1>

      <p>Claim NFT gratis mu & mulailah menambang!</p>

      <div className={`${styles.nftBox} ${styles.spacerBottom}`}>
        <Image src="/motorcyclist.webp" height="200" widht="200" alt="logo" style={{ height: 200 }} />
      </div>

      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() =>
          claim({
            quantity: 1,
            to: address as string,
            tokenId: 0,
          })
        }
      >
        {isLoading ? "Loading..." : "Claim"}
      </button>
    </div>
  );
}
