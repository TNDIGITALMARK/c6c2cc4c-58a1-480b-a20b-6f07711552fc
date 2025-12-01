'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Heart,
  Package,
  Home as HomeIcon,
  Calendar,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface Initiative {
  title: string;
  description: string;
  participants: number;
  impact: string;
  status: 'active' | 'completed' | 'upcoming';
}

export default function DashboardPage() {
  const [stats] = useState<Stat[]>([
    {
      label: 'Active Volunteers',
      value: '10,247',
      change: '+12% this month',
      icon: Users,
      color: '#004467',
    },
    {
      label: 'Meals Shared',
      value: '45,892',
      change: '+24% this month',
      icon: Heart,
      color: '#f6b025',
    },
    {
      label: 'Resources Distributed',
      value: '$2.4M',
      change: '+18% this month',
      icon: Package,
      color: '#004467',
    },
    {
      label: 'Families Housed',
      value: '1,523',
      change: '+8% this month',
      icon: HomeIcon,
      color: '#f6b025',
    },
  ]);

  const [initiatives] = useState<Initiative[]>([
    {
      title: 'Community Food Pantry Network',
      description:
        'Coordinating 15 neighborhood food pantries to serve 500+ families weekly.',
      participants: 234,
      impact: '2,000+ meals/week',
      status: 'active',
    },
    {
      title: 'Emergency Housing Response',
      description:
        'Rapid response team providing temporary shelter and housing assistance.',
      participants: 89,
      impact: '150 families housed',
      status: 'active',
    },
    {
      title: 'Youth Mentorship Program',
      description:
        'Connecting young people with mentors for education and career support.',
      participants: 156,
      impact: '300+ youth served',
      status: 'active',
    },
    {
      title: 'Community Garden Initiative',
      description: 'Building 10 new community gardens in underserved neighborhoods.',
      participants: 312,
      impact: '50 tons of produce',
      status: 'upcoming',
    },
    {
      title: 'Winter Warmth Campaign',
      description: 'Distributed coats, blankets, and heaters to those in need.',
      participants: 445,
      impact: '1,200 families helped',
      status: 'completed',
    },
  ]);

  const [successStories] = useState([
    {
      title: 'Neighborhood Food Hub Thrives',
      description:
        'What started as a small food share now serves 200 families weekly.',
      date: '2 weeks ago',
      emoji: '🌻',
    },
    {
      title: 'Emergency Housing Success',
      description: '45 families found permanent housing through our rapid response team.',
      date: '1 month ago',
      emoji: '🏠',
    },
    {
      title: 'Youth Program Milestone',
      description: '100% of mentored students graduated high school this year.',
      date: '2 months ago',
      emoji: '🎓',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#e8f4f8] to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#004467] to-[#f6b025] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">MA</span>
              </div>
              <span className="text-xl font-bold text-[#004467]">
                Mutual Aid - Impact Dashboard
              </span>
            </Link>
            <Link
              href="/#quiz"
              className="gradient-cta hidden sm:block"
            >
              <span>Get Involved</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#004467] to-[#f6b025] rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4">Community Impact Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time insights into how our community is making a difference together.
            Every number represents lives touched, families helped, and hope restored.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ borderTop: `4px solid ${stat.color}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-[#004467] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium" style={{ color: stat.color }}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Current Initiatives */}
        <div className="mb-16">
          <h2 className="mb-8">Active Initiatives</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#004467] flex-1">
                    {initiative.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      initiative.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : initiative.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {initiative.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{initiative.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1 text-[#004467]" />
                      {initiative.participants} volunteers
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Heart className="w-4 h-4 mr-1 text-[#f6b025]" />
                      {initiative.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="mb-8">Recent Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-[#e8f4f8] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{story.emoji}</div>
                <h4 className="text-lg font-bold text-[#004467] mb-2">
                  {story.title}
                </h4>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {story.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#004467] to-[#00608f] text-white rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Be Part of This Impact
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            These numbers represent real people helping real people. Your contribution,
            no matter how small, creates ripples of positive change.
          </p>
          <Link href="/#quiz" className="inline-block">
            <button className="px-8 py-4 bg-[#f6b025] text-[#004467] font-bold rounded-xl hover:bg-[#ffc04d] transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center">
                Discover How You Can Help
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
