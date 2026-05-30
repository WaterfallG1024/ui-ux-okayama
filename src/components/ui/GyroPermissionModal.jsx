import React, { useState, useEffect } from 'react';
import { Smartphone, Check, X } from 'lucide-react';
import himawaribatake from '../../assets/HimawariBatake.webp';

// ジャイロセンサー許可リクエストのモーダル
export const GyroPermissionModal = ({ isOpen, onAllow, onDeny }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
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
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isVisible && !isOpen) {
      setShouldRender(false);
      // 非表示になるタイミングでチェック状態をリセット
      setDontShowAgain(false);
    }
  };

  const handleDenyClick = () => {
    onDeny(dontShowAgain);
  };

  const handleAllowClick = () => {
    onAllow(dontShowAgain);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* 背景オーバーレイ（クリック無効） */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* モーダル本体 */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 transition-all duration-500 ease-out transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >


        {/* 左側: 画像エリア */}
        <div className="md:w-1/2 h-64 md:h-auto relative shrink-0">
          <img src={himawaribatake} alt="3Dパララックス背景" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] to-transparent"></div>
          {/* 画像上のアイコンオーバーレイ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
              <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>
        </div>

        {/* 右側: 説明とボタン */}
        <div className="md:w-1/2 p-6 pt-6 md:p-12 md:pt-16 flex flex-col justify-center overflow-y-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tighter">
            3Dパララックス
          </h2>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-4 md:mb-6">
            スマートフォンの傾きに合わせて、背景が立体的に動く3D体験をお楽しみいただけます。
            デバイスのジャイロセンサーへのアクセスを許可してください。
          </p>

          <label className="flex items-center gap-2 text-gray-400 text-sm mb-6 cursor-pointer hover:text-gray-200 transition-colors w-fit">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-md bg-transparent checked:bg-white checked:border-white transition-colors cursor-pointer"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              {dontShowAgain && <Check className="absolute w-3.5 h-3.5 text-black pointer-events-none" />}
            </div>
            <span>今後、このメッセージを表示しない</span>
          </label>

          {/* 許可・拒否ボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAllowClick}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <Check className="w-5 h-5" />
              <span className="text-sm md:text-base">許可する</span>
            </button>
            <button
              onClick={handleDenyClick}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span className="text-sm md:text-base">許可しない</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
