import styles from "@/styles/Client.module.css";

export default function Add({ onClick }) {
  return (
    <div id={styles.add}>
      <button
        onClick={onClick}
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
      >
        <i class={`bi bi-box-fill me-2`}></i>
        Ajouter
      </button>
    </div>
  );
}
