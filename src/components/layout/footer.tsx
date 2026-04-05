"use client";

import { useState, useEffect } from 'react';
import SocialIcons from '../common/social-icons';
import { profileData } from '@/lib/profile-data';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t py-12 text-muted-foreground mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground font-headline mb-2">{profileData.personalInfo.name}</h3>
            <p className="text-sm max-w-xs">{profileData.personalInfo.title} based in {profileData.personalInfo.location}.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <SocialIcons />
            <p className="text-xs tracking-wider uppercase font-semibold">
              &copy; {year || '...'} All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
            <p className="text-[10px] text-muted-foreground/60 italic font-medium">
                Built with Passion, React & AI
            </p>
        </div>
      </div>
    </footer>
  );
}