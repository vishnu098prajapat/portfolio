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

      tl.from('.gsap-hero-text', { opacity: 0, y: 20, stagger: 0.1, delay: 0.1 })
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
      className="relative flex items-center justify-center overflow-hidden py-8 md:py-16 -mt-12 md:-mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-1 font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name.split(' ')[0]} <br />
              {profileData.personalInfo.name.split(' ')[1]}
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/90 mb-4 gsap-hero-text">
              I am an <span className="text-primary font-bold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto md:mx-0 gsap-hero-text text-base sm:text-lg leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start gsap-hero-text">
              <Button size="default" asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 text-base font-semibold">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="default" variant="outline" asChild className="border-border/60 hover:bg-muted/50 rounded-full px-8 h-12 text-base">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[380px] lg:h-[380px] gsap-hero-image-wrapper">
                {/* Smokey White Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-[60px] scale-110" />
                
                {/* White Premium Border */}
                <div className="relative w-full h-full p-1.5 rounded-full border-[6px] border-white/95 shadow-xl bg-background">
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