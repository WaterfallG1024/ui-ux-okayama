import { Scissors } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { LearnMoreButton } from '../ui/LearnMoreButton';
import kojimajeansImg from '../../assets/KojimaJeans.webp';

export const FashionSection = ({ setActiveDetail }) => {
  return (
    <section id="denim" className="py-20 md:py-40 bg-[#0A192F] text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
          <Scissors className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-blue-300" />
        </FadeInSection>

        <FadeInSection delay={100}>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 text-blue-50">
            世界に誇る青
          </h2>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className="text-base sm:text-xl md:text-2xl text-blue-200/80 mb-6 font-light leading-relaxed">
            職人の魂が宿る、児島ジーンズ。<br />
            色落ちすらも、美しいアートになる。
          </p>
        </FadeInSection>

        <FadeInSection delay={250}>
          <LearnMoreButton onClick={() => setActiveDetail('denim')} text="児島デニムについてさらに詳しく" colorClass="text-blue-300 hover:text-blue-200" className="mb-10 md:mb-16" />
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="w-full h-48 sm:h-64 md:h-96 bg-blue-900/30 rounded-[24px] border border-blue-500/20 shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center backdrop-blur-sm overflow-hidden relative">
            <img src={kojimajeansImg} className="w-full h-full object-cover" alt="児島ジーンズ" loading="lazy" decoding="async" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
