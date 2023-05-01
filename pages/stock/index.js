import Layout from "@/components/layout";
import Head from "next/head";
import styles from "@/styles/Stock.module.css";
import Popup from "devextreme-react/popup";
import { useEffect, useState } from "react";
import Form from "@/components/stock/Form";
import Add from "@/components/stock/Add";
import SupplyCard from "@/components/stock/SupplyCard";
import { useDispatch, useSelector } from "react-redux";
import { setEditing } from "@/redux/stock";
import Link from "next/link";
import Search from "@/components/Search";
import clsx from "clsx";

export default function stock({ stockItems, search, err }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();
  const { isEditing } = useSelector((state) => state.stock);
  const [pagesBtns, setPagesBtns] = useState([]);
  useEffect(() => {
    let counter = 1;
    const btns = [];
    while (counter <= stockItems.totalPages) {
      btns.push(
        <li className="page-item" key={counter}>
          <Link
            key={counter}
            className={clsx(
              "page-link",
              stockItems.page === counter && "active"
            )}
            href={`/stock?page=${counter}${clsx(
              search && `&search=${search}`
            )}`}
          >
            {counter}
          </Link>
        </li>
      );
      counter++;
      console.log(btns);
    }
    setPagesBtns(btns);
  }, [stockItems.items, stockItems.page]);
  useEffect(() => {
    if (isEditing) dispatch(setEditing(false));
  });
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
    if (isEditing) dispatch(setEditing(false));
  };
  return (
    <>
      <Head>
        <title>GUEDIRA | STOCK</title>
      </Head>
      <Layout>
        {stockItems.totalItems < 1 ? (
          <main className={styles.stock_empty}>
            <i class={`bi bi-box-fill ${styles.box_empty}`}></i>
            <div class="alert alert-warning" role="alert">
              Stock is empty.
              <a
                className={`alert-link ${styles.add_empty}`}
                onClick={togglePopup}
              >
                Add a supply
              </a>
            </div>
          </main>
        ) : (
          <Add onClick={togglePopup} />
        )}
        <Popup
          visible={isPopupVisible}
          title="ADD Supply"
          hideOnOutsideClick={true}
          hideOnParentScroll={true}
          contentComponent={Form}
          dragEnabled={false}
          onHiding={togglePopup}
        />

        {stockItems.totalItems > 0 && (
          <>
            <div className="my-3" style={{ padding: "1rem" }}>
              {err && (
                <div className="alert alert-danger" role="alert">
                  {err}
                </div>
              )}
              <Search type={"stock"} />
            </div>
            <div
              className="mt-3 d-flex flex-wrap mx-auto card-deck "
              style={{
                minHeight: "37rem",
                width: "100%",
                padding: "0  0 0 2rem",
                gap: "1rem",
              }}
            >
              {stockItems.items.map((supply, key) => (
                <SupplyCard {...supply} key={key} />
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
        `http://127.0.0.1:8090/api/collections/stock/records?page=${context.query.page}&filter=(supply_name~"${search}" || supply_type~"${search}"  || quantity~"${search}" || price_per_unit~"${search}" || description~"${search}")`
      )
    ).json();
    return {
      props: {
        stockItems: data,
        search,
      },
    };
  }
  if (context.query.page) {
    const data = await (
      await fetch(
        `http://127.0.0.1:8090/api/collections/stock/records?page=${context.query.page}`
      )
    ).json();
    return {
      props: {
        stockItems: data,
      },
    };
  }
  if (context.query.search) {
    let { search } = context.query;
    if (search[0] === " ") search = "%2B" + search.slice(1);
    const data = await (
      await fetch(
        `http://127.0.0.1:8090/api/collections/stock/records?filter=(supply_name~"${search}" || supply_type~"${search}"  || quantity~"${search}" || price_per_unit~"${search}" || description~"${search}")`
      )
    ).json();
    if (data.items.length > 0)
      return {
        props: {
          stockItems: data,
          search,
        },
      };
    else {
      const data = await (
        await fetch("http://127.0.0.1:8090/api/collections/stock/records")
      ).json();
      return {
        props: {
          stockItems: data,
          err: "there is no supply with this data you provided",
        },
      };
    }
  }

  const data = await (
    await fetch("http://127.0.0.1:8090/api/collections/stock/records?page=1")
  ).json();
  return {
    props: {
      stockItems: data,
    },
  };
}
