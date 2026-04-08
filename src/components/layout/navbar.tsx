
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

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

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/20 backdrop-blur-sm h-12 border-b border-white/5' : 'bg-transparent h-14'
      )}
    >
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="#home" className="flex items-center gap-2 group">
            <svg
              width="20"
              height="20"
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
            <span className="text-base font-bold text-foreground font-headline tracking-tighter">VISHNU</span>
          </Link>

          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/5 rounded-full h-8 w-8">
                  <Menu className="h-4 w-4 text-foreground" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px] bg-background/95 backdrop-blur-2xl border-l border-white/10 p-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col space-y-6 pt-10">
                    <nav className="flex flex-col space-y-1">
                      {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <Link
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-white/5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
