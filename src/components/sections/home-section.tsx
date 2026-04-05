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

      tl.from('.gsap-hero-text', { opacity: 0, y: 20, stagger: 0.15, delay: 0.1 })
        .from('.gsap-hero-image-wrapper', { opacity: 0, scale: 0.9, duration: 1 }, '-=0.6');

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-8 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1 -mt-4 md:mt-0">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-3 font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-foreground mb-4 gsap-hero-text">
              I am an <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0 gsap-hero-text text-sm sm:text-base leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-primary hover:bg-accent text-primary-foreground shadow-lg shadow-primary/20">
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
            <div className="relative w-40 h-40 sm:w-64 sm:h-64 lg:w-72 lg:h-72 gsap-hero-image-wrapper">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-20 blur-3xl animate-pulse" />
                
                <div className="relative w-full h-full p-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-background">
                        <Image
                            src={profileData.personalInfo.avatar}
                            alt={profileData.personalInfo.name}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}