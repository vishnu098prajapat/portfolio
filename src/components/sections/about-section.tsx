
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
        y: 50,
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
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <Card className="bg-background shadow-lg h-full">
                <CardContent className="flex items-center gap-4 sm:gap-6 p-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
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
