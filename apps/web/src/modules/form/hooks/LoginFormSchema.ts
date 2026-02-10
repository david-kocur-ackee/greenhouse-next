import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, 'Password must be at least 5 characters long').refine((password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }, {
        message: 'Must contain at least one uppercase letter, lowercase letter, number and special character',
    }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;