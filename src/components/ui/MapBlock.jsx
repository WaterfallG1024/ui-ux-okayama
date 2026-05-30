import React from 'react';
import { FadeInSection } from './FadeInSection';

/**
 * GoogleマップをIframeで表示する共通コンポーネント
 */
export const MapBlock = ({
  query,
  title,
  borderClass = 'border-gray-200',
  shadowClass = 'shadow-xl',
  className = ''
}) => {
  return (
    <FadeInSection delay={500}>
      <div className={`mt-12 md:mt-20 w-full h-64 md:h-96 rounded-[24px] overflow-hidden ${shadowClass} border ${borderClass} ${className}`}>
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Google Map - ${title}`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </div>
    </FadeInSection>
  );
};
