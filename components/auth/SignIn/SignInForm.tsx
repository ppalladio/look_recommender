'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { BottomGradient, LabelInputContainer } from '../auth.style';
import { SignInDefaultValues, SignInFormSchema } from '../auth.config';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
type formData = z.infer<typeof SignInFormSchema>;
interface SignInFormProps {
    onSignInSuccess: () => void;
}
const SignInForm = ({ onSignInSuccess }: SignInFormProps) => {
    const form = useForm<formData>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: SignInDefaultValues,
    });

    const onSubmit = async (formData: formData) => { 
        try {
            const res = await axios.post('/api/auth/signIn', formData);
            if (res.status === 200) {
                toast.success('Sign in successful');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
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
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" {...form.register('password')} type="password" />
                    {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
                </LabelInputContainer>
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign In &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
};
export default SignInForm;
