const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

const logRoutes = require("./routes/logRoutes");

// เดี๋ยวค่อยมากำหนดให้ API ใช้ได้แค่กับโดเมนที่เราต้องการ
app.use(cors());
app.use(express.json());

// route
app.use("/api/logs", logRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
