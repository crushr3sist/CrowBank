import express from "express";

const debitRouter = express.Router();

debitRouter.get("/", (req, res) => {
	res.status(200);
});

debitRouter.get("/spend", (req, res) => {
	res.status(200);
});

debitRouter.get("/transfer/internal", (req, res) => {
	res.status(200);
});

debitRouter.get("/transfer/external", (req, res) => {
	res.status(200);
});

export default debitRouter;
