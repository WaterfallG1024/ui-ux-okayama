import { CloudSun, Sun, Thermometer } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';

export const WeatherSection = ({ weatherRecommendation }) => {
  return (
    <section id="weather" className="py-20 md:py-40 bg-[#F4F9FF] text-gray-900 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center mb-12 md:mb-16">
            <CloudSun className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 text-blue-500" />
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-tight text-gray-900">最適な旅行のタイミング</h2>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-light leading-relaxed">直近14日間の天気予報から<br className="md:hidden" />ベストな日程をご提案します。</p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-6 md:p-12 shadow-sm border border-blue-100 relative">
            {weatherRecommendation.loading ? (
              <div className="animate-pulse flex flex-col items-center justify-center py-10">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-bold tracking-widest">14日間の天気データを解析中...</p>
              </div>
            ) : (
              <div className="relative z-10 text-center">
                {weatherRecommendation.bestStartIndex !== -1 ? (
                  <>
                    {/* おすすめバッジ */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-bold px-5 py-2 rounded-full mb-8 shadow-md">
                      <Sun className="w-4 h-4" />
                      おすすめ日程
                    </div>

                    {/* 日程表示 */}
                    <h3 className="text-3xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
                      {weatherRecommendation.dateRange}
                    </h3>

                    {/* 気象情報 */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 my-8 md:my-10">
                      <div className="flex items-center gap-2.5 bg-orange-50 px-5 py-3 rounded-2xl border border-orange-100">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <span className="text-base md:text-lg font-semibold text-gray-700">最高気温 約{weatherRecommendation.avgMaxTemp}℃</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-sky-50 px-5 py-3 rounded-2xl border border-sky-100">
                        <CloudSun className="w-5 h-5 text-sky-500" />
                        <span className="text-base md:text-lg font-semibold text-gray-700">降水確率 約{weatherRecommendation.avgProb}%</span>
                      </div>
                    </div>

                    {/* 説明テキスト */}
                    <p className="text-gray-600 text-base md:text-xl font-light leading-relaxed max-w-xl mx-auto">
                      {weatherRecommendation.description}
                    </p>
                  </>
                ) : (
                  <>
                    {/* おすすめ期間が見つからなかった場合 */}
                    <div className="inline-flex items-center gap-2 bg-gray-400 text-white text-sm font-bold px-5 py-2 rounded-full mb-8">
                      <CloudSun className="w-4 h-4" />
                      天気情報
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                      {weatherRecommendation.dateRange}
                    </h3>
                    <p className="text-gray-600 text-base md:text-xl font-light leading-relaxed max-w-xl mx-auto">
                      {weatherRecommendation.description}
                    </p>
                  </>
                )}

                {/* フッター */}
                <div className="flex justify-center pt-8 mt-10 border-t border-blue-50">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <CloudSun className="w-3.5 h-3.5" />
                    データ取得：Open-Meteo API
                  </p>
                </div>
              </div>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
