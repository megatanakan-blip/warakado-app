
import React from 'react';
import { GOOGLE_FORM_LINKS } from '../constants';

const DesignWorks: React.FC = () => {
  const services = [
    { icon: 'fa-note-sticky', title: 'メニューPOP製作', desc: '店頭で目を引く、美味しさが伝わるデザイン。' },
    { icon: 'fa-flag', title: 'のぼり旗・ポスター', desc: '遠くからでも視認性の高い販促ツールのデザイン。' },
    { icon: 'fa-scroll', title: 'ターポリン・幕', desc: 'キッチンカーの顔となるオリジナル幕の製作。' },
    { icon: 'fa-scissors', title: 'カッティングシート', desc: '車両や店舗を彩るオリジナルロゴステッカー。' },
    { icon: 'fa-video', title: 'PR・ショート動画編集', desc: 'SNS時代に欠かせない、魅力的な動画プロモーション。' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-black mb-4 border-l-8 border-pink-500 pl-4">WARAKADO design works</h2>
      <p className="text-gray-600 mb-12 leading-relaxed">
        飲食店運営の経験を活かし、現場で「本当に使える」デザインをご提案します。
        看板、ステッカーから動画編集まで、ブランディングをトータルサポート。
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s, idx) => (
          <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              <i className={`fa-solid ${s.icon}`}></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-900 rounded-3xl p-8 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-4 italic">CREATIVE POWER</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-md">
            一部外部委託を含め、各分野のスペシャリストと連携。あなたのビジネスを視覚からアップデートします。
          </p>
          <a 
            href={GOOGLE_FORM_LINKS.designRequest}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors shadow-lg"
          >
            お問い合わせ
          </a>
        </div>
        <i className="fa-solid fa-wand-magic-sparkles absolute -right-10 -bottom-10 text-[12rem] opacity-10"></i>
      </div>
    </div>
  );
};

export default DesignWorks;
