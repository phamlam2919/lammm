import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Homepage/HomePage";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Shop from "./Pages/shop/Shop";
import Detail from "./Pages/detail/Detail";
import Cart from "./Pages/cart/Cart";
import Pay from "./Pages/Pay/Pay";
import Admin from "./Admin/Admin";
import { useEffect, useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token")) || {};
        setIsLoggedIn(!!token);
    }, []);

    const AdminRoute = ({ element }) => {
        if (!isLoggedIn) {
            return <Navigate to="/login" />;
        }
        return element;
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pay" element={<Pay />} />
            </Routes>
            <Routes>
                <Route
                    path="/admin"
                    element={<AdminRoute element={<Admin />} />}
                />
            </Routes>
        </>
    );
}

export default App;
