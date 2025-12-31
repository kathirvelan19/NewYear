import { useEffect, useState } from 'react';

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  emoji: string;
}

function InteractiveBurst() {
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  useEffect(() => {
    const emojis = ['❤️', '✨', '💖', '🌸', '💫', '🎉', '💕', '⭐'];
    const newParticles: BurstParticle[] = [];

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: 50,
        y: 50,
        angle: (360 / 30) * i,
        speed: Math.random() * 3 + 2,
        size: Math.random() * 20 + 20,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-burst"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${particle.size}px`,
            transform: `translate(-50%, -50%)`,
            '--burst-x': `${Math.cos((particle.angle * Math.PI) / 180) * 200 * particle.speed}px`,
            '--burst-y': `${Math.sin((particle.angle * Math.PI) / 180) * 200 * particle.speed}px`,
          } as React.CSSProperties}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}

export default InteractiveBurst;
