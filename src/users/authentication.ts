import db from "../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { IAuth, IRecord } from "./interfaces";

namespace Authentication {
	export async function check_if_user_exists(user: IAuth): Promise<any>;
	export async function check_if_user_exists(user: {
		username: IAuth["username"];
	}): Promise<any>;
	export async function check_if_user_exists(user: any): Promise<any> {
		return db.prisma.user.findFirst({
			where: {
				username: user.username,
				password: user.password,
			},
		});
	}

	export const get_user = async (
		token: string,
	): Promise<string | JwtPayload | undefined> => {
		try {
			const decoded = await jwt.verify(token, process.env.ACCESS_SECRET!);
			return decoded;
		} catch (err) {
			console.log(err);
		}
	};

	export const get_user_record = async (
		token: string,
	): Promise<IRecord | undefined> => {
		try {
			const decoded = (await jwt.verify(
				token,
				process.env.ACCESS_SECRET!,
			)) as JwtPayload;
			const user = await db.prisma.user.findFirst({
				where: {
					username: decoded.username,
				},
			});
			return user || undefined;
		} catch (err) {
			console.log(err);
		}
	};

	export const createExpire = () => {
		const date = Date.now();
		const timeDiff = 60 * 60 * 24 * 30;

		const expTime = Math.floor(date / 1000) + timeDiff;
		return expTime;
	};

	export const create_token = async (
		user: IAuth,
	): Promise<string | undefined> => {
		try {
			const _user = await check_if_user_exists(user);
			return jwt.sign({ user: _user }, process.env.ACCESS_SECRET!, {
				expiresIn: createExpire(),
			});
		} catch (err) {
			return err;
		}
	};

	export const refreshToken = async (
		token: string,
	): Promise<string | undefined> => {
		try {
			const tokenDecoded = (await get_user(token)) as JwtPayload;
			if (typeof tokenDecoded === "string") {
				throw new Error("Invalid token");
			}

			const _user = await check_if_user_exists({
				username: tokenDecoded.username,
			});

			return jwt.sign({ user: _user }, process.env.ACCESS_SECRET!, {
				expiresIn: createExpire(),
			});
		} catch (err) {
			return err;
		}
	};
}

export default Authentication;
