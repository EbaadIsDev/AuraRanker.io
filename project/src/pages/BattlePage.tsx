import React, { useState, useEffect } from 'react';
import { AuraProfile } from '../types';
import ProfileCard from '../components/ProfileCard';
import { getProfiles, saveBattleResult } from '../utils/localStorage';
import { Swords, ArrowRight } from 'lucide-react';

const BattlePage: React.FC = () => {
  const [profiles, setProfiles] = useState<AuraProfile[]>([]);
  const [battlePair, setBattlePair] = useState<[AuraProfile | null, AuraProfile | null]>([null, null]);
  const [winner, setWinner] = useState<string | null>(null);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [battleComplete, setBattleComplete] = useState(false);
  
  useEffect(() => {
    // Load profiles from local storage
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
    
    // Set up a random battle pair if we have enough profiles
    if (loadedProfiles.length >= 2) {
      setupRandomBattle(loadedProfiles);
    }
    
    // Set up interval to refresh profiles
    const interval = setInterval(() => {
      const updatedProfiles = getProfiles();
      setProfiles(updatedProfiles);
    }, 5000); // Check for updates every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate a random battle pair from available profiles
  const setupRandomBattle = (availableProfiles = profiles) => {
    if (availableProfiles.length < 2) {
      return;
    }
    
    // Reset battle state
    setWinner(null);
    setBattleComplete(false);
    setBattleInProgress(false);
    
    // Create a copy to avoid modifying the original array
    const profilesCopy = [...availableProfiles];
    
    // Select two random profiles
    const index1 = Math.floor(Math.random() * profilesCopy.length);
    let index2 = Math.floor(Math.random() * (profilesCopy.length - 1));
    
    // Adjust second index to avoid selecting the same profile
    if (index2 >= index1) index2++;
    
    setBattlePair([profilesCopy[index1], profilesCopy[index2]]);
  };
  
  // Handle battle selection
  const handleSelectWinner = (profileId: string) => {
    if (battleInProgress || battleComplete || !battlePair[0] || !battlePair[1]) return;
    
    // Set battle in progress
    setBattleInProgress(true);
    
    // Animate battle
    setTimeout(() => {
      // Set winner and save result
      setWinner(profileId);
      const loserId = profileId === battlePair[0].id ? battlePair[1].id : battlePair[0].id;
      saveBattleResult(profileId, loserId);
      
      // Mark battle as complete
      setBattleInProgress(false);
      setBattleComplete(true);
    }, 1500);
  };
  
  // Start a new battle
  const handleNextBattle = () => {
    setupRandomBattle();
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Aura Battle</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Who has the stronger aura? Choose the profile with the most powerful energy!
        </p>
      </div>
      
      {profiles.length < 2 ? (
        <div className="text-center py-16 bg-surface rounded-xl">
          <p className="text-gray-400 text-lg mb-4">
            Not enough profiles for a battle. Create at least two profiles!
          </p>
        </div>
      ) : (
        <>
          {/* Battle arena */}
          <div className="relative mb-8">
            {/* VS indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className={`
                bg-primary rounded-full w-16 h-16 flex items-center justify-center shadow-aura
                ${battleInProgress ? 'animate-spin' : 'animate-pulse-slow'}
              `}>
                <Swords size={24} className="text-white" />
              </div>
            </div>
            
            {/* Battle cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
              {battlePair[0] && (
                <div className={`
                  transform transition-all duration-700
                  ${battleInProgress ? 'scale-105' : ''}
                  ${battleComplete && winner === battlePair[0].id ? 'scale-105' : ''}
                  ${battleComplete && winner !== battlePair[0].id ? 'opacity-70 scale-95' : ''}
                `}>
                  <ProfileCard 
                    profile={battlePair[0]} 
                    isInteractive={false}
                    showVoteButton={false}
                    onBattleSelect={() => handleSelectWinner(battlePair[0]!.id)}
                    isBattleWinner={battleComplete && winner === battlePair[0].id}
                  />
                </div>
              )}
              
              {battlePair[1] && (
                <div className={`
                  transform transition-all duration-700
                  ${battleInProgress ? 'scale-105' : ''}
                  ${battleComplete && winner === battlePair[1].id ? 'scale-105' : ''}
                  ${battleComplete && winner !== battlePair[1].id ? 'opacity-70 scale-95' : ''}
                `}>
                  <ProfileCard 
                    profile={battlePair[1]} 
                    isInteractive={false}
                    showVoteButton={false}
                    onBattleSelect={() => handleSelectWinner(battlePair[1]!.id)}
                    isBattleWinner={battleComplete && winner === battlePair[1].id}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Battle status and controls */}
          <div className="text-center">
            {battleInProgress ? (
              <div className="text-lg font-medium text-primary animate-pulse">
                Battle in progress...
              </div>
            ) : battleComplete ? (
              <div className="space-y-4">
                <div className="text-xl font-bold text-primary">
                  Battle complete! The winner's aura has been strengthened!
                </div>
                <button
                  onClick={handleNextBattle}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-aura flex items-center justify-center mx-auto space-x-2 transition-all duration-300"
                >
                  <span>Next Battle</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div className="text-lg font-medium text-gray-300">
                Click on the profile with the stronger aura!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BattlePage;