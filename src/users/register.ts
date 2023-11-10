import db from "../db";
import { IUser } from "./interfaces";
import bcrypt from "bcrypt";

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
	const hashedPassword = await bcrypt.hash(user.password, 10);

	try {
		let createdUser: IUser;
		createdUser = await db.prisma.user.create({
			data: {
				username: user.username,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				password: hashedPassword,
				address: user.address,
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
