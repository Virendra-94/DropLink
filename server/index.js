import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import DBConnection from "./database/db.js";

const app = express();

// Use CORS and specify the frontend origin
app.use(cors({
  origin: ["https://droplink-u09w.onrender.com"],
  methods: ["POST", "GET"],
  credentials: true
}
));

app.use("/", router);

const PORT = 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
