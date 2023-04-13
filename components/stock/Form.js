import { useState } from "react";
import ScrollView from "devextreme-react/scroll-view";

export default function Form(params) {
  const [other, setOther] = useState(false);
  return (
    <ScrollView>
      <div className="input-group mb-3">
        <span className="input-group-text">Supply Name*</span>
        <input type="text" className="form-control" placeholder="eg. tjakita" />
        <span className="input-group-text">Supply Type*</span>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            if (e.currentTarget.value === "other") setOther(true);
            else setOther(false);
          }}
        >
          <option value="select" selected disabled>
            Select a Type
          </option>
          <option value="tob">tob</option>
          <option value="7wayj">7wayj</option>
          <option value="other">Other</option>
        </select>
        {other && (
          <>
            <span className="input-group-text">Add a type*</span>
            <input type="text" className="form-control" placeholder="sbdila" />
          </>
        )}
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Quantity*</span>
        <input type="number" className="form-control" />
        <span className="input-group-text">Price(unit/DH)*</span>
        <input type="number" className="form-control" />
      </div>
      <div className="input-group mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          rows={10}
        ></textarea>
      </div>
      <input type="file" className="form-control" />
    </ScrollView>
  );
}
