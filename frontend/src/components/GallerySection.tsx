import React, { useState } from 'react';
import { X } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: '/assets/generated/gallery-cut-1.dim_600x600.png',
    alt: 'Precision haircut',
    label: 'Precision Cut',
  },
  {
    src: '/assets/generated/gallery-shave-2.dim_600x600.png',
    alt: 'Classic shave',
    label: 'Classic Shave',
  },
  {
    src: '/assets/generated/gallery-tools-3.dim_600x600.png',
    alt: 'Barber tools',
    label: 'Master Tools',
  },
  {
    src: '/assets/generated/gallery-barber-4.dim_600x600.png',
    alt: 'Barber at work',
    label: 'Craftsmanship',
  },
];

export function GallerySection() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="gallery" className="section-surface py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-3 font-medium">
            Our Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Gallery
          </h2>
          <div className="gold-divider w-24 mx-auto" />
          <p className="font-sans text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            A glimpse into the artistry and atmosphere of Sharp Cuts Barbershop.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={idx}
              className="relative group overflow-hidden rounded-sm aspect-square cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              onClick={() => setLightboxImg(img)}
              aria-label={`View ${img.label}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-end p-4">
                <span className="font-sans text-xs tracking-widest uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {img.label}
                </span>
              </div>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-300 rounded-sm" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 text-foreground hover:text-gold transition-colors p-2"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <img
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-gold-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
