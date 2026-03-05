"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { profileData } from '@/lib/profile-data';

export default function HomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 } 
      });

      tl.from('.gsap-hero-text', { opacity: 0, y: 30, stagger: 0.15, delay: 0.2 })
        .from('.gsap-hero-image-wrapper', { opacity: 0, scale: 0.95, duration: 1 }, '-=0.6');

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-16 sm:py-24 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-foreground mb-6 gsap-hero-text">
              I am an <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0 gsap-hero-text text-sm sm:text-base leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-primary hover:bg-accent text-primary-foreground shadow-md hover:shadow-primary/20 transform transition-all active:scale-95">
                <Link href="#contact">
                  Contact Me <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border/50 hover:bg-muted/50">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 gsap-hero-image-wrapper">
                <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent -z-10 blur-2xl animate-pulse" />
                
                <div className="relative w-full h-full p-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20">
                    <Image
                        src={profileData.personalInfo.avatar}
                        alt={profileData.personalInfo.name}
                        width={320}
                        height={320}
                        className="object-cover w-full h-full rounded-full shadow-xl border-4 border-background"
                        priority
                        data-ai-hint="professional portrait"
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}