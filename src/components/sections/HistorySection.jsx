import { Castle } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { LearnMoreButton } from '../ui/LearnMoreButton';
import momotaro from '../../assets/Momotaro.webp';
import okayamaCastleImg from '../../assets/OkayamaCastle.webp';

export const HistorySection = ({ setActiveDetail }) => {
  return (
    <section id="history" className="py-20 md:py-40 bg-black text-white px-4 relative overflow-hidden">
      {/* 桃太郎伝説ブロック */}
      <div className="max-w-5xl mx-auto relative z-10 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <FadeInSection>
              <Castle className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-[#FF004D]" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight text-white">
                桃太郎伝説の地
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 font-light leading-relaxed">
                日本中が知る英雄、桃太郎。<br />
                そのルーツとされる吉備津彦命（きびつひこのみこと）と<br className="hidden md:block" />鬼神・温羅（うら）の戦いの舞台。<br />
                神話と歴史が交差する、神秘的な物語がここから始まります。
              </p>
            </FadeInSection>

            <FadeInSection delay={300}>
              <LearnMoreButton onClick={() => setActiveDetail('momotaro')} text="桃太郎伝説についてさらに詳しく" colorClass="text-[#FF004D] hover:text-red-400" />
            </FadeInSection>
          </div>

          <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
            <FadeInSection delay={400}>
              <div className="aspect-[4/5] bg-neutral-900 rounded-[24px] overflow-hidden border border-neutral-800 flex items-center justify-center relative shadow-2xl hover:-translate-y-1 transition-transform duration-500">
                <img src={momotaro} className="w-full h-full object-cover" alt="桃太郎" loading="lazy" decoding="async" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <FadeInSection>
              <Castle className="w-10 h-10 md:w-12 md:h-12 mx-auto md:mx-0 mb-4 md:mb-6 text-gray-400" />
            </FadeInSection>

            <FadeInSection delay={100}>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight text-white">
                美しき漆黒
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 font-light leading-relaxed">
                烏城とも呼ばれる堂々たる風格。
              </p>
            </FadeInSection>

            <FadeInSection delay={300}>
              <LearnMoreButton onClick={() => setActiveDetail('history')} text="岡山城についてさらに詳しく" colorClass="text-blue-400 hover:text-blue-300" />
            </FadeInSection>
          </div>

          <div className="flex-1 w-full max-w-sm md:max-w-none mx-auto">
            <FadeInSection delay={400}>
              <div className="aspect-[4/5] bg-neutral-900 rounded-[24px] overflow-hidden border border-neutral-800 flex items-center justify-center relative shadow-2xl hover:-translate-y-1 transition-transform duration-500">
                <img src={okayamaCastleImg} className="w-full h-full object-cover" alt="岡山城" loading="lazy" decoding="async" />
              </div>
            </FadeInSection>
          </div>
        </div>

        <FadeInSection delay={500}>
          <div className="mt-12 md:mt-20 w-full h-64 md:h-96 rounded-[24px] overflow-hidden shadow-2xl border border-neutral-800">
            <iframe
              src="https://maps.google.com/maps?q=岡山城&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map - 岡山城"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
