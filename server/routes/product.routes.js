const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM product");
        let [row] = data;
        res.json({
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
            `SELECT * FROM product WHERE product_id = ?`,
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
    try {
        let { title, price, img1, img2, img3, img4, material, color } =
            req.body;
        let data = await db.execute(
            `INSERT INTO product(title, price, img1, img2, img3, img4, material, color) VALUE(?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, price, img1, img2, img3, img4, material, color]
        );
        res.json({
            message: "Add new product",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { title, price, img1, img2, img3, img4, material, color } = req.body;
    try {
        let data = await db.execute(
            `SELECT * FROM product WHERE product_id = ?`,
            [id]
        );
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "Không tìm thấy sp để cập nhật",
            });
        } else {
            await db.execute(
                `UPDATE product SET title = ?, price = ?, img1 = ?, img2 = ?, img3 = ?, img4 = ?, material = ?, color = ? WHERE product_id = ?`,
                [
                    title || row[0].title,
                    price || row[0].price,
                    img1 || row[0].img1,
                    img2 || row[0].img2,
                    img3 || row[0].img3,
                    img4 || row[0].img4,
                    material || row[0].material,
                    color || row[0].color,
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
        await db.execute("DELETE FROM product WHERE product_id = ?", [id]);
        let data = await db.execute("SELECT * FROM product");
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

module.exports = router;
