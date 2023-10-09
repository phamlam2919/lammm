const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM cart_product");
        let [row] = data;
        let carts = await db.execute(
            "SELECT * FROM cart_product as c join product as p on c.id_product = p.product_id"
        );
        let [cartlist] = carts;
        res.json({
            cart: cartlist,
            product: row,
        });
    } catch (error) {
        res.json({
            message: "Get all product",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await db.execute(
            `SELECT * FROM cart_product WHERE cart_product_id = ?`,
            [id]
        );
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            res.json(row[0]);
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.post("/", async (req, res) => {
    const { id_cart, id_product, quantity } = req.body;

    const addToCartQuery =
        "INSERT INTO cart_product (id_cart, id_product, quantity ) VALUES (?, ?, ?)";
    try {
        await db.execute(addToCartQuery, [id_cart, id_product, quantity]);
        console.log(id_cart, id_product, quantity);
        res.status(201).json({ message: "Item added to cart" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    const { id_cart, id_product, quantity } = req.body;
    try {
        let data = await db.execute(
            `SELECT * FROM cart_product WHERE cart_product_id = ?`,
            [id]
        );
        let row = data[0];
        console.log(row);
        if (row.length === 0) {
            res.json({
                message: "Không tìm thấy sp để cập nhật",
            });
        } else {
            await db.execute(
                `UPDATE cart_product SET id_cart = ?, id_product = ?, quantity = ? WHERE cart_product_id = ?`,
                [
                    id_cart || row[0].id_cart,
                    id_product || row[0].id_product,
                    quantity || row[0].quantity,
                    id,
                ]
            );

            res.json({
                message: "Cập nhật thành công",
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM cart_product WHERE cart_product_id = ?", [
            id,
        ]);
        let data = await db.execute("SELECT * FROM cart_product");
        res.json({
            message: "Đã delete thành công",
            user: data[0],
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.get("/addcart", async (req, res) => {
    try {
        let data = await db.execute(
            "SELECT * FROM cart_product as c join product as p on c.id_product = p.product_id"
        );
        let [row] = data;
        res.json({
            product: row,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
});
module.exports = router;
