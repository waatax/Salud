import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-nature-sky-500 via-nature-green-500 to-nature-amber-500 transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
