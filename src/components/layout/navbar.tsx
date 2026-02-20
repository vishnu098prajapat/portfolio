'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Profile' },
    { href: '/resume-generator', label: 'AI Resume Generator' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="hidden font-headline text-lg font-bold sm:inline-block">
            AceFolio
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
