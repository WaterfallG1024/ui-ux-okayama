import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DETAIL_DATA } from '../../constants';

// 詳細情報のオーバーレイ表示とアニメーション制御
export const DetailModal = ({ detailId, onClose }) => {
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
