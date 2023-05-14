import Layout from "@/components/layout";
import Image from "next/image";
import clsx from "clsx";
import Head from "next/head";
import { useState } from "react";
import { Popup } from "devextreme-react";
import Form from "@/components/stock/Form";
import { setEditing, setPayload } from "@/redux/stock";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DeleteModal from "@/components/client/Modal/DeleteModal";
export default function supply({
  id,
  supply_name,
  supply_type,
  quantity,
  price_per_unit,
  description,
  picture,
  created,
}) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();
  const { isEditing } = useSelector((state) => state.stock);
  useEffect(() => {
    if (!isEditing) {
      dispatch(setEditing(true));
      dispatch(
        setPayload({
          id,
          supply_name,
          supply_type,
          quantity,
          price_per_unit,
          description,
        })
      );
    }
  });
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
    if (!isEditing) {
      dispatch(setEditing(true));
      dispatch(
        setPayload({
          id,
          supply_name,
          supply_type,
          quantity,
          price_per_unit,
          description,
        })
      );
    }
  };
  return (
    <>
      <Head>
        <title>GUEDIRA | {supply_name}</title>
      </Head>
      <Layout>
        <div className="container-fluid d-flex justify-content-center align-items-center h-100 w-100">
          <div className="row w-100">
            <div className="col-md-4">
              <Image
                src={clsx({
                  "/stock/ressources.jpg":
                    supply_type === "Ressource" && !picture,
                  "/stock/product.jpg": supply_type === "Product" && !picture,
                  [`http://${
                    process.env.NODE_ENV === "production"
                      ? "0.0.0.0:8080"
                      : "127.0.0.1:8090"
                  }/api/files/stock/${id}/${picture}`]: picture && true,
                })}
                className="img-fluid"
                alt="Supply Picture"
                unoptimized
                width={200}
                height={400}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "90vh",
                }}
              />
            </div>
            <div className="col-md-8">
              <h2>
                {supply_type} - {supply_name}
              </h2>
              <p style={{ overflowWrap: "anywhere", width: "100%" }}>
                Description:{" "}
                {description ? description : "No description Given."}
              </p>
              <p>
                <strong>Created:</strong> {created.slice(0, 19)}
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p>
                <strong>Price per Unit:</strong>{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "MAD",
                }).format(price_per_unit)}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "MAD",
                }).format(price_per_unit * quantity)}
              </p>
              <a className="btn btn-primary me-2" onClick={togglePopup}>
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
        <DeleteModal id={id} type={"stock"} />
        <Popup
          visible={isPopupVisible}
          title="ADD Supply"
          hideOnOutsideClick={true}
          hideOnParentScroll={true}
          contentComponent={Form}
          dragEnabled={false}
          onHiding={togglePopup}
        />
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const data = await (
    await fetch(
      `http://${
        process.env.NODE_ENV === "production"
          ? "0.0.0.0:8080"
          : "127.0.0.1:8090"
      }/api/collections/stock/records/${context.params.id}`
    )
  ).json();

  return {
    props: {
      ...data,
    },
  };
}
