import styles from "@/styles/Client.module.css";

export default function Add({ onClick }) {
  return (
    <div id={styles.add} className="mb-3">
      <button
        onClick={onClick}
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
      >
        <i className=" me-1 bi bi-journal-text"></i>
        Add an order
      </button>
    </div>
  );
}
