import React from 'react';
import { AuraType } from '../types';
import { auraDescriptions } from '../data/mockData';

interface AuraTagProps {
  type: AuraType;
  value: number;
  onVote?: () => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AuraTag: React.FC<AuraTagProps> = ({
  type,
  value,
  onVote,
  isSelectable = false,
  isSelected = false,
  showPercentage = false,
  size = 'md'
}) => {
  const maxValue = 100; // Maximum possible value
  const percentage = Math.min(100, Math.round((value / maxValue) * 100));
  
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4'
  };
  
  const baseClasses = `
    rounded-full font-medium transition-all duration-300 
    flex items-center gap-2 ${sizeClasses[size]}
  `;
  
  const getBackgroundStyle = () => {
    // Static background for non-selectable tags
    if (!isSelectable) {
      return `bg-${type} bg-opacity-20 text-${type}`;
    }
    
    // Interactive backgrounds for selectable tags
    if (isSelected) {
      return `bg-${type} text-white shadow-${type} animate-pulse-slow`;
    }
    
    return `bg-${type} bg-opacity-10 text-${type} hover:bg-opacity-30`;
  };
  
  const handleClick = () => {
    if (isSelectable && onVote) {
      onVote();
    }
  };
  
  return (
    <div 
      className={`
        ${baseClasses} 
        ${getBackgroundStyle()}
        ${isSelectable ? 'cursor-pointer transform hover:scale-105' : ''}
      `}
      onClick={handleClick}
    >
      <span className="flex-shrink-0">{auraDescriptions[type].icon}</span>
      <span className="capitalize">{type}</span>
      {showPercentage && (
        <span className="ml-1 opacity-80">{percentage}%</span>
      )}
    </div>
  );
};

export default AuraTag;