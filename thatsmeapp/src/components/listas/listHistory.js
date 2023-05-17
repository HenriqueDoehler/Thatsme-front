import React, { useState, useEffect } from "react";
import styles from "@/styles/list.module.css";

function ListaHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  const handleClickDel = (email, short_code) => {
    const token = localStorage.getItem("token");
    fetch(`https://api.thatsme.site/deleteWallet/${email}/${short_code}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data), window.location.reload())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    async function fetchEmpresas() {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("https://api.thatsme.site/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setHistory(data);
          })
          .catch((err) => {});
      }
    }
    fetchEmpresas();
  }, []);

  const filteredCode = history.filter((history) =>
    history.short_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            className={styles.Input}
            type="text"
            placeholder="Buscar por Short_code..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            className={styles.buttonClean}
            onClick={() => setSearchTerm("")}
          >
            Limpar
          </button>
          <button
            className={styles.buttonClean}
            onClick={() => setIsActivated(!isActivated)}
          >
            Ativar
          </button>
        </div>

        {history.length > 0 ? (
          <div className={styles.table} key={history.id}>
            {filteredCode.map((history, index) => (
              <table className={styles.table2} key={index}>
                <thead>
                  <tr>
                    <th className={styles.th}>
                      <img src="/emailIcon.svg" alt="" />
                      Email
                    </th>
                    <th className={styles.th}>
                      <img src="/emailIcon.svg" alt="" />
                      Short Code
                    </th>
                    <th className={styles.th}>
                      <img src="/dateIcon.svg" alt="" />
                      Data do resgate
                    </th>
                  </tr>
                </thead>
                <tbody key={history.id}>
                  <tr>
                    <td>{history.email}</td>
                    <td>{history.short_code}</td>
                    <td>
                      {(() => {
                        const date = new Date(history.time_added);
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = date.getFullYear().toString();
                        return `${day}/${month}/${year}`;
                      })()}
                    </td>
                    <td
                      className={
                        isActivated ? styles.OverlayHidden : styles.Overlay
                      }
                    >
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
                          onClick={() =>
                            handleClickDel(history.email, history.short_code)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        ) : (
          <span>Carregando...</span>
        )}
      </div>
    </>
  );
}

export default ListaHistory;
