import React from "react";
import styles from "@/styles/modal.module.css";

function Modal(props) {
  let date;

  if (!props.eventDate) {
    date = "Data não informada";
  } else {
    const customDate = props.eventDate.split("T")[0];
    const parts = customDate.split("-");
    date = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return (
    <div
      className={props.show ? styles.modalOverlay : styles.modalOverlayHidden}
    >
      <div className={styles.modal}>
        <div className={styles.textContainer}>
          <p>Emitido por: {props.companyName}</p>
        </div>
        <iframe
          id={`iframe-${props.codModel}`}
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          width="320"
          height="360"
          src={`https://sketchfab.com/models/${props.codModel}/embed?autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1`}
        ></iframe>
        <h1>{props.nameUser}</h1>
        <h2 style={{fontWeight: '700'}}>{props.eventName}</h2>
        <div className={styles.textContainer}>
          <h3>{props.eventAdress}</h3>
          <h3>{date}</h3>
          <h4>{props.description}</h4>
        </div>
        <button onClick={props.onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
