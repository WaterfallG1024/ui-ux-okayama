import { Castle } from 'lucide-react';
import { FeatureBlock } from '../ui/FeatureBlock';
import { MapBlock } from '../ui/MapBlock';
import momotaro from '../../assets/Momotaro.webp';
import okayamaCastleImg from '../../assets/OkayamaCastle.webp';

export const HistorySection = ({ setActiveDetail }) => {
  return (
    <section id="history" className="py-20 md:py-40 bg-black text-white px-4 relative overflow-hidden">
      {/* 桃太郎伝説ブロック */}
      <div className="max-w-5xl mx-auto relative z-10 mb-20 md:mb-32">
        <FeatureBlock
          icon={Castle}
          iconColorClass="text-[#FF004D]"
          title="桃太郎伝説の地"
          titleColorClass="text-white"
          description={
            <>
              誰もが知る英雄「桃太郎」のルーツとされる地。<br />
              神話と歴史が交差する、神秘的な物語の舞台。
            </>
          }
          descColorClass="text-gray-400"
          buttonText="桃太郎伝説についてさらに詳しく"
          buttonColorClass="text-[#FF004D] hover:text-red-400"
          onButtonClick={() => setActiveDetail('momotaro')}
          image={momotaro}
          imageAlt="桃太郎"
          imgBgClass="bg-neutral-900"
          imgBorderClass="border-neutral-800"
          imgShadowClass="shadow-2xl"
          reverse={true}
        />
      </div>

      {/* 岡山城ブロック */}
      <div className="max-w-5xl mx-auto relative z-10">
        <FeatureBlock
          icon={Castle}
          iconColorClass="text-gray-400"
          title="美しき漆黒"
          titleColorClass="text-white"
          description={<>「烏城」とも呼ばれる、黒漆塗りの堂々たる風格。<br />美しき漆黒の外観が、深い歴史の息吹を伝える。</>}
          descColorClass="text-gray-400"
          buttonText="岡山城についてさらに詳しく"
          buttonColorClass="text-blue-400 hover:text-blue-300"
          onButtonClick={() => setActiveDetail('history')}
          image={okayamaCastleImg}
          imageAlt="岡山城"
          imgBgClass="bg-neutral-900"
          imgBorderClass="border-neutral-800"
          imgShadowClass="shadow-2xl"
          reverse={false}
        />

        <MapBlock 
          query="岡山城" 
          title="岡山城" 
          borderClass="border-neutral-800" 
          shadowClass="shadow-2xl" 
        />
      </div>
    </section>
  );
};
