import styles from "@/styles/wallet.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../menu/navbar";
import SideNav from "../menu/sideNav";

const InputMedal = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
        setButtonDisabled(true);
      }
    } catch (err) {
      setError("error");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <SideNav />
        <div className={styles.canvas} style={{ marginRight: "20rem" }}>
          <img className={styles.jumpMan} src="/jumpMan.svg" alt="" />
          <div className={styles.formAddMedal}>
            <h1 style={{ fontSize: "2rem" }} className={styles.textLeft}>
              Bem-Vindo
            </h1>
              <form onSubmit={handleEmailSubmit} className={styles.noMedalForm}>
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
                    onChange={(e) => {
                      setCode(e.target.value);
                      setButtonDisabled(false);
                    }}
                    required
                  />
                  {error && <div className={styles.error}>{error}</div>}
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={buttonDisabled}
                  >
                    Resgatar
                  </button>
                </div>
              </form>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default InputMedal;
