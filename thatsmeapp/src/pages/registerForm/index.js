import { useState } from "react";
import styles from "@/styles/formRegister.module.css";

export default function Register() {
  const [formState, setFormState] = useState({
    name: "",
    cnpj: "",
    address: "",
    state: "",
    sector: "",
    cep: "",
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
      const response = await fetch("https://api.thatsme.site/registerCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar empresa");
      }

      const data = await response.json();

      alert(data.message);

      window.history.back();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>Cadastro de empresa</h1>
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

        <label htmlFor="cnpj">CNPJ:</label>
        <input
          type="text"
          id="cnpj"
          name="cnpj"
          value={formState.cnpj}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="address">Endereço:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formState.address}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="state">Estado:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formState.state}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="sector">Setor:</label>
        <input
          type="text"
          id="sector"
          name="sector"
          value={formState.sector}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formState.cep}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="phone">Telefone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleInputChange}
          required
        />

        <div>
          <button type="submit">Cadastrar</button>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
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
