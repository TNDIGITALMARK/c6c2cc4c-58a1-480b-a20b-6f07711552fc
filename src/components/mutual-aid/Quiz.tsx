'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'multiple' | 'slider' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  labels?: { min: string; max: string };
}

const questions: Question[] = [
  {
    id: 'availability',
    question: 'How much time can you commit per week?',
    type: 'multiple',
    options: ['1-2 hours', '3-5 hours', '6-10 hours', '10+ hours', 'Flexible/Variable'],
  },
  {
    id: 'causes',
    question: 'Which causes are you most passionate about? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Food Security',
      'Housing Support',
      'Emergency Relief',
      'Community Organizing',
      'Education & Mentoring',
      'Healthcare Access',
    ],
  },
  {
    id: 'skills',
    question: 'What skills can you contribute?',
    type: 'checkbox',
    options: [
      'Cooking/Food Prep',
      'Transportation/Driving',
      'Teaching/Mentoring',
      'Tech/Digital Skills',
      'Event Planning',
      'Legal/Administrative',
      'Handiwork/Repairs',
      'Language Translation',
    ],
  },
  {
    id: 'involvement',
    question: 'How do you prefer to help?',
    type: 'multiple',
    options: [
      'Direct service (hands-on help)',
      'Behind-the-scenes support',
      'Leadership/Coordination',
      'Resource donation',
      'Skills sharing/Teaching',
    ],
  },
  {
    id: 'experience',
    question: 'Previous volunteer experience?',
    type: 'slider',
    min: 0,
    max: 10,
    labels: { min: 'None', max: 'Extensive' },
  },
  {
    id: 'community',
    question: 'What matters most to you in community work?',
    type: 'multiple',
    options: [
      'Making immediate impact',
      'Building long-term relationships',
      'Learning new skills',
      'Supporting specific causes',
      'Meeting diverse people',
    ],
  },
];

export function Quiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    if (currentQuestion.type === 'checkbox') {
      const current = answers[currentQuestion.id] || [];
      const updated = current.includes(value)
        ? current.filter((v: any) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    return answer !== undefined && answer !== null;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Store results and redirect to results page
    const results = { answers, email, timestamp: new Date().toISOString() };
    localStorage.setItem('quizResults', JSON.stringify(results));
    router.push('/quiz-results');
  };

  if (showEmailCapture) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-b from-[#e8f4f8] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#004467] to-[#f6b025] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="mb-4">You're Almost There!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Enter your email to receive your personalized action plan and connect with opportunities.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full mb-6"
              />
              <button
                onClick={handleSubmit}
                disabled={!email || !email.includes('@')}
                className="gradient-cta w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Discover Your Impact</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-[#e8f4f8] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4">Discover Your Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take our quick quiz to find the perfect way for you to contribute to your community.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#004467]">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-[#004467]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#004467] to-[#f6b025] transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-[#004467]">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple' && (
              <div className="space-y-4">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-5 rounded-xl text-left font-medium transition-all duration-300 ${
                      answers[currentQuestion.id] === option
                        ? 'bg-gradient-to-r from-[#004467] to-[#f6b025] text-white shadow-lg scale-102'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Checkbox */}
            {currentQuestion.type === 'checkbox' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => {
                  const isSelected =
                    answers[currentQuestion.id]?.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full p-5 rounded-xl text-left font-medium transition-all duration-300 flex items-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#004467] to-[#f6b025] text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md mr-4 flex items-center justify-center ${
                          isSelected ? 'bg-white/20' : 'border-2 border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Slider */}
            {currentQuestion.type === 'slider' && (
              <div className="py-4">
                <input
                  type="range"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  value={answers[currentQuestion.id] || currentQuestion.min}
                  onChange={(e) => handleAnswer(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#004467]"
                />
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span>{currentQuestion.labels?.min}</span>
                  <span className="text-2xl font-bold text-[#004467]">
                    {answers[currentQuestion.id] || currentQuestion.min}
                  </span>
                  <span>{currentQuestion.labels?.max}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 gradient-cta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
