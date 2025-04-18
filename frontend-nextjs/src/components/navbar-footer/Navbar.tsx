'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ListTodo } from 'lucide-react';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { toast } from 'sonner';

interface NavbarProps {
  isAuthAction: () => Promise<{ success: boolean; message: string }>;
}

export default function Navbar({ isAuthAction }: NavbarProps) {
  const pathname = usePathname();
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

          {/* Desktop Nav only */}
          <div className="flex gap-4 items-center">
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
        </div>
      </nav>
  );
}
