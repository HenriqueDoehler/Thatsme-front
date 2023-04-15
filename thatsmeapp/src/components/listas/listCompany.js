import React, { useState, useEffect } from "react";
import styles from "@/styles/list.module.css";

function ListaEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    async function fetchEmpresas() {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("https://api.thatsme.site/companies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setEmpresas(data);
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    fetchEmpresas();
  }, []);

  const filteredEmpresas = empresas.filter((empresa) =>
    empresa.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          className={styles.buttonClean}
          onClick={() => setSearchTerm("")}
        >
          Limpar
        </button>
      </div>

      {empresas.length > 0 ? (
        <table className={styles.table}>
          {filteredEmpresas.map((empresa) => (
            <table className={styles.table2}>
              <tr>
                <th className={styles.th}>
                  <img src="/companyIcon.svg" alt="" />
                  Empresa
                </th>
                <th className={styles.th}>
                  <img src="/cnpj.svg" alt="" />
                  CNPJ
                </th>
                <th className={styles.th}>
                  <img src="/emailIcon.svg" alt="" />
                  Email
                </th>
                <th className={styles.th}>
                  <img src="/dateIcon.svg" alt="" />
                  Data de criação
                </th>
              </tr>
              <tbody>
                <tr key={empresa.id}>
                  <td>{empresa.name}</td>

                  <td>
                    {empresa.cnpj.slice(0, 2) +
                      "." +
                      empresa.cnpj.slice(2, 5) +
                      "." +
                      empresa.cnpj.slice(5, 8) +
                      "/" +
                      empresa.cnpj.slice(8, 12) +
                      "-" +
                      empresa.cnpj.slice(12, 14)}
                  </td>

                  <td>{empresa.email}</td>
                  <td>
                    {(() => {
                      const date = new Date(empresa.created_at);
                      const day = date.getDate().toString().padStart(2, "0");
                      const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const year = date.getFullYear().toString();
                      return `${day}/${month}/${year}`;
                    })()}
                  </td>
                  <div className={styles.buttonContainer}>
                    <img
                      src="/buttonEdit.svg"
                      alt=""
                      className={styles.button}
                      style={{ width: isClicked ? "21px" : "20px" }}
                      onClick={handleClick}
                    />
                    <div
                      style={{
                        height: "30px",
                        width: "1px",
                        backgroundColor: "black",
                        display: "inline-block",
                      }}
                    ></div>

                    <img
                      src="/buttonTrash.svg"
                      alt=""
                      className={styles.button}
                      style={{ width: isClicked ? "21px" : "20px" }}
                      onClick={handleClick}
                    />
                  </div>
                </tr>
              </tbody>
            </table>
          ))}
        </table>
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
}

export default ListaEmpresas;
