import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import { AuthContextProvider } from "./components/context/AuthContextProvider/provider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
);
