import Image from "next/image";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import clsx from "clsx";
export default function Master({ data }) {
  const [model, setModel] = useState({});
  const [client, setClient] = useState({});
  const [supplys, setSupplys] = useState([]);
  const {
    clientId,
    modelId,
    "client full name": client_full_name,
    created,
    "price/unit": price_per_unit,
    quantity,
    supplys_ids,
    "total price": totalPrice,
  } = data.data;
  console.log(data.data);
  useEffect(() => {
    (async () => {
      const pb = new PocketBase(
        "http://" +
          (process.env.NODE_ENV === "production"
            ? "127.0.0.1:8080"
            : "127.0.0.1:8090") +
          ""
      );
      setClient(await pb.collection("clients").getOne(clientId));
      setModel(await pb.collection("models").getOne(modelId));
      setSupplys(
        await Promise.all(
          supplys_ids.map((supp_id) => {
            return pb.collection("stock").getOne(supp_id);
          })
        )
      );
    })();
  }, []);
  return (
    <div className="container">
      {/* Client information */}
      <div className="row">
        <div className="col-md-2">
          <Image
            width={200}
            height={200}
            src={
              client.avatar
                ? `http://127.0.0.1:8090/api/files/clients/${client.id}/${client.avatar}`
                : "/noavatar.svg"
            }
            alt={`${client_full_name}'s Picture`}
            className="rounded-circle mb-3"
            style={{ "object-fit": "cover" }}
          />
        </div>
        <div className="col-md-4 mx-5">
          <h4>{client_full_name}</h4>
          <p>
            <strong>Phone:</strong> {client.tel}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Sexe:</strong> {client.sexe}
          </p>
          <p>
            <strong>age:</strong> {client.age}
          </p>
          <p>
            <strong>adresse:</strong> {client.adresse}
          </p>
        </div>
      </div>

      <hr />

      {/* Model information */}
      <div className="row">
        <div className="col-md-6">
          <h4>{model.model_name}</h4>
          <p>
            {model.description ? model.description : "No description given"}
          </p>
        </div>
      </div>

      <hr />

      {/* Supplies information */}
      <div className="row">
        <div className="col-md-12">
          <h4>Supplies</h4>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity (Left on Stock)</th>
                <th>Price per Unit</th>
                <th>Picture</th>
                <th>Created</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {supplys.map((supply) => (
                <tr>
                  <td>{supply.supply_name}</td>
                  <td>{supply.supply_type}</td>
                  <td>{supply.quantity}</td>
                  <td>{supply.price_per_unit}</td>
                  <td>
                    <Image
                      src={clsx({
                        "/stock/ressources.jpg":
                          supply.supply_type === "Ressource" && !supply.picture,
                        "/stock/product.jpg":
                          supply.supply_type === "Product" && !supply.picture,
                        [`http://127.0.0.1:8090/api/files/stock/${supply.id}/${supply.picture}`]:
                          supply.picture && true,
                      })}
                      alt={`${supply.supply_name}'s Picture`}
                      style={{ "object-fit": "cover" }}
                      width={40}
                      height={40}
                      className="img-responsive"
                    />
                  </td>
                  <td>{supply.created}</td>
                  <td>{supply.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr />

      {/* Order information */}
      <div className="row">
        <div className="col-md-12">
          <h4>Order</h4>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Model Name</th>
                <th>Supplies Names</th>
                <th>Price per Unit</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${client_full_name}`}</td>
                <td>{model.model_name}</td>
                <td>{supplys.map((supp) => supp.supply_name).join(",")}</td>
                <td>{price_per_unit}</td>
                <td>{quantity}</td>
                <td>{totalPrice}</td>
                <td>{created}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
