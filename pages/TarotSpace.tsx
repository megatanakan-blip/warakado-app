
import React from 'react';
import { GOOGLE_FORM_LINKS } from '../constants';

const TarotSpace: React.FC = () => {
  return (
    <div className="animate-fade-in text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
        <i className="fa-solid fa-hat-wizard"></i>
      </div>
      <h2 className="text-3xl font-black mb-4">WARAKADO tarot space</h2>
      <p className="text-gray-600 mb-12 leading-relaxed">
        タロット占い資格を保持するオーナー自らが鑑定を行います。
        キッチンカーでのイベント出店や、メールでの個別鑑定も承っております。
      </p>

      <div className="grid gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">簡易メール鑑定</h3>
          <p className="text-purple-600 font-black text-2xl mb-4">¥1,000 <span className="text-sm font-normal text-gray-400">(税別)</span></p>
          <p className="text-sm text-gray-500 mb-6">フォームからお申し込みいただき、結果をメールにてお届けします。</p>
          <a 
            href={GOOGLE_FORM_LINKS.tarotRequest}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
          >
            鑑定・出店依頼フォーム
          </a>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            <i className="fa-solid fa-mobile-screen-button"></i>
            専用タロットアプリ
          </h3>
          <p className="text-sm opacity-80 mb-6">
            WARAKADOオリジナルのタロット占いアプリで、いつでもあなたの運勢をチェック。
          </p>
          <a 
            href="https://warakado-tarot-space-1036698507398.us-west1.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-black text-sm hover:bg-purple-50 transition-colors"
          >
            アプリを起動する
          </a>
        </div>
      </div>
    </div>
  );
};

export default TarotSpace;
