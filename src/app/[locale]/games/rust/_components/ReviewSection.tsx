"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button/Button';

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

const ReviewSection = () => {
  const t = useTranslations('Reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Horizontal scrolling animation
  useEffect(() => {
    if (!scrollRef.current || loading || error || reviews.length === 0) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollContainer = scrollRef.current;
    const scrollSpeed = 0.2; // pixels per frame - balanced for smoothness

    // Calculate where first duplicate set starts
    const firstItemWidth = scrollContainer.querySelector('div')?.offsetWidth || 0;
    const itemGap = 24; // 6 * 4px (the space-x-6 class)
    const resetPoint = reviews.length * (firstItemWidth + itemGap);

    const scroll = () => {
      if (!scrollContainer) return;
      
      // Increment scroll position
      scrollPosition += scrollSpeed;
      scrollContainer.scrollLeft = scrollPosition;
      
      // When we reach the first duplicate set, reset to the beginning
      // This creates a seamless loop because the duplicate is identical
      if (scrollPosition >= resetPoint) {
        // Reset scroll position without visual jump
        scrollPosition = 0;
        // Use a DOM update technique that avoids reflow/repaint
        requestAnimationFrame(() => {
          scrollContainer.style.scrollBehavior = 'auto';
          scrollContainer.scrollLeft = scrollPosition;
          
          // Re-enable smooth behavior on the next frame
          requestAnimationFrame(() => {
            scrollContainer.style.scrollBehavior = '';
          });
        });
      }
      
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation with a short delay
    setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 100);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      // Save current position before restarting
      scrollPosition = scrollContainer.scrollLeft;
      animationId = requestAnimationFrame(scroll);
    };

    // Touch events for mobile - stop animation when touching
    const handleTouchStart = () => {
      cancelAnimationFrame(animationId);
    };

    const handleTouchEnd = () => {
      // Wait a bit after touch ends before resuming
      setTimeout(() => {
        scrollPosition = scrollContainer.scrollLeft;
        animationId = requestAnimationFrame(scroll);
      }, 1000);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [loading, error, reviews]);

  // Function to render stars based on rating
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

  // Function to get staggered position classes
  const getStaggeredPosition = (index: number) => {
    const positions = [
      "mt-0", 
      "mt-8", 
      "mt-4", 
      "mt-12", 
      "mt-6"
    ];
    return positions[index % positions.length];
  };

  return (
    <section className="w-full py-16 bg-[var(--color-primary)] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4 md:mb-0">{t('title')}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-primary)]">{t('poweredBy')}</span>
              <a 
                href="https://www.trustpilot.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-underline"
              >
                <span className="font-bold text-xl bg-gradient-to-r from-[#00b67a] to-[#007055] bg-clip-text text-transparent px-2 py-1 rounded">Trustpilot</span>
              </a>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-[var(--color-text-primary)]">{t('loading')}</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[200px] w-full text-red-500 text-center">
              <p>{error}</p>
            </div>
          ) : (
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto pb-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-6 pl-4 pr-20">
                {/* Original reviews */}
                {reviews.map((review, index) => (
                  <div 
                    key={review.id} 
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

                {/* First duplicate set */}
                {reviews.map((review, index) => (
                  <div 
                    key={`dup-1-${review.id}`} 
                    className={`flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${getStaggeredPosition(index + reviews.length)}`}
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

                {/* Second duplicate set - to ensure enough content for smooth looping */}
                {reviews.map((review, index) => (
                  <div 
                    key={`dup-2-${review.id}`} 
                    className={`flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${getStaggeredPosition(index + reviews.length * 2)}`}
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
          )}
          
          <div className="flex justify-center mt-8">
            <Button
              href="https://www.trustpilot.com/review/circlelink.eu"
              target="_blank"
              variant="blue"
            >
              {t('viewMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
