'use client';

import { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps {
  videoSrc?: string;
  poster?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export function BackgroundVideo({
  videoSrc = '/videos/community-helping.mp4',
  poster = '/images/community-poster.jpg',
  overlayOpacity = 0.6,
  children,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Progress from 0 to 1 as section scrolls through viewport
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight))
      );

      setScrollProgress(progress);

      // Control video playback based on visibility
      if (rect.top < windowHeight && rect.bottom > 0) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked, that's okay
        });
      } else {
        videoRef.current.pause();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background (replaces video for demo) */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient background as video placeholder */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(0, 68, 103, 0.9) 0%,
                rgba(0, 96, 143, 0.8) 25%,
                rgba(246, 176, 37, 0.3) 50%,
                rgba(0, 96, 143, 0.8) 75%,
                rgba(0, 68, 103, 0.9) 100%
              )`,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 20s ease infinite',
            opacity: 0.7 + scrollProgress * 0.3,
            transform: `scale(${1 + scrollProgress * 0.1})`,
          }}
        />

        {/* Animated decorative circles */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f6b025]/20 rounded-full blur-3xl animate-float"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#004467]/40 via-[#004467]/30 to-[#004467]/40"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {children || (
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Real People, Real Impact
            </h2>
            <p className="text-2xl mb-8 text-white/90">
              Watch how communities transform when neighbors help neighbors. Every
              act of mutual aid creates ripples of positive change.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('quiz');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="gradient-cta"
            >
              <span>Join the Movement</span>
            </button>
          </div>
        )}
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
