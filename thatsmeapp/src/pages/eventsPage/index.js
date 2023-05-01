import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/list.module.css";
import ModalDeleteCompany from "@/components/modals/deleteCompany";

export default function EventTable() {
  const [eventsUsers, setEventsUsers] = useState([]);
  const [eventsMedals, setEventsMedals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalE, setShowModalE] = useState(false);
  const [showModalEM, setShowModalEM] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [dataT, setdataT] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const eventId = parseInt(id);

  const filteredEventsUsers = eventsUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEventsMedals = eventsMedals.filter((medal) =>
    medal.cod_model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function deleteUser(id) {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`https://api.thatsme.site/deleteUser/${id}`, {
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
  async function deleteMedal(id) {
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`https://api.thatsme.site/deleteMedal/${id}`, {
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
  const handleClickDelM = (id) => {
    setIdToDelete(id);
    setShowModalEM(true);
  };

  useEffect(() => {
    async function fetchEventsUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://api.thatsme.site/eventsUsers`, {
          headers: {
            methoded: "GET",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const eventsUsers = data.filter((user) => user.event_id === eventId);
        setEventsUsers(eventsUsers);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchEventsMedals() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://api.thatsme.site/eventsMedals`, {
          headers: {
            methoded: "GET",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const eventsMedals = data.filter((medal) => medal.event_id === eventId);
        setEventsMedals(eventsMedals);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventsUsers();
    fetchEventsMedals();
  }, [eventId]);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  const handleEventFormClick = () => {
    router.push(`/registerUser?id=${id}`);
  };
  const handleEventFormMedalClick = () => {
    router.push(`/registerMedal?id=${id}`);
  };
  const handleEventFormClickCSV = () => {
    router.push(`/registerUserCsv?id=${id}`);
  };

  return (
    <>
      <div className={styles.container2}>
        <div className={styles.searchContainer}>
          <input
            className={styles.Input}
            type="text"
            placeholder="Buscar"
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

        {showModalE && (
          <ModalDeleteCompany
            dataT={dataT}
            setShowModal={setShowModalE}
            handleDelete={() => deleteUser(idToDelete)}
          />
        )}
        {showModalEM && (
          <ModalDeleteCompany
            dataT={dataT}
            setShowModal={setShowModalEM}
            handleDelete={() => deleteMedal(idToDelete)}
          />
        )}

        <h2 className={styles.title}>Medalhas do evento:</h2>
        <div>
          {filteredEventsMedals.map((medal) => (
            <div className={styles.table} key={medal.id}>
              <table className={styles.table2}>
                <thead>
                  <tr>
                    <th className={styles.th}>Codigo Modelo</th>
                    <th className={styles.th}>Short Code</th>
                    <th className={styles.th}>Disponivel</th>
                  </tr>
                </thead>

                <tr key={medal.id}>
                  <td>{medal.cod_model}</td>
                  <td>{medal.short_code}</td>
                  <td>{medal.max_uses}</td>
                  <td>
                    <img
                      src="/buttonTrash.svg"
                      alt=""
                      className={styles.button}
                      onClick={() => handleClickDelM(medal.id)}
                    />
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>

        <h2 className={styles.title}>Usuários do evento:</h2>
        <div>
          {filteredEventsUsers.map((user) => (
            <div className={styles.table} key={user.id}>
              <table className={styles.table2}>
                <thead>
                  <tr>
                    <th className={styles.th}>Nome</th>

                    <th className={styles.th}>E-mail</th>
                    <th className={styles.th}>Telefone</th>
                  </tr>
                </thead>
                <tr key={user.id}>
                  <td>{user.name}</td>

                  <td>{user.email}</td>
                  <td>{user.phone}</td>

                  <td>
                    <img
                      src="/buttonTrash.svg"
                      alt=""
                      className={styles.button}
                      onClick={() => handleClickDel(user.id)}
                    />
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttonsC2}>
        <button className={styles.buttonN} onClick={handleDashboardClick}>
          Voltar para o Dashboard
        </button>
        <button className={styles.buttonN} onClick={handleEventFormClick}>
          Cadastrar novo Participante
        </button>
        <button className={styles.buttonN} onClick={handleEventFormMedalClick}>
          Cadastrar nova Medalha
        </button>

        <button className={styles.buttonN} onClick={handleEventFormClickCSV}>
          UPLOAD CSV
        </button>
      </div>
    </>
  );
}
