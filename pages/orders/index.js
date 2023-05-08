import Layout from "@/components/layout";
import NoOrders from "@/components/orders/NoOrders";
import Head from "next/head";
import { Popup } from "devextreme-react";
import { useEffect, useState } from "react";
import Form from "@/components/orders/Form";
import Add from "@/components/orders/Add";
import PocketBase from "pocketbase";
import {
  DataGrid,
  FilterRow,
  SearchPanel,
  HeaderFilter,
  Paging,
} from "devextreme-react/data-grid";
export default function index({ totalItems }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await new PocketBase("http://127.0.0.1:8090")
        .collection("orders")
        .getFullList({
          batch: "-1",
        });
      console.log(data.length);
      setOrders(
        data.map(
          ({
            client_full_name,
            model_name,
            supplys_names,
            price_per_unit,
            quantity,
            created,
            updated,
          }) => {
            return {
              "client full name": client_full_name,
              "price/unit": price_per_unit,
              model: model_name,
              supplys: supplys_names,
              quantity,
              created: created.slice(0, 19),
              updated: updated.slice(0, 19),
            };
          }
        )
      );
    })();
  }, []);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  return (
    <>
      <Head>
        <title>GUEDIRA | Orders</title>
      </Head>
      <Layout>
        {totalItems < 1 ? (
          <NoOrders onClickLink={togglePopup} />
        ) : (
          <Add onClick={togglePopup} />
        )}
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
        {totalItems > 0 && (
          <>
            <DataGrid
              dataSource={
                orders.length > 0 ? orders : [{ message: "Loading..." }]
              }
              noDataText="nothing matched"
            >
              <FilterRow visible={true} />
              <SearchPanel visible={true} />
              <Paging enabled={true} defaultPageSize={10} />
              <HeaderFilter visible={true} />
            </DataGrid>
          </>
        )}
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const { totalItems } = await (
    await fetch(
      "http://127.0.0.1:8090/api/collections/orders/records?perPage=-1&limit=-1"
    )
  ).json();
  return {
    props: {
      totalItems,
    },
  };
}
