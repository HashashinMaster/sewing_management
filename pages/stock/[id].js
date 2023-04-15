import Layout from "@/components/layout";
import Image from "next/image";
import clsx from "clsx";
import Head from "next/head";
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
  return (
    <>
      <Head>
        <title>GUEDIRA | {supply_name}</title>
      </Head>
      <Layout>
        <div className="container-fluid d-flex justify-content-center align-items-center h-100 w-100">
          <div className="row">
            <div className="col-md-4">
              <Image
                src={clsx({
                  "/stock/ressources.jpg":
                    supply_type === "Ressource" && !picture,
                  "/stock/product.jpg": supply_type === "Product" && !picture,
                  [`http://127.0.0.1:8090/api/files/stock/${id}/${picture}`]:
                    picture && true,
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
              <p style={{ overflowWrap: "break-word" }}>
                Description: {description}
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
              <a className="btn btn-primary me-2">
                <i className="bi bi-pencil"></i> Edit
              </a>
              <a className="btn btn-danger">
                <i className="bi bi-trash"></i> Delete
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const data = await (
    await fetch(
      `http://127.0.0.1:8090/api/collections/stock/records/${context.params.id}`
    )
  ).json();

  return {
    props: {
      ...data,
    },
  };
}
