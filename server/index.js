const Express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");

const userRoutes = require("./routes/userRoute");

const { notFound, errorHandler } = require("./middleware/error");

dotenv.config();
connectDB();

const app = Express();

app.use(Express.json()); // to accept JSON data

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(5000, console.log("Running on port " + PORT.yellow.bold));
