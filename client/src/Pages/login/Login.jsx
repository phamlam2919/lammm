import React, { useState } from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Button, Checkbox, Form, Input } from "antd";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
    const navigate = useNavigate();

    const [newUsers, setNewUser] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleCreat = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleCreateUser = (e) => {
        e.preventDefault();

        const errors = {};

        if (!newUsers.email) {
            errors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(newUsers.email)) {
            errors.email = "Email không hợp lệ";
        }

        if (!newUsers.password) {
            errors.password = "Mật khẩu không được để trống";
        } else if (newUsers.password.length < 6) {
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios
                .post(`http://localhost:3001/api/v1/auth/signin`, newUsers)
                .then((res) => {
                    if (res.data.result.status === 200) {
                        if (res.data.result.info.role === 1) {
                            navigate("/admin");
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Đăng nhập thành công",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            localStorage.setItem(
                                "token",
                                JSON.stringify(res.data.result.info)
                            );
                            navigate("/");
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Đăng nhập thất bại...",
                            text: "Tài khoản hoặc mật khẩu không chính xác",
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <div>
            <Header />
            <div className="login-form">
                <img
                    className="login-form1"
                    src="https://kinhmatanna.com/wp-content/uploads/2022/06/Rectangle-656.jpg"
                    alt=""
                />
                <div className="login-form2">
                    <h1 className="login-form3">Đăng nhập</h1>
                    <p className="login-form3">
                        Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn
                    </p>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item label="" name="username">
                            Email:
                            <Input
                                name="email"
                                onChange={handleCreat}
                                placeholder="Enter your email"
                            />
                            {formErrors.email && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.email}
                                </span>
                            )}
                        </Form.Item>

                        <Form.Item name="password">
                            Password:
                            <Input.Password
                                name="password"
                                onChange={handleCreat}
                                placeholder="Enter your password"
                            />
                            {formErrors.password && (
                                <span
                                    className="error-message"
                                    style={{ color: "red" }}
                                >
                                    {formErrors.password}
                                </span>
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="submit"
                                className="login-form4"
                                htmlType="submit"
                                onClick={handleCreateUser}
                            >
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <button className="login-form5">
                        <i className="fa-brands fa-facebook "></i>
                        Đăng nhập bằng <b>Facebook</b>
                    </button>
                    <button className="login-form6">
                        <div className="nsl-button-svg-container register-form7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 8.4818 21 12 21z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z"
                                ></path>
                                <path
                                    fill="#EA4335"
                                    d="M12 6.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 3.8918 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.9573 7.9582L6.964 10.29C7.6718 8.1627 9.6559 6.5795 12 6.5795z"
                                ></path>
                            </svg>
                        </div>
                        Đăng nhập bằng <b>Google</b>
                    </button>
                    <p className="login-form3">Bạn chưa có tài khoản Anna ?</p>
                    <Link to="/register">
                        <p className="login-form3" style={{ color: "blue" }}>
                            Đăng ký ngay
                        </p>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
