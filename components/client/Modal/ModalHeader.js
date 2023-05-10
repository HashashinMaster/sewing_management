export default function ModalHeader() {
  return (
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        Add client
      </h1>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  );
}
