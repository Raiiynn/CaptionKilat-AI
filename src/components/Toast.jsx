import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'error', onClose }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onClose, 300);
  };

  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        max-w-sm w-[calc(100%-2rem)]
        ${exiting ? 'animate-toast-out' : 'animate-toast-in'}
      `}
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg
          ${styles[type]}
        `}
      >
        <AlertCircle size={18} className="flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
