/* Public inventory viewer.
   Reads from Supabase public.vn_inventory. Falls back to INVENTORY_DEFAULTS
   when the table is missing or the network is unavailable.
   Public visitors can only view; writes happen from /admin/. */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const cfg = window.KATSUI_SUPABASE || {};
  const hasConfig = Boolean(
    String(cfg.url || "").trim() &&
    String(cfg.anonKey || "").trim() &&
    !/YOUR[-_]/i.test(String(cfg.url || "")) &&
    !/YOUR[-_]/i.test(String(cfg.anonKey || ""))
  );
  const hasLib = Boolean(window.supabase && typeof window.supabase.createClient === "function");

  const grid = $("#inventory-grid");
  const filters = $("#inventory-filters");
  const empty = $("#inventory-empty");
  const source = $("#inventory-source");

  let client = null;
  let lang = document.documentElement.lang === "en" ? "en" : "id";
  let items = [];
  let activeCategory = "all";
  let loaded = false;
  let loading = false;
  let usingFallback = true;

  function t(path) {
    return window.KatsuiApp?.t(path) || path;
  }

  function initClient() {
    if (!hasConfig || !hasLib) return null;
    if (!client) {
      client = window.supabase.createClient(cfg.url, cfg.anonKey);
    }
    return client;
  }

  function textValue(value, fallback = "") {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      return String(value.id || value.en || fallback || "");
    }
    return fallback;
  }

  function normalizeItem(row) {
    const nameId = textValue(row.name_id ?? row.name ?? row.title);
    const nameEn = textValue(row.name_en, nameId) || nameId;
    const descId = textValue(row.description_id ?? row.description ?? row.desc);
    const descEn = textValue(row.description_en, descId) || descId;

    return {
      id: String(row.id || `local-${nameId || Math.random().toString(36).slice(2)}`),
      name: {
        id: nameId || "Untitled",
        en: nameEn || nameId || "Untitled"
      },
      description: {
        id: descId,
        en: descEn
      },
      category: String(row.category || "other"),
      rarity: String(row.rarity || "common"),
      icon: String(row.icon || "✦"),
      image_url: String(row.image_url || ""),
      sort_order: Number(row.sort_order) || 0,
      visible: row.visible !== false
    };
  }

  function getDefaults() {
    const defaults = Array.isArray(window.INVENTORY_DEFAULTS) ? window.INVENTORY_DEFAULTS : [];
    return defaults
      .map(normalizeItem)
      .filter((item) => item.visible)
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  function getLabelName(item) {
    return item.name[lang] || item.name.id || item.name.en;
  }

  function getLabelDescription(item) {
    return item.description[lang] || item.description.id || item.description.en;
  }

  function categoryLabel(key) {
    return t(`inventory.category.${key}`) || key;
  }

  function rarityLabel(key) {
    return t(`inventory.rarity.${key}`) || key;
  }

  function updateSource() {
    if (!source) return;
    source.textContent = usingFallback ? t("inventory.sourceFallback") : t("inventory.sourceLive");
  }

  function renderLoading() {
    if (!grid) return;
    if (empty) empty.hidden = true;
    grid.innerHTML = "";
    for (let i = 0; i < 6; i += 1) {
      const card = document.createElement("div");
      card.className = "inventory-card is-skeleton";
      card.setAttribute("aria-hidden", "true");
      card.innerHTML = '<span class="skeleton-icon"></span><span class="skeleton-copy"><span class="skeleton-line"></span><span class="skeleton-line short"></span></span>';
      grid.appendChild(card);
    }
  }

  function renderFilters() {
    if (!filters) return;

    const categories = ["all", ...new Set(items.map((item) => item.category).filter(Boolean))];
    filters.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-btn${category === activeCategory ? " is-active" : ""}`;
      button.textContent = category === "all" ? t("inventory.filterAll") : categoryLabel(category);
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = category;
        renderFilters();
        render();
      });
      filters.appendChild(button);
    });
  }

  function makeIcon(item, className) {
    const holder = document.createElement("span");
    holder.className = className;

    if (item.image_url) {
      const image = document.createElement("img");
      image.src = item.image_url;
      image.alt = "";
      image.loading = "lazy";
      holder.appendChild(image);
    } else {
      holder.textContent = item.icon || "✦";
    }

    return holder;
  }

  function openItem(item) {
    const name = getLabelName(item);
    const description = getLabelDescription(item);

    const kicker = $("#item-modal-kicker");
    const nameNode = $("#item-modal-name");
    const visual = $("#item-modal-visual");
    const meta = $("#item-modal-meta");
    const desc = $("#item-modal-desc");

    if (kicker) kicker.textContent = t("inventory.itemKicker");
    if (nameNode) nameNode.textContent = name;

    if (visual) {
      visual.innerHTML = "";
      visual.appendChild(makeIcon(item, item.image_url ? "item-visual-image-wrap" : "item-visual-icon"));
      if (item.image_url) {
        const image = visual.querySelector("img");
        if (image) image.className = "item-visual-image";
      }
    }

    if (meta) {
      meta.innerHTML = "";
      const rarity = document.createElement("span");
      rarity.className = `rarity rarity-${item.rarity}`;
      rarity.textContent = rarityLabel(item.rarity);
      const category = document.createElement("span");
      category.className = "inventory-category";
      category.textContent = categoryLabel(item.category);
      meta.append(rarity, category);
    }

    if (desc) desc.textContent = description;

    window.KatsuiApp?.openModal("modal-item");
  }

  function render() {
    if (!grid) return;

    const visibleItems = activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

    grid.innerHTML = "";
    if (empty) empty.hidden = visibleItems.length > 0;

    visibleItems.forEach((item, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "inventory-card";
      card.dataset.rarity = item.rarity;
      card.style.animationDelay = `${Math.min(index * 35, 260)}ms`;
      card.setAttribute("aria-label", getLabelName(item));

      card.appendChild(makeIcon(item, "inventory-icon"));

      const copy = document.createElement("span");
      copy.className = "inventory-card-copy";

      const name = document.createElement("strong");
      name.className = "inventory-card-name";
      name.textContent = getLabelName(item);

      const description = document.createElement("span");
      description.className = "inventory-card-desc";
      description.textContent = getLabelDescription(item);

      const meta = document.createElement("span");
      meta.className = "inventory-card-meta";

      const rarity = document.createElement("span");
      rarity.className = `rarity rarity-${item.rarity}`;
      rarity.textContent = rarityLabel(item.rarity);

      const category = document.createElement("span");
      category.className = "inventory-category";
      category.textContent = categoryLabel(item.category);

      meta.append(rarity, category);
      copy.append(name, description, meta);
      card.appendChild(copy);

      card.addEventListener("click", () => openItem(item));
      grid.appendChild(card);
    });
  }

  async function fetchItems() {
    const supabaseClient = initClient();
    if (!supabaseClient) {
      usingFallback = true;
      return getDefaults();
    }

    try {
      const { data, error } = await supabaseClient
        .from("vn_inventory")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;

      usingFallback = false;
      return (data || []).map(normalizeItem);
    } catch (error) {
      console.warn("Inventory: using local placeholder data.", error);
      usingFallback = true;
      return getDefaults();
    }
  }

  async function load(force = false) {
    if (loading) return;
    if (loaded && !force) {
      renderFilters();
      render();
      updateSource();
      return;
    }

    loading = true;
    renderLoading();

    try {
      items = await fetchItems();
      loaded = true;
      if (activeCategory !== "all" && !items.some((item) => item.category === activeCategory)) {
        activeCategory = "all";
      }
      renderFilters();
      render();
      updateSource();
    } finally {
      loading = false;
    }
  }

  function setLanguage(nextLang) {
    lang = nextLang === "en" ? "en" : "id";
    if (loaded) {
      renderFilters();
      render();
      updateSource();
    }
  }

  function open() {
    load(true);
  }

  window.KatsuiInventory = {
    open,
    setLanguage,
    refresh: () => load(true),
    getItems: () => items.slice()
  };
})();
