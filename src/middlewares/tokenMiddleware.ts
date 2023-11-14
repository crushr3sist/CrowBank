import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { get_user } from "../users/authentication";

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token: string | undefined = req.body.token;

	if (!token) {
		return res.status(401).json({ message: "Token is missing." });
	}

	try {
		const decoded: string | JwtPayload | undefined = await get_user(token);

		(req as any).decoded = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: "Token is invalid." });
	}
}
