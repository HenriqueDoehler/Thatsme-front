import styles from "@/styles/wallet.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const InputMedal = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      router.push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://api.thatsme.site/addMedal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, short_code: code }),
      });
      if (res.status === 200) {
        router.reload("/wallet");
      } else {
        setError("Codigo Incorreto.");
      }
    } catch (err) {
      setError("error");
    }
  };

  return (
    <>
      <div className={styles.container} style={{ overflow: "auto" }}>
        <div className={styles.sideMenu}>
          <h1 className={styles.textLeft}>Bem Vindo</h1>
          <button onClick={handleLogout} className={styles.leftButton}>
            Sair
          </button>
        </div>
        <div className={styles.topMenu}>
          <img src="/logoDash.svg" alt="Logo" />
        </div>

        <div className={styles.canvas}>
          <img className={styles.jumpMan} src="/jumpMan.svg" alt="" />
          <div className={styles.containerInput}>
            <form className={styles.form} onSubmit={handleEmailSubmit}>
              <img
                className={styles.imgWallet}
                src="/Mydigitalwallet.svg"
                alt="right-image"
                draggable="false"
              />
              <label className={styles.label} htmlFor="email">
                Conquiste a sua 1ª medalha
              </label>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="text"
                  id="email"
                  placeholder="Codigo"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                {error && <div className={styles.error}>{error}</div>}
              </div>

              <button className={styles.button} type="submit">
                Resgatar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputMedal;
