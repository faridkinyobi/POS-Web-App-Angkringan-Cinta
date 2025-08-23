import { ZodType } from "zod";
import { AppError } from "./handler-error";
import { ERROR_CODE } from "@/types";
import { joiClearMessage } from "./ZodErrorMessage";

export const validateRequest = async <T>(
	schema: ZodType<T>,
	input: unknown
): Promise<T> => {
	const result = await schema.safeParseAsync(input);

	if (!result.success) {
		const message = joiClearMessage(result.error.issues);
		throw new AppError(ERROR_CODE.BAD_REQUEST.code, message);
	}

	return result.data;
};
