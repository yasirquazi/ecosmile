import { useState } from 'react';
import IconButton from '@/components/ui/IconButton';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  eyebrow?: string;
  heading: string;
  items: FAQItem[];
}

export default function FAQAccordion({ eyebrow, heading, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{
      paddingTop: 'var(--section-pad-y)',
      paddingBottom: 'var(--section-pad-y)',
      backgroundColor: 'var(--color-canvas)',
    }}>
      <div className="container-es">
        {eyebrow && (
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
            {eyebrow}
          </span>
        )}
        <h2 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: '-0.016em',
          color: 'var(--color-ink)',
          marginBottom: '3rem',
        }}>
          {heading}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  padding: '1.5rem',
                }}
              >
                {/* Heading row — the interactive trigger */}
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '2.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                  }}
                >
                  <span style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: 'var(--color-ink)',
                    flex: 1,
                    minWidth: 0,
                  }}>
                    {item.question}
                  </span>
                  {/* Plus = open, Minus = closed — matches Figma state naming */}
                  <IconButton icon={isOpen ? 'plus' : 'minus'} />
                </button>

                {/* Answer — visible when open */}
                {isOpen && (
                  <p style={{
                    marginTop: '0.75rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    color: 'var(--color-ink-soft)',
                  }}>
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
