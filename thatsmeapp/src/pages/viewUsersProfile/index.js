import styles from "@/styles/wallet.module.css";
import Modal from "@/components/modals/modalsFrame";
import Navbar from "@/components/menu/navbar";
import Head from "next/head";

import { useState, useEffect, useContext } from "react";
import { EmailContext } from "@/context/EmailContext";
import SideNav from "@/components/menu/sideNav";

function ViewOtherUser() {
  const { email } = useContext(EmailContext);
  const [showModal, setShowModal] = useState(false);
  const [codModels, setCodModels] = useState([]);
  const [nameUser, setNameUser] = useState([]);
  const [eventAdress, setEventAddress] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [eventName, setEventName] = useState([]);
  const [description, setDescription] = useState([]);
  const [modalData, setModalData] = useState({
    codModel: "",
    eventName: "",
    description: "",
    nameUser: "",
    eventAdress: "",
    eventDate: "",
  });

  const handleEventClick = (index) => {
    setShowModal(true);
    setModalData({
      codModel: codModels[index],
      eventName: eventName[index],
      description: description[index],
      nameUser: nameUser,
      eventAdress: eventAdress[index],
      eventDate: eventDate[index],
    });
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch(`https://api.thatsme.site/wallets/${email}`);
        const data = await response.json();
        setNameUser(data[data.length - 1].user_name);
        let uniqueCodModels = new Set();
        let uniqueEventName = new Map();
        let uniqueDescription = new Map();
        let uniqueAdress = new Map();
        let uniqueDate = new Map();
        data.forEach((item) => {
          if (!uniqueCodModels.has(item.cod_model)) {
            uniqueCodModels.add(item.cod_model);
            uniqueEventName.set(item.cod_model, item.event_name);
            uniqueDescription.set(item.cod_model, item.event_description);
            uniqueAdress.set(item.cod_model, item.event_address);
            uniqueDate.set(item.cod_model, item.event_date);
          }
        });
        setCodModels(Array.from(uniqueCodModels));
        setEventName(Array.from(uniqueEventName.values()));
        setDescription(Array.from(uniqueDescription.values()));
        setEventAddress(Array.from(uniqueAdress.values()));
        setEventDate(Array.from(uniqueDate.values()));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchWallet();
  }, []);

  return (
    <>
      <Head>
        <title>Thats Me</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="Thats Me APP" />
      </Head>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        codModel={modalData.codModel}
        eventName={modalData.eventName}
        description={modalData.description}
        nameUser={modalData.nameUser}
        eventAdress={modalData.eventAdress}
        eventDate={modalData.eventDate}
      />
      {codModels.some((codModel) => codModel !== null) ? (
        <>
          <Navbar />
          <div className={styles.container} style={{ overflow: "auto" }}>
            <SideNav />
            <div className={styles.secondaryContainer}>
              <div className={styles.sideMenu}>
                <div className={styles.userAvatar}>{nameUser[0]}</div>
                <h1 className={styles.textLeft}>{nameUser}</h1>
              </div>
              <h1 className={styles.nameMobile}>{nameUser}</h1>
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
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className={styles.noMedalContainer}>
            <SideNav />
            <h1>Este usuário não possui medalhas.</h1>
          </div>
        </>
      )}
    </>
  );
}

export default ViewOtherUser;
