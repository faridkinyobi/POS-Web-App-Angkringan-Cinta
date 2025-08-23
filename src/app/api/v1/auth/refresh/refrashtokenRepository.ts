import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const creatRefrashtoken = async (data: Prisma.SessionCreateInput) => {
	return await prisma.session.create({ data });
};
export const getbyOldRefreshtoken = async (oldRefreshtoken: string) => {
	return await prisma.session.findUnique({
		where: {
			token: oldRefreshtoken,
		},
	});
};
export const updateRefreshtoken = async (oldRefreshtoken: string) => {
	return await prisma.session.update({
		where: {
			token: oldRefreshtoken,
		},
		data: { isRevoked: true },
	});
};
export const deleteRefreshtoken = async (oldRefreshtoken: string) => {
	return await prisma.session.delete({
		where: {
			token: oldRefreshtoken,
		},
	});
};
