import { Sun, Image as ImageIcon, X } from 'lucide-react';
import himawaribatake from '../../assets/HimawariBatake.webp';
import { NAV_ITEMS } from '../../constants';

export const HeroSection = ({
  heroRef,
  sceneRef,
  focusLayer,
  setFocusLayer,
  showBackgroundInfo,
  setShowBackgroundInfo,
  scrollToSection
}) => {
  const blurs = {
    back: focusLayer === 'back' ? 0 : 8,
    middle: focusLayer === 'middle' ? 0 : 6,
  };

  const transitionStyle = 'filter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#050505] select-none">
      {/* ヒーロー画像のプリロード（低速通信環境におけるLCP最適化） */}
      <link rel="preload" as="image" href={himawaribatake} fetchPriority="high" />

      {/* 背景画像情報パネル */}
      <div className={`absolute bottom-6 md:bottom-20 [@media(max-height:500px)]:bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-1000 w-full px-4 md:px-0 flex justify-center ${showBackgroundInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className={`bg-black/60 backdrop-blur-md p-5 md:p-8 [@media(max-height:500px)]:p-3 rounded-3xl border border-white/20 shadow-2xl max-w-3xl w-full md:w-[90vw] flex flex-col md:flex-row items-center gap-4 md:gap-6 [@media(max-height:500px)]:gap-2 max-h-[85dvh] overflow-y-auto ${showBackgroundInfo ? 'pointer-events-auto' : ''}`}>
          <div className="flex-1 text-left w-full">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 [@media(max-height:500px)]:mb-1 tracking-widest flex items-center gap-2">
              <ImageIcon className="w-5 h-5 md:w-6 md:h-6 [@media(max-height:500px)]:w-4 [@media(max-height:500px)]:h-4 text-green-300 shrink-0" />
              <span className="leading-tight [@media(max-height:500px)]:text-sm">岡山市北区牟佐(むさ)のひまわり畑</span>
            </h3>
            <p className="text-xs sm:text-sm md:text-lg [@media(max-height:500px)]:text-xs text-gray-300 leading-relaxed font-light">
              西日本豪雨災害で浸水被害にあった農地に土壌改良のためひまわりを植えたのがきっかけで誕生したひまわり畑。駅からひまわり畑に向かう途中の潜水橋も見どころで、そのノスタルジックな風景を撮影する人も多数いる。
            </p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setShowBackgroundInfo(false); setFocusLayer('middle'); }} className="shrink-0 px-6 py-3 [@media(max-height:500px)]:py-1.5 [@media(max-height:500px)]:px-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg group w-full md:w-auto mt-2 md:mt-0 [@media(max-height:500px)]:mt-1 cursor-pointer">
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>閉じる</span>
          </button>
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
              filter: `blur(${blurs.back}px) brightness(${focusLayer === 'back' ? 1.1 : 0.8})`,
              transition: transitionStyle,
              backgroundImage: `url(${himawaribatake})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              pointerEvents: 'auto'
            }}
            onMouseEnter={() => !showBackgroundInfo && setFocusLayer('back')}
            onClick={() => !showBackgroundInfo && setFocusLayer('back')}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/80" />
          </div>

          {/* 2. 中間レイヤー (Middle) - タイトルとナビゲーション */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-start pt-[12vh] [@media(max-height:500px)]:pt-[4vh] md:justify-center md:pt-0 pointer-events-none ${showBackgroundInfo ? '*:pointer-events-none' : ''}`}
            style={{
              transform: `translateZ(${focusLayer === 'middle' ? '50px' : '0px'})`,
              filter: `blur(${blurs.middle}px)`,
              opacity: showBackgroundInfo ? 0 : (focusLayer === 'back' ? 0.4 : 1),
              transition: transitionStyle
            }}
          >
            <h1
              className={`text-[20vw] md:text-[14vw] [@media(max-height:500px)]:text-[25vh] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 hover:from-orange-200 hover:to-orange-400 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 antialiased ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
              }}
              onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
              onClick={() => !showBackgroundInfo && setFocusLayer('middle')}
            >
              おかやま
            </h1>
            <p className={`text-sm sm:text-lg md:text-3xl [@media(max-height:500px)]:text-base font-medium tracking-widest text-blue-400 mt-[-1vw] md:mt-[-2vw] drop-shadow-lg flex items-center gap-2 justify-center ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
              onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
              onClick={() => !showBackgroundInfo && setFocusLayer('middle')}
            >
              <Sun className="w-6 h-6 md:w-6 md:h-6 [@media(max-height:500px)]:w-4 [@media(max-height:500px)]:h-4" />
              晴れの国を知る
            </p>

            {/* 各コンテンツへのナビゲーションボタン */}
            <div
              className={`grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 md:mt-12 [@media(max-height:500px)]:mt-3 w-full px-5 sm:w-[95%] sm:px-0 max-w-4xl ${showBackgroundInfo ? 'pointer-events-none' : 'pointer-events-auto'}`}
              onMouseEnter={() => !showBackgroundInfo && setFocusLayer('middle')}
            >
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={(e) => { e.stopPropagation(); scrollToSection(item.id); }} className="flex items-center justify-center w-full sm:w-auto gap-2 md:gap-3 px-2 sm:px-6 py-3 md:px-8 md:py-4 [@media(max-height:500px)]:py-1.5 [@media(max-height:500px)]:px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all hover:scale-105 sm:hover:scale-110 shadow-lg group cursor-pointer">
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 [@media(max-height:500px)]:w-4 [@media(max-height:500px)]:h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs md:text-sm [@media(max-height:500px)]:text-[10px] font-bold tracking-widest text-white mt-0.5 truncate">{item.label}</span>
                </button>
              ))}
              <button onClick={(e) => { e.stopPropagation(); setShowBackgroundInfo(true); setFocusLayer('back'); }} className="flex items-center justify-center w-full sm:w-auto gap-2 md:gap-3 px-2 sm:px-6 py-3 md:px-8 md:py-4 [@media(max-height:500px)]:py-1.5 [@media(max-height:500px)]:px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all hover:scale-105 sm:hover:scale-110 shadow-lg group cursor-pointer">
                <ImageIcon className="w-5 h-5 md:w-6 md:h-6 [@media(max-height:500px)]:w-4 [@media(max-height:500px)]:h-4 text-green-300 group-hover:scale-110 transition-transform" />
                <span className="text-xs md:text-sm [@media(max-height:500px)]:text-[10px] font-bold tracking-widest text-white mt-0.5 truncate">背景をみる</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

