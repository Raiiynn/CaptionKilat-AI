/**
 * CaptionKilat API Service
 *
 * Contains the mock API function and the real API integration structure.
 * To switch to a real LLM API (e.g., Google Gemini, OpenAI GPT-4o),
 * replace the mock function body with a real fetch call.
 */

/**
 * Convert an image File to a Base64 data URI string.
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Build the system prompt for the LLM with variable interpolation.
 */
export function buildSystemPrompt({ productName, price, platform, tone }) {
  const nama = productName || '(tidak disebutkan)';
  const harga = price || '(tidak disebutkan)';

  return `Kamu adalah Copywriter Profesional UMKM. Analisis foto, ekstrak Selling Points visual.
Konteks: Nama: ${nama}, Harga: ${harga}, Platform: ${platform}, Tone: ${tone}.
Aturan: WA (singkat, bullet points), IG (estetik, hashtag), TikTok (hook provokatif di awal).
Output HANYA dalam JSON valid:
{
  "analisis_visual_ai": "Deskripsi visual gambar...",
  "draf_1": "Teks opsi 1",
  "draf_2": "Teks opsi 2",
  "draf_3": "Teks opsi 3"
}`;
}

/**
 * Mock responses based on platform and tone.
 * In production, this would be replaced by the actual LLM response.
 */
function getMockResponse(platform, tone, productName, price) {
  const name = productName || 'Produk UMKM';
  const harga = price || 'Harga spesial';

  const responses = {
    Instagram: {
      'Hard Selling': {
        analisis_visual_ai:
          'AI mendeteksi produk makanan/minuman dengan kemasan menarik, warna dominan cerah, dan presentasi yang estetik. Terlihat detail tekstur yang menggugah selera.',
        draf_1: `🔥 FLASH SALE! ${name} CUMA ${harga}!\n\nYang kemarin kehabisan, SEKARANG READY STOCK! 🎉\n\n✅ Kualitas premium\n✅ Langsung dari produsen\n✅ Pengiriman cepat\n\nSisa stok TERBATAS! Jangan sampai menyesal 😤\n\nOrder? Langsung DM! 📩\n\n#${name.replace(/\s+/g, '')} #PromoHariIni #UMKMIndonesia #BeliLokal #FlashSale`,
        draf_2: `⚡ TERLARIS BULAN INI!\n\n${name} udah jadi favorit 500+ pelanggan 🏆\n\n🏷️ Harga: ${harga}\n📦 Ready stock\n🚚 Kirim hari ini!\n\nMau bukti? Cek highlight review kami!\n\nOrder via DM atau link di bio 🔗\n\n#Bestseller #${name.replace(/\s+/g, '')} #ShopLocal #Recommended #UMKMNaik`,
        draf_3: `💎 PRODUK PREMIUM, HARGA RAKYAT!\n\n${name} hadir untuk kamu yang nggak mau kompromi soal kualitas ✨\n\n🔹 ${harga}\n🔹 Bahan pilihan\n🔹 Garansi kepuasan\n\nYang udah coba bilang: "Kapan restock?!" 😍\n\nBuruan sebelum kehabisan!\nDM NOW! 💬\n\n#ProdukLokal #QualityFirst #BestDeal #UMKMHebat`,
      },
      'Santai/Bestie': {
        analisis_visual_ai:
          'AI mendeteksi produk dengan tampilan yang cozy dan aesthetic. Nuansa warm tones dengan penataan yang instagrammable.',
        draf_1: `bestie, aku nemu ${name} yang literally the best 🤩✨\n\nseriously, ${harga} doang buat kualitas segini?? steal deal banget sih 💅\n\naku udah coba dan... NO REGRET! 10/10 would recommend 💯\n\nyuk cobain juga, DM aku yaa 💕\n\n#Bestie #${name.replace(/\s+/g, '')} #MustHave #AestheticFinds #RecommendedBanget`,
        draf_2: `eh eh mau kasih tau sesuatu 🤫\n\n${name} ini tuh hidden gem banget!\nharganya? ${harga} aja!!\n\naku sih udah beli 3x dan masih ketagihan 😂\n\ncus yang mau ikutan, link di bio ya~\n\n#HiddenGem #${name.replace(/\s+/g, '')} #WorthIt #MuslimahStyle #LokalPride`,
        draf_3: `POV: kamu nemu ${name} yang affordable tapi kualitasnya 💋\n\nharga ${harga} tapi vibes-nya mahal ✨\n\nini sih bukan want, tapi NEED!\n\nsiapa yang mau? angkat tangan! 🙋‍♀️\n\n#POV #AffordableLuxury #${name.replace(/\s+/g, '')} #LokalBerkualitas`,
      },
      Storytelling: {
        analisis_visual_ai:
          'AI mendeteksi produk buatan tangan/artisan dengan detail craft yang teliti. Terlihat keaslian dan keunikan produk.',
        draf_1: `Di balik ${name}, ada cerita yang jarang orang tahu... 🧵\n\nBerawal dari dapur kecil 3x3 meter, dengan modal seadanya.\nSekarang? Sudah dipercaya ratusan pelanggan setia 🙏\n\nSetiap produk dibuat dengan cinta dan ketelitian.\nHarga ${harga} — karena kualitas nggak harus mahal.\n\nMau jadi bagian dari cerita ini? ❤️\n\n#CeritaUMKM #${name.replace(/\s+/g, '')} #DiBalikLayar #LokalHebat`,
        draf_2: `"Kak, ini beneran buatan sendiri?"\n\nItu pertanyaan yang paling sering saya dengar tentang ${name}.\n\nJawabannya: IYA! 100% handmade with love 💛\n\nDari pemilihan bahan, proses, sampai packaging — semua saya awasi sendiri.\n\nDengan ${harga}, kamu nggak cuma beli produk.\nKamu dukung mimpi UMKM Indonesia 🇮🇩\n\n#Handmade #CeritaUMKM #DukungLokal #${name.replace(/\s+/g, '')}`,
        draf_3: `3 tahun lalu, nggak ada yang percaya ${name} bisa seperti sekarang.\n\nDari ditolak 10 marketplace...\nDari diragukan keluarga sendiri...\nSampai akhirnya bisa kirim ke 34 provinsi 📦🇮🇩\n\n${harga} bukan cuma harga.\nItu adalah bukti bahwa UMKM bisa bersaing! 💪\n\nTerima kasih untuk setiap orderan kalian 🙏\n\n#JourneyUMKM #NeverGiveUp #${name.replace(/\s+/g, '')} #InspirasiUsaha`,
      },
      'Lucu/Menghibur': {
        analisis_visual_ai:
          'AI mendeteksi produk dengan visual yang eye-catching dan fun. Potensi untuk konten yang engaging dan entertaining.',
        draf_1: `teman: "Lu ngapain senyum-senyum sendiri?"\naku: *baru order ${name}* 😏\n\nsoalnya ${harga} dapet kualitas premium gini siapa yang nggak senyum coba?? 😂\n\nyang belum order, kalian nggak tau apa yang kalian lewatkan bestie 💅\n\n#Relatable #${name.replace(/\s+/g, '')} #NgakakTapiReal #BeliYuk`,
        draf_2: `ZODIAK HARI INI 🔮\n\n♈ Aries: Harus beli ${name}\n♉ Taurus: Wajib beli ${name}\n♊ Gemini: Kudu beli ${name}\n\n....\n\nYaudah intinya semua zodiak harus beli ${name} 😂\n\nCuma ${harga}! Link di bio~\n\n#ZodiakHariIni #${name.replace(/\s+/g, '')} #Ngakak #LucuTapiSerius`,
        draf_3: `POV: dompet gw kalau liat ${name} 😂💸\n\nDompet: "Jangan!"\nAku: *checkout*\nDompet: "..." \nAku: "Kan cuma ${harga}" 🤷‍♀️\n\nYang relate angkat tangan! 😂✋\n\n#POV #DompetMenangis #${name.replace(/\s+/g, '')} #RelateNggak #BeliBeliBeli`,
      },
    },
    WhatsApp: {
      'Hard Selling': {
        analisis_visual_ai:
          'AI mendeteksi produk dengan kemasan profesional, cocok untuk promosi direct selling melalui chat.',
        draf_1: `🔥 *PROMO ${name.toUpperCase()}!* 🔥\n\n✅ Kualitas terjamin\n✅ Harga: *${harga}*\n✅ Ready stock!\n✅ COD/Transfer\n\nPromo berlaku TERBATAS!\nMisc sekarang sebelum kehabisan 🏃‍♀️\n\nPesan: Ketik *ORDER* 📩`,
        draf_2: `Hai Kak! 👋\n\nMau info produk terbaru kami?\n\n🏷️ *${name}*\n💰 *${harga}*\n\nKeunggulan:\n• Bahan premium\n• Tahan lama\n• Sudah terpercaya 100+ pembeli\n\nMau order? Langsung balas chat ini ya Kak! ✨`,
        draf_3: `⚡ *FLASH SALE HARI INI SAJA!*\n\n*${name}* — ${harga}\n\n📦 Pengiriman cepat\n💯 Garansi kualitas\n🎁 Bonus packaging eksklusif\n\nStok tinggal sedikit!\nKetik "MAU" untuk order 👇`,
      },
      'Santai/Bestie': {
        analisis_visual_ai:
          'AI mendeteksi produk casual yang cocok untuk percakapan santai antar teman.',
        draf_1: `Hai bestiee 💕\n\nEh aku mau share ${name} nih\nCuma ${harga} looh!\n\nSeriusan enak/bagus banget 😍\nAku udah coba sendiri!\n\nMau coba juga? Chat aku aja yaa~`,
        draf_2: `Psst.. 🤫\n\nAku lagi jual ${name} nih\n${harga} aja!\n\nYang udah coba pada repeat order loh 🔄\n\nPenasaran? Yuk cobain!\nChat "INFO" ya ✨`,
        draf_3: `Kak mau rekomendasi dong 😊\n\n${name} ini worth it banget!\n${harga} — murah kan?\n\nBanyak yang bilang ini best purchase mereka 🏆\n\nMau order? Tinggal balas chat ini~`,
      },
      Storytelling: {
        analisis_visual_ai:
          'AI mendeteksi produk artisanal dengan sentuhan personal yang kuat.',
        draf_1: `Assalamualaikum Kak 🙏\n\nKenalan yuk sama *${name}*!\n\nProduk ini lahir dari passion saya di bidang UMKM.\nSetiap produk dibuat manual dengan penuh cinta ❤️\n\nHarga: *${harga}*\n\nYuk dukung produk lokal!\nMisc order? Balas pesan ini ya Kak 🙏`,
        draf_2: `Kak, boleh cerita sebentar? 🙏\n\n*${name}* ini awalnya cuma hobi kecil-kecilan.\nTapi alhamdulillah, sekarang sudah dipesan dari berbagai kota 📦\n\nCuma *${harga}* untuk kualitas yang nggak kalah sama produk mahal!\n\nPenasaran? Chat aku ya 😊`,
        draf_3: `Hai Kak! 👋\n\nTau nggak, *${name}* ini punya cerita khusus.\n\nResepnya/desainnya turun-temurun dari keluarga 👨‍👩‍👧\nDan sekarang aku mau share ke lebih banyak orang ✨\n\nHarga: *${harga}*\n\nMau jadi bagian dari cerita ini? Order yuk! 💛`,
      },
      'Lucu/Menghibur': {
        analisis_visual_ai:
          'AI mendeteksi produk dengan visual fun yang cocok untuk pendekatan humor.',
        draf_1: `Kak, gawat! 🚨\n\n${name} lagi PROMO!\n${harga} doang!\n\nKalau nggak beli sekarang...\nyang rugi siapa? YA KAMU! 😂\n\nYuk order sebelum nyesel~\nKetik "GAS" 🚀`,
        draf_2: `⚠️ *PERINGATAN* ⚠️\n\n${name} bikin ketagihan!\n\nEfek samping:\n• Repeat order terus 🔄\n• Dompet menipis 💸\n• Tapi happy! 😂\n\n${harga} — worth it kok!\n\nMau coba? Chat "BERANI" 😏`,
        draf_3: `Quiz time! 🤔\n\nApa yang ${harga}, kualitas juara, bikin nagih?\n\n.\n.\n.\n\nYAP! *${name}*! 🎉\n\nYang jawab bener, hadiahnya: boleh order sekarang 😂\n\nKetik "ORDER" ya!`,
      },
    },
    TikTok: {
      'Hard Selling': {
        analisis_visual_ai:
          'AI mendeteksi produk viral-worthy dengan visual yang catchy untuk konten short-form video.',
        draf_1: `STOP SCROLL! 🛑\n\nKamu HARUS tau ${name} ini!\n\nCuma ${harga} tapi kualitasnya?? GILA SIH! 🤯\n\n🔥 Udah terjual 500+ pcs\n🔥 Rating 4.9/5\n🔥 Free ongkir!\n\nKlik keranjang kuning SEKARANG! 🛒⬇️\n\n#FYP #${name.replace(/\s+/g, '')} #TikTokMadeMeBuyIt #RacunTikTok #ViralProduct`,
        draf_2: `Produk ${harga} tapi kualitas 500rb?? 😱\n\n${name} ini REAL NO SETTINGAN!\n\n✨ Premium quality\n✨ Trusted seller\n✨ Bisa COD\n\nBuruan checkout, stok TINGGAL SEDIKIT!\n\n#Rekomendasi #MurahBerkualitas #${name.replace(/\s+/g, '')} #WajibBeli #ViralTikTok`,
        draf_3: `🚨 JANGAN BELI PRODUK LAIN sebelum liat ini!\n\n${name} — ${harga}\n\nWhy? Because:\n1. Kualitas juara 🏆\n2. Harga bersahabat 💰\n3. Pengiriman kilat ⚡\n\nProof? Cek review di comment!\n\nAdd to cart NOW! 🛒\n\n#HonestReview #${name.replace(/\s+/g, '')} #TikTokShop #BestFind`,
      },
      'Santai/Bestie': {
        analisis_visual_ai:
          'AI mendeteksi produk aesthetic yang cocok untuk konten casual & relatable di TikTok.',
        draf_1: `guys ini WAJIB masuk keranjang kalian 🫣✨\n\n${name} cuma ${harga}!\n\naku udah pake/coba dan honestly?\nTHE BEST SIH 💯\n\nyang belum coba, kalian ketinggalan bestie~\n\n#FYP #${name.replace(/\s+/g, '')} #Rekomendasi #AestheticFinds`,
        draf_2: `replying to everyone yang nanya soal ${name} 💕\n\nYES ini worth every penny!\n${harga} — affordable queen 👑\n\nno cap, udah repurchase 3x 🔄\n\ntrust me on this one!\n\n#HonestReview #${name.replace(/\s+/g, '')} #MustHave #TikTokFinds`,
        draf_3: `THIS IS YOUR SIGN buat beli ${name}! 🫶\n\nHarganya ${harga}, kualitasnya? *chef's kiss* 💋\n\naku literally nggak bisa berhenti recommend ini ke semua orang 😂\n\nyuk gasss! link di bio~\n\n#YourSign #${name.replace(/\s+/g, '')} #Aesthetic #BestPurchase`,
      },
      Storytelling: {
        analisis_visual_ai:
          'AI mendeteksi produk UMKM dengan nilai cerita yang kuat untuk narrative content.',
        draf_1: `"Kakak jualan apa sih?"\n\nPertanyaan ini yang bikin aku mulai ${name}.\n\nDari nol. Dari ditolak. Dari nggak ada yang percaya.\n\nSekarang? Alhamdulillah bisa kirim ke seluruh Indonesia 🇮🇩\n\n${harga} — bukan cuma harga.\nIni adalah bukti perjuangan UMKM! 💪\n\n#CeritaUMKM #${name.replace(/\s+/g, '')} #Inspirasi #PejuangUsaha`,
        draf_2: `3 bulan lalu, stok ${name} cuma 10 pcs.\n\nSekarang? 1000+ pcs/bulan! 📈\n\nRahasianya? Konsisten dan dengerin feedback pelanggan ❤️\n\n${harga} untuk kualitas yang terus kami tingkatkan.\n\nTerima kasih yang selalu support! 🙏\n\n#GrowthStory #UMKM #${name.replace(/\s+/g, '')} #Alhamdulillah`,
        draf_3: `POV: kamu lihat ${name} untuk pertama kalinya 🥹\n\nIni bukan produk biasa.\nIni hasil kerja keras seorang ibu yang pengen kasih yang terbaik untuk keluarganya.\n\nSetiap ${name} dibuat dengan sepenuh hati.\nHarga ${harga} — karena mimpi nggak harus mahal.\n\nDukung UMKM, satu order berarti banyak 🙏\n\n#DukungUMKM #${name.replace(/\s+/g, '')} #Touching #SmallBusiness`,
      },
      'Lucu/Menghibur': {
        analisis_visual_ai:
          'AI mendeteksi produk dengan potensi konten humor tinggi untuk engagement maksimal.',
        draf_1: `POV: dompet gw setelah liat ${name} 💀\n\nDompet: "jangan..."\nAku: *add to cart*\nDompet: "WOI"\nAku: "tenang cuma ${harga} kok" 😂\n\nYANG RELATE MANA SUARANYA?! 📢\n\n#POV #Relatable #${name.replace(/\s+/g, '')} #NgakakTapiReal #DompetNangis`,
        draf_2: `Kalau ${name} itu orang, dia tipe yang:\n\n✅ Setia (kualitas konsisten)\n✅ Murah hati (${harga} aja!)\n✅ Bikin kangen (auto repeat order)\n\nKapan terakhir kamu punya "orang" kayak gini? 😂\n\nYuk checkout! 🛒\n\n#Ngakak #${name.replace(/\s+/g, '')} #FunnyTikTok #Relatable`,
        draf_3: `Things I can't live without:\n\n1. HP ✅\n2. WiFi ✅\n3. ${name} ✅✅✅\n\nSeriously tho, ${harga} untuk kebahagiaan? MURAH! 😂\n\nYang setuju, SHARE ke temen kalian yang pelit!\n\n#FYP #${name.replace(/\s+/g, '')} #LucuBanget #GasBeli #RacunTikTok`,
      },
    },
  };

  try {
    return responses[platform]?.[tone] || responses.Instagram['Hard Selling'];
  } catch {
    return responses.Instagram['Hard Selling'];
  }
}

/**
 * Generate caption using mock data (simulates API call with delay).
 *
 * To integrate with a real LLM API, replace the setTimeout logic
 * with a fetch call to your backend or directly to the LLM endpoint.
 *
 * Example real integration:
 * ```js
 * const base64 = await fileToBase64(image);
 * const prompt = buildSystemPrompt({ productName, price, platform, tone });
 * const response = await fetch('/api/generate', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ image: base64, prompt }),
 * });
 * const data = await response.json();
 * return data;
 * ```
 */
export async function generateCaption(image, productName, price, platform, tone) {
  // Build the prompt (ready for real API use)
  const _systemPrompt = buildSystemPrompt({ productName, price, platform, tone });

  // Convert image to base64 (ready for real API use)
  const _base64Image = await fileToBase64(image);

  // Simulate network delay (1.5 - 3 seconds)
  const delay = 1500 + Math.random() * 1500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate a small chance of error for testing error handling
        if (Math.random() < 0.05) {
          reject(new Error('Gagal menghubungkan ke AI, silakan coba lagi.'));
          return;
        }

        const mockData = getMockResponse(platform, tone, productName, price);

        // Simulate JSON parsing (as we would with a real LLM response)
        const jsonString = JSON.stringify(mockData);
        const parsed = JSON.parse(jsonString);

        // Validate expected structure
        if (!parsed.analisis_visual_ai || !parsed.draf_1 || !parsed.draf_2 || !parsed.draf_3) {
          reject(new Error('Respons AI tidak valid. Silakan coba lagi.'));
          return;
        }

        resolve(parsed);
      } catch (err) {
        reject(new Error('Gagal memproses respons AI. Silakan coba lagi.'));
      }
    }, delay);
  });
}
