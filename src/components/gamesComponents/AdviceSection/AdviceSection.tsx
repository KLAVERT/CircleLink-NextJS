import React, { useState } from 'react';

export interface AdviceOption {
  label: string;
  value: string | number;
}

export interface AdviceQuestion {
  id: string;
  question: string;
  options: AdviceOption[];
}

export interface AdviceSectionProps {
  questions: AdviceQuestion[];
  getAdvice: (answers: Record<string, string | number>) => AdviceResult | null;
  adviceTitle?: string;
  adviceSubtitle?: string;
  buttonText?: string;
  perMonthLabel?: string;
  orderNowLabel?: string;
  changeableLabel?: string;
  fillQuestionsLabel?: string;
  mainTitle?: string;
  mainSubtitle?: string;
}

export interface AdviceResult {
  name: string;
  price: string;
  ram: string;
  link: string;
  description?: string;
}

const AdviceSection: React.FC<AdviceSectionProps> = ({
  questions,
  getAdvice,
  adviceTitle = '',
  adviceSubtitle = '',
  buttonText = '',
  perMonthLabel = '',
  orderNowLabel = '',
  changeableLabel = '',
  fillQuestionsLabel = '',
  mainTitle = '',
  mainSubtitle = '',
}) => {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [advice, setAdvice] = useState<AdviceResult | null>(null);

  function handleGetAdvice() {
    setAdvice(getAdvice(answers));
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-1 rounded-2xl">
        <div className="bg-[var(--color-primary)] rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-stretch">
          {/* Vragen */}
          <div className="flex-1 min-w-[260px]">
            {mainTitle && (
              <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">{mainTitle}</h3>
            )}
            {mainSubtitle && (
              <p className="mb-6 text-[var(--color-text-subtle)]">{mainSubtitle}</p>
            )}
            <form className="space-y-4">
              {questions.map(q => (
                <div key={q.id}>
                  <div className="mb-2 font-medium text-[var(--color-text-primary)]">{q.question}</div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map(opt => {
                      const isActive = answers[q.id] === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          style={{
                            background: isActive ? 'var(--color-quinary)' : 'var(--color-bg-surface)',
                            color: isActive ? 'var(--color-button-text)' : 'var(--color-text-primary)',
                            border: '1px solid var(--color-border)',
                            transition: 'all 0.2s',
                          }}
                          className="px-4 py-2 rounded-lg font-medium shadow-sm"
                          onClick={() => setAnswers(a => ({ ...a, [q.id]: opt.value }))}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </form>
            <button
              style={{
                background: 'var(--color-quinary)',
                color: 'var(--color-button-text)',
                border: 'none',
                marginTop: '1.5rem',
                boxShadow: '0 2px 8px var(--color-shadow)',
              }}
              className="px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition mt-6"
              onClick={handleGetAdvice}
            >
              {buttonText}
            </button>
          </div>
          {/* Advieskaart */}
          <div className="flex-1 flex items-center justify-center min-w-[260px]">
            {advice ? (
              <div className="w-full max-w-xs bg-[var(--color-bg-surface)] rounded-xl p-6 text-center border-2 border-[var(--color-quinary)]">
                <div className="font-bold text-lg mb-2 text-[var(--color-text-primary)]">{adviceTitle}</div>
                <div className="mb-1 text-[var(--color-text-subtle)]">{adviceSubtitle}</div>
                <div className="font-semibold text-xl mb-2 text-[var(--color-text-primary)]">{advice.name}</div>
                <div className="text-3xl font-bold mb-1 text-[var(--color-quinary)]">{advice.price}</div>
                <div className="mb-2 text-[var(--color-text-subtle)]">{perMonthLabel}</div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="material-icons text-[var(--color-accent-cool)]">memory</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">{advice.ram}</span>
                </div>
                {advice.description && (
                  <div className="mb-2 text-[var(--color-text-subtle)] text-sm">{advice.description}</div>
                )}
                <a
                  href={advice.link}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'var(--color-quinary)',
                    color: 'var(--color-button-text)',
                    padding: '0.5rem 0',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    marginTop: '0.5rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  className="hover:opacity-90"
                >
                  {orderNowLabel}
                </a>
                <div className="text-xs mt-2 text-[var(--color-muted)]">{changeableLabel}</div>
              </div>
            ) : (
              <div className="w-full max-w-xs bg-[var(--color-bg-surface)] rounded-xl p-6 text-center border-2 border-[var(--color-border)] text-[var(--color-muted)]">
                {fillQuestionsLabel ? fillQuestionsLabel.replace('{buttonText}', buttonText) : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceSection; 