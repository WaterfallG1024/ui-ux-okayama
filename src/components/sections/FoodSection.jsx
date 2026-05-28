import { UtensilsCrossed } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { LearnMoreButton } from '../ui/LearnMoreButton';
import { FOOD_DATA } from '../../constants';

export const FoodSection = ({ setActiveDetail }) => {
  return (
    <section id="food" className="py-20 md:py-32 bg-[#FFF9F0] text-gray-900 text-center px-4 relative z-10 border-b border-orange-100">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <UtensilsCrossed className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-orange-500" />
        </FadeInSection>

        <FadeInSection delay={100}>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-gray-900">
            絶品の、<br className="md:hidden" />岡山グルメ
          </h2>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 font-light leading-relaxed">
            一度食べたら忘れられない。<br />
            五感を刺激する、こだわりのローカルフード。
          </p>
        </FadeInSection>

        <FadeInSection delay={250}>
          <LearnMoreButton onClick={() => setActiveDetail('food')} text="グルメについてさらに詳しく" colorClass="text-orange-600 hover:text-orange-500" className="mb-10 md:mb-16" />
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
          {FOOD_DATA.map((food) => (
            <FadeInSection key={food.title} delay={food.delay} className={`${food.colSpan} ${food.rowSpan} h-64 md:h-full`}>
              <div className="bg-orange-100/50 rounded-[24px] overflow-hidden shadow-sm border border-orange-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative w-full h-full flex items-end">
                <img src={food.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" alt={food.alt} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 p-6 md:p-8 w-full text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md">{food.title}</h3>
                  <p className="text-sm md:text-base text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{food.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
