
"use client";

import { useState, useEffect } from 'react';
import SocialIcons from '../common/social-icons';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <SocialIcons />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            &copy; {year || '...'} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
