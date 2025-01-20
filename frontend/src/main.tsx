import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {persistor, store} from "./app/store.ts";
import { CssBaseline } from "@mui/material";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
              <CssBaseline />
              <App />
          </BrowserRouter>
      </PersistGate>
  </Provider>,
);
