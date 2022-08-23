import {
  useAddress,
  useContract,
  useEditionDrop,
  useMetamask,
  useToken,
} from "@thirdweb-dev/react";
import React from "react";
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
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const characterContract = useEditionDrop(CHARACTER_EDITION_ADDRESS);
  const initialContract = useEditionDrop(INITIAL_EDITION_ADDRESS);
  const tokenContract = useToken(INITIAL_TOKEN_ADDRESS);

  if (!address) {
    return (
      <div className={styles.container}>
        <button className={styles.mainButton} onClick={connectWithMetamask}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
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
        <LoadingSection />
      )}

      <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

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

      <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

      {initialContract && tokenContract ? (
        <>
<div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel" style={{height: '80vh'}}>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasBottomLabel">Beli Bahan Bakar</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body small">
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
  </div>
</div>
<button className="btn btn-primary p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" style={{position: 'fixed', bottom: 20, right: 20, width: '54px', height: '54px'}}><BsShopWindow size={'30px'}/></button>

        </>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}
