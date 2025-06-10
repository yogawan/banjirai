import { useState, useEffect } from 'react';

const ChatHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000); // Update setiap menit
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div
      className={`
      relative px-6 py-8 bg-gradient-to-br from-slate-900/30 to-slate-800/30 
      backdrop-blur-sm border-b border-white/10 transition-all duration-1000 ease-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Logo area */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" />
                <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl animate-ping opacity-20" />
          </div>

          {/* Status indicator */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/60 font-medium">Online</span>
            </div>
            {isClient && currentTime && <div className="text-xs text-white/40">{formatTime(currentTime)}</div>}
          </div>
        </div>

        {/* Greeting and title */}
        {isClient && (
          <div className="mb-4">
            <div className="text-sm text-white/50 font-medium mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {getGreeting()}! 👋
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Tanya AI
            </h1>
          </div>
        )}

        {/* Description */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg text-white/80 leading-relaxed">
            Asisten AI untuk informasi seputar <span className="text-blue-400 font-semibold">banjir</span>
          </p>
          <p className="text-sm text-white/60 leading-relaxed">Dapatkan informasi terkini, tips keselamatan, dan panduan menghadapi banjir dengan teknologi AI terdepan.</p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">💧 Info Banjir</span>
          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full border border-green-500/30">🚨 Peringatan Dini</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">🛡️ Tips Keselamatan</span>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">📍 Lokasi Aman</span>
        </div>

        {/* Quick actions */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-xs text-white/50 mb-2 font-medium">Pertanyaan Populer:</div>
          <div className="flex flex-wrap gap-2">
            <button className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30">
              "Bagaimana cara evakuasi saat banjir?"
            </button>
            <button className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30">"Tips mengamankan rumah dari banjir"</button>
            <button className="text-xs text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30">"Cek status banjir di daerah saya"</button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatHeader;
