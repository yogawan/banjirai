import React, { memo } from 'react';
import ChatMessage from "@/components/ChatMessage";
import { Icon } from "@iconify/react";

const ChatHistory = memo(({ chatHistory, isLoading, handleClearHistory }) => {
  return (
    <div className="flex flex-col min-h-full pb-44 md:pb-48">

      {/* Empty State */}
      {chatHistory.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <Icon 
                icon="material-symbols:chat-bubble-outline" 
                className="text-2xl text-white/60" 
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white/80">
                Mulai Percakapan Baru
              </h3>
              <p className="text-xs leading-relaxed text-white/50 max-w-sm mx-auto">
                Jika ada pesan yang tidak sepantasnya,{" "}
                <a 
                  href="https://github.com/yogawan/jawiraiv1.6.3" 
                  className="underline hover:text-white/70 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  silahkan lapor disini
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Messages */
        <div className="flex-1 space-y-4 px-4 py-6">
          {chatHistory.map((message, index) => (
            <ChatMessage 
              key={`message-${index}`} 
              message={message} 
              index={index} 
            />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-start gap-3 px-4 py-2 animate-fade-in">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <Icon 
              icon="line-md:loading-twotone-loop" 
              className="text-sm text-white/70" 
            />
          </div>
          <div className="flex-1 max-w-xs">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Sedang mengetik</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear History Button */}
      {chatHistory.length > 0 && (
        <div className="flex justify-center px-4 py-6 border-t border-white/5">
          <button 
            onClick={handleClearHistory}
            className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-white/70 hover:text-white/90 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Icon 
              icon="material-symbols:delete-outline" 
              className="text-sm group-hover:text-red-400 transition-colors duration-300" 
            />
            <span>Hapus Riwayat</span>
          </button>
        </div>
      )}
    </div>
  );
});

ChatHistory.displayName = 'ChatHistory';

export default ChatHistory;