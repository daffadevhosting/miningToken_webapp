import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
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
    <Image className={Gameplay.awan} style={{zIndex: '-1px'}} src="/cloud.png" height={260} width={525} alt="cloud" />
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
<Card style={{backgroundColor: 'transparent'}}>
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
          padding: '0 10px',
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
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
            // @ts-ignore
      <span className={`${styles.noGapTop} `}></span>
    )}

      {/* Gameplay Animation */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 33,
        }}
      >
        <Image className={Gameplay.motor1} src="/motor.png" height={64} width={64} alt="character-mining" />
        <GameplayAnimation initial={initial} />
      </div>
    </div>
</Card>
) : ( 
<>
<Card className="card">
    <Card.Body className={Gameplay.sliderBox} style={{padding: '10px', textAlign: 'left'}}>
<Card.Title>Cara Mining Token</Card.Title>
<span> Pilih jenis bahan bakar untuk mengaktifkan fungsi mining.<br/>Setiap bahan bakar mempunyai tingkat kecepatan menambang yang berbeda, kamu bisa memulai dengan bahan bakar "premium" yang disediakan <b>gratis</b> untuk mulai mengumpulkan token. Atau bisa juga kamu membeli bahan bakar lain untuk kecepatan mining maksimal, Token bisa dibeli dan dijual di sushiswap segera.</span>
        <Image className={Gameplay.motor} src="/motor.png" height="64px" width="64px" alt="character-mining" />
    </Card.Body>
</Card>
</>
    )}
</>
  );
}
