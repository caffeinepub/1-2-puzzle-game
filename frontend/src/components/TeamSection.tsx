import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useStaff } from '@/hooks/useQueries';
import type { StaffMember } from '../backend';

const FALLBACK_STAFF: StaffMember[] = [
  {
    name: 'Marcus Rivera',
    role: 'Master Barber & Owner',
    bio: 'With over 15 years of experience, Marcus founded Sharp Cuts with a vision to bring premium barbering to the community. Specializes in classic cuts and fades.',
    photoUrl: '',
  },
  {
    name: 'James Thornton',
    role: 'Senior Barber',
    bio: 'James is known for his precision fades and creative designs. A true artist with the clippers, he brings a modern edge to every cut.',
    photoUrl: '',
  },
  {
    name: 'Diego Santos',
    role: 'Barber & Beard Specialist',
    bio: 'Diego\'s passion for beard grooming is unmatched. From sculpted beards to hot shaves, he transforms facial hair into a statement.',
    photoUrl: '',
  },
];

function StaffCard({ member }: { member: StaffMember }) {
  const avatarSrc = member.photoUrl || '/assets/generated/staff-avatar-placeholder.dim_256x256.png';

  return (
    <div className="card-barbershop rounded-sm overflow-hidden group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={avatarSrc}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/staff-avatar-placeholder.dim_256x256.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-xl font-bold text-foreground">{member.name}</h3>
          <p className="font-sans text-xs text-gold tracking-widest uppercase mt-1">{member.role}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="gold-divider mb-4" />
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

function StaffCardSkeleton() {
  return (
    <div className="card-barbershop rounded-sm overflow-hidden">
      <Skeleton className="aspect-square w-full bg-charcoal-elevated" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-36 bg-charcoal-elevated" />
        <Skeleton className="h-3 w-24 bg-charcoal-elevated" />
        <Skeleton className="h-4 w-full bg-charcoal-elevated" />
        <Skeleton className="h-4 w-5/6 bg-charcoal-elevated" />
      </div>
    </div>
  );
}

export function TeamSection() {
  const { data: staff, isLoading } = useStaff();
  const displayStaff = (staff && staff.length > 0) ? staff : FALLBACK_STAFF;

  return (
    <section id="team" className="section-dark py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-3 font-medium">
            The Professionals
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Team
          </h2>
          <div className="gold-divider w-24 mx-auto" />
          <p className="font-sans text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            Our barbers are passionate craftsmen dedicated to delivering the finest grooming experience.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <StaffCardSkeleton key={i} />)
            : displayStaff.map((member) => (
                <StaffCard key={member.name} member={member} />
              ))}
        </div>
      </div>
    </section>
  );
}
