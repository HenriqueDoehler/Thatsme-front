import React from "react";
import styles from "@/styles/wallet.module.css";
import { useRouter } from "next/router";

function SideNav() {
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
      <div className={styles.btnContainer}>
        <div className={styles.topBtnContainer}>
          <button
            onClick={() => router.push("/feed")}
            className={styles.sideBtn}
          >
            Feed
          </button>
          <button
            onClick={() => router.push("/wallet")}
            className={styles.sideBtn}
          >
            Carteira
          </button>
        </div>
        <button onClick={handleLogout} className={styles.exitBtn}>
          Sair
        </button>
      </div>
  );
}

export default SideNav;
