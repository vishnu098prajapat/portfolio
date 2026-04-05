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
          y: 40,
          scale: 0.98,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 font-headline">
            <span className="regular-text">My </span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {profileData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 group max-w-sm mx-auto">
                <div className="relative w-full overflow-hidden aspect-[16/10]">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={500}
                    height={312}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-xs font-medium">Click to view project</p>
                  </div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-base font-bold text-foreground font-headline group-hover:text-primary transition-colors">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <CardDescription className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/50 text-[10px] px-2 py-0 h-4">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t border-border/30 mt-auto">
                  <div className="flex justify-between w-full items-center pt-3">
                    {project.projectUrl && project.projectUrl !== '#' ? (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs text-primary hover:text-accent transition-colors">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[10px] text-muted-foreground italic">Work in progress</span>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button variant="ghost" size="icon" asChild className="h-7 w-7 rounded-full text-muted-foreground hover:text-primary">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
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