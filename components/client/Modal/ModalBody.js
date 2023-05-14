import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
export default function ModalBody({ data }) {
  const payload = useRef({});
  const { refresh } = useRouter();
  const { edit, isEditing } = useSelector((state) => state.form);
  const [Data, setData] = useState(data);
  const { check, isClicked } = useSelector((state) => state.form);
  const validation = async () => {
    let allGood = true;
    const { current } = payload;
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      sexe,
      age,
      profession,
      avatar,
      adresse,
    } = current;
    if (firstName.value.length < 3) {
      allGood = false;
      firstName.classList.add("is-invalid");
    } else {
      firstName.classList.remove("is-invalid");
      firstName.classList.add("is-valid");
    }
    if (lastName.value.length < 3) {
      allGood = false;
      lastName.classList.add("is-invalid");
    } else {
      lastName.classList.remove("is-invalid");
      lastName.classList.add("is-valid");
    }
    if (phoneNumber.value.length < 9) {
      allGood = false;
      phoneNumber.classList.add("is-invalid");
    } else {
      phoneNumber.classList.remove("is-invalid");
      phoneNumber.classList.add("is-valid");
    }
    if (email.value.length < 5) {
      allGood = false;
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
    }
    if (age.value != "" && parseInt(age.value) < 0) {
      allGood = false;
      age.classList.add("is-invalid");
    } else {
      age.classList.remove("is-invalid");
      age.classList.add("is-valid");
    }
    if (allGood) {
      console.log(isEditing);
      const pb = new PocketBase(
        "http://" +
          (process.env.NODE_ENV === "production"
            ? "sewing_api:8080"
            : "127.0.0.1:8090") +
          ""
      );
      const formData = new FormData();
      formData.append("first_name", firstName.value);
      formData.append("last_name", lastName.value);
      formData.append("tel", phoneNumber.value);
      formData.append("email", email.value);
      formData.append("sexe", sexe.value);
      formData.append("adresse", adresse.value);
      formData.append("age", age.value);
      formData.append("profession", profession.value);
      if (avatar.files[0]) formData.append("avatar", avatar.files[0]);
      if (!isEditing) await pb.collection("clients").create(formData);
      else await pb.collection("clients").update(data.id, formData);
      refresh();
    }
  };
  useEffect(() => {
    if (isClicked) validation();
  }, [check]);
  useEffect(() => {
    setData({ ...data });
    console.log("im here");
  }, [edit]);
  return (
    <div className="modal-body">
      <>
        {console.log("mchkila f default value")}
        <div className="input-group mb-3">
          <span className="input-group-text">Nom*</span>
          <input
            type="text"
            className="form-control"
            id="nom"
            defaultValue={data && Data.first_name}
            ref={(el) => (payload.current.firstName = el)}
            placeholder="eg. Hassan"
            key={data && Data.first_name}
          />
          <span className="input-group-text">Prenom*</span>
          <input
            type="text"
            className="form-control"
            id="Prenom"
            defaultValue={data && Data.last_name}
            ref={(el) => (payload.current.lastName = el)}
            placeholder="eg. swinga"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Email*</span>
          <input
            type="email"
            className="form-control"
            id="email"
            defaultValue={data && Data.email}
            ref={(el) => (payload.current.email = el)}
            placeholder="name@example.com"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Adresse</span>
          <input
            type="text"
            className="form-control"
            id="adresse"
            ref={(el) => (payload.current.adresse = el)}
            defaultValue={data && Data.adresse}
            placeholder="eg. CYM RABAT"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Telephone*</span>
          <input
            type="tel"
            className="form-control"
            id="tel"
            defaultValue={data && Data.tel}
            ref={(el) => (payload.current.phoneNumber = el)}
            placeholder="eg. 0600000000"
          />
          <span className="input-group-text">Profession</span>
          <input
            type="text"
            className="form-control"
            id="profession"
            defaultValue={data && Data.profession}
            ref={(el) => (payload.current.profession = el)}
            placeholder="eg. Doctor"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Sexe*</span>
          <select
            className="form-select"
            defaultValue={data && Data.sexe}
            ref={(el) => (payload.current.sexe = el)}
            aria-label="Default select example"
          >
            <option value="masculin">masculin</option>
            <option value="feminin">feminin</option>
          </select>
          <span className="input-group-text">age</span>
          <input
            type="number"
            className="form-control"
            defaultValue={data && Data.age}
            ref={(el) => (payload.current.age = el)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            ref={(el) => (payload.current.avatar = el)}
          />
        </div>
      </>
    </div>
  );
}
