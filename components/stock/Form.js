import { useRef } from "react";
import ScrollView from "devextreme-react/scroll-view";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
export default function Form() {
  const payload = useRef({});
  const { refresh } = useRouter();
  const validation = async () => {
    let allGood = true;
    const { current } = payload;
    const { supplyName, supplyType, quantity, price, description, picture } =
      current;
    if (supplyName.value.length < 1) {
      supplyName.classList.add("is-invalid");
      allGood = false;
    } else {
      supplyName.classList.remove("is-invalid");
      supplyName.classList.add("is-valid");
    }

    if (supplyType.value === "select" || supplyType.value === "") {
      supplyType.classList.add("is-invalid");
      allGood = false;
    } else {
      supplyType.classList.remove("is-invalid");
      supplyType.classList.add("is-valid");
    }

    if (
      parseInt(quantity.value) < 0 ||
      isNaN(quantity.value) ||
      quantity.value.length < 1
    ) {
      quantity.classList.add("is-invalid");
      allGood = false;
    } else {
      quantity.classList.remove("is-invalid");
      quantity.classList.add("is-valid");
    }

    if (
      parseInt(price.value) < 0 ||
      isNaN(price.value) ||
      price.value.length < 1
    ) {
      price.classList.add("is-invalid");
      allGood = false;
    } else {
      price.classList.remove("is-invalid");
      price.classList.add("is-valid");
    }
    if (!allGood) return;
    const pb = new PocketBase("http://127.0.0.1:8090");
    const formData = new FormData();
    formData.append("supply_name", supplyName.value);
    formData.append("supply_type", supplyType.value);
    formData.append("quantity", quantity.value);
    formData.append("price_per_unit", price.value);
    formData.append("description", description.value);
    if (picture.files[0]) formData.append("picture", picture.files[0]);
    await pb.collection("stock").create(formData);
    refresh();
  };
  return (
    <ScrollView>
      <div className="input-group mb-3">
        <span className="input-group-text">Supply Name*</span>
        <input
          ref={(el) => (payload.current.supplyName = el)}
          type="text"
          className="form-control"
          placeholder="eg. T-shirt"
        />
        <span className="input-group-text">Supply Type*</span>
        <select
          className="form-select"
          ref={(el) => (payload.current.supplyType = el)}
          aria-label="Default select example"
        >
          <option value="select" selected disabled>
            Select a Type
          </option>
          <option value="Product">Product</option>
          <option value="Ressource">Ressource</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Quantity*</span>
        <input
          ref={(el) => (payload.current.quantity = el)}
          type="number"
          placeholder="eg. 100"
          className="form-control"
        />
        <span className="input-group-text">Price(unit/DH)*</span>
        <input
          ref={(el) => (payload.current.price = el)}
          type="number"
          placeholder="eg. 500"
          className="form-control"
        />
      </div>
      <div className="input-group mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          rows={10}
          ref={(el) => (payload.current.description = el)}
        ></textarea>
      </div>
      <input
        type="file"
        className="form-control"
        ref={(el) => (payload.current.picture = el)}
      />
      <button
        type="button"
        className="btn btn-primary w-100 mt-3"
        onClick={validation}
      >
        Sauvegarder
      </button>
    </ScrollView>
  );
}
