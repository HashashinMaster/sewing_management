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
  LoadPanel,
  MasterDetail,
} from "devextreme-react/data-grid";
import Master from "@/components/orders/Master";
export default function index({ totalItems }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [orders, setOrders] = useState([]);
  const defaultColumns = [
    "client full name",
    "model",
    "supplys",
    "quantity",
    "created",
  ];
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
            id,
            client_id,
            model_id,
            client_full_name,
            model_name,
            supplys_names,
            price_per_unit,
            supplys,
            quantity,
            created,
          }) => {
            return {
              "client full name": client_full_name,
              clientId: client_id,
              model: model_name,
              modelId: model_id,
              supplys: supplys_names,
              supplys_ids: supplys,
              quantity,
              "price/unit": price_per_unit,
              "total price": parseInt(price_per_unit) * parseInt(quantity),
              created: created.slice(0, 19),
              id,
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
      <Layout page={"Orders"}>
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
                orders.length > 0
                  ? orders
                  : [{ id: "asdasdasfkoasdokfaspod", message: "Loading..." }]
              }
              noDataText="nothing matched"
              focusedRowEnabled
              keyExpr={"id"}
              defaultColumns={defaultColumns}
            >
              <FilterRow visible={true} />
              <SearchPanel visible={true} />
              <Paging enabled={true} defaultPageSize={10} />
              <HeaderFilter visible={true} />
              <LoadPanel enabled={true} />
              <MasterDetail enabled component={Master} />
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
