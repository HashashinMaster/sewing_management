import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
export default function Modal({ data }) {
  return (
    <div
      className="modal fade"
      id="add_client"
      tabIndex="-1"
      aria-labelledby="add_client_label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader />
          <ModalBody data={data && { ...data }} />
          <ModalFooter />
        </div>
      </div>
    </div>
  );
}
