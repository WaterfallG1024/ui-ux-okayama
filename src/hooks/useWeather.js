import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weatherRecommendation, setWeatherRecommendation] = useState({
    loading: true,
    dateRange: '',
    description: '',
    bestStartIndex: -1,
    avgProb: 0,
    avgMaxTemp: 0
  });

  useEffect(() => {
    // 岡山市の天気データを取得
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.65&longitude=133.9333&hourly=temperature_2m,precipitation_probability,precipitation,rain&forecast_days=14');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data || !data.hourly || !data.hourly.time) {
          throw new Error('Invalid data structure from API');
        }

        const hourly = data.hourly;
        const days = [];
        // 24時間ごとに1日のデータとして集計
        for (let i = 0; i < hourly.time.length; i += 24) {
          let maxProb = 0;
          let maxTemp = -999;
          // 配列外アクセスを防ぐため、jの範囲も制限する
          for (let j = 0; j < 24 && i + j < hourly.time.length; j++) {
            const prob = hourly.precipitation_probability[i + j] || 0;
            if (prob > maxProb) maxProb = prob;
            if (hourly.temperature_2m[i + j] > maxTemp) {
              maxTemp = hourly.temperature_2m[i + j];
            }
          }
          days.push({
            dateStr: hourly.time[i], // 例: "2026-05-27T00:00"
            maxProb: maxProb, // その日の最大降水確率
            maxTemp: maxTemp
          });
        }

        let bestStartIndex = -1;
        let minAvgProb = 101; // 最小の降水確率（3日間平均）

        // 3日間の連続で一番降水確率が低い期間を探す（3日間の最大値が50%以下を条件とする）
        for (let i = 0; i < days.length - 2; i++) {
          const threeDaysMaxProb = Math.max(days[i].maxProb, days[i + 1].maxProb, days[i + 2].maxProb);
          if (threeDaysMaxProb < minAvgProb && threeDaysMaxProb <= 50) {
            minAvgProb = threeDaysMaxProb;
            bestStartIndex = i;
          }
        }

        if (bestStartIndex !== -1) {
          const startDateStr = days[bestStartIndex].dateStr;
          const endDateStr = days[bestStartIndex + 2].dateStr;

          // 文字列 "YYYY-MM-DDThh:mm" から "M月D日" を生成
          const formatDate = (dateStr) => {
            const parts = dateStr.split('T')[0].split('-');
            return `${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
          };

          const avgMaxTemp = Math.round((days[bestStartIndex].maxTemp + days[bestStartIndex + 1].maxTemp + days[bestStartIndex + 2].maxTemp) / 3);

          setWeatherRecommendation({
            loading: false,
            dateRange: `${formatDate(startDateStr)} 〜 ${formatDate(endDateStr)}`,
            description: minAvgProb <= 20 ? `降水確率が低く、最高気温は約${avgMaxTemp}℃の予想です。絶好の旅行日和になります！` : `雨の心配は少なく、最高気温は約${avgMaxTemp}℃の予想です。`,
            bestStartIndex: bestStartIndex,
            avgProb: Math.round(minAvgProb),
            avgMaxTemp: avgMaxTemp
          });
        } else {
          setWeatherRecommendation({ loading: false, dateRange: '直近2週間', description: '天気の変動が大きいため、雨具の準備をおすすめします。', bestStartIndex: -1, avgProb: 0, avgMaxTemp: 0 });
        }
      } catch (err) {
        console.error("Weather API error:", err);
        setWeatherRecommendation({ loading: false, dateRange: '取得エラー', description: '天気情報の取得に失敗しました。少し時間をおいて再度お試しください。', bestStartIndex: -1, avgProb: 0, avgMaxTemp: 0 });
      }
    };
    fetchWeather();
  }, []);

  return weatherRecommendation;
};
