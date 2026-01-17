
import React, { useState, useEffect } from 'react';
import { MemberInfo } from '../types';
import { STAFF_PASS, GOOGLE_FORM_LINKS } from '../constants';

interface MembershipProps {
  member: MemberInfo | null;
  onRegister: (info: Partial<MemberInfo>) => void;
  onUpdatePoints: (points: number) => void;
}

// レシピ投稿の型定義
interface RecipePost {
  id: number;
  author: string;
  menuName: string;
  description: string;
  image: string; // Base64 or URL
  date: string;
}

// おみくじ結果の型定義
interface OmikujiResult {
  date: string;
  result: '大吉' | '中吉' | '小吉' | '吉' | '凶';
  benefit: string;
}

const Membership: React.FC<MembershipProps> = ({ member, onRegister, onUpdatePoints }) => {
  // 登録フォーム用State
  const [formData, setFormData] = useState({ nickname: '', email: '', gender: '男性', ageGroup: '30代' });
  
  // ポイントモーダル用State
  const [showPointModal, setShowPointModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 新機能用State
  const [activeTab, setActiveTab] = useState<'recipe' | 'omikuji' | 'instagram'>('recipe');
  
  // レシピ機能用
  const [recipes, setRecipes] = useState<RecipePost[]>([]);
  const [recipeForm, setRecipeForm] = useState({ menuName: '', description: '', image: '' });
  
  // おみくじ機能用
  const [omikujiResult, setOmikujiResult] = useState<OmikujiResult | null>(null);

  // Instagram機能用
  const [instaClaimedToday, setInstaClaimedToday] = useState(false);

  // 初期化：ローカルストレージからデータを読み込む
  useEffect(() => {
    if (member) {
      // レシピ読み込み
      const savedRecipes = localStorage.getItem('warakado_recipes');
      if (savedRecipes) setRecipes(JSON.parse(savedRecipes));

      // おみくじ読み込み
      const savedOmikuji = localStorage.getItem(`warakado_omikuji_${member.serialNumber}`);
      if (savedOmikuji) {
        const parsed = JSON.parse(savedOmikuji);
        if (parsed.date === new Date().toDateString()) {
          setOmikujiResult(parsed);
        }
      }

      // インスタ申請状況読み込み
      const savedInsta = localStorage.getItem(`warakado_insta_${member.serialNumber}`);
      if (savedInsta === new Date().toDateString()) {
        setInstaClaimedToday(true);
      }
    }
  }, [member]);

  // --- 既存の会員登録ロジック ---
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  // --- 既存のポイント付与ロジック ---
  const handlePointAdd = (amount: number = 1) => {
    const currentPoints = member?.points || 0;
    const nextPoints = currentPoints + amount;
    
    if (nextPoints >= 10) {
      alert('10ポイント達成！おめでとうございます！\nオリジナルグッズ引換券としてスタッフにご提示ください。');
      onUpdatePoints(0);
    } else {
      onUpdatePoints(nextPoints);
    }
  };

  const verifyStaffPassAndAddPoint = () => {
    if (password === STAFF_PASS) {
      handlePointAdd(1);
      setShowPointModal(false);
      setPassword('');
      setError('');
    } else {
      setError('パスワードが違います');
    }
  };

  const handleDownloadBackup = () => {
    if (!member) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(member));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `warakado_member_${member.serialNumber}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // --- ① アレンジレシピ投稿機能 ---
  const handleRecipeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    const newRecipe: RecipePost = {
      id: Date.now(),
      author: member.nickname,
      menuName: recipeForm.menuName,
      description: recipeForm.description,
      image: recipeForm.image || 'https://via.placeholder.com/300x200?text=No+Image',
      date: new Date().toLocaleDateString()
    };

    const updatedRecipes = [newRecipe, ...recipes];
    setRecipes(updatedRecipes);
    localStorage.setItem('warakado_recipes', JSON.stringify(updatedRecipes));
    setRecipeForm({ menuName: '', description: '', image: '' });
    alert('レシピを投稿しました！優秀賞に選ばれるとメニュー化されます！');
  };

  // --- ② おみくじ機能 ---
  const drawOmikuji = () => {
    if (!member) return;
    const today = new Date().toDateString();
    
    // 確率設定
    const r = Math.random() * 100; // 0-100
    let result: OmikujiResult['result'];
    let benefit = '';

    if (r < 2) { 
      result = '大吉'; benefit = '本日のお会計 30円引き';
    } else if (r < 12) { 
      result = '中吉'; benefit = '本日のお会計 20円引き';
    } else if (r < 72) { 
      result = '小吉'; benefit = '本日のお会計 10円引き';
    } else if (r < 80) { 
      result = '吉'; benefit = '1ポイントGET!';
      handlePointAdd(1);
    } else { 
      result = '凶'; benefit = '残念...ハズレ';
    }

    const newResult: OmikujiResult = { date: today, result, benefit };
    setOmikujiResult(newResult);
    localStorage.setItem(`warakado_omikuji_${member.serialNumber}`, JSON.stringify(newResult));
  };

  // --- ③ インスタグラム機能 ---
  const claimInstaPoint = () => {
    if (!member) return;
    const today = new Date().toDateString();
    
    // 実際はAPIで確認するが、デモなので自己申告制
    if (window.confirm('Instagramに「#warapp」をつけて投稿しましたか？\n（嘘の申請はアカウント停止の対象となります）')) {
      handlePointAdd(1);
      setInstaClaimedToday(true);
      localStorage.setItem(`warakado_insta_${member.serialNumber}`, today);
      alert('ありがとうございます！1ポイント付与されました。');
    }
  };

  // --- 未登録時の表示 ---
  if (!member) {
    return (
      <div className="animate-fade-in max-w-md mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black mb-6 text-center">WEB会員登録</h2>
          <p className="text-xs text-gray-500 mb-8 text-center">
            会員になるとデジタル会員証が発行され、お得なポイントカード機能が利用可能になります。
          </p>
          
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">ニックネーム (あだ名)</label>
              <input 
                type="text" required value={formData.nickname}
                onChange={e => setFormData({...formData, nickname: e.target.value})}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="例: たろう"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">メールアドレス</label>
              <input 
                type="email" required value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="example@mail.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">性別</label>
                <select 
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>男性</option>
                  <option>女性</option>
                  <option>回答しない</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">年代</label>
                <select 
                  value={formData.ageGroup}
                  onChange={e => setFormData({...formData, ageGroup: e.target.value})}
                  className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>10代</option><option>20代</option><option>30代</option><option>40代</option><option>50代</option><option>60代以上</option>
                </select>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-black mt-6 shadow-lg hover:bg-orange-600 transition-colors"
            >
              登録して会員証を発行
            </button>
          </form>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">Official Registration</p>
            <a 
              href={GOOGLE_FORM_LINKS.memberRegistration} 
              target="_blank" rel="noopener noreferrer"
              className="text-orange-500 text-sm font-bold flex items-center justify-center gap-2"
            >
              Googleフォームから登録する <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- 会員済み表示 ---
  return (
    <div className="animate-fade-in max-w-md mx-auto space-y-8">
      {/* 会員証カード */}
      <div className="bg-warakado-gradient rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden aspect-[1.6/1]">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black tracking-widest opacity-60 uppercase">Member Card</p>
              <h3 className="text-xl font-black italic">WARAKADO VISION</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-60 font-bold">SERIAL NO.</p>
              <p className="font-mono font-bold">{member.serialNumber}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] opacity-60 font-bold mb-1 uppercase tracking-widest">Card Holder</p>
            <p className="text-2xl font-black tracking-tight">{member.nickname} 様</p>
          </div>
        </div>
        
        {/* 装飾 */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-orange-400 opacity-20 rounded-full"></div>
      </div>

      {/* ポイントカード */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-end mb-6">
          <h4 className="font-black text-lg">Point Card</h4>
          <p className="text-sm font-bold text-orange-500">{member.points} / 10 Points</p>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-8">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                i < member.points 
                  ? 'bg-orange-500 border-orange-500 text-white scale-105' 
                  : 'bg-gray-50 border-gray-100 text-gray-200'
              }`}
            >
              <i className={`fa-solid ${i < member.points ? 'fa-check' : 'fa-circle'}`}></i>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowPointModal(true)}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-qrcode"></i>
          ポイント付与 (店員が操作)
        </button>
      </div>

      {/* --- 会員限定コンテンツエリア --- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-slate-900 text-white p-6 text-center">
          <h3 className="text-xl font-black italic tracking-wider text-orange-400">MEMBER'S CONTENTS</h3>
          <p className="text-xs text-gray-400">会員限定のお楽しみ機能</p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('recipe')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'recipe' ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-400'}`}
          >
            <i className="fa-solid fa-utensils block mb-1 text-lg"></i> レシピ
          </button>
          <button 
            onClick={() => setActiveTab('omikuji')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'omikuji' ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-400'}`}
          >
            <i className="fa-solid fa-dice block mb-1 text-lg"></i> おみくじ
          </button>
          <button 
            onClick={() => setActiveTab('instagram')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'instagram' ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-400'}`}
          >
            <i className="fa-brands fa-instagram block mb-1 text-lg"></i> #warapp
          </button>
        </div>

        {/* コンテンツ本体 */}
        <div className="p-6 bg-gray-50 min-h-[300px]">
          
          {/* ① アレンジレシピ */}
          {activeTab === 'recipe' && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-600 p-2 rounded-lg"><i className="fa-solid fa-pen-nib"></i></span>
                  アレンジレシピ募集中
                </h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  「肉巻きおにぎり棒」「豚すき丼」を使ったアレンジレシピを投稿しよう！優秀賞は実際のメニューとして採用されます！
                </p>
                <form onSubmit={submitRecipe} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="メニュー名 (例: チーズ豚すき丼)"
                      required
                      value={recipeForm.menuName}
                      onChange={e => setRecipeForm({...recipeForm, menuName: e.target.value})}
                      className="w-full bg-gray-100 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="特徴やレシピのポイント"
                      required
                      value={recipeForm.description}
                      onChange={e => setRecipeForm({...recipeForm, description: e.target.value})}
                      className="w-full bg-gray-100 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none h-20"
                    />
                  </div>
                  <div>
                    <label className="block w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <i className="fa-solid fa-camera text-gray-400 text-xl mb-1"></i>
                      <p className="text-xs text-gray-500">写真をアップロード</p>
                      <input type="file" accept="image/*" className="hidden" onChange={handleRecipeImageUpload} />
                    </label>
                    {recipeForm.image && (
                      <div className="mt-2 rounded-lg overflow-hidden h-32">
                        <img src={recipeForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm shadow-md">
                    投稿する
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-sm text-gray-500 pl-2">みんなの投稿</h5>
                {recipes.length === 0 && <p className="text-center text-xs text-gray-400 py-4">まだ投稿はありません</p>}
                {recipes.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-40 bg-gray-200">
                      <img src={recipe.image} alt={recipe.menuName} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800">{recipe.menuName}</h4>
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">{recipe.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{recipe.description}</p>
                      <p className="text-[10px] text-gray-400 text-right">by {recipe.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ② 運試しおみくじ */}
          {activeTab === 'omikuji' && (
            <div className="animate-fade-in text-center py-4">
              <h4 className="font-black text-xl mb-2 text-red-600">毎日運試し！</h4>
              <p className="text-xs text-gray-500 mb-8">
                1日1回挑戦できます。割引クーポンやポイントが当たるかも！？
                <br/>(有効期限：当日のみ)
              </p>

              {omikujiResult && omikujiResult.date === new Date().toDateString() ? (
                <div className="bg-white p-8 rounded-3xl border-4 border-red-500 shadow-xl relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-100 rounded-full"></div>
                  <p className="text-sm font-bold text-gray-400 mb-2">本日の結果</p>
                  <h3 className="text-6xl font-black text-red-600 mb-4 animate-scale-in">{omikujiResult.result}</h3>
                  <div className="bg-yellow-100 text-yellow-800 py-3 px-4 rounded-xl font-bold text-sm inline-block">
                    {omikujiResult.benefit}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4">スタッフにこの画面をご提示ください</p>
                </div>
              ) : (
                <button 
                  onClick={drawOmikuji}
                  className="w-64 h-64 rounded-full bg-red-600 text-white font-black text-2xl shadow-lg border-8 border-red-400 hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center mx-auto"
                >
                  <i className="fa-solid fa-hand-fist text-4xl mb-2"></i>
                  おみくじを引く
                </button>
              )}
              
              <div className="mt-8 text-left bg-white p-4 rounded-xl text-xs text-gray-500 border border-gray-200">
                <p className="font-bold mb-1">当選確率・特典</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>大吉 (2%) : 30円引き</li>
                  <li>中吉 (10%) : 20円引き</li>
                  <li>小吉 (60%) : 10円引き</li>
                  <li>吉 (8%) : 1ポイント付与</li>
                  <li>凶 (20%) : ハズレ</li>
                </ul>
              </div>
            </div>
          )}

          {/* ③ Instagram連携 */}
          {activeTab === 'instagram' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-2xl shadow-md">
                <div className="bg-white p-6 rounded-[14px] text-center">
                  <i className="fa-brands fa-instagram text-4xl text-pink-600 mb-3"></i>
                  <h4 className="font-bold text-lg mb-2">#warapp で投稿しよう</h4>
                  <p className="text-xs text-gray-600 mb-4">
                    WARAKADOの商品を撮影し、ハッシュタグ「#warapp」をつけてInstagramに投稿すると、<span className="font-bold text-orange-500">1ポイントプレゼント！</span>
                  </p>
                  
                  {instaClaimedToday ? (
                    <div className="bg-green-100 text-green-700 py-3 rounded-xl font-bold text-sm">
                      <i className="fa-solid fa-check mr-2"></i>本日は獲得済みです
                    </div>
                  ) : (
                    <button 
                      onClick={claimInstaPoint}
                      className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-slate-800 transition-colors w-full"
                    >
                      投稿しました！ (ポイントGET)
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-bold text-sm text-gray-500 mb-4 pl-2">#warapp の投稿一覧</h5>
                <div className="grid grid-cols-2 gap-2">
                   {/* モック画像：実際はInstagram Basic Display API等が必要 */}
                   {[1,2,3,4].map(n => (
                     <div key={n} className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
                        <img 
                          src={`https://picsum.photos/seed/insta${n}/300/300`} 
                          alt="Insta Post" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-[10px] truncate">Delicious food! #warapp</p>
                        </div>
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-2">※現在はイメージ画像を表示しています</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* データ管理セクション */}
      <div className="mt-8 border-t-2 border-dashed border-gray-200 pt-8 pb-8">
        <h4 className="text-sm font-bold text-gray-500 mb-4 flex items-center justify-center gap-2">
           <i className="fa-solid fa-gear"></i> データ管理
        </h4>
        <button 
          onClick={handleDownloadBackup}
          className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-download text-orange-400"></i>
          会員データを端末に保存 (バックアップ)
        </button>
      </div>

      {/* ポイント付与用モーダル */}
      {showPointModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-scale-in">
            <h5 className="text-lg font-black mb-2 text-center">スタッフ用パスワード</h5>
            <p className="text-xs text-gray-500 text-center mb-6">店員の方にパスワード入力を依頼してください。</p>
            
            <input 
              type="password"
              maxLength={4}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full text-center text-4xl tracking-widest border-2 border-gray-100 rounded-2xl py-4 focus:border-orange-500 outline-none mb-4 font-mono"
              placeholder="••••"
              autoFocus
            />
            
            {error && <p className="text-red-500 text-xs text-center mb-4 font-bold">{error}</p>}
            
            <div className="flex gap-4">
              <button 
                onClick={() => { setShowPointModal(false); setPassword(''); setError(''); }}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold"
              >
                キャンセル
              </button>
              <button 
                onClick={verifyStaffPassAndAddPoint}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg"
              >
                認証
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
