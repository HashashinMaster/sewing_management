import Layout from "@/components/layout";
import NoOrders from "@/components/orders/NoOrders";
import Head from "next/head";
import { Popup } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
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
  Column,
} from "devextreme-react/data-grid";

import Master from "@/components/orders/Master";
import DeleteModal from "@/components/orders/DeleteModal";
export default function index({ totalItems }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [orders, setOrders] = useState([]);
  const deletedOrderId = useRef();
  const actionsRender = ({ data }) => (
    <>
      <button
        className="btn btn-danger mx-auto"
        data-bs-toggle="modal"
        data-bs-target="#delete"
        style={{ display: "block" }}
        onClick={(e) => {
          deletedOrderId.current = data.id;
        }}
      >
        Delete
      </button>
    </>
  );

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
            >
              <FilterRow visible={true} />
              <SearchPanel visible={true} />
              <Paging enabled={true} defaultPageSize={10} />
              <HeaderFilter visible={true} />
              <LoadPanel enabled={true} />
              <MasterDetail enabled component={Master} />
              <Column
                caption={"client full name"}
                dataField={"client full name"}
              />
              <Column caption={"model"} dataField={"model"} />
              <Column caption={"supplys"} dataField={"supplys"} />
              <Column caption={"quantity"} dataField={"quantity"} />
              <Column caption={"created"} dataField={"created"} />
              <Column
                cellRender={actionsRender}
                caption={"Actions"}
                dataField={"actions"}
                allowSearch={false}
                allowEditing={false}
                allowFiltering={false}
              />
            </DataGrid>
            <DeleteModal action={deletedOrderId} />
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
