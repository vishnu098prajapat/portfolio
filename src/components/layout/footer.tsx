
"use client";

import { useState, useEffect } from 'react';
import SocialIcons from '../common/social-icons';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t py-10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <SocialIcons />
          <p className="text-[11px] sm:text-xs text-muted-foreground tracking-wide uppercase font-medium">
            &copy; {year || '...'} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
