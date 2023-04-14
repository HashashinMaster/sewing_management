import clsx from "clsx";
import Image from "next/image";

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
  return (
    <>
      <div class="card" style={{ cursor: "pointer", width: "18rem" }}>
        <Image
          src={clsx({
            "/stock/ressources.jpg": supply_type === "Ressource" && !picture,
            "/stock/product.jpg": supply_type === "Product" && !picture,
            [`http://127.0.0.1:8090/api/files/stock/${id}/${picture}`]:
              supply_type === "Product" && picture,
          })}
          style={{ width: "100%", height: "20vw", objectFit: "cover" }}
          width={100}
          height={100}
          class="card-img-top"
          alt="can't load image"
          unoptimized
        />
        <div class="card-body">
          <h5 class="card-title">{supply_name}</h5>

          <h6 class="card-subtitle mb-2 " style={{ color: "#868e96" }}>
            {supply_type}
          </h6>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h5 class="card-title">Description</h5>
              <p class="card-text">
                {description ? description : "No description Given"}
              </p>
            </li>
            <li class="list-group-item">
              <h5 class="card-title">Quantity</h5>
              <p class="card-text">{quantity}</p>
            </li>
          </ul>
          <div className="d-flex flex-column align-items-end">
            <h5 class="card-title">Price(unit): {price_per_unit} DH</h5>
            <h5 class="card-title">Total {price_per_unit * quantity} DH</h5>
          </div>
          <div class="card-footer text-body-secondary text-center">
            {created.slice(0, 19)}
          </div>
        </div>
      </div>
    </>
  );
}
