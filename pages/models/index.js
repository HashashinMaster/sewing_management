import Layout from "@/components/layout";
import NoModel from "@/components/models/NoModel";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Popup } from "devextreme-react";
import Form from "@/components/models/Form";
import ModelCard from "@/components/models/ModelCard";
import Search from "@/components/Search";
import Add from "@/components/models/Add";
import EditModal from "@/components/models/EditModal";
import { useDispatch } from "react-redux";
import { setIsEditing } from "@/redux/model";
import clsx from "clsx";
import Link from "next/link";

export default function index({ models, err, search }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsEditing(false));
  });
  const [pagesBtns, setPagesBtns] = useState([]);
  useEffect(() => {
    let counter = 1;
    const btns = [];
    while (counter <= models.totalPages) {
      btns.push(
        <li className="page-item" key={counter}>
          <Link
            key={counter}
            className={clsx("page-link", models.page === counter && "active")}
            href={`/models?page=${counter}${clsx(
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
  }, [models.items, models.page]);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  return (
    <>
      <Head>
        <title> GUEDIRA | Models</title>
      </Head>
      <Layout>
        <EditModal />
        {models.totalItems < 1 && <NoModel onClickLink={togglePopup} />}

        <Popup
          visible={isPopupVisible}
          title="ADD Model"
          hideOnOutsideClick={true}
          hideOnParentScroll={true}
          contentComponent={Form}
          dragEnabled={false}
          onHiding={togglePopup}
        />
        {models.totalItems > 0 && (
          <>
            <Add onClick={togglePopup} />
            <div className="my-3" style={{ padding: "1rem" }}>
              {err && (
                <div className="alert alert-danger" role="alert">
                  {err}
                </div>
              )}
              <Search type={"models"} />
            </div>
            <div
              className="mt-3 d-flex flex-wrap mx-auto card-deck "
              style={{
                width: "100%",
                padding: "0  0 0 2rem",
                gap: "1rem",
              }}
            >
              {models.items.map((model) => (
                <ModelCard {...model} />
              ))}
            </div>
            <nav
              aria-label="Page navigation example"
              style={{ display: "block" }}
            >
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
    let { search } = context.query;
    if (search[0] === " ") search = "%2B" + search.slice(1);
    const data = await (
      await fetch(
        `http://127.0.0.1:8090/api/collections/models/records?page=${context.query.page}&filter=(model_name~"${search}" || description~"${search}"  || created~"${search}")`
      )
    ).json();
    return {
      props: {
        models: data,
        search,
      },
    };
  }
  if (context.query.page) {
    const data = await (
      await fetch(
        `http://127.0.0.1:8090/api/collections/models/records?page=${context.query.page}`
      )
    ).json();
    return {
      props: {
        models: data,
      },
    };
  }
  if (context.query.search) {
    let { search } = context.query;
    if (search[0] === " ") search = "%2B" + search.slice(1);
    const data = await (
      await fetch(
        `http://127.0.0.1:8090/api/collections/models/records?filter=(model_name~"${search}" || description~"${search}"  || created~"${search}")`
      )
    ).json();
    console.log(data);
    if (data.items.length > 0)
      return {
        props: {
          models: data,
          search,
        },
      };
    else {
      const data = await (
        await fetch("http://127.0.0.1:8090/api/collections/models/records")
      ).json();
      return {
        props: {
          models: data,
          err: "there is no model with this data you provided",
        },
      };
    }
  }
  const data = await (
    await fetch("http://127.0.0.1:8090/api/collections/models/records?page=1")
  ).json();
  return {
    props: {
      models: data,
    },
  };
}
