"use client";

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { User } from 'lucide-react';
import Image from 'next/image';
import { profileData } from '@/lib/profile-data';

gsap.registerPlugin(ScrollTrigger);

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
    <section id="about" ref={sectionRef} className="py-20 sm:py-28 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-headline gsap-about-item">
            <span className="regular-text">About </span>
            <span className="text-primary">Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Column */}
            <div className="relative flex justify-center gsap-about-item">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden shadow-xl border border-white group bg-background transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src={profileData.personalInfo.aboutAvatar || profileData.personalInfo.avatar}
                  alt="About Vishnu"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-5 gsap-about-item">
              <div className="p-1 bg-primary/5 rounded-full w-fit mb-1">
                 <div className="px-3 py-1 bg-background rounded-full text-[10px] font-bold text-primary flex items-center gap-2">
                    <User className="h-3 w-3" /> Vishnu Prajapat
                 </div>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {profileData.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-background border border-border/40 shadow-sm rounded-lg overflow-hidden group hover:shadow-md transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-lg font-bold text-primary mb-0.5">Full Stack</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">Expertise</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border border-border/40 shadow-sm rounded-lg overflow-hidden group hover:shadow-md transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-lg font-bold text-primary mb-0.5">AI-Powered</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">Solutions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}