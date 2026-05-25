import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, Eyebrow, Heading, Lede } from '@/components/ui/section';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/ui/scroll-reveal';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog — BotForge AI',
  description:
    'Engineering essays, product updates, and field notes from the team building production-grade conversational AI.',
};

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <Section className="pt-40">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Field notes</Eyebrow>
          <Heading as="h1" className="mt-4">
            Engineering, product, <span className="italic text-gradient">and opinion.</span>
          </Heading>
          <Lede className="mx-auto mt-5">
            What we&apos;re shipping, what we got wrong, and what we learned. New posts every other
            Tuesday.
          </Lede>
        </div>
      </ScrollReveal>

      {/* Featured */}
      <ScrollReveal>
        <Link href={`/blog/${featured.slug}`} className="mt-20 block group">
          <article className="glass relative overflow-hidden rounded-3xl border border-white/10 transition-colors hover:border-violet-500/40">
            <div className="grid lg:grid-cols-2">
              <div
                className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] bg-gradient-to-br ${featured.coverGradient}`}
              >
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur">
                  Featured
                </div>
              </div>
              <div className="flex flex-col justify-between p-8 sm:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-violet-500/30 bg-violet-500/5 px-2.5 py-0.5 text-xs text-violet-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-5 font-display text-3xl leading-tight text-white sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-white/65">{featured.excerpt}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-violet-500/30">
                      <Image
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        fill
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-white">{featured.author.name}</div>
                      <div className="text-xs text-white/40">
                        {formatDate(featured.publishedAt)} · {featured.readTime} min read
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-violet-300 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </article>
        </Link>
      </ScrollReveal>

      {/* Grid */}
      <ScrollRevealStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <ScrollRevealItem key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <article className="glass flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-violet-500/40">
                <div
                  className={`relative aspect-[16/9] bg-gradient-to-br ${post.coverGradient}`}
                >
                  <div className="absolute inset-0 bg-grid opacity-10" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-tight text-white group-hover:text-gradient">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/40">
                    <span>{post.author.name}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </Section>
  );
}
