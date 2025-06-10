import { useState, useRef, useEffect } from 'react';

const ChatForm = ({ input, setInput, handleSend, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading && input && input.trim()) handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      // Min height 80px (h-20), max height 160px (h-40)
      textarea.style.height = `${Math.min(Math.max(scrollHeight, 80), 160)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const canSend = input && input.trim() && !isLoading;
  const wordCount = input
    ? input
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    : 0;

  return (
    <div
      className={`
        w-full relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 
        backdrop-blur-xl border border-white/20 rounded-2xl 
        shadow-xl shadow-black/30 transition-all duration-300 ease-out
        ${isFocused ? 'ring-2 ring-blue-500/50 border-blue-500/30 shadow-blue-500/10' : ''}
        ${isHovered ? 'border-white/30 shadow-2xl' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100" />

      {/* Main content area */}
      <div className="relative">
        {/* Header with status indicator */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            <span className="text-xs text-white/40 font-medium">{isLoading ? 'AI sedang memproses...' : 'Siap menerima pesan'}</span>
          </div>

          {/* Word counter */}
          {wordCount > 0 && <div className="text-xs text-white/30">{wordCount} kata</div>}
        </div>

        {/* Input area */}
        <div className="px-5 pb-4">
          <textarea
            ref={textareaRef}
            value={input || ''}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ketik pesan Anda di sini... (Tekan Enter untuk kirim)"
            className={`
              bg-transparent text-white placeholder-white/40 
              w-full min-h-[80px] p-4 rounded-xl
              resize-none focus:outline-none font-medium leading-relaxed
              transition-all duration-200 ease-out
              border border-white/10 hover:border-white/20
              ${isFocused ? 'placeholder-white/60 border-blue-500/30 bg-white/5' : ''}
            `}
            disabled={isLoading}
            style={{
              lineHeight: '1.6',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent',
            }}
          />
        </div>

        {/* Footer with actions */}
        <div className="flex items-center justify-between px-5 pb-4">
          {/* Left side - shortcuts info */}
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono text-xs">Enter</kbd>
              Kirim
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono text-xs">Shift+Enter</kbd>
              Baris baru
            </span>
          </div>

          {/* Right side - send button */}
          <button
            onClick={() => canSend && handleSend()}
            className={`
              relative flex items-center justify-center gap-2 px-6 py-3
              rounded-xl font-medium transition-all duration-200 ease-out transform
              ${canSend ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'}
              ${isLoading ? 'animate-pulse' : ''}
            `}
            disabled={!canSend}
          >
            {/* Button background glow effect */}
            {canSend && <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-20" />}

            {/* Button content */}
            <div className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm">Mengirim...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
                  </svg>
                  <span className="text-sm">Kirim</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Progress indicator when loading */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
              style={{
                animation: 'loading-progress 2s ease-in-out infinite',
              }}
            />
          </div>
        )}
      </div>

      {/* Custom styles for the loading animation */}
      <style jsx>{`
        @keyframes loading-progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatForm;
