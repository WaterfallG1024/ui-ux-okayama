import { Scissors } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { SectionHeader } from '../ui/SectionHeader';
import kojimajeansImg from '../../assets/KojimaJeans.webp';

export const FashionSection = ({ setActiveDetail }) => {
  return (
    <section id="denim" className="py-20 md:py-40 bg-[#0A192F] text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          icon={Scissors}
          iconColorClass="text-blue-300"
          title="世界に誇る青"
          titleColorClass="text-blue-50"
          description={<>熟練の職人の魂が宿る、世界に誇る児島ジーンズ。<br />色落ちすらも、美しく唯一無二のアートになる。</>}
          descColorClass="text-blue-200/80"
          buttonText="児島ジーンズについてさらに詳しく"
          buttonColorClass="text-blue-300 hover:text-blue-200"
          onButtonClick={() => setActiveDetail('denim')}
        />

        <FadeInSection delay={300}>
          <div className="w-full h-48 sm:h-64 md:h-96 bg-blue-900/30 rounded-[24px] border border-blue-500/20 shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center backdrop-blur-sm overflow-hidden relative">
            <img src={kojimajeansImg} className="w-full h-full object-cover" alt="児島ジーンズ" loading="lazy" decoding="async" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
