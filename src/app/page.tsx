'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Reveal } from '@/components/ui';
import { ROUTES } from '@/constants';
import {
  Newsletter,
  InstagramFeed,
  StorePolicies,
  Testimonials,
  WatchCard
} from '@/components/shared';
import { mockWatches } from '@/lib/mock-data';

export default function LandingPage() {
  const featuredWatches = mockWatches.filter(w => w.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
        </div>

        <div className="container relative z-20 text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto">
            <Reveal direction="up" delay={200}>
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.5em] uppercase text-xs">
                Est. 2024 • Timeless Excellence
              </h4>
            </Reveal>
            <Reveal direction="up" delay={400}>
              <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-white leading-[0.85] tracking-[-0.06em]">
                The Art of <br />
                <span className="text-gold-gradient italic px-2">Vintage Time</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={600}>
              <p className="text-[var(--color-text-secondary)] text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                Curating rare, exceptional timepieces that transcend generations. Every watch has a soul; every soul has a story.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href={ROUTES.products}>
                <Button variant="primary" className="h-16 px-12 font-bold uppercase tracking-[0.2em] text-xs rounded-none min-w-[240px]">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="h-16 px-12 font-bold uppercase tracking-[0.2em] text-xs rounded-none border-white/20 hover:border-[var(--color-accent)] min-w-[240px]">
                  Our Philosophy
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-60">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
        </div>
      </section>

      {/* Heritage Split Section */}
      <section className="py-0 overflow-hidden border-b border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row min-h-[70vh]">
          <div className="lg:w-1/2 relative min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1677445166019-4fa91a090e49?q=80&w=1170&auto=format&fit=crop"
              alt="Watch heritage"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex items-center bg-[var(--color-bg-secondary)] p-12 lg:p-24">
            <Reveal direction="right" className="space-y-8">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                Heritage Stewardship
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                Beyond Just <br /><span className="italic">Keeping Time</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed max-w-lg">
                We don't just sell watches; we preserve history. Each piece in our collection is hand-selected for its mechanical integrity, historical significance, and soul. Our master watchmakers ensure that every tick remains as precise as the day it left the manufacture.
              </p>
              <Button variant="outline" className="h-14 px-8 font-bold uppercase tracking-[0.2em] text-[10px] rounded-none border-[var(--color-border)]">
                Internal Selection Process
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-32 bg-black">
        <div className="container space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal direction="left" className="space-y-4">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                New Weekly Drop
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white italic">
                The Curated <span className="text-gold-gradient non-italic px-1">Arrivals</span>
              </h2>
            </Reveal>
            <Reveal direction="right">
              <Link href={ROUTES.products} className="group flex items-center gap-4 text-white hover:text-[var(--color-accent)] transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">View Full Collection</span>
                <div className="w-10 h-px bg-white group-hover:bg-[var(--color-accent)] transition-all group-hover:w-16" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredWatches.map((watch, index) => (
              <Reveal key={watch.id} direction="up" delay={index * 150}>
                <WatchCard {...watch} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Categories Grid */}
      <section className="py-24 border-y border-[var(--color-border)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Classic Elegance',
                subtitle: 'Dress Watches',
                img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Rare Discoveries',
                subtitle: 'Grail Pieces',
                img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=694&auto=format&fit=crop'
              },
              {
                title: 'Modern Icons',
                subtitle: 'Post-Retro',
                img: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=704&auto=format&fit=crop'
              },
            ].map((cat, index) => (
              <Reveal key={index} direction="up" delay={index * 200} className="relative aspect-[3/4] group overflow-hidden cursor-pointer">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20 space-y-2 text-center">
                  <span className="text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-[0.4em] block translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-2xl font-serif italic text-white">{cat.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Restoration Lab Split Section */}
      <section className="py-0 overflow-hidden border-b border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row-reverse min-h-[70vh]">
          <div className="lg:w-1/2 relative min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop"
              alt="Watch movement macro"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex items-center bg-black p-12 lg:p-24">
            <Reveal direction="left" className="space-y-8">
              <h4 className="text-[var(--color-accent)] font-bold tracking-[0.3em] uppercase text-xs">
                Precision Engineering
              </h4>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                The Heart of <br /><span className="italic">Excellence</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed max-w-lg">
                Every timepiece we acquire is serviced by master watchmakers who specialize in vintage horology. From microscopic gear alignment to case restoration, we ensure that the mechanical poeticism of the movement remains untainted.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-[var(--color-border)]">
                <div className="space-y-1">
                  <p className="text-white font-bold text-2xl font-serif italic">100%</p>
                  <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest leading-none">Original Parts</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white font-bold text-2xl font-serif italic">30+</p>
                  <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest leading-none">Point Inspection</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Policies Shared Component */}
      <StorePolicies />

      {/* Testimonials Shared Component */}
      <Testimonials />

      <Reveal direction="none">
        <Newsletter />
      </Reveal>
      <Reveal direction="none">
        <InstagramFeed />
      </Reveal>
    </div>
  );
}
