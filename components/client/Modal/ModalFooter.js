export default function ModalFooter(params) {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button type="button" className="btn btn-primary">
        Sauvegarder
      </button>
    </div>
  );
}
