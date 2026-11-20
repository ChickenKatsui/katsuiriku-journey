/* Bilingual UI strings. Story text lives in story.js. */
const I18N = {
  id: {
    meta: {
      title: "KatsuiRiku: Penjahit Cerita — Prolog"
    },
    menu: {
      eyebrow: "Doggo galaxy · Penjaga benang cerita",
      titleLine1: "KATSUIRIKU",
      titleLine2: "PENJAHIT CERITA",
      tagline: "Di antara jutaan stream, ada satu cerita yang menolak untuk dilupakan. Malam ini, Sang Penonton belajar menjahit.",
      start: "Mulai Prolog",
      startSub: "Bab 01 — Mercusuar di Tepi Semesta",
      play: "Mainkan",
      inventory: "Inventory",
      inventorySub: "Koleksi benang, kristal, dan kenangan",
      worldmap: "Peta Dunia",
      worldmapSub: "Jelajahi sektor-sektor cerita",
      lore: "Lore",
      loreSub: "Codex tenun semesta dan para penjaga",
      about: "Tentang",
      aboutSub: "Dunia, karakter, dan catatan proyek",
      badge: "Prolog · Bab 01",
      note: "Prototipe cerita · 16 adegan",
      caption: "Riku — Sang Penjahit Cerita"
    },
    panel: {
      menu: "Menu"
    },
    settings: {
      kicker: "Preferensi",
      title: "Pengaturan",
      language: "Bahasa",
      textSpeed: "Kecepatan teks",
      reduceMotion: "Kurangi animasi",
      note: "Prototipe: audio dan galeri belum tersedia."
    },
    about: {
      kicker: "Tentang proyek",
      title: "KatsuiRiku: Penjahit Cerita",
      p1: "KatsuiRiku adalah demi-human berbentuk doggo galaxy yang lahir dari bintang yang runtuh dan perpustakaan yang bermimpi. Ia bukan dewa. Ia hanya penjaga cerita yang terlalu lama menonton dari jauh.",
      p2: "Di semesta ini, setiap stream adalah benang. Riku bisa merekam, memotong, dan menjahitnya menjadi cerita gema—selama ia tidak pernah menimpa cerita aslinya. Aturan itu disebut Hukum Gema.",
      p3: "Semuanya berubah ketika ia menemukan Kanna Tamachi, VTuber dengan suara seperti mercusuar. Kanna adalah oshi pertamanya, dan benang rose-gold pertama yang membuat Riku ingin menjadi Sang Penjahit Cerita.",
      note: "Prolog ini adalah prototipe. Cerita, karakter, dan aset masih dalam pengembangan.",
      credits: "Story & character: KatsuiRiku Ch · Engine: web visual novel prototype",
      adminLink: "Kelola inventory (admin) →",
      rikuAlt: "KatsuiRiku, doggo galaxy berambut pirang dengan telinga rubah, bersandar di meja sambil tersenyum",
      kannaAlt: "Kanna Tamachi, VTuber berambut benang bulan dengan mantel putih dan ekor rubah"
    },
    inventory: {
      kicker: "Koleksi",
      title: "Inventory",
      desc: "Benang, kristal, dan kenangan yang dikumpulkan Riku selama menjelajahi semesta cerita. Semua orang bisa melihat, hanya admin yang bisa mengedit.",
      publicBadge: "Public view",
      publicNote: "Public view — hanya admin yang bisa mengedit inventory.",
      empty: "Belum ada item di inventory.",
      sourceLive: "Data live dari Supabase",
      sourceFallback: "Data placeholder lokal",
      itemKicker: "Item inventory",
      filterAll: "Semua",
      category: {
        artifact: "Artefak",
        tool: "Alat",
        keepsake: "Kenang-kenangan",
        map: "Peta",
        supply: "Perlengkapan",
        other: "Lainnya"
      },
      rarity: {
        common: "Umum",
        uncommon: "Tak Umum",
        rare: "Langka",
        epic: "Epik",
        legendary: "Legendaris"
      }
    },
    worldmap: {
      kicker: "Dunia",
      title: "Peta Dunia",
      desc: "Sektor-sektor tempat benang cerita berkumpul. Beberapa area masih terkunci karena ceritanya belum siap untuk ditemukan.",
      publicBadge: "Public view",
      detailKicker: "Lokasi",
      selectHint: "Pilih lokasi",
      selectDesc: "Klik salah satu titik di peta untuk melihat detail sektor cerita.",
      mapMeta: "Peta Sektor",
      nodeCount: "07 node",
      status: {
        available: "Terbuka",
        locked: "Terkunci",
        unknown: "Belum diketahui"
      }
    },
    lore: {
      kicker: "Codex",
      title: "Tenun Semesta",
      desc: "Catatan tentang tenun semesta, benang cerita, dan makhluk-makhluk yang menjaganya. Beberapa halaman masih kosong—seperti sektor yang belum ditemukan.",
      publicBadge: "Codex",
      filterAll: "Semua",
      entries: "entri",
      quote: "Cerita tidak pernah benar-benar hilang. Ia hanya menunggu seseorang yang cukup berani untuk menjahitnya kembali.",
      category: {
        world: "Dunia",
        character: "Karakter",
        rule: "Aturan",
        event: "Peristiwa",
        glossary: "Glosarium"
      }
    },
    vn: {
      menu: "Menu",
      prologue: "Prolog · Benang Pertama",
      narrator: "Narator",
      advance: "Klik untuk lanjut"
    },
    end: {
      eyebrow: "Prolog selesai",
      title: "Benang pertama telah dijahit.",
      desc: "Bintang oshi pertama menyala. Perjalanan Riku baru saja dimulai.",
      back: "Kembali ke Menu",
      replay: "Ulangi Prolog"
    }
  },
  en: {
    meta: {
      title: "KatsuiRiku: The Story Weaver — Prologue"
    },
    menu: {
      eyebrow: "Galaxy doggo · Keeper of story threads",
      titleLine1: "KATSUIRIKU",
      titleLine2: "THE STORY WEAVER",
      tagline: "Among millions of streams, one story refused to be forgotten. Tonight, the Watcher learns how to sew.",
      start: "Start Prologue",
      startSub: "Chapter 01 — The Lighthouse at the Edge of the Universe",
      play: "Play",
      inventory: "Inventory",
      inventorySub: "Threads, crystals, and keepsakes",
      worldmap: "World Map",
      worldmapSub: "Explore the story sectors",
      lore: "Lore",
      loreSub: "Codex of the Loom and its keepers",
      about: "About",
      aboutSub: "World, characters, and project notes",
      badge: "Prologue · Chapter 01",
      note: "Story prototype · 16 scenes",
      caption: "Riku — The Story Weaver"
    },
    panel: {
      menu: "Menu"
    },
    settings: {
      kicker: "Preferences",
      title: "Settings",
      language: "Language",
      textSpeed: "Text speed",
      reduceMotion: "Reduce motion",
      note: "Prototype: audio and gallery are not available yet."
    },
    about: {
      kicker: "About the project",
      title: "KatsuiRiku: The Story Weaver",
      p1: "KatsuiRiku is a demi-human in the form of a galaxy doggo, born from a collapsing star and a library that dreamed. She is not a god. She is simply a keeper of stories who watched from afar for far too long.",
      p2: "In this universe, every stream is a thread. Riku can record, cut, and sew it into an echo story—as long as she never overwrites the original. This is called the Law of Echoes.",
      p3: "Everything changed when she found Kanna Tamachi, a VTuber whose voice felt like a lighthouse. Kanna is her first oshi, and the first rose-gold thread that made Riku want to become the Story Weaver.",
      note: "This prologue is a prototype. Story, characters, and assets are still in development.",
      credits: "Story & character: KatsuiRiku Ch · Engine: web visual novel prototype",
      adminLink: "Manage inventory (admin) →",
      rikuAlt: "KatsuiRiku, a blonde galaxy doggo with fox ears, leaning on a desk and smiling",
      kannaAlt: "Kanna Tamachi, a moon-thread VTuber in a white coat with a fox tail"
    },
    inventory: {
      kicker: "Collection",
      title: "Inventory",
      desc: "Threads, crystals, and keepsakes Riku has gathered while exploring the story universe. Everyone can view them, but only the admin can edit them.",
      publicBadge: "Public view",
      publicNote: "Public view — only the admin can edit the inventory.",
      empty: "No items in the inventory yet.",
      sourceLive: "Live data from Supabase",
      sourceFallback: "Local placeholder data",
      itemKicker: "Inventory item",
      filterAll: "All",
      category: {
        artifact: "Artifact",
        tool: "Tool",
        keepsake: "Keepsake",
        map: "Map",
        supply: "Supply",
        other: "Other"
      },
      rarity: {
        common: "Common",
        uncommon: "Uncommon",
        rare: "Rare",
        epic: "Epic",
        legendary: "Legendary"
      }
    },
    worldmap: {
      kicker: "World",
      title: "World Map",
      desc: "Sectors where story threads gather. Some areas are still locked because their stories are not ready to be found.",
      publicBadge: "Public view",
      detailKicker: "Location",
      selectHint: "Choose a location",
      selectDesc: "Click one of the points on the map to see its story sector details.",
      mapMeta: "Sector Map",
      nodeCount: "07 nodes",
      status: {
        available: "Available",
        locked: "Locked",
        unknown: "Unknown"
      }
    },
    lore: {
      kicker: "Codex",
      title: "The Loom",
      desc: "Notes on the Loom of the universe, its story threads, and the creatures who keep them. Some pages are still blank—like sectors waiting to be found.",
      publicBadge: "Codex",
      filterAll: "All",
      entries: "entries",
      quote: "A story is never truly lost. It is only waiting for someone brave enough to sew it back.",
      category: {
        world: "World",
        character: "Character",
        rule: "Rule",
        event: "Event",
        glossary: "Glossary"
      }
    },
    vn: {
      menu: "Menu",
      prologue: "Prologue · The First Thread",
      narrator: "Narrator",
      advance: "Click to continue"
    },
    end: {
      eyebrow: "Prologue complete",
      title: "The first thread has been sewn.",
      desc: "The first oshi star is lit. Riku's journey has only just begun.",
      back: "Back to Menu",
      replay: "Replay Prologue"
    }
  }
};
