import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import EditionDropMetadata from "../types/EditionDropMetadata";
import GameplayAnimation from "./GameplayAnimation";
import styles from "../styles/Home.module.scss";
import Gameplay from "../styles/Gameplay.module.scss";

type Props = {
  miningContract: SmartContract<any>;
  characterContract: EditionDrop;
  initialContract: EditionDrop;
};

export default function CurrentGear({
  miningContract,
  characterContract,
  initialContract,
}: Props) {
  const address = useAddress();

  const { data: playerNft } = useNFT(characterContract, 0);
  const [initial, setInitial] = useState<EditionDropMetadata>();


const Cloud = (
  <div className={Gameplay.slideCloud}>
    <img style={{zIndex: '-1px'}} src="./cloud.png" height="360" width="100%" alt="cloud" />
  </div>
);

  useEffect(() => {
    (async () => {
      if (!address) return;

      const p = (await miningContract.call(
        "playerInitialD",
        address
      )) as ContractMappingResponse;

      // Now we have the tokenId of the equipped initial, if there is one, fetch the metadata for it
      if (p.isData) {
        const initialMetadata = await initialContract.get(p.value);
        setInitial(initialMetadata);
      }
    })();
  }, [address, miningContract, initialContract]);

  return (
<>
{initial ? (
<div className="card" style={{backgroundColor: 'transparent'}}>
    <div className={Gameplay.sliderBox}>
      <div className={Gameplay.sliderCloud}>
{Cloud}
{Cloud}
{Cloud}
{Cloud}
{Cloud}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: '0 12px',
          marginBottom: '40px'
        }}
      >
        {/* Currently equipped player */}
        <div style={{ borderRadius: 16, height: 40, overflow: 'hidden' }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={"40"} />
          )}
        </div>
        {/* Currently equipped initial */}
        <div
          style={{ borderRadius: 16, marginLeft: 8, height: 40, overflow: 'hidden' }}
        >
          {initial && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={initial.metadata} height={"40"} />
          )}
        </div>
      </div>
{initial && (
      <span className={`${styles.noGapTop} `}>Bahan Bakar Yang dipakai: <b>
{initial.metadata.name}</b></span>)}

      {/* Gameplay Animation */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <img className={Gameplay.motor} src="./motor.png" height={64} width={64} alt="character-mining" />
        <GameplayAnimation initial={initial} />
      </div>
    </div>
</div>
) : ( 
<>
<div className="card">
    <div className={Gameplay.sliderBox} style={{padding: '10px', textAlign: 'left'}}>
<h5>Cara Mining Token</h5>
<span> Pilih jenis bahan bakar untuk mengaktifkan fungsi mining.<br/>Setiap bahan bakar mempunyai tingkat kecepatan mining token yang berbeda, kamu bisa memulai dengan bahan bakar "premium" yang disediakan gratis untuk mulai mengumpulkan token. Token bisa dibeli dan dijual di sushiswap segera.</span>
        <img style={{position: 'relative'}} src="./motor.png" height={64} width={64} alt="character-mining" />
    </div>
</div>
</>
    )}
</>
  );
}
