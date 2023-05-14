import { useEffect, useRef } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function Form() {
  const payload = useRef({});
  const { refresh } = useRouter();
  const { isEditing, data } = useSelector((state) => state.model);
  useEffect(() => {
    const { name, description } = payload.current;
    if (isEditing) {
      name.value = data.model_name;
      description.value = data.description;
    }
  }, [data]);
  const validation = async () => {
    let allGood = true;
    const { name, picture, description } = payload.current;
    if (name.value.length < 1) {
      name.classList.add("is-invalid");
      allGood = false;
    } else {
      name.classList.remove("is-invalid");
      name.classList.add("is-valid");
    }
    if (!picture.files[0] && !isEditing) {
      picture.classList.add("is-invalid");
      allGood = false;
    } else {
      picture.classList.remove("is-invalid");
      picture.classList.add("is-valid");
    }
    if (!allGood) return;
    const pb = new PocketBase(
      "http://" +
        (process.env.NODE_ENV === "production"
          ? "sewing_api:8080"
          : "127.0.0.1:8090") +
        ""
    );
    const formData = new FormData();
    formData.append("model_name", name.value);
    formData.append("description", description.value);
    if (picture.files[0]) formData.append("picture", picture.files[0]);
    if (!isEditing) await pb.collection("models").create(formData);
    else await pb.collection("models").update(data.id, formData);
    refresh();
  };
  return (
    <>
      <div class="input-group mb-3">
        <span class="input-group-text">Model Name*</span>
        <input
          defaultValue={isEditing ? data.model_name : ""}
          type="text"
          placeholder="eg. Nike"
          ref={(el) => (payload.current.name = el)}
          className=" form-control"
        />
      </div>
      <div class="input-group mb-3">
        <textarea
          defaultValue={isEditing ? data.description : ""}
          rows={10}
          className="form-control"
          placeholder="Description"
          ref={(el) => (payload.current.description = el)}
        ></textarea>
      </div>
      <input
        type="file"
        className="form-control mb-3"
        ref={(el) => (payload.current.picture = el)}
      />

      <button className="btn btn-primary w-100" onClick={validation}>
        Save
      </button>
    </>
  );
}
