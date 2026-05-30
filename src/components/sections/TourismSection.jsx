import { Compass } from 'lucide-react';
import { FeatureBlock } from '../ui/FeatureBlock';
import { MapBlock } from '../ui/MapBlock';
import kurashikiImg2 from '../../assets/KurashikiBikantiku2.webp';
import hiruzenkogen2 from '../../assets/Hiruzenkogen2.webp';

export const TourismSection = ({ setActiveDetail }) => {
  return (
    <section id="tourism" className="py-20 md:py-40 bg-orange-50 text-gray-900 px-4 relative overflow-hidden border-b border-orange-100">
      
      {/* 倉敷美観地区ブロック */}
      <div className="max-w-5xl mx-auto relative z-10 mb-20 md:mb-32">
        <FeatureBlock
          icon={Compass}
          iconColorClass="text-orange-400"
          title={<>時を忘れる、<br />白壁の町並み</>}
          titleColorClass="text-gray-900"
          description={
            <>
              倉敷美観地区。<br />
              柳が揺れる川沿いを歩けば、江戸の情緒が蘇る。<br />
              歴史とアートが交差する、ノスタルジックな癒やしの時間。
            </>
          }
          descColorClass="text-gray-700"
          buttonText="倉敷美観地区についてさらに詳しく"
          buttonColorClass="text-orange-500 hover:text-orange-400"
          onButtonClick={() => setActiveDetail('tourism')}
          image={kurashikiImg2}
          imageAlt="倉敷美観地区"
          imgBgClass="bg-orange-100/50"
          imgBorderClass="border-orange-200"
          reverse={true}
        />

        <MapBlock 
          query="倉敷美観地区" 
          title="倉敷美観地区" 
          borderClass="border-orange-200" 
        />
      </div>

      {/* 蒜山高原ブロック */}
      <div className="max-w-5xl mx-auto relative z-10">
        <FeatureBlock
          icon={Compass}
          iconColorClass="text-green-600"
          title={<>緑あふれる、<br />雄大な高原</>}
          titleColorClass="text-gray-900"
          description={
            <>
              西日本を代表するリゾート地、蒜山高原。<br />
              どこまでも続く緑の牧草地とジャージー牛たち。<br />
              大自然の息吹を感じながら、心安らぐひとときを。
            </>
          }
          descColorClass="text-gray-700"
          buttonText="蒜山高原についてさらに詳しく"
          buttonColorClass="text-green-600 hover:text-green-500"
          onButtonClick={() => setActiveDetail('hiruzen')}
          image={hiruzenkogen2}
          imageAlt="蒜山高原"
          imgBgClass="bg-green-50/50"
          imgBorderClass="border-green-200"
          reverse={false}
        />

        <MapBlock 
          query="蒜山高原" 
          title="蒜山高原" 
          borderClass="border-green-200" 
        />
      </div>
    </section>
  );
};
