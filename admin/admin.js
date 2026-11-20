/* Inventory admin — Supabase Auth + RLS.
   Public visitors only read from the game. This page is the only writer. */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const cfg = window.KATSUI_SUPABASE || {};
  const hasConfig = Boolean(
    String(cfg.url || "").trim() &&
    String(cfg.anonKey || "").trim() &&
    !/YOUR[-_]/i.test(String(cfg.url || "")) &&
    !/YOUR[-_]/i.test(String(cfg.anonKey || ""))
  );
  const hasLib = Boolean(window.supabase && typeof window.supabase.createClient === "function");

  const CATEGORY_LABELS = {
    artifact: "Artefak",
    tool: "Alat",
    keepsake: "Kenang-kenangan",
    map: "Peta",
    supply: "Perlengkapan",
    other: "Lainnya"
  };

  const RARITY_LABELS = {
    common: "Umum",
    uncommon: "Tak Umum",
    rare: "Langka",
    epic: "Epik",
    legendary: "Legendaris"
  };

  let client = null;
  let currentUser = null;
  let items = [];
  let editingId = null;
  let routing = false;
  let saving = false;

  function setStatus(id, message, type = "") {
    const element = $(id);
    if (!element) return;
    element.textContent = message;
    element.className = `status ${type}`.trim();
  }

  function show(id) {
    ["setup-screen", "login-screen", "dashboard-screen"].forEach((key) => {
      const element = $(key);
      if (element) element.hidden = key !== id;
    });
  }

  function setBusy(button, busy, label) {
    if (!button) return;
    if (busy) {
      button.dataset.idleLabel = button.textContent;
      button.textContent = label;
      button.disabled = true;
      return;
    }
    button.textContent = button.dataset.idleLabel || label;
    button.disabled = false;
  }

  function formatCategory(key) {
    return CATEGORY_LABELS[key] || key || "Lainnya";
  }

  function formatRarity(key) {
    return RARITY_LABELS[key] || key || "Umum";
  }

  function nextSortOrder() {
    const max = items.reduce((highest, item) => Math.max(highest, Number(item.sort_order) || 0), 0);
    return max + 10;
  }

  function resetForm() {
    editingId = null;
    const form = $("item-form");
    if (form) form.reset();
    if ($("item-id")) $("item-id").value = "";
    if ($("icon")) $("icon").value = "✦";
    if ($("sort-order")) $("sort-order").value = String(nextSortOrder());
    if ($("visible")) $("visible").checked = true;
    if ($("editor-title")) $("editor-title").textContent = "Item baru";
    if ($("cancel-edit")) $("cancel-edit").hidden = true;
    setStatus("form-status", "", "");
  }

  function fillForm(item) {
    editingId = item.id;
    if ($("item-id")) $("item-id").value = item.id;
    if ($("name-id")) $("name-id").value = item.name_id || item.name || "";
    if ($("name-en")) $("name-en").value = item.name_en || "";
    if ($("description-id")) $("description-id").value = item.description_id || item.description || "";
    if ($("description-en")) $("description-en").value = item.description_en || "";
    if ($("category")) $("category").value = item.category || "other";
    if ($("rarity")) $("rarity").value = item.rarity || "common";
    if ($("icon")) $("icon").value = item.icon || "✦";
    if ($("image-url")) $("image-url").value = item.image_url || "";
    if ($("sort-order")) $("sort-order").value = String(item.sort_order ?? 100);
    if ($("visible")) $("visible").checked = item.visible !== false;
    if ($("editor-title")) $("editor-title").textContent = "Edit item";
    if ($("cancel-edit")) $("cancel-edit").hidden = false;
    setStatus("form-status", "", "");

    const editor = document.querySelector(".editor-card");
    if (editor) editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function makeIcon(item) {
    const holder = document.createElement("span");
    holder.className = "admin-item-icon";

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

  function renderList() {
    const list = $("admin-list");
    if (!list) return;

    list.innerHTML = "";
    if ($("item-count")) $("item-count").textContent = `${items.length} item`;

    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "list-empty";
      empty.textContent = "Belum ada item. Tambahkan item pertama dari form di samping.";
      list.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "admin-item";

      const copy = document.createElement("div");
      copy.className = "admin-item-copy";

      const name = document.createElement("strong");
      name.className = "admin-item-name";
      name.textContent = item.name_id || item.name_en || "(tanpa nama)";

      const meta = document.createElement("div");
      meta.className = "admin-item-meta";

      const category = document.createElement("span");
      category.textContent = formatCategory(item.category);
      const rarity = document.createElement("span");
      rarity.textContent = formatRarity(item.rarity);
      const sort = document.createElement("span");
      sort.textContent = `#${Number(item.sort_order) || 0}`;
      const visibility = document.createElement("span");
      visibility.textContent = item.visible === false ? "Disembunyikan" : "Tampil";
      if (item.visible === false) visibility.className = "is-hidden";

      meta.append(category, rarity, sort, visibility);
      copy.append(name, meta);

      const actions = document.createElement("div");
      actions.className = "admin-item-actions";

      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "mini-btn";
      edit.textContent = "Edit";
      edit.addEventListener("click", () => fillForm(item));

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "mini-btn danger";
      remove.textContent = "Hapus";
      remove.addEventListener("click", () => deleteItem(item));

      actions.append(edit, remove);
      row.append(makeIcon(item), copy, actions);
      list.appendChild(row);
    });
  }

  function isMissingTable(error) {
    const code = String(error?.code || "");
    const message = String(error?.message || "").toLowerCase();
    return (
      code === "42P01" ||
      code === "PGRST205" ||
      message.includes("could not find the table") ||
      message.includes("relation") && message.includes("does not exist")
    );
  }

  function showTableHint(showHint) {
    const hint = $("setup-hint");
    if (hint) hint.hidden = !showHint;
  }

  async function loadItems() {
    if (!client) return;

    setStatus("list-status", "Memuat item...", "");

    try {
      const { data, error } = await client
        .from("vn_inventory")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;

      items = Array.isArray(data) ? data : [];
      showTableHint(false);
      renderList();
      setStatus("list-status", "", "");
    } catch (error) {
      console.error("Inventory admin:", error);
      items = [];
      renderList();

      if (isMissingTable(error)) {
        showTableHint(true);
        setStatus("list-status", "Tabel vn_inventory belum siap. Jalankan SQL migration lalu Refresh.", "err");
      } else {
        showTableHint(false);
        setStatus("list-status", `Gagal memuat: ${error.message || "unknown error"}`, "err");
      }
    }
  }

  async function saveItem(event) {
    event.preventDefault();
    if (!client || saving) return;

    const payload = {
      name_id: String($("name-id")?.value || "").trim(),
      name_en: String($("name-en")?.value || "").trim(),
      description_id: String($("description-id")?.value || "").trim(),
      description_en: String($("description-en")?.value || "").trim(),
      category: String($("category")?.value || "other"),
      rarity: String($("rarity")?.value || "common"),
      icon: String($("icon")?.value || "✦").trim() || "✦",
      image_url: String($("image-url")?.value || "").trim(),
      sort_order: Number($("sort-order")?.value || 0),
      visible: Boolean($("visible")?.checked),
      updated_at: new Date().toISOString()
    };

    if (!payload.name_id) {
      setStatus("form-status", "Nama (ID) wajib diisi.", "err");
      return;
    }

    if (!payload.description_id) {
      setStatus("form-status", "Deskripsi (ID) wajib diisi.", "err");
      return;
    }

    saving = true;
    const saveButton = $("save-btn");
    setBusy(saveButton, true, "Menyimpan...");
    setStatus("form-status", "", "");

    try {
      if (editingId) {
        const { error } = await client.from("vn_inventory").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await client.from("vn_inventory").insert(payload);
        if (error) throw error;
      }

      resetForm();
      setStatus("form-status", "Item berhasil disimpan.", "ok");
      await loadItems();
    } catch (error) {
      console.error("Inventory save:", error);
      if (isMissingTable(error)) {
        showTableHint(true);
        setStatus("form-status", "Tabel vn_inventory belum ada. Jalankan SQL migration dulu.", "err");
      } else {
        setStatus("form-status", `Gagal menyimpan: ${error.message || "unknown error"}`, "err");
      }
    } finally {
      saving = false;
      setBusy(saveButton, false, "Simpan item");
    }
  }

  async function deleteItem(item) {
    if (!client) return;

    const label = item.name_id || item.name_en || "item ini";
    if (!window.confirm(`Hapus "${label}" dari inventory?`)) return;

    setStatus("list-status", "Menghapus item...", "");

    try {
      const { error } = await client.from("vn_inventory").delete().eq("id", item.id);
      if (error) throw error;

      if (editingId === item.id) resetForm();
      await loadItems();
      setStatus("list-status", "Item berhasil dihapus.", "ok");
    } catch (error) {
      console.error("Inventory delete:", error);
      setStatus("list-status", `Gagal menghapus: ${error.message || "unknown error"}`, "err");
    }
  }

  async function handleSession(session) {
    if (!session || routing) return;
    if (currentUser && currentUser.id === session.user.id && !$("dashboard-screen").hidden) return;

    routing = true;

    try {
      currentUser = session.user;
      show("login-screen");
      setStatus("login-status", "Memeriksa akses admin...", "");

      const { data: isAdmin, error } = await client.rpc("is_admin");
      if (error) {
        setStatus("login-status", `Gagal memeriksa akses admin: ${error.message || "unknown error"}`, "err");
        await client.auth.signOut();
        show("login-screen");
        return;
      }

      if (!isAdmin) {
        setStatus("login-status", "Akun ini bukan admin. Tambahkan UUID-nya ke tabel admin_users.", "err");
        await client.auth.signOut();
        show("login-screen");
        return;
      }

      if ($("admin-email")) $("admin-email").textContent = currentUser.email || "";
      if ($("logout-btn")) $("logout-btn").hidden = false;
      show("dashboard-screen");
      resetForm();
      await loadItems();
    } catch (error) {
      console.error("Admin session:", error);
      setStatus("login-status", `Gagal memuat dashboard: ${error.message || "unknown error"}`, "err");
      show("login-screen");
    } finally {
      routing = false;
    }
  }

  function bindUI() {
    const loginForm = $("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!client) return;

        const email = String($("login-email")?.value || "").trim();
        const password = String($("login-password")?.value || "");
        if (!email || !password) {
          setStatus("login-status", "Isi email dan password.", "err");
          return;
        }

        const button = $("login-btn");
        setBusy(button, true, "Memeriksa...");
        setStatus("login-status", "Menghubungi Supabase...", "");

        try {
          const { error } = await client.auth.signInWithPassword({ email, password });
          if (error) throw error;
          setStatus("login-status", "Berhasil. Memuat dashboard...", "ok");
        } catch (error) {
          setStatus("login-status", `Gagal masuk: ${error.message || "cek email/password."}`, "err");
        } finally {
          setBusy(button, false, "Masuk");
        }
      });
    }

    const logoutButton = $("logout-btn");
    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        if (!client) return;
        logoutButton.disabled = true;
        try {
          await client.auth.signOut();
        } catch (error) {
          console.warn("Logout:", error);
        } finally {
          currentUser = null;
          items = [];
          show("login-screen");
          logoutButton.hidden = true;
          logoutButton.disabled = false;
          if ($("admin-email")) $("admin-email").textContent = "";
          setStatus("login-status", "Kamu sudah logout.", "");
          renderList();
        }
      });
    }

    const refreshButton = $("refresh-btn");
    if (refreshButton) refreshButton.addEventListener("click", loadItems);

    const newButton = $("new-btn");
    if (newButton) {
      newButton.addEventListener("click", () => {
        resetForm();
        const editor = document.querySelector(".editor-card");
        if (editor) editor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    const resetButton = $("reset-btn");
    if (resetButton) resetButton.addEventListener("click", resetForm);

    const cancelButton = $("cancel-edit");
    if (cancelButton) cancelButton.addEventListener("click", resetForm);

    const itemForm = $("item-form");
    if (itemForm) itemForm.addEventListener("submit", saveItem);
  }

  async function init() {
    if (!hasConfig || !hasLib) {
      show("setup-screen");
      setStatus("setup-status", "Config Supabase atau library tidak tersedia. Periksa supabase-config.js dan koneksi internet.", "err");
      return;
    }

    try {
      client = window.supabase.createClient(cfg.url, cfg.anonKey);
    } catch (error) {
      show("setup-screen");
      setStatus("setup-status", `Gagal membuat Supabase client: ${error.message || "unknown error"}`, "err");
      return;
    }

    bindUI();
    show("login-screen");
    setStatus("login-status", "", "");

    try {
      const { data, error } = await client.auth.getSession();
      if (error) {
        setStatus("login-status", `Gagal membaca sesi: ${error.message || "coba refresh."}`, "err");
        show("login-screen");
        return;
      }

      if (data && data.session) {
        await handleSession(data.session);
      } else {
        show("login-screen");
      }
    } catch (error) {
      setStatus("login-status", `Gagal membaca sesi: ${error.message || "coba refresh."}`, "err");
      show("login-screen");
    }

    client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        currentUser = null;
        if ($("logout-btn")) $("logout-btn").hidden = true;
        show("login-screen");
        return;
      }
      if (session) handleSession(session);
    });
  }

  init();
})();
