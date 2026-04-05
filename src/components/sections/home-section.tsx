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
      className="relative flex items-center justify-center overflow-hidden py-12 md:py-20 -mt-8 md:-mt-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold text-foreground mb-2 font-headline leading-[0.9] gsap-hero-text">
              {profileData.personalInfo.name.split(' ')[0]} <br />
              {profileData.personalInfo.name.split(' ')[1]}
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-6 gsap-hero-text">
              I am an <span className="text-primary font-bold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0 gsap-hero-text text-lg sm:text-xl leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-10 h-14 text-lg">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-border/60 hover:bg-muted/50 rounded-full px-10 h-14 text-lg">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] gsap-hero-image-wrapper">
                {/* Smokey White Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-[80px] scale-110" />
                
                {/* White Premium Border */}
                <div className="relative w-full h-full p-2 rounded-full border-[10px] border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-background">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                        <Image
                            src={profileData.personalInfo.avatar}
                            alt={profileData.personalInfo.name}
                            width={600}
                            height={600}
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
