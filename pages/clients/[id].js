import DeleteModal from "@/components/client/Modal/DeleteModal";
import Modal from "@/components/client/Modal/Modal";
import Layout from "@/components/layout";
import { setEditing, toggleEdit } from "@/redux/form";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function client({
  id,
  first_name,
  last_name,
  tel,
  email,
  sexe,
  age,
  avatar,
  profession,
  adresse,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title> Client | {first_name}</title>
      </Head>
      <Layout>
        <div className="container mt-5 m-auto">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <Image
                    width={200}
                    height={200}
                    src={`http://127.0.0.1:8090/api/files/clients/${id}/${avatar}`}
                    alt="Profile Picture"
                    className="rounded-circle mb-3"
                    style={{ "object-fit": "cover" }}
                  />
                  <h5 className="card-title">
                    {first_name} {last_name}
                  </h5>
                  <p className="card-text">{profession}</p>
                  <button
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#add_client"
                    onClick={() => {
                      dispatch(setEditing(true));
                      dispatch(toggleEdit());
                    }}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_client"
                  >
                    <i className="bi bi-trash"></i>
                    Delete
                  </button>
                  <Modal
                    data={{
                      id,
                      first_name,
                      last_name,
                      tel,
                      email,
                      sexe,
                      age,
                      avatar,
                      profession,
                      adresse,
                    }}
                  />
                  <DeleteModal id={id} />
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Email:</strong> {email}
                  </li>
                  <li className="list-group-item">
                    <strong>Tel:</strong> {tel}
                  </li>
                  <li className="list-group-item">
                    <strong>Sexe:</strong> {sexe}
                  </li>
                  <li className="list-group-item">
                    <strong>Age:</strong> {age}
                  </li>
                  <li className="list-group-item">
                    <strong>Adresse:</strong> {adresse}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/clients/records/${context.params.id}`
  );
  const data = await res.json();
  console.log(data);
  return {
    props: {
      ...data,
    },
  };
}
