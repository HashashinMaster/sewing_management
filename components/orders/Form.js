import { useRef, useState } from "react";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { ScrollView } from "devextreme-react";
import AsyncSelect from "react-select/async";

export default function Form(params) {
  const payload = useRef({});
  const [supplys, setSupplys] = useState([]);
  const clientFilter = (value, cb) => {
    fetch(
      `http://127.0.0.1:8090/api/collections/clients/records?filter=(first_name~"${value}" || last_name~"${value}")`
    )
      .then((res) => res.json())
      .then((data) =>
        cb(
          data.items.map((client) => {
            return {
              label: `First Name: ${client.first_name} | Last Name: ${client.last_name}`,
              value: client.id,
            };
          })
        )
      );
  };
  const modelFilter = (value, cb) => {
    fetch(
      `http://127.0.0.1:8090/api/collections/models/records?filter=(model_name~"${value}")`
    )
      .then((res) => res.json())
      .then((data) =>
        cb(
          data.items.map((model) => {
            return {
              label: model.model_name,
              value: model.id,
            };
          })
        )
      );
  };
  const stockFilter = (value, cb) => {
    fetch(
      `http://127.0.0.1:8090/api/collections/stock/records?filter=(supply_name~"${value}")`
    )
      .then((res) => res.json())
      .then((data) => {
        cb(
          data.items.map((ressource) => {
            return {
              label: ressource.supply_name,
              value: ressource.id,
              quantity: ressource.quantity,
            };
          })
        );
      });
  };
  return (
    <ScrollView>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <AutoCompleteSelect
              placeholder="Search for a Client with it's first or last name"
              filter={clientFilter}
              onChange={(option) => {
                payload.current.client = option.value;
              }}
            />
          </div>
          <div className="col">
            <AutoCompleteSelect
              placeholder="Search for a Model with it's name"
              filter={modelFilter}
              onChange={(option) => {
                payload.current.model = option.value;
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <AsyncSelect
              getOptionLabel={(option) => {
                return option.label;
              }}
              getOptionValue={(option) => {
                return option;
              }}
              filterOption={(option) => {
                return (
                  typeof supplys.find(
                    (opt) => option.data.value === opt.value
                  ) == "undefined"
                );
              }}
              isSearchable
              isMulti={true}
              cacheOptions
              key={supplys.length}
              defaultOptions
              value={supplys}
              placeholder="Search for a Supply with it's name"
              loadOptions={stockFilter}
              onChange={(option) => {
                setSupplys(option);
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          {supplys.map((supp, key) => (
            <div className="col">
              <input
                type="number"
                key={key}
                className="form-control"
                placeholder={`${supp.label} Quantity`}
                data-quantity={supp.quantity}
              />
            </div>
          ))}
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              className="form-control"
              type="number"
              placeholder="Quantity"
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              type="number"
              placeholder="Price per Unit"
            />
          </div>
        </div>
        <div className="row">
          <div className="col w-100">
            <button className="btn w-100 btn-primary">Save</button>
          </div>
        </div>
      </div>
    </ScrollView>
  );
}
