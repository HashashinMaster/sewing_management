import Layout from "@/components/layout";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Client from "@/components/client/Client";
import styles from "@/styles/Client.module.css";
import Head from "next/head";
import Form from "@/components/client/Form";
export default function Clients(params) {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    (async () => {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const clients = await pb.collection("clients").getFullList();
      if (clients.length < 1) setClients("No Clients");
      else setClients(clients);
    })();
  }, []);
  return (
    <>
      <Head>
        <title> GUEDIRA | Clients</title>
      </Head>
      <Layout page="Clients">
        {clients === "No Clients" && (
          <div>
            <div
              className="alert alert-info"
              id={styles.alert_margin}
              role="alert"
            >
              <p>
                vous n'avez pas encore ajouté de clients.{" "}
                <a
                  className="alert-link"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#add_client"
                >
                  Cliquez ici pour ajouter un client
                </a>
              </p>
            </div>
          </div>
        )}
        <Form />
        {Array.isArray(clients) && clients.map((client) => <Client />)}
      </Layout>
    </>
  );
}
