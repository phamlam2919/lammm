// Khởi tạo server
const express = require("express");
const server = express();

// Require các packages cần thiết
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Require các routes cần thiết
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartProduct = require("./routes/cart-product.routes");
const cartRoute = require("./routes/cart.routes");

// Sử dụng các packages
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// Sử dụng các routes cần thiết
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/product", productRoutes);
server.use("/api/add-to-cart", cartProduct);
server.use("/api/v1/cart", cartRoute);

// Lắng nghe server tại port
server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
