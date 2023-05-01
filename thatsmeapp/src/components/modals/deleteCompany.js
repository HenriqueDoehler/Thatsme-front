import styles from "@/styles/deleteCompany.module.css";

const ModalDeleteCompany = (props) => {
  console.log(props.dataT);
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <h2>{props.dataT}-</h2>
        <h2>Deseja excluir?</h2>
        <button
          className={styles.button}
          onClick={() => props.setShowModal(false)}
        >
          Cancelar
        </button>
        <button
          className={styles.button}
          onClick={() => {
            props.handleDelete();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteCompany;
