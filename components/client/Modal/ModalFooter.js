import { useDispatch, useSelector } from "react-redux";
import { clicked, toggleCheck } from "@/redux/form";
import { useEffect } from "react";
import PocketBase from "pocketbase";

export default function ModalFooter() {
  const dispatch = useDispatch();

  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          dispatch(clicked());
          dispatch(toggleCheck());
        }}
      >
        Sauvegarder
      </button>
    </div>
  );
}
