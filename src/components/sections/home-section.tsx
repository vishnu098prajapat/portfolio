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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          
          <div className="text-center md:text-left order-2 md:order-1 space-y-4 pt-4 md:pt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name.split(' ')[0]} <br />
              <span className="text-primary">{profileData.personalInfo.name.split(' ')[1]}</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 gsap-hero-text">
              I am an <span className="text-primary font-bold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto md:mx-0 gsap-hero-text text-sm leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start gsap-hero-text">
              <Button size="sm" asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-6 h-10 text-xs font-semibold shadow-md">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="bg-background border-border hover:bg-muted/50 hover:text-foreground text-foreground rounded-lg px-6 h-10 text-xs font-semibold shadow-sm transition-colors group">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 gsap-hero-image-wrapper">
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-[30px] scale-110" />
                <div className="relative w-full h-full p-1.5 rounded-full border-2 border-white shadow-xl bg-white/10 overflow-hidden backdrop-blur-sm">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                        <Image
                            src={profileData.personalInfo.avatar}
                            alt={profileData.personalInfo.name}
                            width={400}
                            height={400}
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
