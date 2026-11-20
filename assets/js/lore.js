/* Lore codex viewer.
   Static, bilingual entries. No admin editing needed yet. */
(() => {
  "use strict";

  const ENTRIES = [
    {
      order: 1,
      id: "the-loom",
      category: "world",
      title: { id: "Tenun Semesta", en: "The Loom" },
      body: {
        id: "Tenun Semesta bukan tempat. Ia adalah cara semesta mengingat. Setiap stream, setiap tawa, setiap kalimat yang hampir terlupakan disimpan sebagai benang cahaya. Riku bisa melihat benang-benang itu, tetapi tidak bisa menyentuh cerita aslinya. Ia hanya bisa menjahit gema.",
        en: "The Loom is not a place. It is how the universe remembers. Every stream, every laugh, every sentence almost forgotten is kept as a thread of light. Riku can see those threads, but she cannot touch the original story. She can only sew echoes."
      },
      quote: {
        id: "Yang kau lihat bukan cerita. Yang kau lihat adalah benang yang menunggu dijahit.",
        en: "What you see is not a story. What you see is a thread waiting to be sewn."
      }
    },
    {
      order: 2,
      id: "riku",
      category: "character",
      title: { id: "KatsuiRiku Ch", en: "KatsuiRiku Ch" },
      body: {
        id: "KatsuiRiku Ch adalah demi-human berbentuk doggo galaxy. Ia lahir dari bintang yang runtuh dan perpustakaan yang bermimpi. Ekornya menyimpan debu bintang; matanya bisa melihat lapisan cerita yang tidak terlihat manusia. Setelah jutaan tahun menonton, ia memutuskan bahwa menjaga dari jauh tidak lagi cukup.",
        en: "KatsuiRiku Ch is a demi-human in the form of a galaxy doggo. She was born from a collapsing star and a library that dreamed. Her tail holds stardust; her eyes can see layers of story invisible to humans. After watching for millions of years, she decided that keeping watch from afar was no longer enough."
      },
      quote: {
        id: "Aku bukan dewa. Aku hanya penonton yang akhirnya belajar menjahit.",
        en: "I am not a god. I am just a watcher who finally learned how to sew."
      }
    },
    {
      order: 3,
      id: "kanna",
      category: "character",
      title: { id: "Kanna Tamachi", en: "Kanna Tamachi" },
      body: {
        id: "Kanna Tamachi adalah VTuber dengan suara seperti mercusuar: tenang, hangat, dan cukup terang untuk ditemukan dari jauh. Stream pertamanya kecil, tetapi cerita tentang anjing yang menunggu bintang jatuh membuat Riku merasakan benang pertama yang benar-benar hidup. Kanna adalah oshi pertama Riku—dan alasan Loom menerima jahitan pertamanya.",
        en: "Kanna Tamachi is a VTuber whose voice is like a lighthouse: calm, warm, and bright enough to be found from afar. Her first stream was small, but her story about a dog waiting for a falling star made Riku feel the first thread that was truly alive. Kanna is Riku's first oshi—and the reason the Loom accepted its first stitch."
      },
      quote: {
        id: "Kalau kau menunggu cukup lama, bahkan bintang yang paling jauh akan menemukan jalan pulang.",
        en: "If you wait long enough, even the farthest star will find its way home."
      }
    },
    {
      order: 4,
      id: "threads",
      category: "rule",
      title: { id: "Benang Cerita", en: "Story Threads" },
      body: {
        id: "Benang adalah momen yang bisa direkam. Warnanya mengikuti perasaan yang paling kuat di dalamnya: rose-gold untuk keberanian, sage untuk ketenangan, violet untuk kerinduan, dan emas untuk kegembiraan. Benang boleh dipotong, disambung, dan dijahit ulang—tetapi sumbernya tidak boleh dilupakan.",
        en: "A thread is a moment that can be recorded. Its color follows the strongest feeling inside it: rose-gold for courage, sage for calm, violet for longing, and gold for joy. A thread may be cut, joined, and sewn again—but its source must never be forgotten."
      },
      quote: {
        id: "Setiap benang punya warna. Setiap warna punya alasan.",
        en: "Every thread has a color. Every color has a reason."
      }
    },
    {
      order: 5,
      id: "echoes",
      category: "rule",
      title: { id: "Hukum Gema", en: "The Law of Echoes" },
      body: {
        id: "Cerita gema adalah hasil jahitan Riku: bukan salinan, bukan pengganti, melainkan lentera baru yang dibuat dari cahaya cerita asli. Hukum Gema hanya punya satu larangan: jangan pernah menimpa sumbernya. Gema yang lupa asalnya akan menjadi kusut, dan kusut itu bisa menelan cerita.",
        en: "An echo story is Riku's woven work: not a copy, not a replacement, but a new lantern made from the light of the original. The Law of Echoes has only one prohibition: never overwrite the source. An echo that forgets where it came from becomes a tangle, and that tangle can swallow the story."
      },
      quote: {
        id: "Jahit cahayanya. Jangan ambil nyalanya.",
        en: "Sew the light. Do not take the flame."
      }
    },
    {
      order: 6,
      id: "first-thread",
      category: "event",
      title: { id: "Malam Benang Pertama", en: "The Night of the First Thread" },
      body: {
        id: "Malam Benang Pertama terjadi ketika stream Kanna bergetar dan suaranya terpotong oleh senyap. Riku merekam satu detik itu—satu detik yang cukup untuk mengubah seorang penonton menjadi penjahit. Di malam itu, Loom menerima jahitan pertamanya dan bintang oshi pertama menyala.",
        en: "The Night of the First Thread happened when Kanna's stream trembled and her voice was cut by silence. Riku recorded that one second—one second enough to turn a watcher into a weaver. That night, the Loom accepted its first stitch and the first oshi star lit up."
      },
      quote: {
        id: "Satu detik bisa cukup untuk menyelamatkan satu cerita.",
        en: "One second can be enough to save a story."
      }
    },
    {
      order: 7,
      id: "oshi-star",
      category: "world",
      title: { id: "Bintang Oshi", en: "The Oshi Star" },
      body: {
        id: "Bintang oshi muncul ketika sebuah cerita menjadi sangat berharga bagi seseorang. Ia bukan tanda kepemilikan. Ia adalah janji untuk menemani cerita itu dari awal sampai akhir, bahkan ketika stream berakhir dan layar menjadi gelap.",
        en: "An oshi star appears when a story becomes precious to someone. It is not a mark of ownership. It is a promise to stay with that story from beginning to end, even when the stream ends and the screen goes dark."
      },
      quote: {
        id: "Oshi bukan milik kita. Oshi adalah bintang yang kita pilih untuk dijaga.",
        en: "An oshi is not ours. An oshi is a star we choose to keep."
      }
    },
    {
      order: 8,
      id: "archive",
      category: "world",
      title: { id: "Arsip Penonton", en: "The Watcher's Archive" },
      body: {
        id: "Arsip Penonton adalah rak panjang berisi rekaman semua cerita yang pernah Riku tonton. Beberapa rak terbuka; beberapa terkunci karena ceritanya masih tumbuh. Riku tidak pernah menghapus apa pun. Ia hanya menunggu sampai cerita itu siap untuk dijahit.",
        en: "The Watcher's Archive is a long shelf holding recordings of every story Riku has ever watched. Some shelves are open; some are locked because their stories are still growing. Riku never deletes anything. She only waits until a story is ready to be sewn."
      },
      quote: {
        id: "Arsip bukan kuburan. Arsip adalah ruang tunggu.",
        en: "An archive is not a grave. An archive is a waiting room."
      }
    },
    {
      order: 9,
      id: "glossary",
      category: "glossary",
      title: { id: "Glosarium Benang", en: "Thread Glossary" },
      body: {
        id: "OSHI — cerita yang paling ingin kau jaga.\nSTREAM — aliran momen yang bisa direkam.\nBENANG — satu momen yang sudah direkam.\nGEMA — cerita hasil jahitan, bukan salinan.\nLOOM — cara semesta mengingat.\nKUSUT — gema yang lupa asalnya.",
        en: "OSHI — the story you most want to keep.\nSTREAM — a flow of moments that can be recorded.\nTHREAD — one recorded moment.\nECHO — a woven story, not a copy.\nLOOM — the way the universe remembers.\nTANGLE — an echo that forgot its source."
      },
      quote: {
        id: "Kamus kecil untuk penjelajah benang.",
        en: "A small dictionary for thread travelers."
      }
    }
  ];

  const filters = document.getElementById("lore-filters");
  const grid = document.getElementById("lore-grid");
  const count = document.getElementById("lore-count");

  let lang = document.documentElement.lang === "en" ? "en" : "id";
  let activeCategory = "all";
  let rendered = false;

  function t(path) {
    return window.KatsuiApp?.t(path) || path;
  }

  function categoryLabel(key) {
    return t(`lore.category.${key}`) || key;
  }

  function renderFilters() {
    if (!filters) return;

    const categories = ["all", ...new Set(ENTRIES.map((entry) => entry.category))];
    filters.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-btn${category === activeCategory ? " is-active" : ""}`;
      button.dataset.category = category;
      button.textContent = category === "all" ? t("lore.filterAll") : categoryLabel(category);
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = category;
        renderFilters();
        render();
      });
      filters.appendChild(button);
    });
  }

  function render() {
    if (!grid) return;

    const visible = activeCategory === "all"
      ? ENTRIES
      : ENTRIES.filter((entry) => entry.category === activeCategory);

    grid.innerHTML = "";

    visible.forEach((entry, index) => {
      const details = document.createElement("details");
      details.className = "lore-entry";
      if (index === 0) details.open = true;

      const summary = document.createElement("summary");
      summary.className = "lore-entry-summary";

      const number = document.createElement("span");
      number.className = "lore-entry-no";
      number.textContent = String(entry.order).padStart(2, "0");

      const title = document.createElement("span");
      title.className = "lore-entry-title";
      title.textContent = entry.title[lang] || entry.title.id;

      const tag = document.createElement("span");
      tag.className = "lore-entry-tag";
      tag.textContent = categoryLabel(entry.category);

      const chevron = document.createElement("span");
      chevron.className = "lore-entry-chevron";
      chevron.textContent = "+";

      summary.append(number, title, tag, chevron);

      const body = document.createElement("div");
      body.className = "lore-entry-body";

      const paragraph = document.createElement("p");
      paragraph.textContent = entry.body[lang] || entry.body.id;
      body.appendChild(paragraph);

      if (entry.quote) {
        const quote = document.createElement("blockquote");
        quote.className = "lore-entry-quote";
        quote.textContent = entry.quote[lang] || entry.quote.id;
        body.appendChild(quote);
      }

      details.append(summary, body);
      grid.appendChild(details);
    });

    if (count) {
      count.textContent = `${visible.length} ${t("lore.entries")}`;
    }
  }

  function open() {
    renderFilters();
    render();
    rendered = true;
  }

  function setLanguage(nextLang) {
    lang = nextLang === "en" ? "en" : "id";
    if (rendered) {
      renderFilters();
      render();
    }
  }

  window.KatsuiLore = {
    open,
    setLanguage
  };
})();
