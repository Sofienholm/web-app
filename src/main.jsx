import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import { BrowserRouter } from "react-router";
import "./styles/gobal.css";
import "./styles/button.css";

// 👇 tilføj dette for at teste auth-status
import { getAuth } from "firebase/auth";
console.log("🔍 currentUser ved opstart:", getAuth().currentUser);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/web-app/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
