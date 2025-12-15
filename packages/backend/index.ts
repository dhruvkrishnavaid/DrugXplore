import bodyParser from "body-parser";
import cors from "cors";
import hpp from "hpp";
import "dotenv/config";
import express from "express";
import ayurvedaRouter from "./src/routes/ayurveda";
import discoveryRouter from "./src/routes/discovery";
import errorRouter from "./src/routes/error";
import existingRouter from "./src/routes/existing";
import greetRouter from "./src/routes/greet";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(hpp());
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ayurvedaRouter);
app.use(discoveryRouter);
app.use(existingRouter);
app.use(greetRouter);
app.use(errorRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
