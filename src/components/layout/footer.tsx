import React from 'react';
import { profileData } from '@/lib/profile-data';

export default function Footer() {
  return (
    <footer className="py-6 mt-auto border-t bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {profileData.personalInfo.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
