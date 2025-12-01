'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Building2, Wifi, Smartphone } from 'lucide-react';

const timelineData = [
  {
    year: '1800',
    title: 'Early Community Support',
    description:
      'Communities came together for barn-raising, harvest sharing, and collective care. Neighbors helped neighbors build homes, share resources, and support each other through challenges.',
    icon: Users,
    color: '#004467',
  },
  {
    year: '1900',
    title: 'Urban Mutual Aid Societies',
    description:
      'As cities grew, immigrant communities and labor movements formed mutual aid societies. These organizations provided healthcare, burial insurance, and community support in rapidly changing times.',
    icon: Building2,
    color: '#f6b025',
  },
  {
    year: '2000',
    title: 'Digital Organizing Era',
    description:
      'The internet revolutionized mutual aid, enabling rapid response to disasters, coordinated resource sharing, and global solidarity networks. Communities connected across borders.',
    icon: Wifi,
    color: '#004467',
  },
  {
    year: 'Today',
    title: 'Modern Mutual Aid Networks',
    description:
      'Technology meets tradition as communities use apps, social media, and organizing platforms to provide food, housing, healthcare, and emergency support to those in need.',
    icon: Smartphone,
    color: '#f6b025',
  },
];

export function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) =>
                  prev.includes(index) ? prev : [...prev, index]
                );
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
      id="timeline"
      className="py-20 bg-gradient-to-b from-white to-[#e8f4f8]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Our History of Community Care</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mutual aid isn't new—it's been the foundation of community strength
            for centuries. Explore how we've helped each other through time.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#004467] via-[#f6b025] to-[#004467]"></div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.includes(index);

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${
                            isLeft ? '-translate-x-12' : 'translate-x-12'
                          }`
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                      {/* Decorative Corner */}
                      <div
                        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10"
                        style={{ backgroundColor: item.color }}
                      ></div>

                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Central Year Marker */}
                  <div className="flex items-center justify-center w-full md:w-2/12 my-6 md:my-0">
                    <div
                      className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-xl transition-all duration-700 ${
                        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${item.color}, ${
                          item.color === '#004467' ? '#f6b025' : '#004467'
                        })`,
                      }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
