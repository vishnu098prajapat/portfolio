
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
        end: "+=600%",
        scrub: 2,
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

    // Phase 1 (Initial Name)
    tl.to(".hero-text-1", {
      opacity: 0,
      x: -100,
      filter: "blur(15px)",
      duration: 0.15
    }, 0.05);

    // Phase 2 (Statement)
    tl.fromTo(".hero-text-2", 
      { opacity: 0, x: 50, filter: "blur(15px)" }, 
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.25 }, 
      0.25
    );
    tl.to(".hero-text-2", {
      opacity: 0,
      x: -50,
      filter: "blur(15px)",
      duration: 0.25
    }, 0.55);

    // Phase 3 (Final CTA)
    tl.fromTo(".hero-text-3", 
      { opacity: 0, y: 30, scale: 0.95, filter: "blur(15px)" }, 
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.25 }, 
      0.75
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  const loadingStatus = loadingProgress < 30 ? "Initializing" : loadingProgress < 70 ? "Loading Assets" : "Finalizing Experience";

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="relative w-64">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">{loadingStatus}</span>
            <span className="text-4xl font-black text-white font-code tracking-tighter">{loadingProgress}%</span>
          </div>
        </div>
      )}

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-80"
      />

      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-6 sm:px-12 lg:px-24 w-full h-full max-w-7xl mx-auto pointer-events-none">
        
        {/* Phase 1: Intro - Pushed left and down */}
        <div className="hero-text-1 flex flex-col items-start space-y-1 max-w-lg mt-32 pointer-events-auto">
          <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tighter leading-[0.9] text-white mix-blend-difference uppercase">
            {profileData.personalInfo.name.split(' ')[0]} <br/>
            <span className="text-primary">{profileData.personalInfo.name.split(' ')[1]}</span>
          </h1>
          <p className="text-[10px] font-bold text-white/50 mix-blend-difference uppercase tracking-[0.4em]">
            {profileData.personalInfo.title}
          </p>
          <div className="pt-16">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 animate-bounce">Scroll to Explore</span>
          </div>
        </div>

        {/* Phase 2: Statement - Pushed even further left */}
        <div className="hero-text-2 absolute flex flex-col items-start space-y-2 opacity-0 pointer-events-none max-w-[280px] sm:max-w-xs left-6 sm:left-12 lg:left-24">
          <h2 className="text-xl sm:text-2xl font-bold font-headline text-white mix-blend-difference leading-tight">
             REDEFINING <br/><span className="text-primary italic">CRAFTSMANSHIP</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-white/40 font-medium mix-blend-difference leading-relaxed">
            {profileData.summary}
          </p>
        </div>

        {/* Phase 3: Connect - Sleek, small, far left */}
        <div className="hero-text-3 absolute flex flex-col items-start space-y-4 opacity-0 pointer-events-none max-w-lg mt-48 left-6 sm:left-12 lg:left-24">
          <h2 className="text-3xl sm:text-5xl font-black font-headline text-white mix-blend-difference tracking-tighter uppercase">
            LET&apos;S <span className="text-primary">TALK</span>
          </h2>
          <div className="flex gap-2 pointer-events-auto">
            <Button size="sm" asChild className="rounded-full px-5 h-8 text-[10px] font-bold bg-primary hover:bg-primary/90">
              <Link href="#contact">Contact Now</Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="rounded-full px-5 h-8 text-[10px] font-bold bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-md">
              <Link href="#projects">My Work</Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
