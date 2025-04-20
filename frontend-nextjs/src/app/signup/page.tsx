'use client';

import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {signUp} from "@/app/signup/actions";
import {useRouter} from 'next/navigation'
import {toast} from "sonner";

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(1, 'Username is required')
            .max(50, 'Username must be less than 50 characters'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(/[A-Z]/, 'Must contain an uppercase letter')
            .regex(/[a-z]/, 'Must contain a lowercase letter')
            .regex(/[0-9]/, 'Must contain a number')
            .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpFormData) => {
        const {username, password} = data;
        try {
            const result = await signUp({username, password});
            if (result.success) {
                toast.success('Sign up successful');
                router.push('/signin')
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            <div className="mx-auto max-w-md space-y-6 w-full">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="text-muted-foreground">Enter your information to get started</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>Fill in the form below to create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" {...register('username')} placeholder="johndoe"/>
                                {errors.username && (
                                    <p className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register('password')} />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Create Account
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                href="/signin"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
