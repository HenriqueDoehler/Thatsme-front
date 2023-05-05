import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/list.module.css";
import ModalDeleteCompany from "@/components/modals/deleteCompany";
import Link from "next/link";

export default function EventTable() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalE, setShowModalE] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [dataT, setdataT] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const companyId = parseInt(id);

  const filteredEvent = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function deleteEvent(id) {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`https://api.thatsme.site/deleteEvent/${id}`, {
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
  const handleClickDel = (id) => {
    setIdToDelete(id);
    setShowModalE(true);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://api.thatsme.site/Events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const events = data.filter((event) => event.company_id === companyId);
        setEvents(events);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, [companyId]);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleEventFormClick = () => {
    router.push(`/registerEvent?id=${id}`);
  };

  return (
    <>
      <div className={styles.container2}>
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

        {filteredEvent.map((event) => (
          <div className={styles.table} key={event.id}>
            <table className={styles.table2} key={event.id}>
              <thead>
                <tr key={event.id}>
                  <th className={styles.th}>
                    <img src="/cnpj.svg" alt="" />
                    Nome
                  </th>
                  <th className={styles.th}>
                    <img src="/pen.svg" alt="" />
                    Descrição
                  </th>
                  <th className={styles.th}>
                    <img src="/hour.svg" alt="" />
                    Data
                  </th>
                  <th className={styles.th}>
                    <img src="/place.svg" alt="" />
                    Endereço
                  </th>
                  <th className={styles.th}>
                    <img src="/hour.svg" alt="" />
                    Hora do evento
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key={event.id}>
                  <Link href={`/eventsPage?id=${event.id}`}>
                    <td>{event.name}</td>
                  </Link>
                  <td>{event.description}</td>
                  <td>{new Date(event.data).toLocaleDateString()}</td>
                  <td>{event.address}</td>
                  <td>{event.time.substring(0, 5)}</td>
                  <td className={styles.tdX}>
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
                        onClick={() => handleClickDel(event.id)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        {showModalE && (
          <ModalDeleteCompany
            dataT={dataT}
            setShowModal={setShowModalE}
            handleDelete={() => deleteEvent(idToDelete)}
          />
        )}
      </div>

      <div className={styles.buttonsC2}>
        <button className={styles.buttonN} onClick={handleDashboardClick}>
          Voltar para o Dashboard
        </button>

        <button className={styles.buttonN} onClick={handleEventFormClick}>
          Adicionar um novo evento
        </button>
      </div>
    </>
  );
}
