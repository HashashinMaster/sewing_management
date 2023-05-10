import styles from "@/styles/Client.module.css";
import Modal from "./Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setEditing } from "@/redux/form";

export default function Form() {
  const { isEditing } = useSelector((state) => state.form);
  const disptach = useDispatch();
  return (
    <div id={styles.add}>
      <button
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#add_client"
        onClick={() => isEditing && disptach(setEditing(false))}
      >
        <i className="bi bi-plus"></i>
        Add client
      </button>
      <Modal />
    </div>
  );
}
