'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [potato, setPotato] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const drawPotato = async () => {
    setIsLoading(true);
    setPotato(null);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const res = await fetch('/api/potato/random');
      const data = await res.json();
      setPotato(data);
    } catch (error) {
      console.error('Failed to draw potato:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-left space-y-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.2]">
          <span style={{ color: '#A88E7D' }}>느 집엔 이거 없지?</span><br />
          <span style={{ color: '#78350F' }}>감자 메시지 뽑기</span>
        </h1>
        <p className="text-lg font-medium" style={{ color: '#8B7E74' }}>
          당신을 위한 작고 소중한 감자 명언
        </p>
      </motion.div>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!potato && !isLoading && (
            <motion.div
              key="draw-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="potato-card rounded-[40px] p-12 shadow-2xl flex flex-col items-center gap-12 group"
              onClick={drawPotato}
            >
              <div className="text-[140px] animate-potato py-4 group-hover:scale-110 transition-transform">🥔</div>
              <button className="potato-button-highlight w-full text-xl py-6 h-16">
                감자 하나 꺼내기 <Sparkles size={20} />
              </button>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="potato-card rounded-[40px] p-24 shadow-2xl flex flex-col items-center gap-6"
            >
              <div className="text-6xl animate-spin-slow">🥔</div>
              <p className="text-lg font-semibold text-potato-subtext animate-pulse uppercase tracking-widest">감자 캐는중...</p>
            </motion.div>
          )}

          {potato && (
            <motion.div
              key="result"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="potato-card rounded-[40px] p-12 bg-white shadow-2xl space-y-12"
            >
              <div className="space-y-6">
                <span className="text-potato-subtext/20 font-bold text-5xl">"</span>
                <h2 className="text-2xl md:text-3xl font-bold text-potato-title leading-relaxed -mt-6">
                  {potato.message}
                </h2>
                <p className="text-right text-potato-subtext font-semibold">— {potato.author}</p>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <Link
                  href={`/potato/${potato.id}`}
                  className="potato-button w-full"
                >
                  상세보기 및 댓글 <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => setPotato(null)}
                  className="potato-button-ghost w-full"
                >
                  다시 뽑기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg pt-12">
        <div className="p-8 rounded-[32px] bg-white shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-potato-title">120+</p>
          <p className="text-sm font-semibold text-potato-subtext">오늘의 감자</p>
        </div>
        <div className="p-8 rounded-[32px] bg-white shadow-sm flex flex-col gap-1">
          <p className="text-2xl font-bold text-potato-title">FREE</p>
          <p className="text-sm font-semibold text-potato-subtext">지수에게 감튀 기부</p>
        </div>
      </div>
    </div>
  );
}
