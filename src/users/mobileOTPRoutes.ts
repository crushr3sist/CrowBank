import { verifyOTP } from "./authentication";
import { IAuth } from "./interfaces";
import { getUserId } from "./register";
import usersRouter from "./usersRouter";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import express, { Router } from "express";

const mobileOTP: Router = express.Router();

mobileOTP.get("/otp/mobile/generate", async (_req, res) => {
	const secretKey = speakeasy.generateSecret();

	const url = speakeasy.otpauthURL({
		secret: secretKey.base32,
		label: "CrowBank",
		encoding: "base32",
		issuer: "CrowBank inc.ltd",
	});

	// @ts-ignore
	QRCode.toDataURL(url, (_err, data_url) => {
		res
			.status(200)
			.send({ secretKey: secretKey.base32, otp_qr_code: data_url });
	});
});

mobileOTP.get("/check", async (req, res) => {
	try {
		if (!(req.body as IAuth)) {
			console.log(req.body);
			res.status(500).send(`Error during check: incorrect data sent`);
			return;
		}
		if (!(await getUserId(req.body))) {
			console.log(req.body);
			res.status(500).send(`Error during check: wrong credentials`);
			return;
		} else {
			res.status(200).send("user found");
		}
	} catch (error) {
		console.error("Error with login:", error.message);
		res.status(500).send(`Error with login ${error.message}`);
	}
});

mobileOTP.post("/otp/mobile/verify", async (req, res) => {
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

export default mobileOTP;
