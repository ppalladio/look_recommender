import * as z from 'zod';
export const SignUpFormSchema = z
    .object({
        email: z.string().email(),
        username: z.string().min(3).regex(/^\w+$/, 'Username must contain only letters, numbers, and underscores'),
        password: z.string().min(6),
        // .regex(
        //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        // ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const SignUpDefaultValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export const SignInDefaultValues = {
    email: '',
    password: '',
};
