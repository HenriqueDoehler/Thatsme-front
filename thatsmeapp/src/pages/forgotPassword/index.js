import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";
import Navbar from "@/components/menu/navbar";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.thatsme.site/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        router.push("/reset");
        setMessage("codigo enviado com sucesso!");
      } else {
        setError("Ocorreu um erro ao enviar o email de redefinição de senha.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao enviar o email de redefinição de senha.");
    }
  };

  if (message) {
    alert(message);
  }

  return (
    <>
      <Head>
        <title>Esqueci minha senha</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.label}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
