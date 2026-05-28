import { ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';

export const BottomNav = ({ isHeroVisible, scrollToSection }) => {
  return (
    <div
      className={`fixed bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-[90] transition-all duration-700 ease-out flex items-center justify-center gap-2 sm:gap-4 w-[98%] sm:w-auto max-w-5xl ${!isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="h-16 sm:h-20 flex flex-nowrap items-center justify-between sm:justify-center gap-0 sm:gap-2 px-1.5 sm:px-2 bg-white/90 backdrop-blur-xl border border-[#E9E9E7] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex-1 sm:flex-none">
        {NAV_ITEMS.map((item) => (
          <button key={`bottom-${item.id}`} onClick={() => scrollToSection(item.id)} className="h-14 sm:h-16 flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 px-1 sm:px-6 hover:bg-[#F7F7F5] rounded-full transition-all group flex-1 sm:flex-none">
            <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-gray-400 ${item.navHoverColor} group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300`} />
            <span className="text-[10px] sm:text-[13px] font-bold tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors duration-300 truncate">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-xl border border-[#E9E9E7] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center p-1 sm:p-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full h-full flex items-center justify-center hover:bg-[#F7F7F5] rounded-full transition-all group"
          aria-label="トップに戻る"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#37352F] -rotate-90 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
