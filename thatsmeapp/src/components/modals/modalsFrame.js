import React from "react";
import styles from "@/styles/modal.module.css";

function Modal(props) {
  return (
    <div
      className={props.show ? styles.modalOverlay : styles.modalOverlayHidden}
    >
      <div className={styles.modal}>
        <iframe
          id={`iframe-${props.codModel}`}
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          width="440"
          height="480"
          src={`https://sketchfab.com/models/${props.codModel}/embed?autostart=1&annotation=1&annotation_cycle=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0`}
        ></iframe>
        <h1>{props.nameUser}</h1>
        <h2>{props.eventName}</h2>
        <p className={styles.p}> {props.description}</p>
        <button onClick={props.onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Modal;
