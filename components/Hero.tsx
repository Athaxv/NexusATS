import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import { Button, Badge } from './ui/Components';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center z-10"
      >
        <Badge variant="default" ><Sparkles className="w-3 h-3 mr-1 inline" /> AI-Powered Resume Analysis</Badge>
        
        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Optimize your Resume <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            for the Future
          </span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlock hidden opportunities with our advanced Gemini-powered ATS scanner. 
          Get instant scoring, keyword gap analysis, and tailored improvements.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={onStart} className="h-12 px-8 text-lg rounded-full shadow-indigo-500/25">
            <Upload className="mr-2 h-5 w-5" />
            Analyze My Resume
          </Button>
          <Button variant="outline" className="h-12 px-8 text-lg rounded-full border-slate-600 hover:bg-slate-800/50">
            View Sample Report
          </Button>
        </div>

        {/* Floating UI Elements Decor */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 relative w-full max-w-4xl mx-auto h-64 hidden md:block"
        >
          <div className="absolute left-0 top-0 p-4 glass-card rounded-lg transform -rotate-6 w-64">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">92</div>
              <div className="h-2 w-24 bg-slate-700 rounded-full"><div className="w-[92%] h-full bg-green-500 rounded-full"></div></div>
            </div>
            <div className="text-xs text-slate-400">Excellent ATS Compatibility</div>
          </div>

          <div className="absolute right-0 top-8 p-4 glass-card rounded-lg transform rotate-3 w-64">
             <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs">React</span>
                <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs">TypeScript</span>
                <span className="border border-indigo-500/30 text-indigo-300 px-2 py-1 rounded text-xs dashed">GraphQL?</span>
             </div>
             <div className="mt-2 text-xs text-slate-400">Keyword Gap Analysis</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;