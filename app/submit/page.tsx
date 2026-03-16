'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubmitPotato() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !password || !message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/potato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: nickname, message, password }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => router.push('/top'), 2000);
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-50 p-8 rounded-full text-green-500"
        >
          <CheckCircle2 size={100} />
        </motion.div>
        <h2 className="text-4xl font-bold text-potato-title">성공적으로 심었습니다!</h2>
        <p className="text-xl font-medium text-potato-subtext">명예의 감자로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 space-y-8 text-center">
      <div className="space-y-4 px-2">
        <h1 className="text-4xl md:text-5xl font-bold text-potato-title">감자 인재풀 등록</h1>
        <p className="text-lg font-medium text-potato-subtext">세상을 놀라게 할 당신만의 명언을 남겨보세요. 🥔</p>
      </div>

      <form onSubmit={handleSubmit} className="potato-card p-10 bg-white text-left space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-bold text-sm text-potato-subtext ml-2">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="지수최고"
              className="potato-input h-14"
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold text-sm text-potato-subtext ml-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              className="potato-input h-14"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-sm text-potato-subtext ml-2">명언 (최대 120자)</label>
          <textarea
            maxLength={120}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="예: 늦었다고 생각할 때가 이미 감자 반죽할 시간이다."
            className="potato-input min-h-[160px] text-xl py-6"
          />
          <p className="text-right text-xs font-bold text-potato-subtext/40">{message.length}/120</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !message}
          className="potato-button w-full justify-center text-xl p-6"
        >
          {isSubmitting ? '심는 중...' : '감자 명언 심기'} <Send size={24} />
        </button>
      </form>

      <div className="bg-white/50 p-8 rounded-[32px] shadow-sm border-none">
        <p className="font-semibold text-potato-subtext leading-relaxed">
          <span className="text-potato-accent bg-potato-primary px-2 py-0.5 rounded-lg mr-2">TIPS</span>
          감자 테마의 유머가 섞인 명언일수록 인기가 많아요!
        </p>
      </div>
    </div>
  );
}
