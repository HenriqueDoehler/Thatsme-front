import InputMedal from "@/components/walletMedalInput";
import styles from "@/styles/wallet.module.css";
import Modal from "@/components/modals/modalsFrame";
import Navbar from "@/components/menu/navbar";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

function Wallet() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({ code: "" });
  const [showModal, setShowModal] = useState(false);
  const [codModels, setCodModels] = useState([]);
  const [nameUser, setNameUser] = useState([]);
  const [eventName, setEventName] = useState([]);
  const [description, setDescription] = useState([]);
  const [modalData, setModalData] = useState({
    codModel: "",
    eventName: "",
    description: "",
    nameUser: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { code } = formState;
    const email = localStorage.getItem("email");

    try {
      const response = await fetch(`https://api.thatsme.site/addMedal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, short_code: code }),
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        setError("código inválido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/");
  };

  const handleEventClick = (index) => {
    setShowModal(true);
    setModalData({
      codModel: codModels[index],
      eventName: eventName[index],
      description: description[index],
      nameUser: nameUser,
    });
  };

  useEffect(() => {
    const fetchWallet = async () => {
      const email = localStorage.getItem("email");
      const response = await fetch(`https://api.thatsme.site/wallets/${email}`);
      const data = await response.json();
      setNameUser(data[0].user_name);
      const codModels = data.map((item) => item.cod_model);
      setCodModels(codModels);
      const eventName = data.map((item) => item.event_name);
      setEventName(eventName);
      const description = data.map((item) => item.event_description);
      setDescription(description);
    };

    fetchWallet();
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        codModel={modalData.codModel}
        eventName={modalData.eventName}
        description={modalData.description}
        nameUser={modalData.nameUser}
      />
      {codModels.some((codModel) => codModel !== null) ? (
        <div className={styles.container} style={{ overflow: "auto" }}>
          <Navbar />
          <div className={styles.sideMenu}>
            <h1 className={styles.textLeft}>
              Olá, <br />
              {nameUser}
            </h1>
            <button onClick={handleLogout} className={styles.leftButton}>
              Sair
            </button>
          </div>
          <h1 className={styles.nameMobile}>
            Olá, <br />
            {nameUser}
          </h1>
          <div className={styles.formAddMedal}>
            <form onSubmit={handleFormSubmit}>
              <input
                placeholder="CÓDIGO"
                type="text"
                maxLength={5}
                id="code"
                name="code"
                pattern="[0-9]{5}"
                value={formState.code}
                onChange={handleInputChange}
                required
              />

              <button onClick={handleFormSubmit}>Resgatar</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <div className={styles.canvas}>
            <div
              className={styles.containerWallet}
              style={{ overflow: "auto" }}
            >
              <div className={styles.walletC}>
                {codModels.map(
                  (codModel, index) =>
                    codModel !== null && (
                      <div
                        key={codModel}
                        className={styles.sketchfabembedwrapper}
                      >
                        <iframe
                          frameborder="0"
                          allowfullscreen
                          mozallowfullscreen="true"
                          webkitallowfullscreen="true"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          xr-spatial-tracking
                          execution-while-out-of-viewport
                          execution-while-not-rendered
                          web-share
                          width="240"
                          height="280"
                          src={`https://sketchfab.com/models/${codModel}/embed?autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1`}
                        ></iframe>
                        <div className={styles.medalDescriptions}>
                          <span
                            className={styles.span}
                            onClick={() => handleEventClick(index)}
                          >
                            {eventName[index]}
                          </span>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InputMedal />
      )}
    </>
  );
}

export default Wallet;