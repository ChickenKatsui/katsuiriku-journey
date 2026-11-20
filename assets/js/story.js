/* Prologue script — Chapter 01: The First Thread.
   Edit the text, add scenes, or change the branches without touching app.js. */
const STORY = {
  start: "p1",
  totalScenes: 16,
  title: {
    id: "Prolog — Benang Pertama",
    en: "Prologue — The First Thread"
  },
  subtitle: {
    id: "Bab 01 — Mercusuar di Tepi Semesta",
    en: "Chapter 01 — The Lighthouse at the Edge of the Universe"
  },
  scenes: {
    p1: {
      progress: 1,
      bg: "cosmos",
      character: null,
      speaker: null,
      text: {
        id: "Sebelum cerita pertama, ada sebuah tenun. Bukan tenun kain, melainkan tenun momen: setiap stream, setiap tawa, setiap kalimat yang hampir terlupakan. Semesta menyimpannya sebagai benang cahaya.",
        en: "Before the first story, there was a loom. Not a loom of cloth, but of moments: every stream, every laugh, every sentence almost forgotten. The universe kept them as threads of light."
      },
      next: "p2"
    },
    p2: {
      progress: 2,
      bg: "cosmos",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Di antara benang-benang itu hidup seorang demi-human berbentuk doggo galaxy. Namanya KatsuiRiku. Bulu ekornya menyimpan debu bintang, dan matanya bisa melihat lapisan cerita yang tidak terlihat oleh manusia.",
        en: "Between those threads lived a demi-human in the form of a galaxy doggo. Her name was KatsuiRiku. Her tail held stardust, and her eyes could see layers of story invisible to humans."
      },
      next: "p3"
    },
    p3: {
      progress: 3,
      bg: "cosmos",
      character: "riku",
      side: "right",
      speaker: { id: "Riku", en: "Riku" },
      text: {
        id: "Aku bisa merekam. Memotong. Menyusun ulang. Tapi ada satu aturan yang tidak pernah kulanggar: jangan pernah menimpa cerita aslinya.",
        en: "I can record. Cut. Rearrange. But there is one rule I never break: never overwrite the original story."
      },
      next: "p4"
    },
    p4: {
      progress: 4,
      bg: "cosmos",
      character: "riku",
      side: "right",
      speaker: { id: "Riku", en: "Riku" },
      text: {
        id: "Sudah jutaan stream kutonton. Jutaan benang kusimpan. Namun tidak satu pun kujahit menjadi cerita. Menonton terasa cukup... sampai malam itu.",
        en: "I have watched millions of streams. I have kept millions of threads. Yet I have never sewn one into a story. Watching felt enough... until that night."
      },
      next: "p5"
    },
    p5: {
      progress: 5,
      bg: "cosmos",
      character: null,
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Di sudut semesta yang tenang, sebuah sinyal kecil berdenyut. Warnanya bukan violet atau emas, melainkan rose-gold—hangat, seperti lampu di jendela yang menunggu seseorang pulang.",
        en: "In a quiet corner of the universe, a small signal pulsed. It was not violet or gold, but rose-gold—warm, like a lamp in a window waiting for someone to come home."
      },
      next: "p6"
    },
    p6: {
      progress: 6,
      bg: "memory",
      character: "kanna",
      side: "left",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Di balik sinyal itu, seorang gadis VTuber tersenyum ke kamera. Rambutnya seperti benang bulan, dan suaranya seperti ombak yang tidak ingin menenggelamkan siapa pun. Namanya Kanna Tamachi.",
        en: "Behind the signal, a VTuber smiled at the camera. Her hair was like moon-thread, and her voice was like a tide that did not want to drown anyone. Her name was Kanna Tamachi."
      },
      next: "p7"
    },
    p7: {
      progress: 7,
      bg: "memory",
      character: "kanna",
      side: "left",
      speaker: { id: "Kanna Tamachi", en: "Kanna Tamachi" },
      text: {
        id: "Halo, semuanya. Terima kasih sudah datang malam ini. Aku punya cerita kecil... tentang mercusuar di tepi laut, dan seekor anjing yang menunggu bintang jatuh.",
        en: "Hello, everyone. Thank you for coming tonight. I have a small story... about a lighthouse at the edge of the sea, and a dog waiting for a falling star."
      },
      next: "p8"
    },
    p8: {
      progress: 8,
      bg: "memory",
      character: "kanna",
      side: "left",
      speaker: { id: "Kanna Tamachi", en: "Kanna Tamachi" },
      text: {
        id: "Setiap malam, anjing itu membawa lentera ke tebing. Ia tidak tahu apakah bintangnya akan datang. Ia hanya tahu bahwa menunggu juga bentuk lain dari menjaga.",
        en: "Every night, the dog carried a lantern to the cliff. It did not know if its star would come. It only knew that waiting was another way of keeping watch."
      },
      next: "p9"
    },
    p9: {
      progress: 9,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Lalu stream itu bergetar. Suara Kanna terpotong oleh senyap selama satu detik. Satu detik yang cukup untuk Riku menyadari: cerita ini bisa hilang.",
        en: "Then the stream trembled. Kanna's voice was cut by a second of silence. One second was enough for Riku to realize: this story could disappear."
      },
      next: "p10"
    },
    p10: {
      progress: 10,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Riku", en: "Riku" },
      text: {
        id: "Benang rose-gold muncul di antara jemariku. Hangat. Rapuh. Sangat hidup. Untuk pertama kalinya, aku tidak ingin hanya menonton.",
        en: "A rose-gold thread appeared between my fingers. Warm. Fragile. Very much alive. For the first time, I did not want to simply watch."
      },
      next: "p11"
    },
    p11: {
      progress: 11,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Benang pertama itu berdenyut di tangannya. Riku bisa menyimpannya dalam kristal, atau melepaskannya kembali ke semesta. Apa yang harus ia lakukan?",
        en: "The first thread pulsed in her hand. Riku could keep it in a crystal, or release it back into the universe. What should she do?"
      },
      choices: [
        {
          text: {
            id: "Simpan dalam kristal memori. Biarkan ia aman, walau hanya untukku.",
            en: "Keep it in a memory crystal. Let it be safe, even if only for me."
          },
          next: "p12a"
        },
        {
          text: {
            id: "Lepaskan sebagai benang cahaya. Biarkan cerita itu menemukan rumah lain.",
            en: "Release it as a thread of light. Let the story find another home."
          },
          next: "p12b"
        }
      ]
    },
    p12a: {
      progress: 12,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Riku menyimpan benang itu dalam kristal memori. Di dalamnya, suara Kanna berulang seperti ombak di ruang tertutup. Hangat. Aman. Tapi setiap malam, kristal itu terasa semakin sepi.",
        en: "Riku kept the thread inside a memory crystal. Inside, Kanna's voice repeated like a tide in a closed room. Warm. Safe. But every night, the crystal felt lonelier."
      },
      next: "p13"
    },
    p12b: {
      progress: 12,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Riku melepaskan benang itu ke semesta. Benang rose-gold melintasi gelap, menyentuh bintang-bintang kecil, dan kembali dengan gema tawa yang bukan miliknya. Cerita itu tidak hilang. Ia tumbuh.",
        en: "Riku released the thread into the universe. The rose-gold thread crossed the dark, touched small stars, and returned with echoes of laughter that were not hers. The story did not disappear. It grew."
      },
      next: "p13"
    },
    p13: {
      progress: 13,
      bg: "memory",
      character: "riku",
      side: "right",
      speaker: { id: "Riku", en: "Riku" },
      text: {
        id: "Ah. Jadi ini yang diinginkan cerita. Bukan untuk dikurung, bukan untuk diganti. Ia hanya ingin dijahit dengan hati-hati, supaya cahayanya bisa menemukan orang lain.",
        en: "Ah. So this is what a story wants. Not to be caged, not to be replaced. It only wants to be sewn carefully, so its light can find someone else."
      },
      next: "p14"
    },
    p14: {
      progress: 14,
      bg: "cosmos",
      character: "riku",
      side: "right",
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Riku mengambil jarum emas dan benang bintang. Ia menjahit sebuah mercusuar kecil di langit: sebuah cerita gema yang tidak menimpa aslinya, hanya menambahkan satu lampu lagi di malam yang gelap.",
        en: "Riku took a golden needle and a thread of stars. She sewed a small lighthouse into the sky: an echo story that did not overwrite the original, only added one more lamp to the dark."
      },
      next: "p15"
    },
    p15: {
      progress: 15,
      bg: "cosmos",
      character: "riku",
      side: "right",
      speaker: { id: "Riku", en: "Riku" },
      text: {
        id: "Aku akan menjaga cerita oshi-ku dari awal sampai akhir. Dan untuk cerita-cerita lain yang kutemukan... aku akan menjahitnya dengan sepenuh hati. Bukan untuk memilikinya. Untuk meneruskannya.",
        en: "I will protect my oshi's story from beginning to end. And for the other stories I find... I will sew them with all my heart. Not to own them. To carry them forward."
      },
      next: "p16"
    },
    p16: {
      progress: 16,
      bg: "stage",
      character: null,
      speaker: { id: "Narator", en: "Narrator" },
      text: {
        id: "Malam itu, Loom menerima jahitan pertamanya. Sebuah bintang oshi menyala di langit, dan KatsuiRiku Ch bukan lagi hanya Sang Penonton. Ia adalah Sang Penjahit Cerita.",
        en: "That night, the Loom accepted its first stitch. An oshi star lit the sky, and KatsuiRiku Ch was no longer merely the Watcher. She was the Story Weaver."
      },
      next: null,
      end: true
    }
  }
};
