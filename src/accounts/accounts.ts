import express from "express";

const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
	res.status(200);
});

accountRouter.post("/create", (req, res) => {
	res.status(200);
});

accountRouter.post("/fetch", (req, res) => {
	res.status(200);
});

accountRouter.delete("/cancel", (req, res) => {
	res.status(200);
});

accountRouter.post("/account/statement", (req, res) => {
	res.status(200);
});

export default accountRouter;
