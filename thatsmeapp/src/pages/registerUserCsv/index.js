import { useState } from "react";
import styles from "@/styles/formRegister.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;
  const [csvFile, setCsvFile] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `https://api.thatsme.site/addEventUserCsv/${id}`,
        {
          method: "POST",
          headers: headers,
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar arquivo CSV");
      }

      alert("Arquivo CSV enviado com sucesso");

      window.history.back();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Cadastro de Participante</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="csvFile">Arquivo CSV:</label>
        <input
          className={styles.inputCsv}
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={(event) => setCsvFile(event.target.files[0])}
          required
        />

        <div>
          <button type="submit">Cadastrar</button>
          <button
            onClick={() => {
              window.history.back();
            }}
          >
            Cancelar
          </button>
          {errorMessage && (
            <div className={styles.divError}>{errorMessage}</div>
          )}
        </div>
      </form>
    </div>
  );
}
