import { z } from "zod";
export const AuthSchema = z.object({
	email: z
		.email("Email must be a valid email address")
		.nonempty("Email cannot be empty")
		.min(5, "Email minimum 5 characters")
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Email must be in standard format"
		),
	password: z
		.string()
		.nonempty("Password cannot be empty")
		.min(6, "Password minimum 6 characters")
		.max(100, "Email maximum 100 characters"),
});

export const RegisterSchema = AuthSchema.extend({
	name: z.string().nonempty("Name cannot be empty"),
	role: z
		.string()
		.nonempty("role cannot be empty")
		.uppercase("Role must be uppercase"),
	confirmPassword: z.string().nonempty("confirm password cannot be empty"),
}).refine((data) => data.password === data.confirmPassword, {
	path: ["confirmPassword"],
	message: "Password and confirmation do not match",
});

// type checking
export type IzLoginInput = z.infer<typeof AuthSchema>;
export type IzRegisterInput = z.infer<typeof RegisterSchema>;
