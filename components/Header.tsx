
import React from 'react';
import { PageId, MemberInfo } from '../types';

interface HeaderProps {
  onNavigate: (page: PageId) => void;
  member: MemberInfo | null;
  currentPage: PageId;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, member, currentPage }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            W
          </div>
          <div>
            <h1 className="font-black text-lg leading-none text-orange-600">WARAKADO</h1>
            <p className="text-[10px] font-bold tracking-widest text-gray-500">VISION</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('member')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              currentPage === 'member' 
                ? 'bg-orange-100 text-orange-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className={`fa-solid ${member ? 'fa-id-card' : 'fa-user-plus'}`}></i>
            <span className="text-sm font-bold">{member ? '会員証' : '新規登録'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
