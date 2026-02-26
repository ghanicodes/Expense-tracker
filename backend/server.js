require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require("./routes/incomeRoutes");
const cookieParser = require("cookie-parser");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// app.use(
//   cors({
//     origin: process.env.VITE_BACKEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );



const allowedOrigin = process.env.CLIENT_URL;

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


app.use(cookieParser());
app.use(express.json());

connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes); 
app.use("/api/v1/income", incomeRoutes); 
app.use("/api/v1/dashboard", dashboardRoutes); 


const PORT = process.env.PORT || 5000;
app.get('/', (req, res)=>{
    res.send("Hello Express")
})

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}
module.exports = app