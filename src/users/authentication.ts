import db from "../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { IAuth, IRecord } from "./interfaces";
import bcrypt from "bcrypt"; // Import bcrypt
import speakeasy from "speakeasy";
export async function check_if_user_exists(user: IAuth): Promise<any> {
	const foundUser = await db.prisma.user.findFirst({
		where: {
			email: user.email,
		},
	});

	if (foundUser) {
		const passwordMatches = await bcrypt.compare(
			user.password,
			foundUser.password,
		); // Compare hashed passwords
		return passwordMatches ? foundUser : null;
	}

	return null;
}

export const verifyOTP = async (user: IAuth, userOTPEntry: string) => {
	try {
		// Find the user by their email
		const userRecord = await db.prisma.user.findFirst({
			where: {
				email: user.email,
			},
		});
		console.log(userRecord);

		if (!userRecord) {
			throw new Error("User not found");
		}

		// Find the corresponding mobile OTP secret
		const mobileOTPSecret = await db.prisma.mobileOTPSecret.findFirst({
			where: {
				userId: userRecord.id,
			},
		});
		console.log(mobileOTPSecret);

		if (!mobileOTPSecret) {
			throw new Error("Mobile OTP secret not found");
		}
		console.log(userOTPEntry);

		// Verify the OTP
		const verified = speakeasy.totp.verify({
			secret: mobileOTPSecret.secret,
			encoding: "base32",
			token: userOTPEntry,
		});

		if (verified) {
			return create_token(user);
		} else {
			throw new Error("OTP verification failed");
		}
	} catch (error) {
		return error.message;
	}
};

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
		if (_user) {
			return jwt.sign({ user: _user }, process.env.ACCESS_SECRET!, {
				expiresIn: createExpire(),
			});
		} else {
			throw new Error("Invalid credentials");
		}
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
			email: tokenDecoded.email,
			password: tokenDecoded.password, // Include password to verify
		});

		if (_user) {
			return jwt.sign({ user: _user }, process.env.ACCESS_SECRET!, {
				expiresIn: createExpire(),
			});
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		return err;
	}
};
