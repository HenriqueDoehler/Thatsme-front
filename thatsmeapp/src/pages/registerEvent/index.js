import { useState } from "react";
import styles from "@/styles/formRegister.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { id } = router.query;
  const [formState, setFormState] = useState({
    name: "",
    company_id: `${id}`,
    description: "",
    data: "",
    address: "",
    time: "",
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
      const response = await fetch("https://api.thatsme.site/registerEvent", {
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

      alert("EVENTO CADASTRADO");

      window.history.back();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Cadastro de EVENTO</h1>
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

        <label htmlFor="id">id:</label>
        <input
          type="text"
          id="id"
          name="id"
          placeholder={id}
          value={formState.company_id}
          disabled
        />

        <label htmlFor="">Data:</label>
        <input
          type="text"
          id="data"
          name="data"
          placeholder="mes-dia-ano"
          pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
          title=" por favor use esse padrao XX-XX-XXXX"
          value={formState.data}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="address">Endereço:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Endereço Completo"
          value={formState.address}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="time">Hora Do Evento:</label>
        <input
          type="text"
          id="time"
          name="time"
          placeholder="00:00 Horario do evento"
          value={formState.time}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Descrição:</label>
        <textarea
          wrap="hard"
          className={styles.inputDescription}
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
          value={formState.description}
          onChange={handleInputChange}
          required
        />
        {errorMessage && <div className={styles.divError}>{errorMessage}</div>}

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
