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
          y: 20,
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
    <section id="projects" ref={sectionRef} className="py-12 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-2xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 font-headline">
            <span className="regular-text">My </span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Projects</span>
        </h2>
        
        {/* Responsive Grid: 2 columns on mobile, 3 columns on desktop */}
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 max-w-6xl mx-auto"
        >
          {profileData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 group">
                <div className="relative w-full overflow-hidden aspect-video">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader className="p-3 sm:p-5 pb-1">
                  <CardTitle className="text-[12px] sm:text-lg font-bold text-foreground font-headline group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-3 sm:p-5 pt-0 flex-grow">
                  <CardDescription className="text-muted-foreground text-[10px] sm:text-sm leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none text-[8px] sm:text-[10px] px-1.5 py-0 sm:px-2.5 sm:py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-3 sm:p-5 pt-0 mt-auto">
                  <div className="flex justify-between w-full items-center pt-2 border-t border-border/10">
                    {project.projectUrl && project.projectUrl !== '#' ? (
                      <Button variant="link" size="sm" asChild className="p-0 h-auto text-[10px] sm:text-sm text-primary hover:text-accent font-semibold">
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          Live <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-[9px] sm:text-xs text-muted-foreground italic">Private</span>
                    )}

                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Button variant="ghost" size="icon" asChild className="h-6 w-6 sm:h-8 sm:w-8 rounded-full text-muted-foreground hover:text-primary">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 sm:h-4 w-4" />
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