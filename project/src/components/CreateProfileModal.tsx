import React, { useState } from 'react';
import { X } from 'lucide-react';
import { saveProfile } from '../utils/localStorage';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated: () => void;
}

const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileCreated
}) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [tagline, setTagline] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!tagline.trim()) {
      setError('Vibe quote is required');
      return;
    }
    
    // Save the profile
    saveProfile({
      username,
      avatar,
      tagline
    });
    
    // Reset form and close modal
    setUsername('');
    setAvatar('');
    setTagline('');
    setError('');
    onProfileCreated();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-surface rounded-2xl p-6 w-full max-w-md relative z-10 shadow-aura animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Create Your Aura Profile</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-surface-light hover:bg-primary/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-alpha/20 text-alpha px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Username <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cosmic_wanderer"
              className="w-full bg-surface-light border border-primary/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:outline-none"
              maxLength={20}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Avatar URL (optional)
            </label>
            <input 
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-surface-light border border-primary/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:outline-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Vibe Quote <span className="text-red-500">*</span>
            </label>
            <textarea 
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Vibing through multiple dimensions..."
              className="w-full bg-surface-light border border-primary/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none h-20"
              maxLength={60}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 text-white rounded-lg py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfileModal;