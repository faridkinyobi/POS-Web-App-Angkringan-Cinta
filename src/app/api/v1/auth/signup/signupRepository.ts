import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createUser = async (data: Prisma.UserCreateInput) => {
	return await prisma.user.create({
		data,
	});
};
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email },
	});
};
