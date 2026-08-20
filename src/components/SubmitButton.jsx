import { Zap, Loader2 } from 'lucide-react';

export default function SubmitButton({ disabled, loading, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        w-full py-4 rounded-2xl font-bold text-base
        flex items-center justify-center gap-2
        transition-all duration-300 ease-out
        ${
          disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : loading
            ? 'bg-primary-600 text-white cursor-wait'
            : 'bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]'
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>AI sedang bekerja...</span>
        </>
      ) : (
        <>
          <Zap size={20} />
          <span>Generate Caption Kilat</span>
        </>
      )}
    </button>
  );
}
