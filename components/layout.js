import Link from "next/link";
import clsx from "clsx";
import { useEffect } from "react";
export default function Layout({ children, page }) {
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);
  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            GUEDIRA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                GUEDIRA
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", page === "Home" && " active")}
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li
                  className={clsx(
                    "nav-link",
                    page === "Stock" && "nav-link active"
                  )}
                >
                  <Link className="nav-link" href="/stock">
                    Stock
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx(
                      "nav-link",
                      page === "Clients" && " active"
                    )}
                    href="/clients"
                  >
                    Clients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", page === "Ordres" && " active")}
                    href="/ordres"
                  >
                    Ordres
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <main className="mt-5">{children}</main>
    </>
  );
}
