'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, MessageCircle, Send, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function PotatoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [potato, setPotato] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentPassword, setCommentPassword] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    fetchPotato();
  }, [id]);

  const fetchPotato = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/potato/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setPotato(data);
    } catch (error) {
      console.error(error);
      router.push('/top');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch(`/api/potato/${id}/like`, { method: 'POST' });
      const data = await res.json();
      setPotato({ ...potato, likes: data.likes });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentPassword || !commentText) return;

    try {
      const res = await fetch(`/api/potato/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentName, password: commentPassword, message: commentText }),
      });
      if (res.ok) {
        alert('감자가 고마워해요! 🥔');
        setCommentText('');
        setCommentName('');
        setCommentPassword('');
        fetchPotato();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const password = prompt('비밀번호를 입력하세요:');
    if (!password) return;

    try {
      const res = await fetch(`/api/potato/${id}/comment?commentId=${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) fetchPotato();
      else alert('비밀번호가 틀렸습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('감자가 복사되었습니다!');
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="text-6xl animate-spin-slow">🥔</div>
      <p className="text-sm font-bold text-potato-subtext uppercase tracking-widest">감자 쌓는중...</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto py-4 space-y-12">
      <Link href="/top" className="inline-flex items-center gap-2 text-sm font-bold text-potato-subtext hover:text-potato-title transition-colors px-2">
        <ArrowLeft size={18} /> 뒤로가기
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="potato-card rounded-[40px] p-12 bg-white shadow-2xl space-y-12"
      >
        <div className="space-y-6">
          <span className="text-potato-subtext/20 font-bold text-5xl">"</span>
          <h1 className="text-3xl md:text-4xl font-bold text-potato-title leading-relaxed -mt-6">
            {potato?.message}
          </h1>
          <p className="text-right text-potato-subtext font-semibold">— {potato?.author}</p>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`potato-button-ghost flex-1 gap-2 ${potato?.likes > 0 ? 'text-red-500 bg-red-50' : 'text-potato-subtext'}`}
          >
            <Heart size={20} fill={potato?.likes > 0 ? "currentColor" : "none"} /> {potato?.likes || 0}
          </button>
          <button
            onClick={handleShare}
            className="potato-button-ghost flex-1 gap-2 text-potato-subtext"
          >
            <Share2 size={20} /> 공유하기
          </button>
        </div>
      </motion.div>

      {/* Comment Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-potato-title px-2 flex items-center gap-2">
          <MessageCircle size={22} /> 댓글 {(potato?.comments || []).length}
        </h2>

        <form onSubmit={handleComment} className="potato-card p-10 bg-white space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="닉네임"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="potato-input h-12"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
              className="potato-input h-12"
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="따뜻한 감자 한 마디..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="potato-input min-h-[100px] pr-14 resize-none h-24"
            />
            <button
              type="submit"
              className="absolute right-3 bottom-3 p-3 bg-potato-title text-white rounded-xl hover:opacity-90 active:scale-95 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-4">
          {potato.comments.map((comment: any) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="potato-card p-8 bg-white flex justify-between items-start group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-potato-title text-sm">{comment.author}</span>
                  <span className="text-[10px] text-potato-subtext font-bold uppercase">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-potato-subtext font-medium leading-relaxed">{comment.content}</p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="p-2 text-potato-subtext/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
