
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Briefcase, Code, Download, User } from 'lucide-react';
import Image from 'next/image';
import { profileData } from '@/lib/profile-data';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Briefcase, value: '10+', label: 'Projects Done' },
    { icon: Code, value: 'Full Stack', label: 'Development' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      
      gsap.from('.gsap-about-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-headline gsap-about-item">
            <span className="regular-text">About </span>
            <span className="text-primary">Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative flex justify-center gsap-about-item">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-background group">
                <Image
                  src={profileData.personalInfo.avatar}
                  alt="About Vishnu"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6 gsap-about-item">
              <div className="p-1 bg-primary/10 rounded-full w-fit mb-2">
                 <div className="px-3 py-1 bg-background rounded-full text-xs font-bold text-primary flex items-center gap-2">
                    <User className="h-3.5 w-3.5" /> Vishnu Prajapat
                 </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {profileData.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-background/50 border-none shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-6">
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 text-sm font-semibold shadow-lg transition-all hover:-translate-y-1">
                  <a href={profileData.personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download CV <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
