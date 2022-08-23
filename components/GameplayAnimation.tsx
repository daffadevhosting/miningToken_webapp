import React from "react";
import styles from "../styles/Gameplay.module.css";
import EditionDropMetadata from "../types/EditionDropMetadata";

const Pohon = (
  <div className={styles.slide}>
    <img src="./pohon.png" height="48" width="48" alt="pohon" />
  </div>
);

const Pohon1 = (
  <div className={styles.slide}>
    <img src="./pohon1.png" height="48" width="48" alt="pohon1" />
  </div>
);

const House = (
  <div className={styles.slideHouse}>
    <img style={{zIndex: '-1px'}} src="./home.png" height="80" width="110" alt="house" />
  </div>
);

const House1 = (
  <div className={styles.slideHouse}>
    <img style={{zIndex: '-1px'}} src="./home1.png" height="80" width="110" alt="house" />
  </div>
);

const House2 = (
  <div className={styles.slideHouse}>
    <img style={{zIndex: '-1px'}} src="./home2.png" height="80" width="110" alt="house" />
  </div>
);


type Props = {
  pickaxe: EditionDropMetadata | undefined;
};

export default function GameplayAnimation({ pickaxe }: Props) {
  if (!pickaxe) {
    return 
        <div>
    <div style={{ marginLeft: 8 }}>saya perlu bahan bakar !</div></div>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.sliderHouse}>
{House}
{House1}
{House2}
{House1}
{House}
{House2}
{House}
{House1}
{House2}
{House1}
{House}
{House2}
{House1}
{House2}
{House1}
{House}
{House2}
{House}
{House1}
{House2}
{House}
</div>
      <div className={styles.slideTrack}>
        {Pohon}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon}
        {Pohon1}
        {Pohon}
<div className={styles.road}></div>
      </div>
    </div>
  );
}
