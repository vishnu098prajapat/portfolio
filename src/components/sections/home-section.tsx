
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
      className="relative flex items-center justify-center overflow-hidden py-12 md:py-24 pt-20 md:pt-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 font-headline leading-tight gsap-hero-text">
              {profileData.personalInfo.name.split(' ')[0]} <br />
              {profileData.personalInfo.name.split(' ')[1]}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/90 mb-4 gsap-hero-text">
              I am an <span className="text-primary font-bold">{profileData.personalInfo.title}</span>
            </p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto md:mx-0 gsap-hero-text text-base leading-relaxed">
              {profileData.summary}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-[#333] text-white hover:bg-[#444] rounded-full px-6 h-11 text-sm font-semibold shadow-lg">
                <Link href="#contact">
                  Hire Me <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-[#f0f0f5] border-transparent hover:bg-muted/80 text-foreground rounded-full px-6 h-11 text-sm font-semibold shadow-md">
                <Link href="#projects">
                  Explore Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[400px] lg:h-[400px] gsap-hero-image-wrapper">
                {/* Subtle outer glow */}
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-[40px] scale-105" />
                
                {/* Image Container with Thinner White Border */}
                <div className="relative w-full h-full p-1.5 rounded-full border-[6px] border-white shadow-xl bg-white overflow-hidden">
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
