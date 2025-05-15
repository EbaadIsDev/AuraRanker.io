import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add global CSS for scrollbar
const styleElement = document.createElement('style');
styleElement.textContent = `
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: #161630;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #6b46c1;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #805ad5;
  }
`;
document.head.appendChild(styleElement);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);