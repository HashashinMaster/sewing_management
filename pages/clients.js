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

        {clients.length > 0 && (
          <div className="table-responsive">
            <table class="table mt-3 table-hover">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Telephone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Sexe</th>
                  <th scope="col">Age</th>
                  <th scope="col">Profession</th>
                  <th scope="col">Adresse</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <Client {...client} />
                ))}
              </tbody>
            </table>
          </div>
        )}
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
