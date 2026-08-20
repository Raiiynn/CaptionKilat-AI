import { ChevronDown } from 'lucide-react';

export default function FormInputs({ formData, onChange }) {
  const handleChange = (field) => (e) => {
    onChange({ ...formData, [field]: e.target.value });
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200';

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          🏷️ Nama Produk
          <span className="text-text-muted font-normal text-xs ml-1">(Opsional)</span>
        </label>
        <input
          type="text"
          value={formData.productName}
          onChange={handleChange('productName')}
          placeholder='Contoh: "Sambal Roa Bu Eni"'
          className={inputBase}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1">
          💰 Harga
          <span className="text-text-muted font-normal text-xs ml-1">(Opsional)</span>
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={handleChange('price')}
          placeholder='Contoh: "Rp 35.000"'
          className={inputBase}
        />
      </div>

      {/* Dropdowns row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Platform */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            📱 Platform
          </label>
          <div className="relative">
            <select
              value={formData.platform}
              onChange={handleChange('platform')}
              className={`${inputBase} appearance-none pr-10 cursor-pointer`}
            >
              <option value="Instagram">Instagram</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="TikTok">TikTok</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1">
            🎨 Gaya Bahasa
          </label>
          <div className="relative">
            <select
              value={formData.tone}
              onChange={handleChange('tone')}
              className={`${inputBase} appearance-none pr-10 cursor-pointer`}
            >
              <option value="Hard Selling">Hard Selling</option>
              <option value="Santai/Bestie">Santai/Bestie</option>
              <option value="Storytelling">Storytelling</option>
              <option value="Lucu/Menghibur">Lucu/Menghibur</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
