import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import EditionDropMetadata from "../types/EditionDropMetadata";
import GameplayAnimation from "./GameplayAnimation";
import styles from "../styles/Home.module.css";
import Gameplay from "../styles/Gameplay.module.css";

type Props = {
  miningContract: SmartContract<any>;
  characterContract: EditionDrop;
  pickaxeContract: EditionDrop;
};

/**
 * This component shows the:
 * - Currently equipped miner character (right now there is just one (token ID 0))
 * - Currently equipped character's pickaxe
 */
export default function CurrentGear({
  miningContract,
  characterContract,
  pickaxeContract,
}: Props) {
  const address = useAddress();

  const { data: playerNft } = useNFT(characterContract, 0);
  const [pickaxe, setPickaxe] = useState<EditionDropMetadata>();


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

      // Now we have the tokenId of the equipped pickaxe, if there is one, fetch the metadata for it
      if (p.isData) {
        const pickaxeMetadata = await pickaxeContract.get(p.value);
        setPickaxe(pickaxeMetadata);
      }
    })();
  }, [address, miningContract, pickaxeContract]);

  return (
<>
{pickaxe ? (
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
          marginBottom: '60px'
        }}
      >
        {/* Currently equipped player */}
        <div style={{ borderRadius: 16, height: 40, overflow: 'hidden' }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={"40"} />
          )}
        </div>
        {/* Currently equipped pickaxe */}
        <div
          style={{ borderRadius: 16, marginLeft: 8, height: 40, overflow: 'hidden' }}
        >
          {pickaxe && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={pickaxe.metadata} height={"40"} />
          )}
        </div>
      </div>
{pickaxe && (
      <h3 className={`${styles.noGapTop} `}>Bahan Bakar Yang dipakai: <b>
{pickaxe.metadata.name}</b></h3>)}

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
        <GameplayAnimation pickaxe={pickaxe} />
      </div>
    </div>
) : ( 
<>
    <div className={Gameplay.sliderBox}>
<h4>Untuk Memulai</h4>
<span style={{padding: '10px', textAlign: 'left'}}> Pilih jenis bahan bakar untuk mengaktifkan fungsi mining.<br/>Setiap bahan bakar mempunyai tingkat kecepatan mining token yang berbeda, kamu bisa memulai dengan bahan bakar "premium" yang disediakan gratis untuk mulai mengumpulkan token. Token bisa dibeli dan dijual di sushiswap segera.</span>
        <img style={{position: 'relative'}} src="./motor.png" height={64} width={64} alt="character-mining" />
    </div>

</>
    )}
</>
  );
}
