const db = require("../utils/database");

module.exports.findAll = () => {
    return db.execute("SELECT * FROM users");
};

module.exports.findOne = (id) => {
    return db.execute("SELECT * FROM users WHERE users_id = ?", [id]);
};

module.exports.findOneByEmail = (email) => {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
};

module.exports.create = (name, email, password) => {
    return db.execute(
        "INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
        [name, email, password]
    );
};

module.exports.remove = (id) => {
    return db.execute("DELETE FROM users WHERE users_id = ?", [id]);
};
