import { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import WishContent from './components/WishContent';
import InteractiveBurst from './components/InteractiveBurst';
import EntryScreen from './components/EntryScreen';

function App() {
  const [showBurst, setShowBurst] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleHeadingClick = () => {
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 3000);
  };

  const handleNameSubmit = () => {
    setHasEntered(true);
  };

  if (!hasEntered) {
    return <EntryScreen onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundEffects mousePosition={mousePosition} />

      <div className="relative z-10">
        <WishContent onHeadingClick={handleHeadingClick} />
      </div>

      {showBurst && <InteractiveBurst />}
    </div>
  );
}

export default App;
