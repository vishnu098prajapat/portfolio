"use client";

import { Button } from '@/components/ui/button';
import { Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import { profileData } from '@/lib/profile-data';

const socialLinks = [
    {
        name: 'LinkedIn',
        url: profileData.personalInfo.linkedin,
        icon: <Linkedin className="h-5 w-5" />,
    },
    {
        name: 'GitHub',
        url: profileData.personalInfo.github,
        icon: <Github className="h-5 w-5" />,
    }
];

export default function SocialIcons() {
    return (
        <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="hover:text-primary hover:bg-primary/5 transition-all">
                    <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        {social.icon}
                    </Link>
                </Button>
            ))}
        </div>
    );
}