'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ListTodo, Menu, X } from 'lucide-react';
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
      setIsAuthenticated(success);
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
        <div className="px-6 md:px-32 mx-auto flex justify-between items-center">
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

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
              <div className="bg-background w-[250px] h-full p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X />
                  </Button>
                </div>
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
                <div className="mt-auto flex flex-col gap-2">
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
            </div>
        )}
      </nav>
  );
}
