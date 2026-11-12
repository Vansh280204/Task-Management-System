require("dotenv").config();

const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { sub: "6af05ccc8eebecb5a54bc51a" },
    process.env.JWT_SECRET,
    { expiresIn: "-1s" }
);

console.log(token);