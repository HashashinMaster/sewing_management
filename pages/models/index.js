import Layout from "@/components/layout";
import NoModel from "@/components/models/NoModel";
import Head from "next/head";

export default function index(params) {
  return (
    <>
      <Head>
        <title> GUEDIRA | Models</title>
      </Head>
      <Layout>
        <NoModel />
      </Layout>
    </>
  );
}
