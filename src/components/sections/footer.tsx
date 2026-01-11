import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black/10 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <span className="text-xl font-normal tracking-tighter text-black">
              EXECUTE
            </span>
          </div>
          
            <nav className="flex items-center">
              <a 
                href="/terms" 
                className="text-[12px] font-normal uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                Terms & Conditions
              </a>
            </nav>
        </div>

        <div className="mt-4 sm:mt-0">
          <p className="text-[12px] font-normal uppercase tracking-widest text-black/40">
            © {new Date().getFullYear()} Execute. Powered by Abhinav. Speed over bureaucracy.
          </p>
        </div>
      </div>
    </footer>
  );
}
