'use client';

import { useState, useEffect } from 'react';
import { Quote, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Martinez',
    role: 'Food Distribution Organizer',
    quote:
      'I started by volunteering one Saturday morning. Three years later, I\'ve helped organize food distribution for over 500 families. The connections I\'ve made are priceless.',
    image: '🌻',
    color: '#004467',
  },
  {
    name: 'James Chen',
    role: 'Emergency Support Recipient',
    quote:
      'When my apartment flooded, I didn't know where to turn. Within hours, the mutual aid network had me in temporary housing and helped me rebuild. They didn't just help—they cared.',
    image: '🌟',
    color: '#f6b025',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Community Garden Coordinator',
    quote:
      'During job loss, mutual aid kept my family fed and housed. Now I coordinate our community garden, growing food for 30 families. We take care of each other.',
    image: '🌱',
    color: '#004467',
  },
  {
    name: 'David Kim',
    role: 'Volunteer Coordinator',
    quote:
      'What started as helping with a food drive turned into building a neighborhood support network. We've created something lasting—real community that shows up for each other.',
    image: '🤝',
    color: '#f6b025',
  },
  {
    name: 'Lisa Thompson',
    role: 'Disaster Response Lead',
    quote:
      'During the storms, mutual aid mobilized faster than any official agency. We housed 50 families, distributed supplies, and proved that neighbors helping neighbors works.',
    image: '💪',
    color: '#004467',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const scrollToQuiz = () => {
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-[#e8f4f8]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Stories from Our Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real people, real impact. Hear from community members whose lives
            have been transformed through mutual aid.
          </p>
        </div>

        {/* Main Testimonial Showcase */}
        <div className="relative mb-12">
          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentIndex
                    ? 'opacity-100 scale-100 relative z-10'
                    : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                }`}
              >
                <div
                  className="bg-white rounded-3xl p-12 shadow-2xl relative overflow-hidden"
                  style={{
                    borderTop: `6px solid ${testimonial.color}`,
                  }}
                >
                  {/* Quote Icon */}
                  <div
                    className="absolute top-8 right-8 opacity-10"
                    style={{ color: testimonial.color }}
                  >
                    <Quote className="w-24 h-24" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg"
                      style={{
                        backgroundColor: `${testimonial.color}15`,
                      }}
                    >
                      {testimonial.image}
                    </div>

                    {/* Quote */}
                    <p className="text-2xl text-gray-800 mb-8 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div>
                      <h4
                        className="text-xl font-bold"
                        style={{ color: testimonial.color }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-[#004467]'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Secondary Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              style={{
                borderLeft: `4px solid ${testimonial.color}`,
              }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                  style={{
                    backgroundColor: `${testimonial.color}15`,
                  }}
                >
                  {testimonial.image}
                </div>
                <div>
                  <h5 className="font-bold text-[#004467]">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm line-clamp-3">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={scrollToQuiz} className="gradient-cta">
            <span className="flex items-center">
              Start Your Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
