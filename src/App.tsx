import "./App.css";
import { publicRoutes, privateRoutes } from "@/routes";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ui/ProtectedRoute";

function App() {
    return (
        <div className="flex flex-col min-h-screen h-screen bg-slate-200 dark:bg-slate-950">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page />}
                        />
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <Page />
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
