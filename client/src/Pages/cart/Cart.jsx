import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { InputNumber } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const onChange = (value) => {
    console.log("changed", value);
};
function Cart() {
    const [carts, setCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const token = JSON.parse(localStorage.getItem("token")) || {};
    const cartStore = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/v1/cart/cart/${token?.users_id}`)
            .then((res) => {
                setCartId(res?.data.cart_id);
            })
            .catch((err) => console.log(err));
    }, []);

    const listCart = () => {
        axios
            .get(`http://localhost:3001/api/add-to-cart/${cartId}`)
            .then((res) => {
                console.log(res.data.cart);
                setCart(res?.data?.cart);
                dispatch({ type: "LIST_CART", payload: res?.data?.cart });
            })
            .catch((err) => console.log(err));
    };

    const updateCartItemQuantity = async (cartItemId, newQuantity) => {
        try {
            await axios.put(
                `http://localhost:3001/api/add-to-cart/${cartItemId}`,
                {
                    quantity: newQuantity,
                }
            );
            listCart(); // Gọi lại hàm để cập nhật danh sách giỏ hàng sau khi cập nhật số lượng
        } catch (error) {
            console.error(
                "Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:",
                error
            );
        }
    };

    useEffect(() => {
        listCart();
    }, []);

    return (
        <div>
            <Header />
            <div className="cart-container">
                <div className="cart-container1">
                    <table className="table">
                        <thead>
                            <tr style={{ fontSize: "20px" }}>
                                <th scope="col">Thông tin sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Tổng cộng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartStore.map((cart) => (
                                <tr key={cart} style={{ lineHeight: "110px" }}>
                                    <th scope="row">
                                        <img
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                            }}
                                            src={cart.img1}
                                            alt=""
                                        />
                                        {cart.title}
                                    </th>
                                    <td>{cart.price}₫</td>
                                    <td>
                                        <InputNumber
                                            min={1}
                                            max={100000}
                                            defaultValue={cart.quantity} // Set giá trị mặc định là số lượng đã có trong giỏ hàng
                                            onChange={(newQuantity) =>
                                                updateCartItemQuantity(
                                                    cart.cart_item_id,
                                                    newQuantity
                                                )
                                            }
                                        />
                                    </td>
                                    <td>{cart.price}₫</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cart-container2">
                    <p>Thông tin thanh toán</p>
                    <div className="cart-container3">
                        <span>Tạm tính</span>
                        <span>504,000₫</span>
                    </div>

                    <div className="cart-container3">
                        <span>Tổng</span>
                        <span className="total"> 504,000₫</span>
                    </div>
                    <Link to="/pay">
                        <button>Tiến hành thanh toán</button>
                    </Link>
                    <p style={{ fontSize: "15px" }}>
                        Chúng tôi chấp nhận thanh toán
                    </p>
                    <div className="cart-container4">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2022/06/image-4.jpg"
                            alt=""
                        />
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2022/06/anh_4-removebg-preview-1.jpg"
                            alt=""
                        />
                        <img
                            src="	https://kinhmatanna.com/wp-content/uploads/2022/06/anh_2-removebg-preview-1.jpg"
                            alt=""
                        />
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2022/06/Anh_1-removebg-preview-2.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
