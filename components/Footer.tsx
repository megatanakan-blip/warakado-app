
import React from 'react';
import { PageId } from '../types';
import AdBanner from './AdBanner';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-black italic tracking-tighter mb-1">WARAKADO VISION</h2>
          <p className="text-sm text-slate-400">一人一人の「笑顔の門」きっかけに</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-300">
          <button onClick={() => onNavigate('home')} className="hover:text-white">Home</button>
          <button onClick={() => onNavigate('food')} className="hover:text-white">Food</button>
          <button onClick={() => onNavigate('rental')} className="hover:text-white">Rental</button>
          <button onClick={() => onNavigate('tarot')} className="hover:text-white">Tarot</button>
          <button onClick={() => onNavigate('design')} className="hover:text-white">Design</button>
          <button onClick={() => onNavigate('music')} className="hover:text-white">Music</button>
          <button onClick={() => onNavigate('nostalgia')} className="hover:text-white">Nostalgia</button>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a 
            href="https://www.instagram.com/warakado_cafe_space/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <i className="fa-brands fa-instagram text-xl"></i>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-white">cafe space</span>
          </a>
          <a 
            href="https://www.instagram.com/fuzoroino_ringo/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <i className="fa-brands fa-instagram text-xl"></i>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-white">林檎あめたち</span>
          </a>
          <a href="#" className="group flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
              <i className="fa-brands fa-x-twitter text-xl"></i>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-white">X</span>
          </a>
        </div>

        <div className="border-t border-slate-800 pt-8 mb-8">
          <AdBanner slot="footer-ad" className="bg-slate-800/50 p-4 rounded-2xl" />
        </div>

        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} WARAKADO VISION. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
