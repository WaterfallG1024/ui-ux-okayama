import { FadeInSection } from '../ui/FadeInSection';

export const CtaSection = () => {
  return (
    <section id="cta" className="py-20 md:py-32 bg-white text-black text-center px-4">
      <div className="max-w-3xl mx-auto">
        <FadeInSection>
          <div className="mb-12 md:mb-20 flex justify-center w-full px-2 overflow-visible relative z-50">
            <div
              className="flex flex-col items-start font-black text-black select-none whitespace-nowrap"
              style={{
                transform: 'perspective(1000px) rotateY(35deg) skewY(-10deg)',
                transformOrigin: 'center center'
              }}
            >
              <h2 className="flex items-baseline tracking-tighter m-0">
                <span className="text-[10vw] sm:text-6xl md:text-8xl leading-none">Go</span>
                <span className="text-[4.5vw] sm:text-3xl md:text-5xl leading-none ml-1 sm:ml-2 md:ml-3">to</span>
                <span className="text-[11vw] sm:text-[4.5rem] md:text-9xl leading-none ml-1 sm:ml-3 md:ml-6">OKAYAMA！</span>
              </h2>
              {/* スクリーンショットの下部にある矢印をSVGで再現 */}
              <svg viewBox="0 0 100 24" className="w-full h-4 sm:h-8 md:h-12 mt-1 sm:mt-2 md:mt-4" preserveAspectRatio="none">
                <path d="M0,14 L92,8 L92,0 L100,11 L92,22 L92,14 L0,17 Z" fill="black" />
              </svg>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="flex justify-center mt-20 md:mt-32 px-4 overflow-visible pb-10">
            <div
              className="relative inline-block bg-[#FFE600] border-[6px] border-black p-8 md:p-12 shadow-[15px_15px_0px_rgba(0,0,0,1)] text-black font-black leading-tight max-w-3xl hover:scale-105 transition-transform duration-300"
              style={{
                transform: 'perspective(1000px) rotateY(-20deg) rotateX(5deg) skewY(3deg)',
                transformOrigin: 'center center',
                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
              }}
            >
              <p className="flex items-center justify-center mb-6 md:mb-8">
                <span
                  className="text-5xl md:text-7xl text-white tracking-widest font-black"
                  style={{ textShadow: '-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 6px 6px 0 #000' }}
                >
                  おっと!!
                </span>
              </p>
              <p className="mb-6 md:mb-8 text-xl md:text-3xl text-center">
                岡山弁の<span className="text-2xl md:text-6xl text-[#FF004D] mx-2 inline-block -rotate-3" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0 #000' }}>「はよーしねー」</span>は
              </p>
              <p className="mb-8 md:mb-12 text-2xl md:text-4xl text-center">
                "はやくしなさい"<span className="text-3xl md:text-5xl inline-block rotate-2 ml-1">という意味。</span>
              </p>
              <div className="flex justify-center">
                <p className="text-xl md:text-3xl text-center text-black bg-white border-4 border-black p-4 md:p-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] inline-block">
                  怖い言葉ではないので<br className="md:hidden" />ご安心を！！
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
