import { useRouter } from "next/router";
import { useRef } from "react";
import clsx from "clsx";
export default function Search({ type }) {
  const searchInput = useRef();
  const { push } = useRouter();
  return (
    <div class="d-flex" role="search">
      <input
        ref={searchInput}
        className="form-control me-2"
        type="search"
        placeholder={clsx({
          ["Search avec le nom,prenom,adresse ou email..."]: type === "clients",
          ["Search avec le Supply Type,Supply Name,Quantity..."]:
            type === "stock",
          ["Search avec le nom de Model"]: type === "models",
        })}
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={() => {
          if (searchInput.current.value.length > 0)
            push(`/${type}?search=${searchInput.current.value}`);
          else push(`/${type}`);
        }}
      >
        Search
      </button>
    </div>
  );
}
