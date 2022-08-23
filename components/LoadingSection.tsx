import React from "react";
import styles from "../styles/Home.module.scss";

export default function LoadingSection() {
  return <div className={styles.container}><div className="spinner-grow" role="status">
  <span className="visually-hidden">Loading...</span></div></div>;
}
