import { useState } from "react";
import styles from "@/styles/formRegister.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;
  const [formState, setFormState] = useState({
    name: "",
    event_id: `${id}`,
    email: "",
    phone: "",
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
      const response = await fetch("https://api.thatsme.site/addEventUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar ");
      }

      alert("Participante Cadastrada com sucesso");

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
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="id">ID evento:</label>
        <input
          type="number"
          id="id"
          name="event_id"
          placeholder={id}
          value={formState.company_id}
          disabled
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="phone">Telefone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleInputChange}
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
