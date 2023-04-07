import { useRef } from "react";

export default function ModalBody() {
  const payload = useRef({});
  return (
    <div className="modal-body">
      <div className="input-group mb-3">
        <span class="input-group-text">Nom*</span>
        <input
          type="text"
          className="form-control"
          id="nom"
          ref={(el) => (payload.current.firstName = el)}
          placeholder="eg. Hassan"
        />
        <span class="input-group-text">Prenom*</span>
        <input
          type="text"
          className="form-control"
          id="Prenom"
          ref={(el) => (payload.current.lastName = el)}
          placeholder="eg. swinga"
        />
      </div>
      <div className="input-group mb-3">
        <span class="input-group-text">Email*</span>
        <input
          type="email"
          className="form-control"
          id="email"
          ref={(el) => (payload.current.email = el)}
          placeholder="name@example.com"
        />
      </div>
      <div className="input-group mb-3">
        <span class="input-group-text">Adresse</span>
        <input
          type="text"
          className="form-control"
          id="adresse"
          ref={(el) => (payload.current.adresse = el)}
          placeholder="eg. CYM RABAT"
        />
      </div>
      <div className="input-group mb-3">
        <span class="input-group-text">Telephone*</span>
        <input
          type="tel"
          className="form-control"
          id="tel"
          ref={(el) => (payload.current.phoneNumber = el)}
          placeholder="eg. 0600000000"
        />
        <span class="input-group-text">Profession*</span>
        <input
          type="text"
          className="form-control"
          id="profession"
          ref={(el) => (payload.current.profession = el)}
          placeholder="eg. Doctor"
        />
      </div>
      <div className="input-group mb-3">
        <span class="input-group-text">Sexe*</span>
        <select
          class="form-select"
          ref={(el) => (payload.current.sexe = el)}
          aria-label="Default select example"
        >
          <option value="masculin">masculin</option>
          <option value="feminin">feminin</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          ref={(el) => (payload.current.avatar = el)}
        />
      </div>
    </div>
  );
}
