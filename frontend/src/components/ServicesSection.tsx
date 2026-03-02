import React from 'react';
import { Clock, DollarSign, Scissors } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useServices } from '@/hooks/useQueries';
import type { Service } from '../backend';

const FALLBACK_SERVICES: Service[] = [
  {
    name: 'Classic Haircut',
    description: 'A timeless cut tailored to your style. Includes consultation, wash, cut, and style.',
    price: BigInt(35),
    durationMinutes: BigInt(45),
  },
  {
    name: 'Beard Trim & Shape',
    description: 'Expert beard grooming to define your look. Includes trim, shape, and hot towel finish.',
    price: BigInt(25),
    durationMinutes: BigInt(30),
  },
  {
    name: 'Hot Shave',
    description: 'Traditional straight razor shave with hot towel treatment for the smoothest finish.',
    price: BigInt(40),
    durationMinutes: BigInt(45),
  },
  {
    name: 'Cut & Beard Combo',
    description: 'Full haircut combined with beard trim and shape. Our most popular package.',
    price: BigInt(55),
    durationMinutes: BigInt(75),
  },
  {
    name: 'Kids Haircut',
    description: 'Gentle and fun haircut experience for children under 12.',
    price: BigInt(20),
    durationMinutes: BigInt(30),
  },
  {
    name: 'Hair & Scalp Treatment',
    description: 'Deep conditioning treatment to nourish hair and scalp. Includes massage.',
    price: BigInt(45),
    durationMinutes: BigInt(60),
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card-barbershop rounded-sm p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-xl font-semibold text-foreground leading-tight">
          {service.name}
        </h3>
        <span className="font-serif text-gold font-bold text-xl whitespace-nowrap">
          ${Number(service.price)}
        </span>
      </div>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
        {service.description}
      </p>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock size={14} className="text-gold" />
        <span className="font-sans text-xs tracking-wide">
          {Number(service.durationMinutes)} min
        </span>
      </div>
      <div className="gold-divider mt-auto" />
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="card-barbershop rounded-sm p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-36 bg-charcoal-elevated" />
        <Skeleton className="h-6 w-12 bg-charcoal-elevated" />
      </div>
      <Skeleton className="h-4 w-full bg-charcoal-elevated" />
      <Skeleton className="h-4 w-3/4 bg-charcoal-elevated" />
      <Skeleton className="h-4 w-20 bg-charcoal-elevated" />
    </div>
  );
}

export function ServicesSection() {
  const { data: services, isLoading } = useServices();
  const displayServices = (services && services.length > 0) ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="section-surface py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-3 font-medium">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <div className="gold-divider w-24 mx-auto" />
          <p className="font-sans text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            From classic cuts to modern styles, our skilled barbers deliver precision grooming tailored to you.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
            : displayServices.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-gold px-10 py-4 text-sm rounded-sm shadow-gold"
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
