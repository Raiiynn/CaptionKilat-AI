import { useState } from 'react';
import { Copy, Check, Sparkles, Eye, FileText } from 'lucide-react';

function CaptionCard({ index, content }) {
  const [copied, setCopied] = useState(false);

  const labels = ['Opsi A', 'Opsi B', 'Opsi C'];
  const colors = [
    { bg: 'bg-primary-50', border: 'border-primary-200', badge: 'bg-primary-100 text-primary-700' },
    { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' },
    { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
  ];
  const color = colors[index] || colors[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`
        rounded-2xl border ${color.border} ${color.bg}
        p-4 animate-fade-in-up
      `}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold ${color.badge}`}>
          <FileText size={12} />
          Draf {labels[index]}
        </span>
      </div>

      {/* Content */}
      <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap mb-3 font-medium">
        {content}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`
          w-full py-2.5 rounded-xl text-sm font-semibold
          flex items-center justify-center gap-2
          transition-all duration-300
          ${
            copied
              ? 'bg-success text-white'
              : 'bg-white border border-gray-200 text-text-secondary hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]'
          }
        `}
      >
        {copied ? (
          <>
            <Check size={16} />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span>Salin Teks</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function ResultSection({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 space-y-4 animate-fade-in-up">
      {/* Section title */}
      <div className="flex items-center gap-2 px-1">
        <Sparkles size={18} className="text-accent-500" />
        <h2 className="text-lg font-bold text-text-primary">Hasil Caption</h2>
      </div>

      {/* AI Analysis Banner */}
      <div className="glass-strong rounded-2xl p-4 border border-primary-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Eye size={18} className="text-primary-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-primary-700 mb-1">
              🤖 AI Mendeteksi
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {data.analisis_visual_ai}
            </p>
          </div>
        </div>
      </div>

      {/* Caption Cards */}
      <div className="space-y-3">
        {[data.draf_1, data.draf_2, data.draf_3].map((draf, i) => (
          <CaptionCard key={i} index={i} content={draf} />
        ))}
      </div>

      {/* Footer notice */}
      <p className="text-center text-[11px] text-text-muted pt-2 pb-4">
        ✨ Dihasilkan oleh AI • Periksa kembali sebelum posting
      </p>
    </div>
  );
}
