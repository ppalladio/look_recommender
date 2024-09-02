'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { signIn } from '@/auth';

interface SignUpFormProps {
    onSignUpSuccess: () => void;
}

const formSchema = z
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

type FormData = z.infer<typeof formSchema>;

export function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    // Remove the unused formData state
    // const [formData, setFormData] = useState<FormData>({ ... });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        try {
            const res = await axios.post('/api/v1/signUp', data);
            console.log(res);
            if (res.status === 400 && res.data.includes('Email already exists')) {
                toast.error(`${res.data}`);
            }
            if (res.status === 200) {
                toast.success('Sign up successful');
                onSignUpSuccess();
            }
			signIn()

            console.log(res);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                    toast.error(`${error.response?.data.message}`);
                }
            }
        }
        // Add your backend submission logic here
    };

    return (
        <div className="max-w-md w-full  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Login </p>

            <form className="my-8 flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <LabelInputContainer>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" {...form.register('email')} type="email" />
                    {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...form.register('username')} type="text" />
                    {form.formState.errors.username && <p className="text-red-500">{form.formState.errors.username.message}</p>}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" {...form.register('password')} type="password" />
                    {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" {...form.register('confirmPassword')} type="password" />
                    {form.formState.errors.confirmPassword && <p className="text-red-500">{form.formState.errors.confirmPassword.message}</p>}
                </LabelInputContainer>
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

                {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};
