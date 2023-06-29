import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/menu/navbar";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const confirmLogin = (email, userEmail) => {
    return new Promise((resolve, reject) => {
      if (email === userEmail) {
        localStorage.setItem("email", email);
        router.push("/feed");
        resolve();
      } else {
        setError(
          "As credenciais fornecidas estão incorretas. Tente novamente."
        );
        reject();
      }
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.thatsme.site/userInfo/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      await confirmLogin(email, data[0].email);
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
          <div className={styles.right}>
            <h1>MINHA</h1>
            <h2>CARTEIRA DIGITAL</h2>
            <form className={styles.form} onSubmit={handleEmailSubmit}>
              <label className={styles.label} htmlFor="email">
                Entre na sua digital wallet preenchendo o campo abaixo.
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <div className={styles.error}>E-mail invalido</div>}

              <button className={styles.button} type="submit">
                Acessar
              </button>
            </form>
            <p>
              Ainda não está cadastrado?{" "}
              <Link href="/signup" style={{ color: "white" }}>
                Clique aqui!
              </Link>
            </p>
          </div>

          <div className={styles.trophy}>
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
              width="1000"
              height="1000"
              src={`https://sketchfab.com/models/56c6c36c4ca2498985ff4728d6659d1f/embed?autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1`}
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}
