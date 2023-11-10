import express from "express";
import { Router, Request, Response } from "express";

import { verifyToken } from "../middlewares/tokenMiddleware";
import { JwtPayload } from "jsonwebtoken";

const accountRouter: Router = express.Router();

accountRouter.use(verifyToken);

accountRouter.get("/", (req: Request, res: Response) => {
	const decoded: JwtPayload = (req as any).decoded;

	res.status(200).send(decoded);
});

accountRouter.post("/create", (req, res) => {
	const token = req.body.token;
	res.status(200).sendStatus(200);
});

accountRouter.post("/fetch", (req, res) => {
	const token = req.body.token;

	res.status(200).sendStatus(200);
});

accountRouter.delete("/cancel", (req, res) => {
	const token = req.body.token;

	res.status(200).sendStatus(200);
});

accountRouter.post("/account/statement", (req, res) => {
	const token = req.body.token;

	res.status(200).sendStatus(200);
});

export default accountRouter;
