import InputMedal from "@/components/walletMedalInput";
import styles from "@/styles/wallet.module.css";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

function Wallet() {
  const router = useRouter();
  const [codModels, setCodModels] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/");
  };

  useEffect(() => {
    const fetchWallet = async () => {
      const email = localStorage.getItem("email");
      const response = await fetch(`https://api.thatsme.site/wallets/${email}`);
      const data = await response.json();
      const codModels = data.map((item) => item.cod_model);
      setCodModels(codModels);
    };

    fetchWallet();
  }, []);

  return (
    <>
      {codModels.some((codModel) => codModel !== null) ? (
        <div className={styles.container} style={{ overflow: "auto" }}>
          <div className={styles.topMenu}>
            <img src="/logoDash.svg" alt="Logo" />
          </div>
          <div className={styles.sideMenu}>
            <h1 className={styles.textLeft}>Bem Vindo a sua Carteira</h1>
            <button onClick={handleLogout} className={styles.leftButton}>
              Sair
            </button>
          </div>

          <div className={styles.canvas}>
            <div
              className={styles.containerWallet}
              style={{ overflow: "auto" }}
            >
              <div className={styles.walletC}>
                {codModels.map(
                  (codModel) =>
                    codModel !== null && (
                      <div key={codModel} className="sketchfab-embed-wrapper">
                        <iframe
                          frameborder="0"
                          allowfullscreen
                          mozallowfullscreen="true"
                          webkitallowfullscreen="true"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          xr-spatial-tracking
                          execution-while-out-of-viewport
                          execution-while-not-rendered
                          web-share
                          width="240"
                          height="280"
                          src={`https://sketchfab.com/models/${codModel}/embed?&autostart=1&preload=1`}
                        ></iframe>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InputMedal />
      )}
    </>
  );
}

export default Wallet;
