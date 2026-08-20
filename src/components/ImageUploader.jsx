import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon, AlertCircle } from 'lucide-react';

export default function ImageUploader({ imageFile, imagePreview, onImageChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  const validateAndSet = useCallback(
    (file) => {
      setError('');
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar (JPG, PNG, WebP).');
        return;
      }

      if (file.size > MAX_SIZE) {
        setError('Ukuran file maksimal 2MB. Silakan kompres terlebih dahulu.');
        return;
      }

      onImageChange(file);
    },
    [onImageChange]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSet(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndSet(file);
  };

  const removeImage = () => {
    onImageChange(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary mb-1">
        📸 Foto Produk <span className="text-error">*</span>
      </label>

      {!imagePreview ? (
        /* Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed
            transition-all duration-300 ease-out
            flex flex-col items-center justify-center py-10 px-4
            ${
              isDragging
                ? 'border-primary-500 bg-primary-50 scale-[1.02]'
                : 'border-gray-300 bg-surface hover:border-primary-400 hover:bg-primary-50/50'
            }
          `}
        >
          <div
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center mb-3
              transition-all duration-300
              ${isDragging ? 'bg-primary-200 scale-110' : 'bg-primary-100'}
            `}
          >
            <Upload
              size={24}
              className={`transition-colors ${isDragging ? 'text-primary-700' : 'text-primary-500'}`}
            />
          </div>

          <p className="text-sm font-semibold text-text-primary">
            {isDragging ? 'Lepaskan foto di sini!' : 'Tap untuk upload foto'}
          </p>
          <p className="text-xs text-text-muted mt-1">
            atau drag & drop • Maks 2MB
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-text-muted font-medium">JPG</span>
            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-text-muted font-medium">PNG</span>
            <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-text-muted font-medium">WebP</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        /* Preview */
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white animate-fade-in-up">
          <img
            src={imagePreview}
            alt="Preview produk"
            className="w-full h-52 object-cover"
          />
          {/* Image info overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ImageIcon size={14} />
                <span className="text-xs font-medium truncate max-w-[180px]">
                  {imageFile?.name}
                </span>
                <span className="text-[10px] opacity-70">
                  ({(imageFile?.size / 1024).toFixed(0)} KB)
                </span>
              </div>
            </div>
          </div>
          {/* Remove button */}
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-red-500 flex items-center justify-center transition-colors duration-200"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-error text-xs font-medium mt-1 animate-slide-down">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
