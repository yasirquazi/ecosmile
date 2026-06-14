import { useState } from 'react';

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
      backgroundColor: 'var(--color-card)',
      borderTop: '1px solid var(--color-rule)',
    }}>
      <div className="container-es">
        {eyebrow && (
          <span className="eyebrow" style={{ display: 'block', marginBottom: '0.875rem' }}>
            {eyebrow}
          </span>
        )}
        <h2 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 'clamp(1.875rem, 4vw, 3.25rem)',
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: '-0.016em',
          color: 'var(--color-ink)',
          marginBottom: '3rem',
        }}>
          {heading}
        </h2>

        <div style={{ maxWidth: '740px', borderTop: '1px solid var(--color-rule)' }}>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--color-rule)' }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                }}
              >
                <span>{item.question}</span>
                <span style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid var(--color-rule)',
                  flexShrink: 0,
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  color: 'var(--color-forest)',
                  transition: 'border-color 180ms ease',
                }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p style={{
                  paddingBottom: '1.375rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--color-ink-soft)',
                }}>
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
