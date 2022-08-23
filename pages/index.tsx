import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import {
  useAddress,
  useEditionDrop,
  useMetamask,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { CHARACTER_EDITION_ADDRESS } from "../const/contract";
import MintContainer from "../components/MintContainer";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const editionDrop = useEditionDrop(CHARACTER_EDITION_ADDRESS);

  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const router = useRouter();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  // 0. Wallet Connect - required to check if they own an NFT
  if (!address) {
    return (
      <div className={styles.container}>
        <button
          className={`${styles.mainButton} ${styles.loading}`}
          onClick={connectWithMetamask}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  // 1. Loading
  if (isLoading) {
    return <div className={styles.loading}><div className="spinner-grow" role="status">
  <span className="visually-hidden">Loading...</span></div>
</div>;
  }

  // Something went wrong
  if (!ownedNfts || isError) {
    return <div className={styles.loading}>Error</div>;
  }

  // 2. No NFTs - mint page
  if (ownedNfts.length === 0) {
    return (
      <div className={styles.container}>
        <MintContainer />
      </div>
    );
  }

  // 3. Has NFT already - show button to take to game
  return (
    <div className={styles.container}>
      <button
        className={`${styles.mainButton} ${styles.loading}`}
        onClick={() => router.push(`/play`)}
      >
        Play Game
      </button>
    </div>
  );
};

export default Home;
