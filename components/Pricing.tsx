import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button, Card, Badge } from './ui/Components';

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for a quick resume checkup.",
    features: ["1 Resume Analysis per day", "Basic ATS Scoring", "Keyword Matching", "Limited AI Chat Support"],
    cta: "Get Started",
    variant: "outline"
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious job seekers needing detailed insights.",
    features: ["Unlimited Analysis", "Deep Content Suggestions", "Full AI Career Coach Access", "Cover Letter Generation", "Priority Processing"],
    cta: "Upgrade to Pro",
    variant: "primary",
    popular: true
  },
  {
    name: "Lifetime",
    price: "$99",
    period: "/once",
    description: "One-time payment for career-long access.",
    features: ["All Pro Features", "Lifetime Updates", "LinkedIn Profile Audit", "Interview Prep Module", "Premium Support"],
    cta: "Get Lifetime Access",
    variant: "secondary"
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative" id="pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">pricing</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Start for free, upgrade for the ultimate career toolkit. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`relative flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 ${plan.popular ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10 bg-slate-900/80' : 'bg-slate-900/40 border-slate-800'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full text-center">
                  <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-flex items-center shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 ml-1">{plan.period}</span>}
                </div>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="flex-1 mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.variant as any} 
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border-0' : ''}`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;