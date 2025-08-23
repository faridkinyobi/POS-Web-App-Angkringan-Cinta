import jwt from "jsonwebtoken";

import { type AuthPayload } from "@/types";
import { config } from "@/config";

export const generateAccessToken = (payload: AuthPayload) => {
	return jwt.sign(payload, config.jwtAccessTokenSecret as jwt.Secret, {
		expiresIn: "15m", //1d
	});
};

export const generateRefreshToken = (payload: AuthPayload) => {
	return jwt.sign(payload, config.jwtRefreshAccessTokenSecret as jwt.Secret, {
		expiresIn: "7d", //7d
	});
};
export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, config.jwtAccessTokenSecret as jwt.Secret);
};

export const verifyRefraseToken = (token: string) => {
	return jwt.verify(token, config.jwtRefreshAccessTokenSecret as jwt.Secret);
};
