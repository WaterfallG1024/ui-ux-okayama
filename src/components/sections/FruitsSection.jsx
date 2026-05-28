import { Grape } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { LearnMoreButton } from '../ui/LearnMoreButton';
import { FRUITS_DATA } from '../../constants';

export const FruitsSection = ({ setActiveDetail }) => {
  return (
    <section id="fruits" className="py-20 md:py-32 bg-white text-gray-900 text-center px-4 relative z-10 border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <Grape className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-green-500" />
        </FadeInSection>

        <FadeInSection delay={100}>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-gray-900">
            果物の宝庫
          </h2>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 font-light leading-relaxed">
            清水白桃の甘美な香り。マスカットの弾ける果汁。
          </p>
        </FadeInSection>

        <FadeInSection delay={250}>
          <LearnMoreButton onClick={() => setActiveDetail('fruits')} text="果物についてさらに詳しく" colorClass="text-green-600 hover:text-green-500" className="mb-10 md:mb-16" />
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {FRUITS_DATA.map((fruit) => (
            <FadeInSection key={fruit.title} delay={fruit.delay}>
              <div className="bg-slate-50 rounded-[24px] overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative w-full h-80 md:h-96 flex items-end">
                <img src={fruit.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" alt={fruit.alt} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 p-6 md:p-8 w-full text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">{fruit.title}</h3>
                  <p className="text-base md:text-lg text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{fruit.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
