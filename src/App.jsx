import React, { useEffect, useRef, useState } from 'react';
import { Sun, Droplets, Castle, Scissors, ChevronRight, Move, Compass, X, Image as ImageIcon } from 'lucide-react';
//import bgImage from './assets/Ushimado.png';
import okayamaCastleImg from './assets/OkayamaCastle.webp';
import okayamaCastleImg2 from './assets/OkayamaCastle2.webp';
import kojimajeansImg from './assets/KojimaJeans.webp';
import kojimajeansImg2 from './assets/KojimaJeans2.webp';
import kurashikiImg from './assets/KurashikiBikantiku.webp';
import himawaribatake from './assets/HimawariBatake.webp';
import peach from './assets/Peach.webp';
import muscat from './assets/Muscat.webp';
import pione from './assets/Pione.webp';

// アプリケーション起動時のSVGローディングアニメーション制御
const LoadingScreen = React.memo(({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // フェーズ1: 線の描画を開始 (0秒〜2秒)
    const t1 = setTimeout(() => setPhase(1), 100);
    // フェーズ2: 塗りつぶしとテキスト表示 (2秒〜3.5秒)
    const t2 = setTimeout(() => setPhase(2), 2100);
    // フェーズ3: 画面全体のフェードアウト (3.5秒〜4.5秒)
    const t3 = setTimeout(() => setPhase(3), 3500);
    // フェーズ4: コンポーネントのアンマウント
    const t4 = setTimeout(() => onComplete(), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative w-64 h-64 flex flex-col items-center justify-center">
        {/* 岡山県の地形を描画するSVGパス */}
        <svg viewBox="0 0 200 200" className={`w-60 h-60 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-1000 ${phase >= 2 ? 'scale-105' : 'scale-100'}`}>
          <path
            d="M 35,45 L 45,25 L 70,35 L 105,5 L 120,20 L 140,25 L 160,10 L 165,30 L 190,45 L 180,65 L 195,80 L 165,110 L 185,125 L 155,125 L 155,135 L 140,125 L 130,165 L 115,160 L 115,135 L 90,130 L 80,145 L 65,140 L 45,160 L 35,150 L 55,135 L 30,110 L 35,90 L 20,80 L 35,65 L 25,55 Z"
            fill={phase >= 2 ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0)"}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1500,
              strokeDashoffset: phase >= 1 ? 0 : 1500,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1), fill 1.5s ease-out'
            }}
          />
        </svg>
        <div className={`absolute bottom-4 text-white font-bold tracking-[0.4em] text-2xl transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-4 blur-sm'}`}>
          OKAYAMA
        </div>
      </div>
    </div>
  );
});

// Intersection Observer APIを利用したスクロール連動フェードイン制御
const FadeInSection = React.memo(({ children, delay = 0, className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});

// 各セクションの詳細モーダル表示用データ定義
const DETAIL_DATA = {
  fruits: {
    title: "フルーツの宝庫",
    description: "岡山県は「フルーツ王国」として知られています。温暖な気候と豊かな自然が、清水白桃やマスカット・オブ・アレキサンドリア、ピオーネなど、最高品質の果物を育みます。特に白桃は、袋掛け栽培により美しい白さと上品な甘さを実現しています。",
    image: pione
  },
  history: {
    title: "漆黒の城、岡山城",
    description: "豊臣秀吉の家臣である宇喜多秀家によって築かれた岡山城。外観が黒塗りの下見板張りであることから「烏城（うじょう）」とも呼ばれます。隣接する日本三名園の一つ「後楽園」とともに、岡山の歴史と文化を象徴する場所です。",
    image: okayamaCastleImg2
  },
  denim: {
    title: "世界に誇る児島デニム",
    description: "倉敷市児島地区は「国産ジーンズ発祥の地」として知られ、現在でも世界中のアパレルブランドから高い評価を受けています。藍染めの技術から縫製、ダメージ加工に至るまで、熟練の職人たちが手作業で仕上げるデニムはまさに芸術品です。",
    image: kojimajeansImg
  },
  tourism: {
    title: "風情あふれる歴史の町並み",
    description: "倉敷美観地区は、江戸時代の白壁の屋敷や柳並木が美しい、岡山を代表する観光地です。倉敷川での舟流しや、大原美術館など、歴史とアートが融合したノスタルジックな風景を楽しむことができます。",
    image: ""
  }
};

const NAV_ITEMS = [
  { id: 'fruits', label: 'FRUITS', icon: Droplets, color: 'text-pink-400' },
  { id: 'history', label: 'HISTORY', icon: Castle, color: 'text-gray-300' },
  { id: 'denim', label: 'DENIM', icon: Scissors, color: 'text-blue-300' },
  { id: 'tourism', label: 'TOURISM', icon: Compass, color: 'text-orange-300' },
];

const FRUITS_DATA = [
  {
    title: '白桃',
    desc: 'とろけるような柔らかさと、芳醇な甘い香り。',
    img: peach,
    alt: 'Peach bg',
    delay: 300
  },
  {
    title: 'マスカット',
    desc: '晴天の多さを活かした高い糖度、そして皮ごと食べられる一粒。',
    img: muscat,
    alt: 'Muscat bg',
    delay: 400
  }
];

const LearnMoreButton = ({ onClick, text, colorClass, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center ${colorClass} font-medium text-base md:text-lg group transition-colors ${className}`}
  >
    {text}
    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
  </button>
);

// 詳細情報のオーバーレイ表示とアニメーション制御
const DetailScreen = ({ detailId, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [renderId, setRenderId] = useState(null);

  useEffect(() => {
    if (detailId) {
      setRenderId(detailId);
      // CSSアニメーションを確実にトリガーするため、DOMの描画完了を待機
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      // モーダル表示時は背面のスクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }

    return () => { document.body.style.overflow = 'auto'; };
  }, [detailId]);

  const handleTransitionEnd = () => {
    if (!isVisible && !detailId) {
      setRenderId(null);
    }
  };

  if (!renderId) return null;

  const content = DETAIL_DATA[renderId];

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 transition-all duration-500 ease-out transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-white/20 transition-all backdrop-blur-md hover:scale-105 active:scale-95 shadow-lg border border-white/10"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="md:w-1/2 h-96 md:h-auto relative shrink-0">
          <img src={content.image} alt={content.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] to-transparent"></div>
        </div>

        <div className="md:w-1/2 p-6 pt-16 md:p-12 md:pt-24 flex flex-col justify-center overflow-y-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tighter">{content.title}</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">{content.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [focusLayer, setFocusLayer] = useState('middle');
  const [activeDetail, setActiveDetail] = useState(null);
  const [showBackgroundInfo, setShowBackgroundInfo] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const sceneRef = useRef(null);
  const heroRef = useRef(null);
  const requestRef = useRef();

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // マウスカーソルの位置からパララックスの目標角度を計算
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      target.current.x = ((e.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((e.clientY / innerHeight) - 0.5) * 20;
    };

    // タッチデバイスでのスワイプ位置から目標角度を計算
    const handleTouchMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const touch = e.touches[0];
      target.current.x = ((touch.clientX / innerWidth) - 0.5) * 20;
      target.current.y = ((touch.clientY / innerHeight) - 0.5) * 20;
    };

    // ジャイロセンサーの傾きから目標角度を計算（最大45度で制限）
    const handleDeviceOrientation = (e) => {
      if (e.beta === null || e.gamma === null) return;
      const beta = Math.max(-45, Math.min(45, e.beta - 45));
      const gamma = Math.max(-45, Math.min(45, e.gamma));
      target.current.y = (beta / 45) * 20;
      target.current.x = (gamma / 45) * 20;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    // 慣性（イージング）を持たせて現在の角度を目標角度に近づけるアニメーションループ
    const updateParallax = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;

      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${-current.current.y}deg) rotateY(${current.current.x}deg)`;
      }

      requestRef.current = requestAnimationFrame(updateParallax);
    };

    requestRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
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

  const blurs = {
    back: focusLayer === 'back' ? 0 : 8,
    middle: focusLayer === 'middle' ? 0 : 6,
  };

  const transitionStyle = 'filter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">

      <DetailScreen detailId={activeDetail} onClose={() => setActiveDetail(null)} />

      {/* 初期ローディング画面の描画 */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main>
        {/* ヒーローセクション: 被写界深度エフェクト */}
        <section ref={heroRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#050505] select-none">

          {/* 背景画像情報パネル */}
          <div className={`absolute bottom-6 md:bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-1000 w-full px-4 md:px-0 flex justify-center ${showBackgroundInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`bg-black/60 backdrop-blur-md p-5 md:p-8 rounded-3xl border border-white/20 shadow-2xl max-w-3xl w-full md:w-[90vw] flex flex-col md:flex-row items-center gap-4 md:gap-6 max-h-[85dvh] overflow-y-auto ${showBackgroundInfo ? 'pointer-events-auto' : ''}`}>
              <div className="flex-1 text-left w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-green-300 shrink-0" />
                  <span className="leading-tight">岡山市北区牟佐(むさ)のひまわり畑</span>
                </h3>
                <p className="text-xs sm:text-sm md:text-lg text-gray-300 leading-relaxed font-light">
                  西日本豪雨災害で浸水被害にあった農地に土壌改良のためひまわりを植えたのがきっかけで誕生したひまわり畑。駅からひまわり畑に向かう途中の潜水橋も見どころで、そのノスタルジックな風景を撮影する人も多数いる。
                </p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setShowBackgroundInfo(false); setFocusLayer('middle'); }} className="shrink-0 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg group w-full md:w-auto mt-2 md:mt-0">
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>閉じる</span>
              </button>
            </div>
          </div>

          {/* 操作説明UI */}
          <div className={`absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 md:gap-4 bg-black/50 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10 shadow-2xl pointer-events-none w-[90%] md:w-[90%] max-w-max justify-center transition-all duration-800 ${showBackgroundInfo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* <div className="flex items-center gap-1.5 md:gap-2">
              <Move size={14} className="text-white/60 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-xs font-medium text-white/80 hidden sm:inline">なぞる・傾ける</span>
              <span className="text-[10px] font-medium text-white/80 sm:hidden">スマホを傾ける</span>
            </div>
            <div className="w-px h-3 md:h-4 bg-white/20"></div> */}
            <div className="flex items-center gap-1.5 md:gap-2 text-white/80 animate-bounce mt-1">
              <span className="text-xl md:text-xs font-bold tracking-widest">SCROLL</span>
            </div>
          </div>

          {/* 3Dパララックス コンテナ */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            <div
              ref={sceneRef}
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* 1. 背景レイヤー (Back) */}
              <div
                className="absolute inset-0 cursor-crosshair"
                style={{
                  transform: 'translateZ(-400px) scale(1.4)',
                  // 被写界深度エフェクトのためのブラーと明度調整
                  filter: `blur(${blurs.back}px) brightness(${focusLayer === 'back' ? 1.1 : 0.8})`,
                  transition: transitionStyle,
                  // パララックス用背景画像の設定
                  backgroundImage: `url(${himawaribatake})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={() => !showBackgroundInfo && setFocusLayer('back')}
                onClick={() => !showBackgroundInfo && setFocusLayer('back')}
              >
                {/* コンテンツ視認性確保のための背景オーバーレイ */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/80" />
              </div>

              {/* 2. 中間レイヤー (Middle) - タイトルとナビゲーション */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-start pt-[12vh] md:justify-center md:pt-0 pointer-events-none ${showBackgroundInfo ? '*:pointer-events-none' : ''}`}
                style={{
                  transform: `translateZ(${focusLayer === 'middle' ? '50px' : '0px'})`,
                  filter: `blur(${blurs.middle}px)`,
                  opacity: showBackgroundInfo ? 0 : (focusLayer === 'back' ? 0.4 : 1),
                  transition: transitionStyle
                }}
              >
                <h1
                  className={`text-[20vw] md:text-[14vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 hover:from-orange-200 hover:to-orange-400 cursor-pointer opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 antialiased ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
                  }}
                  onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
                  onClick={() => !showBackgroundInfo && setFocusLayer('middle')}
                >
                  おかやま
                </h1>
                <p className={`text-sm sm:text-lg md:text-3xl font-medium tracking-widest text-blue-400 mt-[-1vw] md:mt-[-2vw] cursor-pointer drop-shadow-lg flex items-center gap-2 justify-center ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
                  onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
                  onClick={() => !showBackgroundInfo && setFocusLayer('middle')}
                >
                  <Sun className="w-6 h-6 md:w-6 md:h-6" />
                  晴れの国の魅力
                </p>

                {/* 各コンテンツへのナビゲーションボタン */}
                <div
                  className={`flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 w-[95%] max-w-4xl ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
                  onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
                >
                  {NAV_ITEMS.map((item) => (
                    <button key={item.id} onClick={(e) => { e.stopPropagation(); scrollToSection(item.id); }} className="flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all hover:scale-110 shadow-lg group">
                      <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-xs md:text-sm font-bold tracking-widest text-white mt-0.5">{item.label}</span>
                    </button>
                  ))}
                  <button onClick={(e) => { e.stopPropagation(); setShowBackgroundInfo(true); setFocusLayer('back'); }} className="flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all hover:scale-110 shadow-lg group">
                    <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-green-300 group-hover:scale-110 transition-transform" />
                    <span className="text-xs md:text-sm font-bold tracking-widest text-white mt-0.5">背景をみる</span>
                  </button>
                  {/* <div className="w-full sm:w-auto flex justify-center mt-4 sm:mt-0 sm:ml-4">
                    <button onClick={(e) => { e.stopPropagation(); scrollToSection('plan'); }} className="flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-white hover:bg-gray-200 backdrop-blur-md rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] group text-black">
                      <Compass className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-spin-slow transition-transform" />
                      <span className="text-xs md:text-sm font-bold tracking-widest mt-0.5">プランを立てる</span>
                    </button>
                  </div> */}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* スクロール連動型コンテンツエリア */}

        {/* フルーツセクション */}
        <section id="fruits" className="py-20 md:py-32 bg-white text-black text-center px-4 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <Droplets className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-pink-500" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8">
                果物の<br className="md:hidden" />宝庫。
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 font-light leading-relaxed">
                清水白桃の甘美な香り。マスカットの弾ける果汁。
              </p>
            </FadeInSection>

            <FadeInSection delay={250}>
              <LearnMoreButton onClick={() => setActiveDetail('fruits')} text="果物についてさらに詳しく" colorClass="text-pink-500 hover:text-pink-400" className="mb-10 md:mb-16" />
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {FRUITS_DATA.map((fruit) => (
                <FadeInSection key={fruit.title} delay={fruit.delay}>
                  <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-80 md:h-96 flex flex-col items-center justify-center border border-gray-100 hover:shadow-2xl transition-shadow duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-80 transition-opacity">
                      <img src={fruit.img} className="w-full h-full object-cover" alt={fruit.alt} loading="lazy" decoding="async" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 relative z-10 group-hover:text-transparent">{fruit.title}</h3>
                    <p className="text-base md:text-lg text-gray-700 font-bold mb-4 md:mb-6 relative z-10 group-hover:text-transparent">{fruit.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 歴史セクション */}
        <section id="history" className="py-20 md:py-40 bg-black text-white px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <FadeInSection>
                  <Castle className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-gray-400" />
                </FadeInSection>

                <FadeInSection delay={100}>
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
                    美しき漆黒。
                  </h2>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 font-light leading-relaxed">

                  </p>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <LearnMoreButton onClick={() => setActiveDetail('history')} text="岡山城についてさらに詳しく" colorClass="text-blue-400 hover:text-blue-300" />
                </FadeInSection>
              </div>

              <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
                <FadeInSection delay={400}>
                  <div className="aspect-[4/5] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 flex items-center justify-center relative shadow-2xl">
                    <img src={okayamaCastleImg} className="w-full h-full object-cover" alt="Okayama Castle" loading="lazy" decoding="async" />
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* デニムセクション */}
        <section id="denim" className="py-20 md:py-40 bg-[#0A192F] text-white text-center px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <Scissors className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-blue-300" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-blue-50">
                世界に誇る青。
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base sm:text-xl md:text-2xl text-blue-200/80 mb-6 font-light">
                職人の魂が宿る、児島デニム。<br />
                色落ちすらも、美しいアートになる。
              </p>
            </FadeInSection>

            <FadeInSection delay={250}>
              <LearnMoreButton onClick={() => setActiveDetail('denim')} text="児島デニムについてさらに詳しく" colorClass="text-blue-300 hover:text-blue-200" className="mb-10 md:mb-16" />
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="w-full h-48 sm:h-64 md:h-96 bg-blue-900/30 rounded-3xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm overflow-hidden relative">
                <img src={kojimajeansImg2} className="w-full h-full object-cover" alt="Kojima Jeans" loading="lazy" decoding="async" />
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* 旅行セクション */}
        <section id="tourism" className="py-20 md:py-40 bg-orange-50 text-black px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <FadeInSection>
                  <Compass className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-orange-400" />
                </FadeInSection>

                <FadeInSection delay={100}>
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight">
                    時を忘れる、<br />白壁の町並み。
                  </h2>
                </FadeInSection>

                <FadeInSection delay={200}>
                  <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-light leading-relaxed">
                    倉敷美観地区。<br />
                    柳が揺れる川沿いを歩けば、江戸の情緒が蘇る。<br />
                    歴史とアートが交差する、ノスタルジックな癒やしの時間。
                  </p>
                </FadeInSection>

                <FadeInSection delay={300}>
                  <LearnMoreButton onClick={() => setActiveDetail('tourism')} text="倉敷美観地区についてさらに詳しく" colorClass="text-orange-500 hover:text-orange-400" />
                </FadeInSection>
              </div>

              <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
                <FadeInSection delay={400}>
                  <div className="aspect-[4/5] bg-orange-100 rounded-3xl overflow-hidden border border-orange-200 flex items-center justify-center relative shadow-2xl">
                    <img src={kurashikiImg} className="w-full h-full object-cover" alt="Kurashiki Bikan Historical Quarter" loading="lazy" decoding="async" />
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* CTA(旅行プラン)セクション */}
        <section id="plan" className="py-20 md:py-32 bg-white text-black text-center px-4">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <div className="mb-12 md:mb-20 flex justify-center w-full px-2 overflow-visible relative z-50">
                <div
                  className="flex flex-col items-start font-black text-black select-none whitespace-nowrap"
                  style={{
                    transform: 'perspective(1000px) rotateY(35deg) skewY(-10deg)',
                    transformOrigin: 'center center'
                  }}
                >
                  <h2 className="flex items-baseline tracking-tighter m-0">
                    <span className="text-4xl sm:text-6xl md:text-8xl leading-none">Go</span>
                    <span className="text-xl sm:text-3xl md:text-5xl leading-none ml-1 sm:ml-2 md:ml-3">to</span>
                    <span className="text-[2.5rem] sm:text-[4.5rem] md:text-9xl leading-none ml-2 sm:ml-3 md:ml-6">OKAYAMA！</span>
                  </h2>
                  {/* スクリーンショットの下部にある矢印をSVGで再現 */}
                  <svg viewBox="0 0 100 24" className="w-full h-4 sm:h-8 md:h-12 mt-1 sm:mt-2 md:mt-4" preserveAspectRatio="none">
                    <path d="M0,14 L92,8 L92,0 L100,11 L92,22 L92,14 L0,17 Z" fill="black" />
                  </svg>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <button

                className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-xl flex items-center gap-2 mx-auto group"
              >
                <Compass className="group-hover:animate-spin-slow w-4 h-4 md:w-6 md:h-6" />
                旅行プランを見る
              </button>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="flex justify-center mt-20 md:mt-32 px-4 overflow-visible pb-10">
                <div
                  className="relative inline-block bg-[#FFE600] border-[6px] border-black p-8 md:p-12 shadow-[15px_15px_0px_rgba(0,0,0,1)] text-black font-black leading-tight max-w-3xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  style={{
                    transform: 'perspective(1000px) rotateY(-20deg) rotateX(5deg) skewY(3deg)',
                    transformOrigin: 'center center',
                    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
                  }}
                >
                  <p className="flex items-center justify-center mb-6 md:mb-8">
                    <span
                      className="text-5xl md:text-7xl text-white tracking-widest font-black"
                      style={{ textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 6px 6px 0 #000' }}
                    >
                      おっと!!
                    </span>
                  </p>
                  <p className="mb-6 md:mb-8 text-xl md:text-3xl text-center">
                    岡山弁の<span className="text-2xl md:text-6xl text-[#FF004D] mx-2 inline-block -rotate-3" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0 #000' }}>「はよーしねー」</span>は
                  </p>
                  <p className="mb-8 md:mb-12 text-2xl md:text-4xl text-center">
                    「早く死ね」では<span className="text-3xl md:text-5xl inline-block rotate-2 ml-1">ありません。</span>
                  </p>
                  <div className="flex justify-center">
                    <p className="text-xl md:text-3xl text-center text-black bg-white border-4 border-black p-4 md:p-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] inline-block">
                      「早くしなさい」という意味なので、<br className="md:hidden" />ご安心ください
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* ボトムナビゲーション (ヒーローセクション外で表示) */}
      <div
        className={`fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-700 ease-out flex flex-nowrap items-center justify-center gap-0 sm:gap-2 w-[96%] sm:w-auto max-w-4xl p-1.5 sm:p-2 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl ${!isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
      >
        {NAV_ITEMS.map((item) => (
          <button key={`bottom-${item.id}`} onClick={() => scrollToSection(item.id)} className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-6 sm:py-2 hover:bg-white/10 rounded-full transition-all group flex-1 sm:flex-none">
            <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${item.color} group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform drop-shadow-md`} />
            <span className="text-[14px] sm:text-[16px] font-bold tracking-widest text-white truncate drop-shadow-md">{item.label}</span>
          </button>
        ))}
      </div>

      {/* フッター */}
      <footer className="bg-gray-100 text-gray-500 pt-8 pb-28 md:pt-12 md:pb-32 text-xs md:text-sm text-center border-t border-gray-200 px-4">
        <p>&copy; 2026 Waterfall All rights reserved.</p>
      </footer>
    </div>
  );
}