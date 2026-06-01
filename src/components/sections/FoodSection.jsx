import { UtensilsCrossed } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { SectionHeader } from '../ui/SectionHeader';
import { FOOD_DATA } from '../../constants';

export const FoodSection = ({ setActiveDetail }) => {
  return (
    <section id="food" className="py-20 md:py-32 bg-[#FFF9F0] text-gray-900 text-center px-4 relative z-10 border-b border-orange-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          icon={UtensilsCrossed}
          iconColorClass="text-orange-500"
          title={<>絶品の、<br className="md:hidden" />岡山グルメ</>}
          description={<>一度食べたら決して忘れられない、特別な味わい。<br />五感を刺激する、こだわりのローカルフード。</>}
          buttonText="グルメについてさらに詳しく"
          buttonColorClass="text-orange-600 hover:text-orange-500"
          onButtonClick={() => setActiveDetail('food')}
        />

        {/* グルメのタイル一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
          {FOOD_DATA.map((food) => (
            <FadeInSection key={food.title} delay={food.delay} className={`${food.colSpan} ${food.rowSpan} h-64 md:h-full`}>
              <div tabIndex="0" className="bg-orange-100/50 rounded-[24px] overflow-hidden shadow-sm border border-orange-900/5 hover:shadow-xl hover:-translate-y-1 focus:shadow-xl focus:-translate-y-1 transition-all duration-500 group relative w-full h-full flex items-end outline-none">
                <img src={food.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-700 ease-in-out" alt={food.alt} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 p-6 md:p-8 w-full text-left transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md">{food.title}</h3>
                  <p className="text-sm md:text-base text-white/90 font-medium opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 delay-100">{food.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
