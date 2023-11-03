import { Prisma } from "@prisma/client";
import db from "../db";
import { IUser } from "./interfaces";
import bcrypt from "bcrypt";

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
		const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with a salt factor of 10

		try {
			let createdUser: IUser;
			createdUser = await db.prisma.user.create({
				data: {
					username: user.username,
					email: user.email,
					password: hashedPassword,
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
