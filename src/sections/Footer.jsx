import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Summaries", "Scanning", "Pricing", "Support"]
    },
    {
      title: "Company",
      links: ["About Us", "Our Robot", "Careers", "Contact"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 py-20 px-6 sm:px-12 md:px-20">
      <div className="mx-auto mb-20 text-center">
        <h1 className="font-dela text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tighter text-brand-text">
          NoteSnap
        </h1>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Dynamic Links */}
        {footerLinks.map((section, i) => (
          <div key={i} className="flex flex-col gap-6">
            <h4 className="font-dela text-lg text-brand-text">
              {section.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {section.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="text-gray-400 font-sk hover:text-brand-action transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-400 font-sk text-sm">
          © {currentYear} NoteSnap. All rights reserved. 
        </p>
        
        <div className="flex items-center gap-8">
           <a href="#" className="text-gray-400 font-sk text-sm hover:text-brand-text">Twitter</a>
           <a href="#" className="text-gray-400 font-sk text-sm hover:text-brand-text">LinkedIn</a>
           <a href="#" className="text-gray-400 font-sk text-sm hover:text-brand-text">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
