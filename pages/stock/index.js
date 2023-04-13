import Layout from "@/components/layout";
import Head from "next/head";
import "devextreme/dist/css/dx.light.css";
import styles from "@/styles/Stock.module.css";
import Popup from "devextreme-react/popup";
import { useState } from "react";
import Form from "@/components/stock/Form";

export default function stock({ stockItems }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  return (
    <>
      <Head>
        <title>GUEDIRA | STOCK</title>
      </Head>
      <Layout>
        {stockItems.totalItems < 1 && (
          <main className={styles.stock_empty}>
            <i class={`bi bi-box-fill ${styles.box_empty}`}></i>
            <div class="alert alert-warning" role="alert">
              Stock is empty.{" "}
              <a
                className={`alert-link ${styles.add_empty}`}
                onClick={togglePopup}
              >
                Add a supply
              </a>
            </div>
          </main>
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
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const data = await (
    await fetch("http://127.0.0.1:8090/api/collections/stock/records?page=1")
  ).json();
  console.log(data);
  return {
    props: {
      stockItems: data,
    },
  };
}
