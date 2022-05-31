import express from "express";
import { routes } from "./routes";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(routes)

app.listen(3333, () => {
  console.log("listening on port  3333");
});
