export default function NoOrders({ onClickLink }) {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ width: "20rem" }}
      >
        <i
          style={{ color: "#0f5132", fontSize: "100px" }}
          className="bi bi-journal-text"
        ></i>

        <div class="alert alert-success" role="alert">
          You have no Orders.{" "}
          <a
            style={{ cursor: "pointer" }}
            onClick={onClickLink}
            className={`alert-link`}
          >
            Add one
          </a>
        </div>
      </div>
    </div>
  );
}
