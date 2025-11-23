import React, { useState } from 'react';
import { Chat } from "@google/genai";
import { AppState, AtsAnalysis } from './types';
import { analyzeResume, createChatSession, fileToBase64 } from './services/geminiService';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import AnalysisView from './components/AnalysisView';
import ChatAssistant from './components/ChatAssistant';
import LogoTicker from './components/LogoTicker';
import BentoGrid from './components/BentoGrid';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';
import { Badge } from './components/ui/Components';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisData, setAnalysisData] = useState<AtsAnalysis | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);

    try {
      const base64 = await fileToBase64(file);
      const mimeType = file.type;

      // Parallel execution: Analyze data AND initialize chat context
      // Note: We use the same base64 for both.
      const dataPromise = analyzeResume(base64, mimeType);
      
      const data = await dataPromise;
      const session = await createChatSession(base64, mimeType);

      setAnalysisData(data);
      setChatSession(session);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to analyze resume. Please try again or check your API key.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setAnalysisData(null);
    setChatSession(null);
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 bg-slate-950">
      
      {/* Navigation - Hidden during analysis */}
      {appState !== AppState.ANALYZING && (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-bold text-white text-xl">N</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">Nexus ATS</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all border border-slate-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`${appState === AppState.ANALYZING ? 'pt-0 justify-center' : 'pt-24'} min-h-screen flex flex-col relative`}>
        
        {appState === AppState.IDLE && (
          <>
            <Hero onStart={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })} />
            
            <LogoTicker />
            
            <div id="upload-section" className="py-24 bg-slate-950 relative border-t border-slate-900">
               <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
               <div className="container mx-auto px-4 relative z-10 text-center">
                  <Badge variant="default" className="mb-4 bg-indigo-500/10 text-indigo-300 border-indigo-500/20">Free Analysis</Badge>
                  <h2 className="text-3xl font-bold text-white mb-4">Check your Resume Score</h2>
                  <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                    Drag and drop your PDF below to get instant feedback on keywords, formatting, and ATS compatibility.
                  </p>
                  <UploadZone onFileSelect={handleFileUpload} isAnalyzing={false} />
               </div>
            </div>

            <BentoGrid />
            <Testimonials />
            <Pricing />
            <Footer />
          </>
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[80vh] w-full">
            <UploadZone onFileSelect={() => {}} isAnalyzing={true} />
          </div>
        )}

        {appState === AppState.RESULTS && analysisData && (
          <div className="min-h-screen bg-slate-950 pb-20">
            <AnalysisView 
              data={analysisData} 
              onOpenChat={() => setIsChatOpen(true)}
              onReset={handleReset}
            />
          </div>
        )}

        {appState === AppState.ERROR && (
           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[80vh]">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                <Loader2 className="w-8 h-8 text-red-500 animate-pulse" /> 
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Analysis Failed</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-6">{errorMsg}</p>
              <button 
                onClick={handleReset}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors border border-slate-700 shadow-lg"
              >
                Try Again
              </button>
           </div>
        )}
      </main>

      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        chatSession={chatSession} 
      />
    </div>
  );
}