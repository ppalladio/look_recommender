'use client';
import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUp/SignUpForm';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import Link from 'next/link';
import { Mountain, UploadIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import SignInForm from '@/components/auth/SignIn/SignInForm';

const HomePage = () => {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const isLoggedIn = false;
    const handleSignUpSuccess = () => {
        setIsSignUpOpen(false);
    };
	const handleSignInSuccess = () => {
        setIsSignInOpen(false);
    };

    return (
        <>
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Link href="#" className="mr-6 flex items-center" prefetch={false}>
                    <Mountain />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <nav className="flex-1 justify-center hidden lg:flex">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">User</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-auto mr-5">
                            {isLoggedIn ? (
                                <DropdownMenuContent>
                                    <DropdownMenuItem className=" border-gray-300 flex flex-row items-center justify-center" onClick={() => {}}>
                                        <UploadIcon size={16} className="mr-2" />
                                        <span>Upload</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem disabled>
                                            <span>Billing</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            ) : (
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => setIsSignInOpen(true)}>
                                        <span>Login</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setIsSignUpOpen(true)}>
                                        <span>Register</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
			<Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
                <DialogHeader hidden></DialogHeader>
                <DialogContent>
                    <SignInForm onSignInSuccess={handleSignInSuccess} />
                </DialogContent>
            </Dialog>
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                <DialogHeader hidden></DialogHeader>
                <DialogContent>
                    <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HomePage;
