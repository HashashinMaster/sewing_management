import Image from "next/image";
import { useDispatch } from "react-redux";
export default function ModelInfo({ info }) {
  const disptach = useDispatch();
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100 w-100">
        <div className="row w-100">
          <div className="col-md-4">
            <Image
              src={`http://${
                process.env.NODE_ENV === "production"
                  ? "0.0.0.0:8080"
                  : "127.0.0.1:8090"
              }/api/files/models/${info.id}/${info.picture}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              width={100}
              height={100}
              unoptimized
              className="img-fluid"
              alt="can't load image"
            />
          </div>
          <div className="col-md-8">
            <h2>{info.model_name}</h2>
            <p style={{ overflowWrap: "anywhere", width: "100%" }}>
              Description:{" "}
              {info.description ? info.description : "No description Given."}
            </p>
            <p>
              <strong>Created:</strong> {info.created.slice(0, 19)}
            </p>
            <a
              className="btn btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#edit-modal"
            >
              <i className="bi bi-pencil"></i> Edit
            </a>
            <a
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              <i className="bi bi-trash"></i> Delete
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
