
import React, { useState, useRef, useEffect } from 'react';
import { Artefact, Comment } from '../types';
import { WireframeArt } from './WireframeArt';

interface Props {
  art: Artefact;
  currentIndex: number;
  totalCount: number;
  onBack: () => void;
  onUpdate: (updatedArt: Artefact) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

declare var html2canvas: any;

export const DetailView: React.FC<Props> = ({ art, currentIndex, totalCount, onBack, onUpdate, onNext, onPrev }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedAction = localStorage.getItem(`art_action_${art.id}`);
    if (savedAction === 'like' || savedAction === 'dislike') {
      setUserAction(savedAction as 'like' | 'dislike');
    } else {
      setUserAction(null);
    }
  }, [art.id]);

  const handleLike = () => {
    if (userAction === 'dislike') {
      showToast("不可操作：已投掷过鸡蛋");
      return;
    }
    if (userAction === 'like') {
      onUpdate({ ...art, likes: Math.max(0, art.likes - 1) });
      setUserAction(null);
      localStorage.removeItem(`art_action_${art.id}`);
      showToast("已撤回喜欢状态");
    } else {
      onUpdate({ ...art, likes: art.likes + 1 });
      setUserAction('like');
      localStorage.setItem(`art_action_${art.id}`, 'like');
      showToast("已标记为喜欢：简直甜菜");
    }
  };

  const handleEgg = () => {
    if (userAction === 'like') {
      showToast("不可操作：已标记为喜欢");
      return;
    }
    if (userAction === 'dislike') {
      onUpdate({ ...art, dislikes: Math.max(0, art.dislikes - 1) });
      setUserAction(null);
      localStorage.removeItem(`art_action_${art.id}`);
      showToast("已撤回评价状态");
    } else {
      onUpdate({ ...art, dislikes: art.dislikes + 1 });
      setUserAction('dislike');
      localStorage.setItem(`art_action_${art.id}`, 'dislike');
      showToast("投掷了一枚鸡蛋：什么勾史");
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      showToast("正在生成展品卡片...");
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false
      });
      canvas.toBlob(async (blob: Blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          showToast("已复制当前展品卡片至剪贴板");
        } catch (err) {
          const url = canvas.toDataURL();
          showToast("截图生成成功（请手动保存）");
        }
      });
    } catch (e) {
      console.error("Capture failed", e);
      showToast("生成失败，请检查网络或稍后重试");
    }
  };

  const handleCommentSubmit = () => {
    if (!username.trim()) {
      showToast("请输入用户名");
      return;
    }
    if (!commentText.trim()) {
      showToast("请输入评论内容");
      return;
    }
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: username.trim(),
      text: commentText.trim(),
      timestamp: Date.now()
    };
    onUpdate({ ...art, comments: [newComment, ...art.comments] });
    setCommentText('');
    setShowCommentInput(false);
    showToast("评论已发送");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-10 relative">
      {/* Page Status Indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] opacity-60 tracking-[0.3em] font-bold z-20 pointer-events-none uppercase">
        第 {currentIndex} / {totalCount} 页
      </div>

      {/* Return Button */}
      <button 
        onClick={onBack}
        className="fixed top-20 left-4 sm:left-10 text-[9px] sm:text-[10px] border border-white/20 px-3 sm:px-4 py-1.5 bg-black/80 hover:bg-white hover:text-black hover:border-white transition-all duration-300 z-[60] tracking-[0.2em] font-bold"
      >
        <span className="mr-1 sm:mr-2">&lt;</span> 返回
      </button>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 mt-10">
        
        {/* Left Navigation Button */}
        <button 
          onClick={onPrev}
          className="hidden lg:flex shrink-0 w-12 h-32 items-center justify-center border border-white/10 hover:border-white/60 hover:bg-white/5 transition-all group"
          title="上一个作品"
        >
          <span className="text-white/20 group-hover:text-white transition-colors text-2xl font-light">{'<'}</span>
        </button>

        {/* Card Container */}
        <div ref={cardRef} className="bg-[#0a0a0a] p-3 sm:p-6 border border-white/10 w-full lg:max-w-4xl xl:max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            
            {/* Visual Frame */}
            <div className="relative border border-white/20 bg-white/5 aspect-square flex items-center justify-center overflow-hidden group w-full">
              <div className="absolute -left-[1px] top-1/4 w-[2px] h-1/2 bg-white/20 group-hover:bg-white/60 transition-colors z-10"></div>
              <div className="absolute -right-[1px] top-1/4 w-[2px] h-1/2 bg-white/20 group-hover:bg-white/60 transition-colors z-10"></div>
              
              {art.imageUrl ? (
                <div className="w-full h-full p-2 sm:p-4 relative">
                  <img 
                    src={art.imageUrl} 
                    alt={art.name} 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"
                    style={{ filter: 'contrast(1.2) brightness(0.9) saturate(0.8)' }}
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 3px, transparent 4px)' }}></div>
                </div>
              ) : (
                <div className="p-8 sm:p-12">
                  <WireframeArt svgPath={art.svgPath} size={280} className="group-hover:scale-105 transition-transform duration-1000" />
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-[8px] sm:text-[9px] opacity-20 group-hover:opacity-60 transition-opacity font-mono z-10">
                {art.imageUrl ? 'ASSET_RENDER_V1.0' : `SCALE: 1.000 / ${art.id}`}
              </div>
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-[9px] sm:text-[10px] flex gap-3 sm:gap-4 opacity-40 group-hover:opacity-80 transition-opacity z-10 uppercase tracking-widest">
                <span className={`${userAction === 'like' ? 'text-white underline' : 'text-white/80'}`}>L: {art.likes}</span>
                <span className={`${userAction === 'dislike' ? 'text-white underline' : 'text-white/60'}`}>E: {art.dislikes}</span>
              </div>
            </div>

            {/* Data Panel */}
            <div className="border border-white/20 bg-black/40 p-4 sm:p-8 h-full flex flex-col backdrop-blur-sm">
              <div className="text-center text-[10px] sm:text-xs tracking-[0.4em] font-bold mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-5 opacity-80 uppercase">
                展品信息
              </div>
              
              <div className="space-y-3 sm:space-y-4 flex-grow">
                <DataRow label="提示词" value={art.id} />
                <DataRow label="展品名称" value={art.chineseName} />
                <DataRow label="作者" value={art.origin} />
                <DataRow label="创作时间" value={art.material} />
                
                <div className="pt-6 sm:pt-8 border-t border-white/10 mt-4 sm:mt-6 relative group">
                  <div className="text-[9px] sm:text-[10px] opacity-40 mb-2 sm:mb-3 uppercase tracking-[0.2em] font-bold group-hover:opacity-80 transition-opacity">精彩推理 / EXCELLENT REASONING</div>
                  <p className="text-[10px] sm:text-xs leading-relaxed opacity-60 font-light group-hover:opacity-90 transition-opacity whitespace-pre-wrap">
                    {art.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Navigation Button */}
        <button 
          onClick={onNext}
          className="hidden lg:flex shrink-0 w-12 h-32 items-center justify-center border border-white/10 hover:border-white/60 hover:bg-white/5 transition-all group"
          title="下一个作品"
        >
          <span className="text-white/20 group-hover:text-white transition-colors text-2xl font-light">{'>'}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 w-full lg:max-w-4xl xl:max-w-5xl mx-auto">
        <ActionButton 
          onClick={handleLike} 
          icon={<HeartIcon filled={userAction === 'like'} />} 
          label={`喜欢 (${art.likes})`} 
          isActive={userAction === 'like'}
          disabled={userAction === 'dislike'}
        />
        <ActionButton 
          onClick={handleEgg} 
          icon={<EggIcon filled={userAction === 'dislike'} />} 
          label={`鸡蛋 (${art.dislikes})`} 
          isActive={userAction === 'dislike'}
          disabled={userAction === 'like'}
        />
        <ActionButton onClick={handleShare} icon={<ShareIcon />} label="分享" />
        <ActionButton onClick={() => setShowCommentInput(!showCommentInput)} isActive={showCommentInput} icon={<CommentIcon />} label="评论" />
      </div>

      {/* Mobile Navigation (Medium and Small screens) */}
      <div className="flex lg:hidden justify-center gap-6 sm:gap-10 mt-8">
        <button onClick={onPrev} className="text-[9px] sm:text-[10px] tracking-widest border border-white/20 px-4 sm:px-6 py-2 hover:bg-white/5 active:bg-white/20">上一个作品</button>
        <button onClick={onNext} className="text-[9px] sm:text-[10px] tracking-widest border border-white/20 px-4 sm:px-6 py-2 hover:bg-white/5 active:bg-white/20">下一个作品</button>
      </div>

      {/* Comment Section */}
      <div className="w-full lg:max-w-4xl xl:max-w-5xl mx-auto">
        {showCommentInput && (
          <div className="mt-8 border border-white/30 bg-white/5 p-4 sm:p-6 animate-fadeIn space-y-4">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="用户名 (必填)"
                className="bg-black border border-white/20 px-4 py-2 text-[10px] sm:text-xs text-white focus:outline-none focus:border-white transition-all tracking-wider"
              />
              <div className="flex gap-2 sm:gap-4">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="输入评论内容..."
                  className="flex-grow bg-black border border-white/20 px-4 py-2 text-[10px] sm:text-xs text-white focus:outline-none focus:border-white transition-all tracking-wider"
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                />
                <button onClick={handleCommentSubmit} className="bg-white text-black px-4 sm:px-6 py-2 text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-80 active:scale-95 transition-all">发送</button>
              </div>
            </div>
          </div>
        )}

        {art.comments.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="text-[10px] opacity-40 tracking-[0.4em] font-bold mb-4 uppercase">通讯记录 / COMMENTS</div>
            {art.comments.map(c => (
              <div key={c.id} className="border-l-2 border-white/20 pl-4 py-2 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] text-white font-bold tracking-wider">{c.author}</div>
                  <div className="text-[8px] sm:text-[9px] opacity-30">{new Date(c.timestamp).toLocaleString()}</div>
                </div>
                <div className="text-[10px] sm:text-xs opacity-80 tracking-wide font-light">{c.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.3)] toast-enter border border-white whitespace-nowrap">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="group border border-white/10 flex overflow-hidden hover:border-white/40 transition-colors duration-300">
    <div className="bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] w-24 sm:w-32 shrink-0 border-r border-white/10 opacity-50 font-bold group-hover:opacity-100 group-hover:bg-white/10 transition-all">{label}</div>
    <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] flex-grow opacity-80 group-hover:opacity-100 transition-opacity tracking-wider truncate">{value}</div>
  </div>
);

const ActionButton: React.FC<{ icon: React.ReactNode; label: string, onClick?: () => void, isActive?: boolean, disabled?: boolean }> = ({ icon, label, onClick, isActive, disabled }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`flex items-center justify-center gap-2 sm:gap-4 border py-2.5 sm:py-3.5 px-3 sm:px-6 transition-all duration-300 group relative overflow-hidden ${
      isActive 
        ? 'border-white bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
        : (disabled ? 'border-white/5 opacity-10 cursor-not-allowed' : 'border-white/20 hover:border-white/60 hover:bg-white/5 active:scale-95')
    }`}
  >
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
    <span className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'opacity-40 group-hover:opacity-100 group-hover:scale-110'}`}>{icon}</span>
    <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-bold transition-all duration-300 ${isActive ? 'text-white' : 'opacity-60 group-hover:opacity-100'}`}>{label}</span>
  </button>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "white" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
);
const EggIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "white" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 22C12 22 19 18 19 11C19 5.47715 15.866 2 12 2C8.13401 2 5 5.47715 5 11C5 18 12 22 12 22Z" /></svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
);
const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.9A8.38 8.38 0 0 1 4 11.3a8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);
