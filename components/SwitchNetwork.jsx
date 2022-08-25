import {
  useNetwork,
  useNetworkMismatch,
  ChainId
} from "@thirdweb-dev/react";
import Button from 'react-bootstrap/Button';
import styles from "../styles/Home.module.scss";


export default function SwitchNetwork() {

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

function Switch() {
      // Ensure user is on the correct network
      if (!networkMismatch) {
        switchNetwork && switchNetwork();
      }
}

  return (
<>
{networkMismatch ? (
<div className={styles.coverup}>
    <Button onClick={() => switchNetwork(ChainId.FantomTestnet)} className={`${styles.mainButton} ${styles.loading}`}>
      Switch Network
    </Button>
</div>
) : (
<>
</>
)}
</>
    );
}
