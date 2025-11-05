import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  location?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
            >
              <div className="bg-card/40 backdrop-blur-md rounded-2xl p-6 border border-primary/30 shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 h-full group">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 fill-primary text-primary group-hover:fill-secondary group-hover:text-secondary transition-colors" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 mb-4 leading-relaxed min-h-[80px] transition-colors">
                  "{testimonial.review}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">- {testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full border-primary/40 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {testimonials.slice(0, Math.min(testimonials.length, 5)).map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 hover:from-primary hover:to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="w-10 h-10 rounded-full border-primary/40 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Auto-rotating every 5 seconds
        </p>
      </div>
    </div>
  );
};
