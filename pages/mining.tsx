import {
  useAddress,
  useContract,
  useEditionDrop,
  useMetamask,
  useToken,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import { BsShopWindow } from "react-icons/bs";
import {
  CHARACTER_EDITION_ADDRESS,
  INITIAL_TOKEN_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  INITIAL_EDITION_ADDRESS,
} from "../const/contract";
import styles from "../styles/Home.module.scss";

export default function Play() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const characterContract = useEditionDrop(CHARACTER_EDITION_ADDRESS);
  const initialContract = useEditionDrop(INITIAL_EDITION_ADDRESS);
  const tokenContract = useToken(INITIAL_TOKEN_ADDRESS);

  if (!address) {
    return (
      <Container>
        <button className={styles.mainButton} onClick={connectWithMetamask}>
          Connect Wallet
        </button>
      </Container>
    );
  }

  return (
    <Container style={{ margin: '10px auto' }}>
      {miningContract &&
      characterContract &&
      tokenContract &&
      initialContract ? (
        <div className={styles.mainSection}>
          <CurrentGear
            miningContract={miningContract}
            characterContract={characterContract}
            initialContract={initialContract}
          />
          <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          />
        </div>
      ) : (
        <></>
      )}


      {initialContract && miningContract ? (
        <>
            <OwnedGear
              initialContract={initialContract}
              miningContract={miningContract}
            />
        </>
      ) : (
        <LoadingSection />
      )}
<></>

      {initialContract && tokenContract ? (
        <>
    <Offcanvas show={show} onHide={handleClose} placement='bottom' style={{height: '80vh'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><BsShopWindow size={'28px'}/> Shop Item</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
            <Shop initialContract={initialContract} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
<Button variant="primary" onClick={handleShow} className="me-2" style={{position: 'fixed', bottom: 20, right: 20, width: '54px', height: '54px'}}><BsShopWindow size={'28px'}/></Button>

        </>
      ) : (
        <LoadingSection />
      )}
    </Container>
  );
}
