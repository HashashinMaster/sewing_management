import styles from "@/styles/Client.module.css";

export default function Form() {
  return (
    <div id={styles.add}>
      <button
        type="button"
        id={styles.add_btn}
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#add_client"
      >
        <i className="bi bi-plus"></i>
        Ajouter
      </button>
      <div
        className="modal fade"
        id="add_client"
        tabindex="-1"
        aria-labelledby="add_client_label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Ajouter Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span class="input-group-text">Nom*</span>
                <input
                  type="text"
                  className="form-control "
                  id="nom"
                  placeholder="eg. Hassan"
                />
                <span class="input-group-text">Prenom*</span>
                <input
                  type="text"
                  className="form-control"
                  id="Prenom"
                  placeholder="eg. swinga"
                />
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text">Email*</span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text">Adresse</span>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="eg. CYM RABAT"
                />
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text">Telephone*</span>
                <input
                  type="tel"
                  className="form-control"
                  id="email"
                  placeholder="eg. 0600000000"
                />
                <span class="input-group-text">Profession*</span>
                <input
                  type="text"
                  className="form-control"
                  id="profession"
                  placeholder="eg. Doctor"
                />
              </div>
              <div className="input-group mb-3">
                <span class="input-group-text">Sexe*</span>
                <select class="form-select" aria-label="Default select example">
                  <option>masculin</option>
                  <option>feminin</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}