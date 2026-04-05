
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { profileData } from '@/lib/profile-data';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !titleRef.current || !projectsGridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      });

      const cards = gsap.utils.toArray<HTMLDivElement>(projectsGridRef.current!.children);
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 20,
          scale: 0.98,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 font-headline">
            <span className="regular-text">Featured </span>
            <span className="text-primary">Projects</span>
        </h2>
        
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto"
        >
          {profileData.projects.map((project, index) => (
            <div key={index} className="project-card flex flex-col h-full">
              <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl bg-card border border-border/40 group">
                <div className="relative w-full overflow-hidden aspect-[16/10]">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={500}
                    height={312}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                  />
                </div>
                
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-xs sm:text-sm font-bold text-foreground font-headline group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-3 pt-0 flex-grow">
                  <CardDescription className="text-muted-foreground text-[10px] sm:text-xs leading-tight mb-2 line-clamp-2">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/5 text-primary border-none text-[8px] sm:text-[9px] px-2 py-0.5 rounded-md">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-3 pt-0 mt-auto border-t border-border/5">
                  <div className="flex justify-between w-full items-center pt-2">
                    {project.projectUrl && project.projectUrl !== '#' ? (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-[9px] sm:text-[10px] text-primary hover:text-primary/80 font-bold">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          Live <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[9px] text-muted-foreground font-medium italic">Case Study</span>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button variant="ghost" size="icon" asChild className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                          </Link>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
