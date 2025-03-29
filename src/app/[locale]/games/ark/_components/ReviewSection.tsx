"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';
import Grid, { GridItem } from '@/components/Grid';

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

// Functie voor de sterren
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-xl ${i <= rating ? 'text-[#00b67a]' : 'text-gray-300'}`}>
        ★
      </span>
    );
  }
  return stars;
};

// Functie voor verplaatsing
const getStaggeredPosition = (index: number) => {
  const positions = ["mt-0", "mt-8", "mt-4", "mt-12", "mt-6"];
  return positions[index % positions.length];
};

const ReviewSection = () => {
  const t = useTranslations('Reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTrustpilotReviews = async () => {
      try {
        setLoading(true);
        
        // Fetch reviews from our API endpoint
        const response = await fetch('/api/trustpilot');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        setLoading(false);
        console.error('Error fetching Trustpilot reviews:', err);
      }
    };

    fetchTrustpilotReviews();
  }, []);

  // Bereken animation duration op basis van aantal reviews
  const getAnimationDuration = () => {
    const baseSpeed = 60; // seconden voor basis animatie
    const speedFactor = Math.max(1, reviews.length / 3); // verhoog duration voor meer reviews
    return `${baseSpeed * speedFactor}s`;
  };

  return (
    <div className="py-16 bg-[var(--color-primary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Grid columns={1} spacing="xl">
            <GridItem>
              <div className="mb-6">
                <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">
                  <span className="text-[var(--color-text-primary)]">
                    {t('title')}
                  </span>
                </h2>
                <div className="flex items-center">
                  <p className="text-lg text-[var(--color-text-primary)] max-w-2xl">
                    {t('poweredBy')}
                  </p>
                  <a 
                    href="https://www.trustpilot.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="no-underline ml-2"
                  >
                    <span className="font-bold text-xl bg-gradient-to-r from-[#00b67a] to-[#007055] bg-clip-text text-transparent px-2 py-1 rounded">Trustpilot</span>
                  </a>
                </div>
              </div>
            </GridItem>

            <GridItem>
              {loading ? (
                <Grid columns={1} spacing="md">
                  <GridItem className="flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-[var(--color-text-primary)]">{t('loading')}</p>
                  </GridItem>
                </Grid>
              ) : error ? (
                <Grid columns={1} spacing="md">
                  <GridItem className="flex justify-center items-center min-h-[200px] text-red-500 text-center">
                    <p>{error}</p>
                  </GridItem>
                </Grid>
              ) : (
                <div 
                  className="relative bg-gradient-to-r from-[var(--color-bg-surface)] to-[var(--color-bg-primary)] p-2 rounded-xl border border-[var(--color-border)] shadow-2xl overflow-hidden"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                >
                  <div className="h-8 bg-[var(--color-bg-deep)] flex items-center px-4 rounded-t-lg mb-1">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-error)]"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--color-success)]"></div>
                    </div>
                  </div>
                  <div 
                    className="flex space-x-6 p-4 overflow-hidden"
                  >
                    <div 
                      className="flex space-x-6"
                      style={{
                        animation: `scroll-x ${getAnimationDuration()} linear infinite`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                        width: 'fit-content'
                      }}
                    >
                      {/* Reviews - nu in één doorlopende rij */}
                      {[...reviews, ...reviews, ...reviews].map((review, index) => (
                        <div 
                          key={`review-${index}-${review.id}`} 
                          className={`flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${getStaggeredPosition(index)}`}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center font-semibold text-xl">
                                {review.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <h3 className="text-base font-semibold m-0 text-[var(--color-text-dark)]">{review.name}</h3>
                                <span className="text-xs text-[var(--color-text-dark)]">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold mb-2 text-[var(--color-text-dark)]">{review.title}</h4>
                          <p className="text-sm leading-relaxed text-[var(--color-text-dark)] line-clamp-4">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </GridItem>
            
            <GridItem>
              <div className="pt-8 flex justify-center">
                <Button
                  variant="blue"
                  href="https://www.trustpilot.com/review/circlelink.host"
                  target="_blank"
                >
                  {t('viewMore')}
                </Button>
              </div>
            </GridItem>
          </Grid>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${reviews.length * 340}px);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewSection;
