import React from 'react';
import { AuraType } from '../types';
import AuraTag from './AuraTag';
import { auraDescriptions } from '../data/mockData';

interface AuraMeterProps {
  auras: Record<AuraType, number>;
  onVote?: (auraType: AuraType) => void;
  selectedAuras?: AuraType[];
  showPercentages?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AuraMeter: React.FC<AuraMeterProps> = ({
  auras,
  onVote,
  selectedAuras = [],
  showPercentages = true,
  size = 'md'
}) => {
  // Calculate the dominant aura (highest value)
  const dominantAura = Object.entries(auras).reduce(
    (max, [key, value]) => (value > max.value ? { key, value } : max),
    { key: '', value: -1 }
  ).key as AuraType;
  
  // Sort auras by value in descending order
  const sortedAuras = Object.entries(auras)
    .sort(([, valueA], [, valueB]) => valueB - valueA)
    .map(([key]) => key as AuraType);

  return (
    <div className="w-full">
      {/* Animated aura glow effect */}
      <div 
        className={`h-3 w-full mb-4 rounded-full overflow-hidden relative
          ${onVote ? 'opacity-60' : 'animate-glow shadow-md'}`}
        style={{
          background: `linear-gradient(to right, 
            var(--tw-color-mystic) ${auras.mystic}%, 
            var(--tw-color-alpha) ${auras.alpha}%, 
            var(--tw-color-chaotic) ${auras.chaotic}%, 
            var(--tw-color-chill) ${auras.chill}%, 
            var(--tw-color-regal) ${auras.regal}%, 
            var(--tw-color-menacing) ${auras.menacing}%, 
            var(--tw-color-soft) ${auras.soft}%)`
        }}
      >
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `linear-gradient(to right, 
              rgba(159, 122, 234, 0.7), 
              rgba(229, 62, 62, 0.7), 
              rgba(237, 137, 54, 0.7), 
              rgba(56, 178, 172, 0.7), 
              rgba(214, 158, 46, 0.7), 
              rgba(128, 90, 213, 0.7), 
              rgba(246, 135, 179, 0.7))`,
            backgroundSize: '200% 100%',
            animation: 'gradientShift 5s linear infinite'
          }}
        />
      </div>

      {/* Dominant aura indicator */}
      {!onVote && dominantAura && (
        <div className="mb-3 text-center">
          <span className={`text-${dominantAura} font-medium text-sm`}>
            Dominant Aura: <span className="capitalize">{dominantAura}</span> {auraDescriptions[dominantAura].icon}
          </span>
        </div>
      )}

      {/* Aura tags */}
      <div className="flex flex-wrap gap-2">
        {sortedAuras.map(auraType => (
          <AuraTag
            key={auraType}
            type={auraType}
            value={auras[auraType]}
            onVote={onVote ? () => onVote(auraType) : undefined}
            isSelectable={!!onVote}
            isSelected={selectedAuras.includes(auraType)}
            showPercentage={showPercentages}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default AuraMeter;