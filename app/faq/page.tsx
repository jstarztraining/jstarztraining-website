import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/site/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { getActiveFaqs } from '@/lib/queries';
import { SITE } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about JStarz soccer training in Halifax — ages, group sizes, locations, private vs group, goalkeeping, what to bring, and how to register.',
};

export default async function FaqPage() {
  const faqs = await getActiveFaqs();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      {faqs.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <PageHero
        eyebrow="FAQ"
        titleLead="Questions?"
        titleAccent="Answered."
        subtitle="Ages, group sizes, locations, what to bring, and how to register — all in one place."
      />

      <section className="bg-white py-24 lg:py-32">
        <Container className="max-w-3xl">
          {faqs.length === 0 ? (
            <p className="text-center text-lg text-ink/60">FAQs are coming soon.</p>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={faq.id} delay={Math.min(i, 6) * 50}>
                  <details className="group rounded-2xl border border-navy/10 bg-white shadow-card transition-colors open:border-gold/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-heading text-lg font-bold text-navy [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span
                        aria-hidden
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mist text-brand transition-transform duration-300 ease-out-quint group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 leading-relaxed text-ink/75">{faq.answer}</div>
                  </details>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-12 rounded-[1.5rem] bg-navy p-8 text-center text-white sm:p-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Still have a question?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/75">
              We’re happy to help you find the right program for your player.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Contact us
              </Button>
              <Button href={SITE.shopifyStoreUrl} variant="ghost" size="lg">
                Browse programs
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
