import { Grape, Castle, Scissors, Compass, UtensilsCrossed, CloudSun } from 'lucide-react';
import kibitsuShrine from '../assets/KibitsuShrine.webp';
import okayamaCastleImg2 from '../assets/OkayamaCastle2.webp';
import kojimajeansImg2 from '../assets/KojimaJeans2.webp';
import kurashikiImg from '../assets/KurashikiBikantiku.webp';
import hiruzenkogen from '../assets/Hiruzenkogen.webp';
import peach from '../assets/Peach.webp';
import muscat from '../assets/Muscat.webp';
import pione from '../assets/Pione.webp';
import barazushiImg from '../assets/Barazushi.webp';
import demikatsuDonImg from '../assets/DemikatsuDon.webp';
import hinaseKakiokoImg from '../assets/HinaseKakioko.webp';
import hiruzenYakisobaImg from '../assets/HiruzenYakisoba.webp';

// 各セクションの詳細モーダル表示用データ定義
export const DETAIL_DATA = {
  fruits: {
    title: "はじける果実",
    description: "岡山県は「フルーツ王国」として知られています。温暖な気候と豊かな自然が、清水白桃やマスカット・オブ・アレキサンドリア、ピオーネなど、最高品質の果物を育みます。特に白桃は、袋掛け栽培により美しい白さと上品な甘さを実現しています。",
    image: pione
  },
  food: {
    title: "B級グルメの宝庫",
    description: "ばら寿司やデミカツ丼など、岡山ならではの個性豊かなご当地グルメ。B級グルメから伝統的な味まで、訪れる人々を虜にする豊かな食文化がここにあります。",
    image: barazushiImg
  },
  momotaro: {
    title: "桃太郎伝説の舞台、吉備の国",
    description: "昔話「桃太郎」のモデルとなったとされるのが、古代吉備国に伝わる吉備津彦命（きびつひこのみこと）による温羅（うら）退治の伝説です。吉備津神社や鬼ノ城など、伝説にまつわる史跡が今も県内各地に点在しており、古代ロマンを感じることができます。",
    image: kibitsuShrine
  },
  history: {
    title: "漆黒の城、岡山城",
    description: "豊臣秀吉の家臣である宇喜多秀家によって築かれた岡山城。外観が黒塗りの下見板張りであることから「烏城（うじょう）」とも呼ばれます。隣接する日本三名園の一つ「後楽園」とともに、岡山の歴史と文化を象徴する場所です。",
    image: okayamaCastleImg2
  },
  denim: {
    title: "世界に誇る児島ジーンズ",
    description: "倉敷市児島地区は「国産ジーンズ発祥の地」として知られ、現在でも世界中のアパレルブランドから高い評価を受けています。藍染めの技術から縫製、ダメージ加工に至るまで、熟練の職人たちが手作業で仕上げるデニムはまさに芸術品です。",
    image: kojimajeansImg2
  },
  tourism: {
    title: "風情あふれる歴史の町並み",
    description: "倉敷美観地区は、江戸時代の白壁の屋敷や柳並木が美しい、岡山を代表する観光地です。倉敷川での舟流しや、大原美術館など、歴史とアートが融合したノスタルジックな風景を楽しむことができます。",
    image: kurashikiImg
  },
  hiruzen: {
    title: "雄大な自然、蒜山高原",
    description: "西日本屈指のリゾート地、蒜山（ひるぜん）高原。なだらかな山々と広大な牧草地が広がり、ジャージー牛がのんびりと草を食む牧歌的な風景に癒やされます。サイクリングやキャンプ、そして名物の「ひるぜん焼そば」も外せません。",
    image: hiruzenkogen
  }
};

export const NAV_ITEMS = [
  { id: 'fruits', label: 'FRUITS', icon: Grape, color: 'text-green-400', activeColor: 'text-green-600', navHoverColor: 'group-hover:text-green-600 group-active:text-green-600' },
  { id: 'food', label: 'FOOD', icon: UtensilsCrossed, color: 'text-yellow-300', activeColor: 'text-orange-500', navHoverColor: 'group-hover:text-orange-500 group-active:text-orange-500' },
  { id: 'history', label: 'HISTORY', icon: Castle, color: 'text-gray-300', activeColor: 'text-slate-600', navHoverColor: 'group-hover:text-slate-600 group-active:text-slate-600' },
  { id: 'denim', label: 'JEANS', icon: Scissors, color: 'text-blue-400', activeColor: 'text-blue-500', navHoverColor: 'group-hover:text-blue-500 group-active:text-blue-500' },
  { id: 'tourism', label: 'TOURISM', icon: Compass, color: 'text-orange-300', activeColor: 'text-amber-600', navHoverColor: 'group-hover:text-amber-600 group-active:text-amber-600' },
  { id: 'weather', label: 'WEATHER', icon: CloudSun, color: 'text-sky-400', activeColor: 'text-sky-500', navHoverColor: 'group-hover:text-sky-500 group-active:text-sky-500'}
];

export const FRUITS_DATA = [
  {
    title: '白桃',
    desc: 'とろけるような柔らかさと、芳醇な甘い香り。',
    img: peach,
    alt: '白桃',
    delay: 300
  },
  {
    title: 'マスカット',
    desc: '晴天の多さを活かした高い糖度、そして皮ごと食べられる一粒。',
    img: muscat,
    alt: 'マスカット',
    delay: 400
  }
];

export const FOOD_DATA = [
  {
    title: '岡山ばら寿司',
    desc: '瀬戸内の海の幸と旬の野菜を散りばめた贅沢な郷土料理。',
    img: barazushiImg,
    alt: '岡山ばら寿司',
    delay: 300,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2'
  },
  {
    title: 'デミカツ丼',
    desc: '濃厚デミグラスソースの洋食カツ丼。',
    img: demikatsuDonImg,
    alt: 'デミカツ丼',
    delay: 400,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  {
    title: 'ひるぜん焼そば',
    desc: '濃厚な味噌ベースの甘辛ダレと鶏肉が絶妙。',
    img: hiruzenYakisobaImg,
    alt: 'ひるぜん焼そば',
    delay: 500,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  {
    title: '日生カキオコ',
    desc: '旨味たっぷり、牡蠣のお好み焼き。',
    img: hinaseKakiokoImg,
    alt: '日生カキオコ',
    delay: 600,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1'
  }
];
