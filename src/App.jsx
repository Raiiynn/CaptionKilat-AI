import { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import FormInputs from './components/FormInputs';
import SubmitButton from './components/SubmitButton';
import ResultSection from './components/ResultSection';
import LoadingSkeleton from './components/LoadingSkeleton';
import Toast from './components/Toast';
import { generateCaption } from './services/api';

export default function App() {
  // ===== State =====
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    platform: 'Instagram',
    tone: 'Hard Selling',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);

  // ===== Handlers =====
  const handleImageChange = useCallback((file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
    // Clear previous result when image changes
    setResult(null);
  }, []);

  const handleFormChange = useCallback((newData) => {
    setFormData(newData);
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const handleGenerate = async () => {
    if (!imageFile) {
      showToast('Silakan upload foto produk terlebih dahulu.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await generateCaption(
        imageFile,
        formData.productName,
        formData.price,
        formData.platform,
        formData.tone
      );
      setResult(data);
    } catch (err) {
      showToast(
        err.message || 'Gagal menghubungkan ke AI, silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* App Container — Mobile-first, centered on desktop */}
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-[480px] mx-auto pb-8">
          {/* Header */}
          <Header />

          {/* Main Content Card */}
          <main className="px-4 mt-2">
            <div className="glass-strong rounded-3xl p-5 shadow-xl shadow-primary-100/50 space-y-5">
              {/* Image Uploader */}
              <ImageUploader
                imageFile={imageFile}
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <span className="text-[10px] text-text-muted font-medium uppercase tracking-widest">
                  Detail Produk
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>

              {/* Form Inputs */}
              <FormInputs formData={formData} onChange={handleFormChange} />

              {/* Submit Button */}
              <SubmitButton
                disabled={!imageFile}
                loading={loading}
                onClick={handleGenerate}
              />
            </div>

            {/* Loading State */}
            {loading && <LoadingSkeleton />}

            {/* Results */}
            {!loading && result && <ResultSection data={result} />}
          </main>

          {/* Footer */}
          <footer className="mt-8 text-center px-4">
            <p className="text-[11px] text-text-muted">
              CaptionKilat © 2026 • Ditenagai oleh AI 🤖
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
