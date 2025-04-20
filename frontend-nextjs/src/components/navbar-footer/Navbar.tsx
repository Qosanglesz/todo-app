'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  ClipboardPen,
  ListTodo,
  LogIn,
  LogOut,
  Menu
} from 'lucide-react';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface NavbarProps {
  isAuth: boolean;
}

export default function Navbar({ isAuth }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Todo', href: '/todo' },
  ];

  const handleLogout = async () => {
    setOpen(false);
    const res = await fetch(`/api/logout`);
    if (res.ok) {
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } else {
      toast.error('Failed to logout');
    }
  };

  return (
      <nav className="w-full border-b py-3 shadow-sm bg-background text-foreground">
        <div className="px-32 mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <ListTodo />
            TodoApp
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 items-center">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                        pathname === link.href
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {link.name}
                </Link>
            ))}

            <ModeToggle />

            {isAuthenticated ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <LogOut />
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out of your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            ) : (
                <>
                  <Link href="/signup">
                    <Button variant="ghost"><ClipboardPen />Sign up</Button>
                  </Link>
                  <Link href="/signin">
                    <Button><LogIn />Sign in</Button>
                  </Link>
                </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                      <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`text-sm font-medium ${
                              pathname === link.href
                                  ? 'text-primary'
                                  : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {link.name}
                      </Link>
                  ))}

                  <div className="mt-4 flex flex-col gap-2">
                    {isAuthenticated ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Logout
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You will be logged out of your account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleLogout}>
                                Logout
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <>
                          <Link href="/signup" onClick={() => setOpen(false)}>
                            <Button variant="ghost" className="w-full">
                              Sign up
                            </Button>
                          </Link>
                          <Link href="/signin" onClick={() => setOpen(false)}>
                            <Button className="w-full">Sign in</Button>
                          </Link>
                        </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
  );
}