import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface BackgroundEffectsProps {
  mousePosition: { x: number; y: number };
}

function BackgroundEffects({ mousePosition }: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.01;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.01;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2b0038] via-[#5b0a59] to-[#8b1c62] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-60 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#ff99cc15] to-transparent animate-pulse-slow" />

      <FloatingHearts />
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 5 + 10,
  }));

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-float-up opacity-30"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
}

export default BackgroundEffects;
