import React, { memo } from 'react';
import { Icon } from "@iconify/react";
import CodeBlock from "./CodeBlock";

const ChatMessage = memo(({ message, index }) => {
  const isUser = message.role === "user";
  const isAI = message.role === "ai";
  
  return (
    <div 
      className={`flex gap-3 px-4 py-2 group ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
          <Icon 
            icon="ph:robot-duotone" 
            className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300" 
          />
        </div>
      )}

      {/* Message Container */}
      <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Message Bubble */}
        <div
          className={`
            relative px-4 py-3 text-sm leading-relaxed
            backdrop-blur-sm border transition-all duration-300
            group-hover:border-white/25 group-hover:shadow-lg group-hover:shadow-white/5
            ${isUser 
              ? "bg-gradient-to-br from-blue-600/20 to-blue-500/10 border-blue-400/20 text-white/90 rounded-2xl rounded-br-md" 
              : "bg-white/5 border-white/10 text-white/80 rounded-2xl rounded-tl-md"
            }
          `}
        >
          {/* Message Content */}
          {isAI ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <CodeBlock content={message.content} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">
              {message.content || (
                <span className="text-red-400/70 italic">
                  Error: Tidak ada konten pesan
                </span>
              )}
            </p>
          )}

          {/* Message Tail */}
          <div 
            className={`
              absolute w-3 h-3 transform rotate-45
              ${isUser 
                ? "bg-gradient-to-br from-blue-600/20 to-blue-500/10 border-r border-b border-blue-400/20 -right-1 bottom-3" 
                : "bg-white/5 border-l border-t border-white/10 -left-1 top-3"
              }
            `}
          />
        </div>

        {/* Timestamp */}
        <div className={`flex items-center gap-1 mt-1 px-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-xs text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {new Date().toLocaleTimeString('id-ID', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {/* Delivery Status for User Messages */}
          {isUser && (
            <Icon 
              icon="material-symbols:check-circle-outline" 
              className="text-xs text-green-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            />
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
          <Icon 
            icon="ph:user-duotone" 
            className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300" 
          />
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;