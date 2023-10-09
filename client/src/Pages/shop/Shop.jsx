import React, { useEffect, useState } from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import "./shop.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Shop() {
    const settings = {
        dots: false, // Hiển thị điểm chuyển đổi
        infinite: true, // Vòng lặp vô hạn
        speed: 500, // Tốc độ chuyển đổi
        slidesToShow: 4, // Số lượng slide hiển thị trên mỗi lần
        slidesToScroll: 1, // Số lượng slide chuyển đổi trong mỗi lần
        prevArrow: <CustomPrevArrow />, // Sử dụng component tạo nút chuyển qua
        nextArrow: <CustomNextArrow />, // Sử dụng component tạo nút chuyển lại
    };
    const settings1 = {
        dots: false, // Hiển thị điểm chuyển đổi
        infinite: true, // Vòng lặp vô hạn
        speed: 500, // Tốc độ chuyển đổi
        slidesToShow: 3, // Số lượng slide hiển thị trên mỗi lần
        slidesToScroll: 1, // Số lượng slide chuyển đổi trong mỗi lần
        prevArrow: <CustomPrevArrow />, // Sử dụng component tạo nút chuyển qua
        nextArrow: <CustomNextArrow />, // Sử dụng component tạo nút chuyển lại
    };

    const [products, setProducts] = useState([]);

    const listProducts = () => {
        axios
            .get(`http://localhost:3001/api/v1/product`)
            .then((res) => {
                const productList = res.data.product;
                setProducts(productList);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        listProducts();
    }, []);
    return (
        <div>
            <Header />
            <div className="shop-product">
                <h1>Sản phẩm</h1>
            </div>
            <div className="shop-text">
                <h2>Gọng kính</h2>
                <p>
                    Gọng kính được xem như bộ khung vững chắc, là giá đỡ vững
                    chắc cho mắt kính. Không những thế, các loại gọng kính còn
                    được thiết kế như là một phụ kiện thời trang hấp dẫn giúp
                    chủ sở hữu nổi bần bật, thu hút mọi ánh nhìn.
                </p>
            </div>
            <div className="shop-kinhs">
                <ul className="shop-product1">
                    {products.map((product) => (
                        <Link
                            to={`/detail/${product.product_id}`}
                            key={product.product_id}
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            <li className="shop-product2">
                                <img src={product.img1} alt="" />
                                <br />
                                <span className="shop-product3">
                                    {product.title}
                                </span>
                                <br />
                                <span className="shop-product4">
                                    {product.price}₫
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="product-carousel">
                <h1>Sản phẩm nổi bật</h1>
                <Slider {...settings}>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-195-1-300x300.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 800NC004</span>
                        <br />
                        <span className="shop-product4">720,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-225-1-300x300.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 800NC003</span>
                        <br />
                        <span className="shop-product4">720,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-243-1-300x300.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 800NC001</span>
                        <br />
                        <span className="shop-product4">720,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_3955-copy-1-300x300.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 380CK134</span>
                        <br />
                        <span className="shop-product4">342,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-11_1-1-300x300.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 800NC005</span>
                        <br />
                        <span className="shop-product4">720,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2022/07/kinhmatanna-20201215191522.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 0123459</span>
                        <br />
                        <span className="shop-product4">356,000₫</span>
                    </div>
                    <div className="product-carousel1">
                        <img
                            src="https://kinhmatanna.com/wp-content/uploads/2023/02/12388..-768x768.jpg"
                            alt=""
                        />
                        <br />
                        <span className="shop-product3">GK – 280CN023</span>
                        <br />
                        <span className="shop-product4">252,000₫</span>
                    </div>
                </Slider>
            </div>
            <div style={{ padding: " 0% 5%", marginBottom: "6%" }}>
                <div className="product-one">
                    <h1>SẢN PHẨM MỚI NHẤT</h1>
                    <div className="" style={{ display: "flex", gap: "23%" }}>
                        <div style={{ width: "15%" }}>
                            <img
                                className="product-img"
                                src="https://kinhmatanna.com/wp-content/uploads/2022/06/Rectangle-416.jpg"
                                alt=""
                            />
                        </div>
                        <div style={{ width: "61%" }}>
                            <Slider {...settings1}>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-195-1-300x300.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 800NC004
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        720,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-225-1-300x300.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 800NC003
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        720,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-243-1-300x300.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 800NC001
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        720,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/06/DSC_3955-copy-1-300x300.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 380CK134
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        342,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/06/Anna-11_1-1-300x300.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 800NC005
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        720,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2022/07/kinhmatanna-20201215191522.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 0123459
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        356,000₫
                                    </span>
                                </div>
                                <div className="product-new1">
                                    <img
                                        src="https://kinhmatanna.com/wp-content/uploads/2023/02/12388..-768x768.jpg"
                                        alt=""
                                    />
                                    <br />
                                    <span className="shop-product3">
                                        GK – 280CN023
                                    </span>
                                    <br />
                                    <span className="shop-product4">
                                        252,000₫
                                    </span>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
const CustomNextArrow = (props) => (
    <button {...props} className="slick-arrow custom-next-arrow">
        <i className="fa-solid fa-chevron-right"></i>
    </button>
);

// Component tạo nút chuyển lại tùy chỉnh
const CustomPrevArrow = (props) => (
    <button {...props} className="slick-arrow custom-prev-arrow">
        <i className="fa-solid fa-chevron-left"></i>
    </button>
);
export default Shop;
