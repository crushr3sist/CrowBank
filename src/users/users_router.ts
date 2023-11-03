import express from "express";
import Authentication from "./authentication";
import Register from "./register";
import { IAuth, IUser } from "./interfaces";
import db from "../db";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
const users_router = express.Router();

users_router.post("/refresh", async (req, res) => {
	try {
		const token = await Authentication.refreshToken(req.body.token);
		res.status(200).send({ access_token: token });
	} catch (error) {
		console.error("Error refreshing:", error.message);
		res.status(500).send(`Error refreshing token ${error.message}`);
	}
});

users_router.post("/", async (req, res) => {
	try {
		const user = await Authentication.get_user_record(req.body.token);
		res.status(200).send({ user });
	} catch (error) {
		console.error("Error fetching user:", error.message);
		res.status(500).send(`Error fetching user ${error.message}`);
	}
});

users_router.post("/login", async (req, res) => {
	try {
		if (!(req.body as IAuth)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: incorrect data sent`);
			return;
		}
		if (!(await Register.getUserId(req.body))) {
			console.log(req.body);
			res.status(500).send(`Error during Authentication: User Doesnt Exist`);
			return;
		} else {
			const token = await Authentication.create_token(req.body);
			res.status(200).send({ access_token: token });
		}
	} catch (error) {
		console.error("Error with login:", error.message);
		res.status(500).send(`Error with login ${error.message}`);
	}
});

users_router.post("/register", async (req, res) => {
	try {
		if (!(req.body as IUser)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: incorrect data sent`);
			return;
		}
		if (await Authentication.check_if_user_exists(req.body)) {
			console.log(req.body);
			res.status(500).send(`Error during registration: User Already Exists`);
			return;
		} else {
			const secret = speakeasy.generateSecret();
			const user = await Register.register(req.body, secret.base32);
			console.log(user);
			await db.prisma.$disconnect();
			const token = await Authentication.create_token(req.body);
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

users_router.get("/otp/mobile/generate", async (req, res) => {
	const secretKey = speakeasy.generateSecret();
	// @ts-expect-error
	QRCode.toDataURL(secretKey.otpauth_url, (err, data_url) => {
		console.log(data_url);
		res.status(200).send({ secretKey, otp_qr_code: data_url });
	});
});

users_router.get("/otp/mobile/verify", async (req, res) => {
	// @ts-expect-error
	QRCode.toDataURL(secretKey.otpauth_url, (err, data_url) => {
		console.log(data_url);
		res.status(200).send({ otp_qr_code: data_url });
	});
});

export default users_router;
