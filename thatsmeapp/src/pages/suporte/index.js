import { useState, useEffect } from "react";
import styles from "@/styles/formMail.module.css";
import Navbar from "@/components/menu/navbar";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/api/mail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });
  };

  return (
    <>
      <Navbar />

      <div className={styles.containerSection}>
        <div className={styles.section1}>
          <h1>Seção 1</h1>
          <p>Conteúdo da seção 1</p>
        </div>
        <div className={styles.section2}>
          <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              {successMessage && (
                <p className={styles.successMessage}>{successMessage}</p>
              )}
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
