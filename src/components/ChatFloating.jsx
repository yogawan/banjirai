import { useState, useRef, useEffect } from 'react';

const ChatFloating = ({ input, setInput, handleSend, isLoading }) => {
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
      textarea.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const canSend = input && input.trim() && !isLoading;

  return (
    <div className="z-50 m-4 fixed bottom-0 left-0 right-0 lg:ml-[380px] lg:mr-[380px]">
      <div
        className={`
          relative bg-gradient-to-r from-slate-900/90 to-slate-800/90 
  backdrop-blur-sm border border-white/20 rounded-2xl shadow-md transition-all duration-300 ease-outt
          ${isFocused ? 'ring-2 ring-blue-500/50 border-blue-500/30 shadow-blue-500/20' : ''}
          ${isHovered ? 'border-white/30 shadow-3xl' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlay for modern effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-end gap-3 p-4">
          {/* Input area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ketik pesan Anda di sini..."
              className={`
                bg-transparent text-white placeholder-white/40 
                w-full min-h-[48px] max-h-[120px] p-3 pr-4
                resize-none focus:outline-none font-medium
                transition-all duration-200 ease-out
                ${isFocused ? 'placeholder-white/60' : ''}
              `}
              disabled={isLoading}
              rows={1}
              style={{ lineHeight: '1.5' }}
            />

            {/* Character counter for long messages */}
            {input && input.length > 200 && <div className="absolute bottom-1 right-2 text-xs text-white/30">{input.length}/1000</div>}
          </div>

          {/* Send button */}
          <button
            onClick={() => canSend && handleSend()}
            className={`
              relative flex items-center justify-center w-12 h-12 
              rounded-xl transition-all duration-200 ease-out transform
              ${canSend ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95' : 'bg-white/10 text-white/30 cursor-not-allowed'}
              ${isLoading ? 'animate-pulse' : ''}
            `}
            disabled={!canSend}
          >
            {/* Button background glow effect */}
            {canSend && <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-20 animate-pulse" />}

            {isLoading ? (
              <svg className="w-5 h-5 animate-spin relative z-10" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* Typing indicator when loading */}
        {isLoading && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>AI sedang mengetik...</span>
            </div>
          </div>
        )}

        {/* Bottom accent line */}
        <div
          className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full
          bg-gradient-to-r from-transparent via-blue-500 to-transparent
          transition-all duration-300 ease-out
          ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `}
        />
      </div>

      {/* Keyboard shortcut hint */}
      <div className="mt-2 text-center">
        <span className="text-xs text-white/30">
          Tekan <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono">Enter</kbd> untuk kirim
        </span>
      </div>
    </div>
  );
};

export default ChatFloating;
