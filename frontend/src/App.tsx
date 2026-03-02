import React from 'react';
import { Heart } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TeamSection } from '@/components/TeamSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';

export default function App() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown-app';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <GallerySection />
        <ContactSection />
      </main>

      <footer className="section-surface border-t border-charcoal-border py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/barber-logo.dim_256x256.png"
                alt="Sharp Cuts Logo"
                className="w-8 h-8 rounded-sm object-cover"
              />
              <div>
                <span className="font-serif text-gold font-bold text-base">Sharp Cuts</span>
                <span className="font-sans text-muted-foreground text-xs ml-2">Barbershop</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {['Home', 'Services', 'Team', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const el = document.getElementById(item.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-sans text-xs text-muted-foreground hover:text-gold transition-colors tracking-widest uppercase"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Attribution */}
            <p className="font-sans text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Sharp Cuts Barbershop &nbsp;·&nbsp; Built with{' '}
              <Heart
                size={10}
                className="inline-block"
                style={{ color: 'oklch(0.75 0.14 85)', fill: 'oklch(0.75 0.14 85)' }}
              />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          <div className="gold-divider mt-8" />

          <p className="font-sans text-xs text-muted-foreground text-center mt-6">
            123 Main Street, Downtown, NY 10001 &nbsp;·&nbsp; (212) 555-0147 &nbsp;·&nbsp; hello@sharpcutsbarber.com
          </p>
        </div>
      </footer>
    </div>
  );
}
