export default function Toast({ message, title }) {
  return (
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <img src="..." class="rounded me-2" alt="..." />
          <strong class="me-auto">{title}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{message}</div>
      </div>
    </div>
  );
}
