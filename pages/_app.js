import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "devextreme/dist/css/dx.light.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import "@/styles/globals.css";
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
