import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/Stock.module.css";
import { useRouter } from "next/navigation";

export default function SupplyCard({
  picture,
  id,
  supply_type,
  supply_name,
  description,
  created,
  quantity,
  price_per_unit,
}) {
  const { push } = useRouter();
  const navigate = () => push(`/stock/${id}`);
  return (
    <>
      <div
        className="card h-100"
        style={{ cursor: "pointer", width: "18rem" }}
        onClick={navigate}
      >
        <Image
          src={clsx({
            "/stock/ressources.jpg": supply_type === "Ressource" && !picture,
            "/stock/product.jpg": supply_type === "Product" && !picture,
            [`http://127.0.0.1:8090/api/files/stock/${id}/${picture}`]:
              picture && true,
          })}
          style={{ width: "100%", height: "20vw", objectFit: "cover" }}
          width={100}
          height={100}
          quality={100}
          className="card-img-top"
          alt="can't load image"
        />
        <div className="card-body">
          <h5 className="card-title">{supply_name}</h5>

          <h6 className="card-subtitle mb-2 " style={{ color: "#868e96" }}>
            {supply_type}
          </h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5 className="card-title">Description</h5>
              <p className={`card-text ${styles.desc}`}>
                {description ? description : "No description Given"}
              </p>
            </li>
            <li className="list-group-item">
              <h5 className="card-title">Quantity</h5>
              <p className="card-text">{quantity}</p>
            </li>
          </ul>
          <div className="d-flex flex-column align-items-end">
            <h5 className="card-title">
              Price(unit):
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "MAD",
              }).format(price_per_unit)}{" "}
            </h5>
            <h5 className="card-title">
              Total{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "MAD",
              }).format(price_per_unit * quantity)}
            </h5>
          </div>
          <div className="card-footer text-body-secondary text-center">
            {created.slice(0, 19)}
          </div>
        </div>
      </div>
    </>
  );
}
