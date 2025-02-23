import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import ayurvedaRouter from "./src/routes/ayurveda";
import discoveryRouter from "./src/routes/discovery";
import existingRouter from "./src/routes/existing";
import greetRouter from "./src/routes/greet";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ayurvedaRouter);
app.use(discoveryRouter);
app.use(existingRouter);
app.use(greetRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
