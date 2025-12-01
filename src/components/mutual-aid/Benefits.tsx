'use client';

import { useEffect, useRef, useState } from 'react';
import { Network, Target, Clock, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: Network,
    title: 'Community Connection',
    description:
      'Build genuine relationships with neighbors. Create a support network that lasts through good times and challenges.',
    color: '#004467',
  },
  {
    icon: Target,
    title: 'Direct Impact',
    description:
      'See the immediate results of your efforts. No bureaucracy, no delays—just people helping people, right now.',
    color: '#f6b025',
  },
  {
    icon: Clock,
    title: 'Flexible Participation',
    description:
      'Contribute in ways that fit your life. Whether you have hours or minutes, your support matters.',
    color: '#004467',
  },
  {
    icon: MapPin,
    title: 'Local Focus',
    description:
      'Strengthen your own neighborhood first. Local action creates ripples that transform entire communities.',
    color: '#f6b025',
  },
];

export function Benefits() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisibleCards((prev) =>
                    prev.includes(index) ? prev : [...prev, index]
                  );
                }, index * 150);
              }
            });
          },
          { threshold: 0.2 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      id="benefits"
      className="py-20 bg-gradient-to-b from-[#e8f4f8] to-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#f6b025]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#004467]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Join Mutual Aid?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beyond helping others, mutual aid transforms you, your relationships,
            and your entire community in powerful ways.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative bg-white rounded-2xl p-8 h-full transition-all duration-500 ${
                    isHovered
                      ? 'shadow-2xl -translate-y-4 scale-105'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Top accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-500 ${
                      isHovered ? 'h-2' : ''
                    }`}
                    style={{ backgroundColor: benefit.color }}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                      isHovered ? 'scale-110 rotate-6' : ''
                    }`}
                    style={{
                      backgroundColor: `${benefit.color}15`,
                    }}
                  >
                    <Icon
                      className={`w-8 h-8 transition-all duration-500 ${
                        isHovered ? 'scale-110' : ''
                      }`}
                      style={{ color: benefit.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                      isHovered ? '' : ''
                    }`}
                    style={{
                      color: isHovered ? benefit.color : '#004467',
                    }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover Effect Background */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                      isHovered ? 'opacity-5' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: benefit.color }}
                  ></div>

                  {/* Corner Decoration */}
                  <div
                    className={`absolute bottom-4 right-4 w-12 h-12 rounded-tl-full transition-opacity duration-500 ${
                      isHovered ? 'opacity-20' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: benefit.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Content */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <span className="text-2xl font-bold text-[#004467]">
              Join 10,000+ Community Members
            </span>
            <span className="text-2xl">🤝</span>
          </div>
        </div>
      </div>
    </section>
  );
}
