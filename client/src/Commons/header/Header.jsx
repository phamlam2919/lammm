import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const token = JSON.parse(localStorage.getItem("token")) || {};
    const [cartId, setCartId] = useState("");
    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/v1/users/${token}`)
            .then((res) => {
                setUser(res.data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
                setLoggedIn(false);
            });
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/login");
        // try {
        //     // Gọi API xóa giỏ hàng với user ID
        //     await axios.delete(`http://localhost:3001/api/v1/cart/${cartId}`);
        //     navigate("/login");
        // } catch (error) {
        //     console.error("Error deleting cart:", error);
        //     navigate("/login");
        // }
    };
    return (
        <div className="header">
            <div className="logo-header">
                <Link to="/">
                    <img
                        width="65"
                        height="58"
                        src="https://kinhmatanna.com/wp-content/uploads/2022/06/logo-anna.svg"
                        className="attachment-thumbnail size-thumbnail"
                        alt=""
                    ></img>
                </Link>
            </div>
            <div className="menu-header">
                <Link to="/" className="no-underline-link">
                    <p>Trang chủ</p>
                </Link>
                <Link to="/shop" className="no-underline-link">
                    <p>Sản phẩm</p>
                </Link>
                <p>Hành trình tử tế</p>
                <p>Về Anna</p>
                <p>Blog</p>
                <p>Order Checking</p>
                <p>Store</p>
            </div>
            <div className="icon-header">
                <i className="fa-solid fa-magnifying-glass"></i>
                {loggedIn && token.name ? (
                    <div>
                        <i className="fa-solid fa-user"></i>
                        {token.name}
                    </div>
                ) : (
                    <Link to="/login">
                        <i
                            className="fa-solid fa-user"
                            style={{ color: "black" }}
                        ></i>
                    </Link>
                )}
                <i
                    className="fa-solid fa-right-from-bracket"
                    onClick={handleLogout}
                ></i>
                <Link to="/cart">
                    <i
                        className="fa-sharp fa-solid fa-cart-shopping"
                        style={{ color: "black" }}
                    ></i>
                </Link>
            </div>
        </div>
    );
}

export default Header;
