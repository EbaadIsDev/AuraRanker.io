import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { AuraProfile } from '../types';
import { getProfiles } from '../utils/localStorage';
import { Search } from 'lucide-react';

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<AuraProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'votes'>('newest');
  
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
  
  // Filter and sort profiles
  const filteredProfiles = profiles
    .filter(profile => 
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.createdAt - a.createdAt;
      } else {
        return b.totalVotes - a.totalVotes;
      }
    });
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Profiles</h1>
        <p className="text-gray-400">
          Vote on people's auras and see how the community perceives their energy
        </p>
      </div>
      
      {/* Search and sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username or vibe quote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'votes')}
            className="bg-surface rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary/50 focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="votes">Most Votes</option>
          </select>
        </div>
      </div>
      
      {/* Profiles grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            {searchTerm 
              ? "No profiles match your search criteria" 
              : "No profiles found. Create one to get started!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilesPage;