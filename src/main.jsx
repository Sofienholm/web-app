import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import { BrowserRouter } from "react-router";
import "./styles/gobal.css"; 
import "./styles/button.css";
import "./app/authInit.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/web-app/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);