"use client";

import { useState, useEffect } from 'react';
import SocialIcons from '../common/social-icons';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <SocialIcons />
          <p className="text-sm text-muted-foreground">
            &copy; {year || '...'} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
