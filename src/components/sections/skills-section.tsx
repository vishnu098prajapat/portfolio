"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BrainCircuit, Braces, Component, Flame, Github, CodeSquare, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { profileData } from '@/lib/profile-data';

gsap.registerPlugin(ScrollTrigger);

// Map skill names to icons and colors
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
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const skillCards = gsap.utils.toArray<HTMLElement>('.skill-card-item');

    const ctx = gsap.context(() => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
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
          trigger: grid,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 font-headline">
          <span className="regular-text">My </span>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Skills</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-8 max-w-3xl mx-auto">
          {profileData.skills.map((skill) => {
            const meta = skillMeta[skill.name] || { icon: CodeSquare, color: 'text-primary' };
            const Icon = meta.icon;
            return (
              <div key={skill.name} className="skill-card-item group">
                <div className="flex flex-col items-center justify-center p-3 sm:p-6 bg-card/60 backdrop-blur-lg border border-border/20 rounded-xl shadow-md h-full transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
                  <Icon className={cn("h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4 transition-transform duration-300 group-hover:scale-110", meta.color)} />
                  <p className="text-[10px] sm:text-sm font-medium text-center text-card-foreground line-clamp-1">{skill.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}