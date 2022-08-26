import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import {
  useAddress,
  useEditionDrop,
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useOwnedNFTs,
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { CHARACTER_EDITION_ADDRESS } from "../const/contract";
import MintContainer from "../components/MintContainer";
import SwitchNetwork from "../components/SwitchNetwork";
import MiningToken from "../components/mining";
import { useRouter } from "next/router";
import Spinner from 'react-bootstrap/Spinner';

const Home: NextPage = () => {

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editionDrop = useEditionDrop(CHARACTER_EDITION_ADDRESS);


  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
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
<>
<Head>
<title>InitialD Token</title>
</Head>
      <div className={styles.loading}>
        <Button
          className={`${styles.mainButton}`}
           onClick={handleShow}
        >
          Connect Wallet
        </Button>
      </div>
    <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Connect your Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <ListGroup>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithMetamask(); handleClose();}}><i className={styles.metamask}/> MetaMask</ListGroup.Item>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithWalletConnect(); handleClose();}}><i className={styles.walletconnect}/> WalletConnect</ListGroup.Item>
      <ListGroup.Item style={{display: 'flex', alignItems: 'center', gap: 15, cursor: 'pointer'}} onClick={ () => { connectWithCoinbaseWallet(); handleClose();}}><i className={styles.coinbase}/> Coin Base</ListGroup.Item>
    </ListGroup>
    </Modal.Body>
      </Modal>
</>
    );
  }


  if (isLoading) {
    return <div className={styles.loading}><Spinner animation="grow" /></div>;
  }

  if (!ownedNfts || isError) {
    return <div className={styles.loading}>Error...!</div>;
  }

  if (ownedNfts.length === 0 || networkMismatch) {
    return (
<>
<Head>
<title>InitialD Token</title>
</Head>
      <div className={styles.container}>
        <SwitchNetwork />
        <MintContainer />
      </div>
</>
    );
  }


  return (
<>
<Head>
<title>InitialD Token</title>
</Head>
    <div className={styles.containerPlay}>
        <SwitchNetwork />
        <MiningToken />
    </div>
</>
  );
};

export default Home;
