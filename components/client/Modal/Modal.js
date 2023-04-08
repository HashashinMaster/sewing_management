import { useSelector } from "react-redux";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useEffect, useRef } from "react";
// import * as bootstrap from "bootstrap";
export default function Modal() {
  const { hideModal } = useSelector((state) => state.form);
  const modal = useRef();
  // useEffect(() => {
  //   const bootstrapModal = new bootstrap.Modal(modal.current);
  //   bootstrapModal.hide();
  // }, [hideModal]);
  return (
    <div
      className="modal fade"
      id="add_client"
      tabindex="-1"
      aria-labelledby="add_client_label"
      aria-hidden="true"
    >
      <div className="modal-dialog" ref={modal}>
        <div className="modal-content">
          <ModalHeader />
          <ModalBody />
          <ModalFooter />
        </div>
      </div>
    </div>
  );
}
