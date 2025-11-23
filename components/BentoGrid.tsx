import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Search, Bot, BarChart3, FileText } from 'lucide-react';
import { Card } from './ui/Components';

const features = [
  {
    title: "Instant ATS Scoring",
    description: "Get a detailed score breakdown in seconds using Gemini's advanced natural language processing.",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    className: "md:col-span-2",
    bg: "bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/50"
  },
  {
    title: "Keyword Gap Analysis",
    description: "Identify missing hard skills and soft skills crucial for your target role.",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    className: "md:col-span-1",
    bg: "bg-slate-900/50"
  },
  {
    title: "Privacy First",
    description: "Your data is processed in-memory and never stored. What happens in Nexus, stays in Nexus.",
    icon: <Shield className="w-6 h-6 text-emerald-400" />,
    className: "md:col-span-1",
    bg: "bg-slate-900/50"
  },
  {
    title: "AI Career Coach",
    description: "Chat with a specialized AI agent that knows your resume inside out. Ask for rewrites, interview tips, or career advice.",
    icon: <Bot className="w-6 h-6 text-pink-400" />,
    className: "md:col-span-2",
    bg: "bg-gradient-to-bl from-pink-500/10 via-rose-500/5 to-slate-900/50"
  }
];

const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to <span className="text-gradient">land the interview</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Stop guessing what recruiters want. Our multi-layered analysis engine gives you the unfair advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${feature.className} group`}
            >
              <Card className={`h-full p-8 border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 ${feature.bg}`}>
                <div className="mb-6 p-3 bg-slate-800/50 w-fit rounded-xl border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                
                {/* Micro-interaction visual for first item */}
                {idx === 0 && (
                  <div className="mt-8 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="h-2 w-12 bg-indigo-500 rounded-full animate-pulse" />
                    <div className="h-2 w-8 bg-slate-700 rounded-full" />
                    <div className="h-2 w-16 bg-slate-700 rounded-full" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;