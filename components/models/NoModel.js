export default function NoModel() {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ width: "20rem" }}
      >
        <img
          width={"100px"}
          style={{ color: "#68869e" }}
          src="/models/shirt.svg"
        />
        <div class="alert alert-info" role="alert">
          You have no Models.{" "}
          <a style={{ cursor: "pointer" }} className={`alert-link`}>
            Add one
          </a>
        </div>
      </div>
    </div>
  );
}
