import Image from "next/image";

export default function ModelCard({
  id,
  picture,
  model_name,
  description,
  created,
}) {
  return (
    <div className="card" style={{ width: "14rem", cursor: "pointer" }}>
      <Image
        src={`http://127.0.0.1:8090/api/files/models/${id}/${picture}`}
        style={{ width: "100%", height: "20vw", objectFit: "cover" }}
        width={100}
        height={100}
        quality={100}
        className="card-img-top"
        alt="can't load image"
      />
      <div className="card-body">
        <h5 className="card-title">{model_name}</h5>
        <div className="card-footer text-body-secondary text-center">
          {created.slice(0, 19)}
        </div>
      </div>
    </div>
  );
}
