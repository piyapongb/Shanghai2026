/**
 * App: state, wiring, and rendering orchestration.
 */
(function () {
  "use strict";

  const U = window.Utils;
  const C = window.Components;

  const state = {
    activeTab: "itinerary",
    activeDay: null,
    theme: "system"
  };

  let restaurantIndex = {};
  let characterIndex = {};
  let infoDialogIndex = {};
  let glossaryIndex = {};

  /* ---------- Bootstrap ---------- */

  function init() {
    const trip = window.TRIP_DATA;
    const days = window.ITINERARY_DATA || [];
    const restaurants = window.RESTAURANTS_DATA || [];
    const hotels = window.HOTELS_DATA || [];

    restaurantIndex = buildRestaurantIndex(restaurants);
    characterIndex = window.CHARACTERS_DATA || {};
    infoDialogIndex = buildInfoDialogIndex(days);
    glossaryIndex = buildGlossaryIndex(days);
    C.setGlossaryIndex(glossaryIndex);
    validateReferences(days, restaurantIndex, characterIndex);

    step("hero", function () {
      document.getElementById("hero-root").appendChild(C.renderHero(trip));
    });
    step("trip chrome", function () { applyTripChrome(trip); });
    step("tabs", renderTabs);
    step("itinerary", function () { renderItineraryPanel(days, restaurantIndex); });
    step("restaurants", function () { renderRestaurantsPanel(restaurants); });
    step("hotels", function () { renderHotelsPanel(hotels); });

    state.activeDay = days.length ? days[0].id : null;

    /* Wiring gets the same isolation as rendering. It used to run bare, so
       the first binding that threw silently skipped every one after it -
       and a page whose accordions open but whose theme buttons are dead is
       harder to diagnose than one that fails loudly in the console. */
    step("tab events", bindTabEvents);
    step("accordion events", bindAccordionEvents);
    step("copy events", bindCopyEvents);
    step("day nav events", function () { bindDayNavEvents(days); });
    step("lightbox", bindLightboxEvents);
    step("character dialog", bindCharacterDialogEvents);
    step("info dialog", bindInfoDialogEvents);
    step("glossary dialog", bindGlossaryDialogEvents);
    step("theme events", bindThemeEvents);
    step("theme", initTheme);
    step("day observer", function () { initDayObserver(days); });
    step("sticky offsets", initStickyOffsets);
    step("weather", function () { hydrateWeather(days); });
  }

  /* One bad record used to take the whole page with it: a render throwing
     skipped every later line of init, event wiring included, so the page
     still looked right while nothing responded to a click. Isolating each
     step costs a bad record only its own section. */
  function step(name, fn) {
    try {
      fn();
    } catch (err) {
      console.error("[init] " + name + " failed to render:", err);
    }
  }

  /**
   * Everything outside the hero that names the trip: page title, header
   * brand mark, footer, and the meta description used by link previews.
   * Driven from trip.js so reusing this template stays a data-only edit.
   */
  function applyTripChrome(trip) {
    const title = trip.title || "Travel Itinerary";
    document.title = title + " — Travel Itinerary";

    const brand = document.getElementById("brand-title");
    if (brand) brand.textContent = title;

    const footer = document.getElementById("footer-title");
    if (footer) footer.textContent = title;

    const meta = document.getElementById("meta-description");
    if (meta) {
      meta.setAttribute("content",
        "A compact, mobile-first travel itinerary: day-by-day schedule, " +
        "restaurants, and hotels for " + title + ".");
    }
  }

  /* ---------- Weather (Open-Meteo, progressive enhancement) ---------- */

  /**
   * Swap each day's static weather for live data once it arrives. Days keep
   * whatever itinerary.js declared until then, so a slow or failed request
   * simply leaves the fallback on screen.
   */
  function hydrateWeather(days) {
    if (!window.Weather) return;
    const locations = window.LOCATIONS_DATA || {};

    days.forEach(function (day) {
      const location = day.locationId ? locations[day.locationId] : null;
      if (!location) return;

      window.Weather.getWeatherForDay(location, day.date).then(function (weather) {
        /* A reply can come back shaped correctly but empty - Open-Meteo
           omitting weather_code leaves no label, and an archive window with
           no usable rows leaves no temperature. Swapping that in would trade
           the day's hand-written fallback for a blank card, so it has to
           carry at least a condition or a temperature to be worth showing. */
        if (!weather || (!weather.forecast && !weather.temperature)) return;
        const current = document.querySelector('[data-weather-for="' + day.id + '"]');
        if (!current) return;
        const fresh = C.renderWeather(weather, {
          dayId: day.id,
          locationName: location.name
        });
        if (fresh) current.replaceWith(fresh);
      }).catch(function (err) {
        console.warn("[weather] Could not update " + day.id + ":", err);
      });
    });
  }

  /* ---------- Sticky header offsets ---------- */

  function syncStickyOffsets() {
    const root = document.documentElement;
    const utilityBar = document.querySelector(".utility-bar");
    const tabsBar = document.querySelector(".main-tabs-bar");
    const dayNav = document.querySelector(".day-nav");
    root.style.setProperty("--utility-bar-height", (utilityBar ? utilityBar.offsetHeight : 0) + "px");
    root.style.setProperty("--main-tabs-height", (tabsBar ? tabsBar.offsetHeight : 0) + "px");
    if (dayNav) {
      root.style.setProperty("--day-nav-height", dayNav.offsetHeight + "px");
    }
  }

  function initStickyOffsets() {
    requestAnimationFrame(syncStickyOffsets);
    window.addEventListener("resize", U.debounce(syncStickyOffsets, 150));
  }

  function buildRestaurantIndex(restaurants) {
    const index = {};
    restaurants.forEach(function (r) {
      index[r.id] = r;
    });
    return index;
  }

  function validateReferences(days, index, characters) {
    days.forEach(function (day) {
      (day.items || []).forEach(function (item) {
        if (item.type === "restaurant") {
          const ids = [item.restaurantId].concat(item.nearbyRestaurantIds || []);
          ids.forEach(function (id) {
            if (id && !index[id]) {
              console.warn("[itinerary] Unknown restaurantId referenced:", id, "in item", item.id);
            }
          });
          return;
        }
        if (item.type === "park" && item.park) {
          (item.park.characters || []).forEach(function (key) {
            if (key && !characters[key]) {
              console.warn("[itinerary] Unknown character key referenced:", key, "in item", item.id);
            }
          });
        }
      });
    });
  }

  /* ---------- Main tabs ---------- */

  function renderTabs() {
    const root = document.getElementById("main-tabs-root");
    root.appendChild(C.renderMainTabs(state.activeTab));
  }

  function bindTabEvents() {
    const root = document.getElementById("main-tabs-root");
    root.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-tab-target]");
      if (!btn) return;
      setActiveTab(btn.getAttribute("data-tab-target"));
    });
    root.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const tabs = Array.from(root.querySelectorAll("[data-tab-target]"));
      const currentIndex = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
      const nextIndex = e.key === "ArrowRight"
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      setActiveTab(tabs[nextIndex].getAttribute("data-tab-target"));
    });
  }

  function setActiveTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll("[data-tab-target]").forEach(function (btn) {
      const isActive = btn.getAttribute("data-tab-target") === tabId;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.tabIndex = isActive ? 0 : -1;
    });
    document.querySelectorAll(".tab-panel").forEach(function (panel) {
      panel.hidden = panel.id !== "panel-" + tabId;
    });
  }

  /* ---------- Itinerary panel ---------- */

  function renderItineraryPanel(days, restaurantIndexMap) {
    const panel = document.getElementById("panel-itinerary");
    U.clear(panel);
    if (!days.length) {
      panel.appendChild(U.el("p", { class: "empty-note" }, ["No days yet — add them to data/itinerary.js."]));
      return;
    }

    panel.appendChild(C.renderDayNav(days, days[0].id));
    const daysWrap = U.el("div", { class: "days-wrap" });
    days.forEach(function (day) {
      daysWrap.appendChild(C.renderDaySection(day, restaurantIndexMap, characterIndex));
    });
    panel.appendChild(daysWrap);
  }

  function bindDayNavEvents(days) {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-day-target]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("data-day-target"));
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    });
  }

  function setActiveDay(dayId) {
    if (state.activeDay === dayId) return;
    state.activeDay = dayId;
    document.querySelectorAll("[data-day-target]").forEach(function (btn) {
      const isActive = btn.getAttribute("data-day-target") === dayId;
      btn.classList.toggle("is-active", isActive);
      if (isActive) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
      if (isActive) {
        btn.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
      }
    });
  }

  function initDayObserver(days) {
    if (!("IntersectionObserver" in window) || !days.length) return;
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveDay(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    days.forEach(function (day) {
      const section = document.getElementById(day.id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Restaurants panel ---------- */

  function renderRestaurantsPanel(restaurants) {
    const panel = document.getElementById("panel-restaurants");
    U.clear(panel);

    const toolbar = U.el("div", { class: "restaurant-toolbar" });
    const searchWrap = U.el("div", { class: "search-field" });
    searchWrap.appendChild(U.icon("search", "search-field-icon"));
    const searchInput = U.el("input", {
      type: "search",
      id: "restaurant-search",
      class: "search-input",
      placeholder: "Search restaurants...",
      "aria-label": "Search restaurants by English or Chinese name"
    });
    searchWrap.appendChild(searchInput);
    toolbar.appendChild(searchWrap);

    const zoneFilterWrap = U.el("div", { class: "filter-field" });
    zoneFilterWrap.appendChild(U.icon("map-pin", "filter-field-icon"));
    zoneFilterWrap.appendChild(U.el("label", { for: "zone-filter", class: "filter-label" }, ["Zone"]));
    const zoneSelect = C.renderZoneFilter(C.getUniqueZones(restaurants));
    zoneFilterWrap.appendChild(zoneSelect);
    toolbar.appendChild(zoneFilterWrap);

    const cuisineFilterWrap = U.el("div", { class: "filter-field" });
    cuisineFilterWrap.appendChild(U.icon("filter", "filter-field-icon"));
    cuisineFilterWrap.appendChild(U.el("label", { for: "cuisine-filter", class: "filter-label" }, ["Menu"]));
    const cuisineSelect = C.renderCuisineFilter(C.getUniqueCuisines(restaurants));
    cuisineFilterWrap.appendChild(cuisineSelect);
    toolbar.appendChild(cuisineFilterWrap);

    panel.appendChild(toolbar);

    const meta = U.el("div", { class: "restaurant-toolbar-meta" });
    const resultsCount = U.el("span", { id: "restaurant-count" }, [""]);
    const clearBtn = U.el("button", { type: "button", class: "clear-filters-btn", id: "clear-filters" }, ["Clear filters"]);
    clearBtn.hidden = true;
    meta.appendChild(resultsCount);
    meta.appendChild(clearBtn);
    panel.appendChild(meta);

    const resultsWrap = U.el("div", { id: "restaurant-results" });
    const emptyState = U.el("p", { class: "empty-note", id: "restaurant-empty" }, ["No restaurants match your search."]);
    emptyState.hidden = true;

    const zoneGroups = C.groupByZone(restaurants);
    zoneGroups.forEach(function (group) {
      const zoneSection = U.el("div", { class: "zone-group", "data-zone-group": "" });
      zoneSection.appendChild(U.el("h3", { class: "zone-heading" }, [group.zone]));
      const grid = U.el("div", { class: "restaurant-grid" });
      group.restaurants.forEach(function (r) {
        grid.appendChild(C.renderRestaurantCard(r));
      });
      zoneSection.appendChild(grid);
      resultsWrap.appendChild(zoneSection);
    });

    panel.appendChild(resultsWrap);
    panel.appendChild(emptyState);

    const totalCount = restaurants.length;

    const applyFilter = U.debounce(function () {
      filterRestaurants(searchInput.value, cuisineSelect.value, zoneSelect.value, totalCount);
    }, 120);

    searchInput.addEventListener("input", applyFilter);
    cuisineSelect.addEventListener("change", applyFilter);
    zoneSelect.addEventListener("change", applyFilter);
    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      cuisineSelect.value = "";
      zoneSelect.value = "";
      filterRestaurants("", "", "", totalCount);
    });

    filterRestaurants("", "", "", totalCount);
  }

  function filterRestaurants(query, cuisine, zone, totalCount) {
    const q = U.normalize(query);
    const c = U.normalize(cuisine);
    const z = U.normalize(zone);
    let visibleCount = 0;

    document.querySelectorAll("#restaurant-results .restaurant-card").forEach(function (card) {
      const matchesQuery = !q || card.getAttribute("data-search").indexOf(q) !== -1;
      const matchesCuisine = !c || card.getAttribute("data-cuisine").split("|").indexOf(c) !== -1;
      const matchesZone = !z || card.getAttribute("data-zone") === z;
      const visible = matchesQuery && matchesCuisine && matchesZone;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    document.querySelectorAll("[data-zone-group]").forEach(function (group) {
      const anyVisible = Array.from(group.querySelectorAll(".restaurant-card")).some(function (c) {
        return !c.hidden;
      });
      group.hidden = !anyVisible;
    });

    const empty = document.getElementById("restaurant-empty");
    if (empty) empty.hidden = visibleCount !== 0;

    const countEl = document.getElementById("restaurant-count");
    if (countEl) {
      countEl.textContent = visibleCount === totalCount
        ? totalCount + " restaurants"
        : visibleCount + " of " + totalCount + " restaurants";
    }

    const clearBtn = document.getElementById("clear-filters");
    if (clearBtn) {
      clearBtn.hidden = !(q || c || z);
    }
  }

  /* ---------- Hotels panel ---------- */

  function renderHotelsPanel(hotels) {
    const panel = document.getElementById("panel-hotels");
    U.clear(panel);
    if (!hotels.length) {
      panel.appendChild(U.el("p", { class: "empty-note" }, ["No hotels yet — add them to data/hotels.js."]));
      return;
    }
    const list = U.el("div", { class: "hotel-list" });
    hotels.forEach(function (hotel) {
      list.appendChild(C.renderHotelCard(hotel));
    });
    panel.appendChild(list);
  }

  /* ---------- Accordion (event delegation) ---------- */

  function bindAccordionEvents() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".details-toggle");
      if (!btn) return;
      toggleAccordion(btn);
    });
  }

  function toggleAccordion(btn) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    /* `inert` is what removes a closed panel from the tab order and the
       accessibility tree; CSS visibility does the same for browsers that
       predate it. Both flip synchronously, so toggling faster than the
       animation can no longer leave the panel and the button disagreeing. */
    btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    panel.classList.toggle("is-open", !isOpen);
    panel.toggleAttribute("inert", isOpen);
  }

  /* ---------- Copy buttons (event delegation) ---------- */

  function bindCopyEvents() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".copy-btn");
      if (!btn) return;
      const value = btn.getAttribute("data-copy-value");
      if (!value) return;
      U.copyToClipboard(value).then(
        function () { showCopyFeedback(btn); },
        function () { console.warn("[copy] Clipboard copy failed."); }
      );
    });
  }

  function showCopyFeedback(btn) {
    btn.classList.add("is-copied");
    /* Capture the real label once. Reading it on every click meant a second
       click inside the timeout captured "Copied" as the label to restore,
       leaving the button permanently announcing that instead of its name. */
    if (btn._copyLabel === undefined) {
      btn._copyLabel = btn.getAttribute("aria-label");
    }
    btn.setAttribute("aria-label", "Copied");
    clearTimeout(btn._copyTimer);
    btn._copyTimer = setTimeout(function () {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", btn._copyLabel);
    }, 1600);
  }

  /* ---------- Dialogs ---------- */

  /* <dialog>.showModal() is missing on older Safari/Firefox, where setting the
     `open` attribute alone drops the dialog into normal page flow - it looks
     like nothing happened. The fallback class pins and layers it instead, and
     Escape has to be wired by hand because only real modals get it free. */
  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.classList.add("dialog--fallback");
      dialog.setAttribute("open", "");
      document.addEventListener("keydown", escapeToClose);
    }
  }

  function closeDialog(dialog) {
    document.removeEventListener("keydown", escapeToClose);
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      /* Only a real .close() fires the `close` event. Dispatching it here
         keeps the fallback path observable too, so cleanup listeners run on
         every browser rather than only the modern ones. */
      dialog.dispatchEvent(new Event("close"));
    }
    dialog.classList.remove("dialog--fallback");
  }

  function escapeToClose(e) {
    if (e.key !== "Escape") return;
    const open = document.querySelector("dialog[open]");
    if (open) closeDialog(open);
  }

  /* Clicking the backdrop closes: on a real modal the click lands on the
     dialog element itself, on the fallback on the .dialog--fallback layer. */
  function bindDialogDismiss(dialog, closeBtn) {
    closeBtn.addEventListener("click", function () { closeDialog(dialog); });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog(dialog);
    });
  }

  /* ---------- Lightbox ---------- */

  function bindLightboxEvents() {
    const dialog = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-image");
    const closeBtn = document.getElementById("lightbox-close");

    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-lightbox-src]");
      if (!trigger) return;
      /* Drop the previous photo first. Leaving it in place meant the last
         image stayed on screen until the new one decoded, so opening a
         second photo flashed the first one back at you. */
      img.removeAttribute("src");
      img.alt = trigger.getAttribute("aria-label") || "";
      img.src = trigger.getAttribute("data-lightbox-src");
      openDialog(dialog);
    });

    bindDialogDismiss(dialog, closeBtn);
    /* Covers every close path - button, backdrop, Escape, native or
       fallback - so nothing is held in memory between viewings. */
    dialog.addEventListener("close", function () {
      img.removeAttribute("src");
      img.alt = "";
    });
  }

  /* ---------- Character popup ---------- */

  function bindCharacterDialogEvents() {
    const dialog = document.getElementById("character-dialog");
    const nameEl = document.getElementById("character-dialog-name");
    const nameZhEl = document.getElementById("character-dialog-name-zh");
    const imgEl = document.getElementById("character-dialog-image");
    const initialEl = document.getElementById("character-dialog-initial");
    const thumbEl = document.getElementById("character-dialog-thumb");
    const bioEl = document.getElementById("character-dialog-bio");
    const closeBtn = document.getElementById("character-dialog-close");

    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-character-key]");
      if (!trigger) return;
      const record = characterIndex[trigger.getAttribute("data-character-key")];
      if (!record) return;
      nameEl.textContent = record.name || "";
      nameZhEl.textContent = record.nameZh || "";
      nameZhEl.hidden = !record.nameZh;

      /* Disney characters are copyrighted, so this project ships no artwork
         for them - the thumbnail falls back to a coloured monogram until the
         owner drops in their own park photos via tools/add-image.js. */
      if (record.image) {
        imgEl.src = record.image;
        imgEl.alt = record.name || "";
        imgEl.hidden = false;
        initialEl.hidden = true;
        thumbEl.style.removeProperty("background");
      } else {
        imgEl.removeAttribute("src");
        imgEl.hidden = true;
        initialEl.textContent = initialsFor(record.name || "?");
        initialEl.hidden = false;
        thumbEl.style.background = monogramColor(record.id || record.name || "");
      }

      bioEl.textContent = record.bio || "";
      openDialog(dialog);
    });

    bindDialogDismiss(dialog, closeBtn);
  }

  /* Up to two letters: "Mickey Mouse" -> MM, "CLU" -> C. */
  function initialsFor(name) {
    return name.split(/[\s-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (word) { return word.charAt(0).toUpperCase(); })
      .join("");
  }

  /* Same key always gets the same hue, so a character looks like itself
     every time the popup opens. */
  function monogramColor(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % 360;
    }
    return "linear-gradient(150deg, hsl(" + hash + ", 52%, 46%), hsl(" +
      ((hash + 28) % 360) + ", 52%, 34%))";
  }

  /* ---------- Briefing popups ---------- */

  function buildInfoDialogIndex(days) {
    const index = {};
    days.forEach(function (day) {
      const dialogs = (day.briefing && day.briefing.dialogs) || [];
      dialogs.forEach(function (dialog) {
        if (dialog.id) index[dialog.id] = dialog;
      });
    });
    return index;
  }

  /* Every briefing glossary flattened into one term -> entry map, so a ride
     chip can open its own definition without knowing which day's dialog
     happens to hold it. First definition wins if two days ever disagree. */
  function buildGlossaryIndex(days) {
    const index = {};
    days.forEach(function (day) {
      const dialogs = (day.briefing && day.briefing.dialogs) || [];
      dialogs.forEach(function (dialog) {
        (dialog.glossary || []).forEach(function (entry) {
          if (entry && entry.term && !index[entry.term]) index[entry.term] = entry;
        });
      });
    });
    return index;
  }

  /* One writer for #info-dialog, shared by the briefing popups and the ride
     glossary chips. `record` is the briefing dialog shape: title, intro,
     optional `glossary` pairs, optional `groups` of bullets, note. */
  function fillInfoDialog(record) {
    const titleEl = document.getElementById("info-dialog-title");
    const introEl = document.getElementById("info-dialog-intro");
    const bodyEl = document.getElementById("info-dialog-body");
    const noteEl = document.getElementById("info-dialog-note");

    titleEl.textContent = record.title || "";
    introEl.textContent = record.intro || "";
    introEl.hidden = !record.intro;
    noteEl.textContent = record.note || "";
    noteEl.hidden = !record.note;

    U.clear(bodyEl);

    /* Two shapes: `groups` of bullets (the prohibited-items list) and
       `glossary` term/meaning pairs (the ride-type words). */
    if (record.glossary && record.glossary.length) {
      const dl = U.el("dl", { class: "glossary" });
      record.glossary.forEach(function (entry) {
        dl.appendChild(U.el("div", { class: "glossary-row" }, [
          U.el("dt", {}, [entry.term]),
          U.el("dd", {}, [entry.meaning])
        ]));
      });
      bodyEl.appendChild(dl);
    }

    (record.groups || []).forEach(function (group) {
      const block = U.el("div", { class: "info-group" });
      if (group.label) {
        block.appendChild(U.el("h4", { class: "field-label" }, [group.label]));
      }
      const list = U.el("ul", { class: "info-list" });
      (group.items || []).forEach(function (item) {
        list.appendChild(U.el("li", {}, [item]));
      });
      block.appendChild(list);
      bodyEl.appendChild(block);
    });
  }

  function bindInfoDialogEvents() {
    const dialog = document.getElementById("info-dialog");
    const closeBtn = document.getElementById("info-dialog-close");

    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-info-dialog]");
      if (!trigger) return;
      const record = infoDialogIndex[trigger.getAttribute("data-info-dialog")];
      if (!record) return;
      fillInfoDialog(record);
      openDialog(dialog);
    });

    bindDialogDismiss(dialog, closeBtn);
  }

  /* Clicking a ride's type chip opens that one glossary entry - the term as
     the heading, its meaning as the intro line. Reuses #info-dialog rather
     than adding a fourth dialog to index.html; dismissal is already wired by
     bindInfoDialogEvents, so this only opens. */
  function bindGlossaryDialogEvents() {
    const dialog = document.getElementById("info-dialog");

    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-glossary-term]");
      if (!trigger) return;
      const entry = glossaryIndex[trigger.getAttribute("data-glossary-term")];
      if (!entry) return;
      fillInfoDialog({ title: entry.term, intro: entry.meaning });
      openDialog(dialog);
    });
  }

  /* ---------- Theme ---------- */

  const THEME_KEY = "trip-theme-preference";

  /* localStorage throws outright when site data is blocked (Safari private
     browsing, "block all cookies"), so every access is best-effort: losing
     the remembered theme is fine, losing the rest of init is not. */
  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      /* Theme still applies for this visit; it just will not be remembered. */
    }
  }

  function initTheme() {
    state.theme = readStoredTheme() || "system";
    applyTheme(state.theme);
    updateThemeControlUI();

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = function () {
      if (state.theme === "system") applyTheme("system");
    };
    /* addEventListener on a MediaQueryList only landed in Safari 14; older
       builds expose the deprecated addListener instead. */
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", onSystemChange);
    } else if (typeof query.addListener === "function") {
      query.addListener(onSystemChange);
    }
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }

  function bindThemeEvents() {
    const control = document.getElementById("theme-control");
    if (!control) return;
    control.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-theme-option]");
      if (!btn) return;
      const theme = btn.getAttribute("data-theme-option");
      state.theme = theme;
      storeTheme(theme);
      applyTheme(theme);
      updateThemeControlUI();
    });
  }

  function updateThemeControlUI() {
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      const isActive = btn.getAttribute("data-theme-option") === state.theme;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  /* ---------- Helpers ---------- */

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
