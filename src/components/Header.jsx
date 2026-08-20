import { Zap, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center pt-8 pb-4 px-4">
      {/* Floating badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4 animate-fade-in-up">
        <Sparkles size={12} />
        <span>AI-Powered Copywriter</span>
      </div>

      {/* Logo */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-4xl font-extrabold tracking-tight gradient-text leading-tight">
          <Zap className="inline-block mr-1 mb-1 text-primary-500" size={32} />
          CaptionKilat
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="mt-2 text-text-secondary text-sm font-medium animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        Upload Foto, Auto-Jualan! 🚀
      </p>
    </header>
  );
}
