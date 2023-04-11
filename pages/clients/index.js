import Layout from "@/components/layout";
import PocketBase from "pocketbase";
import Client from "@/components/client/Client";
import styles from "@/styles/Client.module.css";
import Head from "next/head";
import Form from "@/components/client/Form";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
export default function Clients({ clients, totalPages, page, totalItems }) {
  const [pagesBtns, setPagesBtns] = useState([]);
  console.log(totalItems);
  useEffect(() => {
    let counter = 1;
    const btns = [];
    while (counter <= totalPages) {
      btns.push(
        <li class="page-item" key={counter}>
          <Link
            key={counter}
            class={clsx("page-link", page === counter && "active")}
            href={`/clients?page=${counter}`}
          >
            {counter}
          </Link>
        </li>
      );
      counter++;
    }
    setPagesBtns(btns);
  }, [page]);
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
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
        <Form />

        {clients.length > 0 && (
          <>
            <div
              className="table-responsive"
              style={{ width: "80%", margin: "auto" }}
            >
              <table className="table mt-3 table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, key) => (
                    <Client {...client} key={key} />
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pagesBtns}
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  if (context.query.page) {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/clients/records?page=${context.query.page}`
    );
    const { items, totalPages, totalItems, page } = await res.json();
    return {
      props: {
        clients: items,
        totalPages,
        page,
        totalItems,
      },
    };
  }
  if (context.query.search) {
  }
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/clients/records"
  );
  const { items, totalPages, page } = await res.json();
  return {
    props: {
      clients: items,
      totalPages,
      page,
    },
  };
}
