
"use client";

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Briefcase, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Briefcase, value: '10+', label: 'Projects Completed' },
    { icon: Code, value: 'Full Stack', label: 'Development' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      
      const statCards = gsap.utils.toArray<HTMLElement>('.stat-card');
      gsap.from(statCards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card w-full sm:w-[calc(50%-12px)] max-w-xs">
              <Card className="bg-background shadow-md h-full hover:shadow-lg transition-shadow border-none rounded-xl">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground leading-none mb-1">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
