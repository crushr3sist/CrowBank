import { Request, Response, NextFunction } from "express";

export async function verifyTransaction(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	/**
	 * - we intercept the body data
	 * - we then make sure thier balance can afford this transaction
	 * - if not, we cause an exception
	 * - if possible, we let it go through
	 * - endpoints handle db operations
	 */
}
