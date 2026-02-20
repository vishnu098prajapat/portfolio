
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

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'AIQuizCraft.com',
    description: 'An AI-powered platform to create and share engaging quizzes in seconds.',
    image: '/image/aiquizcraft.png',
    tags: ['Rext.js', 'API', 'SaaS'],
    liveLink: 'https://aiquizcraft.com',
    githubLink: '#',
    aiHint: 'AI quiz platform'
  },
  {
    title: 'Sparrowfy',
    description: 'A SaaS platform for coaching management, currently in the testing phase.',
    image: '/image/Untitled design.png',
    tags: ['React.js', 'API', 'SaaS'],
    liveLink: '#',
    githubLink: '#',
    aiHint: 'coaching management dashboard'
  },
  {
    title: 'Online Gaming Platform',
    description: 'A modern online gaming platform.',
    image: '/image/online-game.jpeg',
    tags: ['Vite', 'React'],
    liveLink: 'http://realonlinegaming.netlify.app',
    githubLink: '#',
    aiHint: 'online game platform interface'
  },
  {
    title: 'Resume Builder',
    description: 'A web application for creating resumes easily.',
    image: '/image/resume.png',
    tags: ['React', 'Web App', 'Utility'],
    liveLink: 'https://resume-builder-ten-black.vercel.app/',
    githubLink: '#',
    aiHint: 'resume builder application'
  },
  {
    title: 'Beautiful Home Decor - AffiliateStore',
    description: 'Beautiful Home Decor - AffiliateStore.',
    image: '/image/affilte.jpeg',
    tags: ['E-commerce', 'Affiliate', 'Decor'],
    liveLink: 'https://beauty-hub-jet.vercel.app/',
    githubLink: '#',
    aiHint: 'home decor website'
  },
  {
    title: 'Web Automation Using Selenium',
    description: 'Python Bing Search Bot that automates web searches using Selenium.',
    image: '/image/automatipn.jpg',
    tags: ['Python', 'Selenium', 'Automation'],
    liveLink: '#',
    githubLink: '#',
    aiHint: 'automation script code'
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !projectsGridRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 80%", 
          toggleActions: "play none none none"
        },
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
      });

      // Animate each project card
      const cards = gsap.utils.toArray<HTMLDivElement>(projectsGridRef.current!.children);
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", 
            toggleActions: "play none none reset", 
          },
          opacity: 0,
          y: 60, 
          scale: 0.95, 
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
    <section id="projects" ref={sectionRef} className="py-20 sm:py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-headline">
            <span className="regular-text">My </span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div 
          ref={projectsGridRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project, index) => (
            <div key={index} className="project-card"> {/* Wrapper for consistent animation targeting */}
              <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg transform-gpu hover:scale-[1.02] bg-card/70 backdrop-blur-lg border border-[hsla(var(--border)/0.25)] group">
                <div className="relative w-full overflow-hidden aspect-[3/2]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={project.aiHint}
                  />
                </div>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg md:text-xl font-semibold text-primary font-headline">{project.title}</CardTitle>
                  <CardDescription className="text-card-foreground h-24 text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-2">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/80 text-secondary-foreground text-xs px-2 py-0.5">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[hsla(var(--border)/0.3)] pt-3 pb-4">
                  <div className="flex justify-between w-full items-center">
                    {project.liveLink && project.liveLink !== '#' ? (
                      <Button variant="outline" size="sm" asChild className="text-accent border-accent hover:bg-accent/10 hover:text-accent-foreground transition-colors text-xs px-3 py-1.5 h-auto">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled className="text-accent border-accent transition-colors text-xs px-3 py-1.5 h-auto">
                        Live Demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    )}

                    {project.githubLink && project.githubLink !== '#' && (
                      <Button variant="ghost" size="sm" asChild className="text-card-foreground hover:text-primary transition-colors text-xs px-3 py-1.5 h-auto">
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" /> Source
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
