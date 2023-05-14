import DeleteModal from "@/components/client/Modal/DeleteModal";
import Layout from "@/components/layout";
import EditModal from "@/components/models/EditModal";
import ModelInfo from "@/components/models/ModelInfo";
import { setData, setIsEditing } from "@/redux/model";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function model(props) {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(setIsEditing(true));
    disptach(
      setData({
        id: props.id,
        model_name: props.model_name,
        description: props.description,
      })
    );
  });
  return (
    <>
      <Head>
        <title>Models | {props.model_name}</title>
      </Head>
      <Layout>
        <ModelInfo info={{ ...props }} />
        <EditModal />
        <DeleteModal type={"models"} id={props.id} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await (
    await fetch(
      `http://${
        process.env.NODE_ENV === "production"
          ? "0.0.0.0:8080"
          : "127.0.0.1:8090"
      }/api/collections/models/records/${context.params.id}`
    )
  ).json();

  return {
    props: {
      ...data,
    },
  };
}
