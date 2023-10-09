import React from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Button, Checkbox, Form, Input } from "antd";
import "./pay.css";
const onFinish = (values) => {
    console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
function Pay() {
    return (
        <div>
            <Header />
            <div className="pay-container11">
                <div className="pay-container12">
                    <img
                        src="https://i.pinimg.com/564x/cc/f2/8f/ccf28ff9a235834b7d77ed9f3c6c6d18.jpg"
                        alt=""
                    />
                </div>
                <div className="pay-container">
                    <h1>THANH TOÁN </h1>
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Họ và tên:
                            <Input placeholder="Họ tên của bạn" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Số điện thoại:
                            <Input placeholder="Số điện thoại của bạn" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Email:
                            <Input placeholder="Email của bạn" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Tỉnh/Thành phố:
                            <Input placeholder="Chọn Tỉnh/Thành phố" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Quận/Huyện:
                            <Input placeholder="Chọn Quận/Huyện" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Phường/Xã;
                            <Input placeholder="Chọn Phường/Xã" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập đầy đủ thông tin!",
                                },
                            ]}
                        >
                            Tên đường, Số nhà:
                            <Input placeholder="Ví dụ: Số 20, ngõ 90" />
                        </Form.Item>
                        <textarea
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                            name=""
                            id=""
                            cols="100"
                            rows="2"
                        ></textarea>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Đặt hàng
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pay;
