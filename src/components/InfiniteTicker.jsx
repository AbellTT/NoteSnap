import React from 'react';

const InfiniteTicker = () => {
  const tickerItems = [
    "✨ 50,000+ Notes Processed",
    "⚡ 98% Accuracy Rate",
    "🚀 Trusted by 10,000+ Students",
    "📸 Snap & Organize Instantly",
    "🤖 AI-Powered Recognition",
    "⚡ Instant Summaries",
    "📱 Works Anywhere",
    "🔒 Secure & Private",
    "✅ No Signup Required",
    "💯 Free to Start"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-brand-bg via-white to-brand-bg border-y border-black/5" style={{ maxHeight: '100px' }}>
      <div className="flex items-center h-full py-6">
        {/* First set of items */}
        <div className="flex items-center gap-12 animate-scroll-left whitespace-nowrap">
          {tickerItems.map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-black/5 shadow-sm"
            >
              <span className="text-brand-text font-sk text-base lg:text-lg font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-12 animate-scroll-left whitespace-nowrap ml-12">
          {tickerItems.map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-black/5 shadow-sm"
            >
              <span className="text-brand-text font-sk text-base lg:text-lg font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteTicker;
