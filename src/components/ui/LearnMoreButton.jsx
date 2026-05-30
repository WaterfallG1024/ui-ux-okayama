import { ChevronRight } from 'lucide-react';

export const LearnMoreButton = ({ onClick, text, colorClass, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center cursor-pointer ${colorClass} font-medium text-base md:text-lg group transition-colors ${className}`}
  >
    {text}
    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
  </button>
);
