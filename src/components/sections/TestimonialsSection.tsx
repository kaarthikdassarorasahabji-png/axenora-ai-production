import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "CEO",
    company: "TechStart Solutions",
    content: "Axenora AI completely transformed how we handle customer inquiries. Our response time went from hours to seconds, and our conversion rate increased by 340%.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    name: "Rajesh Kumar",
    role: "Founder",
    company: "GrowthHub Marketing",
    content: "The AI calling agents are incredible. They handle 80% of our outbound calls, booking more appointments than our human team ever could. Game-changing technology.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    name: "Arjun Patel",
    role: "Owner",
    company: "FitLife Gym Chain",
    content: "WhatsApp automation was exactly what we needed. Our follow-up messages and payment reminders now run on autopilot. Saved us 40+ hours per week.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    name: "Neha Gupta",
    role: "Marketing Director",
    company: "StyleHub",
    content: "The AI-powered ads optimization has reduced our customer acquisition cost by 60% while doubling our conversion rate. Best investment we've made this year.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Amit Singh",
    role: "CTO",
    company: "FinTech Innovations",
    content: "The AI chatbot reduced our customer support tickets by 70% while maintaining a 98% satisfaction rate. It's like having a 24/7 support team.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Sneha Reddy",
    role: "Operations Manager",
    company: "QuickDeliver",
    content: "Automating our order confirmations and delivery updates with Axenora has improved our customer satisfaction scores by 45%. Highly recommended!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 20, scale: isActive ? 1 : 0.95 }}
    transition={{ duration: 0.5 }}
    className={`relative bg-card p-8 rounded-2xl border-2 ${isActive ? 'border-primary/30 shadow-xl' : 'border-transparent shadow-lg'} transition-all duration-300`}
  >
    <div className="absolute -top-4 -right-4 bg-primary text-white p-2 rounded-full">
      <Quote className="h-5 w-5" />
    </div>
    
    <div className="flex items-center gap-4 mb-6">
      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold">{testimonial.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{testimonial.role}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-primary font-medium">{testimonial.company}</span>
        </div>
      </div>
    </div>
    
    <div className="mb-4 flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
    
    <p className="text-muted-foreground text-lg leading-relaxed">"{testimonial.content}"</p>
  </motion.div>
);

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const visibleTestimonials = [
    currentIndex === 0 ? testimonials[testimonials.length - 1] : testimonials[currentIndex - 1],
    testimonials[currentIndex],
    currentIndex === testimonials.length - 1 ? testimonials[0] : testimonials[currentIndex + 1],
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What Our <span className="text-primary">Clients Say</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Don't just take our word for it. Here's what our clients have to say about their experience.
          </motion.p>
        </motion.div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-background p-3 rounded-full shadow-lg border border-border z-10 hover:bg-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.name}
                testimonial={testimonial}
                isActive={index === 1}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-background p-3 rounded-full shadow-lg border border-border z-10 hover:bg-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-primary' : 'w-3 bg-border'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
