'use client';

import { useState } from 'react';
import { Utensils, Home, Heart, Users, ArrowRight } from 'lucide-react';

const mutualAidTypes = [
  {
    id: 'food',
    icon: Utensils,
    title: 'Food Security',
    shortDesc: 'Community kitchens and food sharing',
    fullDesc:
      'Organize community fridges, meal trains, food pantries, and collective grocery shopping. No one should go hungry when we have each other.',
    stats: '2,500+ meals shared monthly',
    color: '#004467',
  },
  {
    id: 'housing',
    icon: Home,
    title: 'Housing Support',
    shortDesc: 'Shelter and housing assistance',
    fullDesc:
      'From emergency housing to rent relief, furniture sharing to home repairs—we help keep our community housed and safe.',
    stats: '300+ families housed',
    color: '#f6b025',
  },
  {
    id: 'emergency',
    icon: Heart,
    title: 'Emergency Relief',
    shortDesc: 'Rapid response to crises',
    fullDesc:
      'When disaster strikes, we mobilize quickly. Medical emergencies, natural disasters, or personal crises—we're there for each other.',
    stats: '24/7 emergency network',
    color: '#004467',
  },
  {
    id: 'organizing',
    icon: Users,
    title: 'Community Organizing',
    shortDesc: 'Building power together',
    fullDesc:
      'Collective action creates lasting change. We organize for better policies, stronger communities, and a more just world for everyone.',
    stats: '50+ active campaigns',
    color: '#f6b025',
  },
];

export function MutualAidSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const scrollToQuiz = () => {
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="mutual-aid" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#e8f4f8] to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">What Is Mutual Aid?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mutual aid is solidarity, not charity. It's communities meeting
            each other's needs through direct action, cooperation, and shared
            resources.
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {mutualAidTypes.map((type, index) => {
            const Icon = type.icon;
            const isActive = activeItem === type.id;

            return (
              <div
                key={type.id}
                className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-500 ${
                  isActive
                    ? 'shadow-2xl scale-105 z-10'
                    : 'shadow-lg hover:shadow-xl hover:scale-102'
                }`}
                style={{
                  borderTop: `4px solid ${type.color}`,
                }}
                onMouseEnter={() => setActiveItem(type.id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={{
                    backgroundColor: `${type.color}15`,
                  }}
                >
                  <Icon
                    className={`w-8 h-8 transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`}
                    style={{ color: type.color }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{type.title}</h3>

                {/* Short Description (always visible) */}
                <p className="text-gray-600 mb-4">{type.shortDesc}</p>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {type.fullDesc}
                  </p>
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm"
                    style={{
                      backgroundColor: `${type.color}20`,
                      color: type.color,
                    }}
                  >
                    {type.stats}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div
                  className={`absolute bottom-4 right-4 transition-all duration-300 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: type.color }}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Animated background on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                    isActive ? 'opacity-5' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: type.color }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#004467] to-[#00608f] text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover how your unique skills and interests can create meaningful
            impact in your community.
          </p>
          <button
            onClick={scrollToQuiz}
            className="px-8 py-4 bg-[#f6b025] text-[#004467] font-bold rounded-xl hover:bg-[#ffc04d] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="flex items-center">
              Find Your Role
              <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
