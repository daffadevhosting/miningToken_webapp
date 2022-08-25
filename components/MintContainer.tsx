import {
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useEditionDrop,
} from "@thirdweb-dev/react";
import React from "react";
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import SwitchNetwork from "../components/SwitchNetwork";
import { CHARACTER_EDITION_ADDRESS } from "../const/contract";
import styles from "../styles/Home.module.scss";

export default function MintContainer() {
  const editionDrop = useEditionDrop(CHARACTER_EDITION_ADDRESS);
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();

  return (
    <div className={styles.collectionContainer}>
      <h1>Edition Drop</h1>

      <p>Claim NFT gratis mu & mulai menambang!</p>

      <div className={`${styles.nftBox} ${styles.spacerBottom}`}>
        <Image src="/motorcyclist.webp" height={200} width={200} alt="logo" style={{ height: 200 }} />
      </div>
        {isLoading ? (
<div>
      <Button className={`${styles.mainButton} ${styles.spacerBottom}`} disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">
        Loading...</span>
      </Button>
</div>
    ) : (
<div>
        <SwitchNetwork />
      <Button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() =>
          claim({
            quantity: 1,
            to: address as string,
            tokenId: 0,
          })
        }

      >
    Claim
      </Button>
</div>
 )}
    </div>
  );
}
