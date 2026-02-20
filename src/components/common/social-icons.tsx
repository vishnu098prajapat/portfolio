"use client";

import { Button } from '@/components/ui/button';
import { Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/vishnuprajapattt/',
        icon: <Linkedin className="h-5 w-5" />,
    },
    {
        name: 'GitHub',
        url: 'https://github.com/vishnuprajapattt',
        icon: <Github className="h-5 w-5" />,
    },
    {
        name: 'Twitter',
        url: 'https://x.com/vishnuprajapattt',
        icon: <Twitter className="h-5 w-5" />,
    }
];

export default function SocialIcons() {
    return (
        <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                    <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        {social.icon}
                    </Link>
                </Button>
            ))}
        </div>
    );
}
