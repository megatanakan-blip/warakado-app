
import React from 'react';

const NostalgiaAddiction: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="relative h-64 md:h-80 bg-slate-900 rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
        <img src="https://picsum.photos/seed/nostalgia/1200/800" className="w-full h-full object-cover opacity-50" alt="Nostalgic Addiction" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="px-3 py-1 bg-amber-600 text-white text-[10px] font-bold rounded-full mb-4 tracking-widest uppercase">
            New Business Division
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
            nostalgic addiction
          </h2>
          <p className="text-white/80 max-w-md text-sm md:text-base">
            移動式エンターテインメントの新たな地平。古着と駄菓子で「あの日」の感動を。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        <section className="text-center">
          <h3 className="text-2xl font-black mb-6">キッチンカー第2の活用法</h3>
          <p className="text-gray-600 leading-relaxed mb-8">
            飽和状態のキッチンカー業界に、WARAKADOが投じる一石。
            それは単なる「飲食店」の枠を超えた、エンターテインメント空間の移動です。
            大好きな古着や駄菓子を積み込み、ノスタルジックな世界観を丸ごと必要な場所へ届けます。
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex flex-col items-center text-center">
            <i className="fa-solid fa-shirt text-4xl text-amber-800 mb-4"></i>
            <h4 className="font-bold text-lg mb-2">VINTAGE CLOTHING</h4>
            <p className="text-sm text-gray-500 italic">こだわり抜いた古着との出会い</p>
          </div>
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex flex-col items-center text-center">
            <i className="fa-solid fa-cookie text-4xl text-amber-800 mb-4"></i>
            <h4 className="font-bold text-lg mb-2">RETRO CANDY</h4>
            <p className="text-sm text-gray-500 italic">童心に帰る駄菓子体験</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] text-center shadow-lg">
          <h3 className="text-xl font-bold mb-4 underline decoration-amber-500 decoration-4 underline-offset-8">移動式エンターテインメントの理想</h3>
          <p className="text-sm text-gray-400 leading-relaxed italic">
            「必要な一人一人に、笑顔の入り口（門）を届ける」<br />
            WARAKADOが見つめる未来（VISION）が、この一台に凝縮されています。
          </p>
        </div>
      </div>
    </div>
  );
};

export default NostalgiaAddiction;
