import React, { useEffect, useState } from 'react';

interface HeartPoint {
  id: number;
  x: number;
  y: number;
}

export const HeartCursorTrail: React.FC = () => {
  const [hearts, setHearts] = useState<HeartPoint[]>([]);

  useEffect(() => {
    let count = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle creation
      count++;
      if (count % 4 !== 0) return;

      const newHeart: HeartPoint = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };

      setHearts((prev) => [...prev.slice(-12), newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-rose-soft opacity-80 pointer-events-none transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2 scale-100 animate-ping"
          style={{
            left: h.x,
            top: h.y,
            fontSize: '14px'
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
