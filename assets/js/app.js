(() => {
  "use strict";

  const LS = {
    lang: "katsuiriku-journey.lang",
    settings: "katsuiriku-journey.settings"
  };

  const DEFAULT_SETTINGS = {
    textSpeed: 55,
    reduceMotion: false
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* localStorage can be unavailable in private mode. */
    }
  }

  function loadSettings() {
    const raw = storageGet(LS.settings);
    if (!raw) return { ...DEFAULT_SETTINGS };
    try {
      const parsed = JSON.parse(raw);
      return {
        textSpeed: Number.isFinite(parsed.textSpeed)
          ? Math.min(100, Math.max(0, parsed.textSpeed))
          : DEFAULT_SETTINGS.textSpeed,
        reduceMotion: Boolean(parsed.reduceMotion)
      };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  const storedLang = storageGet(LS.lang);
  let lang = storedLang === "en" ? "en" : "id";
  let settings = loadSettings();

  let currentSceneId = null;
  let currentText = "";
  let isTyping = false;
  let typeTimer = null;
  let typeComplete = null;
  let bgTimer = null;
  let charTimer = null;
  let toastTimer = null;
  let modalOpen = null;
  let lastFocus = null;

  const menuScreen = $("#menu-screen");
  const vnScreen = $("#vn-screen");
  const inventoryScreen = $("#inventory-screen");
  const worldmapScreen = $("#worldmap-screen");
  const loreScreen = $("#lore-screen");
  const gamePanels = [inventoryScreen, worldmapScreen, loreScreen].filter(Boolean);
  const vnBg = $("#vn-bg");
  const vnCharacter = $("#vn-character");
  const vnCharacterImg = $("#vn-character-img");
  const vnDialogue = $("#vn-dialogue");
  const vnSpeaker = $("#vn-speaker");
  const vnText = $("#vn-text");
  const vnNext = $("#vn-next");
  const vnChoices = $("#vn-choices");
  const vnEnd = $("#vn-end");
  const vnSceneLabel = $("#vn-scene-label");
  const vnProgress = $("#vn-progress");
  const textSpeedInput = $("#text-speed");
  const reduceMotionInput = $("#reduce-motion");
  const rikuParallax = $("#riku-parallax");
  const toast = $("#toast");

  function t(path) {
    const value = path.split(".").reduce((node, key) => (node ? node[key] : undefined), I18N[lang]);
    return typeof value === "string" ? value : path;
  }

  function applyLanguage(nextLang) {
    lang = nextLang === "en" ? "en" : "id";
    storageSet(LS.lang, lang);
    document.documentElement.lang = lang;
    document.title = t("meta.title");

    $$("[data-i18n]").forEach((element) => {
      const value = t(element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });

    $$(".lang-switch button[data-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });

    const menuRiku = $(".riku-img");
    if (menuRiku) menuRiku.alt = t("about.rikuAlt");

    if (modalOpen && modalOpen.id === "modal-item") closeModal();

    window.KatsuiInventory?.setLanguage(lang);
    window.KatsuiWorldMap?.setLanguage(lang);
    window.KatsuiLore?.setLanguage(lang);

    if (!vnScreen.hidden && currentSceneId && vnEnd.hidden) {
      renderScene(currentSceneId, { languageChange: true });
    }
  }

  function applySettings() {
    textSpeedInput.value = String(settings.textSpeed);
    reduceMotionInput.checked = settings.reduceMotion;
    document.body.classList.toggle("reduce-motion", settings.reduceMotion);
    if (settings.reduceMotion && rikuParallax) {
      rikuParallax.style.setProperty("--px", "0px");
      rikuParallax.style.setProperty("--py", "0px");
      rikuParallax.style.setProperty("--tilt-x", "0deg");
      rikuParallax.style.setProperty("--tilt-y", "0deg");
      menuScreen?.style.setProperty("--mx", "50%");
      menuScreen?.style.setProperty("--my", "50%");
    }
    storageSet(LS.settings, JSON.stringify(settings));
  }

  function getTypeDelay() {
    return 34 - (settings.textSpeed / 100) * 30;
  }

  function hidePanels() {
    gamePanels.forEach((panel) => {
      panel.hidden = true;
    });
    document.body.classList.remove("panel-open");
  }

  function showVN() {
    closeModal();
    hidePanels();
    menuScreen.hidden = true;
    vnScreen.hidden = false;
    document.body.classList.add("vn-open");
  }

  function showMenu() {
    clearTimeout(typeTimer);
    typeTimer = null;
    typeComplete = null;
    isTyping = false;
    currentSceneId = null;
    closeModal();
    vnScreen.hidden = true;
    vnEnd.hidden = true;
    vnChoices.hidden = true;
    vnDialogue.hidden = false;
    vnNext.hidden = true;
    vnText.textContent = "";
    vnProgress.style.width = "0%";
    hidePanels();
    menuScreen.hidden = false;
    document.body.classList.remove("vn-open");
    window.setTimeout(() => {
      const startButton = $("#menu-start");
      if (startButton) startButton.focus();
    }, 30);
  }

  function showPanel(panel) {
    if (!panel) return;
    closeModal();
    menuScreen.hidden = true;
    vnScreen.hidden = true;
    hidePanels();
    panel.hidden = false;
    document.body.classList.remove("vn-open");
    document.body.classList.add("panel-open");

    if (panel === inventoryScreen) {
      window.KatsuiInventory?.open();
    } else if (panel === worldmapScreen) {
      window.KatsuiWorldMap?.open();
    } else if (panel === loreScreen) {
      window.KatsuiLore?.open();
    }

    window.setTimeout(() => {
      const backButton = panel.querySelector(".ghost-btn");
      if (backButton) backButton.focus();
    }, 30);
  }

  function startPrologue() {
    showVN();
    renderScene(STORY.start, { transition: true });
  }

  function setBackground(bg, transition) {
    if (!bg) return;

    const nextClass = `vn-bg bg-${bg}`;
    if (vnBg.dataset.bg === bg) {
      vnBg.className = nextClass;
      vnBg.classList.remove("is-fading");
      return;
    }

    if (transition) {
      vnBg.classList.add("is-fading");
      clearTimeout(bgTimer);
      bgTimer = setTimeout(() => {
        vnBg.className = nextClass;
        vnBg.dataset.bg = bg;
        requestAnimationFrame(() => vnBg.classList.remove("is-fading"));
      }, 180);
      return;
    }

    vnBg.className = nextClass;
    vnBg.dataset.bg = bg;
    vnBg.classList.remove("is-fading");
  }

  function setCharacter(character, side, transition) {
    if (!character) {
      vnCharacter.hidden = true;
      return;
    }

    const isKanna = character === "kanna";
    const src = isKanna ? "assets/img/kanna.png?v=20261117c" : "assets/img/riku.png?v=20261117c";
    const alt = isKanna ? t("about.kannaAlt") : t("about.rikuAlt");

    vnCharacter.hidden = false;
    vnCharacter.dataset.pose = isKanna ? "full" : "bust";
    vnCharacter.classList.toggle("is-left", side === "left");

    if (transition) {
      vnCharacter.classList.add("is-fading");
      clearTimeout(charTimer);
      charTimer = setTimeout(() => {
        vnCharacterImg.src = src;
        vnCharacterImg.alt = alt;
        vnCharacter.classList.remove("is-fading");
      }, 180);
      return;
    }

    vnCharacterImg.src = src;
    vnCharacterImg.alt = alt;
    vnCharacter.classList.remove("is-fading");
  }

  function renderScene(sceneId, options = {}) {
    const scene = STORY.scenes[sceneId];
    if (!scene) return;

    currentSceneId = sceneId;

    vnSceneLabel.textContent = `${String(scene.progress).padStart(2, "0")} / ${String(STORY.totalScenes).padStart(2, "0")}`;
    vnProgress.style.width = `${(scene.progress / STORY.totalScenes) * 100}%`;

    setBackground(scene.bg, Boolean(options.transition));
    setCharacter(scene.character, scene.side, Boolean(options.transition));

    vnEnd.hidden = true;
    vnChoices.hidden = true;
    vnScreen.classList.remove("has-choices");
    vnDialogue.hidden = false;
    vnNext.hidden = true;

    const speaker = scene.speaker ? scene.speaker[lang] : t("vn.narrator");
    vnSpeaker.textContent = speaker;
    vnSpeaker.hidden = false;

    currentText = scene.text[lang];
    startTypewriter(currentText, () => {
      const activeScene = STORY.scenes[currentSceneId];
      if (!activeScene) return;
      if (activeScene.choices) {
        showChoices(activeScene.choices);
      } else {
        vnNext.hidden = false;
      }
    });
  }

  function startTypewriter(text, onComplete) {
    clearTimeout(typeTimer);
    typeTimer = null;
    typeComplete = onComplete;
    isTyping = true;
    vnText.textContent = "";
    vnNext.hidden = true;

    const chars = Array.from(text);
    let index = 0;
    const baseDelay = getTypeDelay();

    if (baseDelay <= 4.2) {
      vnText.textContent = text;
      finishTyping();
      return;
    }

    function tick() {
      if (!isTyping) return;

      vnText.textContent += chars[index];
      index += 1;

      if (index >= chars.length) {
        finishTyping();
        return;
      }

      const character = chars[index - 1];
      let delay = baseDelay;
      if (/[.!?…]/.test(character)) delay += baseDelay * 7;
      else if (/[,;:]/.test(character)) delay += baseDelay * 3;

      typeTimer = setTimeout(tick, delay);
    }

    tick();
  }

  function finishTyping() {
    if (!isTyping) return;
    isTyping = false;
    clearTimeout(typeTimer);
    typeTimer = null;
    vnText.textContent = currentText;

    const callback = typeComplete;
    typeComplete = null;
    if (callback) callback();
  }

  function showChoices(choices) {
    vnChoices.innerHTML = "";

    choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn";

      const number = document.createElement("span");
      number.className = "choice-index";
      number.textContent = String(index + 1).padStart(2, "0");

      const label = document.createElement("span");
      label.textContent = choice.text[lang];

      button.append(number, label);
      button.addEventListener("click", () => {
        vnChoices.hidden = true;
        renderScene(choice.next, { transition: true });
      });

      vnChoices.appendChild(button);
    });

    vnChoices.hidden = false;
    vnScreen.classList.add("has-choices");
    vnNext.hidden = true;
  }

  function advance() {
    if (!vnEnd.hidden) return;
    if (isTyping) {
      finishTyping();
      return;
    }

    const scene = STORY.scenes[currentSceneId];
    if (!scene) return;
    if (scene.choices) return;

    if (scene.next) {
      renderScene(scene.next, { transition: true });
    } else {
      showEnd();
    }
  }

  function showEnd() {
    vnDialogue.hidden = true;
    vnChoices.hidden = true;
    vnNext.hidden = true;
    vnEnd.hidden = false;
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    closeModal();
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalOpen = modal;

    const focusTarget = modal.querySelector("button, input, [href]");
    if (focusTarget) {
      window.setTimeout(() => focusTarget.focus(), 40);
    }
  }

  function closeModal() {
    if (!modalOpen) return;
    modalOpen.hidden = true;
    modalOpen = null;
    document.body.classList.remove("modal-open");

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }

  function handleKeydown(event) {
    if (modalOpen) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
      return;
    }

    if (gamePanels.some((panel) => !panel.hidden)) {
      if (event.key === "Escape") {
        event.preventDefault();
        showMenu();
      }
      return;
    }

    if (vnScreen.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      showMenu();
      return;
    }

    if (!vnChoices.hidden && /^[1-9]$/.test(event.key)) {
      const button = vnChoices.children[Number(event.key) - 1];
      if (button) {
        event.preventDefault();
        button.click();
        return;
      }
    }

    if (event.key !== " " && event.key !== "Enter") return;
    const target = event.target;
    if (target instanceof Element && target.closest("button, input, select, textarea")) return;

    event.preventDefault();
    advance();
  }

  function setupParallax() {
    if (!menuScreen || !rikuParallax) return;

    menuScreen.addEventListener("pointermove", (event) => {
      if (settings.reduceMotion || event.pointerType === "touch") return;

      const rect = menuScreen.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      rikuParallax.style.setProperty("--px", `${(x * 16).toFixed(1)}px`);
      rikuParallax.style.setProperty("--py", `${(y * 10).toFixed(1)}px`);
      rikuParallax.style.setProperty("--tilt-x", `${(y * -3.5).toFixed(2)}deg`);
      rikuParallax.style.setProperty("--tilt-y", `${(x * 4.5).toFixed(2)}deg`);
      menuScreen.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      menuScreen.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    menuScreen.addEventListener("pointerleave", () => {
      rikuParallax.style.setProperty("--px", "0px");
      rikuParallax.style.setProperty("--py", "0px");
      rikuParallax.style.setProperty("--tilt-x", "0deg");
      rikuParallax.style.setProperty("--tilt-y", "0deg");
      menuScreen.style.setProperty("--mx", "50%");
      menuScreen.style.setProperty("--my", "50%");
    });
  }

  function bindEvents() {
    $("#menu-start").addEventListener("click", startPrologue);
    $("#menu-inventory").addEventListener("click", () => showPanel(inventoryScreen));
    $("#menu-worldmap").addEventListener("click", () => showPanel(worldmapScreen));
    $("#menu-lore").addEventListener("click", () => showPanel(loreScreen));
    $("#menu-about").addEventListener("click", () => openModal("modal-about"));
    $("#menu-settings").addEventListener("click", () => openModal("modal-settings"));
    $("#vn-back").addEventListener("click", showMenu);
    $("#vn-settings").addEventListener("click", () => openModal("modal-settings"));
    $("#end-menu").addEventListener("click", showMenu);
    $("#end-replay").addEventListener("click", startPrologue);
    $("#inventory-back").addEventListener("click", showMenu);
    $("#worldmap-back").addEventListener("click", showMenu);
    $("#lore-back").addEventListener("click", showMenu);

    vnDialogue.addEventListener("click", advance);

    $$(".lang-switch").forEach((group) => {
      group.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-lang]");
        if (!button) return;
        applyLanguage(button.dataset.lang);
      });
    });

    textSpeedInput.addEventListener("input", () => {
      settings.textSpeed = Number(textSpeedInput.value);
      applySettings();
    });

    reduceMotionInput.addEventListener("change", () => {
      settings.reduceMotion = reduceMotionInput.checked;
      applySettings();
    });

    $$("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", handleKeydown);
  }

  window.KatsuiApp = {
    t,
    getLang: () => lang,
    openModal,
    closeModal,
    showToast,
    showMenu
  };

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  if (urlLang === "en" || urlLang === "id") lang = urlLang;
  if (params.get("instant") === "1") settings.textSpeed = 100;

  applyLanguage(lang);
  applySettings();
  bindEvents();
  setupParallax();

  /* Development preview shortcut: ?play=1&scene=p7&instant=1&lang=en */
  if (params.get("play") === "1") {
    const requestedScene = params.get("scene");
    const previewScene = requestedScene && STORY.scenes[requestedScene] ? requestedScene : STORY.start;
    window.setTimeout(() => {
      showVN();
      renderScene(previewScene, { transition: false });
    }, 150);
  }
})();
