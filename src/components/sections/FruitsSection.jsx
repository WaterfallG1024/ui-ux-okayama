import { Grape } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { SectionHeader } from '../ui/SectionHeader';
import { FRUITS_DATA } from '../../constants';

export const FruitsSection = ({ setActiveDetail }) => {
  return (
    <section id="fruits" className="py-20 md:py-32 bg-white text-gray-900 text-center px-4 relative z-10 border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          icon={Grape}
          iconColorClass="text-green-500"
          title="果物の宝庫"
          description={<>清水白桃の甘美な香りと、マスカットの弾ける果汁。<br />温暖な気候が育む、最高品質の果物たち。</>}
          buttonText="果物についてさらに詳しく"
          buttonColorClass="text-green-600 hover:text-green-500"
          onButtonClick={() => setActiveDetail('fruits')}
        />

        {/* 果物のタイル一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {FRUITS_DATA.map((fruit) => (
            <FadeInSection key={fruit.title} delay={fruit.delay}>
              <div tabIndex="0" className="bg-slate-50 rounded-[24px] overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 focus:shadow-xl focus:-translate-y-1 transition-all duration-500 group relative w-full h-80 md:h-96 flex items-end outline-none">
                <img src={fruit.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-700 ease-in-out" alt={fruit.alt} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 p-6 md:p-8 w-full text-left transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">{fruit.title}</h3>
                  <p className="text-base md:text-lg text-white/90 font-medium opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 delay-100">{fruit.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
