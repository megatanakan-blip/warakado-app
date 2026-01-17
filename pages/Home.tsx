
import React from 'react';
import { PageId } from '../types';
import { MENU_ITEMS } from '../constants';
import AdBanner from '../components/AdBanner';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <section className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold mb-4">
          MOBILE ENTERTAINMENT VISION
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
          必要な時に、必要な場所へ<br />
          <span className="text-orange-500">「笑顔の門」</span>を届けます。
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          WARAKADO VISIONは、キッチンカーを起点とした「移動式エンターテインメント」を追求しています。
          食、癒やし、音楽、ノスタルジー。私たちは一人一人の笑顔のきっかけを創り出すことを使命としています。
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group relative bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-orange-200 text-center overflow-hidden"
          >
            <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h3 className="font-bold text-gray-800 break-words text-sm md:text-base">{item.title}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-bold group-hover:text-orange-500 transition-colors">VIEW MORE</p>
          </button>
        ))}
      </div>

      <AdBanner slot="home-middle-ad" className="max-w-xl mx-auto" />

      <div className="bg-warakado-gradient rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-lg mt-8">
        <div className="flex-1">
          <h3 className="text-2xl font-black mb-2">笑う門には福来る</h3>
          <p className="text-sm opacity-90 leading-relaxed mb-4">
            「WARAKADO」の由来は私たちの座右の銘。キッチンカーというエンターテインメントを通じて、
            北海道から全国へ、ニーズに沿った「福」を運びます。
          </p>
          <button 
            onClick={() => onNavigate('member')}
            className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-sm shadow-sm hover:bg-orange-50 transition-colors"
          >
            会員登録で特典をゲット！
          </button>
        </div>
        <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
          <i className="fa-solid fa-face-smile text-7xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Home;
