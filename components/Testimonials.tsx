import React from 'react';
import { Star } from 'lucide-react';
import { Card } from './ui/Components';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Software Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content: "I applied to 50 jobs with no response. After optimizing with Nexus, I got 3 interviews in a week. The keyword analysis is a game changer.",
    stars: 5
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "The AI Coach gave me specific rewrite suggestions that made my resume sound so much more impactful. It's like having a professional writer beside you.",
    stars: 5
  },
  {
    name: "Marcus Johnson",
    role: "Data Scientist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "Simple, fast, and effective. I love that it doesn't store my data. The UI is beautiful and the insights are actually actionable.",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Loved by <span className="text-indigo-400">Job Seekers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-slate-950/50 border-slate-800 hover:border-indigo-500/30 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <h4 className="text-white font-medium text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;