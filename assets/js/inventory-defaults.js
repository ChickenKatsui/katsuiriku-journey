/* Local placeholder inventory.
   These items are shown when Supabase is not configured or the table is not ready.
   Live items are managed from /admin/ and stored in public.vn_inventory. */
window.INVENTORY_DEFAULTS = [
  {
    id: "default-star-thread",
    name_id: "Benang Bintang",
    name_en: "Star Thread",
    description_id: "Benang rose-gold yang muncul saat Riku menemukan cerita pertamanya. Hangat, rapuh, dan selalu berdenyut pelan seperti jantung yang sedang menunggu.",
    description_en: "The rose-gold thread that appeared when Riku found her first story. Warm, fragile, and always pulsing softly like a heart that is waiting.",
    category: "artifact",
    rarity: "rare",
    icon: "✦",
    image_url: "",
    sort_order: 10,
    visible: true
  },
  {
    id: "default-memory-crystal",
    name_id: "Kristal Memori",
    name_en: "Memory Crystal",
    description_id: "Kristal yang menyimpan satu cerita utuh. Di dalamnya, suara Kanna berulang seperti ombak di ruang tertutup—hangat, aman, tapi perlahan terasa sepi.",
    description_en: "A crystal that holds one complete story. Inside, Kanna's voice repeats like a tide in a closed room—warm, safe, but slowly growing lonely.",
    category: "artifact",
    rarity: "epic",
    icon: "◆",
    image_url: "",
    sort_order: 20,
    visible: true
  },
  {
    id: "default-story-needle",
    name_id: "Jarum Jahit Cerita",
    name_en: "Story Needle",
    description_id: "Jarum emas yang bisa memotong dan menyambung momen tanpa merusak alurnya. Riku memakainya untuk menjahit gema, bukan untuk mengganti cerita asli.",
    description_en: "A golden needle that can cut and reconnect moments without breaking their flow. Riku uses it to sew echoes, never to replace the original story.",
    category: "tool",
    rarity: "legendary",
    icon: "✧",
    image_url: "",
    sort_order: 30,
    visible: true
  },
  {
    id: "default-kanna-cup",
    name_id: "Cangkir Kanna",
    name_en: "Kanna's Cup",
    description_id: "Cangkir hangat dari stream pertama Kanna. Masih wangi teh vanilla, meskipun isinya sudah lama habis.",
    description_en: "A warm cup from Kanna's first stream. It still smells of vanilla tea, even though it has long been empty.",
    category: "keepsake",
    rarity: "common",
    icon: "☕",
    image_url: "",
    sort_order: 40,
    visible: true
  },
  {
    id: "default-starlight-ticket",
    name_id: "Tiket Konser Bintang",
    name_en: "Starlight Concert Ticket",
    description_id: "Tiket konser virtual yang tidak pernah benar-benar berakhir. Di sudutnya ada tulisan kecil: \"Sampai jumpa lagi.\"",
    description_en: "A virtual concert ticket that never truly ends. A small note in the corner reads: \"See you again.\"",
    category: "keepsake",
    rarity: "rare",
    icon: "🎟",
    image_url: "",
    sort_order: 50,
    visible: true
  },
  {
    id: "default-sector-map",
    name_id: "Peta Sektor Cerita",
    name_en: "Story Sector Map",
    description_id: "Peta kasar semesta cerita. Enam sektor sudah terlihat, tetapi beberapa area masih kosong—seolah menunggu Riku untuk menemukannya.",
    description_en: "A rough map of the story universe. Six sectors are visible, but some areas are still blank—as if waiting for Riku to find them.",
    category: "map",
    rarity: "uncommon",
    icon: "🗺",
    image_url: "",
    sort_order: 60,
    visible: true
  },
  {
    id: "default-lighthouse-lantern",
    name_id: "Lentera Mercusuar",
    name_en: "Lighthouse Lantern",
    description_id: "Lentera kecil yang dibuat dari cerita Kanna tentang anjing di tepi laut. Cahayanya tidak menerangi jalan—ia hanya memastikan seseorang tahu bahwa ia tidak menunggu sendirian.",
    description_en: "A small lantern made from Kanna's story about the dog by the sea. Its light does not show the way—it only makes sure someone knows they are not waiting alone.",
    category: "artifact",
    rarity: "epic",
    icon: "☼",
    image_url: "",
    sort_order: 70,
    visible: true
  },
  {
    id: "default-echo-ribbon",
    name_id: "Pita Gema",
    name_en: "Echo Ribbon",
    description_id: "Pita tipis yang menandai cerita gema pertama Riku. Warnanya berubah mengikuti perasaan orang yang membacanya: rose-gold untuk berani, sage untuk tenang.",
    description_en: "A thin ribbon marking Riku's first echo story. Its color changes with the feelings of whoever reads it: rose-gold for courage, sage for calm.",
    category: "keepsake",
    rarity: "rare",
    icon: "≈",
    image_url: "",
    sort_order: 80,
    visible: true
  },
  {
    id: "default-kanna-star",
    name_id: "Bintang Kanna",
    name_en: "Kanna's Star",
    description_id: "Bintang oshi pertama yang menyala saat Riku memutuskan untuk menjaga cerita Kanna dari awal sampai akhir. Bintang ini tidak pernah redup.",
    description_en: "The first oshi star, lit when Riku decided to keep Kanna's story from beginning to end. This star never dims.",
    category: "keepsake",
    rarity: "legendary",
    icon: "★",
    image_url: "",
    sort_order: 90,
    visible: true
  }
];
