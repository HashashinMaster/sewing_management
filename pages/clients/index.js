import Layout from "@/components/layout";
import Client from "@/components/client/Client";
import styles from "@/styles/Client.module.css";
import Head from "next/head";
import Form from "@/components/client/Form";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Search from "@/components/Search";
export default function Clients({ clients, totalPages, page, search, err }) {
  const [pagesBtns, setPagesBtns] = useState([]);
  useEffect(() => {
    console.log("c");
    let counter = 1;
    const btns = [];
    while (counter <= totalPages) {
      btns.push(
        <li className="page-item" key={counter}>
          <Link
            key={counter}
            className={clsx("page-link", page === counter && "active")}
            href={`/clients?page=${counter}${clsx(
              search && `&search=${search}`
            )}`}
          >
            {counter}
          </Link>
        </li>
      );
      counter++;
    }
    setPagesBtns(btns);
  }, [clients, page]);
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
              {err && (
                <div className="alert alert-danger" role="alert">
                  {err}
                </div>
              )}
              <Search />
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
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pagesBtns}
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
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
  if (context.query.search && context.query.page) {
    console.log("im here");
    let { search } = context.query;
    if (search[0] === " ") search = "%2B" + search.slice(1);
    console.log(search);
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/clients/records?page=${context.query.page}&filter=(first_name="${search}" || last_name="${search}"  || profession="${search}" || adresse="${search}" || age="${search}" || email="${search}" || tel="${search}" || sexe="${search}")`
    );
    const { items, totalPages, page } = await res.json();
    console.log(page);
    return {
      props: {
        clients: items,
        totalPages,
        page,
        search,
      },
    };
  }
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
    let { search } = context.query;
    if (search[0] === " ") search = "%2B" + search.slice(1);
    console.log(search);
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/clients/records?filter=(first_name="${search}" || last_name="${search}"  || profession="${search}" || adresse="${search}" || age="${search}" || email="${search}" || tel="${search}" || sexe="${search}")`
    );
    const { items, totalPages, page } = await res.json();
    if (items.length > 0)
      return {
        props: {
          clients: items,
          totalPages,
          page,
          search,
        },
      };
    else {
      const res = await fetch(
        "http://127.0.0.1:8090/api/collections/clients/records"
      );
      const { items, totalPages, page } = await res.json();
      return {
        props: {
          clients: items,
          totalPages,
          page,
          err: "there is no user with this data you provided",
        },
      };
    }
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
