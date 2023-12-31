const bcrypt = require("bcrypt");
const usersService = require("./users.service");
const jwt = require("jsonwebtoken");

module.exports.signup = (name, email, password) => {
    console.log(name, email, password);
    // Mã hoá mật khẩu
    // chuẩn mã hoá MD5 (ngày xưa)
    // bcrypt chuẩn SHA 256
    let salt = bcrypt.genSaltSync(10);

    let hashPassword = bcrypt.hashSync(password, salt);

    return usersService.create(name, email, hashPassword);
};

module.exports.signin = async (email, password) => {
    console.log(email, password);
    try {
        let findUser = await usersService.findOneByEmail(email);
        let [rows] = findUser;
        if (rows.length === 0) {
            return {
                status: 404,
                message: "User not found",
            };
        } else {
            // Lấy ra bản ghi user đã tìm thấy
            let hashPassword = rows[0].password;

            // So sánh MK mã hoá và MK được gửi lên
            let compare = bcrypt.compareSync(password, hashPassword);

            if (!compare) {
                return {
                    status: 404,
                    message: "Password is incorrect",
                };
            } else {
                let access_token = jwt.sign(
                    { data: { id: rows[0].id, email: rows[0].email } },
                    process.env.TOKEN_SECRET
                    // { expiresIn: 1200 }
                );
                return {
                    status: 200,
                    info: {
                        name: rows[0].name,
                        access_token,
                        role: rows[0].role,  
                        users_id: rows[0].users_id,
                    },
                    message: "Sign in successfully",
                };
            }
        }
    } catch (error) {
        return error;
    }
};
