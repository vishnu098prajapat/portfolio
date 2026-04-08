
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { profileData } from '@/lib/profile-data';

export default function HomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameCount = 192;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
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
          loadedCount++;
          if (loadedCount === frameCount) setIsLoaded(true);
        };
        loadedImages.push(img);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const img = images[index - 1];
      if (!img || !context) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

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
        end: "+=500%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(sequenceState, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => renderFrame(Math.round(sequenceState.frame)),
    });

    // Phase 1 transitions
    tl.to(".hero-text-1", {
      opacity: 0,
      x: -50,
      filter: "blur(12px)",
      duration: 0.15
    }, 0.05);

    // Phase 2 transitions
    tl.fromTo(".hero-text-2", 
      { opacity: 0, x: 50, filter: "blur(12px)" }, 
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.25 }, 
      0.25
    );
    tl.to(".hero-text-2", {
      opacity: 0,
      x: -50,
      filter: "blur(12px)",
      duration: 0.25
    }, 0.55);

    // Phase 3 transitions
    tl.fromTo(".hero-text-3", 
      { opacity: 0, scale: 0.95, filter: "blur(12px)" }, 
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.25 }, 
      0.75
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
          <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            LOADING EXPERIENCE {loadingProgress}%
          </p>
        </div>
      )}

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 sm:px-16 lg:px-24 w-full h-full max-w-7xl mx-auto">
        
        {/* Phase 1: Intro - Moved Left, Smaller */}
        <div className="hero-text-1 flex flex-col items-start space-y-4 max-w-2xl">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-foreground mix-blend-difference uppercase">
            {profileData.personalInfo.name.split(' ')[0]} <br/>
            <span className="text-primary">{profileData.personalInfo.name.split(' ')[1]}</span>
          </h1>
          <p className="text-base sm:text-xl font-bold text-foreground/80 mix-blend-difference uppercase tracking-[0.3em]">
            {profileData.personalInfo.title}
          </p>
          <div className="pt-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Scroll Down</span>
          </div>
        </div>

        {/* Phase 2: Statement - Moved Left, Smaller */}
        <div className="hero-text-2 absolute flex flex-col items-start space-y-4 opacity-0 pointer-events-none max-w-xl">
          <h2 className="text-3xl sm:text-5xl font-bold font-headline text-foreground mix-blend-difference leading-tight">
             Redefining <br/><span className="text-primary italic">Digital Craftsmanship</span>
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground font-medium mix-blend-difference leading-relaxed">
            {profileData.summary}
          </p>
        </div>

        {/* Phase 3: Connect - Moved Left, Smaller Buttons */}
        <div className="hero-text-3 absolute flex flex-col items-start space-y-8 opacity-0 pointer-events-none max-w-2xl">
          <h2 className="text-5xl sm:text-7xl font-black font-headline text-foreground mix-blend-difference tracking-tighter uppercase">
            LET&apos;S <span className="text-primary">TALK</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" asChild className="rounded-full px-8 h-11 text-sm font-bold shadow-lg bg-primary hover:bg-primary/90">
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="rounded-full px-8 h-11 text-sm font-bold backdrop-blur-md bg-white/5 border-primary/20 text-foreground hover:bg-primary/10">
              <Link href="#projects">Browse Work</Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
