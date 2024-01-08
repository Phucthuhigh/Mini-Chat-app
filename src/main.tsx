import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./contexts/AuthContext.tsx";
import AppContext from "./contexts/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthContext>
                    <AppContext>
                        <App />
                    </AppContext>
                </AuthContext>
            </ThemeProvider>
        </Router>
    </React.StrictMode>
);
