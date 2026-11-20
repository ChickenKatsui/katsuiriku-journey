/* Public world map placeholder.
   Locations are static for now; inventory is the first admin-editable data set.
   Add or reorder sectors here, or move them to Supabase later. */
(() => {
  "use strict";

  const LOCATIONS = [
    {
      id: "first-nebula",
      x: 20,
      y: 24,
      status: "available",
      icon: "✦",
      title: { id: "Nebula Awal", en: "The First Nebula" },
      desc: {
        id: "Tempat sinyal rose-gold pertama kali muncul. Di sini Riku menyadari bahwa sebuah cerita bisa menolak untuk hilang—dan bahwa menonton dari jauh tidak lagi cukup.",
        en: "Where the first rose-gold signal appeared. Here Riku realized a story could refuse to disappear—and that watching from afar was no longer enough."
      }
    },
    {
      id: "kanna-star",
      x: 72,
      y: 18,
      status: "available",
      icon: "★",
      title: { id: "Bintang Kanna", en: "Kanna's Star" },
      desc: {
        id: "Bintang oshi pertama yang menyala saat Riku menemukan Kanna Tamachi. Cahayanya hangat seperti lampu di jendela, dan tidak pernah redup bahkan di malam tersepi.",
        en: "The first oshi star, lit when Riku found Kanna Tamachi. Its light is warm like a lamp in a window, and it never dims, even on the quietest nights."
      }
    },
    {
      id: "the-loom",
      x: 50,
      y: 40,
      status: "available",
      icon: "⌘",
      title: { id: "Tenun Semesta", en: "The Loom" },
      desc: {
        id: "Jantung semesta cerita. Di sini semua benang bertemu, tetapi tidak semua boleh disentuh. Riku hanya bisa melihat, memilih, dan menjahit gema dengan hati-hati.",
        en: "The heart of the story universe. Here all threads meet, but not all may be touched. Riku can only watch, choose, and sew echoes with care."
      }
    },
    {
      id: "sewing-room",
      x: 26,
      y: 58,
      status: "available",
      icon: "✧",
      title: { id: "Ruang Jahit", en: "The Sewing Room" },
      desc: {
        id: "Ruang kecil di antara dimensi, penuh potongan memori, jarum emas, dan benang bintang. Tempat Riku memotong, menyambung, dan menjahit cerita gema pertamanya.",
        en: "A small room between dimensions, filled with memory fragments, golden needles, and star thread. Where Riku cut, joined, and sewed her first echo story."
      }
    },
    {
      id: "watchers-archive",
      x: 78,
      y: 56,
      status: "locked",
      icon: "▣",
      title: { id: "Arsip Penonton", en: "The Watcher's Archive" },
      desc: {
        id: "Rak panjang berisi rekaman semua cerita yang pernah Riku tonton. Beberapa rak terbuka; beberapa terkunci karena ceritanya masih tumbuh. Pintunya menunggu cerita yang benar-benar ingin dibuka.",
        en: "Long shelves holding recordings of every story Riku has watched. Some shelves are open; some are locked because their stories are still growing. Its door waits for a story that truly wants to be opened."
      }
    },
    {
      id: "unnamed-sector",
      x: 18,
      y: 80,
      status: "locked",
      icon: "◇",
      title: { id: "Sektor Tak Bernama", en: "Unnamed Sector" },
      desc: {
        id: "Area kosong di peta. Riku belum tahu apa yang menunggu di sana, tetapi kadang ia mendengar suara tawa dari kejauhan—dan benang yang belum punya warna.",
        en: "A blank area on the map. Riku does not know what waits there yet, but sometimes she hears laughter in the distance—and a thread that has no color yet."
      }
    },
    {
      id: "oshi-tower",
      x: 60,
      y: 82,
      status: "unknown",
      icon: "☼",
      title: { id: "Menara Oshi", en: "Oshi Tower" },
      desc: {
        id: "Menara yang katanya dibangun dari setiap momen favorit. Belum ada yang tahu cara masuknya, tetapi cahayanya kadang berkedip seperti sedang menunggu seseorang menyebut nama oshi-nya.",
        en: "A tower said to be built from every favorite moment. No one knows how to enter it yet, but its light sometimes flickers as if waiting for someone to say their oshi's name."
      }
    }
  ];

  const canvas = document.getElementById("worldmap-canvas");
  const detailTitle = document.getElementById("map-detail-title");
  const detailDesc = document.getElementById("map-detail-desc");
  const detailStatus = document.getElementById("map-detail-status");
  const detailIcon = document.getElementById("map-detail-icon");

  let lang = document.documentElement.lang === "en" ? "en" : "id";
  let selectedId = null;
  let rendered = false;

  function t(path) {
    return window.KatsuiApp?.t(path) || path;
  }

  function statusLabel(status) {
    return t(`worldmap.status.${status}`) || status;
  }

  function locationTitle(location) {
    return location.title[lang] || location.title.id;
  }

  function locationDesc(location) {
    return location.desc[lang] || location.desc.id;
  }

  function renderMap() {
    if (!canvas) return;

    canvas.querySelectorAll(".map-node").forEach((node) => node.remove());

    LOCATIONS.forEach((location) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `map-node is-${location.status}`;
      button.dataset.id = location.id;
      button.style.left = `${location.x}%`;
      button.style.top = `${location.y}%`;
      button.setAttribute("aria-label", `${locationTitle(location)} — ${statusLabel(location.status)}`);

      const icon = document.createElement("span");
      icon.className = "map-node-icon";
      icon.textContent = location.icon;

      const label = document.createElement("span");
      label.className = "map-node-label";
      label.textContent = locationTitle(location);

      const status = document.createElement("span");
      status.className = "map-node-status";
      status.textContent = statusLabel(location.status);

      button.append(icon, label, status);
      button.addEventListener("click", () => {
        selectedId = location.id;
        updateSelection();
        renderDetail();
      });

      canvas.appendChild(button);
    });

    updateSelection();
    rendered = true;
  }

  function updateSelection() {
    if (!canvas) return;
    canvas.querySelectorAll(".map-node").forEach((node) => {
      node.classList.toggle("is-selected", node.dataset.id === selectedId);
    });
  }

  function resetDetail() {
    if (detailTitle) detailTitle.textContent = t("worldmap.selectHint");
    if (detailDesc) detailDesc.textContent = t("worldmap.selectDesc");
    if (detailIcon) {
      detailIcon.textContent = "✦";
      delete detailIcon.dataset.status;
    }
    if (detailStatus) {
      detailStatus.hidden = true;
      detailStatus.textContent = "";
      detailStatus.classList.remove("is-locked");
    }
  }

  function renderDetail() {
    const location = LOCATIONS.find((item) => item.id === selectedId);
    if (!location) {
      resetDetail();
      return;
    }

    if (detailTitle) detailTitle.textContent = locationTitle(location);
    if (detailDesc) detailDesc.textContent = locationDesc(location);
    if (detailIcon) {
      detailIcon.textContent = location.icon;
      detailIcon.dataset.status = location.status;
    }
    if (detailStatus) {
      detailStatus.hidden = false;
      detailStatus.textContent = statusLabel(location.status);
      detailStatus.classList.toggle("is-locked", location.status === "locked");
    }
  }

  function setLanguage(nextLang) {
    lang = nextLang === "en" ? "en" : "id";
    if (rendered) renderMap();
    renderDetail();
  }

  function open() {
    if (!rendered) {
      renderMap();
      const firstAvailable = LOCATIONS.find((location) => location.status === "available");
      if (firstAvailable) selectedId = firstAvailable.id;
    }
    updateSelection();
    renderDetail();
  }

  window.KatsuiWorldMap = {
    open,
    setLanguage
  };
})();
