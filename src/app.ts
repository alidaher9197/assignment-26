import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import generalRoutes from "./routes/general_routes.js";
import userRoutes from "./routes/user_routes.js";
import todoRoutes from "./routes/todo_routes.js";
import path from "node:path";
dotenv.config();
const PORT = process.env.PORT || 3000;
console.log(`PORT = ${PORT}`);
const app = express();
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


app.use("/generals", generalRoutes);
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);  



