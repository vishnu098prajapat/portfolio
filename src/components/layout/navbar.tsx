
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { profileData } from '@/lib/profile-data';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full h-14 bg-transparent pointer-events-none">
      <div className="container mx-auto px-6 h-full pointer-events-auto">
        <div className="flex items-center justify-between h-full">
          <Link href="#home" className="flex items-center gap-1.5 group">
            <svg
              width="16"
              height="16"
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
            <span className="text-sm font-black text-white font-headline tracking-tighter mix-blend-difference uppercase">VISHNU</span>
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Social Icons always visible next to menu */}
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" asChild className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                <Link href={profileData.personalInfo.github} target="_blank"><Github className="h-3.5 w-3.5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                <Link href={profileData.personalInfo.linkedin} target="_blank"><Linkedin className="h-3.5 w-3.5" /></Link>
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full h-7 w-7">
                  <Menu className="h-3.5 w-3.5 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] bg-background/95 backdrop-blur-2xl border-l border-white/10 p-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col space-y-6 pt-10">
                    <nav className="flex flex-col space-y-1">
                      {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <Link
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-white/5 uppercase tracking-widest"
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
