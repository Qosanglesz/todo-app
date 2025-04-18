'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ListTodo, Menu } from 'lucide-react';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { toast } from 'sonner';

interface NavbarProps {
  isAuthAction: () => Promise<{ success: boolean; message: string }>;
}

export default function Navbar({ isAuthAction }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Todo', href: '/todo' },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { success } = await isAuthAction();
      if (success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [isAuthAction]);

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
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="ghost">Sign up</Button>
              </Link>
              <Link href="/signin">
                <Button>Sign in</Button>
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
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
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
