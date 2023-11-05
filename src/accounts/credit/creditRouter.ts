import express from "express";

const creditRouter = express.Router();

creditRouter.get("/", (req, res) => {
	res.status(200);
});

creditRouter.get("/spend", (req, res) => {
	res.status(200);
});

creditRouter.get("/transfer/internal", (req, res) => {
	res.status(200);
});

creditRouter.get("/transfer/external", (req, res) => {
	res.status(200);
});

export default creditRouter;
