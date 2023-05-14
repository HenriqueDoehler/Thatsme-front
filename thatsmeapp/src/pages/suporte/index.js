import { useState, useEffect } from "react";
import styles from "@/styles/formMail.module.css";
import Navbar from "@/components/menu/navbar";
import SimpleAccordion from "@/components/accordion";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });
      if (response.ok) {
        setEmail("");
        setMessage("");
        setSuccessMessage("E-mail enviado com sucesso!");
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Não foi possível enviar o e-mail. Por favor, tente novamente mais tarde."
        );
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(
        "Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde."
      );
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.containerSection}>
        <div className={styles.section1}>
          <div className={styles.containerAccordion}>
            <div className={styles.divAcc}>
              <img src="/faq.svg" />
              <SimpleAccordion />
              <img src="/arrowDown.svg" />
            </div>
          </div>
          <div className={styles.medalSvg}>
            <img src="/medalhacentral.svg" />
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.containerFormMail}>
            <img src="/suporte.svg" alt="" />
            <form onSubmit={handleSubmit}>
              <label htmlFor="email"> Seu email:</label>
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
        <div className={styles.chair}>
          <img src="/chairMan.svg" />
        </div>
      </div>
    </>
  );
};

export default Contact;
