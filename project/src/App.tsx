import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfilesPage from './pages/ProfilesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import BattlePage from './pages/BattlePage';
import { initializeLocalStorage } from './utils/localStorage';

// Add global CSS for glowing animation
const globalStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  :root {
    --tw-color-mystic: #9f7aea;
    --tw-color-alpha: #e53e3e;
    --tw-color-chaotic: #ed8936;
    --tw-color-chill: #38b2ac;
    --tw-color-regal: #d69e2e;
    --tw-color-menacing: #805ad5;
    --tw-color-soft: #f687b3;
  }
`;

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initialize local storage with mock data if empty
    initializeLocalStorage();
  }, []);

  const handleProfileCreated = () => {
    // Force a refresh when a new profile is created
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar onProfileCreated={handleProfileCreated} />
          <main key={refreshKey}>
            <Routes>
              <Route path="/" element={<ProfilesPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/battle" element={<BattlePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;