// Install bcryptjs first: npm install bcryptjs
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

(async () => {
    const password = "admin"; // Your requested password
    const hashed = await hashPassword(password);
    console.log("Original Password:", password);
    console.log("Hashed Password:", hashed);
})();
