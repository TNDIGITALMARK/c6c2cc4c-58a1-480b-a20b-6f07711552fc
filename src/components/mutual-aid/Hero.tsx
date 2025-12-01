'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToQuiz = () => {
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax transforms
  const parallaxTransform = (multiplier: number) => ({
    transform: `translate(${mousePosition.x * multiplier}px, ${mousePosition.y * multiplier}px) translateY(${scrollY * 0.3}px)`,
  });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#e8f4f8] to-white pt-20"
    >
      {/* Decorative Background Illustrations with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circle 1 */}
        <div
          className="absolute top-20 left-10 w-64 h-64 bg-[#004467]/5 rounded-full blur-3xl animate-float"
          style={parallaxTransform(20)}
        />
        {/* Circle 2 */}
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#f6b025]/10 rounded-full blur-3xl"
          style={{
            ...parallaxTransform(-15),
            animationDelay: '2s',
          }}
        />
        {/* Small accent circles */}
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#004467]/10 rounded-full blur-2xl animate-float"
          style={{
            ...parallaxTransform(10),
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-[#f6b025]/15 rounded-full blur-2xl animate-float"
          style={{
            ...parallaxTransform(-10),
            animationDelay: '3s',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-[#f6b025]/20 text-[#004467] rounded-full font-medium mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-[#f6b025] rounded-full mr-2 animate-pulse"></span>
            Building Communities Together
          </div>

          {/* Main Heading */}
          <h1
            className="mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Together We Rise, Together We Thrive
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Join a movement where neighbors help neighbors, communities grow
            stronger, and every person has the support they need to flourish.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <button onClick={scrollToQuiz} className="gradient-cta">
              <span className="flex items-center">
                Discover Your Impact
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('mutual-aid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-[#004467] font-semibold rounded-xl border-2 border-[#004467] hover:bg-[#004467] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { value: '10K+', label: 'Community Members' },
              { value: '500+', label: 'Projects Completed' },
              { value: '$2M+', label: 'Resources Shared' },
              { value: '50+', label: 'Local Chapters' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#004467] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#004467] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#004467] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
