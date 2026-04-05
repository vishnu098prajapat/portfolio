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
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 max-w-7xl mx-auto"
        >
          {profileData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/40 group">
                <div className="relative w-full overflow-hidden aspect-[16/10]">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-sm sm:text-xl font-bold text-foreground font-headline group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 pt-0 flex-grow">
                  <CardDescription className="text-muted-foreground text-[10px] sm:text-base leading-relaxed mb-3 sm:mb-5 line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-none text-[8px] sm:text-xs px-2 py-0.5 rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-4 sm:p-6 pt-0 mt-auto border-t border-border/10">
                  <div className="flex justify-between w-full items-center pt-3">
                    {project.projectUrl && project.projectUrl !== '#' ? (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-[10px] sm:text-base text-primary hover:text-accent font-bold group/link">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[10px] sm:text-sm text-muted-foreground font-medium italic">Case Study</span>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
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