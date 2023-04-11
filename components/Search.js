import { useRouter } from "next/router";
import { useRef } from "react";

export default function Search(params) {
  const searchInput = useRef();
  const { push } = useRouter();
  return (
    <div class="d-flex" role="search">
      <input
        ref={searchInput}
        className="form-control me-2"
        type="search"
        placeholder="Search avec le nom,prenom,adresse ou email..."
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={() => {
          if (searchInput.current.value.length > 0)
            push(`/clients?search=${searchInput.current.value}`);
          else push("/clients");
        }}
      >
        Search
      </button>
    </div>
  );
}
