
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';
import { profileData } from '@/lib/profile-data';

export default function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameCount = 192;

  // Preload images for the sequence
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // File naming format: ezgif-frame-001.png
        img.src = `/images/hero_sequence/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loadedCount++; // Avoid getting stuck
        };
        loadedImages.push(img);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length < frameCount) return;

    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Helper to render a specific frame onto the canvas
    const renderFrame = (index: number) => {
      const img = images[index - 1];
      if (!img || !context) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      // Object-fit: cover implementation for canvas
      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Responsive Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(1);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const sequenceState = { frame: 1 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%", // Length of scroll to finish sequence
        scrub: 1, // Smooth scrub
        pin: true,
        anticipatePin: 1,
      },
    });

    // Frame Sequence Animation
    tl.to(sequenceState, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => renderFrame(Math.round(sequenceState.frame)),
    });

    // Coordination with text elements
    // State 1: Fade out initial text
    tl.to(".hero-text-1", {
      opacity: 0,
      y: -100,
      filter: "blur(20px)",
      duration: 0.1
    }, 0.05);

    // State 2: Fade in and out mid text
    tl.fromTo(".hero-text-2", 
      { opacity: 0, y: 100, filter: "blur(20px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2 }, 
      0.2
    );
    tl.to(".hero-text-2", {
      opacity: 0,
      y: -100,
      filter: "blur(20px)",
      duration: 0.2
    }, 0.5);

    // State 3: Final CTA
    tl.fromTo(".hero-text-3", 
      { opacity: 0, scale: 0.8, filter: "blur(20px)" }, 
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.2 }, 
      0.7
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Preloader Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Experience Loading {loadingProgress}%
          </p>
        </div>
      )}

      {/* Animation Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 w-full h-full">
        
        {/* Phase 1: Intro */}
        <div className="hero-text-1 flex flex-col items-center space-y-6 max-w-6xl w-full">
          <h1 className="text-6xl sm:text-8xl lg:text-[11rem] font-black font-headline tracking-tighter leading-none text-foreground mix-blend-difference uppercase">
            {profileData.personalInfo.name.split(' ')[0]} <br/>
            <span className="text-primary">{profileData.personalInfo.name.split(' ')[1]}</span>
          </h1>
          <p className="text-xl sm:text-3xl font-bold text-foreground mix-blend-difference uppercase tracking-[0.5em]">
            {profileData.personalInfo.title}
          </p>
          <div className="pt-20 flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-muted-foreground animate-pulse">Start Scrolling</span>
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>

        {/* Phase 2: Statement */}
        <div className="hero-text-2 absolute flex flex-col items-center space-y-6 opacity-0 pointer-events-none px-6">
          <h2 className="text-4xl sm:text-7xl font-bold font-headline text-foreground mix-blend-difference leading-tight text-balance">
             Redefining <span className="text-primary italic">Digital Craftsmanship</span>
          </h2>
          <p className="max-w-3xl text-lg sm:text-2xl text-muted-foreground font-medium mix-blend-difference leading-relaxed">
            {profileData.summary}
          </p>
        </div>

        {/* Phase 3: Connect */}
        <div className="hero-text-3 absolute flex flex-col items-center space-y-10 opacity-0 pointer-events-none px-6">
          <h2 className="text-6xl sm:text-9xl font-black font-headline text-foreground mix-blend-difference tracking-tighter">
            LET&apos;S <span className="text-primary">TALK</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center scale-110 sm:scale-125">
            <Button size="lg" asChild className="rounded-full px-14 h-16 text-lg font-bold shadow-[0_20px_50px_rgba(138,43,226,0.3)] bg-primary hover:bg-primary/90">
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-14 h-16 text-lg font-bold backdrop-blur-2xl bg-white/5 border-primary/40 text-foreground hover:bg-primary/20">
              <Link href="#projects">Browse Work</Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
