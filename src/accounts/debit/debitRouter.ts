import express from "express";

const debitRouter = express.Router();

debitRouter.get("/", (req, res) => {
	res.status(200);
});

export default debitRouter;
