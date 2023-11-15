import ReactDOM from "react-dom/client"; // added client due to createRoot error
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";

//  added "!" due to Type 'null' is not assignable to type 'Element error

ReactDOM.createRoot(document.getElementById("root")!).render(

    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>


);
