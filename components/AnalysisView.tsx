import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AtsAnalysis } from '../types';
import { Card, Badge, Button } from './ui/Components';
import { CheckCircle2, XCircle, TrendingUp, MessageSquare, ArrowRight, AlertTriangle, Wand2 } from 'lucide-react';

interface AnalysisViewProps {
  data: AtsAnalysis;
  onOpenChat: () => void;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count}</span>;
};

const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onOpenChat, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  const getScoreRing = (score: number) => {
    const radius = 88; // Matched to SVG r attribute
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    return { offset, circumference };
  };

  const { offset, circumference } = getScoreRing(data.score);

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 pt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Analysis Report</h2>
          <p className="text-slate-400 mt-1">Target Role: <span className="text-indigo-400 font-medium px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">{data.jobRoleMatch}</span></p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={onReset} className="flex-1 md:flex-none">New Upload</Button>
          <Button onClick={onOpenChat} className="flex-1 md:flex-none"><MessageSquare className="w-4 h-4 mr-2" /> AI Assistant</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />
            
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 192 192">
                {/* Background Ring */}
                <circle 
                  cx="96" cy="96" r="88" 
                  stroke="currentColor" strokeWidth="12" 
                  fill="transparent" 
                  className="text-slate-800" 
                />
                {/* Progress Ring */}
                <circle 
                  cx="96" cy="96" r="88" 
                  stroke="currentColor" strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className={`transition-all duration-1500 ease-out ${
                    data.score >= 80 ? 'text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                    data.score >= 60 ? 'text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                    'text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  }`} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-7xl font-bold tracking-tighter ${getScoreColor(data.score)}`}>
                  <CountUp end={data.score} />
                </span>
                <span className="text-slate-400 font-medium text-sm mt-2 uppercase tracking-widest">ATS Score</span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 w-full border border-slate-800">
               <p className="text-center text-slate-300 text-sm leading-relaxed">
                 {data.summary}
               </p>
            </div>
          </Card>
        </motion.div>

        {/* Keywords & Stats */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card className="h-full">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
               <div className="p-2 bg-cyan-500/10 rounded-lg">
                 <TrendingUp className="w-6 h-6 text-cyan-400" />
               </div>
               <h3 className="text-xl font-semibold text-white">Keyword Analysis</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.keywordsFound.length > 0 ? (
                      data.keywordsFound.map((kw, i) => (
                        <Badge key={i} variant="success" className="px-3 py-1 text-sm"><CheckCircle2 className="w-3 h-3 mr-1.5" /> {kw}</Badge>
                      ))
                    ) : (
                      <span className="text-slate-500 italic text-sm">No strong matches found.</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Critical Missing
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.missingKeywords.length > 0 ? (
                      data.missingKeywords.map((kw, i) => (
                        <Badge key={i} variant="danger" className="px-3 py-1 text-sm"><XCircle className="w-3 h-3 mr-1.5" /> {kw}</Badge>
                      ))
                    ) : (
                      <span className="text-emerald-500 text-sm flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Great job! No major keywords missing.</span>
                    )}
                  </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-4">Improvement Plan</h3>
                <div className="space-y-3">
                  {data.improvements.map((imp, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 transition-colors border border-slate-800 hover:border-slate-700">
                      <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        imp.priority === 'High' ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40' :
                        imp.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40' :
                        'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/40'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-slate-200 font-medium text-sm">{imp.title}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${
                             imp.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                             imp.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                             'bg-blue-500/10 text-blue-500'
                          }`}>{imp.priority}</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{imp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </Card>
        </motion.div>
      </div>

      {/* Line-by-Line Optimization Section */}
      {data.lineByLineAnalysis && data.lineByLineAnalysis.length > 0 && (
        <motion.div variants={itemVariants} className="w-full">
           <Card className="border-slate-800">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
               <div className="p-2 bg-indigo-500/10 rounded-lg">
                 <Wand2 className="w-6 h-6 text-indigo-400" />
               </div>
               <div>
                 <h3 className="text-xl font-semibold text-white">Smart Content Optimizer</h3>
                 <p className="text-sm text-slate-400">Line-by-line recommendations to maximize impact.</p>
               </div>
             </div>

             <div className="space-y-6">
               {data.lineByLineAnalysis.map((item, idx) => (
                 <div key={idx} className="group relative bg-slate-900/40 rounded-xl border border-slate-800 overflow-hidden">
                   <div className="grid grid-cols-1 md:grid-cols-2">
                     
                     {/* Original - Left Side */}
                     <div className="p-5 border-b md:border-b-0 md:border-r border-slate-800 bg-rose-900/5 relative">
                        <div className="absolute top-3 right-3">
                           <span className="text-[10px] uppercase font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">Before</span>
                        </div>
                        <p className="text-rose-200/80 line-through decoration-rose-500/50 decoration-2 font-mono text-sm leading-relaxed mt-4">
                          {item.originalText}
                        </p>
                     </div>

                     {/* Suggestion - Right Side */}
                     <div className="p-5 bg-emerald-900/5 relative">
                        <div className="absolute top-3 right-3">
                           <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Suggested</span>
                        </div>
                        <p className="text-emerald-300 font-medium text-sm leading-relaxed mt-4 flex items-start">
                          <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-emerald-500 flex-shrink-0" />
                          {item.suggestion}
                        </p>
                     </div>

                   </div>
                   
                   {/* Footer / Reason */}
                   <div className="bg-slate-950/50 px-5 py-3 border-t border-slate-800 flex items-start gap-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                         item.severity === 'High' ? 'text-amber-500' : 'text-blue-400'
                      }`} />
                      <p className="text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Why change this?</span> {item.reason}
                      </p>
                   </div>
                 </div>
               ))}
             </div>
           </Card>
        </motion.div>
      )}

    </motion.div>
  );
};

export default AnalysisView;