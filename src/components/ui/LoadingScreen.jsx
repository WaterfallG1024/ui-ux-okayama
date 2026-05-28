import React, { useState, useEffect } from 'react';

// アプリケーション起動時のSVGローディングアニメーション制御
export const LoadingScreen = React.memo(({ onComplete }) => {
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
      <div className="flex flex-col items-center justify-center gap-6">
        {/* 岡山県の地形を描画するSVGパス */}
        <svg viewBox="0 0 200 200" className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-1000 ${phase >= 2 ? 'scale-105' : 'scale-100'}`}>
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
        <div className={`text-white font-bold tracking-[0.2em] md:tracking-[0.4em] pl-[0.2em] md:pl-[0.4em] text-2xl sm:text-3xl md:text-4xl text-center whitespace-nowrap transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-4 blur-sm'}`}>
          Find OKAYAMA！
        </div>
      </div>
    </div>
  );
});
