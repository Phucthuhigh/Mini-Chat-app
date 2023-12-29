import "./App.css";
import { publicRoutes } from "@/routes";
import { Routes, Route } from "react-router-dom";

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
            </Routes>
        </div>
    );
}

export default App;
