import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";
import Navbar from "@/components/menu/navbar";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://api.thatsme.site/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (res.status === 200) {
        setSuccess("Senha redefinida com sucesso!");
        router.push("/loginadmin");
      } else {
        setError(
          "Não foi possível redefinir a senha. Verifique as informações e tente novamente."
        );
      }
    } catch (err) {
      setError(
        "Não foi possível redefinir a senha. Tente novamente mais tarde."
      );
    }
  };

  return (
    <>
      <Head>
        <title>Redefinir Senha</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imgLogin}>
          <img src="/loginimg.svg" alt="Sua imagem SVG" />
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
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
          <div>
            <label htmlFor="code">Código:</label>
            <input
              className={styles.label}
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">Nova Senha:</label>
            <input
              className={styles.label}
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
