
"use client";

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { User } from 'lucide-react';
import Image from 'next/image';
import { profileData } from '@/lib/profile-data';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
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
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-headline gsap-about-item">
            <span className="regular-text">About </span>
            <span className="text-primary">Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center gsap-about-item">
              <div className="relative w-full max-w-[380px] aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 group bg-background transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src="/images/about.png"
                  alt="About Vishnu"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-6 gsap-about-item">
              <div className="p-1.5 bg-primary/5 rounded-full w-fit mb-2">
                 <div className="px-4 py-1.5 bg-background rounded-full text-xs font-bold text-primary flex items-center gap-2">
                    <User className="h-4 w-4" /> Vishnu Prajapat
                 </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {profileData.bio}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="bg-background border border-border/40 shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">Full Stack</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Expertise</p>
                  </CardContent>
                </Card>
                <Card className="bg-background border border-border/40 shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">AI-Powered</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Solutions</p>
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
