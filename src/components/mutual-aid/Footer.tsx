'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#004467] to-[#003350] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#f6b025] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f6b025] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-[#f6b025] rounded-lg flex items-center justify-center">
                <span className="text-[#004467] font-bold text-xl">MA</span>
              </div>
              <span className="text-2xl font-bold">Mutual Aid</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Building stronger communities through solidarity, cooperation, and
              mutual support. Together we rise, together we thrive.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#f6b025] transition-all duration-300 hover:scale-110"
                    aria-label={`Follow us on ${Icon.name}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#mutual-aid' },
                { label: 'Our History', href: '#timeline' },
                { label: 'Get Involved', href: '#quiz' },
                { label: 'Resources', href: '#benefits' },
                { label: 'Success Stories', href: '#testimonials' },
                { label: 'Impact Dashboard', href: '/dashboard' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#f6b025] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#f6b025] group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#f6b025] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/80">hello@mutualaid.org</p>
                  <p className="text-sm text-white/60">General inquiries</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#f6b025] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/80">(555) 123-4567</p>
                  <p className="text-sm text-white/60">24/7 hotline</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#f6b025] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white/80">
                    123 Community Street
                    <br />
                    Your City, ST 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-bold mb-6">Stay Connected</h4>
            <p className="text-white/80 mb-4">
              Get updates on community events, volunteer opportunities, and impact stories.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#f6b025] transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#f6b025] text-[#004467] font-bold rounded-lg hover:bg-[#ffc04d] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80 text-sm text-center md:text-left">
              © {currentYear} Mutual Aid Organization. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#f6b025] fill-current" />
              <span>for our community</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/80 hover:text-[#f6b025] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/80 hover:text-[#f6b025] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
