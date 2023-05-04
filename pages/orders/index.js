import Layout from "@/components/layout";
import NoOrders from "@/components/orders/NoOrders";
import Head from "next/head";
import { Popup } from "devextreme-react";
import { useState } from "react";
import Form from "@/components/orders/Form";
export default function index(params) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  return (
    <>
      <Head>
        <title>GUEDIRA | Orders</title>
      </Head>
      <Layout>
        <NoOrders onClickLink={togglePopup} />
        <Popup
          height={"auto"}
          visible={isPopupVisible}
          title="ADD Order"
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
