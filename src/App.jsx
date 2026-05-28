import React, { useState, useEffect, useRef } from 'react';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { DetailModal } from './components/ui/DetailModal';
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

  // カスタムフックを利用してロジックを分離
  const weatherRecommendation = useWeather();
  const sceneRef = useParallax();
  
  const heroRef = useRef(null);

  useEffect(() => {
    // ヒーローセクションの表示状態を監視（ボトムナビの表示切り替え用）
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const currentHero = heroRef.current;
    if (currentHero) observer.observe(currentHero);

    return () => {
      if (currentHero) observer.unobserve(currentHero);
    };
  }, []);

  // ナビゲーション用のスムーズスクロール処理
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* 詳細モーダル（オーバーレイ） */}
      <DetailModal detailId={activeDetail} onClose={() => setActiveDetail(null)} />

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
      <BottomNav isHeroVisible={isHeroVisible} scrollToSection={scrollToSection} />
      <Footer />
    </div>
  );
}