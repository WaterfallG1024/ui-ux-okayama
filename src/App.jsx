import React, { useState, useEffect, useRef } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { DetailModal } from './components/ui/DetailModal';
import { GyroPermissionModal } from './components/ui/GyroPermissionModal';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { FruitsSection } from './components/sections/FruitsSection';
import { FoodSection } from './components/sections/FoodSection';
import { HistorySection } from './components/sections/HistorySection';
import { FashionSection } from './components/sections/FashionSection';
import { TourismSection } from './components/sections/TourismSection';
import { WeatherSection } from './components/sections/WeatherSection';
import { CtaSection } from './components/sections/CtaSection';
import { useWeather } from './hooks/useWeather';
import { useParallax } from './hooks/useParallax';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [focusLayer, setFocusLayer] = useState('middle');
  const [activeDetail, setActiveDetail] = useState(null);
  const [showBackgroundInfo, setShowBackgroundInfo] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [showGyroModal, setShowGyroModal] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // カスタムフックを利用してロジックを分離
  const weatherRecommendation = useWeather();
  const { sceneRef, gyroPermission, requestGyroPermission, setGyroPermission } = useParallax();
  
  const heroRef = useRef(null);

  useEffect(() => {
    // ヒーローセクションの表示状態監視（ボトムナビの表示切り替え用）
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const currentHero = heroRef.current;
    if (currentHero) heroObserver.observe(currentHero);

    // 各セクションの表示状態監視（スクロールスパイ・カレント表示用）
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' } // 画面の中央少し上付近に来た時を判定
    );

    const sectionIds = ['fruits', 'food', 'history', 'denim', 'tourism', 'weather', 'cta'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      if (currentHero) heroObserver.unobserve(currentHero);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.unobserve(el);
      });
    };
  }, []);

  // ローディング完了後、ジャイロ許可が未決定なら自動でモーダル表示
  useEffect(() => {
    if (!isLoading && gyroPermission === 'prompt') {
      // ローディングアニメーション終了後に少し遅延してモーダルを表示
      const timer = setTimeout(() => {
        setShowGyroModal(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, gyroPermission]);

  // ジャイロ許可時の処理
  const handleGyroAllow = (dontShowAgain) => {
    setShowGyroModal(false);
    requestGyroPermission(dontShowAgain);
  };

  // ジャイロ拒否時の処理
  const handleGyroDeny = (dontShowAgain) => {
    setShowGyroModal(false);
    if (dontShowAgain) {
      setGyroPermission('denied_permanent');
    } else {
      setGyroPermission('denied');
    }
  };

  // ナビゲーション用のスムーズスクロール処理
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      // スクロール中フラグを立ててObserverの更新を一時停止し、直ちにクリックしたセクションをアクティブにする
      isScrollingRef.current = true;
      setActiveSection(id);
      
      section.scrollIntoView({ behavior: 'smooth' });

      // 既存のタイマーがあればクリア
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // スムーズスクロール完了の目安（約1秒後）にフラグを解除
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // ページトップへのスムーズスクロール処理
  const scrollToTop = () => {
    isScrollingRef.current = true;
    setActiveSection('');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* 詳細モーダル（オーバーレイ） */}
      <DetailModal detailId={activeDetail} onClose={() => setActiveDetail(null)} />

      {/* ジャイロ許可モーダル */}
      <GyroPermissionModal
        isOpen={showGyroModal}
        onAllow={handleGyroAllow}
        onDeny={handleGyroDeny}
      />

      {/* 初期ローディング画面 */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main>
        {/* ヒーローセクション */}
        <HeroSection
          heroRef={heroRef}
          sceneRef={sceneRef}
          focusLayer={focusLayer}
          setFocusLayer={setFocusLayer}
          showBackgroundInfo={showBackgroundInfo}
          setShowBackgroundInfo={setShowBackgroundInfo}
          scrollToSection={scrollToSection}
        />
        
        {/* 各コンテンツセクション */}
        <FruitsSection setActiveDetail={setActiveDetail} />
        <FoodSection setActiveDetail={setActiveDetail} />
        <HistorySection setActiveDetail={setActiveDetail} />
        <FashionSection setActiveDetail={setActiveDetail} />
        <TourismSection setActiveDetail={setActiveDetail} />
        
        {/* 天気・旅行提案セクション */}
        <WeatherSection weatherRecommendation={weatherRecommendation} />
        
        {/* CTAセクション */}
        <CtaSection />
      </main>

      {/* レイアウト */}
      <BottomNav isHeroVisible={isHeroVisible} scrollToSection={scrollToSection} scrollToTop={scrollToTop} activeSection={activeSection} />
      <Footer />
    </div>
  );
}