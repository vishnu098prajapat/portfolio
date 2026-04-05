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

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !projectsGridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
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
          y: 30,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 font-headline">
            <span className="regular-text">Featured </span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-7xl mx-auto"
        >
          {profileData.projects.map((project, index) => (
            <div key={index} className="project-card h-full">
              <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl bg-card/50 backdrop-blur-xl border border-border/40 group">
                <div className="relative w-full overflow-hidden aspect-video">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <CardHeader className="p-3 sm:p-4 pb-1">
                  <CardTitle className="text-sm sm:text-lg font-bold text-foreground font-headline group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-3 sm:p-4 pt-0 flex-grow">
                  <CardDescription className="text-muted-foreground text-[10px] sm:text-sm leading-tight mb-2 line-clamp-2">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-none text-[8px] sm:text-[10px] px-1.5 py-0 rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-3 sm:p-4 pt-0 mt-auto border-t border-border/5">
                  <div className="flex justify-between w-full items-center pt-2">
                    {project.projectUrl && project.projectUrl !== '#' ? (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-[10px] sm:text-sm text-primary hover:text-accent font-bold group/link">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          Live <ExternalLink className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium italic">Case Study</span>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button variant="ghost" size="icon" asChild className="h-6 w-6 sm:h-8 sm:w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
