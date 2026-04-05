"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BrainCircuit, Braces, Component, Flame, Github, CodeSquare, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { profileData } from '@/lib/profile-data';

gsap.registerPlugin(ScrollTrigger);

const skillMeta: Record<string, { icon: React.ElementType; color: string }> = {
  'React.js': { icon: Component, color: 'text-sky-400' },
  'C++': { icon: Braces, color: 'text-blue-600' },
  'Python': { icon: CodeSquare, color: 'text-yellow-400' },
  'DSA': { icon: BrainCircuit, color: 'text-green-500' },
  'Github': { icon: Github, color: 'text-foreground' },
  'Firebase': { icon: Flame, color: 'text-yellow-500' },
  'Automation': { icon: Sparkles, color: 'text-purple-500' },
  'AI & GenAI': { icon: BrainCircuit, color: 'text-indigo-500' },
  'Data Science Libs': { icon: BarChart3, color: 'text-teal-500' },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const skillCards = gsap.utils.toArray<HTMLElement>('.skill-card-item');

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(skillCards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-16 sm:py-24 overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 font-headline">
          <span className="regular-text">Technical </span>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Expertise</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {profileData.skills.map((skill) => {
            const meta = skillMeta[skill.name] || { icon: CodeSquare, color: 'text-primary' };
            const Icon = meta.icon;
            return (
              <div key={skill.name} className="skill-card-item group">
                <div className="flex flex-col items-center justify-center p-3 sm:p-5 bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl shadow-sm h-full transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-xl hover:border-primary/50">
                  <Icon className={cn("h-7 w-7 sm:h-10 sm:w-10 mb-2 sm:mb-3 transition-transform duration-500 group-hover:rotate-6", meta.color)} />
                  <p className="text-[10px] sm:text-sm font-semibold text-center text-card-foreground line-clamp-1">{skill.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}