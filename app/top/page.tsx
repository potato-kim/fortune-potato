'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HallOfFame() {
  const [potatoes, setPotatoes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'likes' | 'recent'>('likes');

  useEffect(() => {
    fetchTopPotatoes();
  }, [sortBy]);

  const fetchTopPotatoes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/potato/top?sort=${sortBy}`);
      const data = await res.json();
      setPotatoes(data);
    } catch (error) {
      console.error('Failed to fetch top:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-4 space-y-12">
      <div className="space-y-4 px-2">
        <h1 className="text-4xl font-bold text-potato-title">명예의 감자</h1>
        <p className="text-lg font-medium text-potato-subtext">가장 많은 사랑을 받은 최고의 감자들</p>
      </div>

      <div className="flex gap-2 px-2 overflow-x-auto pb-4 scrollbar-hide">
        <button 
          onClick={() => setSortBy('likes')}
          className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
            sortBy === 'likes' 
            ? 'bg-potato-title text-white shadow-md' 
            : 'bg-button-beige text-button-brown hover:opacity-80'
          }`}
        >
          인기순
        </button>
        <button 
          onClick={() => setSortBy('recent')}
          className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
            sortBy === 'recent' 
            ? 'bg-potato-title text-white shadow-md' 
            : 'bg-button-beige text-button-brown hover:opacity-80'
          }`}
        >
          최신순
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-20 text-center flex flex-col items-center gap-4"
          >
            <div className="text-6xl animate-spin-slow">🥔</div>
            <p className="text-lg font-bold text-potato-subtext/40 uppercase tracking-widest">Loading Hall of Fame</p>
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {potatoes.map((potato, index) => (
              <motion.div
                key={potato.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`potato-card p-10 group relative ${
                  sortBy === 'likes' && index === 0 ? 'bg-[#FFFBEB]' : 
                  sortBy === 'likes' && index === 1 ? 'bg-[#FAFAFA]' : 
                  sortBy === 'likes' && index === 2 ? 'bg-[#FEF6F0]' : 'bg-white'
                }`}
              >
                {sortBy === 'likes' && index < 3 && (
                  <div className="mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg ${
                      index === 0 ? 'bg-amber-100 text-amber-700' : 
                      index === 1 ? 'bg-stone-200 text-stone-600' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      Best {index + 1}
                    </span>
                  </div>
                )}
                
                <div className="space-y-6">
                  <p className="text-2xl font-bold text-potato-title leading-snug">
                    "{potato.message}"
                  </p>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-potato-subtext text-sm">{potato.author}</span>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 font-bold text-red-300 text-sm">
                        <Heart size={16} fill={potato.likes > 0 ? "currentColor" : "none"} /> {potato.likes}
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-potato-subtext text-sm">
                        <MessageCircle size={16} /> {potato.commentsCount}
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/potato/${potato.id}`}
                    className="absolute inset-0 z-0"
                    aria-label="View Details"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && potatoes.length === 0 && (
        <div className="text-center py-20 px-4">
          <p className="text-lg font-bold text-stone-300">명예의 감자가 텅 비었습니다.</p>
          <Link href="/submit" className="text-potato-primary font-bold mt-4 inline-block hover:underline">
            전설의 감자 심으러 가기
          </Link>
        </div>
      )}
    </div>
  );
}
