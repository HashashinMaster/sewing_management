import { useRef, useState } from "react";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { ScrollView } from "devextreme-react";
import AsyncSelect from "react-select/async";
import notify from "devextreme/ui/notify";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
export default function Form() {
  const { refresh } = useRouter();
  const payload = useRef({ supp: {}, client: "", model: "" });
  const [supplys, setSupplys] = useState([]);
  console.log(supplys);
  const [err, setErr] = useState({
    client: false,
    model: false,
    supply: false,
  });
  const clientFilter = (value, cb) => {
    fetch(
      `http://${
        process.env.NODE_ENV === "production"
          ? "127.0.0.1:8080"
          : "127.0.0.1:8090"
      }/api/collections/clients/records?filter=(first_name~"${value}" || last_name~"${value}")`
    )
      .then((res) => res.json())
      .then((data) =>
        cb(
          data.items.map((client) => {
            return {
              label: `First Name: ${client.first_name} | Last Name: ${client.last_name}`,
              value: client.id,
              fullName: client.first_name + " " + client.last_name,
            };
          })
        )
      );
  };
  const modelFilter = (value, cb) => {
    fetch(
      `http://${
        process.env.NODE_ENV === "production"
          ? "127.0.0.1:8080"
          : "127.0.0.1:8090"
      }/api/collections/models/records?filter=(model_name~"${value}")`
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
      `http://${
        process.env.NODE_ENV === "production"
          ? "127.0.0.1:8080"
          : "127.0.0.1:8090"
      }/api/collections/stock/records?filter=(supply_name~"${value}" %26%26 quantity > 0)`
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
  const errorStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "red",
      boxShadow: "none",
      "&:hover": {
        borderColor: "red",
      },
    }),
  };
  const validation = async () => {
    const { client, model, supp, quantity, pricePerUnit } = payload.current;
    let allGood = true;
    const errChcker = {};
    console.log(quantity, pricePerUnit);
    if (!client.value) {
      errChcker.client = true;
      allGood = false;
    } else {
      errChcker.client = false;
    }
    if (!model.value) {
      errChcker.model = true;
      allGood = false;
    } else {
      errChcker.model = false;
    }
    if (supplys.length < 1) {
      errChcker.supply = true;
      allGood = false;
    } else {
      errChcker.supply = false;
    }
    setErr(errChcker);
    if (parseInt(quantity.value) < 1 || !quantity.value) {
      quantity.classList.add("is-invalid");
      allGood = false;
    } else quantity.classList.remove("is-invalid");
    if (parseInt(pricePerUnit.value) < 1 || !pricePerUnit.value) {
      pricePerUnit.classList.add("is-invalid");
      allGood = false;
    } else pricePerUnit.classList.remove("is-invalid");

    Object.keys(supp).forEach((key) => {
      if (!supp[key]) return;
      if (supp[key].value < 1) {
        supp[key].classList.add("is-invalid");
        allGood = false;
      } else supp[key].classList.remove("is-invalid");

      if (parseInt(supp[key].value) > parseInt(supp[key].dataset.quantity)) {
        allGood = false;
        supp[key].classList.add("is-invalid");
        notify(
          {
            message: `You have only ${supp[key].dataset.quantity} from ${supp[key].dataset.name}`,
            width: 230,
            type: "error",
            displayTime: 2000,
          },
          {
            direction: "up-push",
            position: "bottom center",
          }
        );
      }
    });

    if (!allGood) return;
    const pb = new PocketBase(
      "http://" +
        (process.env.NODE_ENV === "production"
          ? "127.0.0.1:8080"
          : "127.0.0.1:8090") +
        ""
    );
    try {
      await Promise.all(
        Object.keys(supp).map((key) =>
          pb.collection("stock").update(key, {
            quantity:
              parseInt(supp[key].dataset.quantity) - parseInt(supp[key].value),
          })
        )
      );
      await pb.collection("orders").create({
        client_id: client.value,
        client_full_name: client.fullName,
        model_id: model.value,
        model_name: model.label,
        supplys: JSON.stringify(supplys.map((sup) => sup.value)),
        supplys_names: supplys.map((sup) => sup.label),
        price_per_unit: pricePerUnit.value,
        quantity: quantity.value,
      });
      refresh();
    } catch (error) {
      console.log(error.message);
    }
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
                payload.current.client = option;
              }}
              styles={err.client ? errorStyles : {}}
            />
          </div>
          <div className="col">
            <AutoCompleteSelect
              styles={err.model ? errorStyles : {}}
              placeholder="Search for a Model with it's name"
              filter={modelFilter}
              onChange={(option) => {
                payload.current.model = option;
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
              styles={err.supply ? errorStyles : {}}
              isSearchable
              aria-invalid={"true"}
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
                ref={(el) => (payload.current.supp[supp.value] = el)}
                type="number"
                key={key}
                className="form-control"
                placeholder={`${supp.label} Quantity`}
                data-quantity={supp.quantity}
                data-name={supp.label}
              />
            </div>
          ))}
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              className="form-control"
              type="number"
              ref={(el) => (payload.current.quantity = el)}
              placeholder="Quantity"
            />
          </div>
          <div className="col">
            <input
              ref={(el) => (payload.current.pricePerUnit = el)}
              className="form-control"
              type="number"
              placeholder="Price per Unit"
            />
          </div>
        </div>
        <div className="row">
          <div className="col w-100">
            <button className="btn w-100 btn-primary" onClick={validation}>
              Save
            </button>
          </div>
        </div>
      </div>
    </ScrollView>
  );
}
