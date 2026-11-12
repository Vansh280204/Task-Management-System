const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const testRoutes = require("./routes/testRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello");
});

app.use("/api/users", userRoutes);

app.use("/api/users", authRoutes);

app.use("/api/v1/test", testRoutes);

const start = async () => {
    await connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}/`);
});
};
start();