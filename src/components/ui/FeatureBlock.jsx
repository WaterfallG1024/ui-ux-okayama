import React from 'react';
import { FadeInSection } from './FadeInSection';
import { LearnMoreButton } from './LearnMoreButton';

/**
 * 画像とテキストが左右に並ぶレイアウトの共通コンポーネント
 */
export const FeatureBlock = ({
  icon: Icon,
  iconColorClass = 'text-gray-500',
  title,
  titleColorClass = 'text-gray-900',
  description,
  descColorClass = 'text-gray-700',
  buttonText,
  buttonColorClass,
  onButtonClick,
  image,
  imageAlt,
  imgBgClass = 'bg-gray-100/50',
  imgBorderClass = 'border-gray-200',
  imgShadowClass = 'shadow-xl',
  reverse = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 ${className}`}>
      {/* テキストエリア */}
      <div className="flex-1 text-center md:text-left">
        {Icon && (
          <FadeInSection>
            <Icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 ${iconColorClass}`} />
          </FadeInSection>
        )}

        {title && (
          <FadeInSection delay={100}>
            <h2 className={`text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight ${titleColorClass}`}>
              {title}
            </h2>
          </FadeInSection>
        )}

        {description && (
          <FadeInSection delay={200}>
            <p className={`text-base md:text-xl mb-6 md:mb-8 font-light leading-relaxed ${descColorClass}`}>
              {description}
            </p>
          </FadeInSection>
        )}

        {buttonText && onButtonClick && (
          <FadeInSection delay={300}>
            <LearnMoreButton 
              onClick={onButtonClick} 
              text={buttonText} 
              colorClass={buttonColorClass} 
            />
          </FadeInSection>
        )}
      </div>

      {/* 画像エリア */}
      <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
        <FadeInSection delay={400}>
          <div tabIndex="0" className={`aspect-[4/5] ${imgBgClass} rounded-[24px] overflow-hidden border ${imgBorderClass} ${imgShadowClass} hover:-translate-y-1 focus:-translate-y-1 transition-all duration-500 flex items-center justify-center relative outline-none`}>
            <img 
              src={image} 
              className="w-full h-full object-cover" 
              alt={imageAlt || title} 
              loading="lazy" 
              decoding="async" 
            />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};
