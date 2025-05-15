import React, { useState, useEffect } from 'react';
import { AuraProfile, AuraType } from '../types';
import { getProfiles } from '../utils/localStorage';
import { Trophy } from 'lucide-react';
import AuraTag from '../components/AuraTag';
import { auraDescriptions } from '../data/mockData';

const LeaderboardPage: React.FC = () => {
  const [profiles, setProfiles] = useState<AuraProfile[]>([]);
  const [selectedAuraType, setSelectedAuraType] = useState<AuraType | 'overall'>('overall');
  
  useEffect(() => {
    // Load profiles from local storage
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
    
    // Set up interval to refresh profiles
    const interval = setInterval(() => {
      setProfiles(getProfiles());
    }, 5000); // Check for updates every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Sort profiles based on selected aura type
  const sortedProfiles = [...profiles].sort((a, b) => {
    if (selectedAuraType === 'overall') {
      return b.totalVotes - a.totalVotes;
    } else {
      return b.auras[selectedAuraType] - a.auras[selectedAuraType];
    }
  }).slice(0, 10); // Top 10 only
  
  // Get all aura types plus overall
  const auraTypes: (AuraType | 'overall')[] = ['overall', 'mystic', 'alpha', 'chaotic', 'chill', 'regal', 'menacing', 'soft'];
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Aura Leaderboard</h1>
        <p className="text-gray-400">
          See who's topping the charts with the strongest auras
        </p>
      </div>
      
      {/* Aura type selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {auraTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedAuraType(type)}
              className={`
                rounded-full font-medium transition-all duration-300 py-1.5 px-4
                flex items-center gap-2
                ${selectedAuraType === type 
                  ? type === 'overall' 
                    ? 'bg-primary text-white shadow-aura animate-pulse-slow' 
                    : `bg-${type} text-white shadow-${type} animate-pulse-slow`
                  : type === 'overall'
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : `bg-${type}/20 text-${type} hover:bg-${type}/30`
                }
              `}
            >
              {type === 'overall' ? (
                <>
                  <Trophy size={16} />
                  <span>Overall</span>
                </>
              ) : (
                <>
                  <span>{auraDescriptions[type].icon}</span>
                  <span className="capitalize">{type}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Leaderboard table */}
      <div className="bg-surface rounded-xl overflow-hidden shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Profile</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 hidden md:table-cell">Vibe Quote</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                {selectedAuraType === 'overall' ? 'Total Votes' : (
                  <span className="flex items-center justify-end gap-1">
                    <span className="capitalize">{selectedAuraType}</span> 
                    <span>{auraDescriptions[selectedAuraType].icon}</span>
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10">
            {sortedProfiles.map((profile, index) => (
              <tr 
                key={profile.id}
                className={`
                  ${index === 0 ? 'bg-primary/10 animate-pulse-slow' : ''}
                  ${index === 1 ? 'bg-primary/5' : ''}
                  ${index === 2 ? 'bg-primary/2' : ''}
                  hover:bg-surface-light transition-colors duration-150
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {index === 0 ? (
                    <div className="inline-flex items-center justify-center bg-primary text-white w-8 h-8 rounded-full shadow-aura">
                      <Trophy size={16} />
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary/50">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt={profile.username} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-surface-light flex items-center justify-center text-sm">
                          {profile.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{profile.username}</div>
                      <div className="flex mt-1 gap-1 md:hidden">
                        {selectedAuraType !== 'overall' && (
                          <AuraTag
                            type={selectedAuraType}
                            value={profile.auras[selectedAuraType]}
                            size="sm"
                            showPercentage
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300 hidden md:table-cell italic">
                  "{profile.tagline}"
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {selectedAuraType === 'overall' ? (
                    <div className="text-lg font-semibold">{profile.totalVotes}</div>
                  ) : (
                    <div className="text-lg font-semibold text-right flex justify-end">
                      <span className={`text-${selectedAuraType}`}>
                        {profile.auras[selectedAuraType]}
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            
            {sortedProfiles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                  No profiles found. Create and vote on profiles to see the leaderboard!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;