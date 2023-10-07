import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://localhost:3000",
            "http://localhost:4000",
            "https://localhost:4000"
        ],
        methods: "GET,POST"
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} -> http://localhost:${PORT}`);
});
