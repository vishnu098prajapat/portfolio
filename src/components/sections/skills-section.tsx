
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BrainCircuit, Braces, Component, Flame, Github, CodeSquare, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: React.ElementType;
  color: string;
};

const skillsData: Skill[] = [
  { name: 'React.js', icon: Component, color: 'text-sky-400' },
  { name: 'C++', icon: Braces, color: 'text-blue-600' },
  { name: 'Python', icon: CodeSquare, color: 'text-yellow-400' },
  { name: 'DSA', icon: BrainCircuit, color: 'text-green-500' },
  { name: 'Github', icon: Github, color: 'text-foreground' },
  { name: 'Firebase', icon: Flame, color: 'text-yellow-500' },
  { name: 'Data Science Libs', icon: BarChart3, color: 'text-teal-500' },
];

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
      // Animate section title
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });

      // Stagger animate skill cards
      gsap.from(skillCards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-24 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-headline">
          <span className="regular-text">My </span>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Skills</span>
        </h2>
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {skillsData.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="skill-card-item group">
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-card/60 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg h-full transition-all duration-300 transform-gpu hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50">
                  <Icon className={cn("h-12 w-12 sm:h-14 sm:w-14 mb-4 transition-transform duration-300 group-hover:scale-110", skill.color)} />
                  <p className="text-sm sm:text-base font-medium text-center text-card-foreground transition-colors duration-300 group-hover:text-primary">{skill.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
