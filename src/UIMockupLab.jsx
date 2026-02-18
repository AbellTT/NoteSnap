import React, { useState } from 'react';
import LOGO_PATH from './assets/notesnap-logo.svg';
import MASCOT_PATH from './assets/notesnap-mascot.svg';

// --- STAGE 1: SIGNUP PORTAL ---
export const Stage1 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex items-center justify-center p-20">
    <div className="w-full max-w-md bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-10 border border-gray-100">
      <div className="text-center mb-10">
        <img src={LOGO_PATH} alt="NoteSnap Logo" className="w-12 h-12 mx-auto mb-6 drop-shadow-sm" />
        <h1 className="text-3xl font-dela text-[#151515] mb-2 tracking-tight">Join NoteSnap</h1>
        <p className="font-sk text-gray-500 font-bold">Start your digital memory journey</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block font-sk font-bold text-[#151515] mb-2 text-sm uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            placeholder="name@company.com"
            className="w-full px-4 py-3 rounded-lg border-2 border-[#151515] font-sk focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all placeholder:text-gray-300"
          />
        </div>
        <div>
          <label className="block font-sk font-bold text-[#151515] mb-2 text-sm uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border-2 border-[#151515] font-sk focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all placeholder:text-gray-300"
          />
        </div>
        
        <button className="w-full bg-[#3B82F6] text-white font-dela py-4 rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]">
          Join NoteSnap
        </button>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 font-sk font-bold text-gray-300 text-xs uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>
        
        <button className="w-full bg-white border-2 border-gray-100 text-[#151515] font-sk font-bold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
);

// --- STAGE 2: CAPTURE CHAOS ---
export const Stage2 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex flex-col p-20 relative">
    <div className="flex-grow flex flex-col items-center justify-center border-4 border-dashed border-[#3B82F6]/30 rounded-3xl bg-blue-50/20 group hover:bg-blue-50/40 transition-colors cursor-pointer relative">
      <img src={MASCOT_PATH} alt="Mascot" className="absolute top-8 right-8 w-20 h-20 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
      <div className="bg-[#3B82F6] w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6 animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <h2 className="text-3xl font-dela text-[#151515] mb-2">Drag handwritten notes here</h2>
      <p className="font-sk text-gray-400 font-bold">Supported formats: JPG, PNG, PDF (Max 20MB)</p>
    </div>
    
    <div className="mt-12">
      <h3 className="font-sk font-bold text-[#151515] mb-6 uppercase tracking-widest text-sm flex items-center gap-3">
        Recent Chaos
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      </h3>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-[4/5] bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="font-dela text-[#3B82F6] text-xs">Processing...</span>
            </div>
            {/* Minimalist "messy note" pattern */}
            <div className="p-4 space-y-3 opacity-30">
              <div className="h-2 w-3/4 bg-black rounded"></div>
              <div className="h-2 w-1/2 bg-black rounded"></div>
              <div className="h-2 w-2/3 bg-black rounded"></div>
              <div className="h-32 w-full border border-black/20 rounded-md"></div>
              <div className="h-2 w-full bg-black rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- STAGE 3: AI MAGIC ---
export const Stage3 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex p-10 gap-10">
    <div className="flex-grow flex flex-col bg-[#151515] rounded-2xl overflow-hidden relative border border-gray-800 shadow-2xl">
      {/* Scanning Bar Animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#3B82F6] shadow-[0_0_20px_#3B82F6] z-30 animate-[scan_4s_infinite_linear]"></div>
      
      {/* Content Transformation */}
      <div className="flex h-full font-sk">
        {/* Left: Messy Source */}
        <div className="w-1/2 h-full p-12 border-r border-[#151515] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
          <h4 className="text-gray-500 uppercase tracking-tighter text-[10px] mb-8 font-bold opacity-50">Handwritten Source</h4>
          <div className="space-y-6 opacity-40 grayscale">
             {/* Scribble blocks */}
             <div className="h-6 w-full bg-white/20 rounded-lg transform rotate-[-1deg]"></div>
             <div className="h-6 w-4/5 bg-white/20 rounded-lg transform rotate-[1deg]"></div>
             <div className="h-6 w-11/12 bg-white/20 rounded-lg transform rotate-[-0.5deg]"></div>
             <div className="h-24 w-full border border-white/20 rounded-xl"></div>
             <div className="h-6 w-full bg-white/20 rounded-lg transform rotate-[1.5deg]"></div>
          </div>
        </div>

        {/* Right: Digital Output */}
        <div className="w-1/2 h-full p-12 flex flex-col justify-center">
          <h4 className="text-[#3B82F6] uppercase tracking-tighter text-[10px] mb-8 font-bold">Transcribing...</h4>
          <div className="space-y-6 font-mono text-white/90">
             <div className="h-6 w-full bg-[#3B82F6]/20 border-l-2 border-[#3B82F6] flex items-center px-4 text-xs"># Project Strategy 2024</div>
             <div className="h-6 w-3/4 bg-white/5 flex items-center px-4 text-xs font-bold text-white/40 italic">...analyzing handwriting...</div>
             <div className="h-6 w-11/12 bg-[#3B82F6]/10 border-l-2 border-[#3B82F6] flex items-center px-4 text-xs">## Core Objectives</div>
             <div className="h-24 w-full bg-white/5 rounded-xl border border-white/10 p-4 text-[10px] leading-relaxed">
               - Streamline internal workflows<br/>
               - Reduce data silos by 40%<br/>
               - Automate extraction from legal docs
             </div>
             <div className="h-6 w-full bg-[#3B82F6]/20 border-l-2 border-[#3B82F6] flex items-center px-4 text-xs">[✓] Transcription 98% Accurate</div>
          </div>
        </div>
      </div>
      
      {/* Overlay Status */}
      <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></div>
        <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">AI Insight Active</span>
      </div>
    </div>
  </div>
);

// --- STAGE 4: INSTANT CLARITY ---
export const Stage4 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex">
    {/* Metadata Sidebar */}
    <div className="w-72 h-full border-r border-gray-100 p-8 flex flex-col bg-gray-50/30">
      <div className="mb-10">
        <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
          <img src={LOGO_PATH} alt="Logo" className="w-8 h-8 invert brightness-200" />
        </div>
        <h3 className="font-dela text-[#151515] text-sm tracking-tight leading-none">Smart Editor</h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <span className="block text-[10px] uppercase font-sk font-bold text-gray-300 tracking-widest mb-3">Source Metadata</span>
          <div className="p-3 bg-white border border-gray-100 rounded-lg">
            <div className="text-[10px] font-sk font-bold text-[#151515] mb-1">IMAGE_042.PNG</div>
            <div className="text-[9px] font-sk text-gray-400">Captured: Oct 12, 2:45 PM</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <span className="block text-[10px] uppercase font-sk font-bold text-gray-300 tracking-widest mb-3">Quick Tags</span>
          <div className="flex flex-wrap gap-2">
            {['Meeting', 'Strategy', 'High Priority'].map(tag => (
              <span key={tag} className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-[9px] font-bold rounded-md">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto opacity-20 hover:opacity-100 transition-opacity">
        <div className="h-6 w-full bg-gray-200 rounded-md mb-2"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded-md"></div>
      </div>
    </div>

    {/* Main Editor */}
    <div className="flex-grow p-16 font-sk overflow-y-auto no-scrollbar">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-dela text-[#151515] mb-4">Meeting Insights</h1>
        <div className="flex items-center gap-4 mb-12 py-4 border-y border-gray-100">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200`}></div>)}
          </div>
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Shared with 4 Strategists</span>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-[#3B82F6] font-dela text-xl mb-6">Core Decisions</h2>
            <ul className="space-y-4">
              {[
                "Adopt NoteSnap for all internal knowledge management",
                "Phase out physical whiteboards by Q4",
                "Integrate with current Slack/Notion workflow"
              ].map(item => (
                <li key={item} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-xl group transition-all hover:bg-[#3B82F6]/5 hover:translate-x-1">
                  <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[#3B82F6]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <span className="text-lg font-bold text-[#151515] opacity-80 group-hover:opacity-100">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[#151515] font-dela text-xl mb-6">Next Actions</h2>
            <div className="p-8 bg-brand-text rounded-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
               <p className="text-2xl font-sk font-bold mb-4 italic opacity-95">"The future belongs to the organized."</p>
               <p className="text-sm opacity-60 font-medium">Auto-summarized by NoteSnap AI</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

// --- STAGE 5: SMART LIBRARY ---
export const Stage5 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex overflow-hidden">
    {/* Navigation Sidebar */}
    <div className="w-64 h-full border-r border-gray-100 p-8 flex flex-col bg-white">
      <div className="flex items-center gap-3 mb-10 px-2">
        <img src={LOGO_PATH} alt="Logo" className="w-8 h-8" />
        <span className="font-dela text-sm text-[#151515]">NoteSnap</span>
      </div>
      
      <nav className="space-y-2">
        {['Dashboard', 'Recent', 'Starred', 'Library'].map((item, i) => (
          <div key={item} className={`flex items-center gap-3 p-3 rounded-lg font-sk font-bold text-sm ${i === 3 ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-gray-400 hover:bg-gray-50 cursor-pointer'}`}>
            <div className={`w-4 h-4 rounded ${i === 3 ? 'bg-[#3B82F6]' : 'bg-gray-200'}`}></div>
            {item}
          </div>
        ))}
      </nav>
      
      <div className="mt-auto p-4 bg-gray-50 rounded-xl">
        <div className="h-2 w-full bg-gray-200 rounded-full mb-2"></div>
        <div className="h-2 w-2/3 bg-gray-200 rounded-full mb-4"></div>
        <button className="w-full py-2 bg-white border border-gray-200 rounded-lg font-sk font-bold text-[10px] uppercase tracking-widest">Upgrade Pro</button>
      </div>
    </div>

    {/* Main Gallery */}
    <div className="flex-grow p-12 overflow-y-auto no-scrollbar">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-6 flex items-center">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search your knowledge..." 
            className="w-full pl-16 pr-6 py-5 bg-white rounded-2xl border-2 border-gray-100 font-sk focus:border-[#3B82F6] outline-none shadow-sm text-lg transition-all"
          />
          <div className="absolute inset-y-0 right-6 flex items-center">
             <div className="w-[3px] h-6 bg-[#3B82F6] animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
        {[
          { title: 'Strategy 2024', count: 12, color: 'bg-blue-500' },
          { title: 'Personal Ideas', count: 45, color: 'bg-purple-500' },
          { title: 'Drafts & Notes', count: 8, color: 'bg-orange-500' },
          { title: 'Client Briefs', count: 23, color: 'bg-green-500' },
          { title: 'Project X', count: 5, color: 'bg-red-500' },
          { title: 'Archive', count: 128, color: 'bg-gray-500' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group cursor-pointer">
            <div className={`w-12 h-12 ${card.color} rounded-xl mb-6 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            <h4 className="font-dela text-[#151515] text-lg mb-1">{card.title}</h4>
            <p className="font-sk text-gray-400 font-bold text-xs uppercase tracking-widest">{card.count} Items</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- STAGE 6: EXPORT MODAL ---
export const Stage6 = () => (
  <div className="w-full h-full bg-[#FDFDFD] flex items-center justify-center relative">
    {/* Blurred Dashboard Background */}
    <div className="absolute inset-0 grayscale opacity-10 pointer-events-none scale-110">
      <Stage5 />
    </div>
    
    {/* Modal */}
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-gray-100 p-10 z-10 scale-110">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-dela text-[#151515] tracking-tight">Export & Connect</h2>
        <div className="p-2 bg-gray-50 rounded-lg cursor-pointer">
           <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
      </div>
      
      <div className="space-y-4 mb-10">
        {[
          { name: 'Notion', icon: 'bg-black', status: 'Connected' },
          { name: 'Slack', icon: 'bg-[#4A154B]', status: 'Connected' },
          { name: 'Google Docs', icon: 'bg-[#4285F4]', status: 'Disconnected' },
        ].map(app => (
          <div key={app.name} className="flex items-center justify-between p-4 border-2 border-gray-50 rounded-xl hover:border-[#3B82F6]/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${app.icon} rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase`}>
                {app.name[0]}
              </div>
              <div>
                <span className="block font-sk font-bold text-[#151515] text-sm">{app.name}</span>
                <span className={`text-[10px] font-sk font-bold uppercase tracking-widest ${app.status === 'Connected' ? 'text-green-500' : 'text-gray-300'}`}>
                  {app.status}
                </span>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${app.status === 'Connected' ? 'bg-[#3B82F6]' : 'bg-gray-100'}`}>
               <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${app.status === 'Connected' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4">
        <button className="flex-grow bg-[#3B82F6] text-white font-dela py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 active:scale-[0.98]">
          Export to Workspace
        </button>
        <button className="px-6 border-2 border-gray-100 font-sk font-bold text-[#151515] rounded-xl hover:bg-gray-50 transition-colors">
          PDF
        </button>
      </div>
      
      {/* Toast Success */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xs bg-brand-text text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div>
          <p className="text-xs font-sk font-bold">Workflow Connected</p>
          <p className="text-[10px] opacity-60">Strategy Sync is now active</p>
        </div>
      </div>
    </div>
  </div>
);

const stages = [
  { id: 1, name: '1. Join Portal', component: Stage1 },
  { id: 2, name: '2. Cloud Upload', component: Stage2 },
  { id: 3, name: '3. AI Scanner', component: Stage3 },
  { id: 4, name: '4. Note Editor', component: Stage4 },
  { id: 5, name: '5. Smart Library', component: Stage5 },
  { id: 6, name: '6. Export Modal', component: Stage6 },
];

const UIMockupLab = () => {
  const [activeStage, setActiveStage] = useState(1);
  const CurrentStage = stages.find(s => s.id === activeStage).component;

  return (
    <div className="fixed inset-0 bg-gray-100 z-[9999] flex font-sk overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-xl relative z-10">
        <div className="mb-8">
          <h2 className="text-xl font-dela text-brand-text mb-1">UI Lab</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Screenshot Generator</p>
        </div>
        
        <div className="flex-grow space-y-2">
          {stages.map(stage => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${
                activeStage === stage.id 
                  ? 'bg-brand-action text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {stage.id}. {stage.name.split('. ')[1]}
            </button>
          ))}
        </div>
        
        <div className="mt-auto pt-6 border-t border-gray-100 text-[10px] text-gray-300 font-bold leading-relaxed uppercase tracking-tighter">
          Instructions:<br />
          1. Select Stage<br />
          2. Use Win+Shift+S (Snipping Tool)<br />
          3. Capture the center UI area<br />
          4. Save as .png
        </div>
      </div>

      {/* Stage Canvas */}
      <div className="flex-grow h-full bg-gray-200 overflow-auto p-20 flex items-center justify-center">
        <div className="w-[1280px] h-[720px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden relative">
          {/* Browser-like window frame (subtle) */}
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-1.5 z-20">
             <div className="w-3 h-3 rounded-full bg-red-400 opacity-50"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-50"></div>
             <div className="w-3 h-3 rounded-full bg-green-400 opacity-50"></div>
             <div className="ml-4 h-4 w-64 bg-gray-200/50 rounded-full"></div>
          </div>
          
          <div className="pt-8 h-full">
            <CurrentStage />
          </div>
        </div>
      </div>
      
      {/* Exit Button */}
      <button 
        onClick={() => window.history.back()}
        className="fixed top-6 right-6 bg-brand-text text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl z-[10000]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default UIMockupLab;
