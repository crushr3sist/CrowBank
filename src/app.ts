import * as dontenv from "dotenv";
import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import users_router from "./users/users_router";
import * as path from "path";
dontenv.config();

const PORT = 8000;

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", users_router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
