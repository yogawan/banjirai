import React, { useState, useRef, useEffect, useCallback } from "react";

const ProtectedImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = null,
  loadingClassName = "",
  errorClassName = "",
  showWatermark = false,
  watermarkText = "Protected",
  blurOnInspect = true,
  showProtectionWarning = false,
  onRightClick = null,
  onKeyboardShortcut = null,
  quality = "high" // "low", "medium", "high"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Detect DevTools opening
  useEffect(() => {
    if (!blurOnInspect) return;

    let devtools = {
      isOpen: false,
      orientation: null
    };

    const threshold = 160;

    const detectDevTools = () => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.isOpen) {
          devtools.isOpen = true;
          setIsInspecting(true);
        }
      } else {
        if (devtools.isOpen) {
          devtools.isOpen = false;
          setIsInspecting(false);
        }
      }
    };

    const interval = setInterval(detectDevTools, 500);
    return () => clearInterval(interval);
  }, [blurOnInspect]);

  // Keyboard shortcut detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      const forbiddenKeys = [
        'F12', // DevTools
        'I', // Inspect (Ctrl+Shift+I)
        'J', // Console (Ctrl+Shift+J)
        'U', // View Source (Ctrl+U)
        'S', // Save (Ctrl+S)
        'A', // Select All (Ctrl+A)
        'C', // Copy (Ctrl+C)
        'P'  // Print (Ctrl+P)
      ];

      const isForbidden = 
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ['U', 'S', 'A', 'C', 'P'].includes(e.key.toUpperCase())) ||
        (e.metaKey && ['U', 'S', 'A', 'C', 'P'].includes(e.key.toUpperCase()));

      if (isForbidden) {
        e.preventDefault();
        e.stopPropagation();
        setAttemptCount(prev => prev + 1);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        
        if (onKeyboardShortcut) {
          onKeyboardShortcut(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [onKeyboardShortcut]);

  // Print detection
  useEffect(() => {
    const handleBeforePrint = () => {
      setIsInspecting(true);
      setShowWarning(true);
    };

    const handleAfterPrint = () => {
      setIsInspecting(false);
      setTimeout(() => setShowWarning(false), 1000);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setAttemptCount(prev => prev + 1);
    
    if (showProtectionWarning) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
    
    if (onRightClick) {
      onRightClick(e);
    }
  }, [onRightClick, showProtectionWarning]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setAttemptCount(prev => prev + 1);
    return false;
  }, []);

  const handleSelectStart = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  // Generate watermark
  const generateWatermark = useCallback(() => {
    if (!showWatermark) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white/30 font-bold text-sm transform rotate-45 select-none"
              style={{
                left: `${(i % 4) * 25 + 10}%`,
                top: `${Math.floor(i / 4) * 20 + 10}%`,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {watermarkText}
            </div>
          ))}
        </div>
      </div>
    );
  }, [showWatermark, watermarkText]);

  const getImageQuality = () => {
    const qualities = {
      low: 'blur-sm grayscale-50',
      medium: 'blur-none grayscale-25',
      high: 'blur-none grayscale-0'
    };
    return qualities[quality] || qualities.high;
  };

  const containerClasses = `
    relative overflow-hidden group
    ${isInspecting ? 'blur-lg grayscale' : ''}
    ${className}
  `.trim();

  const imageClasses = `
    pointer-events-none select-none
    transition-all duration-300 ease-in-out
    ${getImageQuality()}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${hasError ? 'opacity-0' : ''}
    ${loadingClassName}
  `.trim();

  return (
    <>
      <div
        ref={containerRef}
        className={containerClasses}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        onSelectStart={handleSelectStart}
        style={{ 
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none"
        }}
      >
        {/* Loading Placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
            {placeholder || (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-blue-500/20 rounded-full"></div>
                  <div className="absolute inset-0 w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="text-white/60 text-sm">Loading...</span>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className={`absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm ${errorClassName}`}>
            <div className="flex flex-col items-center gap-2 text-red-400">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-xl">⚠️</span>
              </div>
              <span className="text-sm">Failed to load image</span>
            </div>
          </div>
        )}

        {/* Main Image */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={imageClasses}
          draggable="false"
          onLoad={handleImageLoad}
          onError={handleImageError}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none"
          }}
        />

        {/* Watermark */}
        {generateWatermark()}

        {/* Protection Overlay */}
        <div className="absolute inset-0 bg-transparent z-20 pointer-events-none" />

        {/* Invisible protective layer */}
        <div 
          className="absolute inset-0 z-30"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          onSelectStart={handleSelectStart}
        />

        {/* Developer Tools Warning */}
        {isInspecting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-40">
            <div className="bg-red-600/90 text-white p-6 rounded-2xl border border-red-500/50 max-w-sm text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2">Content Protected</h3>
              <p className="text-sm opacity-90">
                This image is protected from inspection and copying.
              </p>
            </div>
          </div>
        )}

        {/* Attempt Counter Badge */}
        {attemptCount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full z-50">
            {attemptCount} attempts
          </div>
        )}
      </div>

      {/* Warning Toast */}
      {showWarning && (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in-right">
          <div className="bg-red-600/95 backdrop-blur-sm text-white p-4 rounded-xl border border-red-500/50 shadow-2xl max-w-sm">
            <div className="flex items-start gap-3">
              <div className="text-xl">🚫</div>
              <div>
                <h4 className="font-semibold text-sm">Action Blocked</h4>
                <p className="text-xs opacity-90 mt-1">
                  This content is protected from copying or saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        /* Disable text selection globally for the component */
        * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Disable drag and drop */
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        /* Disable image saving on mobile */
        img {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* Print protection */
        @media print {
          .protected-image {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ProtectedImage;