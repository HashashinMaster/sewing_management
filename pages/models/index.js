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

export default function index({ models, err }) {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsEditing(false));
  });
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
          </>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await (
    await fetch("http://127.0.0.1:8090/api/collections/models/records?page=1")
  ).json();
  return {
    props: {
      models: data,
    },
  };
}
