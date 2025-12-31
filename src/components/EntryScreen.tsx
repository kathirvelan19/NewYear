import { useState, useRef } from 'react';

interface EntryScreenProps {
  onNameSubmit: (name: string) => void;
}

function EntryScreen({ onNameSubmit }: EntryScreenProps) {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setShowError(true);
      return;
    }

    if (trimmedName.toLowerCase() === 'kaviya') {
      setIsLoading(true);

      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Audio playback started');
        });
      }

      setTimeout(() => {
        onNameSubmit(trimmedName);
      }, 1000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2b0038] via-[#5b0a59] to-[#8b1c62] flex items-center justify-center overflow-hidden">
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 text-center animate-fadeInScale">
          <h2 className="main-heading text-5xl mb-2">Welcome</h2>
          <p className="text-white/70 text-lg mb-8">Enter your name to unveil the magic</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (showError) setShowError(false);
                }}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#ff99cc] transition-colors text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e as any)}
                autoFocus
              />
              {showError && (
                <p className="absolute top-full mt-2 text-sm text-[#ff9999] animate-pulse">
                  This gift is for Kaviya 💕
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#ff99cc] to-[#ffd700] hover:from-[#ffb3d9] hover:to-[#ffe040] disabled:opacity-50 text-[#2b0038] font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ff99cc]/50"
            >
              {isLoading ? 'Opening your gift...' : 'Enter'}
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                ✨
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryScreen;
