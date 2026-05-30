import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weatherRecommendation, setWeatherRecommendation] = useState({
    loading: true,
    topDays: [],
    description: '',
    error: false
  });

  useEffect(() => {
    // 岡山市の天気データを取得
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.65&longitude=133.9333&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FTokyo&forecast_days=14');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data || !data.daily || !data.daily.time) {
          throw new Error('Invalid data structure from API');
        }

        const daily = data.daily;
        const days = [];
        
        // 取得した14日間の日別データを処理
        for (let i = 0; i < daily.time.length; i++) {
          const maxProb = daily.precipitation_probability_max[i] || 0;
          const maxTemp = daily.temperature_2m_max[i] || 0;
          const dateStr = daily.time[i]; // "YYYY-MM-DD"
          
          // スコア計算
          let score = 100 - maxProb;
          if (maxTemp >= 18 && maxTemp <= 28) {
            score += 20;
          } else if (maxTemp < 10 || maxTemp > 35) {
            score -= 20;
          }

          days.push({
            dateStr: dateStr,
            maxProb: maxProb,
            maxTemp: maxTemp,
            score: score
          });
        }

        const formatShortDate = (dateStr) => {
          const d = new Date(dateStr);
          const dow = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
          return `${d.getMonth() + 1}/${d.getDate()}(${dow})`;
        };

        const formatDayOnly = (dateStr) => {
          const d = new Date(dateStr);
          const dow = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
          return `${d.getDate()}(${dow})`;
        };

        // 連続する2日間（1泊2日）のペアを作成
        const pairs = [];
        for (let i = 0; i < days.length - 1; i++) {
          const day1 = days[i];
          const day2 = days[i + 1];
          
          const maxProb = Math.max(day1.maxProb, day2.maxProb);
          const avgMaxTemp = Math.round((day1.maxTemp + day2.maxTemp) / 2);
          const totalScore = day1.score + day2.score;
          
          pairs.push({
            startIndex: i,
            dateStr: day1.dateStr, // react key用
            formattedDate: `${formatShortDate(day1.dateStr)}〜${formatDayOnly(day2.dateStr)}`,
            maxProb: maxProb,
            maxTemp: avgMaxTemp,
            score: totalScore
          });
        }

        // スコアが高い順にソート
        pairs.sort((a, b) => b.score - a.score);

        // 重複する日（例：1-2日目と2-3日目）を除外しながらトップ3を選ぶ
        const topDays = [];
        const usedIndices = new Set();
        
        for (const pair of pairs) {
          if (topDays.length >= 3) break;
          if (!usedIndices.has(pair.startIndex) && !usedIndices.has(pair.startIndex + 1)) {
            topDays.push(pair);
            usedIndices.add(pair.startIndex);
            usedIndices.add(pair.startIndex + 1);
          }
        }
        
        // 表示用に時系列順に並び替え
        topDays.sort((a, b) => a.startIndex - b.startIndex);

        const avgTopProb = Math.round((topDays[0].maxProb + topDays[1].maxProb + topDays[2].maxProb) / 3);

        setWeatherRecommendation({
          loading: false,
          topDays: topDays,
          description: '',
          error: false
        });
      } catch (err) {
        console.error("Weather API error:", err);
        setWeatherRecommendation({ 
          loading: false, 
          topDays: [],
          description: '天気情報の取得に失敗しました。少し時間をおいて再度お試しください。', 
          error: true
        });
      }
    };
    fetchWeather();
  }, []);

  return weatherRecommendation;
};
