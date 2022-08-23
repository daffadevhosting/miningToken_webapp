import { ThirdwebNftMedia, useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.scss";
import ShopItem from "./ShopItem";

type Props = {
  initialContract: EditionDrop;
};

/**
 * This component shows the:
 * - All of the available initials from the edition drop and their price.
 */
export default function Shop({ initialContract }: Props) {
  const { data: availableInitials } = useNFTs(initialContract);

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableInitials?.map((p) => (
          <ShopItem
            initialContract={initialContract}
            item={p}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
