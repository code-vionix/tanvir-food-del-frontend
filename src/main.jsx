import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContexProvider from "./Contex/StoreContex.jsx";
import { AuthProvider } from "./Contex/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <StoreContexProvider>
        <App />
      </StoreContexProvider>
    </AuthProvider>
  </BrowserRouter>
);
