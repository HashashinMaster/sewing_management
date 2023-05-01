import { useDispatch } from "react-redux";
import Form from "./Form";

export default function EditModal() {
  return (
    <div
      class="modal fade modal-scrollable"
      id="edit-modal"
      style={{ zIndex: "100000" }}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Model</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
