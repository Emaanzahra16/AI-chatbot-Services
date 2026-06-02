import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Section, Eyebrow } from '@/components/ui/section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FinalCTA } from '@/components/sections/final-cta';
import { blogPosts, getBlogPost } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Not found' };
  return {
    title: `${post.title} — Altivora AI`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Lightweight markdown renderer.
 * Handles ## h2, ### h3, **bold**, and paragraphs separated by blank lines.
 */
function renderContent(markdown: string) {
  const blocks = markdown.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="mt-10 font-display text-2xl text-white">
          {trimmed.replace(/^###\s*/, '')}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-12 font-display text-3xl text-white">
          {trimmed.replace(/^##\s*/, '')}
        </h2>
      );
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={i} className="mt-12 font-display text-4xl text-white">
          {trimmed.replace(/^#\s*/, '')}
        </h1>
      );
    }
    // Inline bold parsing
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mt-6 text-lg leading-[1.75] text-white/75">
        {parts.map((p, j) => {
          if (p.startsWith('**') && p.endsWith('**')) {
            return (
              <strong key={j} className="font-semibold text-white">
                {p.slice(2, -2)}
              </strong>
            );
          }
          return <span key={j}>{p}</span>;
        })}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: Params) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Section className="pt-40">
        <ScrollReveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>

          <article className="mx-auto mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-violet-500/30 bg-violet-500/5 px-2.5 py-0.5 text-xs text-violet-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl text-white/70">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-white/5 py-5 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-violet-500/30">
                  <Image src={post.author.avatar} alt={post.author.name} fill sizes="40px" />
                </div>
                <div>
                  <div className="text-white">{post.author.name}</div>
                  <div className="text-xs text-white/40">{post.author.role}</div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {post.readTime} min read
                </span>
              </div>
            </div>

            <div
              className={`mt-10 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${post.coverGradient} relative`}
            >
              <div className="absolute inset-0 bg-grid opacity-10" />
            </div>

            <div className="mt-12">{renderContent(post.content)}</div>
          </article>
        </ScrollReveal>
      </Section>

      {/* Related */}
      <Section className="pt-0">
        <ScrollReveal>
          <Eyebrow>Keep reading</Eyebrow>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">More from the team</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
              <article className="glass flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-violet-500/40">
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.coverGradient}`} />
                <div className="p-6">
                  <h3 className="font-display text-lg leading-tight text-white group-hover:text-gradient">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{p.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
