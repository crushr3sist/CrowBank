import * as dontenv from "dotenv";
import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import usersRouter from "./users/usersRouter";
import compression from "compression";
import { constants } from "zlib";
import * as zlib from "zlib";
import accountRouter from "./accounts/acountsRouter";
import creditRouter from "./accounts/credit/creditRouter";
import debitRouter from "./accounts/debit/debitRouter";
import incidentsRouter from "./accounts/incidences/incidentRouter";
import dashboardRouter from "./accounts/mainInterface/dashboardRouter";
import mobileOTP from "./users/mobileOTPRoutes";

dontenv.config();

const PORT = 8000;
const app: Express = express();

app.use(
	helmet({
		contentSecurityPolicy: false,
	}),
);

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/incidents", incidentsRouter);
app.use("/dashboard", dashboardRouter);
app.use("/accounts", accountRouter);
app.use("/users", usersRouter, mobileOTP);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
