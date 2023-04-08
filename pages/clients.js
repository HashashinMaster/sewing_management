import Layout from "@/components/layout";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Client from "@/components/client/Client";
import styles from "@/styles/Client.module.css";
import Head from "next/head";
import Form from "@/components/client/Form";
export default function Clients({ clients }) {
  console.log(clients);
  return (
    <>
      <Head>
        <title> GUEDIRA | Clients</title>
      </Head>
      <Layout page="Clients">
        {clients.length < 1 && (
          <div>
            <div
              className="alert alert-info alert-dismissible fade show"
              id={styles.alert_margin}
              role="alert"
            >
              vous n'avez pas encore ajouté de clients.{" "}
              <a
                className="alert-link"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#add_client"
              >
                Cliquez ici pour ajouter un client
              </a>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
        <Form />
        {clients.length > 1 && clients.map((client) => <Client />)}
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/clients/records"
  );
  const data = await res.json();
  return {
    props: {
      clients: data.items,
    },
  };
}
