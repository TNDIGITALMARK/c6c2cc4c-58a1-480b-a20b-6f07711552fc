import { Header } from '@/components/mutual-aid/Header';
import { Hero } from '@/components/mutual-aid/Hero';
import { Timeline } from '@/components/mutual-aid/Timeline';
import { MutualAidSection } from '@/components/mutual-aid/MutualAidSection';
import { Benefits } from '@/components/mutual-aid/Benefits';
import { Testimonials } from '@/components/mutual-aid/Testimonials';
import { Quiz } from '@/components/mutual-aid/Quiz';
import { Footer } from '@/components/mutual-aid/Footer';

export const metadata = {
  title: 'Mutual Aid - Together We Rise, Together We Thrive',
  description:
    'Join a movement where neighbors help neighbors, communities grow stronger, and every person has the support they need to flourish.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <MutualAidSection />
        <Benefits />
        <Testimonials />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}
