import { CloudSun, Sun, Thermometer, CloudRain, CalendarDays } from 'lucide-react';
import { FadeInSection } from '../ui/FadeInSection';
import { SectionHeader } from '../ui/SectionHeader';

export const WeatherSection = ({ weatherRecommendation }) => {
  return (
    <section id="weather" className="py-20 md:py-40 bg-[#F4F9FF] text-gray-900 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 天気セクションのヘッダー */}
        <SectionHeader
          icon={CloudSun}
          iconColorClass="text-blue-500"
          title="最適な旅行のタイミング"
          description={<>直近14日間の天気予報から<br className="md:hidden" />天候に恵まれたベストな候補日を3つご提案します。</>}
          className="mb-8"
        />

        {/* 天気データの表示ブロック */}
        <FadeInSection delay={300}>
          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] p-6 md:p-12 shadow-xl shadow-blue-900/5 border border-white relative">
            {weatherRecommendation.loading ? (
              <div className="animate-pulse flex flex-col items-center justify-center py-10">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-bold tracking-widest">14日間の天気データを解析中...</p>
              </div>
            ) : weatherRecommendation.error || !weatherRecommendation.topDays || weatherRecommendation.topDays.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">{weatherRecommendation.description || '天気情報の取得に失敗しました。'}</p>
              </div>
            ) : (
              <div className="relative z-10 text-center">
                
                {/* 候補日のタイル一覧 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
                  {weatherRecommendation.topDays.map((day) => (
                    <div key={day.dateStr} className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col items-center">
                      
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <CalendarDays className="w-10 h-10 text-blue-500" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
                        {day.formattedDate}
                      </h3>
                      
                      <div className="w-full space-y-3">
                        <div className="flex items-center justify-between bg-gray-50/50 px-5 py-4 rounded-[16px] border border-gray-100/50">
                          <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <Thermometer className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">最高気温</span>
                          </div>
                          <span className="text-xl font-bold text-gray-800">{day.maxTemp}<span className="text-sm font-normal text-gray-500 ml-1">℃</span></span>
                        </div>
                        
                        <div className="flex items-center justify-between bg-gray-50/50 px-5 py-4 rounded-[16px] border border-gray-100/50">
                          <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <CloudRain className="w-4 h-4 text-sky-500" />
                            <span className="text-sm">最大降水確率</span>
                          </div>
                          <span className="text-xl font-bold text-gray-800">{day.maxProb}<span className="text-sm font-normal text-gray-500 ml-1">%</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* データソースクレジット */}
                <div className="flex justify-end pt-6 mt-8 border-t border-blue-50/80">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
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
