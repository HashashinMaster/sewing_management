import styles from "@/styles/Client.module.css";

export default function Add() {
  return (
    <div id={styles.add}>
      <button
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#add_client"
      >
        <i class={`bi bi-box-fill me-2`}></i>
        Ajouter
      </button>
    </div>
  );
}
