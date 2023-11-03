import { Prisma } from "@prisma/client";
import db from "../db";
import { IUser } from "./interfaces";

namespace Register {
	export async function getUserId(user: IUser): Promise<IUser> {
		const foundUser = await db.prisma.user.findFirst({
			where: {
				username: user.username,
				email: user.email,
				password: user.password,
			},
		});
		// @ts-ignore
		return foundUser;
	}

	export async function register(user: IUser, secret: string) {
		try {
			let createdUser: IUser;
			createdUser = await db.prisma.user.create({
				data: {
					username: user.username,
					email: user.email,
					password: user.password,
					mobileOTPSecrets: {
						create: [
							{
								secret: secret,
							},
						],
					},
				},
				include: {
					mobileOTPSecrets: true,
				},
			});

			return createdUser;
		} catch (err) {
			return err;
		}
	}
}

export default Register;
