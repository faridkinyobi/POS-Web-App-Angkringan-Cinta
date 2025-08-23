import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email },
	});
};
export const getUser = async () => {
	return await prisma.user.findMany();
};

export const creatRefrasetoken = async (data: Prisma.SessionCreateInput) => {
	return await prisma.session.create({ data });
};
