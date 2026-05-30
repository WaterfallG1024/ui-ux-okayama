import React from 'react';
import { FadeInSection } from './FadeInSection';
import { LearnMoreButton } from './LearnMoreButton';

/**
 * セクション上部のヘッダー（アイコン、タイトル、説明文、ボタン）を表示する共通コンポーネント
 */
export const SectionHeader = ({
  icon: Icon,
  iconColorClass = 'text-gray-500',
  title,
  titleColorClass = 'text-gray-900',
  description,
  descColorClass = 'text-gray-600',
  buttonText,
  buttonColorClass,
  onButtonClick,
  className = ''
}) => {
  return (
    <div className={`max-w-4xl mx-auto text-center ${className}`}>
      {Icon && (
        <FadeInSection>
          <Icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 ${iconColorClass}`} />
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
          <p className={`text-base sm:text-xl md:text-2xl mb-6 font-light leading-relaxed ${descColorClass}`}>
            {description}
          </p>
        </FadeInSection>
      )}

      {buttonText && onButtonClick && (
        <FadeInSection delay={250}>
          <LearnMoreButton 
            onClick={onButtonClick} 
            text={buttonText} 
            colorClass={buttonColorClass} 
            className="mb-10 md:mb-16" 
          />
        </FadeInSection>
      )}
    </div>
  );
};
