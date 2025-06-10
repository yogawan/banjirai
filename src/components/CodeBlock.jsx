import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const dracula = require("react-syntax-highlighter/dist/cjs/styles/prism/dracula").default;

const CodeBlock = ({ content, className = "" }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [lineNumbers, setLineNumbers] = useState({});
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleExpanded = (index) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleLineNumbers = (index) => {
    setLineNumbers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getLanguageIcon = (language) => {
    const icons = {
      javascript: "🟨",
      typescript: "🔷",
      python: "🐍",
      java: "☕",
      cpp: "⚙️",
      c: "🔧",
      html: "🌐",
      css: "🎨",
      php: "🐘",
      ruby: "💎",
      go: "🐹",
      rust: "🦀",
      swift: "🍎",
      kotlin: "🎯",
      dart: "🎯",
      sql: "🗃️",
      json: "📋",
      xml: "📄",
      yaml: "📝",
      bash: "💻",
      shell: "🐚",
      powershell: "⚡",
      dockerfile: "🐳",
      markdown: "📝",
      plaintext: "📄"
    };
    return icons[language.toLowerCase()] || "📄";
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      typescript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      python: "bg-green-500/20 text-green-400 border-green-500/30",
      java: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      cpp: "bg-blue-600/20 text-blue-300 border-blue-600/30",
      c: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      html: "bg-red-500/20 text-red-400 border-red-500/30",
      css: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      php: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      ruby: "bg-red-600/20 text-red-300 border-red-600/30",
      go: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      rust: "bg-orange-600/20 text-orange-300 border-orange-600/30",
      json: "bg-green-600/20 text-green-300 border-green-600/30",
      bash: "bg-gray-600/20 text-gray-300 border-gray-600/30",
      shell: "bg-gray-600/20 text-gray-300 border-gray-600/30"
    };
    return colors[language.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const languageMatch = part.match(/```(\w+)?/);
          const language = languageMatch ? languageMatch[1] || "plaintext" : "plaintext";
          const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");
          const codeLines = code.split('\n');
          const isExpanded = expandedBlocks[index];
          const showLineNumbers = lineNumbers[index];
          const shouldTruncate = codeLines.length > 20;
          const displayCode = shouldTruncate && !isExpanded 
            ? codeLines.slice(0, 15).join('\n') + '\n...'
            : code;

          return (
            <div
              key={index}
              className="relative group border border-white/10 rounded-2xl mb-6 overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getLanguageColor(language)}`}>
                    <span>{getLanguageIcon(language)}</span>
                    <span className="capitalize">{language}</span>
                  </div>
                  <div className="text-white/40 text-xs">
                    {codeLines.length} lines
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Line Numbers Toggle */}
                  <button
                    onClick={() => toggleLineNumbers(index)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      showLineNumbers 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                    }`}
                    title="Toggle line numbers"
                  >
                    #
                  </button>

                  {/* Expand/Collapse Button */}
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-lg border border-white/10 hover:bg-white/10 hover:text-white/80 transition-all duration-200"
                    >
                      {isExpanded ? '▲ Collapse' : '▼ Expand'}
                    </button>
                  )}

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyCode(code, index)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                      copiedIndex === index
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {copiedIndex === index ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="relative overflow-x-auto">
                <SyntaxHighlighter
                  language={language}
                  style={dracula}
                  showLineNumbers={showLineNumbers}
                  lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: '#6b7280',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    marginRight: '1em'
                  }}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                    background: 'transparent',
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    lineHeight: '1.6'
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {displayCode}
                </SyntaxHighlighter>

                {/* Fade effect for truncated code */}
                {shouldTruncate && !isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
                )}
              </div>

              {/* Code Stats */}
              <div className="px-4 py-2 bg-black/20 border-t border-white/5 text-xs text-white/40">
                <div className="flex justify-between items-center">
                  <span>
                    {code.split('\n').length} lines • {code.length} characters
                  </span>
                  <span className="font-mono">
                    {language.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        }

        return <FormattedText key={index} text={part} />;
      })}
    </div>
  );
};

const FormattedText = ({ text }) => {
  const [expandedLists, setExpandedLists] = useState({});

  const toggleList = (index) => {
    setExpandedLists(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatText = (text) => {
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    // Italic text
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>');
    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-gray-800 text-blue-300 rounded font-mono text-sm">$1</code>');
    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline hover:no-underline transition-colors duration-200">$1 ↗</a>');
    
    return text;
  };

  return (
    <div className="w-full text-sm text-white/80 leading-relaxed">
      {text.split("\n").map((line, index) => {
        const formattedLine = formatText(line);

        // Handle different list types
        if (/^\s*[-*+]\s/.test(line)) {
          const listContent = line.replace(/^\s*[-*+]\s/, '');
          return (
            <div key={index} className="flex items-start gap-3 mb-2 group">
              <span className="text-blue-400 mt-1 group-hover:text-blue-300 transition-colors duration-200">•</span>
              <div 
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: formatText(listContent) }}
              />
            </div>
          );
        }

        // Handle numbered lists
        if (/^\s*\d+\.\s/.test(line)) {
          const match = line.match(/^\s*(\d+)\.\s(.+)/);
          if (match) {
            const [, number, content] = match;
            return (
              <div key={index} className="flex items-start gap-3 mb-2 group">
                <span className="text-blue-400 font-mono text-sm mt-1 group-hover:text-blue-300 transition-colors duration-200">
                  {number}.
                </span>
                <div 
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: formatText(content) }}
                />
              </div>
            );
          }
        }

        // Handle headers
        if (/^#{1,6}\s/.test(line)) {
          const level = line.match(/^(#{1,6})\s/)[1].length;
          const content = line.replace(/^#{1,6}\s/, '');
          const headerClasses = {
            1: "text-2xl font-bold text-white mb-4 mt-6",
            2: "text-xl font-bold text-white mb-3 mt-5",
            3: "text-lg font-bold text-white mb-2 mt-4",
            4: "text-base font-bold text-white mb-2 mt-3",
            5: "text-sm font-bold text-white mb-1 mt-2",
            6: "text-xs font-bold text-white mb-1 mt-2"
          };

          return (
            <h1 
              key={index} 
              className={headerClasses[level]}
              dangerouslySetInnerHTML={{ __html: formatText(content) }}
            />
          );
        }

        // Handle blockquotes
        if (/^\s*>\s/.test(line)) {
          const content = line.replace(/^\s*>\s/, '');
          return (
            <blockquote key={index} className="border-l-4 border-blue-500/50 pl-4 py-2 my-3 bg-blue-500/5 rounded-r-lg">
              <div 
                className="text-white/90 italic"
                dangerouslySetInnerHTML={{ __html: formatText(content) }}
              />
            </blockquote>
          );
        }

        // Regular paragraphs
        if (line.trim()) {
          return (
            <p 
              key={index} 
              className="mb-3 leading-relaxed hover:text-white/90 transition-colors duration-200"
              dangerouslySetInnerHTML={{ __html: formattedLine }}
            />
          );
        }

        // Empty lines
        return <div key={index} className="h-2"></div>;
      })}
    </div>
  );
};

export default CodeBlock;