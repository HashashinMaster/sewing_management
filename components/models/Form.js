import { ScrollView } from "devextreme-react";
import { useRef } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
export default function Form() {
  const payload = useRef({});
  const { refresh } = useRouter();
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
    if (!picture.files[0]) {
      picture.classList.add("is-invalid");
      allGood = false;
    } else {
      picture.classList.remove("is-invalid");
      picture.classList.add("is-valid");
    }
    if (!allGood) return;
    const pb = new PocketBase("http://127.0.0.1:8090");
    const formData = new FormData();
    formData.append("modal_name", name.value);
    formData.append("description", description.value);
    if (picture.files[0]) formData.append("picture", picture.files[0]);
    await pb.collection("models").create(formData);
    refresh();
  };
  return (
    <ScrollView>
      <div class="input-group mb-3">
        <span class="input-group-text">Model Name*</span>
        <input
          type="text"
          placeholder="eg. Nike"
          ref={(el) => (payload.current.name = el)}
          className=" form-control"
        />
      </div>
      <div class="input-group mb-3">
        <textarea
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
    </ScrollView>
  );
}
