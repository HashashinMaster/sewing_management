import styles from "@/styles/Client.module.css";
import Modal from "./Modal/Modal";

export default function Form() {
  return (
    <div id={styles.add}>
      <button
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#add_client"
      >
        <i className="bi bi-plus"></i>
        Ajouter
      </button>
      <Modal />
    </div>
  );
}
