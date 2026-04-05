
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

      tl.from('.gsap-hero-text', { opacity: 0, y: 15, stagger: 0.1, delay: 0.1 })
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
      className="relative flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          <div className="text-center md:text-left order-2 md:order-1 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name.split(' ')[0]} <br />
              <span className="text-primary">{profileData.personalInfo.name.split(' ')[1]}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 gsap-hero-text">
              I am an <span className="text-primary font-bold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto md:mx-0 gsap-hero-text text-sm sm:text-base leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-foreground text-background hover:bg-foreground/80 rounded-md px-8 shadow-md">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-background border-border hover:bg-muted/30 hover:text-primary text-foreground rounded-md px-8 shadow-sm transition-colors group">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 gsap-hero-image-wrapper">
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-[40px] scale-125" />
                <div className="relative w-full h-full p-1.5 rounded-full border border-white/40 shadow-2xl bg-white/5 overflow-hidden backdrop-blur-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                        <Image
                            src={profileData.personalInfo.avatar}
                            alt={profileData.personalInfo.name}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full object-top"
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
