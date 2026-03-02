import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useContactInfo, useBusinessHours, useServices, useSubmitAppointment } from '@/hooks/useQueries';
import type { BusinessHours, ContactInfo } from '../backend';

const FALLBACK_CONTACT: ContactInfo = {
  address: '123 Main Street, Downtown, NY 10001',
  phone: '(212) 555-0147',
  email: 'hello@sharpcutsbarber.com',
};

const FALLBACK_HOURS: BusinessHours = {
  monday: '9:00 AM – 7:00 PM',
  tuesday: '9:00 AM – 7:00 PM',
  wednesday: '9:00 AM – 7:00 PM',
  thursday: '9:00 AM – 8:00 PM',
  friday: '9:00 AM – 8:00 PM',
  saturday: '8:00 AM – 6:00 PM',
  sunday: 'Closed',
};

const DAYS: { key: keyof BusinessHours; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export function ContactSection() {
  const { data: contactInfo, isLoading: loadingContact } = useContactInfo();
  const { data: businessHours, isLoading: loadingHours } = useBusinessHours();
  const { data: services } = useServices();
  const submitAppointment = useSubmitAppointment();

  const contact = contactInfo ?? FALLBACK_CONTACT;
  const hours = businessHours ?? FALLBACK_HOURS;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredDateTime: '',
    service: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.preferredDateTime || !form.service) return;

    try {
      await submitAppointment.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: '', phone: '', preferredDateTime: '', service: '' });
    } catch {
      // error handled via mutation state
    }
  };

  const serviceOptions = services && services.length > 0
    ? services.map((s) => s.name)
    : ['Classic Haircut', 'Beard Trim & Shape', 'Hot Shave', 'Cut & Beard Combo', 'Kids Haircut', 'Hair & Scalp Treatment'];

  return (
    <section id="contact" className="section-dark py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-3 font-medium">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact & Booking
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info + Hours */}
          <div className="space-y-8">
            {/* Contact info */}
            <div className="card-barbershop rounded-sm p-6 space-y-5">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Find Us
              </h3>
              <div className="gold-divider" />

              {loadingContact ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-5 w-full bg-charcoal-elevated" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                    <span className="font-sans text-sm text-muted-foreground">{contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gold shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gold shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Business hours */}
            <div className="card-barbershop rounded-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} className="text-gold" />
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Hours
                </h3>
              </div>
              <div className="gold-divider mb-5" />

              {loadingHours ? (
                <div className="space-y-3">
                  {DAYS.map((d) => (
                    <Skeleton key={d.key} className="h-4 w-full bg-charcoal-elevated" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {DAYS.map(({ key, label }) => {
                    const value = hours[key];
                    const isClosed = value.toLowerCase() === 'closed';
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                    const isToday = today === label.toLowerCase();
                    return (
                      <div
                        key={key}
                        className={`flex justify-between items-center py-1.5 px-2 rounded-sm ${
                          isToday ? 'bg-charcoal-elevated' : ''
                        }`}
                      >
                        <span
                          className={`font-sans text-sm font-medium ${
                            isToday ? 'text-gold' : 'text-foreground'
                          }`}
                        >
                          {label}
                          {isToday && (
                            <span className="ml-2 text-xs text-gold/70 font-normal">(Today)</span>
                          )}
                        </span>
                        <span
                          className={`font-sans text-sm ${
                            isClosed ? 'text-muted-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking form */}
          <div className="card-barbershop rounded-sm p-6 md:p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Book an Appointment
            </h3>
            <div className="gold-divider mb-6" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle size={48} className="text-gold" />
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  Request Received!
                </h4>
                <p className="font-sans text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Thank you! We'll confirm your appointment shortly. We look forward to seeing you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold px-8 py-3 text-xs rounded-sm mt-4"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-charcoal-elevated border-charcoal-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(212) 555-0100"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="bg-charcoal-elevated border-charcoal-border text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-gold rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Service *
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-charcoal-elevated border border-charcoal-border text-foreground rounded-sm text-sm focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-charcoal-surface">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredDateTime" className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Preferred Date & Time *
                  </Label>
                  <Input
                    id="preferredDateTime"
                    name="preferredDateTime"
                    type="datetime-local"
                    value={form.preferredDateTime}
                    onChange={handleChange}
                    required
                    className="bg-charcoal-elevated border-charcoal-border text-foreground focus:border-gold focus:ring-gold rounded-sm"
                  />
                </div>

                {submitAppointment.isError && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle size={16} />
                    <span className="font-sans text-xs">
                      Something went wrong. Please try again.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitAppointment.isPending}
                  className="btn-gold w-full py-4 text-sm rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitAppointment.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request Appointment'
                  )}
                </button>

                <p className="font-sans text-xs text-muted-foreground text-center">
                  We'll contact you to confirm your appointment.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
