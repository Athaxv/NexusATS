import React from 'react';

const logos = [
  { name: 'Acme Corp', icon: 'M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.75l-2.5 1.25L12 11zm0 2.25l-5-2.5-5 2.5L12 22l10-8.75-5-2.5-5 2.5z' },
  { name: 'Quantum', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  { name: 'Echo', icon: 'M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' },
  { name: 'Nebula', icon: 'M12 2L1 21h22L12 2zm0 3.8l7.53 13.2H4.47L12 5.8z' },
  { name: 'Vertex', icon: 'M2 2v20h20V2H2zm18 18H4V4h16v16z' },
  { name: 'Horizon', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.94-7-4.24-7.86-8.28h15.72c-.86 4.04-3.91 7.34-7.86 8.28z' },
];

const LogoTicker: React.FC = () => {
  return (
    <div className="w-full py-10 bg-slate-950/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Optimized for ATS Systems Used By</p>
      </div>
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-16 min-w-full items-center justify-around px-8">
          {logos.concat(logos).concat(logos).map((logo, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors duration-300">
               <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                 <path d={logo.icon} />
               </svg>
               <span className="text-xl font-bold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default LogoTicker;