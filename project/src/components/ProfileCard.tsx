import React, { useState } from 'react';
import { AuraProfile, AuraType } from '../types';
import AuraMeter from './AuraMeter';
import { updateProfileAura } from '../utils/localStorage';

interface ProfileCardProps {
  profile: AuraProfile;
  isInteractive?: boolean;
  showVoteButton?: boolean;
  onBattleSelect?: () => void;
  isSelected?: boolean;
  isBattleWinner?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isInteractive = true,
  showVoteButton = true,
  onBattleSelect,
  isSelected = false,
  isBattleWinner = false
}) => {
  const [selectedAuras, setSelectedAuras] = useState<AuraType[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleAuraSelect = (auraType: AuraType) => {
    if (hasVoted) return;
    
    setSelectedAuras(prev => {
      if (prev.includes(auraType)) {
        return prev.filter(a => a !== auraType);
      } else {
        return [...prev, auraType];
      }
    });
  };

  const handleSubmitVote = () => {
    if (selectedAuras.length === 0 || hasVoted) return;
    
    setIsVoting(true);
    
    // Apply votes with a slight delay for visual effect
    selectedAuras.forEach((auraType, index) => {
      setTimeout(() => {
        updateProfileAura({ profileId: profile.id, auraType });
        
        // After last vote is processed
        if (index === selectedAuras.length - 1) {
          setTimeout(() => {
            setHasVoted(true);
            setIsVoting(false);
          }, 300);
        }
      }, index * 200);
    });
  };

  const cardClasses = `
    relative overflow-hidden rounded-xl bg-surface p-4 transition-all
    ${isSelected ? 'ring-2 ring-primary' : ''}
    ${isBattleWinner ? 'animate-glow shadow-aura scale-105' : ''}
    ${onBattleSelect ? 'cursor-pointer hover:shadow-aura hover:scale-105 transition-transform duration-300' : ''}
  `;

  return (
    <div 
      className={cardClasses}
      onClick={onBattleSelect}
    >
      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.username} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-surface-light flex items-center justify-center text-2xl">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{profile.username}</h3>
          <p className="text-sm text-gray-300 italic">"{profile.tagline}"</p>
        </div>
      </div>

      {/* Aura Meter */}
      <AuraMeter 
        auras={profile.auras}
        onVote={isInteractive && !hasVoted ? handleAuraSelect : undefined}
        selectedAuras={selectedAuras}
      />

      {/* Vote Stats */}
      <div className="mt-4 text-sm text-gray-400 flex justify-between items-center">
        <span>Total Votes: {profile.totalVotes}</span>
        
        {/* Vote Button */}
        {showVoteButton && isInteractive && (
          hasVoted ? (
            <span className="text-secondary font-medium animate-pulse-slow">
              Thanks for voting!
            </span>
          ) : (
            <button
              onClick={handleSubmitVote}
              disabled={selectedAuras.length === 0 || isVoting}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-medium
                ${selectedAuras.length > 0 
                  ? 'bg-primary hover:bg-primary/80 text-white' 
                  : 'bg-gray-700 text-gray-300 cursor-not-allowed'}
                ${isVoting ? 'animate-pulse' : ''}
                transition-all duration-300
              `}
            >
              {isVoting ? 'Submitting...' : 'Submit Vote'}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileCard;