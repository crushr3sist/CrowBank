import express from "express";

const incidentsRouter = express.Router();
incidentsRouter.get("/", (req, res) => {
	res.status(200);
});
export default incidentsRouter;
