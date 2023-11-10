import express from "express";
import { getBalance } from "./debit";
const debitRouter = express.Router();

debitRouter.get("/balance", (req, res) => {
	res.send(200).send({ balanceBody: getBalance(req.body.token) });
	res.status(200);
});

debitRouter.get("/transfer/internal", (req, res) => {
	res.status(200);
});

debitRouter.get("/transfer/external", (req, res) => {
	res.status(200);
});

debitRouter.get("/transfer/receive", (req, res) => {
	res.status(200);
});

debitRouter.get("/transfer/external", (req, res) => {
	res.status(200);
});

export default debitRouter;
