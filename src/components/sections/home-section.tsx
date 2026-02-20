
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function HomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 } 
      });

      tl.from('.gsap-hero-text', { opacity: 0, y: 50, stagger: 0.2, delay: 0.2 })
        .from('.gsap-hero-image-wrapper', { opacity: 0, scale: 0.9, duration: 1 }, '-=0.8');

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden py-20 sm:py-24 md:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-headline leading-tight gsap-hero-text">
              Vishnu Prajapat
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-foreground mb-6 gsap-hero-text">
              I am an <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Full Stack Developer</span>
            </p>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0 gsap-hero-text">
              Experienced in building complete web applications, from frontend to backend and database, often enhanced with AI to improve speed and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start gsap-hero-text">
              <Button size="lg" asChild className="bg-primary hover:bg-accent text-primary-foreground shadow-lg hover:shadow-primary/40 transform transition-transform hover:scale-105">
                <Link href="#contact">
                  Contact Me <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 gsap-hero-image-wrapper">
                 {/* Decorative Circle */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent -z-10 blur-xl animate-pulse" />
                
                {/* Image */}
                <div className="relative w-full h-full">
                    <Image
                        src="/image/m3.JPG"
                        alt="Vishnu Prajapat"
                        width={400}
                        height={400}
                        className="object-cover rounded-full shadow-2xl border-4 border-background"
                        priority
                        data-ai-hint="Vishnu Prajapat professional"
                    />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
