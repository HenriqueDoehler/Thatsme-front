import { useState } from "react";
import styles from "@/styles/formRegister.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;
  const [formState, setFormState] = useState({
    cod_model: "",
    event_id: `${id}`,
    max_uses: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://api.thatsme.site/registerEventMedal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar ");
      }

      alert("Medalha Cadastrada com sucesso");

      window.history.back();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Cadastro de Medalha</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="code">Sketchfab Code:</label>
        <input
          type="text"
          id="code"
          name="cod_model"
          value={formState.cod_model}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="id">ID evento:</label>
        <input
          type="text"
          id="id"
          name="event_id"
          placeholder={id}
          value={formState.company_id}
          disabled
        />

        <label htmlFor="max">Total de Medalhas:</label>
        <input
          type="number"
          id="max"
          name="max_uses"
          value={formState.max_uses}
          onChange={handleInputChange}
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
