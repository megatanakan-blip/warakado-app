
import React, { useState, useEffect } from 'react';
import { PageId, MemberInfo } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FoodBusiness from './pages/FoodBusiness';
import RentalSpace from './pages/RentalSpace';
import TarotSpace from './pages/TarotSpace';
import DesignWorks from './pages/DesignWorks';
import VisionMusic from './pages/VisionMusic';
import NostalgiaAddiction from './pages/NostalgiaAddiction';
import Membership from './pages/Membership';

const App: React.FC = () => {
  // 現在表示しているページのIDを管理する状態
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  // 会員情報を管理する状態（未登録時はnull）
  const [member, setMember] = useState<MemberInfo | null>(null);

  // アプリ起動時にブラウザの保存領域（localStorage）から会員情報を読み込む
  useEffect(() => {
    const savedMember = localStorage.getItem('warakado_member');
    if (savedMember) {
      setMember(JSON.parse(savedMember));
    }
  }, []);

  // ページを切り替える関数
  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    // ページ遷移時に画面の最上部へスクロールさせる
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 新規会員登録を処理する関数
  const handleRegister = (info: Partial<MemberInfo>) => {
    const newMember: MemberInfo = {
      nickname: info.nickname || 'ゲスト',
      email: info.email || '',
      gender: info.gender || '未設定',
      ageGroup: info.ageGroup || '未設定',
      serialNumber: `WK-${Math.floor(1000 + Math.random() * 9000)}`,
      points: 0,
    };
    setMember(newMember);
    // ブラウザに保存して次回以降も保持する
    localStorage.setItem('warakado_member', JSON.stringify(newMember));
    setCurrentPage('member'); // 登録後は会員証ページへ移動
  };

  // ポイントを更新する関数
  const updatePoints = (newPoints: number) => {
    if (member) {
      const updated = { ...member, points: newPoints };
      setMember(updated);
      localStorage.setItem('warakado_member', JSON.stringify(updated));
    }
  };

  // 現在のPageIdに基づいて、表示するページコンポーネントを決定する
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handlePageChange} />;
      case 'food':
        return <FoodBusiness />;
      case 'rental':
        return <RentalSpace />;
      case 'tarot':
        return <TarotSpace />;
      case 'design':
        return <DesignWorks />;
      case 'music':
        return <VisionMusic />;
      case 'nostalgia':
        return <NostalgiaAddiction />;
      case 'member':
        return <Membership member={member} onRegister={handleRegister} onUpdatePoints={updatePoints} />;
      default:
        return <Home onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
      {/* 共通ヘッダー */}
      <Header onNavigate={handlePageChange} member={member} currentPage={currentPage} />
      
      {/* メインコンテンツエリア */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl transition-all duration-300">
        <div className="animate-fade-in">
          {renderPage()}
        </div>
      </main>
      
      {/* 共通フッター */}
      <Footer onNavigate={handlePageChange} />
    </div>
  );
};

export default App;
