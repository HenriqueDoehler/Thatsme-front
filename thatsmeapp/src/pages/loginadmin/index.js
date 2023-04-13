import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";
import Navbar from "@/components/menu/navbar";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.innerWidth < 700) {
      document.body.innerHTML =
        "<h1>Histórico/Dashboard administrativo não disponível em dispositivos móveis</h1>";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.thatsme.site/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError(
          "As credenciais fornecidas estão incorretas. Tente novamente."
        );
      }
    } catch (err) {
      setError("As credenciais fornecidas estão incorretas. Tente novamente.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgLogin}>
          <img src="/loginimg.svg" alt="loading ..." />
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              className={styles.label}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              className={styles.label}
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
        <div className={styles.forgotPassword}>
          <Link
            style={{ textDecoration: "none", color: "whitesmoke" }}
            href="/forgotPassword"
          >
            <span>Esqueci minha senha</span>
          </Link>
        </div>
      </div>
    </>
  );
}
