'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Users,
  Heart,
  ArrowRight,
  Share2,
  Mail,
  Download,
  Home,
} from 'lucide-react';

interface QuizResults {
  answers: Record<string, any>;
  email: string;
  timestamp: string;
}

interface Recommendation {
  title: string;
  description: string;
  icon: any;
  color: string;
  actions: string[];
}

export default function QuizResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quizResults');
    if (!stored) {
      router.push('/#quiz');
      return;
    }

    const data: QuizResults = JSON.parse(stored);
    setResults(data);

    // Generate personalized recommendations based on answers
    const recs = generateRecommendations(data.answers);
    setRecommendations(recs);
  }, [router]);

  const generateRecommendations = (answers: Record<string, any>): Recommendation[] => {
    const recs: Recommendation[] = [];

    // Based on availability
    const availability = answers.availability;
    if (availability?.includes('1-2 hours')) {
      recs.push({
        title: 'Micro-volunteering',
        description:
          'Perfect for your schedule! Help with quick tasks like meal prep, delivery runs, or digital support.',
        icon: Clock,
        color: '#004467',
        actions: [
          'Sign up for our weekly meal prep sessions',
          'Join the delivery coordination team',
          'Offer social media support remotely',
        ],
      });
    }

    // Based on causes
    const causes = answers.causes || [];
    if (causes.includes('Food Security')) {
      recs.push({
        title: 'Food Distribution Network',
        description:
          'Your passion for food security can help hundreds of families. Join our community kitchen and distribution teams.',
        icon: Heart,
        color: '#f6b025',
        actions: [
          'Volunteer at community food pantries',
          'Coordinate neighborhood food shares',
          'Help organize community gardens',
        ],
      });
    }

    if (causes.includes('Community Organizing')) {
      recs.push({
        title: 'Grassroots Leadership',
        description:
          'Your organizing skills are needed! Help build campaigns and mobilize community action.',
        icon: Users,
        color: '#004467',
        actions: [
          'Join our monthly organizing meetings',
          'Lead a neighborhood outreach team',
          'Help plan community events',
        ],
      });
    }

    // Based on skills
    const skills = answers.skills || [];
    if (skills.includes('Tech/Digital Skills')) {
      recs.push({
        title: 'Digital Infrastructure',
        description:
          'Use your tech skills to amplify our impact! Build tools, manage platforms, and improve communication.',
        icon: Sparkles,
        color: '#f6b025',
        actions: [
          'Help maintain our community platform',
          'Create digital resources and guides',
          'Support social media campaigns',
        ],
      });
    }

    // Default recommendation if none match
    if (recs.length === 0) {
      recs.push({
        title: 'General Volunteer',
        description:
          'There are many ways to contribute! Explore opportunities across all our programs.',
        icon: Heart,
        color: '#004467',
        actions: [
          'Attend our volunteer orientation',
          'Try different roles to find your fit',
          'Connect with experienced volunteers',
        ],
      });
    }

    return recs;
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#004467] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#e8f4f8] to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#004467] to-[#f6b025] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">MA</span>
            </div>
            <span className="text-xl font-bold text-[#004467]">Mutual Aid</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#004467] to-[#f6b025] rounded-full mb-6 animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-4">Your Personalized Action Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your responses, we've created a custom guide to help you make the
            biggest impact in your community.
          </p>
        </div>

        {/* Recommendations */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ borderTop: `6px solid ${rec.color}` }}
              >
                <div className="flex items-start space-x-6">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${rec.color}15` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: rec.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{rec.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#004467]">Next Steps:</h4>
                      <ul className="space-y-2">
                        {rec.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <ArrowRight
                              className="w-5 h-5 flex-shrink-0 mt-0.5"
                              style={{ color: rec.color }}
                            />
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#004467] to-[#00608f] text-white rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">
              Ready to Get Started?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="px-6 py-4 bg-[#f6b025] text-[#004467] font-bold rounded-xl hover:bg-[#ffc04d] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Call
              </button>
              <button className="px-6 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </button>
              <button className="px-6 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-white/90 mb-4">
                We'll send a copy of your action plan to{' '}
                <strong>{results.email}</strong>
              </p>
              <Link
                href="/"
                className="inline-flex items-center text-[#f6b025] hover:text-[#ffc04d] font-semibold transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
