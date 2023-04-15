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
import Search from "@/components/Search";
export default function stock({ stockItems }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();
  const { isEditing } = useSelector((state) => state.stock);
  useEffect(() => {
    if (isEditing) dispatch(setEditing(false));
    console.log("ana f useEffect");
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
        <div className="my-3" style={{ padding: "1rem" }}>
          <Search type={"stock"} />
        </div>
        {stockItems.totalItems > 0 && (
          <div
            className="mt-3 d-flex flex-wrap mx-auto card-deck "
            style={{
              height: "37rem",
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
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const data = await (
    await fetch("http://127.0.0.1:8090/api/collections/stock/records?page=1")
  ).json();
  return {
    props: {
      stockItems: data,
    },
  };
}
