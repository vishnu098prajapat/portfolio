
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SocialIcons from '../common/social-icons';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinksComponent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md"
          onClick={onItemClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/40 backdrop-blur-md border-b border-white/10 h-14' : 'bg-transparent h-16'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="#home" className="flex items-center gap-1.5 group">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-110"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <path
                d="M16 3.5L29.5 22.5L23.5 28.5L16 16.5L8.5 28.5L2.5 22.5L16 3.5Z"
                stroke="url(#logo-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-bold text-foreground font-headline tracking-tight">Vishnu</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop and Mobile use the same Hamburger now */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full">
                  <Menu className="h-5 w-5 text-foreground" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-xl border-l border-white/10 p-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col space-y-6 pt-8">
                    <Link href="#home" className="flex items-center gap-2 mb-4" onClick={() => setMobileMenuOpen(false)}>
                        <span className="text-xl font-bold text-primary font-headline">Portfolio</span>
                    </Link>
                    <nav className="flex flex-col space-y-2">
                      <NavLinksComponent onItemClick={() => setMobileMenuOpen(false)} />
                    </nav>
                    <div className='pt-6 border-t border-white/5'>
                      <SocialIcons />
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
