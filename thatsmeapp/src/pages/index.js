import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/menu/navbar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.thatsme.site/wallets/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        localStorage.setItem("email", email);
        router.push("/wallet");
      } else {
        setError(
          "As credenciais fornecidas estão incorretas. Tente novamente."
        );
      }
    } catch (err) {
      setError("error");
    }
  };

  return (
    <>
      <Head>
        <title>Thats Me</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="Thats Me APP" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.containerImage}>
            <div className={styles.left1}>
              <img
                draggable="false"
                className={styles.beyourbestself}
                src="/Beyourbestself.svg"
                alt="left-image-1"
              />
            </div>
            <div className={styles.left2}>
              <img
                draggable="false"
                className={styles.thatsmeiconligth}
                src="/thatsmeiconLigth.svg"
                alt="left-image-2"
              />
            </div>
          </div>

          <div className={styles.right}>
            <img
              src="/Mydigitalwallet.svg"
              alt="right-image"
              draggable="false"
            />
            <form className={styles.form} onSubmit={handleEmailSubmit}>
              <label className={styles.label} htmlFor="email">
                Entre na sua digital wallet preenchendo o e-mail abaixo
              </label>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <div className={styles.error}>e-mail invalido</div>}
              </div>

              <button className={styles.button} type="submit">
                Acessar
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
