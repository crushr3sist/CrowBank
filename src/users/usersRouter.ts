import express from "express";
import { IAuth, IUser } from "./interfaces";
import db from "../db";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { getUserId, register } from "./register";
import {
	refreshToken,
	get_user_record,
	create_token,
	check_if_user_exists,
	verifyOTP,
} from "./authentication";
const usersRouter = express.Router();

usersRouter.post("/refresh", async (req, res) => {
	try {
		const token = await refreshToken(req.body.token);
		res.status(200).send({ access_token: token });
	} catch (error) {
		console.error("Error refreshing:", error.message);
		res.status(500).send(`Error refreshing token ${error.message}`);
	}
});

usersRouter.post("/", async (req, res) => {
	try {
		const user = await get_user_record(req.body.token);
		res.status(200).send({ user });
	} catch (error) {
		console.error("Error fetching user:", error.message);
		res.status(500).send(`Error fetching user ${error.message}`);
	}
});

usersRouter.post("/login", async (req, res) => {
	try {
		if (!(req.body as IAuth)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: incorrect data sent`);
			return;
		}
		if (!(await getUserId(req.body))) {
			console.log(req.body);
			res.status(500).send(`Error during Authentication: User Doesnt Exist`);
			return;
		} else {
			const token = await create_token(req.body);
			res.status(200).send({ access_token: token });
		}
	} catch (error) {
		console.error("Error with login:", error.message);
		res.status(500).send(`Error with login ${error.message}`);
	}
});

usersRouter.post("/register", async (req, res) => {
	try {
		if (!(req.body as IUser)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: incorrect data sent`);
			return;
		}
		if (await check_if_user_exists(req.body)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: User Already Exists`);
			return;
		} else {
			const user = await register(req.body, req.body.secret);
			console.log(user);
			await db.prisma.$disconnect();
			const token = await create_token(req.body);
			res
				.status(200)
				.send({ message: "Registration successful", access_token: token });
		}
	} catch (error) {
		console.error("Error during registration:", error.message);
		await db.prisma.$disconnect();
		res.status(500).send(`Error during registration ${error.message}`);
	}
});

usersRouter.get("/otp/mobile/generate", async (req, res) => {
	const secretKey = speakeasy.generateSecret();

	const url = speakeasy.otpauthURL({
		secret: secretKey.base32,
		label: "CrowBank",
		encoding: "base32",
		issuer: "CrowBank inc.ltd",
	});

	// @ts-ignore
	QRCode.toDataURL(url, (err, data_url) => {
		res
			.status(200)
			.send({ secretKey: secretKey.base32, otp_qr_code: data_url });
	});
});

usersRouter.get("/check", async (req, res) => {
	try {
		if (!(req.body as IAuth)) {
			console.log(req.body);
			res.status(500).send(`Error during check: incorrect data sent`);
			return;
		}
		if (!(await getUserId(req.body))) {
			console.log(req.body);
			res.status(500).send(`Error during check: wrong credidentials`);
			return;
		} else {
			res.status(200).send("user found");
		}
	} catch (error) {
		console.error("Error with login:", error.message);
		res.status(500).send(`Error with login ${error.message}`);
	}
});

usersRouter.post("/otp/mobile/verify", async (req, res) => {
	const userOTPData = req.body;
	try {
		const otpAuth = await verifyOTP(userOTPData.creds, userOTPData.otp);
		res
			.status(200)
			.send({ message: "successful authentication", access_token: otpAuth });
	} catch (e) {
		res.status(500).send("error with otp");
	}
});

export default usersRouter;
