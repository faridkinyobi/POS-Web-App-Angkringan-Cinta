// lib/prisma.ts
import { config } from "@/config";
import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (config.nodeEnv !== "production") globalThis.prisma = prisma;
if (config.nodeEnv !== "production") {
	prisma
		.$connect()
		.then(() => {
			console.log("Database connected");
		})
		.catch((err: any) => {
			console.log("Failed to connect to the database:", err);
		});
}
export { prisma };
