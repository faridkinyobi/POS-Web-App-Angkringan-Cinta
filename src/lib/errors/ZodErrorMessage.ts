interface ZodErrorDetail {
	message: string;
	[key: string]: any;
}
export const joiClearMessage = (err: any): string => {
	if (err && Array.isArray(err)) {
		const message = err
			.map((detail: ZodErrorDetail) => detail.message)
			.join(", ");
		return message;
	}

	return "Validation error";
};

export const joiGeneralMessage = {
	"string.base": "The {#label} value must be of type text.",
	"string.empty": "{#label} cannot be empty.",
	"string.email": "The email format in {#label} is invalid.",
	"any.required": "{#label} is required.",
	"string.min": "{#label} must be at least {#limit} characters long.",
	"any.only": "type must be one of {#valids}",
	"boolean.base": "The value of {#label} must be a boolean.",
	"number.min": "{#label} harus minimal {#limit}",
	"number.base": "The value of {#label} must be a number type.",
};
