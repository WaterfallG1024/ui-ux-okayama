import { Compass } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { LearnMoreButton } from '../ui/LearnMoreButton';
import kurashikiImg2 from '../../assets/KurashikiBikantiku2.webp';
import hiruzenkogen from '../../assets/Hiruzenkogen.webp';

export const TourismSection = ({ setActiveDetail }) => {
  return (
    <section id="tourism" className="py-20 md:py-40 bg-orange-50 text-gray-900 px-4 relative overflow-hidden border-b border-orange-100">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <FadeInSection>
              <Compass className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-orange-400" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight text-gray-900">
                時を忘れる、<br />白壁の町並み
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 font-light leading-relaxed">
                倉敷美観地区。<br />
                柳が揺れる川沿いを歩けば、江戸の情緒が蘇る。<br />
                歴史とアートが交差する、ノスタルジックな癒やしの時間。
              </p>
            </FadeInSection>

            <FadeInSection delay={300}>
              <LearnMoreButton onClick={() => setActiveDetail('tourism')} text="倉敷美観地区についてさらに詳しく" colorClass="text-orange-500 hover:text-orange-400" />
            </FadeInSection>
          </div>

          <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
            <FadeInSection delay={400}>
              <div className="aspect-[4/5] bg-orange-100/50 rounded-[24px] overflow-hidden border border-orange-200 shadow-xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center relative">
                <img src={kurashikiImg2} className="w-full h-full object-cover" alt="倉敷美観地区" loading="lazy" decoding="async" />
              </div>
            </FadeInSection>
          </div>
        </div>

        <FadeInSection delay={500}>
          <div className="mt-12 md:mt-20 w-full h-64 md:h-96 rounded-[24px] overflow-hidden shadow-xl border border-orange-200">
            <iframe
              src="https://maps.google.com/maps?q=倉敷美観地区&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map - 倉敷美観地区"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          </div>
        </FadeInSection>

        {/* 蒜山高原ブロック */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mt-20 md:mt-32">
          <div className="flex-1 text-center md:text-left">
            <FadeInSection>
              <Compass className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-green-600" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight text-gray-900">
                緑あふれる、<br />雄大な高原
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base md:text-xl text-gray-700 mb-6 md:mb-8 font-light leading-relaxed">
                西日本を代表するリゾート地、蒜山高原。<br />
                どこまでも続く緑の牧草地とジャージー牛たち。<br />
                大自然の息吹を感じながら、心安らぐひとときを。
              </p>
            </FadeInSection>

            <FadeInSection delay={300}>
              <LearnMoreButton onClick={() => setActiveDetail('hiruzen')} text="蒜山高原についてさらに詳しく" colorClass="text-green-600 hover:text-green-500" />
            </FadeInSection>
          </div>

          <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
            <FadeInSection delay={400}>
              <div className="aspect-[4/5] bg-green-50/50 rounded-[24px] overflow-hidden border border-green-200 shadow-xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center relative">
                <img src={hiruzenkogen} className="w-full h-full object-cover" alt="蒜山高原" loading="lazy" decoding="async" />
              </div>
            </FadeInSection>
          </div>
        </div>

        <FadeInSection delay={500}>
          <div className="mt-12 md:mt-20 w-full h-64 md:h-96 rounded-[24px] overflow-hidden shadow-xl border border-green-200">
            <iframe
              src="https://maps.google.com/maps?q=蒜山高原&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map - 蒜山高原"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
