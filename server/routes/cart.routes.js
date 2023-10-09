const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM cart");
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
            `SELECT users_id  FROM cart WHERE users_id = ?`,
            [id]
        );
        let row = data[0];
        return res.json(row[0]);
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.get("/cart/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await db.execute(
            `SELECT cart_id  FROM cart WHERE users_id = ?`,
            [id]
        );
        let row = data[0];
        return res.json(row);
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        let { users_id } = req.body;
        let data = await db.execute(`INSERT INTO cart (users_id) VALUE(?)`, [
            users_id,
        ]);
        res.json({
            message: "Add new product",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM cart WHERE cart_id = ?", [id]);
        let data = await db.execute("SELECT * FROM cart");
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

// const express = require("express");
// const router = express.Router();
// const db = require("../utils/database");

// router.get("/", async (req, res) => {
//     try {
//         const data = await db.execute("SELECT * FROM cart");
//         res.json(data[0]); // Trả về danh sách tất cả sản phẩm trong giỏ hàng
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const data = await db.execute(`SELECT * FROM cart WHERE users_id = ?`, [
//             id,
//         ]);
//         res.json(data[0][0]); // Trả về thông tin giỏ hàng của người dùng cụ thể
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// router.get("/cart/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const data = await db.execute(
//             `SELECT cart_id FROM cart WHERE users_id = ?`,
//             [id]
//         );
//         res.json(data[0][0]); // Trả về cart_id của người dùng cụ thể
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         const { users_id } = req.body;
//         await db.execute(`INSERT INTO cart (users_id) VALUES (?)`, [users_id]);
//         res.json({ message: "Add new cart successfully." });
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// router.delete("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         await db.execute("DELETE FROM cart WHERE cart_id = ?", [id]);
//         res.json({ message: "Deleted cart successfully." });
//     } catch (error) {
//         res.status(500).json({ error: "An error occurred." });
//     }
// });

// module.exports = router;
