import React from 'react';
import { Scissors } from 'lucide-react';

export function HeroSection() {
  const handleBookNow = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/hero-banner.dim_1400x700.png)',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/75" />
      {/* Gold gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative scissors icon */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="gold-divider w-16" />
          <Scissors className="text-gold" size={28} />
          <div className="gold-divider w-16" />
        </div>

        <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4 font-medium">
          Premium Grooming Experience
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground leading-tight mb-4">
          Sharp Cuts
          <br />
          <span className="gold-gradient-text">Barbershop</span>
        </h1>

        <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Where Style Meets Precision. Expert barbers dedicated to making you look and feel your best.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBookNow}
            className="btn-gold px-10 py-4 text-sm rounded-sm shadow-gold-lg"
          >
            Book Appointment
          </button>
          <button
            onClick={handleViewServices}
            className="btn-outline-gold px-10 py-4 text-sm rounded-sm"
          >
            Our Services
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '5K+', label: 'Happy Clients' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl font-bold text-gold">{stat.value}</div>
              <div className="font-sans text-xs text-muted-foreground mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
