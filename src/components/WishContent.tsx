import { useEffect, useState } from 'react';

interface WishContentProps {
  onHeadingClick: () => void;
}

function WishContent({ onHeadingClick }: WishContentProps) {
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);

  const paragraphs = [
    "Intha varusam pogarathukku munnaadi, I just want to say <highlight>THANK YOU</highlight> for making my year better and stronger than ever 🤍",
    "I'm truly very happy, because slowly… everything I once dreamed of started happening in my life ✨",
    "All my manifestations are becoming reality, one by one. Honestly, I lived the life I dreamed about at the beginning of 2025 🥹💫",
    "Whenever I see your message, I automatically smile — and that itself makes my whole day happier ❤️",
    "(This is the first time I'm truly happy at New Year) 🤍✨",
    "I learned many things from you — especially how you balance both a childish and a mature character so beautifully 🤍",
    "Always keep that maturity and kindness within you.",
    "When everyone sees only your kind and childish side, from another side… I see your maturity — athu unakke theriyuma nu theriyala, but I see it clearly 🤍",
    "That balance is something very rare and truly special ✨",
    "Wishing you a Very <highlight>Happy New Year</highlight> 🎊🎉❤️🥳",
    "May all your dreams and manifestations come true this year ✨",
    "I hope this year brings you endless <highlight>love, happiness, peace</highlight>, and beautiful moments that make your heart smile 🌸❤️",
    "May everything you wish for slowly turn into reality, and may your life be filled with positivity and warmth throughout the year 🌍💖",
    "Have a wonderful year ahead, full of love, success, and happiness 💕🥰",
    "I just saw your hard work and efforts from a long time. Hope kandippa athukku rewards seekaramae kedaikkum ✨",
    "Just keep faith in God — He will take care of you ❤️",
    "Stay strong, stay happy 😊",
    "Appa–amma va nalla pathukko, morning la kandippa saapttu po — evvalo work irundhaalum adha skip pannadha 🤍",
    "If you ever feel sad or face any problem, sollu… I'm always here for you ❤️",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleParagraphs((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.paragraph-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderText = (text: string) => {
    const parts = text.split('<highlight>');
    return parts.map((part, i) => {
      if (part.includes('</highlight>')) {
        const [highlighted, rest] = part.split('</highlight>');
        return (
          <span key={i}>
            <span className="highlight-text">{highlighted}</span>
            {rest}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        <div className="content-container backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <h1
            className="main-heading text-4xl md:text-6xl font-bold text-center mb-12 cursor-pointer"
            onClick={onHeadingClick}
          >
            Happy New Year, Kaviya ❤️
          </h1>

          <div className="space-y-6">
            {paragraphs.map((text, index) => (
              <p
                key={index}
                data-index={index}
                className={`paragraph-item text-lg md:text-xl text-white/90 leading-relaxed transition-all duration-700 ${
                  visibleParagraphs.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                {renderText(text)}
              </p>
            ))}
          </div>

          <div className="footer-wish mt-16 text-center animate-fadeInUp opacity-0">
            <p className="text-2xl md:text-3xl font-semibold glow-text">
              With endless love and warm wishes 💖✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishContent;
