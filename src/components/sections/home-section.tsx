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

      tl.from('.gsap-hero-text', { opacity: 0, y: 30, stagger: 0.15, delay: 0.1 })
        .from('.gsap-hero-image-wrapper', { opacity: 0, scale: 0.85, duration: 1 }, '-=0.6');

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-8 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1 -mt-4 md:mt-0">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-foreground mb-4 font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-foreground mb-6 gsap-hero-text">
              I am an <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0 gsap-hero-text text-base sm:text-lg leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-primary hover:bg-accent text-primary-foreground shadow-xl shadow-primary/25 rounded-full px-8">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border/60 hover:bg-muted/50 rounded-full px-8">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 gsap-hero-image-wrapper">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-25 blur-[100px] animate-pulse" />
                
                <div className="relative w-full h-full p-1.5 rounded-full bg-gradient-to-r from-primary via-accent to-secondary shadow-[0_0_50px_rgba(0,0,0,0.15)]">
                    <div className="w-full h-full rounded-full overflow-hidden border-8 border-background bg-muted">
                        <Image
                            src={profileData.personalInfo.avatar}
                            alt={profileData.personalInfo.name}
                            width={500}
                            height={500}
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