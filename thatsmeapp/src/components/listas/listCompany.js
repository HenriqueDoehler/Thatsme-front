import React, { useState, useEffect } from "react";
import styles from "@/styles/list.module.css";
import ModalDeleteCompany from "../modals/deleteCompany";
import Link from "next/link";

function ListaEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [dataT, setdataT] = useState(null);
  const handleClickDel = (id) => {
    setCompanyIdToDelete(id);
    setShowModal(true);
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
          })
          .catch((err) => {});
      }
    }
    fetchEmpresas();
  }, []);

  const filteredEmpresas = empresas.filter((empresa) =>
    empresa.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function deleteCompany(id) {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`https://api.thatsme.site/deleteCompany/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setdataT(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <>
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
          <div className={styles.table}>
            {filteredEmpresas.map((empresa) => (
              <table className={styles.table2} key={empresa.id}>
                <thead>
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
                </thead>
                <tbody key={empresa.id}>
                  <tr>
                    <Link href={`/eventsTable?id=${empresa.id}`}>
                      <td>{empresa.name}</td>
                    </Link>
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
                    <td>
                      <div className={styles.buttonContainer}>
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
                          onClick={() => handleClickDel(empresa.id)}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        ) : (
          <span>Carregando..s.</span>
        )}
      </div>
      {showModal && (
        <ModalDeleteCompany
          dataT={dataT}
          setShowModal={setShowModal}
          handleDelete={() => deleteCompany(companyIdToDelete)}
        />
      )}
    </>
  );
}

export default ListaEmpresas;
