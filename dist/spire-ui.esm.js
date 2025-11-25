class Ji {
  constructor(e) {
    this.component = e, this.classes = [`spire-${e}`], this.dataAttributes = {};
  }
  static make(e) {
    return new Ji(e);
  }
  size(e) {
    return e && (this.classes.push(`spire-${this.component}--${e}`), this.dataAttributes["data-spire-size"] = e), this;
  }
  variant(e) {
    return e && (this.classes.push(`spire-${this.component}--${e}`), this.dataAttributes["data-spire-variant"] = e), this;
  }
  color(e) {
    return e && (this.classes.push(`spire-${this.component}--${e}`), this.dataAttributes["data-spire-color"] = e), this;
  }
  colorVariant(e, t) {
    return e && t && (this.classes.push(`spire-${this.component}--${e}-${t}`), this.dataAttributes["data-spire-color"] = e, this.dataAttributes["data-spire-variant"] = t), this;
  }
  modifier(e) {
    return e && this.classes.push(`spire-${this.component}--${e}`), this;
  }
  radius(e) {
    return e && this.classes.push(`rounded-${e}`), this;
  }
  shadow(e) {
    return e && this.classes.push(`shadow-${e}`), this;
  }
  addClass(e) {
    return e && this.classes.push(e), this;
  }
  addClasses(...e) {
    return e.forEach((t) => {
      t && this.classes.push(t);
    }), this;
  }
  addIf(e, t) {
    return e && t && this.classes.push(t), this;
  }
  when(e, t) {
    return e && typeof t == "function" && t(this), this;
  }
  dataAttribute(e, t) {
    return e && (this.dataAttributes[`data-spire-${e}`] = t), this;
  }
  build() {
    return this.classes.join(" ");
  }
  toArray() {
    return [...this.classes];
  }
  getDataAttributes() {
    return { ...this.dataAttributes };
  }
}
const lh = 50, hh = 50, Dn = {
  "MM/DD/YYYY": {
    order: ["month", "day", "year"],
    separator: "/",
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    locales: ["en-US", "en-us"]
  },
  "DD/MM/YYYY": {
    order: ["day", "month", "year"],
    separator: "/",
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    locales: ["en-GB", "en-gb", "fr", "fr-FR", "fr-fr", "de", "de-DE", "de-de", "es", "es-ES", "es-es", "it", "it-IT", "it-it", "pt", "pt-PT", "pt-pt", "nl", "nl-NL", "nl-nl"]
  },
  "YYYY-MM-DD": {
    order: ["year", "month", "day"],
    separator: "-",
    regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    locales: ["zh", "zh-CN", "zh-cn", "ja", "ja-JP", "ja-jp", "ko", "ko-KR", "ko-kr", "sv", "sv-SE", "sv-se"]
  }
}, Lr = "MM/DD/YYYY", ch = 300, uh = 300, jt = 150, oa = 500, dh = 150, fh = 40, ph = 40, mh = 120, gh = 40, yh = 100, ce = {
  MINUTE_STEP: 1,
  SHOW_SECONDS: !1,
  DEFAULT_HOUR_12: 12,
  DEFAULT_HOUR_24: 0,
  DEFAULT_MINUTE: 0,
  DEFAULT_SECOND: 0,
  DEFAULT_PERIOD: "AM",
  PERIOD_OPTIONS: ["AM", "PM"]
}, zt = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  MODE: "single",
  SHOW_TOOLTIP: !0
}, Tt = {
  AUTOPLAY: !1,
  INTERVAL: 5e3,
  LOOP: !1,
  PAUSE_ON_HOVER: !0,
  PAUSE_ON_FOCUS: !0,
  ITEMS_PER_VIEW: 1
}, Pr = 500, bh = 5, Vr = {
  xs: "30rem",
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "120rem"
};
let xh = 0;
function $r(s) {
  const e = [
    "a[href]",
    "button:not([disabled])",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(", ");
  return Array.from(s.querySelectorAll(e)).filter(
    (t) => !t.hasAttribute("disabled") && t.offsetParent !== null
  );
}
function Sh(s, e = null) {
  let t = e || document.activeElement;
  function n(i) {
    if (i.key !== "Tab") return;
    const r = $r(s);
    if (r.length === 0) return;
    const o = r[0], a = r[r.length - 1];
    i.shiftKey && document.activeElement === o ? (i.preventDefault(), a.focus()) : !i.shiftKey && document.activeElement === a && (i.preventDefault(), o.focus());
  }
  return {
    activate() {
      t = e || document.activeElement, s.addEventListener("keydown", n);
      const i = $r(s);
      i.length > 0 && requestAnimationFrame(() => i[0].focus());
    },
    deactivate() {
      s.removeEventListener("keydown", n), t && typeof t.focus == "function" && t.focus();
    }
  };
}
function W(s = {}) {
  return {
    /**
     * Whether the overlay is currently open.
     * @type {boolean}
     */
    open: !1,
    /**
     * How the overlay is triggered.
     * @type {'click'|'hover'|'both'}
     */
    triggerMode: s.trigger || "click",
    /**
     * Timer handle for delayed hide on hover.
     * @type {number|null}
     */
    hoverTimer: null,
    /**
     * Whether the overlay is pinned open (prevents hover hide).
     * @type {boolean}
     */
    isPinned: !1,
    /**
     * Focus trap controller instance.
     * @type {{ activate: () => void, deactivate: () => void }|null}
     */
    focusTrap: null,
    /**
     * The trigger element for this specific component instance.
     * @type {HTMLElement|null}
     */
    _triggerEl: null,
    /**
     * The content element for this specific component instance.
     * @type {HTMLElement|null}
     */
    _contentEl: null,
    /**
     * Stable anchor ID for CSS anchor positioning.
     * Declared here so each component instance has its own property,
     * preventing Alpine scope chain from finding parent's value.
     * @type {string|null}
     */
    _stableAnchorId: null,
    /**
     * Initialize the overlay component.
     *
     * Sets up popover API, anchor positioning, event listeners,
     * and trigger mode behavior.
     *
     * @returns {void}
     */
    init() {
      this._stableAnchorId = `anchor-overlay-${++xh}`, this.$nextTick(() => {
        this.resolveElements(), this.setupPopover(), this.setupAnchor(), this.setupEventListeners(), this.setupTriggerMode(), this.setupFocusTrap(), this.setupLivewireCompat(), s.onInit?.call(this);
      });
    },
    /**
     * Resolve trigger and content elements for this component instance.
     *
     * Finds elements with x-ref that belong to this component's scope,
     * not to any nested x-data components.
     *
     * @returns {void}
     */
    resolveElements() {
      const e = this.$el;
      if (!e) return;
      const t = (n) => {
        const i = e.querySelectorAll(`[x-ref="${n}"]`);
        for (const r of i) {
          let o = r.parentElement;
          for (; o && o !== e && !o.hasAttribute("x-data"); )
            o = o.parentElement;
          if (o === e || o === null)
            return r;
        }
        return null;
      };
      this._triggerEl = t("trigger"), this._contentEl = t("content");
    },
    /**
     * Setup focus trap if enabled.
     *
     * @returns {void}
     */
    setupFocusTrap() {
      !s.trapFocus || !this._contentEl || !this._triggerEl || (this.focusTrap = Sh(this._contentEl, this._triggerEl));
    },
    /**
     * Setup Livewire compatibility.
     *
     * Hooks into Livewire's morph lifecycle to preserve and re-establish
     * anchor positioning during DOM updates. Uses morph.updating to detect
     * elements before morphing and morph.updated to restore styles after.
     *
     * @returns {void}
     */
    setupLivewireCompat() {
      if (typeof Livewire > "u") return;
      const e = this.$el.closest("[wire\\:id]");
      if (!e) return;
      const t = e.getAttribute("wire:id");
      this._morphUpdatingCleanup = Livewire.hook("morph.updating", ({ el: n, component: i }) => {
        i.id === t && this.$el.contains(n) && (n === this._triggerEl && n.style.anchorName ? (n.__spireAnchorName = n.style.anchorName, n.__spireNeedsAnchorRestore = !0) : n === this._contentEl && n.style.positionAnchor && (n.__spirePositionAnchor = n.style.positionAnchor, n.__spireNeedsAnchorRestore = !0));
      }), this._morphUpdatedCleanup = Livewire.hook("morph.updated", ({ el: n, component: i }) => {
        i.id === t && n.__spireNeedsAnchorRestore && (n === this._triggerEl ? n.style.anchorName = n.__spireAnchorName || `--${this._stableAnchorId}` : n === this._contentEl && (n.style.positionAnchor = n.__spirePositionAnchor || `--${this._stableAnchorId}`), delete n.__spireNeedsAnchorRestore, delete n.__spireAnchorName, delete n.__spirePositionAnchor);
      }), this._livewireCleanup = Livewire.hook("morphed", ({ component: n }) => {
        n.id === t && this.$nextTick(() => {
          this.resolveElements(), this._triggerEl && !this._triggerEl.style.anchorName && (this._triggerEl.style.anchorName = `--${this._stableAnchorId}`), this._contentEl && !this._contentEl.style.positionAnchor && (this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`);
        });
      });
    },
    /**
     * Setup popover element (reserved for future use).
     *
     * @returns {void}
     */
    setupPopover() {
      !this._contentEl || this._triggerEl;
    },
    /**
     * Setup CSS anchor positioning between trigger and content.
     *
     * Creates a unique anchor name and links the content to it,
     * enabling automatic positioning via CSS anchor positioning.
     * Uses the stable anchor ID generated in init().
     *
     * @returns {void}
     */
    setupAnchor() {
      !this._triggerEl || !this._contentEl || (this._triggerEl.style.anchorName = `--${this._stableAnchorId}`, this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`);
    },
    /**
     * Setup event listeners for popover toggle events.
     *
     * Listens to the native 'toggle' event from the Popover API
     * to sync Alpine state with popover state.
     *
     * @returns {void}
     */
    setupEventListeners() {
      this._contentEl && this._contentEl.addEventListener("toggle", (e) => {
        this.handleToggle(e);
      });
    },
    /**
     * Setup trigger mode behavior (click, hover, or both).
     *
     * Adds appropriate event listeners based on triggerMode:
     * - hover: Show on mouseenter, hide on mouseleave with delay
     * - both: Both click and hover behaviors
     *
     * Respects isPinned state to prevent hover-based hiding.
     *
     * @returns {void}
     */
    setupTriggerMode() {
      !this._triggerEl || !this._contentEl || (this.triggerMode === "hover" || this.triggerMode === "both") && (this._triggerEl.addEventListener("mouseenter", () => {
        this.clearHoverTimer(), this.isPinned || this.show();
      }), this._triggerEl.addEventListener("mouseleave", () => {
        this.isPinned || this.scheduleHide();
      }), this._contentEl.addEventListener("mouseenter", () => {
        this.clearHoverTimer();
      }), this._contentEl.addEventListener("mouseleave", () => {
        this.isPinned || this.scheduleHide();
      }));
    },
    /**
     * Clear any pending hover hide timer.
     *
     * Prevents scheduled hide from executing if mouse re-enters
     * the trigger or content area.
     *
     * @returns {void}
     */
    clearHoverTimer() {
      this.hoverTimer && (clearTimeout(this.hoverTimer), this.hoverTimer = null);
    },
    /**
     * Schedule overlay to hide after a delay.
     *
     * Used for hover mode to provide a better UX by not
     * immediately hiding when mouse leaves.
     *
     * @param {number} [delay=HOVER_DELAY_MS] - Delay in milliseconds
     * @returns {void}
     */
    scheduleHide(e = ch) {
      this.clearHoverTimer(), this.hoverTimer = setTimeout(() => {
        this.hide();
      }, e);
    },
    /**
     * Toggle the overlay open/closed state.
     *
     * Delegates to the native Popover API togglePopover method.
     * Includes deduplication to prevent light dismiss conflicts.
     *
     * @returns {void}
     */
    toggle() {
      const e = this._contentEl?.matches(":popover-open") || !1;
      if (this.open && !e) {
        this.open = !1;
        return;
      }
      this._contentEl?.togglePopover();
    },
    /**
     * Show the overlay.
     *
     * Refreshes anchor positioning before showing to ensure
     * correct placement even if trigger has moved.
     *
     * @returns {void}
     */
    show() {
      this.setupAnchor(), this._contentEl?.showPopover();
    },
    /**
     * Hide the overlay.
     *
     * Delegates to the native Popover API hidePopover method.
     *
     * @returns {void}
     */
    hide() {
      this._contentEl?.hidePopover();
    },
    /**
     * Handle popover toggle events from the native API.
     *
     * Syncs Alpine state with actual popover state and calls
     * user-provided onToggle callback.
     *
     * @param {Event} event - The native toggle event
     * @returns {void}
     */
    handleToggle(e) {
      this.open = this._contentEl?.matches(":popover-open") || !1, this.open ? this.focusTrap?.activate() : (this.isPinned = !1, this.clearHoverTimer(), this.focusTrap?.deactivate()), s.onToggle?.call(this, e);
    },
    /**
     * Clean up component resources.
     *
     * Clears any pending timers and Livewire hooks to prevent memory leaks.
     * Should be called when the component is destroyed.
     *
     * @returns {void}
     */
    destroy() {
      this.clearHoverTimer(), this.focusTrap?.deactivate(), this._livewireCleanup?.(), this._morphUpdatingCleanup?.(), this._morphUpdatedCleanup?.();
    },
    ...s.extend
  };
}
function Ze(s = {}) {
  const {
    pattern: e = "activedescendant",
    role: t = "listbox",
    itemSelector: n = '[role="option"]:not([aria-disabled="true"])',
    onSelect: i = null,
    orientation: r = "vertical",
    wrap: o = !0,
    typeahead: a = !1
  } = s, l = e === "activedescendant", h = e === "roving-tabindex";
  return {
    highlightedIndex: -1,
    items: [],
    typeaheadString: "",
    typeaheadTimeout: null,
    setupKeyboard() {
      this.$watch("open", (c) => {
        c ? this.$nextTick(() => {
          this.updateItems(), this.resetHighlight(), this.focusContainer();
        }) : this.resetHighlight();
      }), s.onInit && s.onInit.call(this);
    },
    updateItems() {
      this.$refs.content && (this.items = Array.from(
        this.$refs.content.querySelectorAll(n)
      ));
    },
    resetHighlight() {
      this.highlightedIndex = -1, h && this.items.length > 0 && this.items.forEach((c) => {
        c.tabIndex = -1;
      });
    },
    focusContainer() {
      l ? this.$refs.content?.focus() : h && this.items.length > 0 && (this.items[0].tabIndex = 0, this.items[0].focus());
    },
    handleArrowDown(c) {
      r !== "horizontal" && (c?.preventDefault(), this.highlightNext());
    },
    handleArrowUp(c) {
      r !== "horizontal" && (c?.preventDefault(), this.highlightPrev());
    },
    handleArrowRight(c) {
      r !== "vertical" && (c?.preventDefault(), this.highlightNext());
    },
    handleArrowLeft(c) {
      r !== "vertical" && (c?.preventDefault(), this.highlightPrev());
    },
    handleHome(c) {
      c?.preventDefault(), this.highlightFirst();
    },
    handleEnd(c) {
      c?.preventDefault(), this.highlightLast();
    },
    handleEnter(c) {
      c?.preventDefault(), this.selectHighlighted();
    },
    handleEscape(c) {
      c?.preventDefault(), this.hide && this.hide();
    },
    handleTypeahead(c) {
      if (!a) return;
      const u = c.key;
      if (u.length !== 1 || c.ctrlKey || c.altKey || c.metaKey) return;
      clearTimeout(this.typeaheadTimeout), this.typeaheadString += u.toLowerCase();
      const d = this.findTypeaheadMatch(this.typeaheadString);
      d >= 0 && this.highlightItem(d), this.typeaheadTimeout = setTimeout(() => {
        this.typeaheadString = "";
      }, oa);
    },
    findTypeaheadMatch(c) {
      const u = this.highlightedIndex + 1;
      for (let d = 0; d < this.items.length; d++) {
        const f = (u + d) % this.items.length;
        if ((this.items[f].textContent?.toLowerCase() || "").startsWith(c))
          return f;
      }
      return -1;
    },
    highlightNext() {
      if (this.items.length === 0) return;
      const c = this.highlightedIndex + 1;
      c < this.items.length ? this.highlightItem(c) : o && this.highlightItem(0);
    },
    highlightPrev() {
      if (this.items.length === 0) return;
      const c = this.highlightedIndex - 1;
      c >= 0 ? this.highlightItem(c) : o && this.highlightItem(this.items.length - 1);
    },
    highlightFirst() {
      this.items.length > 0 && this.highlightItem(0);
    },
    highlightLast() {
      this.items.length > 0 && this.highlightItem(this.items.length - 1);
    },
    highlightItem(c) {
      c < 0 || c >= this.items.length || (this.highlightedIndex = c, l ? this.updateActivedescendant(c) : h && this.focusItem(c), this.scrollItemIntoView(c));
    },
    updateActivedescendant(c) {
      if (!this.$refs.content) return;
      const u = this.items[c];
      u && (u.id || (u.id = `spire-item-${this.$id("keyboard")}-${c}`), this.$refs.content.setAttribute("aria-activedescendant", u.id));
    },
    focusItem(c) {
      this.items.forEach((u, d) => {
        u.tabIndex = d === c ? 0 : -1;
      }), this.items[c]?.focus();
    },
    scrollItemIntoView(c) {
      const u = this.items[c];
      u && u.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      });
    },
    selectHighlighted() {
      if (this.highlightedIndex < 0 || this.highlightedIndex >= this.items.length) return;
      const c = this.items[this.highlightedIndex];
      i ? i.call(this, c, this.highlightedIndex) : c?.click();
    },
    destroy() {
      clearTimeout(this.typeaheadTimeout);
    }
  };
}
const k = {
  // Input Events
  INPUT_CHANGED: "spire-input-changed",
  INPUT_CLEARED: "spire-input-cleared",
  COPIED: "spire-copied",
  // Rating Events
  RATING_CHANGED: "spire-rating-changed",
  RATING_RESET: "spire-rating-reset",
  // Slider Events
  SLIDER_CHANGED: "spire-slider-changed",
  SLIDER_CHANGE_END: "spire-slider-change-end",
  // Table Events
  TABLE_SELECTION_CHANGED: "spire-table-selection-changed",
  TABLE_SORT_CHANGED: "spire-table-sort-changed",
  // Calendar/Datepicker Events
  DATE_SELECTED: "spire-date-selected",
  DATEPICKER_CLEARED: "spire-datepicker-cleared",
  // Modal Events
  MODAL_OPENED: "spire-modal-opened",
  MODAL_CLOSED: "spire-modal-closed",
  MODAL_CANCELLED: "spire-modal-cancelled",
  // Select Events
  SELECT_CHANGED: "spire-select-changed",
  SELECT_CLEARED: "spire-select-cleared",
  // Autocomplete Events
  AUTOCOMPLETE_SELECTED: "spire-autocomplete-selected",
  AUTOCOMPLETE_CLEARED: "spire-autocomplete-cleared",
  // Toast Events
  TOAST_ADD: "spire-toast-add",
  TOAST_SHOWN: "spire-toast-shown",
  TOAST_HIDDEN: "spire-toast-hidden",
  // File Upload Events
  FILE_UPLOAD_ADDED: "spire-file-upload-added",
  FILE_UPLOAD_REMOVED: "spire-file-upload-removed",
  FILE_UPLOAD_PROGRESS: "spire-file-upload-progress",
  FILE_UPLOAD_COMPLETE: "spire-file-upload-complete",
  FILE_UPLOAD_ERROR: "spire-file-upload-error",
  // Tabs Events
  TABS_CHANGED: "spire-tabs-changed",
  // Phone Input Events
  PHONE_INPUT_CHANGED: "spire-phone-input-changed",
  PHONE_INPUT_COUNTRY_CHANGED: "spire-phone-input-country-changed",
  // Carousel Events
  CAROUSEL_CHANGE: "spire-carousel-change",
  // Lightbox Events
  LIGHTBOX_OPENED: "spire-lightbox-opened",
  LIGHTBOX_CLOSED: "spire-lightbox-closed",
  LIGHTBOX_CHANGED: "spire-lightbox-changed"
};
function M({ value: s, previousValue: e, id: t = null, name: n = null, metadata: i = {} }) {
  return {
    id: t,
    name: n,
    value: s,
    ...e !== void 0 && { previousValue: e },
    timestamp: Date.now(),
    ...i
  };
}
function vh(s = {}) {
  return {
    inputValue: s.value || "",
    showPassword: !1,
    clearable: s.clearable || !1,
    viewable: s.viewable || !1,
    copyable: s.copyable || !1,
    name: s.name || null,
    init() {
      const e = this.$refs.input;
      e && e.value && (this.inputValue = e.value), s.wire && this.$watch("inputValue", (t) => {
        e && (e.value = t, e.dispatchEvent(new Event("input")));
      });
    },
    clearInput() {
      const e = this.inputValue;
      this.inputValue = "";
      const t = this.$refs.input;
      t && (t.value = "", t.dispatchEvent(new Event("input")), t.focus()), this.$dispatch(k.INPUT_CLEARED, M({
        id: this.$id("input"),
        name: this.name,
        value: "",
        previousValue: e
      }));
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async copyToClipboard() {
      const e = this.$refs.input;
      if (e && e.value)
        try {
          await navigator.clipboard.writeText(e.value), this.$dispatch(k.COPIED, M({
            id: this.$id("input"),
            name: this.name,
            value: e.value
          }));
        } catch (t) {
          console.error("Failed to copy:", t);
        }
    },
    handleInput(e) {
      const t = this.inputValue;
      this.inputValue = e.target.value, this.$dispatch(k.INPUT_CHANGED, M({
        id: this.$id("input"),
        name: this.name,
        value: e.target.value,
        previousValue: t
      }));
    },
    get hasValue() {
      return this.inputValue && this.inputValue.length > 0;
    }
  };
}
function wh(s = {}) {
  return {
    findScrollableAncestor(e) {
      let t = e.parentElement;
      for (; t && t !== document.body; ) {
        const { overflow: n, overflowY: i } = window.getComputedStyle(t);
        if (["auto", "scroll"].includes(n) || ["auto", "scroll"].includes(i))
          return t;
        t = t.parentElement;
      }
      return null;
    },
    ...W({
      trigger: "click",
      onInit() {
        this.initializeOptions(), this.setupMutationObserver(), this.setupKeyboard(), this.$nextTick(() => {
          if (this.multiple) {
            const e = Array.isArray(this.value) ? this.value : [];
            this.updateSelectedLabel(e);
          } else
            this.value ? this.updateSelectedLabel(this.value) : this.selectedLabel = this.placeholder;
          this.initialized = !0;
        }), this.$watch("value", (e) => {
          if (this.multiple) {
            const t = Array.isArray(e) ? e : [];
            this.updateSelectedLabel(t);
          } else
            e ? this.updateSelectedLabel(e) : this.selectedLabel = this.placeholder;
        }), this.$watch("searchQuery", () => {
          this.$nextTick(() => {
            this.updateItems(), this.resetHighlight();
          });
        }), this.$watch("open", (e) => {
          e && this.searchable ? this.$nextTick(() => {
            const t = this.$refs.searchInputWrapper;
            if (t) {
              const n = t.querySelector('input[type="text"]');
              if (n) {
                const i = this.findScrollableAncestor(n), r = i?.scrollTop;
                this.$focus.focus(n), i && r !== void 0 && (i.scrollTop = r);
              }
            }
          }) : e || (this.searchQuery = "", this.resetHighlight());
        });
      }
    }),
    ...Ze({
      pattern: "activedescendant",
      role: "listbox",
      itemSelector: '[role="option"]:not([aria-disabled="true"])',
      orientation: "vertical",
      wrap: !0,
      onSelect(e) {
        const t = e.getAttribute("data-spire-select-value"), n = e.getAttribute("data-spire-select-label");
        this.multiple ? this.toggleOption(t, n) : this.selectOption(t, n);
      }
    }),
    value: s.value ?? (s.multiple ? [] : ""),
    toStringValue(e) {
      return e == null ? "" : String(e);
    },
    selectedLabel: "",
    placeholder: s.placeholder || "Select an option",
    multiple: s.multiple || !1,
    max: s.max || null,
    maxReachedMessage: s.maxReachedMessage || "Maximum selections reached",
    selectAllText: s.selectAllText || "Select All",
    clearAllText: s.clearAllText || "Clear All",
    itemsSelectedText: s.itemsSelectedText || ":count items selected",
    moreItemsText: s.moreItemsText || "+ :count more",
    searchable: s.searchable || !1,
    searchPlaceholder: s.searchPlaceholder || "Search options...",
    searchQuery: "",
    displayOptions: [],
    observer: null,
    name: s.name || null,
    initialized: !1,
    get filteredOptions() {
      if (!this.searchQuery || !this.searchable)
        return this.displayOptions;
      const e = this.searchQuery.toLowerCase();
      return this.displayOptions.filter(
        (t) => t.label.toLowerCase().includes(e)
      );
    },
    get selectedValues() {
      return this.multiple ? Array.isArray(this.value) ? this.value : [] : [];
    },
    get selectedItems() {
      return this.multiple ? this.displayOptions.filter(
        (e) => this.selectedValues.some((t) => this.toStringValue(t) === this.toStringValue(e.value))
      ) : [];
    },
    get isMaxReached() {
      return this.multiple && this.max && this.selectedValues.length >= this.max;
    },
    get selectableOptions() {
      return this.displayOptions.filter((e) => !e.disabled);
    },
    get allSelected() {
      return this.multiple && this.selectableOptions.length > 0 && this.selectableOptions.every(
        (e) => this.selectedValues.some((t) => this.toStringValue(t) === this.toStringValue(e.value))
      );
    },
    isSelected(e) {
      if (!this.initialized)
        return !1;
      const t = this.toStringValue(e);
      return this.multiple ? this.selectedValues.some((n) => this.toStringValue(n) === t) : this.value === "" || this.value == null ? !1 : this.toStringValue(this.value) === t;
    },
    initializeOptions() {
      const e = this.extractSlotOptions();
      this.displayOptions = e, this.$nextTick(() => {
        this.updateItems();
      });
    },
    extractSlotOptions() {
      const e = this.$refs.slotHtml;
      if (!e) return [];
      const t = [];
      return e.querySelectorAll("[data-spire-select-value]").forEach((i) => {
        t.push({
          value: i.getAttribute("data-spire-select-value"),
          label: i.getAttribute("data-spire-select-label") || i.textContent.trim(),
          html: i.innerHTML,
          disabled: i.getAttribute("data-spire-select-disabled") === "true"
        });
      }), t;
    },
    setupMutationObserver() {
      const e = this.$refs.slotHtml;
      e && (this.observer = new MutationObserver(() => {
        this.$nextTick(() => {
          this.initializeOptions();
        });
      }), this.observer.observe(e, {
        childList: !0,
        characterData: !0,
        subtree: !0
      }));
    },
    selectOption(e, t) {
      if (this.multiple)
        this.toggleOption(e, t);
      else {
        const n = this.value;
        this.value = e, this.selectedLabel = t, this.hide(), this.$dispatch(k.SELECT_CHANGED, M({
          id: this.$id("select"),
          name: this.name,
          value: e,
          previousValue: n,
          metadata: { label: t }
        }));
      }
    },
    toggleOption(e, t) {
      if (!this.multiple) return;
      const n = [...Array.isArray(this.value) ? this.value : []], i = [...n], r = i.findIndex((o) => this.toStringValue(o) === this.toStringValue(e));
      if (r > -1)
        i.splice(r, 1);
      else {
        if (this.isMaxReached)
          return;
        i.push(e);
      }
      this.value = i, this.updateSelectedLabel(i), this.$dispatch(k.SELECT_CHANGED, M({
        id: this.$id("select"),
        name: this.name,
        value: i,
        previousValue: n,
        metadata: { label: t, action: r > -1 ? "removed" : "added" }
      }));
    },
    removeOption(e) {
      if (!this.multiple) return;
      const t = [...Array.isArray(this.value) ? this.value : []], n = [...t], i = n.findIndex((r) => this.toStringValue(r) === this.toStringValue(e));
      i > -1 && (n.splice(i, 1), this.value = n, this.updateSelectedLabel(n), this.$dispatch(k.SELECT_CHANGED, M({
        id: this.$id("select"),
        name: this.name,
        value: n,
        previousValue: t,
        metadata: { action: "removed" }
      })));
    },
    selectAll() {
      if (!this.multiple) return;
      const e = [...Array.isArray(this.value) ? this.value : []], t = this.selectableOptions.map((i) => i.value), n = this.max ? t.slice(0, this.max) : t;
      this.value = n, this.updateSelectedLabel(n), this.$dispatch(k.SELECT_CHANGED, M({
        id: this.$id("select"),
        name: this.name,
        value: n,
        previousValue: e,
        metadata: { action: "selectAll" }
      }));
    },
    clearAll() {
      const e = this.multiple ? [...Array.isArray(this.value) ? this.value : []] : this.value;
      this.multiple ? (this.value = [], this.updateSelectedLabel([])) : this.clearSelection(), this.$dispatch(k.SELECT_CLEARED, M({
        id: this.$id("select"),
        name: this.name,
        value: this.multiple ? [] : "",
        previousValue: e
      }));
    },
    updateSelectedLabel(e) {
      if (this.multiple) {
        const t = Array.isArray(e) ? e : [];
        if (t.length === 0) {
          this.selectedLabel = this.placeholder;
          return;
        }
        const n = this.displayOptions.filter(
          (i) => t.some((r) => this.toStringValue(r) === this.toStringValue(i.value))
        );
        n.length === 0 ? this.selectedLabel = this.placeholder : n.length === 1 ? this.selectedLabel = n[0].label : this.selectedLabel = this.itemsSelectedText.replace(":count", n.length);
      } else {
        const t = this.toStringValue(e), n = this.displayOptions.find((i) => this.toStringValue(i.value) === t);
        n ? this.selectedLabel = n.label : this.selectedLabel = this.placeholder;
      }
    },
    clearSelection() {
      const e = this.multiple ? [...Array.isArray(this.value) ? this.value : []] : this.value;
      this.multiple ? this.value = [] : this.value = "", this.selectedLabel = this.placeholder, this.$dispatch(k.SELECT_CLEARED, M({
        id: this.$id("select"),
        name: this.name,
        value: this.multiple ? [] : "",
        previousValue: e
      }));
    },
    destroy() {
      this.observer && this.observer.disconnect(), W().destroy?.call(this), Ze().destroy?.call(this);
    }
  };
}
let Th = 0;
function kh(s = {}) {
  return {
    value: s.value || "",
    inputValue: "",
    selectedLabel: "",
    placeholder: s.placeholder || "Type to search...",
    minChars: s.minChars || 0,
    debounce: s.debounce || uh,
    showOnFocus: s.showOnFocus !== !1,
    highlightMatches: s.highlightMatches !== !1,
    clearable: s.clearable !== !1,
    syncInput: s.syncInput || !1,
    clearLabel: s.clearLabel || "Clear input",
    displayOptions: [],
    observer: null,
    debounceTimer: null,
    blurTimeout: null,
    open: !1,
    highlightedIndex: -1,
    name: s.name || null,
    _stableAnchorId: null,
    _triggerEl: null,
    _contentEl: null,
    init() {
      this.$nextTick(() => {
        if (this.resolveElements(), this.initializeOptions(), this.setupMutationObserver(), this.setupPopover(), this.setupInputWatchers(), this.value) {
          const e = this.displayOptions.find((t) => t.value === this.value);
          e && (this.inputValue = e.label, this.selectedLabel = e.label);
        }
      });
    },
    resolveElements() {
      const e = this.$el;
      if (!e) return;
      const t = (n) => {
        const i = e.querySelectorAll(`[x-ref="${n}"]`);
        for (const r of i) {
          let o = r.parentElement;
          for (; o && o !== e && !o.hasAttribute("x-data"); )
            o = o.parentElement;
          if (o === e || o === null)
            return r;
        }
        return null;
      };
      this._triggerEl = t("trigger"), this._contentEl = t("content");
    },
    get filteredOptions() {
      if (!this.inputValue || this.inputValue.length < this.minChars)
        return this.showOnFocus ? this.displayOptions : [];
      if (this.syncInput)
        return this.displayOptions.map((t) => ({
          ...t,
          highlightedHtml: this.highlightMatches ? this.highlightText(t.html, this.inputValue.toLowerCase()) : t.html
        }));
      const e = this.inputValue.toLowerCase();
      return this.displayOptions.filter(
        (t) => t.label.toLowerCase().includes(e)
      ).map((t) => ({
        ...t,
        highlightedHtml: this.highlightMatches ? this.highlightText(t.html, e) : t.html
      }));
    },
    get shouldShowDropdown() {
      return this.displayOptions.length === 0 ? !1 : this.showOnFocus && this.inputValue.length === 0 ? !0 : this.inputValue.length >= this.minChars && this.filteredOptions.length > 0;
    },
    setupPopover() {
      !this._triggerEl || !this._contentEl || (this._stableAnchorId || (this._stableAnchorId = `anchor-autocomplete-${++Th}`), this._triggerEl.style.anchorName = `--${this._stableAnchorId}`, this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`, this._contentEl.addEventListener("toggle", (e) => {
        this.open = e.newState === "open";
      }));
    },
    setupInputWatchers() {
      this.$watch("inputValue", (e) => {
        clearTimeout(this.debounceTimer), this.debounceTimer = setTimeout(() => {
          this.syncInput && (this.value = e), this.handleInputChange(e);
        }, this.debounce);
      }), this.$watch("value", (e) => {
        if (e) {
          const t = this.displayOptions.find((n) => n.value === e);
          t ? (this.inputValue = t.label, this.selectedLabel = t.label) : this.syncInput && (this.inputValue = e);
        } else
          this.inputValue = "", this.selectedLabel = "";
      });
    },
    handleInputChange(e) {
      this.$nextTick(() => {
        this.resetHighlight(), this.shouldShowDropdown ? this.show() : this.hide();
      });
    },
    handleFocus() {
      this.shouldShowDropdown && this.show();
    },
    handleBlur(e) {
      this.blurTimeout = setTimeout(() => {
        if (!this._contentEl) {
          this.hide();
          return;
        }
        if (e.relatedTarget && this._contentEl.contains(e.relatedTarget))
          return;
        this._contentEl.matches(":popover-open") && e.relatedTarget && (this._contentEl.contains(e.relatedTarget) || this._contentEl === e.relatedTarget) || this.hide();
      }, dh);
    },
    show() {
      if (this._contentEl && !this.open)
        try {
          this._contentEl.showPopover();
        } catch (e) {
          console.warn("Failed to show popover:", e);
        }
    },
    hide() {
      if (this._contentEl && this.open)
        try {
          this._contentEl.hidePopover(), this.resetHighlight();
        } catch (e) {
          console.warn("Failed to hide popover:", e);
        }
    },
    highlightNext() {
      if (this.filteredOptions.length !== 0) {
        if (!this.open) {
          this.show();
          return;
        }
        this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredOptions.length;
      }
    },
    highlightPrev() {
      if (this.filteredOptions.length !== 0) {
        if (!this.open) {
          this.show();
          return;
        }
        this.highlightedIndex = this.highlightedIndex <= 0 ? this.filteredOptions.length - 1 : this.highlightedIndex - 1;
      }
    },
    highlightFirst() {
      this.filteredOptions.length !== 0 && (this.highlightedIndex = 0);
    },
    highlightLast() {
      this.filteredOptions.length !== 0 && (this.highlightedIndex = this.filteredOptions.length - 1);
    },
    resetHighlight() {
      this.highlightedIndex = -1;
    },
    selectHighlighted() {
      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredOptions.length) {
        const e = this.filteredOptions[this.highlightedIndex];
        e.disabled || this.selectOption(e.value, e.label);
      }
    },
    selectOption(e, t) {
      const n = this.value;
      this.value = e, this.inputValue = t, this.selectedLabel = t, this.hide(), this.$dispatch(k.AUTOCOMPLETE_SELECTED, M({
        id: this.$id("autocomplete"),
        name: this.name,
        value: e,
        previousValue: n,
        metadata: { label: t }
      })), this.$nextTick(() => {
        this.$refs.input && this.$refs.input.focus();
      });
    },
    clearInput() {
      const e = this.value;
      this.value = "", this.inputValue = "", this.selectedLabel = "", this.$dispatch(k.AUTOCOMPLETE_CLEARED, M({
        id: this.$id("autocomplete"),
        name: this.name,
        value: "",
        previousValue: e
      })), this.$nextTick(() => {
        this.$refs.input && this.$refs.input.focus();
      });
    },
    highlightText(e, t) {
      if (!t) return e;
      const n = new RegExp(`(${this.escapeRegex(t)})`, "gi");
      return this.stripHtml(e).replace(n, '<mark class="bg-primary/20 text-primary font-medium">$1</mark>');
    },
    escapeRegex(e) {
      return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    stripHtml(e) {
      return new DOMParser().parseFromString(e, "text/html").body.textContent || "";
    },
    initializeOptions() {
      const e = this.extractSlotOptions();
      this.displayOptions = e;
    },
    extractSlotOptions() {
      const e = this.$refs.slotHtml;
      if (!e) return [];
      const t = [];
      return e.querySelectorAll("[data-spire-autocomplete-value]").forEach((i) => {
        t.push({
          value: i.getAttribute("data-spire-autocomplete-value"),
          label: i.getAttribute("data-spire-autocomplete-label") || i.textContent.trim(),
          html: i.innerHTML,
          disabled: i.getAttribute("data-spire-autocomplete-disabled") === "true"
        });
      }), t;
    },
    setupMutationObserver() {
      const e = this.$refs.slotHtml;
      e && (this.observer = new MutationObserver(() => {
        this.$nextTick(() => {
          this.initializeOptions(), this.shouldShowDropdown && this.inputValue.length >= this.minChars && this.show();
        });
      }), this.observer.observe(e, {
        childList: !0,
        characterData: !0,
        subtree: !0
      }));
    },
    handleToggle(e) {
      this.open = e.newState === "open";
    },
    destroy() {
      this.observer && this.observer.disconnect(), clearTimeout(this.debounceTimer), clearTimeout(this.blurTimeout);
    }
  };
}
const C = {
  /**
   * Generate a calendar grid for the given month.
   */
  generateMonthGrid(s, e, t = 0) {
    const n = new Date(s, e, 1), r = new Date(s, e + 1, 0).getDate(), o = (n.getDay() - t + 7) % 7, a = e === 0 ? 11 : e - 1, l = e === 0 ? s - 1 : s, h = new Date(l, a + 1, 0).getDate(), c = [];
    let u = [];
    for (let d = 0; d < o; d++) {
      const f = h - o + d + 1;
      u.push({
        date: this.formatDate(l, a, f),
        day: f,
        month: a,
        year: l,
        isCurrentMonth: !1,
        isToday: this.isToday(l, a, f),
        isWeekend: this.isWeekend(l, a, f),
        dayOfWeek: d
      });
    }
    for (let d = 1; d <= r; d++) {
      const f = (o + d - 1) % 7;
      u.push({
        date: this.formatDate(s, e, d),
        day: d,
        month: e,
        year: s,
        isCurrentMonth: !0,
        isToday: this.isToday(s, e, d),
        isWeekend: this.isWeekend(s, e, d),
        dayOfWeek: f
      }), u.length === 7 && (c.push(u), u = []);
    }
    if (u.length > 0) {
      const d = e === 11 ? 0 : e + 1, f = e === 11 ? s + 1 : s;
      let p = 1;
      for (; u.length < 7; )
        u.push({
          date: this.formatDate(f, d, p),
          day: p,
          month: d,
          year: f,
          isCurrentMonth: !1,
          isToday: this.isToday(f, d, p),
          isWeekend: this.isWeekend(f, d, p),
          dayOfWeek: (u.length + t) % 7
        }), p++;
      c.push(u);
    }
    return c;
  },
  /**
   * Format a date as YYYY-MM-DD.
   */
  formatDate(s, e, t) {
    const n = String(e + 1).padStart(2, "0"), i = String(t).padStart(2, "0");
    return `${s}-${n}-${i}`;
  },
  /**
   * Parse a date string (YYYY-MM-DD) to date components.
   */
  parseDate(s) {
    const [e, t, n] = s.split("-").map(Number);
    return { year: e, month: t - 1, day: n };
  },
  /**
   * Check if a date is today.
   */
  isToday(s, e, t) {
    const n = /* @__PURE__ */ new Date();
    return n.getFullYear() === s && n.getMonth() === e && n.getDate() === t;
  },
  /**
   * Check if a date is a weekend.
   */
  isWeekend(s, e, t) {
    const i = new Date(s, e, t).getDay();
    return i === 0 || i === 6;
  },
  /**
   * Compare two dates.
   */
  compareDates(s, e) {
    const t = new Date(s), n = new Date(e);
    return t < n ? -1 : t > n ? 1 : 0;
  },
  /**
   * Check if date1 is before date2.
   */
  isBefore(s, e) {
    return this.compareDates(s, e) === -1;
  },
  /**
   * Check if date1 is after date2.
   */
  isAfter(s, e) {
    return this.compareDates(s, e) === 1;
  },
  /**
   * Check if two dates are the same.
   */
  isSameDate(s, e) {
    return this.compareDates(s, e) === 0;
  },
  /**
   * Get an array of day names.
   */
  getDayNames(s = 0, e = "en-US", t = "short") {
    const n = new Date(2024, 0, 7), i = [];
    for (let r = 0; r < 7; r++) {
      const o = new Date(n);
      o.setDate(n.getDate() + (r + s) % 7);
      const a = new Intl.DateTimeFormat(e, { weekday: t });
      i.push(a.format(o));
    }
    return i;
  },
  /**
   * Get the current date as YYYY-MM-DD.
   */
  today() {
    const s = /* @__PURE__ */ new Date();
    return this.formatDate(s.getFullYear(), s.getMonth(), s.getDate());
  },
  /**
   * Get the start and end dates of the week containing the given date.
   */
  getWeekRange(s, e = 0) {
    const { year: t, month: n, day: i } = this.parseDate(s), r = new Date(t, n, i), a = (r.getDay() - e + 7) % 7, l = new Date(r);
    l.setDate(r.getDate() - a);
    const h = new Date(l);
    return h.setDate(l.getDate() + 6), {
      start: this.formatDate(
        l.getFullYear(),
        l.getMonth(),
        l.getDate()
      ),
      end: this.formatDate(
        h.getFullYear(),
        h.getMonth(),
        h.getDate()
      )
    };
  },
  /**
   * Get the difference in days between two dates.
   */
  getDaysDifference(s, e) {
    const t = new Date(s), n = new Date(e), i = Math.abs(n - t);
    return Math.ceil(i / (1e3 * 60 * 60 * 24));
  },
  /**
   * Check if a date is within a range (inclusive).
   */
  isWithinRange(s, e, t) {
    return (this.isSameDate(s, e) || this.isAfter(s, e)) && (this.isSameDate(s, t) || this.isBefore(s, t));
  }
}, we = {
  /**
   * Format a date using predefined formats.
   */
  format(s, e = "medium", t = "en-US") {
    const n = new Date(s);
    switch (e) {
      case "short":
        return this.shortFormat(n, t);
      case "medium":
        return this.mediumFormat(n, t);
      case "long":
        return this.longFormat(n, t);
      case "full":
        return this.fullFormat(n, t);
      case "iso":
        return n.toISOString();
      case "iso_date":
        return s.split("T")[0];
      default:
        return n.toLocaleDateString(t);
    }
  },
  /**
   * Format date in short format (e.g., "11/14/2025" or "14/11/2025").
   */
  shortFormat(s, e = "en-US") {
    return new Intl.DateTimeFormat(e, {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).format(s);
  },
  /**
   * Format date in medium format (e.g., "Nov 14, 2025").
   */
  mediumFormat(s, e = "en-US") {
    return new Intl.DateTimeFormat(e, {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(s);
  },
  /**
   * Format date in long format (e.g., "November 14, 2025").
   */
  longFormat(s, e = "en-US") {
    return new Intl.DateTimeFormat(e, {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(s);
  },
  /**
   * Format date in full format (e.g., "Thursday, November 14, 2025").
   */
  fullFormat(s, e = "en-US") {
    return new Intl.DateTimeFormat(e, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(s);
  },
  /**
   * Format time (e.g., "3:45 PM" or "15:45").
   */
  formatTime(s, e = !1, t = "en-US") {
    const n = new Date(s);
    return new Intl.DateTimeFormat(t, {
      hour: "numeric",
      minute: "2-digit",
      hour12: !e
    }).format(n);
  },
  /**
   * Format datetime.
   */
  formatDateTime(s, e = "medium", t = !1, n = "en-US") {
    const i = new Date(s);
    return new Intl.DateTimeFormat(n, {
      year: "numeric",
      month: e === "short" ? "numeric" : e === "long" ? "long" : "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: !t
    }).format(i);
  },
  /**
   * Format date relative to now (approximate).
   */
  relative(s, e = "en-US") {
    const t = new Date(s), i = /* @__PURE__ */ new Date() - t, r = Math.floor(i / 1e3), o = Math.floor(r / 60), a = Math.floor(o / 60), l = Math.floor(a / 24);
    if (typeof Intl.RelativeTimeFormat < "u") {
      const h = new Intl.RelativeTimeFormat(e, { numeric: "auto" });
      return l > 0 ? h.format(-l, "day") : a > 0 ? h.format(-a, "hour") : o > 0 ? h.format(-o, "minute") : h.format(-r, "second");
    }
    return l > 0 ? `${l} day${l > 1 ? "s" : ""} ago` : a > 0 ? `${a} hour${a > 1 ? "s" : ""} ago` : o > 0 ? `${o} minute${o > 1 ? "s" : ""} ago` : "just now";
  },
  /**
   * Get localized month name.
   */
  getMonthName(s, e = "long", t = "en-US") {
    const n = new Date(2024, s, 1);
    return new Intl.DateTimeFormat(t, { month: e }).format(n);
  },
  /**
   * Get localized day name.
   */
  getDayName(s, e = "long", t = "en-US") {
    const n = new Date(2024, 0, 7 + s);
    return new Intl.DateTimeFormat(t, { weekday: e }).format(n);
  },
  /**
   * Get all month names for a locale.
   */
  getMonthNames(s = "long", e = "en-US") {
    const t = [];
    for (let n = 0; n < 12; n++)
      t.push(this.getMonthName(n, s, e));
    return t;
  },
  /**
   * Get all day names for a locale.
   */
  getDayNames(s = "long", e = "en-US", t = 0) {
    const n = [];
    for (let i = 0; i < 7; i++) {
      const r = (i + t) % 7;
      n.push(this.getDayName(r, s, e));
    }
    return n;
  },
  /**
   * Format a date range.
   */
  formatRange(s, e, t = "medium", n = "en-US") {
    const i = new Date(s), r = new Date(e);
    if (typeof Intl.DateTimeFormat.prototype.formatRange < "u") {
      const o = t === "short" ? { year: "numeric", month: "numeric", day: "numeric" } : t === "long" ? { year: "numeric", month: "long", day: "numeric" } : { year: "numeric", month: "short", day: "numeric" };
      return new Intl.DateTimeFormat(n, o).formatRange(i, r);
    }
    return `${this.format(s, t, n)} – ${this.format(e, t, n)}`;
  },
  /**
   * Check if the locale uses RTL direction.
   */
  isRTL(s = "en-US") {
    return s.startsWith("ar") || s.startsWith("he");
  },
  /**
   * Get the first day of week for a locale.
   */
  getFirstDayOfWeek(s = "en-US") {
    return s.startsWith("ar") ? 6 : s.startsWith("fr") ? 1 : 0;
  },
  /**
   * Parse a date string to components.
   */
  parse(s, e = "iso") {
    if (e === "iso") {
      const [n, i, r] = s.split("-").map(Number);
      return { year: n, month: i - 1, day: r };
    }
    const t = new Date(s);
    return {
      year: t.getFullYear(),
      month: t.getMonth(),
      day: t.getDate()
    };
  },
  /**
   * Get ARIA label for a date (for accessibility).
   */
  getAriaLabel(s, e = "en-US") {
    const t = new Date(s);
    return this.fullFormat(t, e);
  }
};
function aa(s = {}) {
  const e = (/* @__PURE__ */ new Date()).getMonth(), t = (/* @__PURE__ */ new Date()).getFullYear(), n = e === 11 ? 0 : e + 1, i = e === 11 ? t + 1 : t;
  return {
    mode: s.mode ?? "single",
    value: s.value ?? (s.mode === "multiple" ? [] : s.mode === "range" ? { start: null, end: null } : ""),
    name: s.name || null,
    displayMonth: e,
    displayYear: t,
    displayMonth2: n,
    displayYear2: i,
    weeks: [],
    dayNames: [],
    monthName: we.getMonthName((/* @__PURE__ */ new Date()).getMonth(), "long", s.locale ?? "en-US"),
    month2Name: we.getMonthName(n, "long", s.locale ?? "en-US"),
    month2Weeks: C.generateMonthGrid(i, n, s.firstDayOfWeek ?? 0),
    locale: s.locale ?? "en-US",
    firstDayOfWeek: s.firstDayOfWeek ?? 0,
    minDate: s.minDate ?? null,
    maxDate: s.maxDate ?? null,
    disabledDates: s.disabledDates ?? [],
    disabledDaysOfWeek: s.disabledDaysOfWeek ?? [],
    maxRange: s.maxRange ?? null,
    minRange: s.minRange ?? null,
    maxDates: s.maxDates ?? null,
    hoveredDate: null,
    selectionAnnouncement: "",
    get monthNames() {
      return we.getMonthNames("short", this.locale);
    },
    canNavigatePreviousMonth() {
      if (!this.minDate)
        return !0;
      let r = this.displayMonth - 1, o = this.displayYear;
      r < 0 && (r = 11, o--);
      const a = new Date(o, r, 1), l = new Date(this.minDate);
      return a >= l;
    },
    canNavigateNextMonth() {
      if (!this.maxDate)
        return !0;
      let r = this.displayMonth + 1, o = this.displayYear;
      r > 11 && (r = 0, o++);
      const a = new Date(o, r, 1), l = new Date(this.maxDate);
      return a <= l;
    },
    canNavigatePreviousMonth2() {
      let r = this.displayMonth2 - 1, o = this.displayYear2;
      r < 0 && (r = 11, o--);
      const a = new Date(this.displayYear, this.displayMonth, 1);
      return new Date(o, r, 1) > a;
    },
    canNavigateNextMonth2() {
      if (!this.maxDate)
        return !0;
      let r = this.displayMonth2 + 1, o = this.displayYear2;
      r > 11 && (r = 0, o++);
      const a = new Date(o, r, 1), l = new Date(this.maxDate);
      return a <= l;
    },
    isRangeValue(r) {
      return r && typeof r == "object" && !Array.isArray(r) && "start" in r && "end" in r;
    },
    isMultipleValue(r) {
      return Array.isArray(r);
    },
    normalizeValue(r) {
      return this.mode === "range" ? this.isRangeValue(r) ? r : { start: null, end: null } : this.mode === "multiple" ? this.isMultipleValue(r) ? r : [] : r ?? "";
    },
    updateCalendar() {
      this.weeks = C.generateMonthGrid(
        this.displayYear,
        this.displayMonth,
        this.firstDayOfWeek
      ), this.dayNames = C.getDayNames(
        this.firstDayOfWeek,
        this.locale,
        "short"
      ), this.monthName = we.getMonthName(this.displayMonth, "long", this.locale);
    },
    updateCalendar2() {
      this.month2Weeks = C.generateMonthGrid(
        this.displayYear2,
        this.displayMonth2,
        this.firstDayOfWeek
      ), this.month2Name = we.getMonthName(this.displayMonth2, "long", this.locale);
    },
    nextMonth() {
      this.displayMonth++, this.displayMonth > 11 && (this.displayMonth = 0, this.displayYear++), this.updateCalendar();
      const r = new Date(this.displayYear, this.displayMonth, 1), o = new Date(this.displayYear2, this.displayMonth2, 1);
      r >= o && (this.displayMonth2 = this.displayMonth + 1, this.displayMonth2 > 11 ? (this.displayMonth2 = 0, this.displayYear2 = this.displayYear + 1) : this.displayYear2 = this.displayYear, this.updateCalendar2());
    },
    previousMonth() {
      this.displayMonth--, this.displayMonth < 0 && (this.displayMonth = 11, this.displayYear--), this.updateCalendar();
    },
    nextMonth2() {
      this.displayMonth2++, this.displayMonth2 > 11 && (this.displayMonth2 = 0, this.displayYear2++), this.updateCalendar2();
    },
    previousMonth2() {
      this.displayMonth2--, this.displayMonth2 < 0 && (this.displayMonth2 = 11, this.displayYear2--), this.updateCalendar2();
      const r = new Date(this.displayYear, this.displayMonth, 1);
      new Date(this.displayYear2, this.displayMonth2, 1) <= r && (this.displayMonth = this.displayMonth2 - 1, this.displayMonth < 0 ? (this.displayMonth = 11, this.displayYear = this.displayYear2 - 1) : this.displayYear = this.displayYear2, this.updateCalendar());
    },
    validateMonth2Position() {
      const r = new Date(this.displayYear, this.displayMonth, 1), o = new Date(this.displayYear2, this.displayMonth2, 1);
      console.log("[validateMonth2Position] Comparing:", {
        month1: { month: this.displayMonth, year: this.displayYear, date: r },
        month2: { month: this.displayMonth2, year: this.displayYear2, date: o },
        month2BeforeMonth1: o < r
      }), o < r ? (console.log("[validateMonth2Position] VALIDATION TRIGGERED - month2 is before month1, resetting..."), this.displayMonth2 = this.displayMonth + 1, this.displayMonth2 > 11 ? (this.displayMonth2 = 0, this.displayYear2 = this.displayYear + 1) : this.displayYear2 = this.displayYear, console.log("[validateMonth2Position] AFTER reset:", { displayMonth2: this.displayMonth2, displayYear2: this.displayYear2 })) : console.log("[validateMonth2Position] No validation needed - month2 is valid");
    },
    selectDate(r) {
      const o = this.findDayByDate(r);
      if (this.isDisabled(o)) return;
      const a = this.value;
      this.mode === "single" ? (this.value = r, this.$dispatch(k.DATE_SELECTED, M({
        id: this.$id("calendar"),
        name: this.name,
        value: r,
        previousValue: a
      }))) : this.mode === "range" ? this.selectRangeDate(r) : this.mode === "multiple" && this.toggleMultipleDate(r);
    },
    selectRangeDate(r) {
      if (!this.isRangeValue(this.value)) {
        this.value = { start: r, end: null };
        return;
      }
      if (!this.value.start || this.value.start && this.value.end)
        this.value = { start: r, end: null };
      else {
        const o = this.value.start, a = r;
        C.isBefore(a, o) ? this.value = { start: a, end: o } : this.value = { start: o, end: a }, this.isRangeValid(this.value.start, this.value.end) || (this.value = { start: r, end: null });
      }
    },
    toggleMultipleDate(r) {
      const o = this.isMultipleValue(this.value) ? [...this.value] : [], a = o.indexOf(r);
      if (a > -1)
        o.splice(a, 1);
      else {
        if (this.maxDates && o.length >= this.maxDates)
          return;
        o.push(r);
      }
      this.value = o;
    },
    handleDateHover(r) {
      this.mode === "range" && this.isRangeValue(this.value) && this.value.start && !this.value.end && (this.hoveredDate = r);
    },
    clearHover() {
      this.hoveredDate = null;
    },
    findDayByDate(r) {
      for (const o of this.weeks) {
        const a = o.find((l) => l.date === r);
        if (a) return a;
      }
      if (this.month2Weeks)
        for (const o of this.month2Weeks) {
          const a = o.find((l) => l.date === r);
          if (a) return a;
        }
      return null;
    },
    isDisabled(r) {
      return !!(!r || this.minDate && C.isBefore(r.date, this.minDate) || this.maxDate && C.isAfter(r.date, this.maxDate) || this.disabledDates.includes(r.date) || this.disabledDaysOfWeek.includes(r.dayOfWeek));
    },
    getAriaLabel(r) {
      return we.getAriaLabel(r.date, this.locale);
    },
    isRangeValid(r, o) {
      if (!r || !o) return !0;
      const a = C.getDaysDifference(r, o);
      return !(this.minRange !== null && a < this.minRange || this.maxRange !== null && a > this.maxRange);
    },
    isDateSelected(r) {
      return this.mode === "single" ? this.value === r : this.mode === "range" ? this.isDateInRange(r) : this.mode === "multiple" ? this.isMultipleValue(this.value) && this.value.includes(r) : !1;
    },
    isDateInRange(r) {
      return !this.isRangeValue(this.value) || !this.value.start ? !1 : this.value.end ? C.isWithinRange(r, this.value.start, this.value.end) : this.value.start === r;
    },
    isDateInPreviewRange(r) {
      if (this.mode !== "range" || !this.isRangeValue(this.value) || !this.value.start || this.value.end || !this.hoveredDate)
        return !1;
      const o = this.value.start, a = this.hoveredDate;
      return C.isBefore(a, o) ? C.isWithinRange(r, a, o) : C.isWithinRange(r, o, a);
    },
    isRangeStart(r) {
      return this.mode === "range" && this.isRangeValue(this.value) && this.value.start === r;
    },
    isRangeEnd(r) {
      return this.mode === "range" && this.isRangeValue(this.value) && this.value.end === r;
    },
    isPreviewStart(r) {
      return this.mode !== "range" || !this.isRangeValue(this.value) || !this.value.start || this.value.end || !this.hoveredDate ? !1 : this.value.start === r;
    },
    isPreviewEnd(r) {
      return this.mode !== "range" || !this.isRangeValue(this.value) || !this.value.start || this.value.end || !this.hoveredDate ? !1 : this.hoveredDate === r;
    },
    getSelectionCount() {
      return this.mode === "multiple" && this.isMultipleValue(this.value) ? this.value.length : 0;
    },
    isMaxDatesReached() {
      return this.mode === "multiple" && this.maxDates && this.getSelectionCount() >= this.maxDates;
    },
    updateSelectionAnnouncement() {
      if (this.mode === "single")
        if (this.value) {
          const r = we.getAriaLabel(this.value, this.locale);
          this.selectionAnnouncement = r;
        } else
          this.selectionAnnouncement = "";
      else if (this.mode === "range")
        if (this.isRangeValue(this.value))
          if (this.value.start && this.value.end) {
            const r = we.getAriaLabel(this.value.start, this.locale), o = we.getAriaLabel(this.value.end, this.locale);
            this.selectionAnnouncement = `Range from ${r} to ${o} selected`;
          } else if (this.value.start) {
            const r = we.getAriaLabel(this.value.start, this.locale);
            this.selectionAnnouncement = `Range start: ${r}`;
          } else
            this.selectionAnnouncement = "";
        else
          this.selectionAnnouncement = "";
      else if (this.mode === "multiple") {
        const r = this.getSelectionCount();
        r > 0 ? this.selectionAnnouncement = `${r} ${r === 1 ? "date" : "dates"} selected` : this.selectionAnnouncement = "";
      }
    },
    get hasSelection() {
      return this.mode === "single" ? this.value !== null && this.value !== "" : this.mode === "range" ? this.isRangeValue(this.value) ? this.value.start !== null || this.value.end !== null : !1 : this.mode === "multiple" ? this.isMultipleValue(this.value) && this.value.length > 0 : !1;
    }
  };
}
function la() {
  return {
    selectMonth(s) {
      this.isMonthDisabled(s, this.pickerYear) || (this.displayMonth = s, this.displayYear = this.pickerYear, this.updateCalendar(), this.showMonthYearPicker = !1);
    },
    previousYear() {
      const s = this.pickerYear - 1;
      this.isYearDisabled(s) || (this.pickerYear = s);
    },
    nextYear() {
      const s = this.pickerYear + 1;
      this.isYearDisabled(s) || (this.pickerYear = s);
    },
    isYearDisabled(s) {
      const e = (/* @__PURE__ */ new Date()).getFullYear(), t = e - lh, n = e + hh;
      if (s < t || s > n)
        return !0;
      if (this.minDate) {
        const { year: i } = C.parseDate(this.minDate);
        if (s < i)
          return !0;
      }
      if (this.maxDate) {
        const { year: i } = C.parseDate(this.maxDate);
        if (s > i)
          return !0;
      }
      return !1;
    },
    isMonthDisabled(s, e) {
      if (this.minDate) {
        const { year: t, month: n } = C.parseDate(this.minDate);
        if (e < t || e === t && s < n)
          return !0;
      }
      if (this.maxDate) {
        const { year: t, month: n } = C.parseDate(this.maxDate);
        if (e > t || e === t && s > n)
          return !0;
      }
      return !1;
    },
    initYearPicker() {
      const s = this.pickerYear;
      this.pickerDecadeStart = Math.floor(s / 12) * 12;
    },
    selectYear(s) {
      this.isYearDisabled(s) || (this.pickerYear = s, this.showYearPicker = !1);
    },
    previousDecade() {
      const s = this.pickerDecadeStart - 12;
      this.isDecadeDisabled(s) || (this.pickerDecadeStart = s);
    },
    nextDecade() {
      const s = this.pickerDecadeStart + 12;
      this.isDecadeDisabled(s) || (this.pickerDecadeStart = s);
    },
    isDecadeDisabled(s) {
      for (let e = 0; e < 12; e++)
        if (!this.isYearDisabled(s + e))
          return !1;
      return !0;
    },
    getYearRange() {
      const s = [];
      for (let e = 0; e < 12; e++)
        s.push(this.pickerDecadeStart + e);
      return s;
    }
  };
}
const ie = {
  TODAY: "today",
  YESTERDAY: "yesterday",
  LAST_7_DAYS: "last_7_days",
  LAST_14_DAYS: "last_14_days",
  LAST_30_DAYS: "last_30_days",
  LAST_60_DAYS: "last_60_days",
  LAST_90_DAYS: "last_90_days",
  THIS_WEEK: "this_week",
  LAST_WEEK: "last_week",
  THIS_MONTH: "this_month",
  LAST_MONTH: "last_month",
  THIS_QUARTER: "this_quarter",
  LAST_QUARTER: "last_quarter",
  THIS_YEAR: "this_year",
  LAST_YEAR: "last_year"
};
function _n(s, e = 0) {
  if (s && typeof s == "object") {
    if (s.start && s.end)
      return { start: s.start, end: s.end };
    if (typeof s.calculate == "function")
      return s.calculate();
  }
  const t = typeof s == "string" ? s : s?.key;
  if (!t)
    return null;
  const n = /* @__PURE__ */ new Date(), i = C;
  switch (t) {
    case ie.TODAY:
    case "today":
      return {
        start: i.today(),
        end: i.today()
      };
    case ie.YESTERDAY:
    case "yesterday": {
      const r = new Date(n);
      r.setDate(n.getDate() - 1);
      const o = i.formatDate(
        r.getFullYear(),
        r.getMonth(),
        r.getDate()
      );
      return { start: o, end: o };
    }
    case ie.LAST_7_DAYS:
    case "last_7_days": {
      const r = new Date(n);
      return r.setDate(n.getDate() - 6), {
        start: i.formatDate(
          r.getFullYear(),
          r.getMonth(),
          r.getDate()
        ),
        end: i.today()
      };
    }
    case ie.LAST_14_DAYS:
    case "last_14_days": {
      const r = new Date(n);
      return r.setDate(n.getDate() - 13), {
        start: i.formatDate(
          r.getFullYear(),
          r.getMonth(),
          r.getDate()
        ),
        end: i.today()
      };
    }
    case ie.LAST_30_DAYS:
    case "last_30_days": {
      const r = new Date(n);
      return r.setDate(n.getDate() - 29), {
        start: i.formatDate(
          r.getFullYear(),
          r.getMonth(),
          r.getDate()
        ),
        end: i.today()
      };
    }
    case ie.LAST_60_DAYS:
    case "last_60_days": {
      const r = new Date(n);
      return r.setDate(n.getDate() - 59), {
        start: i.formatDate(
          r.getFullYear(),
          r.getMonth(),
          r.getDate()
        ),
        end: i.today()
      };
    }
    case ie.LAST_90_DAYS:
    case "last_90_days": {
      const r = new Date(n);
      return r.setDate(n.getDate() - 89), {
        start: i.formatDate(
          r.getFullYear(),
          r.getMonth(),
          r.getDate()
        ),
        end: i.today()
      };
    }
    case ie.THIS_WEEK:
    case "this_week": {
      const { start: r, end: o } = i.getWeekRange(i.today(), e);
      return { start: r, end: o };
    }
    case ie.LAST_WEEK:
    case "last_week": {
      const r = new Date(n);
      r.setDate(n.getDate() - 7);
      const o = i.formatDate(
        r.getFullYear(),
        r.getMonth(),
        r.getDate()
      ), { start: a, end: l } = i.getWeekRange(o, e);
      return { start: a, end: l };
    }
    case ie.THIS_MONTH:
    case "this_month":
      return {
        start: i.formatDate(n.getFullYear(), n.getMonth(), 1),
        end: i.today()
      };
    case ie.LAST_MONTH:
    case "last_month": {
      const r = n.getMonth() === 0 ? 11 : n.getMonth() - 1, o = n.getMonth() === 0 ? n.getFullYear() - 1 : n.getFullYear(), a = new Date(o, r + 1, 0).getDate();
      return {
        start: i.formatDate(o, r, 1),
        end: i.formatDate(o, r, a)
      };
    }
    case ie.THIS_QUARTER:
    case "this_quarter": {
      const r = Math.floor(n.getMonth() / 3) * 3;
      return {
        start: i.formatDate(n.getFullYear(), r, 1),
        end: i.today()
      };
    }
    case ie.LAST_QUARTER:
    case "last_quarter": {
      const r = Math.floor(n.getMonth() / 3);
      let o, a;
      r === 0 ? (o = 9, a = n.getFullYear() - 1) : (o = (r - 1) * 3, a = n.getFullYear());
      const l = o + 2, h = new Date(a, l + 1, 0).getDate();
      return {
        start: i.formatDate(a, o, 1),
        end: i.formatDate(a, l, h)
      };
    }
    case ie.THIS_YEAR:
    case "this_year":
      return {
        start: i.formatDate(n.getFullYear(), 0, 1),
        end: i.today()
      };
    case ie.LAST_YEAR:
    case "last_year": {
      const r = n.getFullYear() - 1;
      return {
        start: i.formatDate(r, 0, 1),
        end: i.formatDate(r, 11, 31)
      };
    }
    default:
      return null;
  }
}
function Dh(s = {}) {
  return {
    ...aa(s),
    ...la(),
    todayButtonBehavior: s.todayButtonBehavior ?? "single-day",
    presets: s.presets ?? [],
    pickerYear: (/* @__PURE__ */ new Date()).getFullYear(),
    showMonthYearPicker: !1,
    showYearPicker: !1,
    pickerDecadeStart: null,
    init() {
      this.value = this.normalizeValue(this.value), this.updateCalendar(), this.updateCalendar2(), this.$watch("value", (e) => {
        if (this.value = this.normalizeValue(e), this.mode === "single" && this.value) {
          const { year: t, month: n } = C.parseDate(this.value);
          (this.displayYear !== t || this.displayMonth !== n) && (this.displayYear = t, this.displayMonth = n, this.updateCalendar());
        } else if (this.mode === "range" && this.value?.start) {
          const { year: t, month: n } = C.parseDate(this.value.start);
          (this.displayYear !== t || this.displayMonth !== n) && (this.displayYear = t, this.displayMonth = n, this.updateCalendar(), this.displayMonth2 = n === 11 ? 0 : n + 1, this.displayYear2 = n === 11 ? t + 1 : t, this.updateCalendar2());
        }
        this.updateSelectionAnnouncement();
      }), this.$watch("showMonthYearPicker", (e) => {
        e && (this.pickerYear = this.displayYear);
      }), this.$watch("showYearPicker", (e) => {
        e && this.initYearPicker();
      });
    },
    clearSelection() {
      this.mode === "single" ? this.value = "" : this.mode === "range" ? this.value = { start: null, end: null } : this.mode === "multiple" && (this.value = []), this.selectionAnnouncement = "Selection cleared";
    },
    selectToday() {
      const e = C.today();
      this.mode === "single" ? this.value = e : this.mode === "range" ? this.todayButtonBehavior === "single-day" ? this.value = { start: e, end: e } : this.value = { start: e, end: null } : this.mode === "multiple" && this.toggleMultipleDate(e), this.selectionAnnouncement = "Today selected";
    },
    selectPreset(e) {
      const t = _n(e, this.firstDayOfWeek);
      if (t) {
        this.value = { start: t.start, end: t.end };
        const { year: n, month: i } = C.parseDate(t.start);
        this.displayYear = n, this.displayMonth = i, this.updateCalendar(), this.selectionAnnouncement = `${e.label} applied`;
      }
    },
    isPresetActive(e) {
      if (this.mode !== "range" || !this.isRangeValue(this.value) || !this.value.start || !this.value.end)
        return !1;
      const t = _n(e, this.firstDayOfWeek);
      return t ? this.value.start === t.start && this.value.end === t.end : !1;
    },
    get isTodayDisabled() {
      const e = C.today(), t = this.findDayByDate(e);
      if (!t || this.isDisabled(t))
        return !0;
      if (this.mode === "single")
        return this.value === e;
      if (this.mode === "range")
        return this.isRangeValue(this.value) ? this.value.start === e && this.value.end === e : !1;
      if (this.mode === "multiple") {
        const n = this.isMultipleValue(this.value) && this.value.includes(e);
        return this.isMaxDatesReached() && !n;
      }
      return !1;
    },
    destroy() {
    }
  };
}
function Eh(s = {}) {
  return {
    ...W({
      trigger: "click",
      onInit() {
        this.parseInitialValue(), this.updateCalendar(), this.$watch("value", (e) => {
          this.parseInitialValue(), this.mode === "single" ? this.syncValueToSegments() : this.mode === "range" && this.syncRangeValueToSegments();
        }), this.mode === "single" ? this.syncValueToSegments() : this.mode === "range" ? this.syncRangeValueToSegments() : this.mode === "multiple" && this.$nextTick(() => this.setupChipsObserver()), this.$watch("showMonthYearPicker", (e) => {
          e && (this.pickerYear = this.displayYear);
        }), this.$watch("showYearPicker", (e) => {
          e && this.initYearPicker();
        });
      }
    }),
    ...aa({
      mode: s.mode || "single",
      value: s.value || (s.mode === "range" ? { start: "", end: "" } : s.mode === "multiple" ? [] : ""),
      locale: s.locale || null,
      firstDayOfWeek: s.firstDayOfWeek !== void 0 ? s.firstDayOfWeek : null,
      minDate: s.minDate || null,
      maxDate: s.maxDate || null,
      disabledDates: s.disabledDates || [],
      disabledDaysOfWeek: s.disabledDaysOfWeek || [],
      maxRange: s.maxRange || null,
      minRange: s.minRange || null,
      maxDates: s.maxDates || null
    }),
    ...la(),
    placeholder: s.placeholder || "Select date",
    todayText: s.todayText || "Today",
    clearText: s.clearText || "Clear",
    monthLabel: s.monthLabel || "Month",
    dayLabel: s.dayLabel || "Day",
    yearLabel: s.yearLabel || "Year",
    format: s.format || "auto",
    month: null,
    day: null,
    year: null,
    segmentValues: {
      month: "",
      day: "",
      year: ""
    },
    rangeSegmentValues: {
      start: { month: "", day: "", year: "" },
      end: { month: "", day: "", year: "" }
    },
    focusedSegment: null,
    pickerYear: (/* @__PURE__ */ new Date()).getFullYear(),
    showMonthYearPicker: !1,
    showYearPicker: !1,
    pickerDecadeStart: null,
    presets: s.presets ?? [],
    maxChipsDisplay: s.maxChipsDisplay ?? 3,
    visibleChipsCount: s.maxChipsDisplay ?? 3,
    chipsResizeObserver: null,
    get formattedRangeStart() {
      return this.mode !== "range" || !this.value?.start ? "" : this.formatDate(this.value.start);
    },
    get formattedRangeEnd() {
      return this.mode !== "range" || !this.value?.end ? "" : this.formatDate(this.value.end);
    },
    get formattedMultiple() {
      return this.mode !== "multiple" || !Array.isArray(this.value) || this.value.length === 0 ? "" : this.value.length === 1 ? this.formatDate(this.value[0]) : `${this.formatDate(this.value[0])} +${this.value.length - 1}`;
    },
    get selectedCount() {
      return this.mode !== "multiple" || !Array.isArray(this.value) ? 0 : this.value.length;
    },
    get selectedDates() {
      return this.mode !== "multiple" || !Array.isArray(this.value) ? [] : this.value.map((e) => ({
        value: e,
        label: this.formatDate(e)
      }));
    },
    removeDate(e) {
      this.mode !== "multiple" || !Array.isArray(this.value) || (this.value = this.value.filter((t) => t !== e));
    },
    setupChipsObserver() {
      const e = this.$refs.chipsContainer;
      !e || this.mode !== "multiple" || (this.calculateVisibleChips(), this.chipsResizeObserver = new ResizeObserver(() => {
        this.calculateVisibleChips();
      }), this.chipsResizeObserver.observe(e), this.$watch("value", () => {
        this.$nextTick(() => this.calculateVisibleChips());
      }));
    },
    calculateVisibleChips() {
      const e = this.$refs.chipsContainer;
      if (!e || this.selectedCount === 0) {
        this.visibleChipsCount = this.maxChipsDisplay;
        return;
      }
      const t = e.offsetWidth;
      if (t === 0) {
        this.visibleChipsCount = this.maxChipsDisplay;
        return;
      }
      const a = this.getDateFormatString().length * 7 + 20 + 20, l = 40, h = 6;
      let c = t - l - h, u = 0;
      for (let d = 0; d < Math.min(this.selectedCount, this.maxChipsDisplay); d++) {
        const f = a + h;
        if (c >= f)
          c -= f, u++;
        else
          break;
      }
      this.visibleChipsCount = Math.max(1, u), this.selectedCount <= u && (this.visibleChipsCount = this.selectedCount);
    },
    formatDate(e) {
      if (!e) return "";
      try {
        const t = new Date(e);
        return isNaN(t.getTime()) ? "" : new Intl.DateTimeFormat(this.getLocale(), {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }).format(t);
      } catch {
        return "";
      }
    },
    get formattedDate() {
      return this.mode !== "single" || !this.value ? "" : this.formatDate(this.value);
    },
    get segmentOrder() {
      return this.getFormatPattern().order;
    },
    get segmentSeparator() {
      return this.getFormatPattern().separator;
    },
    getLocale() {
      return this.locale || navigator.language || "en-US";
    },
    getDateFormatString() {
      if (this.format && this.format !== "auto")
        return this.format;
      const e = this.getLocale();
      for (const [t, n] of Object.entries(Dn))
        if (n.locales.some((i) => e.toLowerCase().startsWith(i.toLowerCase())))
          return t;
      return Lr;
    },
    getFormatPattern() {
      const e = this.getDateFormatString();
      return Dn[e] || Dn[Lr];
    },
    getSegmentPlaceholders() {
      const e = this.getDateFormatString();
      return {
        month: "MM",
        day: "DD",
        year: "YYYY"
      };
    },
    parseInitialValue() {
      if (this.mode === "single") {
        if (!this.value) {
          this.month = null, this.day = null, this.year = null;
          return;
        }
        const e = this.value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!e)
          return;
        this.year = parseInt(e[1], 10), this.month = parseInt(e[2], 10), this.day = parseInt(e[3], 10);
      }
    },
    getDateString() {
      if (this.month === null || this.day === null || this.year === null)
        return "";
      const e = String(this.year).padStart(4, "0"), t = String(this.month).padStart(2, "0"), n = String(this.day).padStart(2, "0");
      return `${e}-${t}-${n}`;
    },
    updateValue() {
      this.mode === "single" && (this.value = this.getDateString());
    },
    setToday() {
      const e = /* @__PURE__ */ new Date(), t = `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
      this.mode === "single" ? (this.year = e.getFullYear(), this.month = e.getMonth() + 1, this.day = e.getDate(), this.updateValue(), this.syncValueToSegments()) : this.mode === "range" ? (this.value = { start: t, end: t }, this.syncRangeValueToSegments()) : this.mode === "multiple" && (Array.isArray(this.value) || (this.value = []), this.value.includes(t) || (this.value = [...this.value, t]));
    },
    clearDate() {
      let e;
      this.mode === "single" ? (e = this.value, this.value = "", this.month = null, this.day = null, this.year = null, this.segmentValues = { month: "", day: "", year: "" }) : this.mode === "range" ? (e = this.value ? { ...this.value } : null, this.value = null, this.rangeSegmentValues = {
        start: { month: "", day: "", year: "" },
        end: { month: "", day: "", year: "" }
      }) : this.mode === "multiple" && (e = Array.isArray(this.value) ? [...this.value] : [], this.value = []), this.$dispatch(k.DATEPICKER_CLEARED, M({
        id: this.$id("datepicker"),
        value: this.value,
        previousValue: e,
        metadata: { mode: this.mode }
      })), this.hide();
    },
    syncValueToSegments() {
      this.mode === "single" && (this.segmentValues.month = this.month !== null && this.month !== void 0 ? String(this.month).padStart(2, "0") : "", this.segmentValues.day = this.day !== null && this.day !== void 0 ? String(this.day).padStart(2, "0") : "", this.segmentValues.year = this.year !== null && this.year !== void 0 ? String(this.year).padStart(4, "0") : "");
    },
    syncSegmentsToValue() {
      if (this.mode !== "single") return;
      const e = parseInt(this.segmentValues.month, 10), t = parseInt(this.segmentValues.day, 10), n = parseInt(this.segmentValues.year, 10);
      !isNaN(e) && e >= 1 && e <= 12 && (this.month = e), !isNaN(t) && t >= 1 && t <= 31 && (this.day = t), !isNaN(n) && n >= 1e3 && n <= 9999 && (this.year = n), this.updateValue();
    },
    handleSegmentInput(e, t) {
      if (this.mode !== "single") return;
      let i = t.target.value.replace(/\D/g, "");
      if (e === "month") {
        let r = parseInt(i, 10);
        i.length === 2 ? (r > 12 ? i = "12" : r < 1 && (i = "01"), this.segmentValues.month = i, this.syncSegmentsToValue(), this.focusNextSegment("month")) : i.length === 1 ? r > 1 ? (i = i.padStart(2, "0"), this.segmentValues.month = i, this.syncSegmentsToValue(), this.focusNextSegment("month")) : this.segmentValues.month = i : this.segmentValues.month = i;
      } else if (e === "day") {
        let r = parseInt(i, 10);
        i.length === 2 ? (r > 31 ? i = "31" : r < 1 && (i = "01"), this.segmentValues.day = i, this.syncSegmentsToValue(), this.focusNextSegment("day")) : i.length === 1 ? r > 3 ? (i = i.padStart(2, "0"), this.segmentValues.day = i, this.syncSegmentsToValue(), this.focusNextSegment("day")) : this.segmentValues.day = i : this.segmentValues.day = i;
      } else e === "year" && (i.length === 4 ? (this.segmentValues.year = i, this.syncSegmentsToValue()) : i.length > 4 ? (i = i.slice(0, 4), this.segmentValues.year = i, this.syncSegmentsToValue()) : this.segmentValues.year = i);
    },
    handleSegmentKeydown(e, t) {
      if (this.mode !== "single") return;
      const n = t.target;
      t.key === "ArrowLeft" ? (t.preventDefault(), this.focusPrevSegment(e)) : t.key === "ArrowRight" || t.key === "/" ? (t.preventDefault(), this.focusNextSegment(e)) : t.key === "ArrowUp" ? (t.preventDefault(), this.incrementSegment(e)) : t.key === "ArrowDown" ? (t.preventDefault(), this.decrementSegment(e)) : t.key === "Backspace" && n.value === "" && (t.preventDefault(), this.focusPrevSegment(e));
    },
    handleSegmentPaste(e) {
      if (this.mode !== "single") return;
      const t = e.clipboardData.getData("text"), n = this.parseDateString(t);
      n && (this.segmentValues.month = n.month, this.segmentValues.day = n.day, this.segmentValues.year = n.year, this.syncSegmentsToValue());
    },
    parseDateString(e) {
      for (const [t, n] of Object.entries(Dn)) {
        const i = e.match(n.regex);
        if (i) {
          const r = {};
          return t === "MM/DD/YYYY" ? (r.month = i[1].padStart(2, "0"), r.day = i[2].padStart(2, "0"), r.year = i[3]) : t === "DD/MM/YYYY" ? (r.day = i[1].padStart(2, "0"), r.month = i[2].padStart(2, "0"), r.year = i[3]) : t === "YYYY-MM-DD" && (r.year = i[1], r.month = i[2].padStart(2, "0"), r.day = i[3].padStart(2, "0")), r;
        }
      }
      return null;
    },
    focusNextSegment(e) {
      if (this.mode !== "single") return;
      const n = this.segmentOrder.indexOf(e) + 1;
      if (n < this.segmentOrder.length) {
        const i = this.segmentOrder[n], r = this.$refs[`${i}Segment`];
        r && this.$nextTick(() => {
          r.focus(), r.select && r.select();
        });
      }
    },
    focusPrevSegment(e) {
      if (this.mode !== "single") return;
      const n = this.segmentOrder.indexOf(e) - 1;
      if (n >= 0) {
        const i = this.segmentOrder[n], r = this.$refs[`${i}Segment`];
        r && this.$nextTick(() => {
          r.focus(), r.select && r.select();
        });
      }
    },
    incrementSegment(e) {
      if (this.mode === "single") {
        if (e === "month") {
          const t = parseInt(this.segmentValues.month, 10) || 1, n = t >= 12 ? 1 : t + 1;
          this.segmentValues.month = String(n).padStart(2, "0");
        } else if (e === "day") {
          const t = parseInt(this.segmentValues.day, 10) || 1, n = t >= 31 ? 1 : t + 1;
          this.segmentValues.day = String(n).padStart(2, "0");
        } else if (e === "year") {
          const t = parseInt(this.segmentValues.year, 10) || (/* @__PURE__ */ new Date()).getFullYear();
          this.segmentValues.year = String(t + 1).padStart(4, "0");
        }
        this.syncSegmentsToValue();
      }
    },
    decrementSegment(e) {
      if (this.mode === "single") {
        if (e === "month") {
          const t = parseInt(this.segmentValues.month, 10) || 1, n = t <= 1 ? 12 : t - 1;
          this.segmentValues.month = String(n).padStart(2, "0");
        } else if (e === "day") {
          const t = parseInt(this.segmentValues.day, 10) || 1, n = t <= 1 ? 31 : t - 1;
          this.segmentValues.day = String(n).padStart(2, "0");
        } else if (e === "year") {
          const t = parseInt(this.segmentValues.year, 10) || (/* @__PURE__ */ new Date()).getFullYear();
          this.segmentValues.year = String(t - 1).padStart(4, "0");
        }
        this.syncSegmentsToValue();
      }
    },
    syncRangeValueToSegments() {
      if (this.mode === "range") {
        if (this.value?.start) {
          const { month: e, day: t, year: n } = C.parseDate(this.value.start);
          this.rangeSegmentValues.start.month = String(e).padStart(2, "0"), this.rangeSegmentValues.start.day = String(t).padStart(2, "0"), this.rangeSegmentValues.start.year = String(n).padStart(4, "0");
        } else
          this.rangeSegmentValues.start = { month: "", day: "", year: "" };
        if (this.value?.end) {
          const { month: e, day: t, year: n } = C.parseDate(this.value.end);
          this.rangeSegmentValues.end.month = String(e).padStart(2, "0"), this.rangeSegmentValues.end.day = String(t).padStart(2, "0"), this.rangeSegmentValues.end.year = String(n).padStart(4, "0");
        } else
          this.rangeSegmentValues.end = { month: "", day: "", year: "" };
      }
    },
    syncRangeSegmentsToValue(e) {
      if (this.mode !== "range") return;
      const t = this.rangeSegmentValues[e], n = parseInt(t.month, 10), i = parseInt(t.day, 10), r = parseInt(t.year, 10);
      if (!isNaN(n) && n >= 1 && n <= 12 && !isNaN(i) && i >= 1 && i <= 31 && !isNaN(r) && r >= 1e3 && r <= 9999) {
        const o = `${r}-${String(n).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        (!this.value || typeof this.value != "object") && (this.value = { start: null, end: null }), this.value[e] = o;
      }
    },
    handleRangeSegmentInput(e, t, n) {
      if (this.mode !== "range") return;
      let r = n.target.value.replace(/\D/g, "");
      if (e === "month") {
        let o = parseInt(r, 10);
        r.length === 2 ? (o > 12 ? r = "12" : o < 1 && (r = "01"), this.rangeSegmentValues[t].month = r, this.syncRangeSegmentsToValue(t), this.focusNextRangeSegment("month", t)) : r.length === 1 ? o > 1 ? (r = r.padStart(2, "0"), this.rangeSegmentValues[t].month = r, this.syncRangeSegmentsToValue(t), this.focusNextRangeSegment("month", t)) : this.rangeSegmentValues[t].month = r : this.rangeSegmentValues[t].month = r;
      } else if (e === "day") {
        let o = parseInt(r, 10);
        r.length === 2 ? (o > 31 ? r = "31" : o < 1 && (r = "01"), this.rangeSegmentValues[t].day = r, this.syncRangeSegmentsToValue(t), this.focusNextRangeSegment("day", t)) : r.length === 1 ? o > 3 ? (r = r.padStart(2, "0"), this.rangeSegmentValues[t].day = r, this.syncRangeSegmentsToValue(t), this.focusNextRangeSegment("day", t)) : this.rangeSegmentValues[t].day = r : this.rangeSegmentValues[t].day = r;
      } else e === "year" && (r.length === 4 ? (this.rangeSegmentValues[t].year = r, this.syncRangeSegmentsToValue(t)) : r.length > 4 ? (r = r.slice(0, 4), this.rangeSegmentValues[t].year = r, this.syncRangeSegmentsToValue(t)) : this.rangeSegmentValues[t].year = r);
    },
    handleRangeSegmentKeydown(e, t, n) {
      if (this.mode !== "range") return;
      const i = n.target;
      n.key === "ArrowLeft" ? (n.preventDefault(), this.focusPrevRangeSegment(e, t)) : n.key === "ArrowRight" || n.key === "/" ? (n.preventDefault(), this.focusNextRangeSegment(e, t)) : n.key === "ArrowUp" ? (n.preventDefault(), this.incrementRangeSegment(e, t)) : n.key === "ArrowDown" ? (n.preventDefault(), this.decrementRangeSegment(e, t)) : n.key === "Backspace" && i.value === "" && (n.preventDefault(), this.focusPrevRangeSegment(e, t));
    },
    handleRangeSegmentPaste(e, t) {
      if (this.mode !== "range") return;
      const n = t.clipboardData.getData("text"), i = this.parseDateString(n);
      i && (this.rangeSegmentValues[e].month = i.month, this.rangeSegmentValues[e].day = i.day, this.rangeSegmentValues[e].year = i.year, this.syncRangeSegmentsToValue(e));
    },
    focusNextRangeSegment(e, t) {
      const n = this.segmentOrder, i = n.indexOf(e);
      if (i < n.length - 1) {
        const r = n[i + 1], o = `rangeSegment_${t}_${r}`;
        this.$refs[o] && (this.$refs[o].focus(), this.$refs[o].select());
      } else if (t === "start") {
        const o = `rangeSegment_end_${n[0]}`;
        this.$refs[o] && (this.$refs[o].focus(), this.$refs[o].select());
      }
    },
    focusPrevRangeSegment(e, t) {
      const n = this.segmentOrder, i = n.indexOf(e);
      if (i > 0) {
        const r = n[i - 1], o = `rangeSegment_${t}_${r}`;
        this.$refs[o] && (this.$refs[o].focus(), this.$refs[o].select());
      } else if (t === "end") {
        const o = `rangeSegment_start_${n[n.length - 1]}`;
        this.$refs[o] && (this.$refs[o].focus(), this.$refs[o].select());
      }
    },
    incrementRangeSegment(e, t) {
      if (e === "month") {
        const n = parseInt(this.rangeSegmentValues[t].month, 10) || 1, i = n >= 12 ? 1 : n + 1;
        this.rangeSegmentValues[t].month = String(i).padStart(2, "0");
      } else if (e === "day") {
        const n = parseInt(this.rangeSegmentValues[t].day, 10) || 1, i = n >= 31 ? 1 : n + 1;
        this.rangeSegmentValues[t].day = String(i).padStart(2, "0");
      } else if (e === "year") {
        const n = parseInt(this.rangeSegmentValues[t].year, 10) || (/* @__PURE__ */ new Date()).getFullYear();
        this.rangeSegmentValues[t].year = String(n + 1).padStart(4, "0");
      }
      this.syncRangeSegmentsToValue(t);
    },
    decrementRangeSegment(e, t) {
      if (e === "month") {
        const n = parseInt(this.rangeSegmentValues[t].month, 10) || 1, i = n <= 1 ? 12 : n - 1;
        this.rangeSegmentValues[t].month = String(i).padStart(2, "0");
      } else if (e === "day") {
        const n = parseInt(this.rangeSegmentValues[t].day, 10) || 1, i = n <= 1 ? 31 : n - 1;
        this.rangeSegmentValues[t].day = String(i).padStart(2, "0");
      } else if (e === "year") {
        const n = parseInt(this.rangeSegmentValues[t].year, 10) || (/* @__PURE__ */ new Date()).getFullYear();
        this.rangeSegmentValues[t].year = String(n - 1).padStart(4, "0");
      }
      this.syncRangeSegmentsToValue(t);
    },
    handleCalendarSelect(e) {
      this.value = e, this.mode === "single" ? (this.parseInitialValue(), this.syncValueToSegments(), this.hide()) : this.mode === "range" && e.end && this.hide();
    },
    selectPreset(e) {
      const t = _n(e, this.firstDayOfWeek);
      if (t) {
        this.value = { start: t.start, end: t.end };
        const { year: n, month: i } = C.parseDate(t.start);
        this.displayYear = n, this.displayMonth = i, this.updateCalendar(), this.selectionAnnouncement = `${e.label} applied`;
      }
    },
    isPresetActive(e) {
      if (this.mode !== "range" || !this.isRangeValue(this.value) || !this.value.start || !this.value.end)
        return !1;
      const t = _n(e, this.firstDayOfWeek);
      return t ? this.value.start === t.start && this.value.end === t.end : !1;
    },
    destroy() {
      this.chipsResizeObserver && this.chipsResizeObserver.disconnect(), W().destroy?.call(this);
    }
  };
}
function Ch(s = {}) {
  return {
    ...W({
      trigger: "click",
      onInit() {
        this.detectLocaleSettings(), this.generateTimeOptions(), this.parseInitialValue(), this.$watch("value", (e) => {
          this.parseInitialValue(), this.syncValueToSegments();
        }), this.$watch("open", (e) => {
          e && this.$nextTick(() => {
            this.scrollToSelected(), this.setupScrollendListeners();
          });
        }), this.syncValueToSegments();
      }
    }),
    setupScrollendListeners() {
      "onscrollend" in window && ["hour", "minute", "second", "period"].forEach((e) => {
        const t = this.$refs[`${e}Column`];
        if (t && !t.dataset.scrollendAttached) {
          const n = () => {
            this.selectCenteredItem(e);
          };
          t.addEventListener("scrollend", n), t.dataset.scrollendAttached = "true", this.scrollListeners.push({ column: t, handler: n });
        }
      });
    },
    scrollListeners: [],
    value: s.value || "",
    placeholder: s.placeholder || "Select time",
    use24Hour: s.use24Hour,
    minuteStep: s.minuteStep || ce.MINUTE_STEP,
    showSeconds: s.showSeconds || ce.SHOW_SECONDS,
    nowText: s.nowText || "Now",
    clearText: s.clearText || "Clear",
    hourLabel: s.hourLabel || "Hour",
    minuteLabel: s.minuteLabel || "Minute",
    secondLabel: s.secondLabel || "Second",
    periodLabel: s.periodLabel || "AM/PM",
    hour: ce.DEFAULT_HOUR_12,
    minute: ce.DEFAULT_MINUTE,
    second: ce.DEFAULT_SECOND,
    period: ce.DEFAULT_PERIOD,
    hourOptions: [],
    minuteOptions: [],
    secondOptions: [],
    periodOptions: ce.PERIOD_OPTIONS.map((e) => ({ value: e, label: e })),
    scrollDebounce: {},
    segmentValues: {
      hour: "",
      minute: "",
      second: "",
      period: "AM"
    },
    focusedSegment: null,
    get formattedTime() {
      if (!this.value) return "";
      try {
        const e = this.getTimeString(), t = /* @__PURE__ */ new Date(`1970-01-01T${e}`);
        return isNaN(t.getTime()) ? "" : new Intl.DateTimeFormat(this.getLocale(), {
          hour: "numeric",
          minute: "2-digit",
          ...this.showSeconds && { second: "2-digit" },
          hour12: !this.use24Hour
        }).format(t);
      } catch {
        return "";
      }
    },
    get segmentOrder() {
      const e = ["hour", "minute"];
      return this.showSeconds && e.push("second"), this.use24Hour || e.push("period"), e;
    },
    getLocale() {
      return navigator.language || "en-US";
    },
    detectLocaleSettings() {
      if (this.use24Hour === null) {
        const e = this.getLocale(), t = /* @__PURE__ */ new Date("1970-01-01T15:00:00"), n = new Intl.DateTimeFormat(e, {
          hour: "numeric",
          hour12: void 0
        }).format(t);
        this.use24Hour = !n.toLowerCase().includes("pm") && !n.toLowerCase().includes("am");
      }
    },
    generateTimeOptions() {
      this.use24Hour ? this.hourOptions = Array.from({ length: 24 }, (t, n) => ({
        value: n,
        label: String(n).padStart(2, "0")
      })) : this.hourOptions = Array.from({ length: 12 }, (t, n) => ({
        value: n + 1,
        label: String(n + 1).padStart(2, "0")
      }));
      const e = Math.floor(60 / this.minuteStep);
      this.minuteOptions = Array.from({ length: e }, (t, n) => {
        const i = n * this.minuteStep;
        return {
          value: i,
          label: String(i).padStart(2, "0")
        };
      }), this.showSeconds && (this.secondOptions = Array.from({ length: 60 }, (t, n) => ({
        value: n,
        label: String(n).padStart(2, "0")
      })));
    },
    parseInitialValue() {
      if (!this.value) {
        this.use24Hour === !1 ? (this.hour = ce.DEFAULT_HOUR_12, this.period = ce.DEFAULT_PERIOD) : this.use24Hour === !0 ? this.hour = ce.DEFAULT_HOUR_24 : (this.hour = ce.DEFAULT_HOUR_12, this.period = ce.DEFAULT_PERIOD), this.minute = ce.DEFAULT_MINUTE, this.second = ce.DEFAULT_SECOND;
        return;
      }
      const e = this.value.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
      if (!e) return;
      let t = parseInt(e[1], 10);
      const n = parseInt(e[2], 10), i = e[3] ? parseInt(e[3], 10) : 0;
      this.use24Hour ? (this.hour = t, this.minute = n, this.second = i) : (this.period = t >= 12 ? "PM" : "AM", this.hour = t % 12 || 12, this.minute = n, this.second = i);
    },
    getTimeString() {
      let e = this.hour;
      this.use24Hour || (this.period === "PM" && this.hour !== 12 ? e = this.hour + 12 : this.period === "AM" && this.hour === 12 && (e = 0));
      const t = String(e).padStart(2, "0"), n = String(this.minute).padStart(2, "0"), i = String(this.second).padStart(2, "0");
      return this.showSeconds ? `${t}:${n}:${i}` : `${t}:${n}`;
    },
    updateValue() {
      this.value = this.getTimeString();
    },
    selectHour(e) {
      this.hour = e, this.updateValue(), this.$nextTick(() => {
        this.scrollToSelected("hour");
      });
    },
    selectMinute(e) {
      this.minute = e, this.updateValue(), this.$nextTick(() => {
        this.scrollToSelected("minute");
      });
    },
    selectSecond(e) {
      this.second = e, this.updateValue(), this.$nextTick(() => {
        this.scrollToSelected("second");
      });
    },
    selectPeriod(e) {
      this.period = e, this.updateValue(), this.$nextTick(() => {
        this.scrollToSelected("period");
      });
    },
    setNow() {
      const e = /* @__PURE__ */ new Date();
      this.hour = this.use24Hour ? e.getHours() : e.getHours() % 12 || 12, this.minute = Math.floor(e.getMinutes() / this.minuteStep) * this.minuteStep, this.second = e.getSeconds(), this.period = e.getHours() >= 12 ? "PM" : "AM", this.updateValue(), this.$nextTick(() => {
        this.scrollToSelected();
      });
    },
    clearTime() {
      this.value = "", this.hide();
    },
    updateItemStyles(e) {
      const t = this.$refs[`${e}Column`];
      if (!t) return;
      const n = t.getBoundingClientRect(), i = n.top + n.height / 2, r = t.querySelectorAll(`[data-spire-time-${e}]`), o = this[e];
      r.forEach((a) => {
        const h = (e === "period" ? a.getAttribute(`data-spire-time-${e}`) : parseInt(a.getAttribute(`data-spire-time-${e}`), 10)) === o, c = a.getBoundingClientRect(), u = c.top + c.height / 2, d = Math.abs(i - u), f = Math.min(d / gh, 1), p = h ? 1 : 1 - f * 0.7, m = h ? 1 : 1 - f * 0.15;
        a.style.opacity = p, a.style.transform = `scale(${m})`;
      });
    },
    scrollToSelected(e = null) {
      (e ? [e] : ["hour", "minute", "second", "period"]).forEach((n) => {
        const i = this.$refs[`${n}Column`];
        if (!i)
          return;
        if (this[`${n}Options`].findIndex((a) => a.value === this[n]) !== -1) {
          const a = i.querySelector(`[data-spire-time-${n}="${this[n]}"]`);
          a && (a.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          }), setTimeout(() => {
            this.updateItemStyles(n);
          }, yh));
        }
      });
    },
    handleScrollHour() {
      this.updateItemStyles("hour"), "onscrollend" in window || (clearTimeout(this.scrollDebounce.hour), this.scrollDebounce.hour = setTimeout(() => {
        this.selectCenteredItem("hour");
      }, jt));
    },
    handleScrollMinute() {
      this.updateItemStyles("minute"), "onscrollend" in window || (clearTimeout(this.scrollDebounce.minute), this.scrollDebounce.minute = setTimeout(() => {
        this.selectCenteredItem("minute");
      }, jt));
    },
    handleScrollSecond() {
      this.showSeconds && (this.updateItemStyles("second"), "onscrollend" in window || (clearTimeout(this.scrollDebounce.second), this.scrollDebounce.second = setTimeout(() => {
        this.selectCenteredItem("second");
      }, jt)));
    },
    handleScrollPeriod() {
      this.use24Hour || (this.updateItemStyles("period"), "onscrollend" in window || (clearTimeout(this.scrollDebounce.period), this.scrollDebounce.period = setTimeout(() => {
        this.selectCenteredItem("period");
      }, jt)));
    },
    selectCenteredItem(e) {
      const t = this.$refs[`${e}Column`];
      if (!t)
        return;
      const n = this.$refs[`${e}Container`], i = n ? n.clientHeight : mh, r = t.scrollTop + i / 2, o = Math.floor((r - ph) / fh), a = this[`${e}Options`], l = Math.max(0, Math.min(o, a.length - 1));
      this[e] !== a[l].value && (this[e] = a[l].value, this.updateValue());
    },
    highlightNextHour() {
      const t = (this.hourOptions.findIndex((n) => n.value === this.hour) + 1) % this.hourOptions.length;
      this.selectHour(this.hourOptions[t].value);
    },
    highlightPrevHour() {
      const t = (this.hourOptions.findIndex((n) => n.value === this.hour) - 1 + this.hourOptions.length) % this.hourOptions.length;
      this.selectHour(this.hourOptions[t].value);
    },
    highlightFirstHour() {
      this.selectHour(this.hourOptions[0].value);
    },
    highlightLastHour() {
      this.selectHour(this.hourOptions[this.hourOptions.length - 1].value);
    },
    highlightNextMinute() {
      const t = (this.minuteOptions.findIndex((n) => n.value === this.minute) + 1) % this.minuteOptions.length;
      this.selectMinute(this.minuteOptions[t].value);
    },
    highlightPrevMinute() {
      const t = (this.minuteOptions.findIndex((n) => n.value === this.minute) - 1 + this.minuteOptions.length) % this.minuteOptions.length;
      this.selectMinute(this.minuteOptions[t].value);
    },
    highlightFirstMinute() {
      this.selectMinute(this.minuteOptions[0].value);
    },
    highlightLastMinute() {
      this.selectMinute(this.minuteOptions[this.minuteOptions.length - 1].value);
    },
    highlightNextSecond() {
      if (!this.showSeconds) return;
      const t = (this.secondOptions.findIndex((n) => n.value === this.second) + 1) % this.secondOptions.length;
      this.selectSecond(this.secondOptions[t].value);
    },
    highlightPrevSecond() {
      if (!this.showSeconds) return;
      const t = (this.secondOptions.findIndex((n) => n.value === this.second) - 1 + this.secondOptions.length) % this.secondOptions.length;
      this.selectSecond(this.secondOptions[t].value);
    },
    highlightFirstSecond() {
      this.showSeconds && this.selectSecond(this.secondOptions[0].value);
    },
    highlightLastSecond() {
      this.showSeconds && this.selectSecond(this.secondOptions[this.secondOptions.length - 1].value);
    },
    highlightNextPeriod() {
      this.use24Hour || this.selectPeriod(this.period === "AM" ? "PM" : "AM");
    },
    highlightPrevPeriod() {
      this.use24Hour || this.selectPeriod(this.period === "AM" ? "PM" : "AM");
    },
    highlightFirstPeriod() {
      this.use24Hour || this.selectPeriod("AM");
    },
    highlightLastPeriod() {
      this.use24Hour || this.selectPeriod("PM");
    },
    scrollUpHour() {
      this.highlightPrevHour();
    },
    scrollDownHour() {
      this.highlightNextHour();
    },
    scrollUpMinute() {
      this.highlightPrevMinute();
    },
    scrollDownMinute() {
      this.highlightNextMinute();
    },
    scrollUpSecond() {
      this.showSeconds && this.highlightPrevSecond();
    },
    scrollDownSecond() {
      this.showSeconds && this.highlightNextSecond();
    },
    scrollUpPeriod() {
      this.use24Hour || this.highlightPrevPeriod();
    },
    scrollDownPeriod() {
      this.use24Hour || this.highlightNextPeriod();
    },
    syncValueToSegments() {
      this.segmentValues.hour = this.hour !== null && this.hour !== void 0 ? String(this.hour).padStart(2, "0") : "", this.segmentValues.minute = this.minute !== null && this.minute !== void 0 ? String(this.minute).padStart(2, "0") : "", this.segmentValues.second = this.second !== null && this.second !== void 0 ? String(this.second).padStart(2, "0") : "", this.segmentValues.period = this.period || "AM";
    },
    syncSegmentsToValue() {
      const e = parseInt(this.segmentValues.hour, 10), t = parseInt(this.segmentValues.minute, 10), n = parseInt(this.segmentValues.second, 10);
      isNaN(e) || (this.hour = e), isNaN(t) || (this.minute = t), isNaN(n) || (this.second = n), this.segmentValues.period && (this.period = this.segmentValues.period), this.updateValue();
    },
    handleSegmentInput(e, t) {
      let i = t.target.value.replace(/\D/g, "");
      if (e === "hour") {
        const r = this.use24Hour ? 23 : 12;
        let o = parseInt(i, 10);
        i.length === 2 ? (o > r && (i = String(r).padStart(2, "0")), this.segmentValues.hour = i, this.syncSegmentsToValue(), this.focusNextSegment("hour")) : i.length === 1 ? this.use24Hour && o > 2 ? (i = i.padStart(2, "0"), this.segmentValues.hour = i, this.syncSegmentsToValue(), this.focusNextSegment("hour")) : !this.use24Hour && o > 1 ? (i = i.padStart(2, "0"), this.segmentValues.hour = i, this.syncSegmentsToValue(), this.focusNextSegment("hour")) : this.segmentValues.hour = i : this.segmentValues.hour = i;
      } else if (e === "minute" || e === "second") {
        let r = parseInt(i, 10);
        i.length === 2 ? (r > 59 && (i = "59"), this.segmentValues[e] = i, this.syncSegmentsToValue(), this.focusNextSegment(e)) : i.length === 1 ? r > 5 ? (i = i.padStart(2, "0"), this.segmentValues[e] = i, this.syncSegmentsToValue(), this.focusNextSegment(e)) : this.segmentValues[e] = i : this.segmentValues[e] = i;
      }
    },
    handleSegmentKeydown(e, t) {
      const n = t.target;
      t.key === "ArrowLeft" ? (t.preventDefault(), this.focusPrevSegment(e)) : t.key === "ArrowRight" ? (t.preventDefault(), this.focusNextSegment(e)) : t.key === "ArrowUp" ? (t.preventDefault(), this.incrementSegment(e)) : t.key === "ArrowDown" ? (t.preventDefault(), this.decrementSegment(e)) : t.key === "Backspace" && n.value === "" ? (t.preventDefault(), this.focusPrevSegment(e)) : t.key === ":" && (t.preventDefault(), this.focusNextSegment(e));
    },
    handleSegmentPaste(e) {
      const t = e.clipboardData.getData("text"), n = this.parseTimeString(t);
      n && (this.segmentValues.hour = n.hour, this.segmentValues.minute = n.minute, this.segmentValues.second = n.second || "", this.segmentValues.period = n.period || this.segmentValues.period, this.syncSegmentsToValue());
    },
    parseTimeString(e) {
      const t = /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i, n = e.match(t);
      if (!n) return null;
      const i = n[1].padStart(2, "0"), r = n[2], o = n[3] || "", a = n[4] ? n[4].toUpperCase() : null;
      return { hour: i, minute: r, second: o, period: a };
    },
    focusNextSegment(e) {
      const n = this.segmentOrder.indexOf(e) + 1;
      if (n < this.segmentOrder.length) {
        const i = this.segmentOrder[n], r = this.$refs[`${i}Segment`];
        r && this.$nextTick(() => {
          r.focus(), r.select && r.select();
        });
      }
    },
    focusPrevSegment(e) {
      const n = this.segmentOrder.indexOf(e) - 1;
      if (n >= 0) {
        const i = this.segmentOrder[n], r = this.$refs[`${i}Segment`];
        r && this.$nextTick(() => {
          r.focus(), r.select && r.select();
        });
      }
    },
    incrementSegment(e) {
      if (e === "hour") {
        const t = parseInt(this.segmentValues.hour, 10) || 0, n = this.use24Hour ? 23 : 12, i = this.use24Hour ? 0 : 1, r = t >= n ? i : t + 1;
        this.segmentValues.hour = String(r).padStart(2, "0");
      } else if (e === "minute") {
        const t = parseInt(this.segmentValues.minute, 10) || 0, n = t >= 59 ? 0 : t + 1;
        this.segmentValues.minute = String(n).padStart(2, "0");
      } else if (e === "second") {
        const t = parseInt(this.segmentValues.second, 10) || 0, n = t >= 59 ? 0 : t + 1;
        this.segmentValues.second = String(n).padStart(2, "0");
      }
      this.syncSegmentsToValue();
    },
    decrementSegment(e) {
      if (e === "hour") {
        const t = parseInt(this.segmentValues.hour, 10) || 0, n = this.use24Hour ? 23 : 12, i = this.use24Hour ? 0 : 1, r = t <= i ? n : t - 1;
        this.segmentValues.hour = String(r).padStart(2, "0");
      } else if (e === "minute") {
        const t = parseInt(this.segmentValues.minute, 10) || 0, n = t <= 0 ? 59 : t - 1;
        this.segmentValues.minute = String(n).padStart(2, "0");
      } else if (e === "second") {
        const t = parseInt(this.segmentValues.second, 10) || 0, n = t <= 0 ? 59 : t - 1;
        this.segmentValues.second = String(n).padStart(2, "0");
      }
      this.syncSegmentsToValue();
    },
    togglePeriod() {
      this.segmentValues.period = this.segmentValues.period === "AM" ? "PM" : "AM", this.period = this.segmentValues.period, this.updateValue();
    },
    destroy() {
      this.scrollListeners.forEach(({ column: e, handler: t }) => {
        e.removeEventListener("scrollend", t), delete e.dataset.scrollendAttached;
      }), this.scrollListeners = [], W().destroy?.call(this);
    }
  };
}
function Mh(s = {}) {
  return {
    name: s.name || null,
    dismissible: s.dismissible !== !1,
    wireName: s.wireName || null,
    dialog: null,
    eventListeners: [],
    init() {
      this.dialog = this.$el, this.wireName && (this.$watch("$wire." + this.wireName, (e) => {
        e ? this.open() : this.close();
      }), this.$wire && this.$wire[this.wireName] && this.open()), this.name && (this.addWindowListener("spire-modal-open-" + this.name, () => {
        this.open();
      }), this.addWindowListener("spire-modal-close-" + this.name, () => {
        this.close();
      }), this.addWindowListener("spire-modal-toggle-" + this.name, () => {
        this.toggle();
      })), this.addWindowListener("spire-modal-open", (e) => {
        e.detail && e.detail.name === this.name && this.open();
      }), this.addWindowListener("spire-modal-close", (e) => {
        e.detail && e.detail.name === this.name && this.close();
      }), this.addWindowListener("spire-modal-toggle", (e) => {
        e.detail && e.detail.name === this.name && this.toggle();
      }), this.dialog.addEventListener("click", (e) => {
        if (this.dismissible && e.target === this.dialog) {
          const t = this.dialog.getBoundingClientRect();
          (e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && this.cancel();
        }
      }), this.dialog.addEventListener("cancel", (e) => {
        this.dismissible ? this.cancel() : e.preventDefault();
      }), this.dialog.addEventListener("close", () => {
        this.onClose();
      }), s.onInit?.call(this);
    },
    open() {
      this.dialog.open || (this.dialog.showModal(), this.$dispatch(k.MODAL_OPENED, M({
        id: this.$id("modal"),
        name: this.name,
        value: !0
      })), this.wireName && this.$wire && this.$wire.set(this.wireName, !0));
    },
    close() {
      this.dialog.open && this.dialog.close();
    },
    toggle() {
      this.dialog.open ? this.close() : this.open();
    },
    cancel() {
      this.$dispatch(k.MODAL_CANCELLED, M({
        id: this.$id("modal"),
        name: this.name,
        value: !1
      })), this.close();
    },
    onClose() {
      this.$dispatch(k.MODAL_CLOSED, M({
        id: this.$id("modal"),
        name: this.name,
        value: !1
      })), this.wireName && this.$wire && this.$wire.set(this.wireName, !1);
    },
    addWindowListener(e, t) {
      window.addEventListener(e, t), this.eventListeners.push({ event: e, handler: t });
    },
    destroy() {
      this.eventListeners.forEach(({ event: e, handler: t }) => {
        window.removeEventListener(e, t);
      }), this.eventListeners = [];
    }
  };
}
function Ah(s = {}) {
  return {
    ...W({
      trigger: "click",
      onInit() {
        this.initializeCountries(), this.setupKeyboard(), this.$nextTick(() => {
          this.setSelectedCountry(this.selectedCountryCode), this.initializeValue();
        }), this.$watch("searchQuery", () => {
          this.$nextTick(() => {
            this.updateVirtualScroll(), this.updateItems(), this.resetHighlight();
          });
        }), this.$watch("open", (e) => {
          e ? this.$nextTick(() => {
            this.updateVirtualScroll();
            const t = this.$refs.searchInput;
            t && t.focus();
          }) : (this.searchQuery = "", this.resetHighlight());
        }), this.$watch("phoneNumber", () => {
          this.updateFullValue();
        }), this.$watch("value", (e) => {
          const t = this.getFullValue();
          e && e !== t ? this.parsePhoneNumber(e) : e || (this.phoneNumber = "", this.selectedCountryCode = s.defaultCountry || "us", this.setSelectedCountry(this.selectedCountryCode));
        });
      }
    }),
    ...Ze({
      pattern: "activedescendant",
      role: "listbox",
      itemSelector: '[role="option"]',
      orientation: "vertical",
      wrap: !0,
      onSelect(e) {
        const t = e.getAttribute("data-spire-phone-country-code");
        this.selectCountryByCode(t);
      }
    }),
    // Configuration
    selectedCountryCode: s.defaultCountry || "us",
    preferredCountries: s.preferredCountries || [],
    // State
    phoneNumber: "",
    value: s.value || "",
    searchQuery: "",
    countries: [],
    selectedCountry: null,
    // Virtual scroll state
    itemHeight: 40,
    containerHeight: 280,
    scrollTop: 0,
    visibleStart: 0,
    visibleEnd: 0,
    paddingTop: 0,
    paddingBottom: 0,
    get filteredCountries() {
      let e = this.countries;
      if (this.searchQuery) {
        const t = this.searchQuery.toLowerCase();
        e = this.countries.filter(
          (n) => n.name.toLowerCase().includes(t) || n.code.toLowerCase().includes(t) || n.dialCode.includes(t)
        );
      }
      return e;
    },
    get visibleCountries() {
      return this.filteredCountries.slice(this.visibleStart, this.visibleEnd);
    },
    get totalHeight() {
      return this.filteredCountries.length * this.itemHeight;
    },
    initializeCountries() {
      if (this.countries = s.countries || [], this.preferredCountries.length > 0) {
        const e = [], t = [];
        this.countries.forEach((n) => {
          this.preferredCountries.includes(n.code) ? e.push(n) : t.push(n);
        }), e.sort((n, i) => this.preferredCountries.indexOf(n.code) - this.preferredCountries.indexOf(i.code)), this.countries = [...e, ...t];
      }
    },
    initializeValue() {
      this.value && this.parsePhoneNumber(this.value);
    },
    parsePhoneNumber(e) {
      if (e) {
        if (e.startsWith("+")) {
          const t = this.countries.find(
            (n) => e.startsWith(n.dialCode)
          );
          t ? (this.selectedCountryCode = t.code, this.setSelectedCountry(t.code), this.phoneNumber = e.substring(t.dialCode.length).trim()) : this.phoneNumber = e;
        } else
          this.phoneNumber = e;
        this.updateFullValue();
      }
    },
    setSelectedCountry(e) {
      const t = this.countries.find((n) => n.code === e);
      t && (this.selectedCountry = t, this.selectedCountryCode = e);
    },
    selectCountryByCode(e) {
      const t = this.selectedCountryCode;
      this.setSelectedCountry(e), this.updateFullValue(), this.searchQuery = "", this.hide(), this.$dispatch(k.PHONE_INPUT_COUNTRY_CHANGED, M({
        id: this.$id("phone-input"),
        value: e,
        previousValue: t,
        metadata: {
          dialCode: this.selectedCountry?.dialCode,
          countryName: this.selectedCountry?.name
        }
      })), this.$nextTick(() => {
        this.$refs.phoneNumberInput?.focus();
      });
    },
    getFullValue() {
      return this.selectedCountry && this.phoneNumber ? `${this.selectedCountry.dialCode}${this.phoneNumber.replace(/\D/g, "")}` : this.phoneNumber ? this.phoneNumber.replace(/\D/g, "") : "";
    },
    updateFullValue() {
      this.value = this.getFullValue(), this.$dispatch(k.PHONE_INPUT_CHANGED, M({
        id: this.$id("phone-input"),
        value: this.value,
        metadata: {
          countryCode: this.selectedCountryCode,
          dialCode: this.selectedCountry?.dialCode,
          nationalNumber: this.phoneNumber
        }
      }));
    },
    handlePhoneInput(e) {
      const t = e.target.value;
      t.startsWith("+") ? this.parsePhoneNumber(t) : this.phoneNumber = t;
    },
    // Virtual scrolling
    updateVirtualScroll() {
      const t = this.filteredCountries.length;
      this.visibleStart = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - 5), this.visibleEnd = Math.min(
        t,
        Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + 5
      ), this.paddingTop = this.visibleStart * this.itemHeight, this.paddingBottom = Math.max(0, (t - this.visibleEnd) * this.itemHeight);
    },
    handleScroll(e) {
      this.scrollTop = e.target.scrollTop, this.updateVirtualScroll();
    },
    getCountryIndex(e) {
      return this.filteredCountries.findIndex((t) => t.code === e);
    },
    // Override keyboard module's updateItems to use filteredCountries instead of DOM
    updateItems() {
      this.items = this.filteredCountries.map((e) => ({
        getAttribute: (t) => t === "data-spire-phone-country-code" ? e.code : null
      }));
    },
    // Scroll highlighted item into view when using keyboard navigation
    scrollHighlightedIntoView() {
      if (this.highlightedIndex < 0) return;
      const e = this.$refs.content?.querySelector(".spire-phone-input-list");
      if (!e) return;
      const t = this.highlightedIndex * this.itemHeight, n = t + this.itemHeight, i = e.scrollTop, r = i + this.containerHeight;
      t < i ? e.scrollTop = t : n > r && (e.scrollTop = n - this.containerHeight);
    },
    // Override arrow key handlers to scroll into view
    handleArrowDown() {
      this.highlightNext(), this.scrollHighlightedIntoView();
    },
    handleArrowUp() {
      this.highlightPrev(), this.scrollHighlightedIntoView();
    },
    handleHome() {
      this.highlightFirst(), this.scrollHighlightedIntoView();
    },
    handleEnd() {
      this.highlightLast(), this.scrollHighlightedIntoView();
    },
    destroy() {
      this.hoverTimer && (clearTimeout(this.hoverTimer), this.hoverTimer = null), this.typeaheadTimeout && clearTimeout(this.typeaheadTimeout);
    }
  };
}
function Oh(s = {}) {
  return {
    // Current animated value
    currentValue: s.value || 0,
    // Target value
    targetValue: s.value || 0,
    // Animation frame ID
    animationFrame: null,
    init() {
      this.$watch("targetValue", (e) => {
        this.animateToValue(e);
      }), this.$el.addEventListener("progress:set", (e) => {
        this.setValue(e.detail.value, e.detail.max);
      });
    },
    /**
     * Set progress value
     */
    setValue(e, t = 100) {
      const n = t > 0 ? Math.min(100, Math.max(0, e / t * 100)) : 0;
      this.targetValue = n;
    },
    /**
     * Animate to target value
     */
    animateToValue(e) {
      this.animationFrame && cancelAnimationFrame(this.animationFrame);
      const t = this.currentValue, n = e - t, i = 300, r = performance.now(), o = (a) => {
        const l = a - r, h = Math.min(l / i, 1), c = 1 - Math.pow(1 - h, 3);
        this.currentValue = t + n * c, h < 1 ? this.animationFrame = requestAnimationFrame(o) : (this.currentValue = e, this.animationFrame = null);
      };
      this.animationFrame = requestAnimationFrame(o);
    },
    /**
     * Increment progress
     */
    increment(e = 10) {
      this.targetValue = Math.min(100, this.targetValue + e);
    },
    /**
     * Decrement progress
     */
    decrement(e = 10) {
      this.targetValue = Math.max(0, this.targetValue - e);
    },
    /**
     * Reset to zero
     */
    reset() {
      this.targetValue = 0;
    },
    /**
     * Complete (set to 100%)
     */
    complete() {
      this.targetValue = 100;
    },
    destroy() {
      this.animationFrame && (cancelAnimationFrame(this.animationFrame), this.animationFrame = null);
    }
  };
}
function Ih(s = {}) {
  return {
    // Current animated value
    currentValue: s.value || 0,
    // Target value
    targetValue: s.value || 0,
    // Circle circumference
    circumference: s.circumference || 0,
    // Current stroke offset
    currentOffset: s.offset || 0,
    // Animation frame ID
    animationFrame: null,
    init() {
      this.$watch("targetValue", (e) => {
        this.animateToValue(e);
      }), this.$el.addEventListener("progress:set", (e) => {
        this.setValue(e.detail.value, e.detail.max);
      });
    },
    /**
     * Set progress value
     */
    setValue(e, t = 100) {
      const n = t > 0 ? Math.min(100, Math.max(0, e / t * 100)) : 0;
      this.targetValue = n;
    },
    /**
     * Calculate offset from percentage
     */
    calculateOffset(e) {
      return this.circumference - e / 100 * this.circumference;
    },
    /**
     * Animate to target value
     */
    animateToValue(e) {
      this.animationFrame && cancelAnimationFrame(this.animationFrame);
      const t = this.currentValue, n = this.currentOffset, i = this.calculateOffset(e), r = 300, o = performance.now(), a = (l) => {
        const h = l - o, c = Math.min(h / r, 1), u = 1 - Math.pow(1 - c, 3);
        this.currentValue = t + (e - t) * u, this.currentOffset = n + (i - n) * u, c < 1 ? this.animationFrame = requestAnimationFrame(a) : (this.currentValue = e, this.currentOffset = i, this.animationFrame = null);
      };
      this.animationFrame = requestAnimationFrame(a);
    },
    /**
     * Increment progress
     */
    increment(e = 10) {
      this.targetValue = Math.min(100, this.targetValue + e);
    },
    /**
     * Decrement progress
     */
    decrement(e = 10) {
      this.targetValue = Math.max(0, this.targetValue - e);
    },
    /**
     * Reset to zero
     */
    reset() {
      this.targetValue = 0;
    },
    /**
     * Complete (set to 100%)
     */
    complete() {
      this.targetValue = 100;
    },
    destroy() {
      this.animationFrame && (cancelAnimationFrame(this.animationFrame), this.animationFrame = null);
    }
  };
}
function Nh(s = {}) {
  return {
    ...W({
      trigger: "manual",
      placement: "top",
      onInit() {
        s.onInit?.call(this);
      }
    }),
    value: s.value || 0,
    maxRating: s.maxRating || 5,
    readonly: s.readonly || !1,
    allowHalf: s.allowHalf || !1,
    showTooltip: s.showTooltip || !1,
    name: s.name || null,
    hoveredValue: null,
    tooltipTimeout: null,
    handleClick(e, t) {
      if (this.readonly)
        return;
      let n = e;
      if (this.allowHalf) {
        const i = t.currentTarget.getBoundingClientRect();
        t.clientX - i.left < i.width / 2 && (n = e - 0.5);
      }
      this.setRating(n);
    },
    handleMouseMove(e, t) {
      if (this.readonly || !this.allowHalf)
        return;
      const n = t.currentTarget.getBoundingClientRect(), r = t.clientX - n.left < n.width / 2;
      this.hoveredValue = r ? e - 0.5 : e;
    },
    setRating(e) {
      if (this.readonly)
        return;
      const t = this.value;
      this.value = e, this.$dispatch(k.RATING_CHANGED, M({
        id: this.$id("rating"),
        name: this.name,
        value: e,
        previousValue: t
      })), this.showTooltip && this.$refs.content && this.displayTooltip();
    },
    hoverRating(e, t) {
      this.readonly || (this.allowHalf ? this.handleMouseMove(e, t) : this.hoveredValue = e);
    },
    clearHover() {
      this.readonly || (this.hoveredValue = null);
    },
    reset() {
      if (this.readonly)
        return;
      const e = this.value;
      this.value = 0, this.hoveredValue = null, this.$dispatch(k.RATING_RESET, M({
        id: this.$id("rating"),
        name: this.name,
        value: 0,
        previousValue: e
      }));
    },
    displayTooltip() {
      !this.showTooltip || !this.$refs.content || (this.tooltipTimeout && clearTimeout(this.tooltipTimeout), this.show(), this.tooltipTimeout = setTimeout(() => {
        this.hide();
      }, 2e3));
    },
    isStarFilled(e) {
      const t = this.hoveredValue ?? this.value;
      return this.allowHalf, t >= e;
    },
    isStarHalf(e) {
      if (this.readonly) {
        const n = this.hoveredValue ?? this.value;
        return n >= e - 0.5 && n < e;
      }
      if (!this.allowHalf)
        return !1;
      const t = this.hoveredValue ?? this.value;
      return t >= e - 0.5 && t < e;
    },
    destroy() {
      this.tooltipTimeout && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = null), W().destroy?.call(this);
    }
  };
}
let Rh = 0;
function Lh(s = {}) {
  const e = s.trigger === "click" ? "click" : "";
  return {
    ...W({
      trigger: e,
      placement: s.placement || "top",
      offset: s.offset || 8,
      onInit() {
        this.tooltipTriggerEl = s.triggerId ? document.getElementById(s.triggerId) : this._triggerEl, this.tooltipTrigger === "hover" && this.setupTooltipHoverListeners(), this.tooltipTrigger === "click" && this.tooltipTriggerEl && this.setupTooltipClickListeners(), s.onInit?.call(this);
      }
    }),
    tooltipTriggerEl: null,
    placement: s.placement || "top",
    tooltipTrigger: s.trigger || "hover",
    get isOpen() {
      return this.open;
    },
    delay: s.delay || 300,
    duration: s.duration || null,
    hoverTimeout: null,
    hideTimeout: null,
    setupTooltipClickListeners() {
      this.tooltipTriggerEl && (this.tooltipTriggerEl.addEventListener("click", () => {
        this.toggle();
      }), this.tooltipTriggerEl.addEventListener("keydown", (t) => {
        (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.toggle()), t.key === "Escape" && this.hide();
      }));
    },
    setupTooltipHoverListeners() {
      !this.tooltipTriggerEl || !this._contentEl || (this.tooltipTriggerEl.addEventListener("mouseenter", () => {
        this.handleMouseEnter();
      }), this.tooltipTriggerEl.addEventListener("mouseleave", () => {
        this.handleMouseLeave();
      }), this.tooltipTriggerEl.addEventListener("focusin", () => {
        this.handleMouseEnter();
      }), this.tooltipTriggerEl.addEventListener("focusout", () => {
        this.handleMouseLeave();
      }));
    },
    handleMouseEnter() {
      this.hoverTimeout && clearTimeout(this.hoverTimeout), this.hoverTimeout = setTimeout(() => {
        this.show(), this.duration && this.scheduleAutoHide();
      }, this.delay);
    },
    handleMouseLeave() {
      this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null), this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), this.hide();
    },
    scheduleAutoHide() {
      this.hideTimeout && clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.duration);
    },
    setupAnchor() {
      if (!this.tooltipTriggerEl || !this._contentEl) return;
      this._stableAnchorId || (this._stableAnchorId = `anchor-tooltip-${++Rh}`);
      const t = this.tooltipTriggerEl.firstElementChild || this.tooltipTriggerEl;
      t.style.anchorName = `--${this._stableAnchorId}`, this._contentEl.style.positionAnchor = `--${this._stableAnchorId}`;
    },
    show() {
      this.setupAnchor(), this._contentEl?.showPopover(), this.duration && this.scheduleAutoHide();
    },
    hide() {
      this._contentEl?.hidePopover();
    },
    destroy() {
      this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null), this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), W().destroy?.call(this);
    }
  };
}
function X(s) {
  this.content = s;
}
X.prototype = {
  constructor: X,
  find: function(s) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === s) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(s) {
    var e = this.find(s);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(s, e, t) {
    var n = t && t != s ? this.remove(t) : this, i = n.find(s), r = n.content.slice();
    return i == -1 ? r.push(t || s, e) : (r[i + 1] = e, t && (r[i] = t)), new X(r);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(s) {
    var e = this.find(s);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new X(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(s, e) {
    return new X([s, e].concat(this.remove(s).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(s, e) {
    var t = this.remove(s).content.slice();
    return t.push(s, e), new X(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(s, e, t) {
    var n = this.remove(e), i = n.content.slice(), r = n.find(s);
    return i.splice(r == -1 ? i.length : r, 0, e, t), new X(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(s) {
    for (var e = 0; e < this.content.length; e += 2)
      s(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(s) {
    return s = X.from(s), s.size ? new X(s.content.concat(this.subtract(s).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(s) {
    return s = X.from(s), s.size ? new X(this.subtract(s).content.concat(s.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(s) {
    var e = this;
    s = X.from(s);
    for (var t = 0; t < s.content.length; t += 2)
      e = e.remove(s.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var s = {};
    return this.forEach(function(e, t) {
      s[e] = t;
    }), s;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
X.from = function(s) {
  if (s instanceof X) return s;
  var e = [];
  if (s) for (var t in s) e.push(t, s[t]);
  return new X(e);
};
function ha(s, e, t) {
  for (let n = 0; ; n++) {
    if (n == s.childCount || n == e.childCount)
      return s.childCount == e.childCount ? null : t;
    let i = s.child(n), r = e.child(n);
    if (i == r) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(r))
      return t;
    if (i.isText && i.text != r.text) {
      for (let o = 0; i.text[o] == r.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || r.content.size) {
      let o = ha(i.content, r.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function ca(s, e, t, n) {
  for (let i = s.childCount, r = e.childCount; ; ) {
    if (i == 0 || r == 0)
      return i == r ? null : { a: t, b: n };
    let o = s.child(--i), a = e.child(--r), l = o.nodeSize;
    if (o == a) {
      t -= l, n -= l;
      continue;
    }
    if (!o.sameMarkup(a))
      return { a: t, b: n };
    if (o.isText && o.text != a.text) {
      let h = 0, c = Math.min(o.text.length, a.text.length);
      for (; h < c && o.text[o.text.length - h - 1] == a.text[a.text.length - h - 1]; )
        h++, t--, n--;
      return { a: t, b: n };
    }
    if (o.content.size || a.content.size) {
      let h = ca(o.content, a.content, t - 1, n - 1);
      if (h)
        return h;
    }
    t -= l, n -= l;
  }
}
class b {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let n = 0; n < e.length; n++)
        this.size += e[n].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, n, i = 0, r) {
    for (let o = 0, a = 0; a < t; o++) {
      let l = this.content[o], h = a + l.nodeSize;
      if (h > e && n(l, i + a, r || null, o) !== !1 && l.content.size) {
        let c = a + 1;
        l.nodesBetween(Math.max(0, e - c), Math.min(l.content.size, t - c), n, i + c);
      }
      a = h;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, n, i) {
    let r = "", o = !0;
    return this.nodesBetween(e, t, (a, l) => {
      let h = a.isText ? a.text.slice(Math.max(e, l) - l, t - l) : a.isLeaf ? i ? typeof i == "function" ? i(a) : i : a.type.spec.leafText ? a.type.spec.leafText(a) : "" : "";
      a.isBlock && (a.isLeaf && h || a.isTextblock) && n && (o ? o = !1 : r += n), r += h;
    }, 0), r;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, n = e.firstChild, i = this.content.slice(), r = 0;
    for (t.isText && t.sameMarkup(n) && (i[i.length - 1] = t.withText(t.text + n.text), r = 1); r < e.content.length; r++)
      i.push(e.content[r]);
    return new b(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let n = [], i = 0;
    if (t > e)
      for (let r = 0, o = 0; o < t; r++) {
        let a = this.content[r], l = o + a.nodeSize;
        l > e && ((o < e || l > t) && (a.isText ? a = a.cut(Math.max(0, e - o), Math.min(a.text.length, t - o)) : a = a.cut(Math.max(0, e - o - 1), Math.min(a.content.size, t - o - 1))), n.push(a), i += a.nodeSize), o = l;
      }
    return new b(n, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? b.empty : e == 0 && t == this.content.length ? this : new b(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let n = this.content[e];
    if (n == t)
      return this;
    let i = this.content.slice(), r = this.size + t.nodeSize - n.nodeSize;
    return i[e] = t, new b(i, r);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new b([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new b(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, n = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, n, t), n += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return ha(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, n = e.size) {
    return ca(this, e, t, n);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return En(0, e);
    if (e == this.size)
      return En(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, n = 0; ; t++) {
      let i = this.child(t), r = n + i.nodeSize;
      if (r >= e)
        return r == e ? En(t + 1, r) : En(t, n);
      n = r;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return b.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new b(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return b.empty;
    let t, n = 0;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      n += r.nodeSize, i && r.isText && e[i - 1].sameMarkup(r) ? (t || (t = e.slice(0, i)), t[t.length - 1] = r.withText(t[t.length - 1].text + r.text)) : t && t.push(r);
    }
    return new b(t || e, n);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return b.empty;
    if (e instanceof b)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new b([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
b.empty = new b([], 0);
const Ks = { index: 0, offset: 0 };
function En(s, e) {
  return Ks.index = s, Ks.offset = e, Ks;
}
function Wn(s, e) {
  if (s === e)
    return !0;
  if (!(s && typeof s == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(s);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (s.length != e.length)
      return !1;
    for (let n = 0; n < s.length; n++)
      if (!Wn(s[n], e[n]))
        return !1;
  } else {
    for (let n in s)
      if (!(n in e) || !Wn(s[n], e[n]))
        return !1;
    for (let n in e)
      if (!(n in s))
        return !1;
  }
  return !0;
}
let V = class vi {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, n = !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      if (this.eq(r))
        return e;
      if (this.type.excludes(r.type))
        t || (t = e.slice(0, i));
      else {
        if (r.type.excludes(this.type))
          return e;
        !n && r.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), n = !0), t && t.push(r);
      }
    }
    return t || (t = e.slice()), n || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Wn(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let n = e.marks[t.type];
    if (!n)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = n.create(t.attrs);
    return n.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (!e[n].eq(t[n]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return vi.none;
    if (e instanceof vi)
      return [e];
    let t = e.slice();
    return t.sort((n, i) => n.type.rank - i.type.rank), t;
  }
};
V.none = [];
class Yn extends Error {
}
class S {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, n) {
    this.content = e, this.openStart = t, this.openEnd = n;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let n = da(this.content, e + this.openStart, t);
    return n && new S(n, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new S(ua(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return S.empty;
    let n = t.openStart || 0, i = t.openEnd || 0;
    if (typeof n != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new S(b.fromJSON(e, t.content), n, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let n = 0, i = 0;
    for (let r = e.firstChild; r && !r.isLeaf && (t || !r.type.spec.isolating); r = r.firstChild)
      n++;
    for (let r = e.lastChild; r && !r.isLeaf && (t || !r.type.spec.isolating); r = r.lastChild)
      i++;
    return new S(e, n, i);
  }
}
S.empty = new S(b.empty, 0, 0);
function ua(s, e, t) {
  let { index: n, offset: i } = s.findIndex(e), r = s.maybeChild(n), { index: o, offset: a } = s.findIndex(t);
  if (i == e || r.isText) {
    if (a != t && !s.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return s.cut(0, e).append(s.cut(t));
  }
  if (n != o)
    throw new RangeError("Removing non-flat range");
  return s.replaceChild(n, r.copy(ua(r.content, e - i - 1, t - i - 1)));
}
function da(s, e, t, n) {
  let { index: i, offset: r } = s.findIndex(e), o = s.maybeChild(i);
  if (r == e || o.isText)
    return n && !n.canReplace(i, i, t) ? null : s.cut(0, e).append(t).append(s.cut(e));
  let a = da(o.content, e - r - 1, t, o);
  return a && s.replaceChild(i, o.copy(a));
}
function Ph(s, e, t) {
  if (t.openStart > s.depth)
    throw new Yn("Inserted content deeper than insertion position");
  if (s.depth - t.openStart != e.depth - t.openEnd)
    throw new Yn("Inconsistent open depths");
  return fa(s, e, t, 0);
}
function fa(s, e, t, n) {
  let i = s.index(n), r = s.node(n);
  if (i == e.index(n) && n < s.depth - t.openStart) {
    let o = fa(s, e, t, n + 1);
    return r.copy(r.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && s.depth == n && e.depth == n) {
      let o = s.parent, a = o.content;
      return dt(o, a.cut(0, s.parentOffset).append(t.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: o, end: a } = Vh(t, s);
      return dt(r, ma(s, o, a, e, n));
    }
  else return dt(r, Un(s, e, n));
}
function pa(s, e) {
  if (!e.type.compatibleContent(s.type))
    throw new Yn("Cannot join " + e.type.name + " onto " + s.type.name);
}
function wi(s, e, t) {
  let n = s.node(t);
  return pa(n, e.node(t)), n;
}
function ut(s, e) {
  let t = e.length - 1;
  t >= 0 && s.isText && s.sameMarkup(e[t]) ? e[t] = s.withText(e[t].text + s.text) : e.push(s);
}
function Xt(s, e, t, n) {
  let i = (e || s).node(t), r = 0, o = e ? e.index(t) : i.childCount;
  s && (r = s.index(t), s.depth > t ? r++ : s.textOffset && (ut(s.nodeAfter, n), r++));
  for (let a = r; a < o; a++)
    ut(i.child(a), n);
  e && e.depth == t && e.textOffset && ut(e.nodeBefore, n);
}
function dt(s, e) {
  return s.type.checkContent(e), s.copy(e);
}
function ma(s, e, t, n, i) {
  let r = s.depth > i && wi(s, e, i + 1), o = n.depth > i && wi(t, n, i + 1), a = [];
  return Xt(null, s, i, a), r && o && e.index(i) == t.index(i) ? (pa(r, o), ut(dt(r, ma(s, e, t, n, i + 1)), a)) : (r && ut(dt(r, Un(s, e, i + 1)), a), Xt(e, t, i, a), o && ut(dt(o, Un(t, n, i + 1)), a)), Xt(n, null, i, a), new b(a);
}
function Un(s, e, t) {
  let n = [];
  if (Xt(null, s, t, n), s.depth > t) {
    let i = wi(s, e, t + 1);
    ut(dt(i, Un(s, e, t + 1)), n);
  }
  return Xt(e, null, t, n), new b(n);
}
function Vh(s, e) {
  let t = e.depth - s.openStart, i = e.node(t).copy(s.content);
  for (let r = t - 1; r >= 0; r--)
    i = e.node(r).copy(b.from(i));
  return {
    start: i.resolveNoCache(s.openStart + t),
    end: i.resolveNoCache(i.content.size - s.openEnd - t)
  };
}
class hn {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let n = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return n ? e.child(t).cut(n) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let n = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let r = 0; r < e; r++)
      i += n.child(r).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return V.none;
    if (this.textOffset)
      return e.child(t).marks;
    let n = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!n) {
      let a = n;
      n = i, i = a;
    }
    let r = n.marks;
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let n = t.marks, i = e.parent.maybeChild(e.index());
    for (var r = 0; r < n.length; r++)
      n[r].type.spec.inclusive === !1 && (!i || !n[r].isInSet(i.marks)) && (n = n[r--].removeFromSet(n));
    return n;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
      if (e.pos <= this.end(n) && (!t || t(this.node(n))))
        return new jn(this, e, n);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let n = [], i = 0, r = t;
    for (let o = e; ; ) {
      let { index: a, offset: l } = o.content.findIndex(r), h = r - l;
      if (n.push(o, a, i + l), !h || (o = o.child(a), o.isText))
        break;
      r = h - 1, i += l + 1;
    }
    return new hn(t, n, r);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let n = Fr.get(e);
    if (n)
      for (let r = 0; r < n.elts.length; r++) {
        let o = n.elts[r];
        if (o.pos == t)
          return o;
      }
    else
      Fr.set(e, n = new $h());
    let i = n.elts[n.i] = hn.resolve(e, t);
    return n.i = (n.i + 1) % Fh, i;
  }
}
class $h {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Fh = 12, Fr = /* @__PURE__ */ new WeakMap();
class jn {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, n) {
    this.$from = e, this.$to = t, this.depth = n;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Hh = /* @__PURE__ */ Object.create(null);
let qe = class Ti {
  /**
  @internal
  */
  constructor(e, t, n, i = V.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = n || b.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, n, i = 0) {
    this.content.nodesBetween(e, t, n, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, n, i) {
    return this.content.textBetween(e, t, n, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, n) {
    return this.type == e && Wn(this.attrs, t || e.defaultAttrs || Hh) && V.sameSet(this.marks, n || V.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ti(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ti(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, n = !1) {
    if (e == t)
      return S.empty;
    let i = this.resolve(e), r = this.resolve(t), o = n ? 0 : i.sharedDepth(t), a = i.start(o), h = i.node(o).content.cut(i.pos - a, r.pos - a);
    return new S(h, i.depth - o, r.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, n) {
    return Ph(this.resolve(e), this.resolve(t), n);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: n, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(n), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: n } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: n };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: n } = this.content.findIndex(e);
    if (n < e)
      return { node: this.content.child(t), index: t, offset: n };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: n - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return hn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return hn.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, n) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (r) => (n.isInSet(r.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), ga(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, n = b.empty, i = 0, r = n.childCount) {
    let o = this.contentMatchAt(e).matchFragment(n, i, r), a = o && o.matchFragment(this.content, t);
    if (!a || !a.validEnd)
      return !1;
    for (let l = i; l < r; l++)
      if (!this.type.allowsMarks(n.child(l).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, n, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let r = this.contentMatchAt(e).matchType(n), o = r && r.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = V.none;
    for (let t = 0; t < this.marks.length; t++) {
      let n = this.marks[t];
      n.type.checkAttrs(n.attrs), e = n.addToSet(e);
    }
    if (!V.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let n;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      n = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, n);
    }
    let i = b.fromJSON(e, t.content), r = e.nodeType(t.type).create(t.attrs, i, n);
    return r.type.checkAttrs(r.attrs), r;
  }
};
qe.prototype.text = void 0;
class Kn extends qe {
  /**
  @internal
  */
  constructor(e, t, n, i) {
    if (super(e, t, null, i), !n)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = n;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ga(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Kn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Kn(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function ga(s, e) {
  for (let t = s.length - 1; t >= 0; t--)
    e = s[t].type.name + "(" + e + ")";
  return e;
}
class gt {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let n = new Bh(e, t);
    if (n.next == null)
      return gt.empty;
    let i = ya(n);
    n.next && n.err("Unexpected trailing text");
    let r = Kh(jh(i));
    return Gh(r, n), r;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, n = e.childCount) {
    let i = this;
    for (let r = t; i && r < n; r++)
      i = i.matchType(e.child(r).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let n = 0; n < e.next.length; n++)
        if (this.next[t].type == e.next[n].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, n = 0) {
    let i = [this];
    function r(o, a) {
      let l = o.matchFragment(e, n);
      if (l && (!t || l.validEnd))
        return b.from(a.map((h) => h.createAndFill()));
      for (let h = 0; h < o.next.length; h++) {
        let { type: c, next: u } = o.next[h];
        if (!(c.isText || c.hasRequiredAttrs()) && i.indexOf(u) == -1) {
          i.push(u);
          let d = r(u, a.concat(c));
          if (d)
            return d;
        }
      }
      return null;
    }
    return r(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let n = 0; n < this.wrapCache.length; n += 2)
      if (this.wrapCache[n] == e)
        return this.wrapCache[n + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), n = [{ match: this, type: null, via: null }];
    for (; n.length; ) {
      let i = n.shift(), r = i.match;
      if (r.matchType(e)) {
        let o = [];
        for (let a = i; a.type; a = a.via)
          o.push(a.type);
        return o.reverse();
      }
      for (let o = 0; o < r.next.length; o++) {
        let { type: a, next: l } = r.next[o];
        !a.isLeaf && !a.hasRequiredAttrs() && !(a.name in t) && (!i.type || l.validEnd) && (n.push({ match: a.contentMatch, type: a, via: i }), t[a.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(n) {
      e.push(n);
      for (let i = 0; i < n.next.length; i++)
        e.indexOf(n.next[i].next) == -1 && t(n.next[i].next);
    }
    return t(this), e.map((n, i) => {
      let r = i + (n.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < n.next.length; o++)
        r += (o ? ", " : "") + n.next[o].type.name + "->" + e.indexOf(n.next[o].next);
      return r;
    }).join(`
`);
  }
}
gt.empty = new gt(!0);
class Bh {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function ya(s) {
  let e = [];
  do
    e.push(zh(s));
  while (s.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function zh(s) {
  let e = [];
  do
    e.push(_h(s));
  while (s.next && s.next != ")" && s.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function _h(s) {
  let e = Uh(s);
  for (; ; )
    if (s.eat("+"))
      e = { type: "plus", expr: e };
    else if (s.eat("*"))
      e = { type: "star", expr: e };
    else if (s.eat("?"))
      e = { type: "opt", expr: e };
    else if (s.eat("{"))
      e = Wh(s, e);
    else
      break;
  return e;
}
function Hr(s) {
  /\D/.test(s.next) && s.err("Expected number, got '" + s.next + "'");
  let e = Number(s.next);
  return s.pos++, e;
}
function Wh(s, e) {
  let t = Hr(s), n = t;
  return s.eat(",") && (s.next != "}" ? n = Hr(s) : n = -1), s.eat("}") || s.err("Unclosed braced range"), { type: "range", min: t, max: n, expr: e };
}
function Yh(s, e) {
  let t = s.nodeTypes, n = t[e];
  if (n)
    return [n];
  let i = [];
  for (let r in t) {
    let o = t[r];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && s.err("No node type or group '" + e + "' found"), i;
}
function Uh(s) {
  if (s.eat("(")) {
    let e = ya(s);
    return s.eat(")") || s.err("Missing closing paren"), e;
  } else if (/\W/.test(s.next))
    s.err("Unexpected token '" + s.next + "'");
  else {
    let e = Yh(s, s.next).map((t) => (s.inline == null ? s.inline = t.isInline : s.inline != t.isInline && s.err("Mixing inline and block content"), { type: "name", value: t }));
    return s.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function jh(s) {
  let e = [[]];
  return i(r(s, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function n(o, a, l) {
    let h = { term: l, to: a };
    return e[o].push(h), h;
  }
  function i(o, a) {
    o.forEach((l) => l.to = a);
  }
  function r(o, a) {
    if (o.type == "choice")
      return o.exprs.reduce((l, h) => l.concat(r(h, a)), []);
    if (o.type == "seq")
      for (let l = 0; ; l++) {
        let h = r(o.exprs[l], a);
        if (l == o.exprs.length - 1)
          return h;
        i(h, a = t());
      }
    else if (o.type == "star") {
      let l = t();
      return n(a, l), i(r(o.expr, l), l), [n(l)];
    } else if (o.type == "plus") {
      let l = t();
      return i(r(o.expr, a), l), i(r(o.expr, l), l), [n(l)];
    } else {
      if (o.type == "opt")
        return [n(a)].concat(r(o.expr, a));
      if (o.type == "range") {
        let l = a;
        for (let h = 0; h < o.min; h++) {
          let c = t();
          i(r(o.expr, l), c), l = c;
        }
        if (o.max == -1)
          i(r(o.expr, l), l);
        else
          for (let h = o.min; h < o.max; h++) {
            let c = t();
            n(l, c), i(r(o.expr, l), c), l = c;
          }
        return [n(l)];
      } else {
        if (o.type == "name")
          return [n(a, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function ba(s, e) {
  return e - s;
}
function Br(s, e) {
  let t = [];
  return n(e), t.sort(ba);
  function n(i) {
    let r = s[i];
    if (r.length == 1 && !r[0].term)
      return n(r[0].to);
    t.push(i);
    for (let o = 0; o < r.length; o++) {
      let { term: a, to: l } = r[o];
      !a && t.indexOf(l) == -1 && n(l);
    }
  }
}
function Kh(s) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Br(s, 0));
  function t(n) {
    let i = [];
    n.forEach((o) => {
      s[o].forEach(({ term: a, to: l }) => {
        if (!a)
          return;
        let h;
        for (let c = 0; c < i.length; c++)
          i[c][0] == a && (h = i[c][1]);
        Br(s, l).forEach((c) => {
          h || i.push([a, h = []]), h.indexOf(c) == -1 && h.push(c);
        });
      });
    });
    let r = e[n.join(",")] = new gt(n.indexOf(s.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let a = i[o][1].sort(ba);
      r.next.push({ type: i[o][0], next: e[a.join(",")] || t(a) });
    }
    return r;
  }
}
function Gh(s, e) {
  for (let t = 0, n = [s]; t < n.length; t++) {
    let i = n[t], r = !i.validEnd, o = [];
    for (let a = 0; a < i.next.length; a++) {
      let { type: l, next: h } = i.next[a];
      o.push(l.name), r && !(l.isText || l.hasRequiredAttrs()) && (r = !1), n.indexOf(h) == -1 && n.push(h);
    }
    r && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function xa(s) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in s) {
    let n = s[t];
    if (!n.hasDefault)
      return null;
    e[t] = n.default;
  }
  return e;
}
function Sa(s, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n in s) {
    let i = e && e[n];
    if (i === void 0) {
      let r = s[n];
      if (r.hasDefault)
        i = r.default;
      else
        throw new RangeError("No value supplied for attribute " + n);
    }
    t[n] = i;
  }
  return t;
}
function va(s, e, t, n) {
  for (let i in e)
    if (!(i in s))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in s) {
    let r = s[i];
    r.validate && r.validate(e[i]);
  }
}
function wa(s, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let n in e)
      t[n] = new Jh(s, n, e[n]);
  return t;
}
let zr = class Ta {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = wa(e, n.attrs), this.defaultAttrs = xa(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == gt.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Sa(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, n) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new qe(this, this.computeAttrs(e), b.from(t), V.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, n) {
    return t = b.from(t), this.checkContent(t), new qe(this, this.computeAttrs(e), t, V.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, n) {
    if (e = this.computeAttrs(e), t = b.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), r = i && i.fillBefore(b.empty, !0);
    return r ? new qe(this, e, t.append(r), V.setFrom(n)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let n = 0; n < e.childCount; n++)
      if (!this.allowsMarks(e.child(n).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    va(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let n = 0; n < e.length; n++)
      this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t || (t = e.slice(0, n));
    return t ? t.length ? t : V.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let n = /* @__PURE__ */ Object.create(null);
    e.forEach((r, o) => n[r] = new Ta(r, t, o));
    let i = t.spec.topNode || "doc";
    if (!n[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!n.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let r in n.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return n;
  }
};
function qh(s, e, t) {
  let n = t.split("|");
  return (i) => {
    let r = i === null ? "null" : typeof i;
    if (n.indexOf(r) < 0)
      throw new RangeError(`Expected value of type ${n} for attribute ${e} on type ${s}, got ${r}`);
  };
}
class Jh {
  constructor(e, t, n) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? qh(e, t, n.validate) : n.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Os {
  /**
  @internal
  */
  constructor(e, t, n, i) {
    this.name = e, this.rank = t, this.schema = n, this.spec = i, this.attrs = wa(e, i.attrs), this.excluded = null;
    let r = xa(this.attrs);
    this.instance = r ? new V(this, r) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new V(this, Sa(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let n = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((r, o) => n[r] = new Os(r, i++, t, o)), n;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    va(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class ka {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = X.from(e.nodes), t.marks = X.from(e.marks || {}), this.nodes = zr.compile(this.spec.nodes, this), this.marks = Os.compile(this.spec.marks, this);
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let r = this.nodes[i], o = r.spec.content || "", a = r.spec.marks;
      if (r.contentMatch = n[o] || (n[o] = gt.parse(o, this.nodes)), r.inlineContent = r.contentMatch.inlineContent, r.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!r.isInline || !r.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = r;
      }
      r.markSet = a == "_" ? null : a ? _r(this, a.split(" ")) : a == "" || !r.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let r = this.marks[i], o = r.spec.excludes;
      r.excluded = o == null ? [r] : o == "" ? [] : _r(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => qe.fromJSON(this, i), this.markFromJSON = (i) => V.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, n, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof zr) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, n, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let n = this.nodes.text;
    return new Kn(n, n.defaultAttrs, e, V.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function _r(s, e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let i = e[n], r = s.marks[i], o = r;
    if (r)
      t.push(r);
    else
      for (let a in s.marks) {
        let l = s.marks[a];
        (i == "_" || l.spec.group && l.spec.group.split(" ").indexOf(i) > -1) && t.push(o = l);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[n] + "'");
  }
  return t;
}
function Xh(s) {
  return s.tag != null;
}
function Qh(s) {
  return s.style != null;
}
let Qt = class ki {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let n = this.matchedStyles = [];
    t.forEach((i) => {
      if (Xh(i))
        this.tags.push(i);
      else if (Qh(i)) {
        let r = /[^=]*/.exec(i.style)[0];
        n.indexOf(r) < 0 && n.push(r), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let r = e.nodes[i.node];
      return r.contentMatch.matchType(r);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let n = new Yr(this, t, !1);
    return n.addAll(e, V.none, t.from, t.to), n.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let n = new Yr(this, t, !0);
    return n.addAll(e, V.none, t.from, t.to), S.maxOpen(n.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, n) {
    for (let i = n ? this.tags.indexOf(n) + 1 : 0; i < this.tags.length; i++) {
      let r = this.tags[i];
      if (tc(e, r.tag) && (r.namespace === void 0 || e.namespaceURI == r.namespace) && (!r.context || t.matchesContext(r.context))) {
        if (r.getAttrs) {
          let o = r.getAttrs(e);
          if (o === !1)
            continue;
          r.attrs = o || void 0;
        }
        return r;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, n, i) {
    for (let r = i ? this.styles.indexOf(i) + 1 : 0; r < this.styles.length; r++) {
      let o = this.styles[r], a = o.style;
      if (!(a.indexOf(e) != 0 || o.context && !n.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      a.length > e.length && (a.charCodeAt(e.length) != 61 || a.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let l = o.getAttrs(t);
          if (l === !1)
            continue;
          o.attrs = l || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function n(i) {
      let r = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let a = t[o];
        if ((a.priority == null ? 50 : a.priority) < r)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let r = e.marks[i].spec.parseDOM;
      r && r.forEach((o) => {
        n(o = Ur(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let r = e.nodes[i].spec.parseDOM;
      r && r.forEach((o) => {
        n(o = Ur(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new ki(e, ki.schemaRules(e)));
  }
};
const Da = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Zh = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ea = { ol: !0, ul: !0 }, cn = 1, Di = 2, Zt = 4;
function Wr(s, e, t) {
  return e != null ? (e ? cn : 0) | (e === "full" ? Di : 0) : s && s.whitespace == "pre" ? cn | Di : t & ~Zt;
}
class Cn {
  constructor(e, t, n, i, r, o) {
    this.type = e, this.attrs = t, this.marks = n, this.solid = i, this.options = o, this.content = [], this.activeMarks = V.none, this.match = r || (o & Zt ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(b.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let n = this.type.contentMatch, i;
        return (i = n.findWrapping(e.type)) ? (this.match = n, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & cn)) {
      let n = this.content[this.content.length - 1], i;
      if (n && n.isText && (i = /[ \t\r\n\u000c]+$/.exec(n.text))) {
        let r = n;
        n.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = r.withText(r.text.slice(0, r.text.length - i[0].length));
      }
    }
    let t = b.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(b.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Da.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Yr {
  constructor(e, t, n) {
    this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, r, o = Wr(null, t.preserveWhitespace, 0) | (n ? Zt : 0);
    i ? r = new Cn(i.type, i.attrs, V.none, !0, t.topMatch || i.type.contentMatch, o) : n ? r = new Cn(null, null, V.none, !0, null, o) : r = new Cn(e.schema.topNodeType, null, V.none, !0, null, o), this.nodes = [r], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let n = e.nodeValue, i = this.top, r = i.options & Di ? "full" : this.localPreserveWS || (i.options & cn) > 0, { schema: o } = this.parser;
    if (r === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
      if (r)
        if (r === "full")
          n = n.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let a = n.split(/\r?\n|\r/);
          for (let l = 0; l < a.length; l++)
            l && this.insertNode(o.linebreakReplacement.create(), t, !0), a[l] && this.insertNode(o.text(a[l]), t, !/\S/.test(a[l]));
          n = "";
        } else
          n = n.replace(/\r?\n|\r/g, " ");
      else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
        let a = i.content[i.content.length - 1], l = e.previousSibling;
        (!a || l && l.nodeName == "BR" || a.isText && /[ \t\r\n\u000c]$/.test(a.text)) && (n = n.slice(1));
      }
      n && this.insertNode(o.text(n), t, !/\S/.test(n)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, n) {
    let i = this.localPreserveWS, r = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), a;
    Ea.hasOwnProperty(o) && this.parser.normalizeLists && ec(e);
    let l = this.options.ruleFromNode && this.options.ruleFromNode(e) || (a = this.parser.matchTag(e, this, n));
    e: if (l ? l.ignore : Zh.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!l || l.skip || l.closeParent) {
      l && l.closeParent ? this.open = Math.max(0, this.open - 1) : l && l.skip.nodeType && (e = l.skip);
      let h, c = this.needsBlock;
      if (Da.hasOwnProperty(o))
        r.content.length && r.content[0].isInline && this.open && (this.open--, r = this.top), h = !0, r.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let u = l && l.skip ? t : this.readStyles(e, t);
      u && this.addAll(e, u), h && this.sync(r), this.needsBlock = c;
    } else {
      let h = this.readStyles(e, t);
      h && this.addElementByRule(e, l, h, l.consuming === !1 ? a : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let n = e.style;
    if (n && n.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let r = this.parser.matchedStyles[i], o = n.getPropertyValue(r);
        if (o)
          for (let a = void 0; ; ) {
            let l = this.parser.matchStyle(r, o, this, a);
            if (!l)
              break;
            if (l.ignore)
              return null;
            if (l.clearMark ? t = t.filter((h) => !l.clearMark(h)) : t = t.concat(this.parser.schema.marks[l.mark].create(l.attrs)), l.consuming === !1)
              a = l;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, n, i) {
    let r, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
      else {
        let l = this.enter(o, t.attrs || null, n, t.preserveWhitespace);
        l && (r = !0, n = l);
      }
    else {
      let l = this.parser.schema.marks[t.mark];
      n = n.concat(l.create(t.attrs));
    }
    let a = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, n, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((l) => this.insertNode(l, n, !1));
    else {
      let l = e;
      typeof t.contentElement == "string" ? l = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? l = t.contentElement(e) : t.contentElement && (l = t.contentElement), this.findAround(e, l, !0), this.addAll(l, n), this.findAround(e, l, !1);
    }
    r && this.sync(a) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, n, i) {
    let r = n || 0;
    for (let o = n ? e.childNodes[n] : e.firstChild, a = i == null ? null : e.childNodes[i]; o != a; o = o.nextSibling, ++r)
      this.findAtPoint(e, r), this.addDOM(o, t);
    this.findAtPoint(e, r);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, n) {
    let i, r;
    for (let o = this.open, a = 0; o >= 0; o--) {
      let l = this.nodes[o], h = l.findWrapping(e);
      if (h && (!i || i.length > h.length + a) && (i = h, r = l, !h.length))
        break;
      if (l.solid) {
        if (n)
          break;
        a += 2;
      }
    }
    if (!i)
      return null;
    this.sync(r);
    for (let o = 0; o < i.length; o++)
      t = this.enterInner(i[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, n) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let r = this.textblockFromContext();
      r && (t = this.enterInner(r, null, t));
    }
    let i = this.findPlace(e, t, n);
    if (i) {
      this.closeExtra();
      let r = this.top;
      r.match && (r.match = r.match.matchType(e.type));
      let o = V.none;
      for (let a of i.concat(e.marks))
        (r.type ? r.type.allowsMarkType(a.type) : jr(a.type, e.type)) && (o = a.addToSet(o));
      return r.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, n, i) {
    let r = this.findPlace(e.create(t), n, !1);
    return r && (r = this.enterInner(e, t, n, !0, i)), r;
  }
  // Open a node of the given type
  enterInner(e, t, n, i = !1, r) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let a = Wr(e, r, o.options);
    o.options & Zt && o.content.length == 0 && (a |= Zt);
    let l = V.none;
    return n = n.filter((h) => (o.type ? o.type.allowsMarkType(h.type) : jr(h.type, e)) ? (l = h.addToSet(l), !1) : !0), this.nodes.push(new Cn(e, t, l, i, null, a)), this.open++, n;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= cn);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let n = this.nodes[t].content;
      for (let i = n.length - 1; i >= 0; i--)
        e += n[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, n) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (n ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), n = this.options.context, i = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), r = -(n ? n.depth + 1 : 0) + (i ? 0 : 1), o = (a, l) => {
      for (; a >= 0; a--) {
        let h = t[a];
        if (h == "") {
          if (a == t.length - 1 || a == 0)
            continue;
          for (; l >= r; l--)
            if (o(a - 1, l))
              return !0;
          return !1;
        } else {
          let c = l > 0 || l == 0 && i ? this.nodes[l].type : n && l >= r ? n.node(l - r).type : null;
          if (!c || c.name != h && !c.isInGroup(h))
            return !1;
          l--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (n && n.isTextblock && n.defaultAttrs)
          return n;
      }
    for (let t in this.parser.schema.nodes) {
      let n = this.parser.schema.nodes[t];
      if (n.isTextblock && n.defaultAttrs)
        return n;
    }
  }
}
function ec(s) {
  for (let e = s.firstChild, t = null; e; e = e.nextSibling) {
    let n = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    n && Ea.hasOwnProperty(n) && t ? (t.appendChild(e), e = t) : n == "li" ? t = e : n && (t = null);
  }
}
function tc(s, e) {
  return (s.matches || s.msMatchesSelector || s.webkitMatchesSelector || s.mozMatchesSelector).call(s, e);
}
function Ur(s) {
  let e = {};
  for (let t in s)
    e[t] = s[t];
  return e;
}
function jr(s, e) {
  let t = e.schema.nodes;
  for (let n in t) {
    let i = t[n];
    if (!i.allowsMarkType(s))
      continue;
    let r = [], o = (a) => {
      r.push(a);
      for (let l = 0; l < a.edgeCount; l++) {
        let { type: h, next: c } = a.edge(l);
        if (h == e || r.indexOf(c) < 0 && o(c))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class vt {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, n) {
    n || (n = Gs(t).createDocumentFragment());
    let i = n, r = [];
    return e.forEach((o) => {
      if (r.length || o.marks.length) {
        let a = 0, l = 0;
        for (; a < r.length && l < o.marks.length; ) {
          let h = o.marks[l];
          if (!this.marks[h.type.name]) {
            l++;
            continue;
          }
          if (!h.eq(r[a][0]) || h.type.spec.spanning === !1)
            break;
          a++, l++;
        }
        for (; a < r.length; )
          i = r.pop()[1];
        for (; l < o.marks.length; ) {
          let h = o.marks[l++], c = this.serializeMark(h, o.isInline, t);
          c && (r.push([h, i]), i.appendChild(c.dom), i = c.contentDOM || c.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), n;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: n, contentDOM: i } = $n(Gs(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return n;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let n = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let r = this.serializeMark(e.marks[i], e.isInline, t);
      r && ((r.contentDOM || r.dom).appendChild(n), n = r.dom);
    }
    return n;
  }
  /**
  @internal
  */
  serializeMark(e, t, n = {}) {
    let i = this.marks[e.type.name];
    return i && $n(Gs(n), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, n = null, i) {
    return $n(e, t, n, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new vt(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Kr(e.nodes);
    return t.text || (t.text = (n) => n.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Kr(e.marks);
  }
}
function Kr(s) {
  let e = {};
  for (let t in s) {
    let n = s[t].spec.toDOM;
    n && (e[t] = n);
  }
  return e;
}
function Gs(s) {
  return s.document || window.document;
}
const Gr = /* @__PURE__ */ new WeakMap();
function nc(s) {
  let e = Gr.get(s);
  return e === void 0 && Gr.set(s, e = sc(s)), e;
}
function sc(s) {
  let e = null;
  function t(n) {
    if (n && typeof n == "object")
      if (Array.isArray(n))
        if (typeof n[0] == "string")
          e || (e = []), e.push(n);
        else
          for (let i = 0; i < n.length; i++)
            t(n[i]);
      else
        for (let i in n)
          t(n[i]);
  }
  return t(s), e;
}
function $n(s, e, t, n) {
  if (typeof e == "string")
    return { dom: s.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], r;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (n && (r = nc(n)) && r.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let a, l = t ? s.createElementNS(t, i) : s.createElement(i), h = e[1], c = 1;
  if (h && typeof h == "object" && h.nodeType == null && !Array.isArray(h)) {
    c = 2;
    for (let u in h)
      if (h[u] != null) {
        let d = u.indexOf(" ");
        d > 0 ? l.setAttributeNS(u.slice(0, d), u.slice(d + 1), h[u]) : u == "style" && l.style ? l.style.cssText = h[u] : l.setAttribute(u, h[u]);
      }
  }
  for (let u = c; u < e.length; u++) {
    let d = e[u];
    if (d === 0) {
      if (u < e.length - 1 || u > c)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: l, contentDOM: l };
    } else {
      let { dom: f, contentDOM: p } = $n(s, d, t, n);
      if (l.appendChild(f), p) {
        if (a)
          throw new RangeError("Multiple content holes");
        a = p;
      }
    }
  }
  return { dom: l, contentDOM: a };
}
const Ca = 65535, Ma = Math.pow(2, 16);
function ic(s, e) {
  return s + e * Ma;
}
function qr(s) {
  return s & Ca;
}
function rc(s) {
  return (s - (s & Ca)) / Ma;
}
const Aa = 1, Oa = 2, Fn = 4, Ia = 8;
class Ei {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.pos = e, this.delInfo = t, this.recover = n;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Ia) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Aa | Fn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Oa | Fn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Fn) > 0;
  }
}
class fe {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && fe.empty)
      return fe.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, n = qr(e);
    if (!this.inverted)
      for (let i = 0; i < n; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[n * 3] + t + rc(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, n) {
    let i = 0, r = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? i : 0);
      if (l > e)
        break;
      let h = this.ranges[a + r], c = this.ranges[a + o], u = l + h;
      if (e <= u) {
        let d = h ? e == l ? -1 : e == u ? 1 : t : t, f = l + i + (d < 0 ? 0 : c);
        if (n)
          return f;
        let p = e == (t < 0 ? l : u) ? null : ic(a / 3, e - l), m = e == l ? Oa : e == u ? Aa : Fn;
        return (t < 0 ? e != l : e != u) && (m |= Ia), new Ei(f, m, p);
      }
      i += c - h;
    }
    return n ? e + i : new Ei(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let n = 0, i = qr(t), r = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let a = 0; a < this.ranges.length; a += 3) {
      let l = this.ranges[a] - (this.inverted ? n : 0);
      if (l > e)
        break;
      let h = this.ranges[a + r], c = l + h;
      if (e <= c && a == i * 3)
        return !0;
      n += this.ranges[a + o] - h;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
    for (let i = 0, r = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], a = o - (this.inverted ? r : 0), l = o + (this.inverted ? 0 : r), h = this.ranges[i + t], c = this.ranges[i + n];
      e(a, a + h, l, l + c), r += c - h;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new fe(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? fe.empty : new fe(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
fe.empty = new fe([]);
class un {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, n = 0, i = e ? e.length : 0) {
    this.mirror = t, this.from = n, this.to = i, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new un(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, n = this._maps.length; t < e._maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t], i != null && i < t ? n + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, n = this._maps.length + e._maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), i != null && i > t ? n - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new un();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let n = this.from; n < this.to; n++)
      e = this._maps[n].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, n) {
    let i = 0;
    for (let r = this.from; r < this.to; r++) {
      let o = this._maps[r], a = o.mapResult(e, t);
      if (a.recover != null) {
        let l = this.getMirror(r);
        if (l != null && l > r && l < this.to) {
          r = l, e = this._maps[l].recover(a.recover);
          continue;
        }
      }
      i |= a.delInfo, e = a.pos;
    }
    return n ? e : new Ei(e, i, null);
  }
}
const qs = /* @__PURE__ */ Object.create(null);
class se {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return fe.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let n = qs[t.stepType];
    if (!n)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return n.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in qs)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return qs[e] = t, t.prototype.jsonID = e, t;
  }
}
class _ {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new _(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new _(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, n, i) {
    try {
      return _.ok(e.replace(t, n, i));
    } catch (r) {
      if (r instanceof Yn)
        return _.fail(r.message);
      throw r;
    }
  }
}
function Xi(s, e, t) {
  let n = [];
  for (let i = 0; i < s.childCount; i++) {
    let r = s.child(i);
    r.content.size && (r = r.copy(Xi(r.content, e, r))), r.isInline && (r = e(r, t, i)), n.push(r);
  }
  return b.fromArray(n);
}
class je extends se {
  /**
  Create a mark step.
  */
  constructor(e, t, n) {
    super(), this.from = e, this.to = t, this.mark = n;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), n = e.resolve(this.from), i = n.node(n.sharedDepth(this.to)), r = new S(Xi(t.content, (o, a) => !o.isAtom || !a.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return _.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Ce(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deleted && n.deleted || t.pos >= n.pos ? null : new je(t.pos, n.pos, this.mark);
  }
  merge(e) {
    return e instanceof je && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new je(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new je(t.from, t.to, e.markFromJSON(t.mark));
  }
}
se.jsonID("addMark", je);
class Ce extends se {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, n) {
    super(), this.from = e, this.to = t, this.mark = n;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), n = new S(Xi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return _.fromReplace(e, this.from, this.to, n);
  }
  invert() {
    return new je(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deleted && n.deleted || t.pos >= n.pos ? null : new Ce(t.pos, n.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ce && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ce(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Ce(t.from, t.to, e.markFromJSON(t.mark));
  }
}
se.jsonID("removeMark", Ce);
class Ke extends se {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return _.fail("No node at mark step's position");
    let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return _.fromReplace(e, this.pos, this.pos + 1, new S(b.from(n), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let n = this.mark.addToSet(t.marks);
      if (n.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(n))
            return new Ke(this.pos, t.marks[i]);
        return new Ke(this.pos, this.mark);
      }
    }
    return new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ke(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Ke(t.pos, e.markFromJSON(t.mark));
  }
}
se.jsonID("addNodeMark", Ke);
class yt extends se {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return _.fail("No node at mark step's position");
    let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return _.fromReplace(e, this.pos, this.pos + 1, new S(b.from(n), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Ke(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new yt(t.pos, e.markFromJSON(t.mark));
  }
}
se.jsonID("removeNodeMark", yt);
class j extends se {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, n, i = !1) {
    super(), this.from = e, this.to = t, this.slice = n, this.structure = i;
  }
  apply(e) {
    return this.structure && Ci(e, this.from, this.to) ? _.fail("Structure replace would overwrite content") : _.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new fe([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new j(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deletedAcross && n.deletedAcross ? null : new j(t.pos, Math.max(t.pos, n.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof j) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? S.empty : new S(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new j(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? S.empty : new S(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new j(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new j(t.from, t.to, S.fromJSON(e, t.slice), !!t.structure);
  }
}
se.jsonID("replace", j);
class K extends se {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, n, i, r, o, a = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = i, this.slice = r, this.insert = o, this.structure = a;
  }
  apply(e) {
    if (this.structure && (Ci(e, this.from, this.gapFrom) || Ci(e, this.gapTo, this.to)))
      return _.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return _.fail("Gap is not a flat range");
    let n = this.slice.insertAt(this.insert, t.content);
    return n ? _.fromReplace(e, this.from, this.to, n) : _.fail("Content does not fit in gap");
  }
  getMap() {
    return new fe([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new K(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), r = this.to == this.gapTo ? n.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && n.deletedAcross || i < t.pos || r > n.pos ? null : new K(t.pos, n.pos, i, r, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new K(t.from, t.to, t.gapFrom, t.gapTo, S.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
se.jsonID("replaceAround", K);
function Ci(s, e, t) {
  let n = s.resolve(e), i = t - e, r = n.depth;
  for (; i > 0 && r > 0 && n.indexAfter(r) == n.node(r).childCount; )
    r--, i--;
  if (i > 0) {
    let o = n.node(r).maybeChild(n.indexAfter(r));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function oc(s, e, t, n) {
  let i = [], r = [], o, a;
  s.doc.nodesBetween(e, t, (l, h, c) => {
    if (!l.isInline)
      return;
    let u = l.marks;
    if (!n.isInSet(u) && c.type.allowsMarkType(n.type)) {
      let d = Math.max(h, e), f = Math.min(h + l.nodeSize, t), p = n.addToSet(u);
      for (let m = 0; m < u.length; m++)
        u[m].isInSet(p) || (o && o.to == d && o.mark.eq(u[m]) ? o.to = f : i.push(o = new Ce(d, f, u[m])));
      a && a.to == d ? a.to = f : r.push(a = new je(d, f, n));
    }
  }), i.forEach((l) => s.step(l)), r.forEach((l) => s.step(l));
}
function ac(s, e, t, n) {
  let i = [], r = 0;
  s.doc.nodesBetween(e, t, (o, a) => {
    if (!o.isInline)
      return;
    r++;
    let l = null;
    if (n instanceof Os) {
      let h = o.marks, c;
      for (; c = n.isInSet(h); )
        (l || (l = [])).push(c), h = c.removeFromSet(h);
    } else n ? n.isInSet(o.marks) && (l = [n]) : l = o.marks;
    if (l && l.length) {
      let h = Math.min(a + o.nodeSize, t);
      for (let c = 0; c < l.length; c++) {
        let u = l[c], d;
        for (let f = 0; f < i.length; f++) {
          let p = i[f];
          p.step == r - 1 && u.eq(i[f].style) && (d = p);
        }
        d ? (d.to = h, d.step = r) : i.push({ style: u, from: Math.max(a, e), to: h, step: r });
      }
    }
  }), i.forEach((o) => s.step(new Ce(o.from, o.to, o.style)));
}
function Qi(s, e, t, n = t.contentMatch, i = !0) {
  let r = s.doc.nodeAt(e), o = [], a = e + 1;
  for (let l = 0; l < r.childCount; l++) {
    let h = r.child(l), c = a + h.nodeSize, u = n.matchType(h.type);
    if (!u)
      o.push(new j(a, c, S.empty));
    else {
      n = u;
      for (let d = 0; d < h.marks.length; d++)
        t.allowsMarkType(h.marks[d].type) || s.step(new Ce(a, c, h.marks[d]));
      if (i && h.isText && t.whitespace != "pre") {
        let d, f = /\r?\n|\r/g, p;
        for (; d = f.exec(h.text); )
          p || (p = new S(b.from(t.schema.text(" ", t.allowedMarks(h.marks))), 0, 0)), o.push(new j(a + d.index, a + d.index + d[0].length, p));
      }
    }
    a = c;
  }
  if (!n.validEnd) {
    let l = n.fillBefore(b.empty, !0);
    s.replace(a, a, new S(l, 0, 0));
  }
  for (let l = o.length - 1; l >= 0; l--)
    s.step(o[l]);
}
function lc(s, e, t) {
  return (e == 0 || s.canReplace(e, s.childCount)) && (t == s.childCount || s.canReplace(0, t));
}
function Ft(s) {
  let t = s.parent.content.cutByIndex(s.startIndex, s.endIndex);
  for (let n = s.depth, i = 0, r = 0; ; --n) {
    let o = s.$from.node(n), a = s.$from.index(n) + i, l = s.$to.indexAfter(n) - r;
    if (n < s.depth && o.canReplace(a, l, t))
      return n;
    if (n == 0 || o.type.spec.isolating || !lc(o, a, l))
      break;
    a && (i = 1), l < o.childCount && (r = 1);
  }
  return null;
}
function hc(s, e, t) {
  let { $from: n, $to: i, depth: r } = e, o = n.before(r + 1), a = i.after(r + 1), l = o, h = a, c = b.empty, u = 0;
  for (let p = r, m = !1; p > t; p--)
    m || n.index(p) > 0 ? (m = !0, c = b.from(n.node(p).copy(c)), u++) : l--;
  let d = b.empty, f = 0;
  for (let p = r, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, d = b.from(i.node(p).copy(d)), f++) : h++;
  s.step(new K(l, h, o, a, new S(c.append(d), u, f), c.size - u, !0));
}
function Zi(s, e, t = null, n = s) {
  let i = cc(s, e), r = i && uc(n, e);
  return r ? i.map(Jr).concat({ type: e, attrs: t }).concat(r.map(Jr)) : null;
}
function Jr(s) {
  return { type: s, attrs: null };
}
function cc(s, e) {
  let { parent: t, startIndex: n, endIndex: i } = s, r = t.contentMatchAt(n).findWrapping(e);
  if (!r)
    return null;
  let o = r.length ? r[0] : e;
  return t.canReplaceWith(n, i, o) ? r : null;
}
function uc(s, e) {
  let { parent: t, startIndex: n, endIndex: i } = s, r = t.child(n), o = e.contentMatch.findWrapping(r.type);
  if (!o)
    return null;
  let l = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let h = n; l && h < i; h++)
    l = l.matchType(t.child(h).type);
  return !l || !l.validEnd ? null : o;
}
function dc(s, e, t) {
  let n = b.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (n.size) {
      let a = t[o].type.contentMatch.matchFragment(n);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    n = b.from(t[o].type.create(t[o].attrs, n));
  }
  let i = e.start, r = e.end;
  s.step(new K(i, r, i, r, new S(n, 0, 0), t.length, !0));
}
function fc(s, e, t, n, i) {
  if (!n.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let r = s.steps.length;
  s.doc.nodesBetween(e, t, (o, a) => {
    let l = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(n, l) && pc(s.doc, s.mapping.slice(r).map(a), n)) {
      let h = null;
      if (n.schema.linebreakReplacement) {
        let f = n.whitespace == "pre", p = !!n.contentMatch.matchType(n.schema.linebreakReplacement);
        f && !p ? h = !1 : !f && p && (h = !0);
      }
      h === !1 && Ra(s, o, a, r), Qi(s, s.mapping.slice(r).map(a, 1), n, void 0, h === null);
      let c = s.mapping.slice(r), u = c.map(a, 1), d = c.map(a + o.nodeSize, 1);
      return s.step(new K(u, d, u + 1, d - 1, new S(b.from(n.create(l, null, o.marks)), 0, 0), 1, !0)), h === !0 && Na(s, o, a, r), !1;
    }
  });
}
function Na(s, e, t, n) {
  e.forEach((i, r) => {
    if (i.isText) {
      let o, a = /\r?\n|\r/g;
      for (; o = a.exec(i.text); ) {
        let l = s.mapping.slice(n).map(t + 1 + r + o.index);
        s.replaceWith(l, l + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Ra(s, e, t, n) {
  e.forEach((i, r) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = s.mapping.slice(n).map(t + 1 + r);
      s.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function pc(s, e, t) {
  let n = s.resolve(e), i = n.index();
  return n.parent.canReplaceWith(i, i + 1, t);
}
function mc(s, e, t, n, i) {
  let r = s.doc.nodeAt(e);
  if (!r)
    throw new RangeError("No node at given position");
  t || (t = r.type);
  let o = t.create(n, null, i || r.marks);
  if (r.isLeaf)
    return s.replaceWith(e, e + r.nodeSize, o);
  if (!t.validContent(r.content))
    throw new RangeError("Invalid content for node type " + t.name);
  s.step(new K(e, e + r.nodeSize, e + 1, e + r.nodeSize - 1, new S(b.from(o), 0, 0), 1, !0));
}
function Ve(s, e, t = 1, n) {
  let i = s.resolve(e), r = i.depth - t, o = n && n[n.length - 1] || i.parent;
  if (r < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let h = i.depth - 1, c = t - 2; h > r; h--, c--) {
    let u = i.node(h), d = i.index(h);
    if (u.type.spec.isolating)
      return !1;
    let f = u.content.cutByIndex(d, u.childCount), p = n && n[c + 1];
    p && (f = f.replaceChild(0, p.type.create(p.attrs)));
    let m = n && n[c] || u;
    if (!u.canReplace(d + 1, u.childCount) || !m.type.validContent(f))
      return !1;
  }
  let a = i.indexAfter(r), l = n && n[0];
  return i.node(r).canReplaceWith(a, a, l ? l.type : i.node(r + 1).type);
}
function gc(s, e, t = 1, n) {
  let i = s.doc.resolve(e), r = b.empty, o = b.empty;
  for (let a = i.depth, l = i.depth - t, h = t - 1; a > l; a--, h--) {
    r = b.from(i.node(a).copy(r));
    let c = n && n[h];
    o = b.from(c ? c.type.create(c.attrs, o) : i.node(a).copy(o));
  }
  s.step(new j(e, e, new S(r.append(o), t, t), !0));
}
function tt(s, e) {
  let t = s.resolve(e), n = t.index();
  return La(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(n, n + 1);
}
function yc(s, e) {
  e.content.size || s.type.compatibleContent(e.type);
  let t = s.contentMatchAt(s.childCount), { linebreakReplacement: n } = s.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let r = e.child(i), o = r.type == n ? s.type.schema.nodes.text : r.type;
    if (t = t.matchType(o), !t || !s.type.allowsMarks(r.marks))
      return !1;
  }
  return t.validEnd;
}
function La(s, e) {
  return !!(s && e && !s.isLeaf && yc(s, e));
}
function Is(s, e, t = -1) {
  let n = s.resolve(e);
  for (let i = n.depth; ; i--) {
    let r, o, a = n.index(i);
    if (i == n.depth ? (r = n.nodeBefore, o = n.nodeAfter) : t > 0 ? (r = n.node(i + 1), a++, o = n.node(i).maybeChild(a)) : (r = n.node(i).maybeChild(a - 1), o = n.node(i + 1)), r && !r.isTextblock && La(r, o) && n.node(i).canReplace(a, a + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? n.before(i) : n.after(i);
  }
}
function bc(s, e, t) {
  let n = null, { linebreakReplacement: i } = s.doc.type.schema, r = s.doc.resolve(e - t), o = r.node().type;
  if (i && o.inlineContent) {
    let c = o.whitespace == "pre", u = !!o.contentMatch.matchType(i);
    c && !u ? n = !1 : !c && u && (n = !0);
  }
  let a = s.steps.length;
  if (n === !1) {
    let c = s.doc.resolve(e + t);
    Ra(s, c.node(), c.before(), a);
  }
  o.inlineContent && Qi(s, e + t - 1, o, r.node().contentMatchAt(r.index()), n == null);
  let l = s.mapping.slice(a), h = l.map(e - t);
  if (s.step(new j(h, l.map(e + t, -1), S.empty, !0)), n === !0) {
    let c = s.doc.resolve(h);
    Na(s, c.node(), c.before(), s.steps.length);
  }
  return s;
}
function xc(s, e, t) {
  let n = s.resolve(e);
  if (n.parent.canReplaceWith(n.index(), n.index(), t))
    return e;
  if (n.parentOffset == 0)
    for (let i = n.depth - 1; i >= 0; i--) {
      let r = n.index(i);
      if (n.node(i).canReplaceWith(r, r, t))
        return n.before(i + 1);
      if (r > 0)
        return null;
    }
  if (n.parentOffset == n.parent.content.size)
    for (let i = n.depth - 1; i >= 0; i--) {
      let r = n.indexAfter(i);
      if (n.node(i).canReplaceWith(r, r, t))
        return n.after(i + 1);
      if (r < n.node(i).childCount)
        return null;
    }
  return null;
}
function Pa(s, e, t) {
  let n = s.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let r = 0; r < t.openStart; r++)
    i = i.firstChild.content;
  for (let r = 1; r <= (t.openStart == 0 && t.size ? 2 : 1); r++)
    for (let o = n.depth; o >= 0; o--) {
      let a = o == n.depth ? 0 : n.pos <= (n.start(o + 1) + n.end(o + 1)) / 2 ? -1 : 1, l = n.index(o) + (a > 0 ? 1 : 0), h = n.node(o), c = !1;
      if (r == 1)
        c = h.canReplace(l, l, i);
      else {
        let u = h.contentMatchAt(l).findWrapping(i.firstChild.type);
        c = u && h.canReplaceWith(l, l, u[0]);
      }
      if (c)
        return a == 0 ? n.pos : a < 0 ? n.before(o + 1) : n.after(o + 1);
    }
  return null;
}
function Ns(s, e, t = e, n = S.empty) {
  if (e == t && !n.size)
    return null;
  let i = s.resolve(e), r = s.resolve(t);
  return Va(i, r, n) ? new j(e, t, n) : new Sc(i, r, n).fit();
}
function Va(s, e, t) {
  return !t.openStart && !t.openEnd && s.start() == e.start() && s.parent.canReplace(s.index(), e.index(), t.content);
}
class Sc {
  constructor(e, t, n) {
    this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = b.empty;
    for (let i = 0; i <= e.depth; i++) {
      let r = e.node(i);
      this.frontier.push({
        type: r.type,
        match: r.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = b.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let h = this.findFittable();
      h ? this.placeNodes(h) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, i = this.close(e < 0 ? this.$to : n.doc.resolve(e));
    if (!i)
      return null;
    let r = this.placed, o = n.depth, a = i.depth;
    for (; o && a && r.childCount == 1; )
      r = r.firstChild.content, o--, a--;
    let l = new S(r, o, a);
    return e > -1 ? new K(n.pos, e, this.$to.pos, this.$to.end(), l, t) : l.size || n.pos != this.$to.pos ? new j(n.pos, i.pos, l) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, n = 0, i = this.unplaced.openEnd; n < e; n++) {
      let r = t.firstChild;
      if (t.childCount > 1 && (i = 0), r.type.spec.isolating && i <= n) {
        e = n;
        break;
      }
      t = r.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
        let i, r = null;
        n ? (r = Js(this.unplaced.content, n - 1).firstChild, i = r.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let a = this.depth; a >= 0; a--) {
          let { type: l, match: h } = this.frontier[a], c, u = null;
          if (t == 1 && (o ? h.matchType(o.type) || (u = h.fillBefore(b.from(o), !1)) : r && l.compatibleContent(r.type)))
            return { sliceDepth: n, frontierDepth: a, parent: r, inject: u };
          if (t == 2 && o && (c = h.findWrapping(o.type)))
            return { sliceDepth: n, frontierDepth: a, parent: r, wrap: c };
          if (r && h.matchType(r.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced, i = Js(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new S(e, t + 1, Math.max(n, i.size + t >= e.size - n ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced, i = Js(e, t);
    if (i.childCount <= 1 && t > 0) {
      let r = e.size - t <= t + i.size;
      this.unplaced = new S(Kt(e, t - 1, 1), t - 1, r ? t - 1 : n);
    } else
      this.unplaced = new S(Kt(e, t, 1), t, n);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: i, wrap: r }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (r)
      for (let m = 0; m < r.length; m++)
        this.openFrontierNode(r[m]);
    let o = this.unplaced, a = n ? n.content : o.content, l = o.openStart - e, h = 0, c = [], { match: u, type: d } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        c.push(i.child(m));
      u = u.matchFragment(i);
    }
    let f = a.size + e - (o.content.size - o.openEnd);
    for (; h < a.childCount; ) {
      let m = a.child(h), g = u.matchType(m.type);
      if (!g)
        break;
      h++, (h > 1 || l == 0 || m.content.size) && (u = g, c.push($a(m.mark(d.allowedMarks(m.marks)), h == 1 ? l : 0, h == a.childCount ? f : -1)));
    }
    let p = h == a.childCount;
    p || (f = -1), this.placed = Gt(this.placed, t, b.from(c)), this.frontier[t].match = u, p && f < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = a; m < f; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = p ? e == 0 ? S.empty : new S(Kt(o.content, e - 1, 1), e - 1, f < 0 ? o.openEnd : e - 1) : new S(Kt(o.content, e, h), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Xs(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: n } = this.$to, i = this.$to.after(n);
    for (; n > 1 && i == this.$to.end(--n); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: n, type: i } = this.frontier[t], r = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = Xs(e, t, i, n, r);
      if (o) {
        for (let a = t - 1; a >= 0; a--) {
          let { match: l, type: h } = this.frontier[a], c = Xs(e, a, h, l, !0);
          if (!c || c.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: r ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Gt(this.placed, t.depth, t.fit)), e = t.move;
    for (let n = t.depth + 1; n <= e.depth; n++) {
      let i = e.node(n), r = i.type.contentMatch.fillBefore(i.content, !0, e.index(n));
      this.openFrontierNode(i.type, i.attrs, r);
    }
    return e;
  }
  openFrontierNode(e, t = null, n) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Gt(this.placed, this.depth, b.from(e.create(t, n))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(b.empty, !0);
    t.childCount && (this.placed = Gt(this.placed, this.frontier.length, t));
  }
}
function Kt(s, e, t) {
  return e == 0 ? s.cutByIndex(t, s.childCount) : s.replaceChild(0, s.firstChild.copy(Kt(s.firstChild.content, e - 1, t)));
}
function Gt(s, e, t) {
  return e == 0 ? s.append(t) : s.replaceChild(s.childCount - 1, s.lastChild.copy(Gt(s.lastChild.content, e - 1, t)));
}
function Js(s, e) {
  for (let t = 0; t < e; t++)
    s = s.firstChild.content;
  return s;
}
function $a(s, e, t) {
  if (e <= 0)
    return s;
  let n = s.content;
  return e > 1 && (n = n.replaceChild(0, $a(n.firstChild, e - 1, n.childCount == 1 ? t - 1 : 0))), e > 0 && (n = s.type.contentMatch.fillBefore(n).append(n), t <= 0 && (n = n.append(s.type.contentMatch.matchFragment(n).fillBefore(b.empty, !0)))), s.copy(n);
}
function Xs(s, e, t, n, i) {
  let r = s.node(e), o = i ? s.indexAfter(e) : s.index(e);
  if (o == r.childCount && !t.compatibleContent(r.type))
    return null;
  let a = n.fillBefore(r.content, !0, o);
  return a && !vc(t, r.content, o) ? a : null;
}
function vc(s, e, t) {
  for (let n = t; n < e.childCount; n++)
    if (!s.allowsMarks(e.child(n).marks))
      return !0;
  return !1;
}
function wc(s) {
  return s.spec.defining || s.spec.definingForContent;
}
function Tc(s, e, t, n) {
  if (!n.size)
    return s.deleteRange(e, t);
  let i = s.doc.resolve(e), r = s.doc.resolve(t);
  if (Va(i, r, n))
    return s.step(new j(e, t, n));
  let o = Ha(i, r);
  o[o.length - 1] == 0 && o.pop();
  let a = -(i.depth + 1);
  o.unshift(a);
  for (let d = i.depth, f = i.pos - 1; d > 0; d--, f--) {
    let p = i.node(d).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(d) > -1 ? a = d : i.before(d) == f && o.splice(1, 0, -d);
  }
  let l = o.indexOf(a), h = [], c = n.openStart;
  for (let d = n.content, f = 0; ; f++) {
    let p = d.firstChild;
    if (h.push(p), f == n.openStart)
      break;
    d = p.content;
  }
  for (let d = c - 1; d >= 0; d--) {
    let f = h[d], p = wc(f.type);
    if (p && !f.sameMarkup(i.node(Math.abs(a) - 1)))
      c = d;
    else if (p || !f.type.isTextblock)
      break;
  }
  for (let d = n.openStart; d >= 0; d--) {
    let f = (d + c + 1) % (n.openStart + 1), p = h[f];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + l) % o.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let v = i.node(g - 1), E = i.index(g - 1);
        if (v.canReplaceWith(E, E, p.type, p.marks))
          return s.replace(i.before(g), y ? r.after(g) : t, new S(Fa(n.content, 0, n.openStart, f), f, n.openEnd));
      }
  }
  let u = s.steps.length;
  for (let d = o.length - 1; d >= 0 && (s.replace(e, t, n), !(s.steps.length > u)); d--) {
    let f = o[d];
    f < 0 || (e = i.before(f), t = r.after(f));
  }
}
function Fa(s, e, t, n, i) {
  if (e < t) {
    let r = s.firstChild;
    s = s.replaceChild(0, r.copy(Fa(r.content, e + 1, t, n, r)));
  }
  if (e > n) {
    let r = i.contentMatchAt(0), o = r.fillBefore(s).append(s);
    s = o.append(r.matchFragment(o).fillBefore(b.empty, !0));
  }
  return s;
}
function kc(s, e, t, n) {
  if (!n.isInline && e == t && s.doc.resolve(e).parent.content.size) {
    let i = xc(s.doc, e, n.type);
    i != null && (e = t = i);
  }
  s.replaceRange(e, t, new S(b.from(n), 0, 0));
}
function Dc(s, e, t) {
  let n = s.doc.resolve(e), i = s.doc.resolve(t), r = Ha(n, i);
  for (let o = 0; o < r.length; o++) {
    let a = r[o], l = o == r.length - 1;
    if (l && a == 0 || n.node(a).type.contentMatch.validEnd)
      return s.delete(n.start(a), i.end(a));
    if (a > 0 && (l || n.node(a - 1).canReplace(n.index(a - 1), i.indexAfter(a - 1))))
      return s.delete(n.before(a), i.after(a));
  }
  for (let o = 1; o <= n.depth && o <= i.depth; o++)
    if (e - n.start(o) == n.depth - o && t > n.end(o) && i.end(o) - t != i.depth - o && n.start(o - 1) == i.start(o - 1) && n.node(o - 1).canReplace(n.index(o - 1), i.index(o - 1)))
      return s.delete(n.before(o), t);
  s.delete(e, t);
}
function Ha(s, e) {
  let t = [], n = Math.min(s.depth, e.depth);
  for (let i = n; i >= 0; i--) {
    let r = s.start(i);
    if (r < s.pos - (s.depth - i) || e.end(i) > e.pos + (e.depth - i) || s.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (r == e.start(i) || i == s.depth && i == e.depth && s.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == r - 1) && t.push(i);
  }
  return t;
}
class It extends se {
  /**
  Construct an attribute step.
  */
  constructor(e, t, n) {
    super(), this.pos = e, this.attr = t, this.value = n;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return _.fail("No node at attribute step's position");
    let n = /* @__PURE__ */ Object.create(null);
    for (let r in t.attrs)
      n[r] = t.attrs[r];
    n[this.attr] = this.value;
    let i = t.type.create(n, null, t.marks);
    return _.fromReplace(e, this.pos, this.pos + 1, new S(b.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return fe.empty;
  }
  invert(e) {
    return new It(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new It(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new It(t.pos, t.attr, t.value);
  }
}
se.jsonID("attr", It);
class dn extends se {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let n = e.type.create(t, e.content, e.marks);
    return _.ok(n);
  }
  getMap() {
    return fe.empty;
  }
  invert(e) {
    return new dn(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new dn(t.attr, t.value);
  }
}
se.jsonID("docAttr", dn);
let Rt = class extends Error {
};
Rt = function s(e) {
  let t = Error.call(this, e);
  return t.__proto__ = s.prototype, t;
};
Rt.prototype = Object.create(Error.prototype);
Rt.prototype.constructor = Rt;
Rt.prototype.name = "TransformError";
class Ba {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new un();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Rt(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, n = S.empty) {
    let i = Ns(this.doc, e, t, n);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, n) {
    return this.replace(e, t, new S(b.from(n), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, S.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, n) {
    return Tc(this, e, t, n), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, n) {
    return kc(this, e, t, n), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Dc(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return hc(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return bc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return dc(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, n, i = null) {
    return fc(this, e, t, n, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, n = null, i) {
    return mc(this, e, t, n, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, n) {
    return this.step(new It(e, t, n)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new dn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Ke(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let n = this.doc.nodeAt(e);
    if (!n)
      throw new RangeError("No node at position " + e);
    if (t instanceof V)
      t.isInSet(n.marks) && this.step(new yt(e, t));
    else {
      let i = n.marks, r, o = [];
      for (; r = t.isInSet(i); )
        o.push(new yt(e, r)), i = r.removeFromSet(i);
      for (let a = o.length - 1; a >= 0; a--)
        this.step(o[a]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, n) {
    return gc(this, e, t, n), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, n) {
    return oc(this, e, t, n), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, n) {
    return ac(this, e, t, n), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, n) {
    return Qi(this, e, t, n), this;
  }
}
const Qs = /* @__PURE__ */ Object.create(null);
class N {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, n) {
    this.$anchor = e, this.$head = t, this.ranges = n || [new Ec(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = S.empty) {
    let n = t.content.lastChild, i = null;
    for (let a = 0; a < t.openEnd; a++)
      i = n, n = n.lastChild;
    let r = e.steps.length, o = this.ranges;
    for (let a = 0; a < o.length; a++) {
      let { $from: l, $to: h } = o[a], c = e.mapping.slice(r);
      e.replaceRange(c.map(l.pos), c.map(h.pos), a ? S.empty : t), a == 0 && Zr(e, r, (n ? n.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let n = e.steps.length, i = this.ranges;
    for (let r = 0; r < i.length; r++) {
      let { $from: o, $to: a } = i[r], l = e.mapping.slice(n), h = l.map(o.pos), c = l.map(a.pos);
      r ? e.deleteRange(h, c) : (e.replaceRangeWith(h, c, t), Zr(e, n, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, n = !1) {
    let i = e.parent.inlineContent ? new A(e) : Et(e.node(0), e.parent, e.pos, e.index(), t, n);
    if (i)
      return i;
    for (let r = e.depth - 1; r >= 0; r--) {
      let o = t < 0 ? Et(e.node(0), e.node(r), e.before(r + 1), e.index(r), t, n) : Et(e.node(0), e.node(r), e.after(r + 1), e.index(r) + 1, t, n);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new me(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Et(e, e, 0, 0, 1) || new me(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Et(e, e, e.content.size, e.childCount, -1) || new me(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let n = Qs[t.type];
    if (!n)
      throw new RangeError(`No selection type ${t.type} defined`);
    return n.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Qs)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Qs[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return A.between(this.$anchor, this.$head).getBookmark();
  }
}
N.prototype.visible = !0;
class Ec {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Xr = !1;
function Qr(s) {
  !Xr && !s.parent.inlineContent && (Xr = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + s.parent.type.name + ")"));
}
class A extends N {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Qr(e), Qr(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let n = e.resolve(t.map(this.head));
    if (!n.parent.inlineContent)
      return N.near(n);
    let i = e.resolve(t.map(this.anchor));
    return new A(i.parent.inlineContent ? i : n, n);
  }
  replace(e, t = S.empty) {
    if (super.replace(e, t), t == S.empty) {
      let n = this.$from.marksAcross(this.$to);
      n && e.ensureMarks(n);
    }
  }
  eq(e) {
    return e instanceof A && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Rs(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new A(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, n = t) {
    let i = e.resolve(t);
    return new this(i, n == t ? i : e.resolve(n));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, n) {
    let i = e.pos - t.pos;
    if ((!n || i) && (n = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let r = N.findFrom(t, n, !0) || N.findFrom(t, -n, !0);
      if (r)
        t = r.$head;
      else
        return N.near(t, n);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (N.findFrom(e, -n, !0) || N.findFrom(e, n, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new A(e, t);
  }
}
N.jsonID("text", A);
class Rs {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Rs(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return A.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class T extends N {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, n), this.node = t;
  }
  map(e, t) {
    let { deleted: n, pos: i } = t.mapResult(this.anchor), r = e.resolve(i);
    return n ? N.near(r) : new T(r);
  }
  content() {
    return new S(b.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof T && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new er(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new T(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new T(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
T.prototype.visible = !1;
N.jsonID("node", T);
class er {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: n } = e.mapResult(this.anchor);
    return t ? new Rs(n, n) : new er(n);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), n = t.nodeAfter;
    return n && T.isSelectable(n) ? new T(t) : N.near(t);
  }
}
class me extends N {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = S.empty) {
    if (t == S.empty) {
      e.delete(0, e.doc.content.size);
      let n = N.atStart(e.doc);
      n.eq(e.selection) || e.setSelection(n);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new me(e);
  }
  map(e) {
    return new me(e);
  }
  eq(e) {
    return e instanceof me;
  }
  getBookmark() {
    return Cc;
  }
}
N.jsonID("all", me);
const Cc = {
  map() {
    return this;
  },
  resolve(s) {
    return new me(s);
  }
};
function Et(s, e, t, n, i, r = !1) {
  if (e.inlineContent)
    return A.create(s, t);
  for (let o = n - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let a = e.child(o);
    if (a.isAtom) {
      if (!r && T.isSelectable(a))
        return T.create(s, t - (i < 0 ? a.nodeSize : 0));
    } else {
      let l = Et(s, a, t + i, i < 0 ? a.childCount : 0, i, r);
      if (l)
        return l;
    }
    t += a.nodeSize * i;
  }
  return null;
}
function Zr(s, e, t) {
  let n = s.steps.length - 1;
  if (n < e)
    return;
  let i = s.steps[n];
  if (!(i instanceof j || i instanceof K))
    return;
  let r = s.mapping.maps[n], o;
  r.forEach((a, l, h, c) => {
    o == null && (o = c);
  }), s.setSelection(N.near(s.doc.resolve(o), t));
}
const eo = 1, Mn = 2, to = 4;
class Mc extends Ba {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | eo) & ~Mn, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & eo) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Mn, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return V.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Mn) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Mn, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let n = this.selection;
    return t && (e = e.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || V.none))), n.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, n) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (n == null && (n = t), !e)
        return this.deleteRange(t, n);
      let r = this.storedMarks;
      if (!r) {
        let o = this.doc.resolve(t);
        r = n == t ? o.marks() : o.marksAcross(this.doc.resolve(n));
      }
      return this.replaceRangeWith(t, n, i.text(e, r)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(N.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= to, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & to) > 0;
  }
}
function no(s, e) {
  return !e || !s ? s : s.bind(e);
}
class qt {
  constructor(e, t, n) {
    this.name = e, this.init = no(t.init, n), this.apply = no(t.apply, n);
  }
}
const Ac = [
  new qt("doc", {
    init(s) {
      return s.doc || s.schema.topNodeType.createAndFill();
    },
    apply(s) {
      return s.doc;
    }
  }),
  new qt("selection", {
    init(s, e) {
      return s.selection || N.atStart(e.doc);
    },
    apply(s) {
      return s.selection;
    }
  }),
  new qt("storedMarks", {
    init(s) {
      return s.storedMarks || null;
    },
    apply(s, e, t, n) {
      return n.selection.$cursor ? s.storedMarks : null;
    }
  }),
  new qt("scrollToSelection", {
    init() {
      return 0;
    },
    apply(s, e) {
      return s.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Zs {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Ac.slice(), t && t.forEach((n) => {
      if (this.pluginsByKey[n.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + n.key + ")");
      this.plugins.push(n), this.pluginsByKey[n.key] = n, n.spec.state && this.fields.push(new qt(n.key, n.spec.state, n));
    });
  }
}
class At {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let n = 0; n < this.config.plugins.length; n++)
      if (n != t) {
        let i = this.config.plugins[n];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], n = this.applyInner(e), i = null;
    for (; ; ) {
      let r = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let a = this.config.plugins[o];
        if (a.spec.appendTransaction) {
          let l = i ? i[o].n : 0, h = i ? i[o].state : this, c = l < t.length && a.spec.appendTransaction.call(a, l ? t.slice(l) : t, h, n);
          if (c && n.filterTransaction(c, o)) {
            if (c.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let u = 0; u < this.config.plugins.length; u++)
                i.push(u < o ? { state: n, n: t.length } : { state: this, n: 0 });
            }
            t.push(c), n = n.applyInner(c), r = !0;
          }
          i && (i[o] = { state: n, n: t.length });
        }
      }
      if (!r)
        return { state: n, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new At(this.config), n = this.config.fields;
    for (let i = 0; i < n.length; i++) {
      let r = n[i];
      t[r.name] = r.apply(e, this[r.name], this, t);
    }
    return t;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Mc(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Zs(e.doc ? e.doc.type.schema : e.schema, e.plugins), n = new At(t);
    for (let i = 0; i < t.fields.length; i++)
      n[t.fields[i].name] = t.fields[i].init(e, n);
    return n;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new Zs(this.schema, e.plugins), n = t.fields, i = new At(t);
    for (let r = 0; r < n.length; r++) {
      let o = n[r].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : n[r].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((n) => n.toJSON())), e && typeof e == "object")
      for (let n in e) {
        if (n == "doc" || n == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[n], r = i.spec.state;
        r && r.toJSON && (t[n] = r.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, n) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Zs(e.schema, e.plugins), r = new At(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        r.doc = qe.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        r.selection = N.fromJSON(r.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (r.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (n)
          for (let a in n) {
            let l = n[a], h = l.spec.state;
            if (l.key == o.name && h && h.fromJSON && Object.prototype.hasOwnProperty.call(t, a)) {
              r[o.name] = h.fromJSON.call(l, e, t[a], r);
              return;
            }
          }
        r[o.name] = o.init(e, r);
      }
    }), r;
  }
}
function za(s, e, t) {
  for (let n in s) {
    let i = s[n];
    i instanceof Function ? i = i.bind(e) : n == "handleDOMEvents" && (i = za(i, e, {})), t[n] = i;
  }
  return t;
}
class Y {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && za(e.props, this, this.props), this.key = e.key ? e.key.key : _a("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ei = /* @__PURE__ */ Object.create(null);
function _a(s) {
  return s in ei ? s + "$" + ++ei[s] : (ei[s] = 0, s + "$");
}
class he {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = _a(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Q = function(s) {
  for (var e = 0; ; e++)
    if (s = s.previousSibling, !s)
      return e;
}, Lt = function(s) {
  let e = s.assignedSlot || s.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Mi = null;
const Le = function(s, e, t) {
  let n = Mi || (Mi = document.createRange());
  return n.setEnd(s, t ?? s.nodeValue.length), n.setStart(s, e || 0), n;
}, Oc = function() {
  Mi = null;
}, bt = function(s, e, t, n) {
  return t && (so(s, e, t, n, -1) || so(s, e, t, n, 1));
}, Ic = /^(img|br|input|textarea|hr)$/i;
function so(s, e, t, n, i) {
  for (var r; ; ) {
    if (s == t && e == n)
      return !0;
    if (e == (i < 0 ? 0 : xe(s))) {
      let o = s.parentNode;
      if (!o || o.nodeType != 1 || vn(s) || Ic.test(s.nodeName) || s.contentEditable == "false")
        return !1;
      e = Q(s) + (i < 0 ? 0 : 1), s = o;
    } else if (s.nodeType == 1) {
      let o = s.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((r = o.pmViewDesc) === null || r === void 0) && r.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        s = o, e = i < 0 ? xe(s) : 0;
    } else
      return !1;
  }
}
function xe(s) {
  return s.nodeType == 3 ? s.nodeValue.length : s.childNodes.length;
}
function Nc(s, e) {
  for (; ; ) {
    if (s.nodeType == 3 && e)
      return s;
    if (s.nodeType == 1 && e > 0) {
      if (s.contentEditable == "false")
        return null;
      s = s.childNodes[e - 1], e = xe(s);
    } else if (s.parentNode && !vn(s))
      e = Q(s), s = s.parentNode;
    else
      return null;
  }
}
function Rc(s, e) {
  for (; ; ) {
    if (s.nodeType == 3 && e < s.nodeValue.length)
      return s;
    if (s.nodeType == 1 && e < s.childNodes.length) {
      if (s.contentEditable == "false")
        return null;
      s = s.childNodes[e], e = 0;
    } else if (s.parentNode && !vn(s))
      e = Q(s) + 1, s = s.parentNode;
    else
      return null;
  }
}
function Lc(s, e, t) {
  for (let n = e == 0, i = e == xe(s); n || i; ) {
    if (s == t)
      return !0;
    let r = Q(s);
    if (s = s.parentNode, !s)
      return !1;
    n = n && r == 0, i = i && r == xe(s);
  }
}
function vn(s) {
  let e;
  for (let t = s; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == s || e.contentDOM == s);
}
const Ls = function(s) {
  return s.focusNode && bt(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset);
};
function rt(s, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = s, t.key = t.code = e, t;
}
function Pc(s) {
  let e = s.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Vc(s, e, t) {
  if (s.caretPositionFromPoint)
    try {
      let n = s.caretPositionFromPoint(e, t);
      if (n)
        return { node: n.offsetNode, offset: Math.min(xe(n.offsetNode), n.offset) };
    } catch {
    }
  if (s.caretRangeFromPoint) {
    let n = s.caretRangeFromPoint(e, t);
    if (n)
      return { node: n.startContainer, offset: Math.min(xe(n.startContainer), n.startOffset) };
  }
}
const Me = typeof navigator < "u" ? navigator : null, io = typeof document < "u" ? document : null, nt = Me && Me.userAgent || "", Ai = /Edge\/(\d+)/.exec(nt), Wa = /MSIE \d/.exec(nt), Oi = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nt), de = !!(Wa || Oi || Ai), Je = Wa ? document.documentMode : Oi ? +Oi[1] : Ai ? +Ai[1] : 0, Se = !de && /gecko\/(\d+)/i.test(nt);
Se && +(/Firefox\/(\d+)/.exec(nt) || [0, 0])[1];
const Ii = !de && /Chrome\/(\d+)/.exec(nt), ne = !!Ii, Ya = Ii ? +Ii[1] : 0, re = !de && !!Me && /Apple Computer/.test(Me.vendor), Pt = re && (/Mobile\/\w+/.test(nt) || !!Me && Me.maxTouchPoints > 2), be = Pt || (Me ? /Mac/.test(Me.platform) : !1), $c = Me ? /Win/.test(Me.platform) : !1, Pe = /Android \d/.test(nt), wn = !!io && "webkitFontSmoothing" in io.documentElement.style, Fc = wn ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Hc(s) {
  let e = s.defaultView && s.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: s.documentElement.clientWidth,
    top: 0,
    bottom: s.documentElement.clientHeight
  };
}
function Oe(s, e) {
  return typeof s == "number" ? s : s[e];
}
function Bc(s) {
  let e = s.getBoundingClientRect(), t = e.width / s.offsetWidth || 1, n = e.height / s.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + s.clientWidth * t,
    top: e.top,
    bottom: e.top + s.clientHeight * n
  };
}
function ro(s, e, t) {
  let n = s.someProp("scrollThreshold") || 0, i = s.someProp("scrollMargin") || 5, r = s.dom.ownerDocument;
  for (let o = t || s.dom; o; ) {
    if (o.nodeType != 1) {
      o = Lt(o);
      continue;
    }
    let a = o, l = a == r.body, h = l ? Hc(r) : Bc(a), c = 0, u = 0;
    if (e.top < h.top + Oe(n, "top") ? u = -(h.top - e.top + Oe(i, "top")) : e.bottom > h.bottom - Oe(n, "bottom") && (u = e.bottom - e.top > h.bottom - h.top ? e.top + Oe(i, "top") - h.top : e.bottom - h.bottom + Oe(i, "bottom")), e.left < h.left + Oe(n, "left") ? c = -(h.left - e.left + Oe(i, "left")) : e.right > h.right - Oe(n, "right") && (c = e.right - h.right + Oe(i, "right")), c || u)
      if (l)
        r.defaultView.scrollBy(c, u);
      else {
        let f = a.scrollLeft, p = a.scrollTop;
        u && (a.scrollTop += u), c && (a.scrollLeft += c);
        let m = a.scrollLeft - f, g = a.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let d = l ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(d))
      break;
    o = d == "absolute" ? o.offsetParent : Lt(o);
  }
}
function zc(s) {
  let e = s.dom.getBoundingClientRect(), t = Math.max(0, e.top), n, i;
  for (let r = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let a = s.root.elementFromPoint(r, o);
    if (!a || a == s.dom || !s.dom.contains(a))
      continue;
    let l = a.getBoundingClientRect();
    if (l.top >= t - 20) {
      n = a, i = l.top;
      break;
    }
  }
  return { refDOM: n, refTop: i, stack: Ua(s.dom) };
}
function Ua(s) {
  let e = [], t = s.ownerDocument;
  for (let n = s; n && (e.push({ dom: n, top: n.scrollTop, left: n.scrollLeft }), s != t); n = Lt(n))
    ;
  return e;
}
function _c({ refDOM: s, refTop: e, stack: t }) {
  let n = s ? s.getBoundingClientRect().top : 0;
  ja(t, n == 0 ? 0 : n - e);
}
function ja(s, e) {
  for (let t = 0; t < s.length; t++) {
    let { dom: n, top: i, left: r } = s[t];
    n.scrollTop != i + e && (n.scrollTop = i + e), n.scrollLeft != r && (n.scrollLeft = r);
  }
}
let kt = null;
function Wc(s) {
  if (s.setActive)
    return s.setActive();
  if (kt)
    return s.focus(kt);
  let e = Ua(s);
  s.focus(kt == null ? {
    get preventScroll() {
      return kt = { preventScroll: !0 }, !0;
    }
  } : void 0), kt || (kt = !1, ja(e, 0));
}
function Ka(s, e) {
  let t, n = 2e8, i, r = 0, o = e.top, a = e.top, l, h;
  for (let c = s.firstChild, u = 0; c; c = c.nextSibling, u++) {
    let d;
    if (c.nodeType == 1)
      d = c.getClientRects();
    else if (c.nodeType == 3)
      d = Le(c).getClientRects();
    else
      continue;
    for (let f = 0; f < d.length; f++) {
      let p = d[f];
      if (p.top <= o && p.bottom >= a) {
        o = Math.max(p.bottom, o), a = Math.min(p.top, a);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < n) {
          t = c, n = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, c.nodeType == 1 && m && (r = u + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !l && p.left <= e.left && p.right >= e.left && (l = c, h = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (r = u + 1);
    }
  }
  return !t && l && (t = l, i = h, n = 0), t && t.nodeType == 3 ? Yc(t, i) : !t || n && t.nodeType == 1 ? { node: s, offset: r } : Ka(t, i);
}
function Yc(s, e) {
  let t = s.nodeValue.length, n = document.createRange();
  for (let i = 0; i < t; i++) {
    n.setEnd(s, i + 1), n.setStart(s, i);
    let r = Be(n, 1);
    if (r.top != r.bottom && tr(e, r))
      return { node: s, offset: i + (e.left >= (r.left + r.right) / 2 ? 1 : 0) };
  }
  return { node: s, offset: 0 };
}
function tr(s, e) {
  return s.left >= e.left - 1 && s.left <= e.right + 1 && s.top >= e.top - 1 && s.top <= e.bottom + 1;
}
function Uc(s, e) {
  let t = s.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < s.getBoundingClientRect().left ? t : s;
}
function jc(s, e, t) {
  let { node: n, offset: i } = Ka(e, t), r = -1;
  if (n.nodeType == 1 && !n.firstChild) {
    let o = n.getBoundingClientRect();
    r = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return s.docView.posFromDOM(n, i, r);
}
function Kc(s, e, t, n) {
  let i = -1;
  for (let r = e, o = !1; r != s.dom; ) {
    let a = s.docView.nearestDesc(r, !0), l;
    if (!a)
      return null;
    if (a.dom.nodeType == 1 && (a.node.isBlock && a.parent || !a.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((l = a.dom.getBoundingClientRect()).width || l.height) && (a.node.isBlock && a.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(a.dom.nodeName) && (!o && l.left > n.left || l.top > n.top ? i = a.posBefore : (!o && l.right < n.left || l.bottom < n.top) && (i = a.posAfter), o = !0), !a.contentDOM && i < 0 && !a.node.isText))
      return (a.node.isBlock ? n.top < (l.top + l.bottom) / 2 : n.left < (l.left + l.right) / 2) ? a.posBefore : a.posAfter;
    r = a.dom.parentNode;
  }
  return i > -1 ? i : s.docView.posFromDOM(e, t, -1);
}
function Ga(s, e, t) {
  let n = s.childNodes.length;
  if (n && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(n - 1, Math.floor(n * (e.top - t.top) / (t.bottom - t.top)) - 2)), r = i; ; ) {
      let o = s.childNodes[r];
      if (o.nodeType == 1) {
        let a = o.getClientRects();
        for (let l = 0; l < a.length; l++) {
          let h = a[l];
          if (tr(e, h))
            return Ga(o, e, h);
        }
      }
      if ((r = (r + 1) % n) == i)
        break;
    }
  return s;
}
function Gc(s, e) {
  let t = s.dom.ownerDocument, n, i = 0, r = Vc(t, e.left, e.top);
  r && ({ node: n, offset: i } = r);
  let o = (s.root.elementFromPoint ? s.root : t).elementFromPoint(e.left, e.top), a;
  if (!o || !s.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let h = s.dom.getBoundingClientRect();
    if (!tr(e, h) || (o = Ga(s.dom, e, h), !o))
      return null;
  }
  if (re)
    for (let h = o; n && h; h = Lt(h))
      h.draggable && (n = void 0);
  if (o = Uc(o, e), n) {
    if (Se && n.nodeType == 1 && (i = Math.min(i, n.childNodes.length), i < n.childNodes.length)) {
      let c = n.childNodes[i], u;
      c.nodeName == "IMG" && (u = c.getBoundingClientRect()).right <= e.left && u.bottom > e.top && i++;
    }
    let h;
    wn && i && n.nodeType == 1 && (h = n.childNodes[i - 1]).nodeType == 1 && h.contentEditable == "false" && h.getBoundingClientRect().top >= e.top && i--, n == s.dom && i == n.childNodes.length - 1 && n.lastChild.nodeType == 1 && e.top > n.lastChild.getBoundingClientRect().bottom ? a = s.state.doc.content.size : (i == 0 || n.nodeType != 1 || n.childNodes[i - 1].nodeName != "BR") && (a = Kc(s, n, i, e));
  }
  a == null && (a = jc(s, o, e));
  let l = s.docView.nearestDesc(o, !0);
  return { pos: a, inside: l ? l.posAtStart - l.border : -1 };
}
function oo(s) {
  return s.top < s.bottom || s.left < s.right;
}
function Be(s, e) {
  let t = s.getClientRects();
  if (t.length) {
    let n = t[e < 0 ? 0 : t.length - 1];
    if (oo(n))
      return n;
  }
  return Array.prototype.find.call(t, oo) || s.getBoundingClientRect();
}
const qc = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function qa(s, e, t) {
  let { node: n, offset: i, atom: r } = s.docView.domFromPos(e, t < 0 ? -1 : 1), o = wn || Se;
  if (n.nodeType == 3)
    if (o && (qc.test(n.nodeValue) || (t < 0 ? !i : i == n.nodeValue.length))) {
      let l = Be(Le(n, i, i), t);
      if (Se && i && /\s/.test(n.nodeValue[i - 1]) && i < n.nodeValue.length) {
        let h = Be(Le(n, i - 1, i - 1), -1);
        if (h.top == l.top) {
          let c = Be(Le(n, i, i + 1), -1);
          if (c.top != l.top)
            return _t(c, c.left < h.left);
        }
      }
      return l;
    } else {
      let l = i, h = i, c = t < 0 ? 1 : -1;
      return t < 0 && !i ? (h++, c = -1) : t >= 0 && i == n.nodeValue.length ? (l--, c = 1) : t < 0 ? l-- : h++, _t(Be(Le(n, l, h), c), c < 0);
    }
  if (!s.state.doc.resolve(e - (r || 0)).parent.inlineContent) {
    if (r == null && i && (t < 0 || i == xe(n))) {
      let l = n.childNodes[i - 1];
      if (l.nodeType == 1)
        return ti(l.getBoundingClientRect(), !1);
    }
    if (r == null && i < xe(n)) {
      let l = n.childNodes[i];
      if (l.nodeType == 1)
        return ti(l.getBoundingClientRect(), !0);
    }
    return ti(n.getBoundingClientRect(), t >= 0);
  }
  if (r == null && i && (t < 0 || i == xe(n))) {
    let l = n.childNodes[i - 1], h = l.nodeType == 3 ? Le(l, xe(l) - (o ? 0 : 1)) : l.nodeType == 1 && (l.nodeName != "BR" || !l.nextSibling) ? l : null;
    if (h)
      return _t(Be(h, 1), !1);
  }
  if (r == null && i < xe(n)) {
    let l = n.childNodes[i];
    for (; l.pmViewDesc && l.pmViewDesc.ignoreForCoords; )
      l = l.nextSibling;
    let h = l ? l.nodeType == 3 ? Le(l, 0, o ? 0 : 1) : l.nodeType == 1 ? l : null : null;
    if (h)
      return _t(Be(h, -1), !0);
  }
  return _t(Be(n.nodeType == 3 ? Le(n) : n, -t), t >= 0);
}
function _t(s, e) {
  if (s.width == 0)
    return s;
  let t = e ? s.left : s.right;
  return { top: s.top, bottom: s.bottom, left: t, right: t };
}
function ti(s, e) {
  if (s.height == 0)
    return s;
  let t = e ? s.top : s.bottom;
  return { top: t, bottom: t, left: s.left, right: s.right };
}
function Ja(s, e, t) {
  let n = s.state, i = s.root.activeElement;
  n != e && s.updateState(e), i != s.dom && s.focus();
  try {
    return t();
  } finally {
    n != e && s.updateState(n), i != s.dom && i && i.focus();
  }
}
function Jc(s, e, t) {
  let n = e.selection, i = t == "up" ? n.$from : n.$to;
  return Ja(s, e, () => {
    let { node: r } = s.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let a = s.docView.nearestDesc(r, !0);
      if (!a)
        break;
      if (a.node.isBlock) {
        r = a.contentDOM || a.dom;
        break;
      }
      r = a.dom.parentNode;
    }
    let o = qa(s, i.pos, 1);
    for (let a = r.firstChild; a; a = a.nextSibling) {
      let l;
      if (a.nodeType == 1)
        l = a.getClientRects();
      else if (a.nodeType == 3)
        l = Le(a, 0, a.nodeValue.length).getClientRects();
      else
        continue;
      for (let h = 0; h < l.length; h++) {
        let c = l[h];
        if (c.bottom > c.top + 1 && (t == "up" ? o.top - c.top > (c.bottom - o.top) * 2 : c.bottom - o.bottom > (o.bottom - c.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Xc = /[\u0590-\u08ac]/;
function Qc(s, e, t) {
  let { $head: n } = e.selection;
  if (!n.parent.isTextblock)
    return !1;
  let i = n.parentOffset, r = !i, o = i == n.parent.content.size, a = s.domSelection();
  return a ? !Xc.test(n.parent.textContent) || !a.modify ? t == "left" || t == "backward" ? r : o : Ja(s, e, () => {
    let { focusNode: l, focusOffset: h, anchorNode: c, anchorOffset: u } = s.domSelectionRange(), d = a.caretBidiLevel;
    a.modify("move", t, "character");
    let f = n.depth ? s.docView.domAfterPos(n.before()) : s.dom, { focusNode: p, focusOffset: m } = s.domSelectionRange(), g = p && !f.contains(p.nodeType == 1 ? p : p.parentNode) || l == p && h == m;
    try {
      a.collapse(c, u), l && (l != c || h != u) && a.extend && a.extend(l, h);
    } catch {
    }
    return d != null && (a.caretBidiLevel = d), g;
  }) : n.pos == n.start() || n.pos == n.end();
}
let ao = null, lo = null, ho = !1;
function Zc(s, e, t) {
  return ao == e && lo == t ? ho : (ao = e, lo = t, ho = t == "up" || t == "down" ? Jc(s, e, t) : Qc(s, e, t));
}
const ve = 0, co = 1, at = 2, Ae = 3;
class Tn {
  constructor(e, t, n, i) {
    this.parent = e, this.children = t, this.dom = n, this.contentDOM = i, this.dirty = ve, n.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, n) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, n = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return n;
      n += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, n) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (n < 0) {
        let r, o;
        if (e == this.contentDOM)
          r = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          r = e.previousSibling;
        }
        for (; r && !((o = r.pmViewDesc) && o.parent == this); )
          r = r.previousSibling;
        return r ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let r, o;
        if (e == this.contentDOM)
          r = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          r = e.nextSibling;
        }
        for (; r && !((o = r.pmViewDesc) && o.parent == this); )
          r = r.nextSibling;
        return r ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > Q(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let r = e; ; r = r.parentNode) {
          if (r == this.dom) {
            i = !1;
            break;
          }
          if (r.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let r = e; ; r = r.parentNode) {
          if (r == this.dom) {
            i = !0;
            break;
          }
          if (r.nextSibling)
            break;
        }
    }
    return i ?? n > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let n = !0, i = e; i; i = i.parentNode) {
      let r = this.getDesc(i), o;
      if (r && (!t || r.node))
        if (n && (o = r.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          n = !1;
        else
          return r;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let n = t; n; n = n.parent)
      if (n == this)
        return t;
  }
  posFromDOM(e, t, n) {
    for (let i = e; i; i = i.parentNode) {
      let r = this.getDesc(i);
      if (r)
        return r.localPosFromDOM(e, t, n);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, n = 0; t < this.children.length; t++) {
      let i = this.children[t], r = n + i.size;
      if (n == e && r != n) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let a = i.children[o];
            if (a.size) {
              i = a;
              break;
            }
          }
        return i;
      }
      if (e < r)
        return i.descAt(e - n - i.border);
      n = r;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let n = 0, i = 0;
    for (let r = 0; n < this.children.length; n++) {
      let o = this.children[n], a = r + o.size;
      if (a > e || o instanceof Qa) {
        i = e - r;
        break;
      }
      r = a;
    }
    if (i)
      return this.children[n].domFromPos(i - this.children[n].border, t);
    for (let r; n && !(r = this.children[n - 1]).size && r instanceof Xa && r.side >= 0; n--)
      ;
    if (t <= 0) {
      let r, o = !0;
      for (; r = n ? this.children[n - 1] : null, !(!r || r.dom.parentNode == this.contentDOM); n--, o = !1)
        ;
      return r && t && o && !r.border && !r.domAtom ? r.domFromPos(r.size, t) : { node: this.contentDOM, offset: r ? Q(r.dom) + 1 : 0 };
    } else {
      let r, o = !0;
      for (; r = n < this.children.length ? this.children[n] : null, !(!r || r.dom.parentNode == this.contentDOM); n++, o = !1)
        ;
      return r && o && !r.border && !r.domAtom ? r.domFromPos(0, t) : { node: this.contentDOM, offset: r ? Q(r.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, n = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, r = -1;
    for (let o = n, a = 0; ; a++) {
      let l = this.children[a], h = o + l.size;
      if (i == -1 && e <= h) {
        let c = o + l.border;
        if (e >= c && t <= h - l.border && l.node && l.contentDOM && this.contentDOM.contains(l.contentDOM))
          return l.parseRange(e, t, c);
        e = o;
        for (let u = a; u > 0; u--) {
          let d = this.children[u - 1];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(1)) {
            i = Q(d.dom) + 1;
            break;
          }
          e -= d.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (h > t || a == this.children.length - 1)) {
        t = h;
        for (let c = a + 1; c < this.children.length; c++) {
          let u = this.children[c];
          if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(-1)) {
            r = Q(u.dom);
            break;
          }
          t += u.size;
        }
        r == -1 && (r = this.contentDOM.childNodes.length);
        break;
      }
      o = h;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: r };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: n } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || n == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[n];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, n, i = !1) {
    let r = Math.min(e, t), o = Math.max(e, t);
    for (let f = 0, p = 0; f < this.children.length; f++) {
      let m = this.children[f], g = p + m.size;
      if (r > p && o < g)
        return m.setSelection(e - p - m.border, t - p - m.border, n, i);
      p = g;
    }
    let a = this.domFromPos(e, e ? -1 : 1), l = t == e ? a : this.domFromPos(t, t ? -1 : 1), h = n.root.getSelection(), c = n.domSelectionRange(), u = !1;
    if ((Se || re) && e == t) {
      let { node: f, offset: p } = a;
      if (f.nodeType == 3) {
        if (u = !!(p && f.nodeValue[p - 1] == `
`), u && p == f.nodeValue.length)
          for (let m = f, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (a = l = { node: g.parentNode, offset: Q(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = f.childNodes[p - 1];
        u = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (Se && c.focusNode && c.focusNode != l.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (!(i || u && re) && bt(a.node, a.offset, c.anchorNode, c.anchorOffset) && bt(l.node, l.offset, c.focusNode, c.focusOffset))
      return;
    let d = !1;
    if ((h.extend || e == t) && !(u && Se)) {
      h.collapse(a.node, a.offset);
      try {
        e != t && h.extend(l.node, l.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let p = a;
        a = l, l = p;
      }
      let f = document.createRange();
      f.setEnd(l.node, l.offset), f.setStart(a.node, a.offset), h.removeAllRanges(), h.addRange(f);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let n = 0, i = 0; i < this.children.length; i++) {
      let r = this.children[i], o = n + r.size;
      if (n == o ? e <= o && t >= n : e < o && t > n) {
        let a = n + r.border, l = o - r.border;
        if (e >= a && t <= l) {
          this.dirty = e == n || t == o ? at : co, e == a && t == l && (r.contentLost || r.dom.parentNode != this.contentDOM) ? r.dirty = Ae : r.markDirty(e - a, t - a);
          return;
        } else
          r.dirty = r.dom == r.contentDOM && r.dom.parentNode == this.contentDOM && !r.children.length ? at : Ae;
      }
      n = o;
    }
    this.dirty = at;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let n = e == 1 ? at : co;
      t.dirty < n && (t.dirty = n);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Xa extends Tn {
  constructor(e, t, n, i) {
    let r, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(n, () => {
      if (!r)
        return i;
      if (r.parent)
        return r.parent.posBeforeChild(r);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let a = document.createElement("span");
        a.appendChild(o), o = a;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, r = this;
  }
  matchesWidget(e) {
    return this.dirty == ve && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class eu extends Tn {
  constructor(e, t, n, i) {
    super(e, [], t, null), this.textDOM = n, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class xt extends Tn {
  constructor(e, t, n, i, r) {
    super(e, [], n, i), this.mark = t, this.spec = r;
  }
  static create(e, t, n, i) {
    let r = i.nodeViews[t.type.name], o = r && r(t, i, n);
    return (!o || !o.dom) && (o = vt.renderSpec(document, t.type.spec.toDOM(t, n), null, t.attrs)), new xt(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & Ae || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != Ae && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != ve) {
      let n = this.parent;
      for (; !n.node; )
        n = n.parent;
      n.dirty < this.dirty && (n.dirty = this.dirty), this.dirty = ve;
    }
  }
  slice(e, t, n) {
    let i = xt.create(this.parent, this.mark, !0, n), r = this.children, o = this.size;
    t < o && (r = Ri(r, t, o, n)), e > 0 && (r = Ri(r, 0, e, n));
    for (let a = 0; a < r.length; a++)
      r[a].parent = i;
    return i.children = r, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class Xe extends Tn {
  constructor(e, t, n, i, r, o, a, l, h) {
    super(e, [], r, o), this.node = t, this.outerDeco = n, this.innerDeco = i, this.nodeDOM = a;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, n, i, r, o) {
    let a = r.nodeViews[t.type.name], l, h = a && a(t, r, () => {
      if (!l)
        return o;
      if (l.parent)
        return l.parent.posBeforeChild(l);
    }, n, i), c = h && h.dom, u = h && h.contentDOM;
    if (t.isText) {
      if (!c)
        c = document.createTextNode(t.text);
      else if (c.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else c || ({ dom: c, contentDOM: u } = vt.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !u && !t.isText && c.nodeName != "BR" && (c.hasAttribute("contenteditable") || (c.contentEditable = "false"), t.type.spec.draggable && (c.draggable = !0));
    let d = c;
    return c = tl(c, n, t), h ? l = new tu(e, t, n, i, c, u || null, d, h, r, o + 1) : t.isText ? new Ps(e, t, n, i, c, d, r) : new Xe(e, t, n, i, c, u || null, d, r, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let n = this.children[t];
        if (this.dom.contains(n.dom.parentNode)) {
          e.contentElement = n.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => b.empty);
    }
    return e;
  }
  matchesNode(e, t, n) {
    return this.dirty == ve && e.eq(this.node) && Gn(t, this.outerDeco) && n.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let n = this.node.inlineContent, i = t, r = e.composing ? this.localCompositionInfo(e, t) : null, o = r && r.pos > -1 ? r : null, a = r && r.pos < 0, l = new su(this, o && o.node, e);
    ou(this.node, this.innerDeco, (h, c, u) => {
      h.spec.marks ? l.syncToMarks(h.spec.marks, n, e) : h.type.side >= 0 && !u && l.syncToMarks(c == this.node.childCount ? V.none : this.node.child(c).marks, n, e), l.placeWidget(h, e, i);
    }, (h, c, u, d) => {
      l.syncToMarks(h.marks, n, e);
      let f;
      l.findNodeMatch(h, c, u, d) || a && e.state.selection.from > i && e.state.selection.to < i + h.nodeSize && (f = l.findIndexWithChild(r.node)) > -1 && l.updateNodeAt(h, c, u, f, e) || l.updateNextNode(h, c, u, e, d, i) || l.addNode(h, c, u, e, i), i += h.nodeSize;
    }), l.syncToMarks([], n, e), this.node.isTextblock && l.addTextblockHacks(), l.destroyRest(), (l.changed || this.dirty == at) && (o && this.protectLocalComposition(e, o), Za(this.contentDOM, this.children, e), Pt && au(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: n, to: i } = e.state.selection;
    if (!(e.state.selection instanceof A) || n < t || i > t + this.node.content.size)
      return null;
    let r = e.input.compositionNode;
    if (!r || !this.dom.contains(r.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = r.nodeValue, a = lu(this.node.content, o, n - t, i - t);
      return a < 0 ? null : { node: r, pos: a, text: o };
    } else
      return { node: r, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: n, text: i }) {
    if (this.getDesc(t))
      return;
    let r = t;
    for (; r.parentNode != this.contentDOM; r = r.parentNode) {
      for (; r.previousSibling; )
        r.parentNode.removeChild(r.previousSibling);
      for (; r.nextSibling; )
        r.parentNode.removeChild(r.nextSibling);
      r.pmViewDesc && (r.pmViewDesc = void 0);
    }
    let o = new eu(this, r, t, i);
    e.input.compositionNodes.push(o), this.children = Ri(this.children, n, n + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, n, i) {
    return this.dirty == Ae || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, n, i), !0);
  }
  updateInner(e, t, n, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = n, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = ve;
  }
  updateOuterDeco(e) {
    if (Gn(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, n = this.dom;
    this.dom = el(this.dom, this.nodeDOM, Ni(this.outerDeco, this.node, t), Ni(e, this.node, t)), this.dom != n && (n.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function uo(s, e, t, n, i) {
  tl(n, e, s);
  let r = new Xe(void 0, s, e, t, n, n, n, i, 0);
  return r.contentDOM && r.updateChildren(i, 0), r;
}
class Ps extends Xe {
  constructor(e, t, n, i, r, o, a) {
    super(e, t, n, i, r, null, o, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, n, i) {
    return this.dirty == Ae || this.dirty != ve && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != ve || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = ve, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, n) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, n);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, n) {
    let i = this.node.cut(e, t), r = document.createTextNode(i.text);
    return new Ps(this.parent, i, this.outerDeco, this.innerDeco, r, r, n);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = Ae);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Qa extends Tn {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == ve && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class tu extends Xe {
  constructor(e, t, n, i, r, o, a, l, h, c) {
    super(e, t, n, i, r, o, a, h, c), this.spec = l;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, n, i) {
    if (this.dirty == Ae)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let r = this.spec.update(e, t, n);
      return r && this.updateInner(e, t, n, i), r;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, n, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, n, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, n.root) : super.setSelection(e, t, n, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Za(s, e, t) {
  let n = s.firstChild, i = !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r], a = o.dom;
    if (a.parentNode == s) {
      for (; a != n; )
        n = fo(n), i = !0;
      n = n.nextSibling;
    } else
      i = !0, s.insertBefore(a, n);
    if (o instanceof xt) {
      let l = n ? n.previousSibling : s.lastChild;
      Za(o.contentDOM, o.children, t), n = l ? l.nextSibling : s.firstChild;
    }
  }
  for (; n; )
    n = fo(n), i = !0;
  i && t.trackWrites == s && (t.trackWrites = null);
}
const en = function(s) {
  s && (this.nodeName = s);
};
en.prototype = /* @__PURE__ */ Object.create(null);
const lt = [new en()];
function Ni(s, e, t) {
  if (s.length == 0)
    return lt;
  let n = t ? lt[0] : new en(), i = [n];
  for (let r = 0; r < s.length; r++) {
    let o = s[r].type.attrs;
    if (o) {
      o.nodeName && i.push(n = new en(o.nodeName));
      for (let a in o) {
        let l = o[a];
        l != null && (t && i.length == 1 && i.push(n = new en(e.isInline ? "span" : "div")), a == "class" ? n.class = (n.class ? n.class + " " : "") + l : a == "style" ? n.style = (n.style ? n.style + ";" : "") + l : a != "nodeName" && (n[a] = l));
      }
    }
  }
  return i;
}
function el(s, e, t, n) {
  if (t == lt && n == lt)
    return e;
  let i = e;
  for (let r = 0; r < n.length; r++) {
    let o = n[r], a = t[r];
    if (r) {
      let l;
      a && a.nodeName == o.nodeName && i != s && (l = i.parentNode) && l.nodeName.toLowerCase() == o.nodeName || (l = document.createElement(o.nodeName), l.pmIsDeco = !0, l.appendChild(i), a = lt[0]), i = l;
    }
    nu(i, a || lt[0], o);
  }
  return i;
}
function nu(s, e, t) {
  for (let n in e)
    n != "class" && n != "style" && n != "nodeName" && !(n in t) && s.removeAttribute(n);
  for (let n in t)
    n != "class" && n != "style" && n != "nodeName" && t[n] != e[n] && s.setAttribute(n, t[n]);
  if (e.class != t.class) {
    let n = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let r = 0; r < n.length; r++)
      i.indexOf(n[r]) == -1 && s.classList.remove(n[r]);
    for (let r = 0; r < i.length; r++)
      n.indexOf(i[r]) == -1 && s.classList.add(i[r]);
    s.classList.length == 0 && s.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let n = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = n.exec(e.style); )
        s.style.removeProperty(i[1]);
    }
    t.style && (s.style.cssText += t.style);
  }
}
function tl(s, e, t) {
  return el(s, s, lt, Ni(e, t, s.nodeType != 1));
}
function Gn(s, e) {
  if (s.length != e.length)
    return !1;
  for (let t = 0; t < s.length; t++)
    if (!s[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function fo(s) {
  let e = s.nextSibling;
  return s.parentNode.removeChild(s), e;
}
class su {
  constructor(e, t, n) {
    this.lock = t, this.view = n, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = iu(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let n = e; n < t; n++)
        this.top.children[n].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, n) {
    let i = 0, r = this.stack.length >> 1, o = Math.min(r, e.length);
    for (; i < o && (i == r - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < r; )
      this.destroyRest(), this.top.dirty = ve, this.index = this.stack.pop(), this.top = this.stack.pop(), r--;
    for (; r < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1;
      for (let l = this.index; l < Math.min(this.index + 3, this.top.children.length); l++) {
        let h = this.top.children[l];
        if (h.matchesMark(e[r]) && !this.isLocked(h.dom)) {
          a = l;
          break;
        }
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let l = xt.create(this.top, e[r], t, n);
        this.top.children.splice(this.index, 0, l), this.top = l, this.changed = !0;
      }
      this.index = 0, r++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, n, i) {
    let r = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, n))
      r = this.top.children.indexOf(o, this.index);
    else
      for (let a = this.index, l = Math.min(this.top.children.length, a + 5); a < l; a++) {
        let h = this.top.children[a];
        if (h.matchesNode(e, t, n) && !this.preMatch.matched.has(h)) {
          r = a;
          break;
        }
      }
    return r < 0 ? !1 : (this.destroyBetween(this.index, r), this.index++, !0);
  }
  updateNodeAt(e, t, n, i, r) {
    let o = this.top.children[i];
    return o.dirty == Ae && o.dom == o.contentDOM && (o.dirty = at), o.update(e, t, n, r) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let n = e.pmViewDesc;
        if (n) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == n)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, n, i, r, o) {
    for (let a = this.index; a < this.top.children.length; a++) {
      let l = this.top.children[a];
      if (l instanceof Xe) {
        let h = this.preMatch.matched.get(l);
        if (h != null && h != r)
          return !1;
        let c = l.dom, u, d = this.isLocked(c) && !(e.isText && l.node && l.node.isText && l.nodeDOM.nodeValue == e.text && l.dirty != Ae && Gn(t, l.outerDeco));
        if (!d && l.update(e, t, n, i))
          return this.destroyBetween(this.index, a), l.dom != c && (this.changed = !0), this.index++, !0;
        if (!d && (u = this.recreateWrapper(l, e, t, n, i, o)))
          return this.destroyBetween(this.index, a), this.top.children[this.index] = u, u.contentDOM && (u.dirty = at, u.updateChildren(i, o + 1), u.dirty = ve), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, n, i, r, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Gn(n, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let a = Xe.create(this.top, t, n, i, r, o);
    if (a.contentDOM) {
      a.children = e.children, e.children = [];
      for (let l of a.children)
        l.parent = a;
    }
    return e.destroy(), a;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, n, i, r) {
    let o = Xe.create(this.top, e, t, n, i, r);
    o.contentDOM && o.updateChildren(i, r + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, n) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let r = new Xa(this.top, e, t, n);
      this.top.children.splice(this.index++, 0, r), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof xt; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Ps) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((re || ne) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let n = document.createElement(e);
      e == "IMG" && (n.className = "ProseMirror-separator", n.alt = ""), e == "BR" && (n.className = "ProseMirror-trailingBreak");
      let i = new Qa(this.top, [], n, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function iu(s, e) {
  let t = e, n = t.children.length, i = s.childCount, r = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let a;
    for (; ; )
      if (n) {
        let h = t.children[n - 1];
        if (h instanceof xt)
          t = h, n = h.children.length;
        else {
          a = h, n--;
          break;
        }
      } else {
        if (t == e)
          break e;
        n = t.parent.children.indexOf(t), t = t.parent;
      }
    let l = a.node;
    if (l) {
      if (l != s.child(i - 1))
        break;
      --i, r.set(a, i), o.push(a);
    }
  }
  return { index: i, matched: r, matches: o.reverse() };
}
function ru(s, e) {
  return s.type.side - e.type.side;
}
function ou(s, e, t, n) {
  let i = e.locals(s), r = 0;
  if (i.length == 0) {
    for (let h = 0; h < s.childCount; h++) {
      let c = s.child(h);
      n(c, i, e.forChild(r, c), h), r += c.nodeSize;
    }
    return;
  }
  let o = 0, a = [], l = null;
  for (let h = 0; ; ) {
    let c, u;
    for (; o < i.length && i[o].to == r; ) {
      let g = i[o++];
      g.widget && (c ? (u || (u = [c])).push(g) : c = g);
    }
    if (c)
      if (u) {
        u.sort(ru);
        for (let g = 0; g < u.length; g++)
          t(u[g], h, !!l);
      } else
        t(c, h, !!l);
    let d, f;
    if (l)
      f = -1, d = l, l = null;
    else if (h < s.childCount)
      f = h, d = s.child(h++);
    else
      break;
    for (let g = 0; g < a.length; g++)
      a[g].to <= r && a.splice(g--, 1);
    for (; o < i.length && i[o].from <= r && i[o].to > r; )
      a.push(i[o++]);
    let p = r + d.nodeSize;
    if (d.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let y = 0; y < a.length; y++)
        a[y].to < g && (g = a[y].to);
      g < p && (l = d.cut(g - r), d = d.cut(0, g - r), p = g, f = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = d.isInline && !d.isLeaf ? a.filter((g) => !g.inline) : a.slice();
    n(d, m, e.forChild(r, d), f), r = p;
  }
}
function au(s) {
  if (s.nodeName == "UL" || s.nodeName == "OL") {
    let e = s.style.cssText;
    s.style.cssText = e + "; list-style: square !important", window.getComputedStyle(s).listStyle, s.style.cssText = e;
  }
}
function lu(s, e, t, n) {
  for (let i = 0, r = 0; i < s.childCount && r <= n; ) {
    let o = s.child(i++), a = r;
    if (r += o.nodeSize, !o.isText)
      continue;
    let l = o.text;
    for (; i < s.childCount; ) {
      let h = s.child(i++);
      if (r += h.nodeSize, !h.isText)
        break;
      l += h.text;
    }
    if (r >= t) {
      if (r >= n && l.slice(n - e.length - a, n - a) == e)
        return n - e.length;
      let h = a < n ? l.lastIndexOf(e, n - a - 1) : -1;
      if (h >= 0 && h + e.length + a >= t)
        return a + h;
      if (t == n && l.length >= n + e.length - a && l.slice(n - a, n - a + e.length) == e)
        return n;
    }
  }
  return -1;
}
function Ri(s, e, t, n, i) {
  let r = [];
  for (let o = 0, a = 0; o < s.length; o++) {
    let l = s[o], h = a, c = a += l.size;
    h >= t || c <= e ? r.push(l) : (h < e && r.push(l.slice(0, e - h, n)), i && (r.push(i), i = void 0), c > t && r.push(l.slice(t - h, l.size, n)));
  }
  return r;
}
function nr(s, e = null) {
  let t = s.domSelectionRange(), n = s.state.doc;
  if (!t.focusNode)
    return null;
  let i = s.docView.nearestDesc(t.focusNode), r = i && i.size == 0, o = s.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let a = n.resolve(o), l, h;
  if (Ls(t)) {
    for (l = o; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && T.isSelectable(u) && i.parent && !(u.isInline && Lc(t.focusNode, t.focusOffset, i.dom))) {
      let d = i.posBefore;
      h = new T(o == d ? a : n.resolve(d));
    }
  } else {
    if (t instanceof s.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let u = o, d = o;
      for (let f = 0; f < t.rangeCount; f++) {
        let p = t.getRangeAt(f);
        u = Math.min(u, s.docView.posFromDOM(p.startContainer, p.startOffset, 1)), d = Math.max(d, s.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (u < 0)
        return null;
      [l, o] = d == s.state.selection.anchor ? [d, u] : [u, d], a = n.resolve(o);
    } else
      l = s.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (l < 0)
      return null;
  }
  let c = n.resolve(l);
  if (!h) {
    let u = e == "pointer" || s.state.selection.head < a.pos && !r ? 1 : -1;
    h = sr(s, c, a, u);
  }
  return h;
}
function nl(s) {
  return s.editable ? s.hasFocus() : il(s) && document.activeElement && document.activeElement.contains(s.dom);
}
function $e(s, e = !1) {
  let t = s.state.selection;
  if (sl(s, t), !!nl(s)) {
    if (!e && s.input.mouseDown && s.input.mouseDown.allowDefault && ne) {
      let n = s.domSelectionRange(), i = s.domObserver.currentSelection;
      if (n.anchorNode && i.anchorNode && bt(n.anchorNode, n.anchorOffset, i.anchorNode, i.anchorOffset)) {
        s.input.mouseDown.delayedSelectionSync = !0, s.domObserver.setCurSelection();
        return;
      }
    }
    if (s.domObserver.disconnectSelection(), s.cursorWrapper)
      cu(s);
    else {
      let { anchor: n, head: i } = t, r, o;
      po && !(t instanceof A) && (t.$from.parent.inlineContent || (r = mo(s, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = mo(s, t.to))), s.docView.setSelection(n, i, s, e), po && (r && go(r), o && go(o)), t.visible ? s.dom.classList.remove("ProseMirror-hideselection") : (s.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && hu(s));
    }
    s.domObserver.setCurSelection(), s.domObserver.connectSelection();
  }
}
const po = re || ne && Ya < 63;
function mo(s, e) {
  let { node: t, offset: n } = s.docView.domFromPos(e, 0), i = n < t.childNodes.length ? t.childNodes[n] : null, r = n ? t.childNodes[n - 1] : null;
  if (re && i && i.contentEditable == "false")
    return ni(i);
  if ((!i || i.contentEditable == "false") && (!r || r.contentEditable == "false")) {
    if (i)
      return ni(i);
    if (r)
      return ni(r);
  }
}
function ni(s) {
  return s.contentEditable = "true", re && s.draggable && (s.draggable = !1, s.wasDraggable = !0), s;
}
function go(s) {
  s.contentEditable = "false", s.wasDraggable && (s.draggable = !0, s.wasDraggable = null);
}
function hu(s) {
  let e = s.dom.ownerDocument;
  e.removeEventListener("selectionchange", s.input.hideSelectionGuard);
  let t = s.domSelectionRange(), n = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", s.input.hideSelectionGuard = () => {
    (t.anchorNode != n || t.anchorOffset != i) && (e.removeEventListener("selectionchange", s.input.hideSelectionGuard), setTimeout(() => {
      (!nl(s) || s.state.selection.visible) && s.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function cu(s) {
  let e = s.domSelection();
  if (!e)
    return;
  let t = s.cursorWrapper.dom, n = t.nodeName == "IMG";
  n ? e.collapse(t.parentNode, Q(t) + 1) : e.collapse(t, 0), !n && !s.state.selection.visible && de && Je <= 11 && (t.disabled = !0, t.disabled = !1);
}
function sl(s, e) {
  if (e instanceof T) {
    let t = s.docView.descAt(e.from);
    t != s.lastSelectedViewDesc && (yo(s), t && t.selectNode(), s.lastSelectedViewDesc = t);
  } else
    yo(s);
}
function yo(s) {
  s.lastSelectedViewDesc && (s.lastSelectedViewDesc.parent && s.lastSelectedViewDesc.deselectNode(), s.lastSelectedViewDesc = void 0);
}
function sr(s, e, t, n) {
  return s.someProp("createSelectionBetween", (i) => i(s, e, t)) || A.between(e, t, n);
}
function bo(s) {
  return s.editable && !s.hasFocus() ? !1 : il(s);
}
function il(s) {
  let e = s.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return s.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (s.editable || s.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function uu(s) {
  let e = s.docView.domFromPos(s.state.selection.anchor, 0), t = s.domSelectionRange();
  return bt(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Li(s, e) {
  let { $anchor: t, $head: n } = s.selection, i = e > 0 ? t.max(n) : t.min(n), r = i.parent.inlineContent ? i.depth ? s.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return r && N.findFrom(r, e);
}
function ze(s, e) {
  return s.dispatch(s.state.tr.setSelection(e).scrollIntoView()), !0;
}
function xo(s, e, t) {
  let n = s.state.selection;
  if (n instanceof A)
    if (t.indexOf("s") > -1) {
      let { $head: i } = n, r = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!r || r.isText || !r.isLeaf)
        return !1;
      let o = s.state.doc.resolve(i.pos + r.nodeSize * (e < 0 ? -1 : 1));
      return ze(s, new A(n.$anchor, o));
    } else if (n.empty) {
      if (s.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Li(s.state, e);
        return i && i instanceof T ? ze(s, i) : !1;
      } else if (!(be && t.indexOf("m") > -1)) {
        let i = n.$head, r = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!r || r.isText)
          return !1;
        let a = e < 0 ? i.pos - r.nodeSize : i.pos;
        return r.isAtom || (o = s.docView.descAt(a)) && !o.contentDOM ? T.isSelectable(r) ? ze(s, new T(e < 0 ? s.state.doc.resolve(i.pos - r.nodeSize) : i)) : wn ? ze(s, new A(s.state.doc.resolve(e < 0 ? a : a + r.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (n instanceof T && n.node.isInline)
      return ze(s, new A(e > 0 ? n.$to : n.$from));
    {
      let i = Li(s.state, e);
      return i ? ze(s, i) : !1;
    }
  }
}
function qn(s) {
  return s.nodeType == 3 ? s.nodeValue.length : s.childNodes.length;
}
function tn(s, e) {
  let t = s.pmViewDesc;
  return t && t.size == 0 && (e < 0 || s.nextSibling || s.nodeName != "BR");
}
function Dt(s, e) {
  return e < 0 ? du(s) : fu(s);
}
function du(s) {
  let e = s.domSelectionRange(), t = e.focusNode, n = e.focusOffset;
  if (!t)
    return;
  let i, r, o = !1;
  for (Se && t.nodeType == 1 && n < qn(t) && tn(t.childNodes[n], -1) && (o = !0); ; )
    if (n > 0) {
      if (t.nodeType != 1)
        break;
      {
        let a = t.childNodes[n - 1];
        if (tn(a, -1))
          i = t, r = --n;
        else if (a.nodeType == 3)
          t = a, n = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (rl(t))
        break;
      {
        let a = t.previousSibling;
        for (; a && tn(a, -1); )
          i = t.parentNode, r = Q(a), a = a.previousSibling;
        if (a)
          t = a, n = qn(t);
        else {
          if (t = t.parentNode, t == s.dom)
            break;
          n = 0;
        }
      }
    }
  o ? Pi(s, t, n) : i && Pi(s, i, r);
}
function fu(s) {
  let e = s.domSelectionRange(), t = e.focusNode, n = e.focusOffset;
  if (!t)
    return;
  let i = qn(t), r, o;
  for (; ; )
    if (n < i) {
      if (t.nodeType != 1)
        break;
      let a = t.childNodes[n];
      if (tn(a, 1))
        r = t, o = ++n;
      else
        break;
    } else {
      if (rl(t))
        break;
      {
        let a = t.nextSibling;
        for (; a && tn(a, 1); )
          r = a.parentNode, o = Q(a) + 1, a = a.nextSibling;
        if (a)
          t = a, n = 0, i = qn(t);
        else {
          if (t = t.parentNode, t == s.dom)
            break;
          n = i = 0;
        }
      }
    }
  r && Pi(s, r, o);
}
function rl(s) {
  let e = s.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function pu(s, e) {
  for (; s && e == s.childNodes.length && !vn(s); )
    e = Q(s) + 1, s = s.parentNode;
  for (; s && e < s.childNodes.length; ) {
    let t = s.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    s = t, e = 0;
  }
}
function mu(s, e) {
  for (; s && !e && !vn(s); )
    e = Q(s), s = s.parentNode;
  for (; s && e; ) {
    let t = s.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    s = t, e = s.childNodes.length;
  }
}
function Pi(s, e, t) {
  if (e.nodeType != 3) {
    let r, o;
    (o = pu(e, t)) ? (e = o, t = 0) : (r = mu(e, t)) && (e = r, t = r.nodeValue.length);
  }
  let n = s.domSelection();
  if (!n)
    return;
  if (Ls(n)) {
    let r = document.createRange();
    r.setEnd(e, t), r.setStart(e, t), n.removeAllRanges(), n.addRange(r);
  } else n.extend && n.extend(e, t);
  s.domObserver.setCurSelection();
  let { state: i } = s;
  setTimeout(() => {
    s.state == i && $e(s);
  }, 50);
}
function So(s, e) {
  let t = s.state.doc.resolve(e);
  if (!(ne || $c) && t.parent.inlineContent) {
    let i = s.coordsAtPos(e);
    if (e > t.start()) {
      let r = s.coordsAtPos(e - 1), o = (r.top + r.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(r.left - i.left) > 1)
        return r.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let r = s.coordsAtPos(e + 1), o = (r.top + r.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(r.left - i.left) > 1)
        return r.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(s.dom).direction == "rtl" ? "rtl" : "ltr";
}
function vo(s, e, t) {
  let n = s.state.selection;
  if (n instanceof A && !n.empty || t.indexOf("s") > -1 || be && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: r } = n;
  if (!i.parent.inlineContent || s.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Li(s.state, e);
    if (o && o instanceof T)
      return ze(s, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : r, a = n instanceof me ? N.near(o, e) : N.findFrom(o, e);
    return a ? ze(s, a) : !1;
  }
  return !1;
}
function wo(s, e) {
  if (!(s.state.selection instanceof A))
    return !0;
  let { $head: t, $anchor: n, empty: i } = s.state.selection;
  if (!t.sameParent(n))
    return !0;
  if (!i)
    return !1;
  if (s.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let r = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (r && !r.isText) {
    let o = s.state.tr;
    return e < 0 ? o.delete(t.pos - r.nodeSize, t.pos) : o.delete(t.pos, t.pos + r.nodeSize), s.dispatch(o), !0;
  }
  return !1;
}
function To(s, e, t) {
  s.domObserver.stop(), e.contentEditable = t, s.domObserver.start();
}
function gu(s) {
  if (!re || s.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = s.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let n = e.firstChild;
    To(s, n, "true"), setTimeout(() => To(s, n, "false"), 20);
  }
  return !1;
}
function yu(s) {
  let e = "";
  return s.ctrlKey && (e += "c"), s.metaKey && (e += "m"), s.altKey && (e += "a"), s.shiftKey && (e += "s"), e;
}
function bu(s, e) {
  let t = e.keyCode, n = yu(e);
  if (t == 8 || be && t == 72 && n == "c")
    return wo(s, -1) || Dt(s, -1);
  if (t == 46 && !e.shiftKey || be && t == 68 && n == "c")
    return wo(s, 1) || Dt(s, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || be && t == 66 && n == "c") {
    let i = t == 37 ? So(s, s.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return xo(s, i, n) || Dt(s, i);
  } else if (t == 39 || be && t == 70 && n == "c") {
    let i = t == 39 ? So(s, s.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return xo(s, i, n) || Dt(s, i);
  } else {
    if (t == 38 || be && t == 80 && n == "c")
      return vo(s, -1, n) || Dt(s, -1);
    if (t == 40 || be && t == 78 && n == "c")
      return gu(s) || vo(s, 1, n) || Dt(s, 1);
    if (n == (be ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function ir(s, e) {
  s.someProp("transformCopied", (f) => {
    e = f(e, s);
  });
  let t = [], { content: n, openStart: i, openEnd: r } = e;
  for (; i > 1 && r > 1 && n.childCount == 1 && n.firstChild.childCount == 1; ) {
    i--, r--;
    let f = n.firstChild;
    t.push(f.type.name, f.attrs != f.type.defaultAttrs ? f.attrs : null), n = f.content;
  }
  let o = s.someProp("clipboardSerializer") || vt.fromSchema(s.state.schema), a = ul(), l = a.createElement("div");
  l.appendChild(o.serializeFragment(n, { document: a }));
  let h = l.firstChild, c, u = 0;
  for (; h && h.nodeType == 1 && (c = cl[h.nodeName.toLowerCase()]); ) {
    for (let f = c.length - 1; f >= 0; f--) {
      let p = a.createElement(c[f]);
      for (; l.firstChild; )
        p.appendChild(l.firstChild);
      l.appendChild(p), u++;
    }
    h = l.firstChild;
  }
  h && h.nodeType == 1 && h.setAttribute("data-pm-slice", `${i} ${r}${u ? ` -${u}` : ""} ${JSON.stringify(t)}`);
  let d = s.someProp("clipboardTextSerializer", (f) => f(e, s)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: l, text: d, slice: e };
}
function ol(s, e, t, n, i) {
  let r = i.parent.type.spec.code, o, a;
  if (!t && !e)
    return null;
  let l = !!e && (n || r || !t);
  if (l) {
    if (s.someProp("transformPastedText", (d) => {
      e = d(e, r || n, s);
    }), r)
      return a = new S(b.from(s.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), s.someProp("transformPasted", (d) => {
        a = d(a, s, !0);
      }), a;
    let u = s.someProp("clipboardTextParser", (d) => d(e, i, n, s));
    if (u)
      a = u;
    else {
      let d = i.marks(), { schema: f } = s.state, p = vt.fromSchema(f);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(f.text(m, d)));
      });
    }
  } else
    s.someProp("transformPastedHTML", (u) => {
      t = u(t, s);
    }), o = wu(t), wn && Tu(o);
  let h = o && o.querySelector("[data-pm-slice]"), c = h && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(h.getAttribute("data-pm-slice") || "");
  if (c && c[3])
    for (let u = +c[3]; u > 0; u--) {
      let d = o.firstChild;
      for (; d && d.nodeType != 1; )
        d = d.nextSibling;
      if (!d)
        break;
      o = d;
    }
  if (a || (a = (s.someProp("clipboardParser") || s.someProp("domParser") || Qt.fromSchema(s.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(l || c),
    context: i,
    ruleFromNode(d) {
      return d.nodeName == "BR" && !d.nextSibling && d.parentNode && !xu.test(d.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), c)
    a = ku(ko(a, +c[1], +c[2]), c[4]);
  else if (a = S.maxOpen(Su(a.content, i), !0), a.openStart || a.openEnd) {
    let u = 0, d = 0;
    for (let f = a.content.firstChild; u < a.openStart && !f.type.spec.isolating; u++, f = f.firstChild)
      ;
    for (let f = a.content.lastChild; d < a.openEnd && !f.type.spec.isolating; d++, f = f.lastChild)
      ;
    a = ko(a, u, d);
  }
  return s.someProp("transformPasted", (u) => {
    a = u(a, s, l);
  }), a;
}
const xu = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Su(s, e) {
  if (s.childCount < 2)
    return s;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), r, o = [];
    if (s.forEach((a) => {
      if (!o)
        return;
      let l = i.findWrapping(a.type), h;
      if (!l)
        return o = null;
      if (h = o.length && r.length && ll(l, r, a, o[o.length - 1], 0))
        o[o.length - 1] = h;
      else {
        o.length && (o[o.length - 1] = hl(o[o.length - 1], r.length));
        let c = al(a, l);
        o.push(c), i = i.matchType(c.type), r = l;
      }
    }), o)
      return b.from(o);
  }
  return s;
}
function al(s, e, t = 0) {
  for (let n = e.length - 1; n >= t; n--)
    s = e[n].create(null, b.from(s));
  return s;
}
function ll(s, e, t, n, i) {
  if (i < s.length && i < e.length && s[i] == e[i]) {
    let r = ll(s, e, t, n.lastChild, i + 1);
    if (r)
      return n.copy(n.content.replaceChild(n.childCount - 1, r));
    if (n.contentMatchAt(n.childCount).matchType(i == s.length - 1 ? t.type : s[i + 1]))
      return n.copy(n.content.append(b.from(al(t, s, i + 1))));
  }
}
function hl(s, e) {
  if (e == 0)
    return s;
  let t = s.content.replaceChild(s.childCount - 1, hl(s.lastChild, e - 1)), n = s.contentMatchAt(s.childCount).fillBefore(b.empty, !0);
  return s.copy(t.append(n));
}
function Vi(s, e, t, n, i, r) {
  let o = e < 0 ? s.firstChild : s.lastChild, a = o.content;
  return s.childCount > 1 && (r = 0), i < n - 1 && (a = Vi(a, e, t, n, i + 1, r)), i >= t && (a = e < 0 ? o.contentMatchAt(0).fillBefore(a, r <= i).append(a) : a.append(o.contentMatchAt(o.childCount).fillBefore(b.empty, !0))), s.replaceChild(e < 0 ? 0 : s.childCount - 1, o.copy(a));
}
function ko(s, e, t) {
  return e < s.openStart && (s = new S(Vi(s.content, -1, e, s.openStart, 0, s.openEnd), e, s.openEnd)), t < s.openEnd && (s = new S(Vi(s.content, 1, t, s.openEnd, 0, 0), s.openStart, t)), s;
}
const cl = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let Do = null;
function ul() {
  return Do || (Do = document.implementation.createHTMLDocument("title"));
}
let si = null;
function vu(s) {
  let e = window.trustedTypes;
  return e ? (si || (si = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), si.createHTML(s)) : s;
}
function wu(s) {
  let e = /^(\s*<meta [^>]*>)*/.exec(s);
  e && (s = s.slice(e[0].length));
  let t = ul().createElement("div"), n = /<([a-z][^>\s]+)/i.exec(s), i;
  if ((i = n && cl[n[1].toLowerCase()]) && (s = i.map((r) => "<" + r + ">").join("") + s + i.map((r) => "</" + r + ">").reverse().join("")), t.innerHTML = vu(s), i)
    for (let r = 0; r < i.length; r++)
      t = t.querySelector(i[r]) || t;
  return t;
}
function Tu(s) {
  let e = s.querySelectorAll(ne ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    n.childNodes.length == 1 && n.textContent == " " && n.parentNode && n.parentNode.replaceChild(s.ownerDocument.createTextNode(" "), n);
  }
}
function ku(s, e) {
  if (!s.size)
    return s;
  let t = s.content.firstChild.type.schema, n;
  try {
    n = JSON.parse(e);
  } catch {
    return s;
  }
  let { content: i, openStart: r, openEnd: o } = s;
  for (let a = n.length - 2; a >= 0; a -= 2) {
    let l = t.nodes[n[a]];
    if (!l || l.hasRequiredAttrs())
      break;
    i = b.from(l.create(n[a + 1], i)), r++, o++;
  }
  return new S(i, r, o);
}
const oe = {}, ae = {}, Du = { touchstart: !0, touchmove: !0 };
class Eu {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Cu(s) {
  for (let e in oe) {
    let t = oe[e];
    s.dom.addEventListener(e, s.input.eventHandlers[e] = (n) => {
      Au(s, n) && !rr(s, n) && (s.editable || !(n.type in ae)) && t(s, n);
    }, Du[e] ? { passive: !0 } : void 0);
  }
  re && s.dom.addEventListener("input", () => null), $i(s);
}
function Ge(s, e) {
  s.input.lastSelectionOrigin = e, s.input.lastSelectionTime = Date.now();
}
function Mu(s) {
  s.domObserver.stop();
  for (let e in s.input.eventHandlers)
    s.dom.removeEventListener(e, s.input.eventHandlers[e]);
  clearTimeout(s.input.composingTimeout), clearTimeout(s.input.lastIOSEnterFallbackTimeout);
}
function $i(s) {
  s.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      s.input.eventHandlers[t] || s.dom.addEventListener(t, s.input.eventHandlers[t] = (n) => rr(s, n));
  });
}
function rr(s, e) {
  return s.someProp("handleDOMEvents", (t) => {
    let n = t[e.type];
    return n ? n(s, e) || e.defaultPrevented : !1;
  });
}
function Au(s, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != s.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Ou(s, e) {
  !rr(s, e) && oe[e.type] && (s.editable || !(e.type in ae)) && oe[e.type](s, e);
}
ae.keydown = (s, e) => {
  let t = e;
  if (s.input.shiftKey = t.keyCode == 16 || t.shiftKey, !fl(s, t) && (s.input.lastKeyCode = t.keyCode, s.input.lastKeyCodeTime = Date.now(), !(Pe && ne && t.keyCode == 13)))
    if (t.keyCode != 229 && s.domObserver.forceFlush(), Pt && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let n = Date.now();
      s.input.lastIOSEnter = n, s.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        s.input.lastIOSEnter == n && (s.someProp("handleKeyDown", (i) => i(s, rt(13, "Enter"))), s.input.lastIOSEnter = 0);
      }, 200);
    } else s.someProp("handleKeyDown", (n) => n(s, t)) || bu(s, t) ? t.preventDefault() : Ge(s, "key");
};
ae.keyup = (s, e) => {
  e.keyCode == 16 && (s.input.shiftKey = !1);
};
ae.keypress = (s, e) => {
  let t = e;
  if (fl(s, t) || !t.charCode || t.ctrlKey && !t.altKey || be && t.metaKey)
    return;
  if (s.someProp("handleKeyPress", (i) => i(s, t))) {
    t.preventDefault();
    return;
  }
  let n = s.state.selection;
  if (!(n instanceof A) || !n.$from.sameParent(n.$to)) {
    let i = String.fromCharCode(t.charCode), r = () => s.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !s.someProp("handleTextInput", (o) => o(s, n.$from.pos, n.$to.pos, i, r)) && s.dispatch(r()), t.preventDefault();
  }
};
function Vs(s) {
  return { left: s.clientX, top: s.clientY };
}
function Iu(s, e) {
  let t = e.x - s.clientX, n = e.y - s.clientY;
  return t * t + n * n < 100;
}
function or(s, e, t, n, i) {
  if (n == -1)
    return !1;
  let r = s.state.doc.resolve(n);
  for (let o = r.depth + 1; o > 0; o--)
    if (s.someProp(e, (a) => o > r.depth ? a(s, t, r.nodeAfter, r.before(o), i, !0) : a(s, t, r.node(o), r.before(o), i, !1)))
      return !0;
  return !1;
}
function Nt(s, e, t) {
  if (s.focused || s.focus(), s.state.selection.eq(e))
    return;
  let n = s.state.tr.setSelection(e);
  n.setMeta("pointer", !0), s.dispatch(n);
}
function Nu(s, e) {
  if (e == -1)
    return !1;
  let t = s.state.doc.resolve(e), n = t.nodeAfter;
  return n && n.isAtom && T.isSelectable(n) ? (Nt(s, new T(t)), !0) : !1;
}
function Ru(s, e) {
  if (e == -1)
    return !1;
  let t = s.state.selection, n, i;
  t instanceof T && (n = t.node);
  let r = s.state.doc.resolve(e);
  for (let o = r.depth + 1; o > 0; o--) {
    let a = o > r.depth ? r.nodeAfter : r.node(o);
    if (T.isSelectable(a)) {
      n && t.$from.depth > 0 && o >= t.$from.depth && r.before(t.$from.depth + 1) == t.$from.pos ? i = r.before(t.$from.depth) : i = r.before(o);
      break;
    }
  }
  return i != null ? (Nt(s, T.create(s.state.doc, i)), !0) : !1;
}
function Lu(s, e, t, n, i) {
  return or(s, "handleClickOn", e, t, n) || s.someProp("handleClick", (r) => r(s, e, n)) || (i ? Ru(s, t) : Nu(s, t));
}
function Pu(s, e, t, n) {
  return or(s, "handleDoubleClickOn", e, t, n) || s.someProp("handleDoubleClick", (i) => i(s, e, n));
}
function Vu(s, e, t, n) {
  return or(s, "handleTripleClickOn", e, t, n) || s.someProp("handleTripleClick", (i) => i(s, e, n)) || $u(s, t, n);
}
function $u(s, e, t) {
  if (t.button != 0)
    return !1;
  let n = s.state.doc;
  if (e == -1)
    return n.inlineContent ? (Nt(s, A.create(n, 0, n.content.size)), !0) : !1;
  let i = n.resolve(e);
  for (let r = i.depth + 1; r > 0; r--) {
    let o = r > i.depth ? i.nodeAfter : i.node(r), a = i.before(r);
    if (o.inlineContent)
      Nt(s, A.create(n, a + 1, a + 1 + o.content.size));
    else if (T.isSelectable(o))
      Nt(s, T.create(n, a));
    else
      continue;
    return !0;
  }
}
function ar(s) {
  return Jn(s);
}
const dl = be ? "metaKey" : "ctrlKey";
oe.mousedown = (s, e) => {
  let t = e;
  s.input.shiftKey = t.shiftKey;
  let n = ar(s), i = Date.now(), r = "singleClick";
  i - s.input.lastClick.time < 500 && Iu(t, s.input.lastClick) && !t[dl] && s.input.lastClick.button == t.button && (s.input.lastClick.type == "singleClick" ? r = "doubleClick" : s.input.lastClick.type == "doubleClick" && (r = "tripleClick")), s.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: r, button: t.button };
  let o = s.posAtCoords(Vs(t));
  o && (r == "singleClick" ? (s.input.mouseDown && s.input.mouseDown.done(), s.input.mouseDown = new Fu(s, o, t, !!n)) : (r == "doubleClick" ? Pu : Vu)(s, o.pos, o.inside, t) ? t.preventDefault() : Ge(s, "pointer"));
};
class Fu {
  constructor(e, t, n, i) {
    this.view = e, this.pos = t, this.event = n, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!n[dl], this.allowDefault = n.shiftKey;
    let r, o;
    if (t.inside > -1)
      r = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let c = e.state.doc.resolve(t.pos);
      r = c.parent, o = c.depth ? c.before() : 0;
    }
    const a = i ? null : n.target, l = a ? e.docView.nearestDesc(a, !0) : null;
    this.target = l && l.nodeDOM.nodeType == 1 ? l.nodeDOM : null;
    let { selection: h } = e.state;
    (n.button == 0 && r.type.spec.draggable && r.type.spec.selectable !== !1 || h instanceof T && h.from <= o && h.to > o) && (this.mightDrag = {
      node: r,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Se && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Ge(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => $e(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Vs(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Ge(this.view, "pointer") : Lu(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    re && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    ne && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Nt(this.view, N.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Ge(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Ge(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
oe.touchstart = (s) => {
  s.input.lastTouch = Date.now(), ar(s), Ge(s, "pointer");
};
oe.touchmove = (s) => {
  s.input.lastTouch = Date.now(), Ge(s, "pointer");
};
oe.contextmenu = (s) => ar(s);
function fl(s, e) {
  return s.composing ? !0 : re && Math.abs(e.timeStamp - s.input.compositionEndedAt) < 500 ? (s.input.compositionEndedAt = -2e8, !0) : !1;
}
const Hu = Pe ? 5e3 : -1;
ae.compositionstart = ae.compositionupdate = (s) => {
  if (!s.composing) {
    s.domObserver.flush();
    let { state: e } = s, t = e.selection.$to;
    if (e.selection instanceof A && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((n) => n.type.spec.inclusive === !1)))
      s.markCursor = s.state.storedMarks || t.marks(), Jn(s, !0), s.markCursor = null;
    else if (Jn(s, !e.selection.empty), Se && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let n = s.domSelectionRange();
      for (let i = n.focusNode, r = n.focusOffset; i && i.nodeType == 1 && r != 0; ) {
        let o = r < 0 ? i.lastChild : i.childNodes[r - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let a = s.domSelection();
          a && a.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, r = -1;
      }
    }
    s.input.composing = !0;
  }
  pl(s, Hu);
};
ae.compositionend = (s, e) => {
  s.composing && (s.input.composing = !1, s.input.compositionEndedAt = e.timeStamp, s.input.compositionPendingChanges = s.domObserver.pendingRecords().length ? s.input.compositionID : 0, s.input.compositionNode = null, s.input.compositionPendingChanges && Promise.resolve().then(() => s.domObserver.flush()), s.input.compositionID++, pl(s, 20));
};
function pl(s, e) {
  clearTimeout(s.input.composingTimeout), e > -1 && (s.input.composingTimeout = setTimeout(() => Jn(s), e));
}
function ml(s) {
  for (s.composing && (s.input.composing = !1, s.input.compositionEndedAt = zu()); s.input.compositionNodes.length > 0; )
    s.input.compositionNodes.pop().markParentsDirty();
}
function Bu(s) {
  let e = s.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Nc(e.focusNode, e.focusOffset), n = Rc(e.focusNode, e.focusOffset);
  if (t && n && t != n) {
    let i = n.pmViewDesc, r = s.domObserver.lastChangedTextNode;
    if (t == r || n == r)
      return r;
    if (!i || !i.isText(n.nodeValue))
      return n;
    if (s.input.compositionNode == n) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return n;
    }
  }
  return t || n;
}
function zu() {
  let s = document.createEvent("Event");
  return s.initEvent("event", !0, !0), s.timeStamp;
}
function Jn(s, e = !1) {
  if (!(Pe && s.domObserver.flushingSoon >= 0)) {
    if (s.domObserver.forceFlush(), ml(s), e || s.docView && s.docView.dirty) {
      let t = nr(s), n = s.state.selection;
      return t && !t.eq(n) ? s.dispatch(s.state.tr.setSelection(t)) : (s.markCursor || e) && !n.$from.node(n.$from.sharedDepth(n.to)).inlineContent ? s.dispatch(s.state.tr.deleteSelection()) : s.updateState(s.state), !0;
    }
    return !1;
  }
}
function _u(s, e) {
  if (!s.dom.parentNode)
    return;
  let t = s.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let n = getSelection(), i = document.createRange();
  i.selectNodeContents(e), s.dom.blur(), n.removeAllRanges(), n.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), s.focus();
  }, 50);
}
const fn = de && Je < 15 || Pt && Fc < 604;
oe.copy = ae.cut = (s, e) => {
  let t = e, n = s.state.selection, i = t.type == "cut";
  if (n.empty)
    return;
  let r = fn ? null : t.clipboardData, o = n.content(), { dom: a, text: l } = ir(s, o);
  r ? (t.preventDefault(), r.clearData(), r.setData("text/html", a.innerHTML), r.setData("text/plain", l)) : _u(s, a), i && s.dispatch(s.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Wu(s) {
  return s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1 ? s.content.firstChild : null;
}
function Yu(s, e) {
  if (!s.dom.parentNode)
    return;
  let t = s.input.shiftKey || s.state.selection.$from.parent.type.spec.code, n = s.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (n.contentEditable = "true"), n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.focus();
  let i = s.input.shiftKey && s.input.lastKeyCode != 45;
  setTimeout(() => {
    s.focus(), n.parentNode && n.parentNode.removeChild(n), t ? pn(s, n.value, null, i, e) : pn(s, n.textContent, n.innerHTML, i, e);
  }, 50);
}
function pn(s, e, t, n, i) {
  let r = ol(s, e, t, n, s.state.selection.$from);
  if (s.someProp("handlePaste", (l) => l(s, i, r || S.empty)))
    return !0;
  if (!r)
    return !1;
  let o = Wu(r), a = o ? s.state.tr.replaceSelectionWith(o, n) : s.state.tr.replaceSelection(r);
  return s.dispatch(a.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function gl(s) {
  let e = s.getData("text/plain") || s.getData("Text");
  if (e)
    return e;
  let t = s.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
ae.paste = (s, e) => {
  let t = e;
  if (s.composing && !Pe)
    return;
  let n = fn ? null : t.clipboardData, i = s.input.shiftKey && s.input.lastKeyCode != 45;
  n && pn(s, gl(n), n.getData("text/html"), i, t) ? t.preventDefault() : Yu(s, t);
};
class yl {
  constructor(e, t, n) {
    this.slice = e, this.move = t, this.node = n;
  }
}
const Uu = be ? "altKey" : "ctrlKey";
function bl(s, e) {
  let t = s.someProp("dragCopies", (n) => !n(e));
  return t ?? !e[Uu];
}
oe.dragstart = (s, e) => {
  let t = e, n = s.input.mouseDown;
  if (n && n.done(), !t.dataTransfer)
    return;
  let i = s.state.selection, r = i.empty ? null : s.posAtCoords(Vs(t)), o;
  if (!(r && r.pos >= i.from && r.pos <= (i instanceof T ? i.to - 1 : i.to))) {
    if (n && n.mightDrag)
      o = T.create(s.state.doc, n.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let u = s.docView.nearestDesc(t.target, !0);
      u && u.node.type.spec.draggable && u != s.docView && (o = T.create(s.state.doc, u.posBefore));
    }
  }
  let a = (o || s.state.selection).content(), { dom: l, text: h, slice: c } = ir(s, a);
  (!t.dataTransfer.files.length || !ne || Ya > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(fn ? "Text" : "text/html", l.innerHTML), t.dataTransfer.effectAllowed = "copyMove", fn || t.dataTransfer.setData("text/plain", h), s.dragging = new yl(c, bl(s, t), o);
};
oe.dragend = (s) => {
  let e = s.dragging;
  window.setTimeout(() => {
    s.dragging == e && (s.dragging = null);
  }, 50);
};
ae.dragover = ae.dragenter = (s, e) => e.preventDefault();
ae.drop = (s, e) => {
  let t = e, n = s.dragging;
  if (s.dragging = null, !t.dataTransfer)
    return;
  let i = s.posAtCoords(Vs(t));
  if (!i)
    return;
  let r = s.state.doc.resolve(i.pos), o = n && n.slice;
  o ? s.someProp("transformPasted", (p) => {
    o = p(o, s, !1);
  }) : o = ol(s, gl(t.dataTransfer), fn ? null : t.dataTransfer.getData("text/html"), !1, r);
  let a = !!(n && bl(s, t));
  if (s.someProp("handleDrop", (p) => p(s, t, o || S.empty, a))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let l = o ? Pa(s.state.doc, r.pos, o) : r.pos;
  l == null && (l = r.pos);
  let h = s.state.tr;
  if (a) {
    let { node: p } = n;
    p ? p.replace(h) : h.deleteSelection();
  }
  let c = h.mapping.map(l), u = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, d = h.doc;
  if (u ? h.replaceRangeWith(c, c, o.content.firstChild) : h.replaceRange(c, c, o), h.doc.eq(d))
    return;
  let f = h.doc.resolve(c);
  if (u && T.isSelectable(o.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(o.content.firstChild))
    h.setSelection(new T(f));
  else {
    let p = h.mapping.map(l);
    h.mapping.maps[h.mapping.maps.length - 1].forEach((m, g, y, v) => p = v), h.setSelection(sr(s, f, h.doc.resolve(p)));
  }
  s.focus(), s.dispatch(h.setMeta("uiEvent", "drop"));
};
oe.focus = (s) => {
  s.input.lastFocus = Date.now(), s.focused || (s.domObserver.stop(), s.dom.classList.add("ProseMirror-focused"), s.domObserver.start(), s.focused = !0, setTimeout(() => {
    s.docView && s.hasFocus() && !s.domObserver.currentSelection.eq(s.domSelectionRange()) && $e(s);
  }, 20));
};
oe.blur = (s, e) => {
  let t = e;
  s.focused && (s.domObserver.stop(), s.dom.classList.remove("ProseMirror-focused"), s.domObserver.start(), t.relatedTarget && s.dom.contains(t.relatedTarget) && s.domObserver.currentSelection.clear(), s.focused = !1);
};
oe.beforeinput = (s, e) => {
  if (ne && Pe && e.inputType == "deleteContentBackward") {
    s.domObserver.flushSoon();
    let { domChangeCount: n } = s.input;
    setTimeout(() => {
      if (s.input.domChangeCount != n || (s.dom.blur(), s.focus(), s.someProp("handleKeyDown", (r) => r(s, rt(8, "Backspace")))))
        return;
      let { $cursor: i } = s.state.selection;
      i && i.pos > 0 && s.dispatch(s.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let s in ae)
  oe[s] = ae[s];
function mn(s, e) {
  if (s == e)
    return !0;
  for (let t in s)
    if (s[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in s))
      return !1;
  return !0;
}
class Xn {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || ft, this.side = this.spec.side || 0;
  }
  map(e, t, n, i) {
    let { pos: r, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new pe(r - n, r - n, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Xn && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && mn(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class Qe {
  constructor(e, t) {
    this.attrs = e, this.spec = t || ft;
  }
  map(e, t, n, i) {
    let r = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - n, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - n;
    return r >= o ? null : new pe(r, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof Qe && mn(this.attrs, e.attrs) && mn(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof Qe;
  }
  destroy() {
  }
}
class lr {
  constructor(e, t) {
    this.attrs = e, this.spec = t || ft;
  }
  map(e, t, n, i) {
    let r = e.mapResult(t.from + i, 1);
    if (r.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= r.pos ? null : new pe(r.pos - n, o.pos - n, this);
  }
  valid(e, t) {
    let { index: n, offset: i } = e.content.findIndex(t.from), r;
    return i == t.from && !(r = e.child(n)).isText && i + r.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof lr && mn(this.attrs, e.attrs) && mn(this.spec, e.spec);
  }
  destroy() {
  }
}
class pe {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.from = e, this.to = t, this.type = n;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new pe(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, n) {
    return this.type.map(e, this, t, n);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, n) {
    return new pe(e, e, new Xn(t, n));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, n, i) {
    return new pe(e, t, new Qe(n, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, n, i) {
    return new pe(e, t, new lr(n, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof Qe;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Xn;
  }
}
const Ct = [], ft = {};
class z {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Ct, this.children = t.length ? t : Ct;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Qn(t, e, 0, ft) : te;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, n) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, n), i;
  }
  findInner(e, t, n, i, r) {
    for (let o = 0; o < this.local.length; o++) {
      let a = this.local[o];
      a.from <= t && a.to >= e && (!r || r(a.spec)) && n.push(a.copy(a.from + i, a.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let a = this.children[o] + 1;
        this.children[o + 2].findInner(e - a, t - a, n, i + a, r);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, n) {
    return this == te || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, n || ft);
  }
  /**
  @internal
  */
  mapInner(e, t, n, i, r) {
    let o;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a].map(e, n, i);
      l && l.type.valid(t, l) ? (o || (o = [])).push(l) : r.onRemove && r.onRemove(this.local[a].spec);
    }
    return this.children.length ? ju(this.children, o || [], e, t, n, i, r) : o ? new z(o.sort(pt), Ct) : te;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == te ? z.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, n) {
    let i, r = 0;
    e.forEach((a, l) => {
      let h = l + n, c;
      if (c = Sl(t, a, h)) {
        for (i || (i = this.children.slice()); r < i.length && i[r] < l; )
          r += 3;
        i[r] == l ? i[r + 2] = i[r + 2].addInner(a, c, h + 1) : i.splice(r, 0, l, l + a.nodeSize, Qn(c, a, h + 1, ft)), r += 3;
      }
    });
    let o = xl(r ? vl(t) : t, -n);
    for (let a = 0; a < o.length; a++)
      o[a].type.valid(e, o[a]) || o.splice(a--, 1);
    return new z(o.length ? this.local.concat(o).sort(pt) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == te ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let n = this.children, i = this.local;
    for (let r = 0; r < n.length; r += 3) {
      let o, a = n[r] + t, l = n[r + 1] + t;
      for (let c = 0, u; c < e.length; c++)
        (u = e[c]) && u.from > a && u.to < l && (e[c] = null, (o || (o = [])).push(u));
      if (!o)
        continue;
      n == this.children && (n = this.children.slice());
      let h = n[r + 2].removeInner(o, a + 1);
      h != te ? n[r + 2] = h : (n.splice(r, 3), r -= 3);
    }
    if (i.length) {
      for (let r = 0, o; r < e.length; r++)
        if (o = e[r])
          for (let a = 0; a < i.length; a++)
            i[a].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(a--, 1));
    }
    return n == this.children && i == this.local ? this : i.length || n.length ? new z(i, n) : te;
  }
  forChild(e, t) {
    if (this == te)
      return this;
    if (t.isLeaf)
      return z.empty;
    let n, i;
    for (let a = 0; a < this.children.length; a += 3)
      if (this.children[a] >= e) {
        this.children[a] == e && (n = this.children[a + 2]);
        break;
      }
    let r = e + 1, o = r + t.content.size;
    for (let a = 0; a < this.local.length; a++) {
      let l = this.local[a];
      if (l.from < o && l.to > r && l.type instanceof Qe) {
        let h = Math.max(r, l.from) - r, c = Math.min(o, l.to) - r;
        h < c && (i || (i = [])).push(l.copy(h, c));
      }
    }
    if (i) {
      let a = new z(i.sort(pt), Ct);
      return n ? new Ye([a, n]) : a;
    }
    return n || te;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof z) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return hr(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == te)
      return Ct;
    if (e.inlineContent || !this.local.some(Qe.is))
      return this.local;
    let t = [];
    for (let n = 0; n < this.local.length; n++)
      this.local[n].type instanceof Qe || t.push(this.local[n]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
z.empty = new z([], []);
z.removeOverlap = hr;
const te = z.empty;
class Ye {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const n = this.members.map((i) => i.map(e, t, ft));
    return Ye.from(n);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return z.empty;
    let n = [];
    for (let i = 0; i < this.members.length; i++) {
      let r = this.members[i].forChild(e, t);
      r != te && (r instanceof Ye ? n = n.concat(r.members) : n.push(r));
    }
    return Ye.from(n);
  }
  eq(e) {
    if (!(e instanceof Ye) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, n = !0;
    for (let i = 0; i < this.members.length; i++) {
      let r = this.members[i].localsInner(e);
      if (r.length)
        if (!t)
          t = r;
        else {
          n && (t = t.slice(), n = !1);
          for (let o = 0; o < r.length; o++)
            t.push(r[o]);
        }
    }
    return t ? hr(n ? t : t.sort(pt)) : Ct;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return te;
      case 1:
        return e[0];
      default:
        return new Ye(e.every((t) => t instanceof z) ? e : e.reduce((t, n) => t.concat(n instanceof z ? n : n.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function ju(s, e, t, n, i, r, o) {
  let a = s.slice();
  for (let h = 0, c = r; h < t.maps.length; h++) {
    let u = 0;
    t.maps[h].forEach((d, f, p, m) => {
      let g = m - p - (f - d);
      for (let y = 0; y < a.length; y += 3) {
        let v = a[y + 1];
        if (v < 0 || d > v + c - u)
          continue;
        let E = a[y] + c - u;
        f >= E ? a[y + 1] = d <= E ? -2 : -1 : d >= c && g && (a[y] += g, a[y + 1] += g);
      }
      u += g;
    }), c = t.maps[h].map(c, -1);
  }
  let l = !1;
  for (let h = 0; h < a.length; h += 3)
    if (a[h + 1] < 0) {
      if (a[h + 1] == -2) {
        l = !0, a[h + 1] = -1;
        continue;
      }
      let c = t.map(s[h] + r), u = c - i;
      if (u < 0 || u >= n.content.size) {
        l = !0;
        continue;
      }
      let d = t.map(s[h + 1] + r, -1), f = d - i, { index: p, offset: m } = n.content.findIndex(u), g = n.maybeChild(p);
      if (g && m == u && m + g.nodeSize == f) {
        let y = a[h + 2].mapInner(t, g, c + 1, s[h] + r + 1, o);
        y != te ? (a[h] = u, a[h + 1] = f, a[h + 2] = y) : (a[h + 1] = -2, l = !0);
      } else
        l = !0;
    }
  if (l) {
    let h = Ku(a, s, e, t, i, r, o), c = Qn(h, n, 0, o);
    e = c.local;
    for (let u = 0; u < a.length; u += 3)
      a[u + 1] < 0 && (a.splice(u, 3), u -= 3);
    for (let u = 0, d = 0; u < c.children.length; u += 3) {
      let f = c.children[u];
      for (; d < a.length && a[d] < f; )
        d += 3;
      a.splice(d, 0, c.children[u], c.children[u + 1], c.children[u + 2]);
    }
  }
  return new z(e.sort(pt), a);
}
function xl(s, e) {
  if (!e || !s.length)
    return s;
  let t = [];
  for (let n = 0; n < s.length; n++) {
    let i = s[n];
    t.push(new pe(i.from + e, i.to + e, i.type));
  }
  return t;
}
function Ku(s, e, t, n, i, r, o) {
  function a(l, h) {
    for (let c = 0; c < l.local.length; c++) {
      let u = l.local[c].map(n, i, h);
      u ? t.push(u) : o.onRemove && o.onRemove(l.local[c].spec);
    }
    for (let c = 0; c < l.children.length; c += 3)
      a(l.children[c + 2], l.children[c] + h + 1);
  }
  for (let l = 0; l < s.length; l += 3)
    s[l + 1] == -1 && a(s[l + 2], e[l] + r + 1);
  return t;
}
function Sl(s, e, t) {
  if (e.isLeaf)
    return null;
  let n = t + e.nodeSize, i = null;
  for (let r = 0, o; r < s.length; r++)
    (o = s[r]) && o.from > t && o.to < n && ((i || (i = [])).push(o), s[r] = null);
  return i;
}
function vl(s) {
  let e = [];
  for (let t = 0; t < s.length; t++)
    s[t] != null && e.push(s[t]);
  return e;
}
function Qn(s, e, t, n) {
  let i = [], r = !1;
  e.forEach((a, l) => {
    let h = Sl(s, a, l + t);
    if (h) {
      r = !0;
      let c = Qn(h, a, t + l + 1, n);
      c != te && i.push(l, l + a.nodeSize, c);
    }
  });
  let o = xl(r ? vl(s) : s, -t).sort(pt);
  for (let a = 0; a < o.length; a++)
    o[a].type.valid(e, o[a]) || (n.onRemove && n.onRemove(o[a].spec), o.splice(a--, 1));
  return o.length || i.length ? new z(o, i) : te;
}
function pt(s, e) {
  return s.from - e.from || s.to - e.to;
}
function hr(s) {
  let e = s;
  for (let t = 0; t < e.length - 1; t++) {
    let n = e[t];
    if (n.from != n.to)
      for (let i = t + 1; i < e.length; i++) {
        let r = e[i];
        if (r.from == n.from) {
          r.to != n.to && (e == s && (e = s.slice()), e[i] = r.copy(r.from, n.to), Eo(e, i + 1, r.copy(n.to, r.to)));
          continue;
        } else {
          r.from < n.to && (e == s && (e = s.slice()), e[t] = n.copy(n.from, r.from), Eo(e, i, n.copy(r.from, n.to)));
          break;
        }
      }
  }
  return e;
}
function Eo(s, e, t) {
  for (; e < s.length && pt(t, s[e]) > 0; )
    e++;
  s.splice(e, 0, t);
}
function ii(s) {
  let e = [];
  return s.someProp("decorations", (t) => {
    let n = t(s.state);
    n && n != te && e.push(n);
  }), s.cursorWrapper && e.push(z.create(s.state.doc, [s.cursorWrapper.deco])), Ye.from(e);
}
const Gu = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, qu = de && Je <= 11;
class Ju {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Xu {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Ju(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((n) => {
      for (let i = 0; i < n.length; i++)
        this.queue.push(n[i]);
      de && Je <= 11 && n.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), qu && (this.onCharData = (n) => {
      this.queue.push({ target: n.target, type: "characterData", oldValue: n.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Gu)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (bo(this.view)) {
      if (this.suppressingSelectionUpdates)
        return $e(this.view);
      if (de && Je <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && bt(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), n;
    for (let r = e.focusNode; r; r = Lt(r))
      t.add(r);
    for (let r = e.anchorNode; r; r = Lt(r))
      if (t.has(r)) {
        n = r;
        break;
      }
    let i = n && this.view.docView.nearestDesc(n);
    if (i && i.ignoreMutation({
      type: "selection",
      target: n.nodeType == 3 ? n.parentNode : n
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let n = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(n) && bo(e) && !this.ignoreSelectionChange(n), r = -1, o = -1, a = !1, l = [];
    if (e.editable)
      for (let c = 0; c < t.length; c++) {
        let u = this.registerMutation(t[c], l);
        u && (r = r < 0 ? u.from : Math.min(u.from, r), o = o < 0 ? u.to : Math.max(u.to, o), u.typeOver && (a = !0));
      }
    if (Se && l.length) {
      let c = l.filter((u) => u.nodeName == "BR");
      if (c.length == 2) {
        let [u, d] = c;
        u.parentNode && u.parentNode.parentNode == d.parentNode ? d.remove() : u.remove();
      } else {
        let { focusNode: u } = this.currentSelection;
        for (let d of c) {
          let f = d.parentNode;
          f && f.nodeName == "LI" && (!u || ed(e, u) != f) && d.remove();
        }
      }
    }
    let h = null;
    r < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Ls(n) && (h = nr(e)) && h.eq(N.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, $e(e), this.currentSelection.set(n), e.scrollToSelection()) : (r > -1 || i) && (r > -1 && (e.docView.markDirty(r, o), Qu(e)), this.handleDOMChange(r, o, a, l), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(n) || $e(e), this.currentSelection.set(n));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let n = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (n == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !n || n.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let c = 0; c < e.addedNodes.length; c++) {
        let u = e.addedNodes[c];
        t.push(u), u.nodeType == 3 && (this.lastChangedTextNode = u);
      }
      if (n.contentDOM && n.contentDOM != n.dom && !n.contentDOM.contains(e.target))
        return { from: n.posBefore, to: n.posAfter };
      let i = e.previousSibling, r = e.nextSibling;
      if (de && Je <= 11 && e.addedNodes.length)
        for (let c = 0; c < e.addedNodes.length; c++) {
          let { previousSibling: u, nextSibling: d } = e.addedNodes[c];
          (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (i = u), (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (r = d);
        }
      let o = i && i.parentNode == e.target ? Q(i) + 1 : 0, a = n.localPosFromDOM(e.target, o, -1), l = r && r.parentNode == e.target ? Q(r) : e.target.childNodes.length, h = n.localPosFromDOM(e.target, l, 1);
      return { from: a, to: h };
    } else return e.type == "attributes" ? { from: n.posAtStart - n.border, to: n.posAtEnd + n.border } : (this.lastChangedTextNode = e.target, {
      from: n.posAtStart,
      to: n.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Co = /* @__PURE__ */ new WeakMap(), Mo = !1;
function Qu(s) {
  if (!Co.has(s) && (Co.set(s, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(s.dom).whiteSpace) !== -1)) {
    if (s.requiresGeckoHackNode = Se, Mo)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Mo = !0;
  }
}
function Ao(s, e) {
  let t = e.startContainer, n = e.startOffset, i = e.endContainer, r = e.endOffset, o = s.domAtPos(s.state.selection.anchor);
  return bt(o.node, o.offset, i, r) && ([t, n, i, r] = [i, r, t, n]), { anchorNode: t, anchorOffset: n, focusNode: i, focusOffset: r };
}
function Zu(s, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(s.root)[0];
    if (i)
      return Ao(s, i);
  }
  let t;
  function n(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return s.dom.addEventListener("beforeinput", n, !0), document.execCommand("indent"), s.dom.removeEventListener("beforeinput", n, !0), t ? Ao(s, t) : null;
}
function ed(s, e) {
  for (let t = e.parentNode; t && t != s.dom; t = t.parentNode) {
    let n = s.docView.nearestDesc(t, !0);
    if (n && n.node.isBlock)
      return t;
  }
  return null;
}
function td(s, e, t) {
  let { node: n, fromOffset: i, toOffset: r, from: o, to: a } = s.docView.parseRange(e, t), l = s.domSelectionRange(), h, c = l.anchorNode;
  if (c && s.dom.contains(c.nodeType == 1 ? c : c.parentNode) && (h = [{ node: c, offset: l.anchorOffset }], Ls(l) || h.push({ node: l.focusNode, offset: l.focusOffset })), ne && s.input.lastKeyCode === 8)
    for (let g = r; g > i; g--) {
      let y = n.childNodes[g - 1], v = y.pmViewDesc;
      if (y.nodeName == "BR" && !v) {
        r = g;
        break;
      }
      if (!v || v.size)
        break;
    }
  let u = s.state.doc, d = s.someProp("domParser") || Qt.fromSchema(s.state.schema), f = u.resolve(o), p = null, m = d.parse(n, {
    topNode: f.parent,
    topMatch: f.parent.contentMatchAt(f.index()),
    topOpen: !0,
    from: i,
    to: r,
    preserveWhitespace: f.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: h,
    ruleFromNode: nd,
    context: f
  });
  if (h && h[0].pos != null) {
    let g = h[0].pos, y = h[1] && h[1].pos;
    y == null && (y = g), p = { anchor: g + o, head: y + o };
  }
  return { doc: m, sel: p, from: o, to: a };
}
function nd(s) {
  let e = s.pmViewDesc;
  if (e)
    return e.parseRule();
  if (s.nodeName == "BR" && s.parentNode) {
    if (re && /^(ul|ol)$/i.test(s.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (s.parentNode.lastChild == s || re && /^(tr|table)$/i.test(s.parentNode.nodeName))
      return { ignore: !0 };
  } else if (s.nodeName == "IMG" && s.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const sd = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function id(s, e, t, n, i) {
  let r = s.input.compositionPendingChanges || (s.composing ? s.input.compositionID : 0);
  if (s.input.compositionPendingChanges = 0, e < 0) {
    let D = s.input.lastSelectionTime > Date.now() - 50 ? s.input.lastSelectionOrigin : null, L = nr(s, D);
    if (L && !s.state.selection.eq(L)) {
      if (ne && Pe && s.input.lastKeyCode === 13 && Date.now() - 100 < s.input.lastKeyCodeTime && s.someProp("handleKeyDown", (Ht) => Ht(s, rt(13, "Enter"))))
        return;
      let U = s.state.tr.setSelection(L);
      D == "pointer" ? U.setMeta("pointer", !0) : D == "key" && U.scrollIntoView(), r && U.setMeta("composition", r), s.dispatch(U);
    }
    return;
  }
  let o = s.state.doc.resolve(e), a = o.sharedDepth(t);
  e = o.before(a + 1), t = s.state.doc.resolve(t).after(a + 1);
  let l = s.state.selection, h = td(s, e, t), c = s.state.doc, u = c.slice(h.from, h.to), d, f;
  s.input.lastKeyCode === 8 && Date.now() - 100 < s.input.lastKeyCodeTime ? (d = s.state.selection.to, f = "end") : (d = s.state.selection.from, f = "start"), s.input.lastKeyCode = null;
  let p = ad(u.content, h.doc.content, h.from, d, f);
  if (p && s.input.domChangeCount++, (Pt && s.input.lastIOSEnter > Date.now() - 225 || Pe) && i.some((D) => D.nodeType == 1 && !sd.test(D.nodeName)) && (!p || p.endA >= p.endB) && s.someProp("handleKeyDown", (D) => D(s, rt(13, "Enter")))) {
    s.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (n && l instanceof A && !l.empty && l.$head.sameParent(l.$anchor) && !s.composing && !(h.sel && h.sel.anchor != h.sel.head))
      p = { start: l.from, endA: l.to, endB: l.to };
    else {
      if (h.sel) {
        let D = Oo(s, s.state.doc, h.sel);
        if (D && !D.eq(s.state.selection)) {
          let L = s.state.tr.setSelection(D);
          r && L.setMeta("composition", r), s.dispatch(L);
        }
      }
      return;
    }
  s.state.selection.from < s.state.selection.to && p.start == p.endB && s.state.selection instanceof A && (p.start > s.state.selection.from && p.start <= s.state.selection.from + 2 && s.state.selection.from >= h.from ? p.start = s.state.selection.from : p.endA < s.state.selection.to && p.endA >= s.state.selection.to - 2 && s.state.selection.to <= h.to && (p.endB += s.state.selection.to - p.endA, p.endA = s.state.selection.to)), de && Je <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > h.from && h.doc.textBetween(p.start - h.from - 1, p.start - h.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = h.doc.resolveNoCache(p.start - h.from), g = h.doc.resolveNoCache(p.endB - h.from), y = c.resolve(p.start), v = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA;
  if ((Pt && s.input.lastIOSEnter > Date.now() - 225 && (!v || i.some((D) => D.nodeName == "DIV" || D.nodeName == "P")) || !v && m.pos < h.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(h.doc.textBetween(m.pos, g.pos, "", ""))) && s.someProp("handleKeyDown", (D) => D(s, rt(13, "Enter")))) {
    s.input.lastIOSEnter = 0;
    return;
  }
  if (s.state.selection.anchor > p.start && od(c, p.start, p.endA, m, g) && s.someProp("handleKeyDown", (D) => D(s, rt(8, "Backspace")))) {
    Pe && ne && s.domObserver.suppressSelectionUpdates();
    return;
  }
  ne && p.endB == p.start && (s.input.lastChromeDelete = Date.now()), Pe && !v && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && h.sel && h.sel.anchor == h.sel.head && h.sel.head == p.endA && (p.endB -= 2, g = h.doc.resolveNoCache(p.endB - h.from), setTimeout(() => {
    s.someProp("handleKeyDown", function(D) {
      return D(s, rt(13, "Enter"));
    });
  }, 20));
  let E = p.start, P = p.endA, O = (D) => {
    let L = D || s.state.tr.replace(E, P, h.doc.slice(p.start - h.from, p.endB - h.from));
    if (h.sel) {
      let U = Oo(s, L.doc, h.sel);
      U && !(ne && s.composing && U.empty && (p.start != p.endB || s.input.lastChromeDelete < Date.now() - 100) && (U.head == E || U.head == L.mapping.map(P) - 1) || de && U.empty && U.head == E) && L.setSelection(U);
    }
    return r && L.setMeta("composition", r), L.scrollIntoView();
  }, $;
  if (v)
    if (m.pos == g.pos) {
      de && Je <= 11 && m.parentOffset == 0 && (s.domObserver.suppressSelectionUpdates(), setTimeout(() => $e(s), 20));
      let D = O(s.state.tr.delete(E, P)), L = c.resolve(p.start).marksAcross(c.resolve(p.endA));
      L && D.ensureMarks(L), s.dispatch(D);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && ($ = rd(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let D = O(s.state.tr);
      $.type == "add" ? D.addMark(E, P, $.mark) : D.removeMark(E, P, $.mark), s.dispatch(D);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let D = m.parent.textBetween(m.parentOffset, g.parentOffset), L = () => O(s.state.tr.insertText(D, E, P));
      s.someProp("handleTextInput", (U) => U(s, E, P, D, L)) || s.dispatch(L());
    } else
      s.dispatch(O());
  else
    s.dispatch(O());
}
function Oo(s, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : sr(s, e.resolve(t.anchor), e.resolve(t.head));
}
function rd(s, e) {
  let t = s.firstChild.marks, n = e.firstChild.marks, i = t, r = n, o, a, l;
  for (let c = 0; c < n.length; c++)
    i = n[c].removeFromSet(i);
  for (let c = 0; c < t.length; c++)
    r = t[c].removeFromSet(r);
  if (i.length == 1 && r.length == 0)
    a = i[0], o = "add", l = (c) => c.mark(a.addToSet(c.marks));
  else if (i.length == 0 && r.length == 1)
    a = r[0], o = "remove", l = (c) => c.mark(a.removeFromSet(c.marks));
  else
    return null;
  let h = [];
  for (let c = 0; c < e.childCount; c++)
    h.push(l(e.child(c)));
  if (b.from(h).eq(s))
    return { mark: a, type: o };
}
function od(s, e, t, n, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - n.pos || // newEnd must point directly at or after the end of the block that newStart points into
    ri(n, !0, !1) < i.pos
  )
    return !1;
  let r = s.resolve(e);
  if (!n.parent.isTextblock) {
    let a = r.nodeAfter;
    return a != null && t == e + a.nodeSize;
  }
  if (r.parentOffset < r.parent.content.size || !r.parent.isTextblock)
    return !1;
  let o = s.resolve(ri(r, !0, !0));
  return !o.parent.isTextblock || o.pos > t || ri(o, !0, !1) < t ? !1 : n.parent.content.cut(n.parentOffset).eq(o.parent.content);
}
function ri(s, e, t) {
  let n = s.depth, i = e ? s.end() : s.pos;
  for (; n > 0 && (e || s.indexAfter(n) == s.node(n).childCount); )
    n--, i++, e = !1;
  if (t) {
    let r = s.node(n).maybeChild(s.indexAfter(n));
    for (; r && !r.isLeaf; )
      r = r.firstChild, i++;
  }
  return i;
}
function ad(s, e, t, n, i) {
  let r = s.findDiffStart(e, t);
  if (r == null)
    return null;
  let { a: o, b: a } = s.findDiffEnd(e, t + s.size, t + e.size);
  if (i == "end") {
    let l = Math.max(0, r - Math.min(o, a));
    n -= o + l - r;
  }
  if (o < r && s.size < e.size) {
    let l = n <= r && n >= o ? r - n : 0;
    r -= l, r && r < e.size && Io(e.textBetween(r - 1, r + 1)) && (r += l ? 1 : -1), a = r + (a - o), o = r;
  } else if (a < r) {
    let l = n <= r && n >= a ? r - n : 0;
    r -= l, r && r < s.size && Io(s.textBetween(r - 1, r + 1)) && (r += l ? 1 : -1), o = r + (o - a), a = r;
  }
  return { start: r, endA: o, endB: a };
}
function Io(s) {
  if (s.length != 2)
    return !1;
  let e = s.charCodeAt(0), t = s.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class wl {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Eu(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Vo), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Lo(this), Ro(this), this.nodeViews = Po(this), this.docView = uo(this.state.doc, No(this), ii(this), this.dom, this), this.domObserver = new Xu(this, (n, i, r, o) => id(this, n, i, r, o)), this.domObserver.start(), Cu(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && $i(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Vo), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let n in this._props)
      t[n] = this._props[n];
    t.state = this.state;
    for (let n in e)
      t[n] = e[n];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var n;
    let i = this.state, r = !1, o = !1;
    e.storedMarks && this.composing && (ml(this), o = !0), this.state = e;
    let a = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (a || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let f = Po(this);
      hd(f, this.nodeViews) && (this.nodeViews = f, r = !0);
    }
    (a || t.handleDOMEvents != this._props.handleDOMEvents) && $i(this), this.editable = Lo(this), Ro(this);
    let l = ii(this), h = No(this), c = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", u = r || !this.docView.matchesNode(e.doc, h, l);
    (u || !e.selection.eq(i.selection)) && (o = !0);
    let d = c == "preserve" && o && this.dom.style.overflowAnchor == null && zc(this);
    if (o) {
      this.domObserver.stop();
      let f = u && (de || ne) && !this.composing && !i.selection.empty && !e.selection.empty && ld(i.selection, e.selection);
      if (u) {
        let p = ne ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Bu(this)), (r || !this.docView.update(e.doc, h, l, this)) && (this.docView.updateOuterDeco(h), this.docView.destroy(), this.docView = uo(e.doc, h, l, this.dom, this)), p && !this.trackWrites && (f = !0);
      }
      f || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && uu(this)) ? $e(this, f) : (sl(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((n = this.dragging) === null || n === void 0) && n.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : d && _c(d);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof T) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && ro(this, t.getBoundingClientRect(), e);
      } else
        ro(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let n = this.directPlugins[t];
        n.spec.view && this.pluginViews.push(n.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let n = this.state.plugins[t];
        n.spec.view && this.pluginViews.push(n.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let n = this.pluginViews[t];
        n.update && n.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let n = e.node, i = -1;
    if (this.state.doc.nodeAt(n.from) == n.node)
      i = n.from;
    else {
      let r = n.from + (this.state.doc.content.size - t.doc.content.size);
      (r > 0 && this.state.doc.nodeAt(r)) == n.node && (i = r);
    }
    this.dragging = new yl(e.slice, e.move, i < 0 ? void 0 : T.create(this.state.doc, i));
  }
  someProp(e, t) {
    let n = this._props && this._props[e], i;
    if (n != null && (i = t ? t(n) : n))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let a = this.directPlugins[o].props[e];
      if (a != null && (i = t ? t(a) : a))
        return i;
    }
    let r = this.state.plugins;
    if (r)
      for (let o = 0; o < r.length; o++) {
        let a = r[o].props[e];
        if (a != null && (i = t ? t(a) : a))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (de) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Wc(this.dom), $e(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Gc(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return qa(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, n = -1) {
    let i = this.docView.posFromDOM(e, t, n);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return Zc(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return pn(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return pn(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return ir(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Mu(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], ii(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Oc());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Ou(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? re && this.root.nodeType === 11 && Pc(this.dom.ownerDocument) == this.dom && Zu(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
wl.prototype.dispatch = function(s) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, s) : this.updateState(this.state.apply(s));
};
function No(s) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(s.editable), s.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(s.state)), t)
      for (let n in t)
        n == "class" ? e.class += " " + t[n] : n == "style" ? e.style = (e.style ? e.style + ";" : "") + t[n] : !e[n] && n != "contenteditable" && n != "nodeName" && (e[n] = String(t[n]));
  }), e.translate || (e.translate = "no"), [pe.node(0, s.state.doc.content.size, e)];
}
function Ro(s) {
  if (s.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), s.cursorWrapper = { dom: e, deco: pe.widget(s.state.selection.from, e, { raw: !0, marks: s.markCursor }) };
  } else
    s.cursorWrapper = null;
}
function Lo(s) {
  return !s.someProp("editable", (e) => e(s.state) === !1);
}
function ld(s, e) {
  let t = Math.min(s.$anchor.sharedDepth(s.head), e.$anchor.sharedDepth(e.head));
  return s.$anchor.start(t) != e.$anchor.start(t);
}
function Po(s) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(n) {
    for (let i in n)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = n[i]);
  }
  return s.someProp("nodeViews", t), s.someProp("markViews", t), e;
}
function hd(s, e) {
  let t = 0, n = 0;
  for (let i in s) {
    if (s[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    n++;
  return t != n;
}
function Vo(s) {
  if (s.spec.state || s.spec.filterTransaction || s.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var et = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Zn = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, cd = typeof navigator < "u" && /Mac/.test(navigator.platform), ud = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Z = 0; Z < 10; Z++) et[48 + Z] = et[96 + Z] = String(Z);
for (var Z = 1; Z <= 24; Z++) et[Z + 111] = "F" + Z;
for (var Z = 65; Z <= 90; Z++)
  et[Z] = String.fromCharCode(Z + 32), Zn[Z] = String.fromCharCode(Z);
for (var oi in et) Zn.hasOwnProperty(oi) || (Zn[oi] = et[oi]);
function dd(s) {
  var e = cd && s.metaKey && s.shiftKey && !s.ctrlKey && !s.altKey || ud && s.shiftKey && s.key && s.key.length == 1 || s.key == "Unidentified", t = !e && s.key || (s.shiftKey ? Zn : et)[s.keyCode] || s.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const fd = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), pd = typeof navigator < "u" && /Win/.test(navigator.platform);
function md(s) {
  let e = s.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let n, i, r, o;
  for (let a = 0; a < e.length - 1; a++) {
    let l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      i = !0;
    else if (/^s(hift)?$/i.test(l))
      r = !0;
    else if (/^mod$/i.test(l))
      fd ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return n && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), r && (t = "Shift-" + t), t;
}
function gd(s) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in s)
    e[md(t)] = s[t];
  return e;
}
function ai(s, e, t = !0) {
  return e.altKey && (s = "Alt-" + s), e.ctrlKey && (s = "Ctrl-" + s), e.metaKey && (s = "Meta-" + s), t && e.shiftKey && (s = "Shift-" + s), s;
}
function yd(s) {
  return new Y({ props: { handleKeyDown: Tl(s) } });
}
function Tl(s) {
  let e = gd(s);
  return function(t, n) {
    let i = dd(n), r, o = e[ai(i, n)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (n.shiftKey) {
        let a = e[ai(i, n, !1)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
      if ((n.altKey || n.metaKey || n.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(pd && n.ctrlKey && n.altKey) && (r = et[n.keyCode]) && r != i) {
        let a = e[ai(r, n)];
        if (a && a(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const cr = (s, e) => s.selection.empty ? !1 : (e && e(s.tr.deleteSelection().scrollIntoView()), !0);
function kl(s, e) {
  let { $cursor: t } = s.selection;
  return !t || (e ? !e.endOfTextblock("backward", s) : t.parentOffset > 0) ? null : t;
}
const Dl = (s, e, t) => {
  let n = kl(s, t);
  if (!n)
    return !1;
  let i = ur(n);
  if (!i) {
    let o = n.blockRange(), a = o && Ft(o);
    return a == null ? !1 : (e && e(s.tr.lift(o, a).scrollIntoView()), !0);
  }
  let r = i.nodeBefore;
  if (Ll(s, i, e, -1))
    return !0;
  if (n.parent.content.size == 0 && (Vt(r, "end") || T.isSelectable(r)))
    for (let o = n.depth; ; o--) {
      let a = Ns(s.doc, n.before(o), n.after(o), S.empty);
      if (a && a.slice.size < a.to - a.from) {
        if (e) {
          let l = s.tr.step(a);
          l.setSelection(Vt(r, "end") ? N.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : T.create(l.doc, i.pos - r.nodeSize)), e(l.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || n.node(o - 1).childCount > 1)
        break;
    }
  return r.isAtom && i.depth == n.depth - 1 ? (e && e(s.tr.delete(i.pos - r.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, bd = (s, e, t) => {
  let n = kl(s, t);
  if (!n)
    return !1;
  let i = ur(n);
  return i ? El(s, i, e) : !1;
}, xd = (s, e, t) => {
  let n = Ml(s, t);
  if (!n)
    return !1;
  let i = dr(n);
  return i ? El(s, i, e) : !1;
};
function El(s, e, t) {
  let n = e.nodeBefore, i = n, r = e.pos - 1;
  for (; !i.isTextblock; r--) {
    if (i.type.spec.isolating)
      return !1;
    let c = i.lastChild;
    if (!c)
      return !1;
    i = c;
  }
  let o = e.nodeAfter, a = o, l = e.pos + 1;
  for (; !a.isTextblock; l++) {
    if (a.type.spec.isolating)
      return !1;
    let c = a.firstChild;
    if (!c)
      return !1;
    a = c;
  }
  let h = Ns(s.doc, r, l, S.empty);
  if (!h || h.from != r || h instanceof j && h.slice.size >= l - r)
    return !1;
  if (t) {
    let c = s.tr.step(h);
    c.setSelection(A.create(c.doc, r)), t(c.scrollIntoView());
  }
  return !0;
}
function Vt(s, e, t = !1) {
  for (let n = s; n; n = e == "start" ? n.firstChild : n.lastChild) {
    if (n.isTextblock)
      return !0;
    if (t && n.childCount != 1)
      return !1;
  }
  return !1;
}
const Cl = (s, e, t) => {
  let { $head: n, empty: i } = s.selection, r = n;
  if (!i)
    return !1;
  if (n.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", s) : n.parentOffset > 0)
      return !1;
    r = ur(n);
  }
  let o = r && r.nodeBefore;
  return !o || !T.isSelectable(o) ? !1 : (e && e(s.tr.setSelection(T.create(s.doc, r.pos - o.nodeSize)).scrollIntoView()), !0);
};
function ur(s) {
  if (!s.parent.type.spec.isolating)
    for (let e = s.depth - 1; e >= 0; e--) {
      if (s.index(e) > 0)
        return s.doc.resolve(s.before(e + 1));
      if (s.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ml(s, e) {
  let { $cursor: t } = s.selection;
  return !t || (e ? !e.endOfTextblock("forward", s) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Al = (s, e, t) => {
  let n = Ml(s, t);
  if (!n)
    return !1;
  let i = dr(n);
  if (!i)
    return !1;
  let r = i.nodeAfter;
  if (Ll(s, i, e, 1))
    return !0;
  if (n.parent.content.size == 0 && (Vt(r, "start") || T.isSelectable(r))) {
    let o = Ns(s.doc, n.before(), n.after(), S.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let a = s.tr.step(o);
        a.setSelection(Vt(r, "start") ? N.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : T.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return r.isAtom && i.depth == n.depth - 1 ? (e && e(s.tr.delete(i.pos, i.pos + r.nodeSize).scrollIntoView()), !0) : !1;
}, Ol = (s, e, t) => {
  let { $head: n, empty: i } = s.selection, r = n;
  if (!i)
    return !1;
  if (n.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", s) : n.parentOffset < n.parent.content.size)
      return !1;
    r = dr(n);
  }
  let o = r && r.nodeAfter;
  return !o || !T.isSelectable(o) ? !1 : (e && e(s.tr.setSelection(T.create(s.doc, r.pos)).scrollIntoView()), !0);
};
function dr(s) {
  if (!s.parent.type.spec.isolating)
    for (let e = s.depth - 1; e >= 0; e--) {
      let t = s.node(e);
      if (s.index(e) + 1 < t.childCount)
        return s.doc.resolve(s.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Sd = (s, e) => {
  let t = s.selection, n = t instanceof T, i;
  if (n) {
    if (t.node.isTextblock || !tt(s.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Is(s.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let r = s.tr.join(i);
    n && r.setSelection(T.create(r.doc, i - s.doc.resolve(i).nodeBefore.nodeSize)), e(r.scrollIntoView());
  }
  return !0;
}, vd = (s, e) => {
  let t = s.selection, n;
  if (t instanceof T) {
    if (t.node.isTextblock || !tt(s.doc, t.to))
      return !1;
    n = t.to;
  } else if (n = Is(s.doc, t.to, 1), n == null)
    return !1;
  return e && e(s.tr.join(n).scrollIntoView()), !0;
}, wd = (s, e) => {
  let { $from: t, $to: n } = s.selection, i = t.blockRange(n), r = i && Ft(i);
  return r == null ? !1 : (e && e(s.tr.lift(i, r).scrollIntoView()), !0);
}, Il = (s, e) => {
  let { $head: t, $anchor: n } = s.selection;
  return !t.parent.type.spec.code || !t.sameParent(n) ? !1 : (e && e(s.tr.insertText(`
`).scrollIntoView()), !0);
};
function fr(s) {
  for (let e = 0; e < s.edgeCount; e++) {
    let { type: t } = s.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Td = (s, e) => {
  let { $head: t, $anchor: n } = s.selection;
  if (!t.parent.type.spec.code || !t.sameParent(n))
    return !1;
  let i = t.node(-1), r = t.indexAfter(-1), o = fr(i.contentMatchAt(r));
  if (!o || !i.canReplaceWith(r, r, o))
    return !1;
  if (e) {
    let a = t.after(), l = s.tr.replaceWith(a, a, o.createAndFill());
    l.setSelection(N.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, Nl = (s, e) => {
  let t = s.selection, { $from: n, $to: i } = t;
  if (t instanceof me || n.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let r = fr(i.parent.contentMatchAt(i.indexAfter()));
  if (!r || !r.isTextblock)
    return !1;
  if (e) {
    let o = (!n.parentOffset && i.index() < i.parent.childCount ? n : i).pos, a = s.tr.insert(o, r.createAndFill());
    a.setSelection(A.create(a.doc, o + 1)), e(a.scrollIntoView());
  }
  return !0;
}, Rl = (s, e) => {
  let { $cursor: t } = s.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let r = t.before();
    if (Ve(s.doc, r))
      return e && e(s.tr.split(r).scrollIntoView()), !0;
  }
  let n = t.blockRange(), i = n && Ft(n);
  return i == null ? !1 : (e && e(s.tr.lift(n, i).scrollIntoView()), !0);
};
function kd(s) {
  return (e, t) => {
    let { $from: n, $to: i } = e.selection;
    if (e.selection instanceof T && e.selection.node.isBlock)
      return !n.parentOffset || !Ve(e.doc, n.pos) ? !1 : (t && t(e.tr.split(n.pos).scrollIntoView()), !0);
    if (!n.depth)
      return !1;
    let r = [], o, a, l = !1, h = !1;
    for (let f = n.depth; ; f--)
      if (n.node(f).isBlock) {
        l = n.end(f) == n.pos + (n.depth - f), h = n.start(f) == n.pos - (n.depth - f), a = fr(n.node(f - 1).contentMatchAt(n.indexAfter(f - 1))), r.unshift(l && a ? { type: a } : null), o = f;
        break;
      } else {
        if (f == 1)
          return !1;
        r.unshift(null);
      }
    let c = e.tr;
    (e.selection instanceof A || e.selection instanceof me) && c.deleteSelection();
    let u = c.mapping.map(n.pos), d = Ve(c.doc, u, r.length, r);
    if (d || (r[0] = a ? { type: a } : null, d = Ve(c.doc, u, r.length, r)), !d)
      return !1;
    if (c.split(u, r.length, r), !l && h && n.node(o).type != a) {
      let f = c.mapping.map(n.before(o)), p = c.doc.resolve(f);
      a && n.node(o - 1).canReplaceWith(p.index(), p.index() + 1, a) && c.setNodeMarkup(c.mapping.map(n.before(o)), a);
    }
    return t && t(c.scrollIntoView()), !0;
  };
}
const Dd = kd(), Ed = (s, e) => {
  let { $from: t, to: n } = s.selection, i, r = t.sharedDepth(n);
  return r == 0 ? !1 : (i = t.before(r), e && e(s.tr.setSelection(T.create(s.doc, i))), !0);
};
function Cd(s, e, t) {
  let n = e.nodeBefore, i = e.nodeAfter, r = e.index();
  return !n || !i || !n.type.compatibleContent(i.type) ? !1 : !n.content.size && e.parent.canReplace(r - 1, r) ? (t && t(s.tr.delete(e.pos - n.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(r, r + 1) || !(i.isTextblock || tt(s.doc, e.pos)) ? !1 : (t && t(s.tr.join(e.pos).scrollIntoView()), !0);
}
function Ll(s, e, t, n) {
  let i = e.nodeBefore, r = e.nodeAfter, o, a, l = i.type.spec.isolating || r.type.spec.isolating;
  if (!l && Cd(s, e, t))
    return !0;
  let h = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (h && (o = (a = i.contentMatchAt(i.childCount)).findWrapping(r.type)) && a.matchType(o[0] || r.type).validEnd) {
    if (t) {
      let f = e.pos + r.nodeSize, p = b.empty;
      for (let y = o.length - 1; y >= 0; y--)
        p = b.from(o[y].create(null, p));
      p = b.from(i.copy(p));
      let m = s.tr.step(new K(e.pos - 1, f, e.pos, f, new S(p, 1, 0), o.length, !0)), g = m.doc.resolve(f + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && tt(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let c = r.type.spec.isolating || n > 0 && l ? null : N.findFrom(e, 1), u = c && c.$from.blockRange(c.$to), d = u && Ft(u);
  if (d != null && d >= e.depth)
    return t && t(s.tr.lift(u, d).scrollIntoView()), !0;
  if (h && Vt(r, "start", !0) && Vt(i, "end")) {
    let f = i, p = [];
    for (; p.push(f), !f.isTextblock; )
      f = f.lastChild;
    let m = r, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (f.canReplace(f.childCount, f.childCount, m.content)) {
      if (t) {
        let y = b.empty;
        for (let E = p.length - 1; E >= 0; E--)
          y = b.from(p[E].copy(y));
        let v = s.tr.step(new K(e.pos - p.length, e.pos + r.nodeSize, e.pos + g, e.pos + r.nodeSize - g, new S(y, p.length, 0), 0, !0));
        t(v.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Pl(s) {
  return function(e, t) {
    let n = e.selection, i = s < 0 ? n.$from : n.$to, r = i.depth;
    for (; i.node(r).isInline; ) {
      if (!r)
        return !1;
      r--;
    }
    return i.node(r).isTextblock ? (t && t(e.tr.setSelection(A.create(e.doc, s < 0 ? i.start(r) : i.end(r)))), !0) : !1;
  };
}
const Md = Pl(-1), Ad = Pl(1);
function Od(s, e = null) {
  return function(t, n) {
    let { $from: i, $to: r } = t.selection, o = i.blockRange(r), a = o && Zi(o, s, e);
    return a ? (n && n(t.tr.wrap(o, a).scrollIntoView()), !0) : !1;
  };
}
function $o(s, e = null) {
  return function(t, n) {
    let i = !1;
    for (let r = 0; r < t.selection.ranges.length && !i; r++) {
      let { $from: { pos: o }, $to: { pos: a } } = t.selection.ranges[r];
      t.doc.nodesBetween(o, a, (l, h) => {
        if (i)
          return !1;
        if (!(!l.isTextblock || l.hasMarkup(s, e)))
          if (l.type == s)
            i = !0;
          else {
            let c = t.doc.resolve(h), u = c.index();
            i = c.parent.canReplaceWith(u, u + 1, s);
          }
      });
    }
    if (!i)
      return !1;
    if (n) {
      let r = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: a }, $to: { pos: l } } = t.selection.ranges[o];
        r.setBlockType(a, l, s, e);
      }
      n(r.scrollIntoView());
    }
    return !0;
  };
}
function pr(...s) {
  return function(e, t, n) {
    for (let i = 0; i < s.length; i++)
      if (s[i](e, t, n))
        return !0;
    return !1;
  };
}
pr(cr, Dl, Cl);
pr(cr, Al, Ol);
pr(Il, Nl, Rl, Dd);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Id(s, e = null) {
  return function(t, n) {
    let { $from: i, $to: r } = t.selection, o = i.blockRange(r);
    if (!o)
      return !1;
    let a = n ? t.tr : null;
    return Nd(a, o, s, e) ? (n && n(a.scrollIntoView()), !0) : !1;
  };
}
function Nd(s, e, t, n = null) {
  let i = !1, r = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let l = o.resolve(e.start - 2);
    r = new jn(l, l, e.depth), e.endIndex < e.parent.childCount && (e = new jn(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let a = Zi(r, t, n, e);
  return a ? (s && Rd(s, e, a, i, t), !0) : !1;
}
function Rd(s, e, t, n, i) {
  let r = b.empty;
  for (let c = t.length - 1; c >= 0; c--)
    r = b.from(t[c].type.create(t[c].attrs, r));
  s.step(new K(e.start - (n ? 2 : 0), e.end, e.start, e.end, new S(r, 0, 0), t.length, !0));
  let o = 0;
  for (let c = 0; c < t.length; c++)
    t[c].type == i && (o = c + 1);
  let a = t.length - o, l = e.start + t.length - (n ? 2 : 0), h = e.parent;
  for (let c = e.startIndex, u = e.endIndex, d = !0; c < u; c++, d = !1)
    !d && Ve(s.doc, l, a) && (s.split(l, a), l += 2 * a), l += h.child(c).nodeSize;
  return s;
}
function Ld(s) {
  return function(e, t) {
    let { $from: n, $to: i } = e.selection, r = n.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == s);
    return r ? t ? n.node(r.depth - 1).type == s ? Pd(e, t, s, r) : Vd(e, t, r) : !0 : !1;
  };
}
function Pd(s, e, t, n) {
  let i = s.tr, r = n.end, o = n.$to.end(n.depth);
  r < o && (i.step(new K(r - 1, o, r, o, new S(b.from(t.create(null, n.parent.copy())), 1, 0), 1, !0)), n = new jn(i.doc.resolve(n.$from.pos), i.doc.resolve(o), n.depth));
  const a = Ft(n);
  if (a == null)
    return !1;
  i.lift(n, a);
  let l = i.doc.resolve(i.mapping.map(r, -1) - 1);
  return tt(i.doc, l.pos) && l.nodeBefore.type == l.nodeAfter.type && i.join(l.pos), e(i.scrollIntoView()), !0;
}
function Vd(s, e, t) {
  let n = s.tr, i = t.parent;
  for (let f = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    f -= i.child(p).nodeSize, n.delete(f - 1, f + 1);
  let r = n.doc.resolve(t.start), o = r.nodeAfter;
  if (n.mapping.map(t.end) != t.start + r.nodeAfter.nodeSize)
    return !1;
  let a = t.startIndex == 0, l = t.endIndex == i.childCount, h = r.node(-1), c = r.index(-1);
  if (!h.canReplace(c + (a ? 0 : 1), c + 1, o.content.append(l ? b.empty : b.from(i))))
    return !1;
  let u = r.pos, d = u + o.nodeSize;
  return n.step(new K(u - (a ? 1 : 0), d + (l ? 1 : 0), u + 1, d - 1, new S((a ? b.empty : b.from(i.copy(b.empty))).append(l ? b.empty : b.from(i.copy(b.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(n.scrollIntoView()), !0;
}
function $d(s) {
  return function(e, t) {
    let { $from: n, $to: i } = e.selection, r = n.blockRange(i, (h) => h.childCount > 0 && h.firstChild.type == s);
    if (!r)
      return !1;
    let o = r.startIndex;
    if (o == 0)
      return !1;
    let a = r.parent, l = a.child(o - 1);
    if (l.type != s)
      return !1;
    if (t) {
      let h = l.lastChild && l.lastChild.type == a.type, c = b.from(h ? s.create() : null), u = new S(b.from(s.create(null, b.from(a.type.create(null, c)))), h ? 3 : 1, 0), d = r.start, f = r.end;
      t(e.tr.step(new K(d - (h ? 3 : 1), f, d, f, u, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function $s(s) {
  const { state: e, transaction: t } = s;
  let { selection: n } = t, { doc: i } = t, { storedMarks: r } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return r;
    },
    get selection() {
      return n;
    },
    get doc() {
      return i;
    },
    get tr() {
      return n = t.selection, i = t.doc, r = t.storedMarks, t;
    }
  };
}
class Fs {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: n } = this, { view: i } = t, { tr: r } = n, o = this.buildProps(r);
    return Object.fromEntries(Object.entries(e).map(([a, l]) => [a, (...c) => {
      const u = l(...c)(o);
      return !r.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(r), u;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: n, editor: i, state: r } = this, { view: o } = i, a = [], l = !!e, h = e || r.tr, c = () => (!l && t && !h.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(h), a.every((d) => d === !0)), u = {
      ...Object.fromEntries(Object.entries(n).map(([d, f]) => [d, (...m) => {
        const g = this.buildProps(h, t), y = f(...m)(g);
        return a.push(y), u;
      }])),
      run: c
    };
    return u;
  }
  createCan(e) {
    const { rawCommands: t, state: n } = this, i = !1, r = e || n.tr, o = this.buildProps(r, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, h]) => [l, (...c) => h(...c)({ ...o, dispatch: void 0 })])),
      chain: () => this.createChain(r, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: n, editor: i, state: r } = this, { view: o } = i, a = {
      tr: e,
      editor: i,
      view: o,
      state: $s({
        state: r,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(n).map(([l, h]) => [l, (...c) => h(...c)(a)]));
      }
    };
    return a;
  }
}
class Fd {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const n = this.callbacks[e];
    return n && n.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const n = this.callbacks[e];
    return n && (t ? this.callbacks[e] = n.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  once(e, t) {
    const n = (...i) => {
      this.off(e, n), t.apply(this, i);
    };
    return this.on(e, n);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function w(s, e, t) {
  return s.config[e] === void 0 && s.parent ? w(s.parent, e, t) : typeof s.config[e] == "function" ? s.config[e].bind({
    ...t,
    parent: s.parent ? w(s.parent, e, t) : null
  }) : s.config[e];
}
function Hs(s) {
  const e = s.filter((i) => i.type === "extension"), t = s.filter((i) => i.type === "node"), n = s.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: n
  };
}
function Vl(s) {
  const e = [], { nodeExtensions: t, markExtensions: n } = Hs(s), i = [...t, ...n], r = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return s.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, l = w(o, "addGlobalAttributes", a);
    if (!l)
      return;
    l().forEach((c) => {
      c.types.forEach((u) => {
        Object.entries(c.attributes).forEach(([d, f]) => {
          e.push({
            type: u,
            name: d,
            attribute: {
              ...r,
              ...f
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const a = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, l = w(o, "addAttributes", a);
    if (!l)
      return;
    const h = l();
    Object.entries(h).forEach(([c, u]) => {
      const d = {
        ...r,
        ...u
      };
      typeof d?.default == "function" && (d.default = d.default()), d?.isRequired && d?.default === void 0 && delete d.default, e.push({
        type: o.name,
        name: c,
        attribute: d
      });
    });
  }), e;
}
function q(s, e) {
  if (typeof s == "string") {
    if (!e.nodes[s])
      throw Error(`There is no node type named '${s}'. Maybe you forgot to add the extension?`);
    return e.nodes[s];
  }
  return s;
}
function J(...s) {
  return s.filter((e) => !!e).reduce((e, t) => {
    const n = { ...e };
    return Object.entries(t).forEach(([i, r]) => {
      if (!n[i]) {
        n[i] = r;
        return;
      }
      if (i === "class") {
        const a = r ? String(r).split(" ") : [], l = n[i] ? n[i].split(" ") : [], h = a.filter((c) => !l.includes(c));
        n[i] = [...l, ...h].join(" ");
      } else if (i === "style") {
        const a = r ? r.split(";").map((c) => c.trim()).filter(Boolean) : [], l = n[i] ? n[i].split(";").map((c) => c.trim()).filter(Boolean) : [], h = /* @__PURE__ */ new Map();
        l.forEach((c) => {
          const [u, d] = c.split(":").map((f) => f.trim());
          h.set(u, d);
        }), a.forEach((c) => {
          const [u, d] = c.split(":").map((f) => f.trim());
          h.set(u, d);
        }), n[i] = Array.from(h.entries()).map(([c, u]) => `${c}: ${u}`).join("; ");
      } else
        n[i] = r;
    }), n;
  }, {});
}
function Fi(s, e) {
  return e.filter((t) => t.type === s.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(s.attrs) || {} : {
    [t.name]: s.attrs[t.name]
  }).reduce((t, n) => J(t, n), {});
}
function $l(s) {
  return typeof s == "function";
}
function R(s, e = void 0, ...t) {
  return $l(s) ? e ? s.bind(e)(...t) : s(...t) : s;
}
function Hd(s = {}) {
  return Object.keys(s).length === 0 && s.constructor === Object;
}
function Bd(s) {
  return typeof s != "string" ? s : s.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(s) : s === "true" ? !0 : s === "false" ? !1 : s;
}
function Fo(s, e) {
  return "style" in s ? s : {
    ...s,
    getAttrs: (t) => {
      const n = s.getAttrs ? s.getAttrs(t) : s.attrs;
      if (n === !1)
        return !1;
      const i = e.reduce((r, o) => {
        const a = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Bd(t.getAttribute(o.name));
        return a == null ? r : {
          ...r,
          [o.name]: a
        };
      }, {});
      return { ...n, ...i };
    }
  };
}
function Ho(s) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(s).filter(([e, t]) => e === "attrs" && Hd(t) ? !1 : t != null)
  );
}
function zd(s, e) {
  var t;
  const n = Vl(s), { nodeExtensions: i, markExtensions: r } = Hs(s), o = (t = i.find((h) => w(h, "topNode"))) === null || t === void 0 ? void 0 : t.name, a = Object.fromEntries(i.map((h) => {
    const c = n.filter((y) => y.type === h.name), u = {
      name: h.name,
      options: h.options,
      storage: h.storage,
      editor: e
    }, d = s.reduce((y, v) => {
      const E = w(v, "extendNodeSchema", u);
      return {
        ...y,
        ...E ? E(h) : {}
      };
    }, {}), f = Ho({
      ...d,
      content: R(w(h, "content", u)),
      marks: R(w(h, "marks", u)),
      group: R(w(h, "group", u)),
      inline: R(w(h, "inline", u)),
      atom: R(w(h, "atom", u)),
      selectable: R(w(h, "selectable", u)),
      draggable: R(w(h, "draggable", u)),
      code: R(w(h, "code", u)),
      whitespace: R(w(h, "whitespace", u)),
      linebreakReplacement: R(w(h, "linebreakReplacement", u)),
      defining: R(w(h, "defining", u)),
      isolating: R(w(h, "isolating", u)),
      attrs: Object.fromEntries(c.map((y) => {
        var v;
        return [y.name, { default: (v = y?.attribute) === null || v === void 0 ? void 0 : v.default }];
      }))
    }), p = R(w(h, "parseHTML", u));
    p && (f.parseDOM = p.map((y) => Fo(y, c)));
    const m = w(h, "renderHTML", u);
    m && (f.toDOM = (y) => m({
      node: y,
      HTMLAttributes: Fi(y, c)
    }));
    const g = w(h, "renderText", u);
    return g && (f.toText = g), [h.name, f];
  })), l = Object.fromEntries(r.map((h) => {
    const c = n.filter((g) => g.type === h.name), u = {
      name: h.name,
      options: h.options,
      storage: h.storage,
      editor: e
    }, d = s.reduce((g, y) => {
      const v = w(y, "extendMarkSchema", u);
      return {
        ...g,
        ...v ? v(h) : {}
      };
    }, {}), f = Ho({
      ...d,
      inclusive: R(w(h, "inclusive", u)),
      excludes: R(w(h, "excludes", u)),
      group: R(w(h, "group", u)),
      spanning: R(w(h, "spanning", u)),
      code: R(w(h, "code", u)),
      attrs: Object.fromEntries(c.map((g) => {
        var y;
        return [g.name, { default: (y = g?.attribute) === null || y === void 0 ? void 0 : y.default }];
      }))
    }), p = R(w(h, "parseHTML", u));
    p && (f.parseDOM = p.map((g) => Fo(g, c)));
    const m = w(h, "renderHTML", u);
    return m && (f.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Fi(g, c)
    })), [h.name, f];
  }));
  return new ka({
    topNode: o,
    nodes: a,
    marks: l
  });
}
function li(s, e) {
  return e.nodes[s] || e.marks[s] || null;
}
function Bo(s, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === s.name) : e;
}
function mr(s, e) {
  const t = vt.fromSchema(e).serializeFragment(s), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
const _d = (s, e = 500) => {
  let t = "";
  const n = s.parentOffset;
  return s.parent.nodesBetween(Math.max(0, n - e), n, (i, r, o, a) => {
    var l, h;
    const c = ((h = (l = i.type.spec).toText) === null || h === void 0 ? void 0 : h.call(l, {
      node: i,
      pos: r,
      parent: o,
      index: a
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? c : c.slice(0, Math.max(0, n - r));
  }), t;
};
function gr(s) {
  return Object.prototype.toString.call(s) === "[object RegExp]";
}
class Bs {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Wd = (s, e) => {
  if (gr(e))
    return e.exec(s);
  const t = e(s);
  if (!t)
    return null;
  const n = [t.text];
  return n.index = t.index, n.input = s, n.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), n.push(t.replaceWith)), n;
};
function An(s) {
  var e;
  const { editor: t, from: n, to: i, text: r, rules: o, plugin: a } = s, { view: l } = t;
  if (l.composing)
    return !1;
  const h = l.state.doc.resolve(n);
  if (
    // check for code node
    h.parent.type.spec.code || !((e = h.nodeBefore || h.nodeAfter) === null || e === void 0) && e.marks.find((d) => d.type.spec.code)
  )
    return !1;
  let c = !1;
  const u = _d(h) + r;
  return o.forEach((d) => {
    if (c)
      return;
    const f = Wd(u, d.find);
    if (!f)
      return;
    const p = l.state.tr, m = $s({
      state: l.state,
      transaction: p
    }), g = {
      from: n - (f[0].length - r.length),
      to: i
    }, { commands: y, chain: v, can: E } = new Fs({
      editor: t,
      state: m
    });
    d.handler({
      state: m,
      range: g,
      match: f,
      commands: y,
      chain: v,
      can: E
    }) === null || !p.steps.length || (p.setMeta(a, {
      transform: p,
      from: n,
      to: i,
      text: r
    }), l.dispatch(p), c = !0);
  }), c;
}
function Yd(s) {
  const { editor: e, rules: t } = s, n = new Y({
    state: {
      init() {
        return null;
      },
      apply(i, r, o) {
        const a = i.getMeta(n);
        if (a)
          return a;
        const l = i.getMeta("applyInputRules");
        return !!l && setTimeout(() => {
          let { text: c } = l;
          typeof c == "string" ? c = c : c = mr(b.from(c), o.schema);
          const { from: u } = l, d = u + c.length;
          An({
            editor: e,
            from: u,
            to: d,
            text: c,
            rules: t,
            plugin: n
          });
        }), i.selectionSet || i.docChanged ? null : r;
      }
    },
    props: {
      handleTextInput(i, r, o, a) {
        return An({
          editor: e,
          from: r,
          to: o,
          text: a,
          rules: t,
          plugin: n
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: r } = i.state.selection;
          r && An({
            editor: e,
            from: r.pos,
            to: r.pos,
            text: "",
            rules: t,
            plugin: n
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, r) {
        if (r.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? An({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: n
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return n;
}
function Ud(s) {
  return Object.prototype.toString.call(s).slice(8, -1);
}
function On(s) {
  return Ud(s) !== "Object" ? !1 : s.constructor === Object && Object.getPrototypeOf(s) === Object.prototype;
}
function zs(s, e) {
  const t = { ...s };
  return On(s) && On(e) && Object.keys(e).forEach((n) => {
    On(e[n]) && On(s[n]) ? t[n] = zs(s[n], e[n]) : t[n] = e[n];
  }), t;
}
class Fe {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = R(w(this, "addOptions", {
      name: this.name
    }))), this.storage = R(w(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Fe(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => zs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new Fe(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = R(w(t, "addOptions", {
      name: t.name
    })), t.storage = R(w(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: n } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((h) => h?.type.name === t.name))
        return !1;
      const l = o.find((h) => h?.type.name === t.name);
      return l && n.removeStoredMark(l), n.insertText(" ", i.pos), e.view.dispatch(n), !0;
    }
    return !1;
  }
}
function jd(s) {
  return typeof s == "number";
}
class Kd {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Gd = (s, e, t) => {
  if (gr(e))
    return [...s.matchAll(e)];
  const n = e(s, t);
  return n ? n.map((i) => {
    const r = [i.text];
    return r.index = i.index, r.input = s, r.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), r.push(i.replaceWith)), r;
  }) : [];
};
function qd(s) {
  const { editor: e, state: t, from: n, to: i, rule: r, pasteEvent: o, dropEvent: a } = s, { commands: l, chain: h, can: c } = new Fs({
    editor: e,
    state: t
  }), u = [];
  return t.doc.nodesBetween(n, i, (f, p) => {
    if (!f.isTextblock || f.type.spec.code)
      return;
    const m = Math.max(n, p), g = Math.min(i, p + f.content.size), y = f.textBetween(m - p, g - p, void 0, "￼");
    Gd(y, r.find, o).forEach((E) => {
      if (E.index === void 0)
        return;
      const P = m + E.index + 1, O = P + E[0].length, $ = {
        from: t.tr.mapping.map(P),
        to: t.tr.mapping.map(O)
      }, D = r.handler({
        state: t,
        range: $,
        match: E,
        commands: l,
        chain: h,
        can: c,
        pasteEvent: o,
        dropEvent: a
      });
      u.push(D);
    });
  }), u.every((f) => f !== null);
}
let In = null;
const Jd = (s) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", s), t;
};
function Xd(s) {
  const { editor: e, rules: t } = s;
  let n = null, i = !1, r = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, a;
  try {
    a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    a = null;
  }
  const l = ({ state: c, from: u, to: d, rule: f, pasteEvt: p }) => {
    const m = c.tr, g = $s({
      state: c,
      transaction: m
    });
    if (!(!qd({
      editor: e,
      state: g,
      from: Math.max(u - 1, 0),
      to: d.b - 1,
      rule: f,
      pasteEvent: p,
      dropEvent: a
    }) || !m.steps.length)) {
      try {
        a = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        a = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return t.map((c) => new Y({
    // we register a global drag handler to track the current drag source element
    view(u) {
      const d = (p) => {
        var m;
        n = !((m = u.dom.parentElement) === null || m === void 0) && m.contains(p.target) ? u.dom.parentElement : null, n && (In = e);
      }, f = () => {
        In && (In = null);
      };
      return window.addEventListener("dragstart", d), window.addEventListener("dragend", f), {
        destroy() {
          window.removeEventListener("dragstart", d), window.removeEventListener("dragend", f);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (u, d) => {
          if (r = n === u.dom.parentElement, a = d, !r) {
            const f = In;
            f?.isEditable && setTimeout(() => {
              const p = f.state.selection;
              p && f.commands.deleteRange({ from: p.from, to: p.to });
            }, 10);
          }
          return !1;
        },
        paste: (u, d) => {
          var f;
          const p = (f = d.clipboardData) === null || f === void 0 ? void 0 : f.getData("text/html");
          return o = d, i = !!p?.includes("data-pm-slice"), !1;
        }
      }
    },
    appendTransaction: (u, d, f) => {
      const p = u[0], m = p.getMeta("uiEvent") === "paste" && !i, g = p.getMeta("uiEvent") === "drop" && !r, y = p.getMeta("applyPasteRules"), v = !!y;
      if (!m && !g && !v)
        return;
      if (v) {
        let { text: O } = y;
        typeof O == "string" ? O = O : O = mr(b.from(O), f.schema);
        const { from: $ } = y, D = $ + O.length, L = Jd(O);
        return l({
          rule: c,
          state: f,
          from: $,
          to: { b: D },
          pasteEvt: L
        });
      }
      const E = d.doc.content.findDiffStart(f.doc.content), P = d.doc.content.findDiffEnd(f.doc.content);
      if (!(!jd(E) || !P || E === P.b))
        return l({
          rule: c,
          state: f,
          from: E,
          to: P,
          pasteEvt: o
        });
    }
  }));
}
function Qd(s) {
  const e = s.filter((t, n) => s.indexOf(t) !== n);
  return Array.from(new Set(e));
}
class Ot {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Ot.resolve(e), this.schema = zd(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = Ot.sort(Ot.flatten(e)), n = Qd(t.map((i) => i.name));
    return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const n = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = w(t, "addExtensions", n);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((n, i) => {
      const r = w(n, "priority") || 100, o = w(i, "priority") || 100;
      return r > o ? -1 : r < o ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const n = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: li(t.name, this.schema)
      }, i = w(t, "addCommands", n);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = Ot.sort([...this.extensions].reverse()), n = [], i = [], r = t.map((o) => {
      const a = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e,
        type: li(o.name, this.schema)
      }, l = [], h = w(o, "addKeyboardShortcuts", a);
      let c = {};
      if (o.type === "mark" && w(o, "exitable", a) && (c.ArrowRight = () => Fe.handleExit({ editor: e, mark: o })), h) {
        const m = Object.fromEntries(Object.entries(h()).map(([g, y]) => [g, () => y({ editor: e })]));
        c = { ...c, ...m };
      }
      const u = yd(c);
      l.push(u);
      const d = w(o, "addInputRules", a);
      Bo(o, e.options.enableInputRules) && d && n.push(...d());
      const f = w(o, "addPasteRules", a);
      Bo(o, e.options.enablePasteRules) && f && i.push(...f());
      const p = w(o, "addProseMirrorPlugins", a);
      if (p) {
        const m = p();
        l.push(...m);
      }
      return l;
    }).flat();
    return [
      Yd({
        editor: e,
        rules: n
      }),
      ...Xd({
        editor: e,
        rules: i
      }),
      ...r
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Vl(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = Hs(this.extensions);
    return Object.fromEntries(t.filter((n) => !!w(n, "addNodeView")).map((n) => {
      const i = this.attributes.filter((l) => l.type === n.name), r = {
        name: n.name,
        options: n.options,
        storage: n.storage,
        editor: e,
        type: q(n.name, this.schema)
      }, o = w(n, "addNodeView", r);
      if (!o)
        return [];
      const a = (l, h, c, u, d) => {
        const f = Fi(l, i);
        return o()({
          // pass-through
          node: l,
          view: h,
          getPos: c,
          decorations: u,
          innerDecorations: d,
          // tiptap-specific
          editor: e,
          extension: n,
          HTMLAttributes: f
        });
      };
      return [n.name, a];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const n = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: li(e.name, this.schema)
      };
      e.type === "mark" && (!((t = R(w(e, "keepOnSplit", n))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = w(e, "onBeforeCreate", n), r = w(e, "onCreate", n), o = w(e, "onUpdate", n), a = w(e, "onSelectionUpdate", n), l = w(e, "onTransaction", n), h = w(e, "onFocus", n), c = w(e, "onBlur", n), u = w(e, "onDestroy", n);
      i && this.editor.on("beforeCreate", i), r && this.editor.on("create", r), o && this.editor.on("update", o), a && this.editor.on("selectionUpdate", a), l && this.editor.on("transaction", l), h && this.editor.on("focus", h), c && this.editor.on("blur", c), u && this.editor.on("destroy", u);
    });
  }
}
class ee {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = R(w(this, "addOptions", {
      name: this.name
    }))), this.storage = R(w(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ee(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => zs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ee({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = R(w(t, "addOptions", {
      name: t.name
    })), t.storage = R(w(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Fl(s, e, t) {
  const { from: n, to: i } = e, { blockSeparator: r = `

`, textSerializers: o = {} } = t || {};
  let a = "";
  return s.nodesBetween(n, i, (l, h, c, u) => {
    var d;
    l.isBlock && h > n && (a += r);
    const f = o?.[l.type.name];
    if (f)
      return c && (a += f({
        node: l,
        pos: h,
        parent: c,
        index: u,
        range: e
      })), !1;
    l.isText && (a += (d = l?.text) === null || d === void 0 ? void 0 : d.slice(Math.max(n, h) - h, i - h));
  }), a;
}
function Hl(s) {
  return Object.fromEntries(Object.entries(s.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const Zd = ee.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: s } = this, { state: e, schema: t } = s, { doc: n, selection: i } = e, { ranges: r } = i, o = Math.min(...r.map((c) => c.$from.pos)), a = Math.max(...r.map((c) => c.$to.pos)), l = Hl(t);
            return Fl(n, { from: o, to: a }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: l
            });
          }
        }
      })
    ];
  }
}), ef = () => ({ editor: s, view: e }) => (requestAnimationFrame(() => {
  var t;
  s.isDestroyed || (e.dom.blur(), (t = window?.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), tf = (s = !1) => ({ commands: e }) => e.setContent("", s), nf = () => ({ state: s, tr: e, dispatch: t }) => {
  const { selection: n } = e, { ranges: i } = n;
  return t && i.forEach(({ $from: r, $to: o }) => {
    s.doc.nodesBetween(r.pos, o.pos, (a, l) => {
      if (a.type.isText)
        return;
      const { doc: h, mapping: c } = e, u = h.resolve(c.map(l)), d = h.resolve(c.map(l + a.nodeSize)), f = u.blockRange(d);
      if (!f)
        return;
      const p = Ft(f);
      if (a.type.isTextblock) {
        const { defaultType: m } = u.parent.contentMatchAt(u.index());
        e.setNodeMarkup(f.start, m);
      }
      (p || p === 0) && e.lift(f, p);
    });
  }), !0;
}, sf = (s) => (e) => s(e), rf = () => ({ state: s, dispatch: e }) => Nl(s, e), of = (s, e) => ({ editor: t, tr: n }) => {
  const { state: i } = t, r = i.doc.slice(s.from, s.to);
  n.deleteRange(s.from, s.to);
  const o = n.mapping.map(e);
  return n.insert(o, r.content), n.setSelection(new A(n.doc.resolve(Math.max(o - 1, 0)))), !0;
}, af = () => ({ tr: s, dispatch: e }) => {
  const { selection: t } = s, n = t.$anchor.node();
  if (n.content.size > 0)
    return !1;
  const i = s.selection.$anchor;
  for (let r = i.depth; r > 0; r -= 1)
    if (i.node(r).type === n.type) {
      if (e) {
        const a = i.before(r), l = i.after(r);
        s.delete(a, l).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, lf = (s) => ({ tr: e, state: t, dispatch: n }) => {
  const i = q(s, t.schema), r = e.selection.$anchor;
  for (let o = r.depth; o > 0; o -= 1)
    if (r.node(o).type === i) {
      if (n) {
        const l = r.before(o), h = r.after(o);
        e.delete(l, h).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, hf = (s) => ({ tr: e, dispatch: t }) => {
  const { from: n, to: i } = s;
  return t && e.delete(n, i), !0;
}, cf = () => ({ state: s, dispatch: e }) => cr(s, e), uf = () => ({ commands: s }) => s.keyboardShortcut("Enter"), df = () => ({ state: s, dispatch: e }) => Td(s, e);
function es(s, e, t = { strict: !0 }) {
  const n = Object.keys(e);
  return n.length ? n.every((i) => t.strict ? e[i] === s[i] : gr(e[i]) ? e[i].test(s[i]) : e[i] === s[i]) : !0;
}
function Bl(s, e, t = {}) {
  return s.find((n) => n.type === e && es(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, n.attrs[i]])),
    t
  ));
}
function zo(s, e, t = {}) {
  return !!Bl(s, e, t);
}
function yr(s, e, t) {
  var n;
  if (!s || !e)
    return;
  let i = s.parent.childAfter(s.parentOffset);
  if ((!i.node || !i.node.marks.some((c) => c.type === e)) && (i = s.parent.childBefore(s.parentOffset)), !i.node || !i.node.marks.some((c) => c.type === e) || (t = t || ((n = i.node.marks[0]) === null || n === void 0 ? void 0 : n.attrs), !Bl([...i.node.marks], e, t)))
    return;
  let o = i.index, a = s.start() + i.offset, l = o + 1, h = a + i.node.nodeSize;
  for (; o > 0 && zo([...s.parent.child(o - 1).marks], e, t); )
    o -= 1, a -= s.parent.child(o).nodeSize;
  for (; l < s.parent.childCount && zo([...s.parent.child(l).marks], e, t); )
    h += s.parent.child(l).nodeSize, l += 1;
  return {
    from: a,
    to: h
  };
}
function st(s, e) {
  if (typeof s == "string") {
    if (!e.marks[s])
      throw Error(`There is no mark type named '${s}'. Maybe you forgot to add the extension?`);
    return e.marks[s];
  }
  return s;
}
const ff = (s, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  const r = st(s, n.schema), { doc: o, selection: a } = t, { $from: l, from: h, to: c } = a;
  if (i) {
    const u = yr(l, r, e);
    if (u && u.from <= h && u.to >= c) {
      const d = A.create(o, u.from, u.to);
      t.setSelection(d);
    }
  }
  return !0;
}, pf = (s) => (e) => {
  const t = typeof s == "function" ? s(e) : s;
  for (let n = 0; n < t.length; n += 1)
    if (t[n](e))
      return !0;
  return !1;
};
function zl(s) {
  return s instanceof A;
}
function ht(s = 0, e = 0, t = 0) {
  return Math.min(Math.max(s, e), t);
}
function _l(s, e = null) {
  if (!e)
    return null;
  const t = N.atStart(s), n = N.atEnd(s);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return n;
  const i = t.from, r = n.to;
  return e === "all" ? A.create(s, ht(0, i, r), ht(s.content.size, i, r)) : A.create(s, ht(e, i, r), ht(e, i, r));
}
function mf() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function br() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const gf = (s = null, e = {}) => ({ editor: t, view: n, tr: i, dispatch: r }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (br() || mf()) && n.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (n.focus(), e?.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (n.hasFocus() && s === null || s === !1)
    return !0;
  if (r && s === null && !zl(t.state.selection))
    return o(), !0;
  const a = _l(i.doc, s) || t.state.selection, l = t.state.selection.eq(a);
  return r && (l || i.setSelection(a), l && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, yf = (s, e) => (t) => s.every((n, i) => e(n, { ...t, index: i })), bf = (s, e) => ({ tr: t, commands: n }) => n.insertContentAt({ from: t.selection.from, to: t.selection.to }, s, e), Wl = (s) => {
  const e = s.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const n = e[t];
    n.nodeType === 3 && n.nodeValue && /^(\n\s\s|\n)$/.test(n.nodeValue) ? s.removeChild(n) : n.nodeType === 1 && Wl(n);
  }
  return s;
};
function Nn(s) {
  const e = `<body>${s}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Wl(t);
}
function gn(s, e, t) {
  if (s instanceof qe || s instanceof b)
    return s;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const n = typeof s == "object" && s !== null, i = typeof s == "string";
  if (n)
    try {
      if (Array.isArray(s) && s.length > 0)
        return b.fromArray(s.map((a) => e.nodeFromJSON(a)));
      const o = e.nodeFromJSON(s);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (r) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: r });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", s, "Error:", r), gn("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let o = !1, a = "";
      const l = new ka({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (h) => (o = !0, a = typeof h == "string" ? h : h.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Qt.fromSchema(l).parseSlice(Nn(s), t.parseOptions) : Qt.fromSchema(l).parse(Nn(s), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${a}`) });
    }
    const r = Qt.fromSchema(e);
    return t.slice ? r.parseSlice(Nn(s), t.parseOptions).content : r.parse(Nn(s), t.parseOptions);
  }
  return gn("", e, t);
}
function xf(s, e, t) {
  const n = s.steps.length - 1;
  if (n < e)
    return;
  const i = s.steps[n];
  if (!(i instanceof j || i instanceof K))
    return;
  const r = s.mapping.maps[n];
  let o = 0;
  r.forEach((a, l, h, c) => {
    o === 0 && (o = c);
  }), s.setSelection(N.near(s.doc.resolve(o), t));
}
const Sf = (s) => !("type" in s), vf = (s, e, t) => ({ tr: n, dispatch: i, editor: r }) => {
  var o;
  if (i) {
    t = {
      parseOptions: r.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let a;
    const l = (g) => {
      r.emit("contentError", {
        editor: r,
        error: g,
        disableCollaboration: () => {
          r.storage.collaboration && (r.storage.collaboration.isDisabled = !0);
        }
      });
    }, h = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !r.options.enableContentCheck && r.options.emitContentError)
      try {
        gn(e, r.schema, {
          parseOptions: h,
          errorOnInvalidContent: !0
        });
      } catch (g) {
        l(g);
      }
    try {
      a = gn(e, r.schema, {
        parseOptions: h,
        errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : r.options.enableContentCheck
      });
    } catch (g) {
      return l(g), !1;
    }
    let { from: c, to: u } = typeof s == "number" ? { from: s, to: s } : { from: s.from, to: s.to }, d = !0, f = !0;
    if ((Sf(a) ? a : [a]).forEach((g) => {
      g.check(), d = d ? g.isText && g.marks.length === 0 : !1, f = f ? g.isBlock : !1;
    }), c === u && f) {
      const { parent: g } = n.doc.resolve(c);
      g.isTextblock && !g.type.spec.code && !g.childCount && (c -= 1, u += 1);
    }
    let m;
    if (d) {
      if (Array.isArray(e))
        m = e.map((g) => g.text || "").join("");
      else if (e instanceof b) {
        let g = "";
        e.forEach((y) => {
          y.text && (g += y.text);
        }), m = g;
      } else typeof e == "object" && e && e.text ? m = e.text : m = e;
      n.insertText(m, c, u);
    } else
      m = a, n.replaceWith(c, u, m);
    t.updateSelection && xf(n, n.steps.length - 1, -1), t.applyInputRules && n.setMeta("applyInputRules", { from: c, text: m }), t.applyPasteRules && n.setMeta("applyPasteRules", { from: c, text: m });
  }
  return !0;
}, wf = () => ({ state: s, dispatch: e }) => Sd(s, e), Tf = () => ({ state: s, dispatch: e }) => vd(s, e), kf = () => ({ state: s, dispatch: e }) => Dl(s, e), Df = () => ({ state: s, dispatch: e }) => Al(s, e), Ef = () => ({ state: s, dispatch: e, tr: t }) => {
  try {
    const n = Is(s.doc, s.selection.$from.pos, -1);
    return n == null ? !1 : (t.join(n, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Cf = () => ({ state: s, dispatch: e, tr: t }) => {
  try {
    const n = Is(s.doc, s.selection.$from.pos, 1);
    return n == null ? !1 : (t.join(n, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Mf = () => ({ state: s, dispatch: e }) => bd(s, e), Af = () => ({ state: s, dispatch: e }) => xd(s, e);
function Yl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Of(s) {
  const e = s.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let n, i, r, o;
  for (let a = 0; a < e.length - 1; a += 1) {
    const l = e[a];
    if (/^(cmd|meta|m)$/i.test(l))
      o = !0;
    else if (/^a(lt)?$/i.test(l))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      i = !0;
    else if (/^s(hift)?$/i.test(l))
      r = !0;
    else if (/^mod$/i.test(l))
      br() || Yl() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return n && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), r && (t = `Shift-${t}`), t;
}
const If = (s) => ({ editor: e, view: t, tr: n, dispatch: i }) => {
  const r = Of(s).split(/-(?!$)/), o = r.find((h) => !["Alt", "Ctrl", "Meta", "Shift"].includes(h)), a = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: r.includes("Alt"),
    ctrlKey: r.includes("Ctrl"),
    metaKey: r.includes("Meta"),
    shiftKey: r.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), l = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (h) => h(t, a));
  });
  return l?.steps.forEach((h) => {
    const c = h.map(n.mapping);
    c && i && n.maybeStep(c);
  }), !0;
};
function yn(s, e, t = {}) {
  const { from: n, to: i, empty: r } = s.selection, o = e ? q(e, s.schema) : null, a = [];
  s.doc.nodesBetween(n, i, (u, d) => {
    if (u.isText)
      return;
    const f = Math.max(n, d), p = Math.min(i, d + u.nodeSize);
    a.push({
      node: u,
      from: f,
      to: p
    });
  });
  const l = i - n, h = a.filter((u) => o ? o.name === u.node.type.name : !0).filter((u) => es(u.node.attrs, t, { strict: !1 }));
  return r ? !!h.length : h.reduce((u, d) => u + d.to - d.from, 0) >= l;
}
const Nf = (s, e = {}) => ({ state: t, dispatch: n }) => {
  const i = q(s, t.schema);
  return yn(t, i, e) ? wd(t, n) : !1;
}, Rf = () => ({ state: s, dispatch: e }) => Rl(s, e), Lf = (s) => ({ state: e, dispatch: t }) => {
  const n = q(s, e.schema);
  return Ld(n)(e, t);
}, Pf = () => ({ state: s, dispatch: e }) => Il(s, e);
function _s(s, e) {
  return e.nodes[s] ? "node" : e.marks[s] ? "mark" : null;
}
function _o(s, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(s).reduce((n, i) => (t.includes(i) || (n[i] = s[i]), n), {});
}
const Vf = (s, e) => ({ tr: t, state: n, dispatch: i }) => {
  let r = null, o = null;
  const a = _s(typeof s == "string" ? s : s.name, n.schema);
  return a ? (a === "node" && (r = q(s, n.schema)), a === "mark" && (o = st(s, n.schema)), i && t.selection.ranges.forEach((l) => {
    n.doc.nodesBetween(l.$from.pos, l.$to.pos, (h, c) => {
      r && r === h.type && t.setNodeMarkup(c, void 0, _o(h.attrs, e)), o && h.marks.length && h.marks.forEach((u) => {
        o === u.type && t.addMark(c, c + h.nodeSize, o.create(_o(u.attrs, e)));
      });
    });
  }), !0) : !1;
}, $f = () => ({ tr: s, dispatch: e }) => (e && s.scrollIntoView(), !0), Ff = () => ({ tr: s, dispatch: e }) => {
  if (e) {
    const t = new me(s.doc);
    s.setSelection(t);
  }
  return !0;
}, Hf = () => ({ state: s, dispatch: e }) => Cl(s, e), Bf = () => ({ state: s, dispatch: e }) => Ol(s, e), zf = () => ({ state: s, dispatch: e }) => Ed(s, e), _f = () => ({ state: s, dispatch: e }) => Ad(s, e), Wf = () => ({ state: s, dispatch: e }) => Md(s, e);
function Hi(s, e, t = {}, n = {}) {
  return gn(s, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: n.errorOnInvalidContent
  });
}
const Yf = (s, e = !1, t = {}, n = {}) => ({ editor: i, tr: r, dispatch: o, commands: a }) => {
  var l, h;
  const { doc: c } = r;
  if (t.preserveWhitespace !== "full") {
    const u = Hi(s, i.schema, t, {
      errorOnInvalidContent: (l = n.errorOnInvalidContent) !== null && l !== void 0 ? l : i.options.enableContentCheck
    });
    return o && r.replaceWith(0, c.content.size, u).setMeta("preventUpdate", !e), !0;
  }
  return o && r.setMeta("preventUpdate", !e), a.insertContentAt({ from: 0, to: c.content.size }, s, {
    parseOptions: t,
    errorOnInvalidContent: (h = n.errorOnInvalidContent) !== null && h !== void 0 ? h : i.options.enableContentCheck
  });
};
function Ul(s, e) {
  const t = st(e, s.schema), { from: n, to: i, empty: r } = s.selection, o = [];
  r ? (s.storedMarks && o.push(...s.storedMarks), o.push(...s.selection.$head.marks())) : s.doc.nodesBetween(n, i, (l) => {
    o.push(...l.marks);
  });
  const a = o.find((l) => l.type.name === t.name);
  return a ? { ...a.attrs } : {};
}
function Uf(s, e) {
  const t = new Ba(s);
  return e.forEach((n) => {
    n.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function jf(s) {
  for (let e = 0; e < s.edgeCount; e += 1) {
    const { type: t } = s.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Kf(s, e, t) {
  const n = [];
  return s.nodesBetween(e.from, e.to, (i, r) => {
    t(i) && n.push({
      node: i,
      pos: r
    });
  }), n;
}
function Gf(s, e) {
  for (let t = s.depth; t > 0; t -= 1) {
    const n = s.node(t);
    if (e(n))
      return {
        pos: t > 0 ? s.before(t) : 0,
        start: s.start(t),
        depth: t,
        node: n
      };
  }
}
function xr(s) {
  return (e) => Gf(e.$from, s);
}
function qf(s, e) {
  const t = {
    from: 0,
    to: s.content.size
  };
  return Fl(s, t, e);
}
function Jf(s, e) {
  const t = q(e, s.schema), { from: n, to: i } = s.selection, r = [];
  s.doc.nodesBetween(n, i, (a) => {
    r.push(a);
  });
  const o = r.reverse().find((a) => a.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function jl(s, e) {
  const t = _s(typeof e == "string" ? e : e.name, s.schema);
  return t === "node" ? Jf(s, e) : t === "mark" ? Ul(s, e) : {};
}
function Xf(s, e = JSON.stringify) {
  const t = {};
  return s.filter((n) => {
    const i = e(n);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Qf(s) {
  const e = Xf(s);
  return e.length === 1 ? e : e.filter((t, n) => !e.filter((r, o) => o !== n).some((r) => t.oldRange.from >= r.oldRange.from && t.oldRange.to <= r.oldRange.to && t.newRange.from >= r.newRange.from && t.newRange.to <= r.newRange.to));
}
function Zf(s) {
  const { mapping: e, steps: t } = s, n = [];
  return e.maps.forEach((i, r) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((a, l) => {
        o.push({ from: a, to: l });
      });
    else {
      const { from: a, to: l } = t[r];
      if (a === void 0 || l === void 0)
        return;
      o.push({ from: a, to: l });
    }
    o.forEach(({ from: a, to: l }) => {
      const h = e.slice(r).map(a, -1), c = e.slice(r).map(l), u = e.invert().map(h, -1), d = e.invert().map(c);
      n.push({
        oldRange: {
          from: u,
          to: d
        },
        newRange: {
          from: h,
          to: c
        }
      });
    });
  }), Qf(n);
}
function Sr(s, e, t) {
  const n = [];
  return s === e ? t.resolve(s).marks().forEach((i) => {
    const r = t.resolve(s), o = yr(r, i.type);
    o && n.push({
      mark: i,
      ...o
    });
  }) : t.nodesBetween(s, e, (i, r) => {
    !i || i?.nodeSize === void 0 || n.push(...i.marks.map((o) => ({
      from: r,
      to: r + i.nodeSize,
      mark: o
    })));
  }), n;
}
function Hn(s, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([n]) => {
    const i = s.find((r) => r.type === e && r.name === n);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Bi(s, e, t = {}) {
  const { empty: n, ranges: i } = s.selection, r = e ? st(e, s.schema) : null;
  if (n)
    return !!(s.storedMarks || s.selection.$from.marks()).filter((u) => r ? r.name === u.type.name : !0).find((u) => es(u.attrs, t, { strict: !1 }));
  let o = 0;
  const a = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    s.doc.nodesBetween(f, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(f, g), v = Math.min(p, g + m.nodeSize), E = v - y;
      o += E, a.push(...m.marks.map((P) => ({
        mark: P,
        from: y,
        to: v
      })));
    });
  }), o === 0)
    return !1;
  const l = a.filter((u) => r ? r.name === u.mark.type.name : !0).filter((u) => es(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), h = a.filter((u) => r ? u.mark.type !== r && u.mark.type.excludes(r) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (l > 0 ? l + h : l) >= o;
}
function ep(s, e, t = {}) {
  if (!e)
    return yn(s, null, t) || Bi(s, null, t);
  const n = _s(e, s.schema);
  return n === "node" ? yn(s, e, t) : n === "mark" ? Bi(s, e, t) : !1;
}
function Wo(s, e) {
  const { nodeExtensions: t } = Hs(e), n = t.find((o) => o.name === s);
  if (!n)
    return !1;
  const i = {
    name: n.name,
    options: n.options,
    storage: n.storage
  }, r = R(w(n, "group", i));
  return typeof r != "string" ? !1 : r.split(" ").includes("list");
}
function Ws(s, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var n;
  if (t) {
    if (s.type.name === "hardBreak")
      return !0;
    if (s.isText)
      return /^\s*$/m.test((n = s.text) !== null && n !== void 0 ? n : "");
  }
  if (s.isText)
    return !s.text;
  if (s.isAtom || s.isLeaf)
    return !1;
  if (s.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return s.content.forEach((r) => {
      i !== !1 && (Ws(r, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function tp(s) {
  return s instanceof T;
}
function np(s, e, t) {
  var n;
  const { selection: i } = e;
  let r = null;
  if (zl(i) && (r = i.$cursor), r) {
    const a = (n = s.storedMarks) !== null && n !== void 0 ? n : r.marks();
    return !!t.isInSet(a) || !a.some((l) => l.type.excludes(t));
  }
  const { ranges: o } = i;
  return o.some(({ $from: a, $to: l }) => {
    let h = a.depth === 0 ? s.doc.inlineContent && s.doc.type.allowsMarkType(t) : !1;
    return s.doc.nodesBetween(a.pos, l.pos, (c, u, d) => {
      if (h)
        return !1;
      if (c.isInline) {
        const f = !d || d.type.allowsMarkType(t), p = !!t.isInSet(c.marks) || !c.marks.some((m) => m.type.excludes(t));
        h = f && p;
      }
      return !h;
    }), h;
  });
}
const sp = (s, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  const { selection: r } = t, { empty: o, ranges: a } = r, l = st(s, n.schema);
  if (i)
    if (o) {
      const h = Ul(n, l);
      t.addStoredMark(l.create({
        ...h,
        ...e
      }));
    } else
      a.forEach((h) => {
        const c = h.$from.pos, u = h.$to.pos;
        n.doc.nodesBetween(c, u, (d, f) => {
          const p = Math.max(f, c), m = Math.min(f + d.nodeSize, u);
          d.marks.find((y) => y.type === l) ? d.marks.forEach((y) => {
            l === y.type && t.addMark(p, m, l.create({
              ...y.attrs,
              ...e
            }));
          }) : t.addMark(p, m, l.create(e));
        });
      });
  return np(n, t, l);
}, ip = (s, e) => ({ tr: t }) => (t.setMeta(s, e), !0), rp = (s, e = {}) => ({ state: t, dispatch: n, chain: i }) => {
  const r = q(s, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), r.isTextblock ? i().command(({ commands: a }) => $o(r, { ...o, ...e })(t) ? !0 : a.clearNodes()).command(({ state: a }) => $o(r, { ...o, ...e })(a, n)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, op = (s) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: n } = e, i = ht(s, 0, n.content.size), r = T.create(n, i);
    e.setSelection(r);
  }
  return !0;
}, ap = (s) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: n } = e, { from: i, to: r } = typeof s == "number" ? { from: s, to: s } : s, o = A.atStart(n).from, a = A.atEnd(n).to, l = ht(i, o, a), h = ht(r, o, a), c = A.create(n, l, h);
    e.setSelection(c);
  }
  return !0;
}, lp = (s) => ({ state: e, dispatch: t }) => {
  const n = q(s, e.schema);
  return $d(n)(e, t);
};
function Yo(s, e) {
  const t = s.storedMarks || s.selection.$to.parentOffset && s.selection.$from.marks();
  if (t) {
    const n = t.filter((i) => e?.includes(i.type.name));
    s.tr.ensureMarks(n);
  }
}
const hp = ({ keepMarks: s = !0 } = {}) => ({ tr: e, state: t, dispatch: n, editor: i }) => {
  const { selection: r, doc: o } = e, { $from: a, $to: l } = r, h = i.extensionManager.attributes, c = Hn(h, a.node().type.name, a.node().attrs);
  if (r instanceof T && r.node.isBlock)
    return !a.parentOffset || !Ve(o, a.pos) ? !1 : (n && (s && Yo(t, i.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock)
    return !1;
  const u = l.parentOffset === l.parent.content.size, d = a.depth === 0 ? void 0 : jf(a.node(-1).contentMatchAt(a.indexAfter(-1)));
  let f = u && d ? [
    {
      type: d,
      attrs: c
    }
  ] : void 0, p = Ve(e.doc, e.mapping.map(a.pos), 1, f);
  if (!f && !p && Ve(e.doc, e.mapping.map(a.pos), 1, d ? [{ type: d }] : void 0) && (p = !0, f = d ? [
    {
      type: d,
      attrs: c
    }
  ] : void 0), n) {
    if (p && (r instanceof A && e.deleteSelection(), e.split(e.mapping.map(a.pos), 1, f), d && !u && !a.parentOffset && a.parent.type !== d)) {
      const m = e.mapping.map(a.before()), g = e.doc.resolve(m);
      a.node(-1).canReplaceWith(g.index(), g.index() + 1, d) && e.setNodeMarkup(e.mapping.map(a.before()), d);
    }
    s && Yo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, cp = (s, e = {}) => ({ tr: t, state: n, dispatch: i, editor: r }) => {
  var o;
  const a = q(s, n.schema), { $from: l, $to: h } = n.selection, c = n.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(h))
    return !1;
  const u = l.node(-1);
  if (u.type !== a)
    return !1;
  const d = r.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== a || l.index(-2) !== l.node(-2).childCount - 1)
      return !1;
    if (i) {
      let y = b.empty;
      const v = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let L = l.depth - v; L >= l.depth - 3; L -= 1)
        y = b.from(l.node(L).copy(y));
      const E = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, P = {
        ...Hn(d, l.node().type.name, l.node().attrs),
        ...e
      }, O = ((o = a.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(P)) || void 0;
      y = y.append(b.from(a.createAndFill(null, O) || void 0));
      const $ = l.before(l.depth - (v - 1));
      t.replace($, l.after(-E), new S(y, 4 - v, 0));
      let D = -1;
      t.doc.nodesBetween($, t.doc.content.size, (L, U) => {
        if (D > -1)
          return !1;
        L.isTextblock && L.content.size === 0 && (D = U + 1);
      }), D > -1 && t.setSelection(A.near(t.doc.resolve(D))), t.scrollIntoView();
    }
    return !0;
  }
  const f = h.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...Hn(d, u.type.name, u.attrs),
    ...e
  }, m = {
    ...Hn(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, h.pos);
  const g = f ? [
    { type: a, attrs: p },
    { type: f, attrs: m }
  ] : [{ type: a, attrs: p }];
  if (!Ve(t.doc, l.pos, 2))
    return !1;
  if (i) {
    const { selection: y, storedMarks: v } = n, { splittableMarks: E } = r.extensionManager, P = v || y.$to.parentOffset && y.$from.marks();
    if (t.split(l.pos, 2, g).scrollIntoView(), !P || !i)
      return !0;
    const O = P.filter(($) => E.includes($.type.name));
    t.ensureMarks(O);
  }
  return !0;
}, hi = (s, e) => {
  const t = xr((o) => o.type === e)(s.selection);
  if (!t)
    return !0;
  const n = s.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (n === void 0)
    return !0;
  const i = s.doc.nodeAt(n);
  return t.node.type === i?.type && tt(s.doc, t.pos) && s.join(t.pos), !0;
}, ci = (s, e) => {
  const t = xr((o) => o.type === e)(s.selection);
  if (!t)
    return !0;
  const n = s.doc.resolve(t.start).after(t.depth);
  if (n === void 0)
    return !0;
  const i = s.doc.nodeAt(n);
  return t.node.type === i?.type && tt(s.doc, n) && s.join(n), !0;
}, up = (s, e, t, n = {}) => ({ editor: i, tr: r, state: o, dispatch: a, chain: l, commands: h, can: c }) => {
  const { extensions: u, splittableMarks: d } = i.extensionManager, f = q(s, o.schema), p = q(e, o.schema), { selection: m, storedMarks: g } = o, { $from: y, $to: v } = m, E = y.blockRange(v), P = g || m.$to.parentOffset && m.$from.marks();
  if (!E)
    return !1;
  const O = xr(($) => Wo($.type.name, u))(m);
  if (E.depth >= 1 && O && E.depth - O.depth <= 1) {
    if (O.node.type === f)
      return h.liftListItem(p);
    if (Wo(O.node.type.name, u) && f.validContent(O.node.content) && a)
      return l().command(() => (r.setNodeMarkup(O.pos, f), !0)).command(() => hi(r, f)).command(() => ci(r, f)).run();
  }
  return !t || !P || !a ? l().command(() => c().wrapInList(f, n) ? !0 : h.clearNodes()).wrapInList(f, n).command(() => hi(r, f)).command(() => ci(r, f)).run() : l().command(() => {
    const $ = c().wrapInList(f, n), D = P.filter((L) => d.includes(L.type.name));
    return r.ensureMarks(D), $ ? !0 : h.clearNodes();
  }).wrapInList(f, n).command(() => hi(r, f)).command(() => ci(r, f)).run();
}, dp = (s, e = {}, t = {}) => ({ state: n, commands: i }) => {
  const { extendEmptyMarkRange: r = !1 } = t, o = st(s, n.schema);
  return Bi(n, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: r }) : i.setMark(o, e);
}, fp = (s, e, t = {}) => ({ state: n, commands: i }) => {
  const r = q(s, n.schema), o = q(e, n.schema), a = yn(n, r, t);
  let l;
  return n.selection.$anchor.sameParent(n.selection.$head) && (l = n.selection.$anchor.parent.attrs), a ? i.setNode(o, l) : i.setNode(r, { ...l, ...t });
}, pp = (s, e = {}) => ({ state: t, commands: n }) => {
  const i = q(s, t.schema);
  return yn(t, i, e) ? n.lift(i) : n.wrapIn(i, e);
}, mp = () => ({ state: s, dispatch: e }) => {
  const t = s.plugins;
  for (let n = 0; n < t.length; n += 1) {
    const i = t[n];
    let r;
    if (i.spec.isInputRules && (r = i.getState(s))) {
      if (e) {
        const o = s.tr, a = r.transform;
        for (let l = a.steps.length - 1; l >= 0; l -= 1)
          o.step(a.steps[l].invert(a.docs[l]));
        if (r.text) {
          const l = o.doc.resolve(r.from).marks();
          o.replaceWith(r.from, r.to, s.schema.text(r.text, l));
        } else
          o.delete(r.from, r.to);
      }
      return !0;
    }
  }
  return !1;
}, gp = () => ({ tr: s, dispatch: e }) => {
  const { selection: t } = s, { empty: n, ranges: i } = t;
  return n || e && i.forEach((r) => {
    s.removeMark(r.$from.pos, r.$to.pos);
  }), !0;
}, yp = (s, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  var r;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: a } = t, l = st(s, n.schema), { $from: h, empty: c, ranges: u } = a;
  if (!i)
    return !0;
  if (c && o) {
    let { from: d, to: f } = a;
    const p = (r = h.marks().find((g) => g.type === l)) === null || r === void 0 ? void 0 : r.attrs, m = yr(h, l, p);
    m && (d = m.from, f = m.to), t.removeMark(d, f, l);
  } else
    u.forEach((d) => {
      t.removeMark(d.$from.pos, d.$to.pos, l);
    });
  return t.removeStoredMark(l), !0;
}, bp = (s, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  let r = null, o = null;
  const a = _s(typeof s == "string" ? s : s.name, n.schema);
  return a ? (a === "node" && (r = q(s, n.schema)), a === "mark" && (o = st(s, n.schema)), i && t.selection.ranges.forEach((l) => {
    const h = l.$from.pos, c = l.$to.pos;
    let u, d, f, p;
    t.selection.empty ? n.doc.nodesBetween(h, c, (m, g) => {
      r && r === m.type && (f = Math.max(g, h), p = Math.min(g + m.nodeSize, c), u = g, d = m);
    }) : n.doc.nodesBetween(h, c, (m, g) => {
      g < h && r && r === m.type && (f = Math.max(g, h), p = Math.min(g + m.nodeSize, c), u = g, d = m), g >= h && g <= c && (r && r === m.type && t.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), o && m.marks.length && m.marks.forEach((y) => {
        if (o === y.type) {
          const v = Math.max(g, h), E = Math.min(g + m.nodeSize, c);
          t.addMark(v, E, o.create({
            ...y.attrs,
            ...e
          }));
        }
      }));
    }), d && (u !== void 0 && t.setNodeMarkup(u, void 0, {
      ...d.attrs,
      ...e
    }), o && d.marks.length && d.marks.forEach((m) => {
      o === m.type && t.addMark(f, p, o.create({
        ...m.attrs,
        ...e
      }));
    }));
  }), !0) : !1;
}, xp = (s, e = {}) => ({ state: t, dispatch: n }) => {
  const i = q(s, t.schema);
  return Od(i, e)(t, n);
}, Sp = (s, e = {}) => ({ state: t, dispatch: n }) => {
  const i = q(s, t.schema);
  return Id(i, e)(t, n);
};
var vp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: ef,
  clearContent: tf,
  clearNodes: nf,
  command: sf,
  createParagraphNear: rf,
  cut: of,
  deleteCurrentNode: af,
  deleteNode: lf,
  deleteRange: hf,
  deleteSelection: cf,
  enter: uf,
  exitCode: df,
  extendMarkRange: ff,
  first: pf,
  focus: gf,
  forEach: yf,
  insertContent: bf,
  insertContentAt: vf,
  joinBackward: kf,
  joinDown: Tf,
  joinForward: Df,
  joinItemBackward: Ef,
  joinItemForward: Cf,
  joinTextblockBackward: Mf,
  joinTextblockForward: Af,
  joinUp: wf,
  keyboardShortcut: If,
  lift: Nf,
  liftEmptyBlock: Rf,
  liftListItem: Lf,
  newlineInCode: Pf,
  resetAttributes: Vf,
  scrollIntoView: $f,
  selectAll: Ff,
  selectNodeBackward: Hf,
  selectNodeForward: Bf,
  selectParentNode: zf,
  selectTextblockEnd: _f,
  selectTextblockStart: Wf,
  setContent: Yf,
  setMark: sp,
  setMeta: ip,
  setNode: rp,
  setNodeSelection: op,
  setTextSelection: ap,
  sinkListItem: lp,
  splitBlock: hp,
  splitListItem: cp,
  toggleList: up,
  toggleMark: dp,
  toggleNode: fp,
  toggleWrap: pp,
  undoInputRule: mp,
  unsetAllMarks: gp,
  unsetMark: yp,
  updateAttributes: bp,
  wrapIn: xp,
  wrapInList: Sp
});
const wp = ee.create({
  name: "commands",
  addCommands() {
    return {
      ...vp
    };
  }
}), Tp = ee.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("tiptapDrop"),
        props: {
          handleDrop: (s, e, t, n) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: n
            });
          }
        }
      })
    ];
  }
}), kp = ee.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Dp = new he("focusEvents"), Ep = ee.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: s } = this;
    return [
      new Y({
        key: Dp,
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              s.isFocused = !0;
              const n = s.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(n), !1;
            },
            blur: (e, t) => {
              s.isFocused = !1;
              const n = s.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(n), !1;
            }
          }
        }
      })
    ];
  }
}), Cp = ee.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const s = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: a }) => {
        const { selection: l, doc: h } = a, { empty: c, $anchor: u } = l, { pos: d, parent: f } = u, p = u.parent.isTextblock && d > 0 ? a.doc.resolve(d - 1) : u, m = p.parent.type.spec.isolating, g = u.pos - u.parentOffset, y = m && p.parent.childCount === 1 ? g === u.pos : N.atStart(h).from === d;
        return !c || !f.type.isTextblock || f.textContent.length || !y || y && u.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), n = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: s,
      "Mod-Backspace": s,
      "Shift-Backspace": s,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...n
    }, r = {
      ...n,
      "Ctrl-h": s,
      "Alt-Backspace": s,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return br() || Yl() ? r : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new Y({
        key: new he("clearDocument"),
        appendTransaction: (s, e, t) => {
          if (s.some((m) => m.getMeta("composition")))
            return;
          const n = s.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = s.some((m) => m.getMeta("preventClearDocument"));
          if (!n || i)
            return;
          const { empty: r, from: o, to: a } = e.selection, l = N.atStart(e.doc).from, h = N.atEnd(e.doc).to;
          if (r || !(o === l && a === h) || !Ws(t.doc))
            return;
          const d = t.tr, f = $s({
            state: t,
            transaction: d
          }), { commands: p } = new Fs({
            editor: this.editor,
            state: f
          });
          if (p.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), Mp = ee.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("tiptapPaste"),
        props: {
          handlePaste: (s, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), Ap = ee.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class ot {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, n = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = n, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, n = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, n = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: n }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new ot(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new ot(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new ot(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, n) => {
      const i = t.isBlock && !t.isTextblock, r = t.isAtom && !t.isText, o = this.pos + n + (r ? 0 : 1);
      if (o < 0 || o > this.resolvedPos.doc.nodeSize - 2)
        return;
      const a = this.resolvedPos.doc.resolve(o);
      if (!i && a.depth <= this.depth)
        return;
      const l = new ot(a, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new ot(a, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let n = null, i = this.parent;
    for (; i && !n; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const r = i.node.attrs, o = Object.keys(t);
          for (let a = 0; a < o.length; a += 1) {
            const l = o[a];
            if (r[l] !== t[l])
              break;
          }
        } else
          n = i;
      i = i.parent;
    }
    return n;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, n = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const r = Object.keys(t);
    return this.children.forEach((o) => {
      n && i.length > 0 || (o.node.type.name === e && r.every((l) => t[l] === o.node.attrs[l]) && i.push(o), !(n && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, n))));
    }), i;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}
const Op = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function Ip(s, e, t) {
  const n = document.querySelector("style[data-tiptap-style]");
  if (n !== null)
    return n;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = s, document.getElementsByTagName("head")[0].appendChild(i), i;
}
class Np extends Fd {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      },
      onPaste: () => null,
      onDrop: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: t, slice: n, moved: i }) => this.options.onDrop(t, n, i)), this.on("paste", ({ event: t, slice: n }) => this.options.onPaste(t, n)), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = Ip(Op, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(e, t) {
    const n = $l(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: n });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = this.state.plugins;
    let n = t;
    if ([].concat(e).forEach((r) => {
      const o = typeof r == "string" ? `${r}$` : r.key;
      n = n.filter((a) => !a.key.startsWith(o));
    }), t.length === n.length)
      return;
    const i = this.state.reconfigure({
      plugins: n
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      kp,
      Zd.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      wp,
      Ep,
      Cp,
      Ap,
      Tp,
      Mp
    ].filter((r) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[r.name] !== !1 : !0) : [], ...this.options.extensions].filter((r) => ["extension", "node", "mark"].includes(r?.type));
    this.extensionManager = new Ot(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Fs({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    var e;
    let t;
    try {
      t = Hi(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (o) {
      if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
        throw o;
      this.emit("contentError", {
        editor: this,
        error: o,
        disableCollaboration: () => {
          this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((a) => a.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = Hi(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const n = _l(t, this.options.autofocus);
    this.view = new wl(this.options.element, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: At.create({
        doc: t,
        selection: n || void 0
      })
    });
    const i = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(i), this.createNodeViews(), this.prependClass();
    const r = this.view.dom;
    r.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((o) => {
        var a;
        return (a = this.capturedTransaction) === null || a === void 0 ? void 0 : a.step(o);
      });
      return;
    }
    const t = this.state.apply(e), n = !this.state.selection.eq(t.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: t
    }), this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), n && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), r = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), r && this.emit("blur", {
      editor: this,
      event: r.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return jl(this.state, e);
  }
  isActive(e, t) {
    const n = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return ep(this.state, n, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return mr(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: n = {} } = e || {};
    return qf(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Hl(this.schema),
        ...n
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return Ws(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    if (this.emit("destroy"), this.view) {
      const e = this.view.dom;
      e && e.editor && delete e.editor, this.view.destroy();
    }
    this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var n;
    return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var n;
    return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new ot(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
}
function $t(s) {
  return new Bs({
    find: s.find,
    handler: ({ state: e, range: t, match: n }) => {
      const i = R(s.getAttributes, void 0, n);
      if (i === !1 || i === null)
        return null;
      const { tr: r } = e, o = n[n.length - 1], a = n[0];
      if (o) {
        const l = a.search(/\S/), h = t.from + a.indexOf(o), c = h + o.length;
        if (Sr(t.from, t.to, e.doc).filter((f) => f.mark.type.excluded.find((m) => m === s.type && m !== f.mark.type)).filter((f) => f.to > h).length)
          return null;
        c < t.to && r.delete(c, t.to), h > t.from && r.delete(t.from + l, h);
        const d = t.from + l + o.length;
        r.addMark(t.from + l, d, s.type.create(i || {})), r.removeStoredMark(s.type);
      }
    }
  });
}
function Kl(s) {
  return new Bs({
    find: s.find,
    handler: ({ state: e, range: t, match: n }) => {
      const i = R(s.getAttributes, void 0, n) || {}, { tr: r } = e, o = t.from;
      let a = t.to;
      const l = s.type.create(i);
      if (n[1]) {
        const h = n[0].lastIndexOf(n[1]);
        let c = o + h;
        c > a ? c = a : a = c + n[1].length;
        const u = n[0][n[0].length - 1];
        r.insertText(u, o + n[0].length - 1), r.replaceWith(c, a, l);
      } else if (n[0]) {
        const h = s.type.isInline ? o : o - 1;
        r.insert(h, s.type.create(i)).delete(r.mapping.map(o), r.mapping.map(a));
      }
      r.scrollIntoView();
    }
  });
}
function zi(s) {
  return new Bs({
    find: s.find,
    handler: ({ state: e, range: t, match: n }) => {
      const i = e.doc.resolve(t.from), r = R(s.getAttributes, void 0, n) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), s.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, s.type, r);
    }
  });
}
function bn(s) {
  return new Bs({
    find: s.find,
    handler: ({ state: e, range: t, match: n, chain: i }) => {
      const r = R(s.getAttributes, void 0, n) || {}, o = e.tr.delete(t.from, t.to), l = o.doc.resolve(t.from).blockRange(), h = l && Zi(l, s.type, r);
      if (!h)
        return null;
      if (o.wrap(l, h), s.keepMarks && s.editor) {
        const { selection: u, storedMarks: d } = e, { splittableMarks: f } = s.editor.extensionManager, p = d || u.$to.parentOffset && u.$from.marks();
        if (p) {
          const m = p.filter((g) => f.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (s.keepAttributes) {
        const u = s.type.name === "bulletList" || s.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(u, r).run();
      }
      const c = o.doc.resolve(t.from - 1).nodeBefore;
      c && c.type === s.type && tt(o.doc, t.from - 1) && (!s.joinPredicate || s.joinPredicate(n, c)) && o.join(t.from - 1);
    }
  });
}
class le {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = R(w(this, "addOptions", {
      name: this.name
    }))), this.storage = R(w(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new le(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => zs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new le(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = R(w(t, "addOptions", {
      name: t.name
    })), t.storage = R(w(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function St(s) {
  return new Kd({
    find: s.find,
    handler: ({ state: e, range: t, match: n, pasteEvent: i }) => {
      const r = R(s.getAttributes, void 0, n, i);
      if (r === !1 || r === null)
        return null;
      const { tr: o } = e, a = n[n.length - 1], l = n[0];
      let h = t.to;
      if (a) {
        const c = l.search(/\S/), u = t.from + l.indexOf(a), d = u + a.length;
        if (Sr(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === s.type && g !== p.mark.type)).filter((p) => p.to > u).length)
          return null;
        d < t.to && o.delete(d, t.to), u > t.from && o.delete(t.from + c, u), h = t.from + c + a.length, o.addMark(t.from + c, h, s.type.create(r || {})), o.removeStoredMark(s.type);
      }
    }
  });
}
function Rp(s, e) {
  const { selection: t } = s, { $from: n } = t;
  if (t instanceof T) {
    const r = n.index();
    return n.parent.canReplaceWith(r, r + 1, e);
  }
  let i = n.depth;
  for (; i >= 0; ) {
    const r = n.index(i);
    if (n.node(i).contentMatchAt(r).matchType(e))
      return !0;
    i -= 1;
  }
  return !1;
}
const Lp = /^\s*>\s$/, Pp = le.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["blockquote", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: s }) => s.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: s }) => s.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: s }) => s.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      bn({
        find: Lp,
        type: this.type
      })
    ];
  }
}), Vp = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, $p = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Fp = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Hp = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Bp = Fe.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (s) => s.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (s) => s.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (s) => /^(bold(er)?|[5-9]\d{2,})$/.test(s) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["strong", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: s }) => s.setMark(this.name),
      toggleBold: () => ({ commands: s }) => s.toggleMark(this.name),
      unsetBold: () => ({ commands: s }) => s.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      $t({
        find: Vp,
        type: this.type
      }),
      $t({
        find: Fp,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      St({
        find: $p,
        type: this.type
      }),
      St({
        find: Hp,
        type: this.type
      })
    ];
  }
}), zp = "listItem", Uo = "textStyle", jo = /^\s*([-+*])\s$/, _p = le.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["ul", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: s, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(zp, this.editor.getAttributes(Uo)).run() : s.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let s = bn({
      find: jo,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (s = bn({
      find: jo,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(Uo),
      editor: this.editor
    })), [
      s
    ];
  }
}), Wp = /(^|[^`])`([^`]+)`(?!`)/, Yp = /(^|[^`])`([^`]+)`(?!`)/g, Up = Fe.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["code", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: s }) => s.setMark(this.name),
      toggleCode: () => ({ commands: s }) => s.toggleMark(this.name),
      unsetCode: () => ({ commands: s }) => s.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      $t({
        find: Wp,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      St({
        find: Yp,
        type: this.type
      })
    ];
  }
}), jp = /^```([a-z]+)?[\s\n]$/, Kp = /^~~~([a-z]+)?[\s\n]$/, Gp = le.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (s) => {
          var e;
          const { languageClassPrefix: t } = this.options, r = [...((e = s.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((o) => o.startsWith(t)).map((o) => o.replace(t, ""))[0];
          return r || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: s, HTMLAttributes: e }) {
    return [
      "pre",
      J(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: s.attrs.language ? this.options.languageClassPrefix + s.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (s) => ({ commands: e }) => e.setNode(this.name, s),
      toggleCodeBlock: (s) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", s)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: s, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !s || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: s }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = s, { selection: t } = e, { $from: n, empty: i } = t;
        if (!i || n.parent.type !== this.type)
          return !1;
        const r = n.parentOffset === n.parent.nodeSize - 2, o = n.parent.textContent.endsWith(`

`);
        return !r || !o ? !1 : s.chain().command(({ tr: a }) => (a.delete(n.pos - 2, n.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: s }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = s, { selection: t, doc: n } = e, { $from: i, empty: r } = t;
        if (!r || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const a = i.after();
        return a === void 0 ? !1 : n.nodeAt(a) ? s.commands.command(({ tr: h }) => (h.setSelection(N.near(n.resolve(a))), !0)) : s.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      zi({
        find: jp,
        type: this.type,
        getAttributes: (s) => ({
          language: s[1]
        })
      }),
      zi({
        find: Kp,
        type: this.type,
        getAttributes: (s) => ({
          language: s[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new Y({
        key: new he("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (s, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), n = e.clipboardData.getData("vscode-editor-data"), i = n ? JSON.parse(n) : void 0, r = i?.mode;
            if (!t || !r)
              return !1;
            const { tr: o, schema: a } = s.state, l = a.text(t.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: r }, l)), o.selection.$from.parent.type !== this.type && o.setSelection(A.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), s.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), qp = le.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function Jp(s = {}) {
  return new Y({
    view(e) {
      return new Xp(e, s);
    }
  });
}
class Xp {
  constructor(e, t) {
    var n;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (n = t.width) !== null && n !== void 0 ? n : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let r = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, r), { name: i, handler: r };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, n, i = this.editorView.dom, r = i.getBoundingClientRect(), o = r.width / i.offsetWidth, a = r.height / i.offsetHeight;
    if (t) {
      let u = e.nodeBefore, d = e.nodeAfter;
      if (u || d) {
        let f = this.editorView.nodeDOM(this.cursorPos - (u ? u.nodeSize : 0));
        if (f) {
          let p = f.getBoundingClientRect(), m = u ? p.bottom : p.top;
          u && d && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * a;
          n = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!n) {
      let u = this.editorView.coordsAtPos(this.cursorPos), d = this.width / 2 * o;
      n = { left: u.left - d, right: u.left + d, top: u.top, bottom: u.bottom };
    }
    let l = this.editorView.dom.offsetParent;
    this.element || (this.element = l.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let h, c;
    if (!l || l == document.body && getComputedStyle(l).position == "static")
      h = -pageXOffset, c = -pageYOffset;
    else {
      let u = l.getBoundingClientRect(), d = u.width / l.offsetWidth, f = u.height / l.offsetHeight;
      h = u.left - l.scrollLeft * d, c = u.top - l.scrollTop * f;
    }
    this.element.style.left = (n.left - h) / o + "px", this.element.style.top = (n.top - c) / a + "px", this.element.style.width = (n.right - n.left) / o + "px", this.element.style.height = (n.bottom - n.top) / a + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), n = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = n && n.type.spec.disableDropCursor, r = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !r) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let a = Pa(this.editorView.state.doc, o, this.editorView.dragging.slice);
        a != null && (o = a);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
const Qp = ee.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      Jp(this.options)
    ];
  }
});
class B extends N {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let n = e.resolve(t.map(this.head));
    return B.valid(n) ? new B(n) : N.near(n);
  }
  content() {
    return S.empty;
  }
  eq(e) {
    return e instanceof B && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new B(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new vr(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !Zp(e) || !em(e))
      return !1;
    let n = t.type.spec.allowGapCursor;
    if (n != null)
      return n;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, n = !1) {
    e: for (; ; ) {
      if (!n && B.valid(e))
        return e;
      let i = e.pos, r = null;
      for (let o = e.depth; ; o--) {
        let a = e.node(o);
        if (t > 0 ? e.indexAfter(o) < a.childCount : e.index(o) > 0) {
          r = a.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += t;
        let l = e.doc.resolve(i);
        if (B.valid(l))
          return l;
      }
      for (; ; ) {
        let o = t > 0 ? r.firstChild : r.lastChild;
        if (!o) {
          if (r.isAtom && !r.isText && !T.isSelectable(r)) {
            e = e.doc.resolve(i + r.nodeSize * t), n = !1;
            continue e;
          }
          break;
        }
        r = o, i += t;
        let a = e.doc.resolve(i);
        if (B.valid(a))
          return a;
      }
      return null;
    }
  }
}
B.prototype.visible = !1;
B.findFrom = B.findGapCursorFrom;
N.jsonID("gapcursor", B);
class vr {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new vr(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return B.valid(t) ? new B(t) : N.near(t);
  }
}
function Gl(s) {
  return s.isAtom || s.spec.isolating || s.spec.createGapCursor;
}
function Zp(s) {
  for (let e = s.depth; e >= 0; e--) {
    let t = s.index(e), n = s.node(e);
    if (t == 0) {
      if (n.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = n.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || Gl(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function em(s) {
  for (let e = s.depth; e >= 0; e--) {
    let t = s.indexAfter(e), n = s.node(e);
    if (t == n.childCount) {
      if (n.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = n.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || Gl(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function tm() {
  return new Y({
    props: {
      decorations: rm,
      createSelectionBetween(s, e, t) {
        return e.pos == t.pos && B.valid(t) ? new B(t) : null;
      },
      handleClick: sm,
      handleKeyDown: nm,
      handleDOMEvents: { beforeinput: im }
    }
  });
}
const nm = Tl({
  ArrowLeft: Rn("horiz", -1),
  ArrowRight: Rn("horiz", 1),
  ArrowUp: Rn("vert", -1),
  ArrowDown: Rn("vert", 1)
});
function Rn(s, e) {
  const t = s == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(n, i, r) {
    let o = n.selection, a = e > 0 ? o.$to : o.$from, l = o.empty;
    if (o instanceof A) {
      if (!r.endOfTextblock(t) || a.depth == 0)
        return !1;
      l = !1, a = n.doc.resolve(e > 0 ? a.after() : a.before());
    }
    let h = B.findGapCursorFrom(a, e, l);
    return h ? (i && i(n.tr.setSelection(new B(h))), !0) : !1;
  };
}
function sm(s, e, t) {
  if (!s || !s.editable)
    return !1;
  let n = s.state.doc.resolve(e);
  if (!B.valid(n))
    return !1;
  let i = s.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && T.isSelectable(s.state.doc.nodeAt(i.inside)) ? !1 : (s.dispatch(s.state.tr.setSelection(new B(n))), !0);
}
function im(s, e) {
  if (e.inputType != "insertCompositionText" || !(s.state.selection instanceof B))
    return !1;
  let { $from: t } = s.state.selection, n = t.parent.contentMatchAt(t.index()).findWrapping(s.state.schema.nodes.text);
  if (!n)
    return !1;
  let i = b.empty;
  for (let o = n.length - 1; o >= 0; o--)
    i = b.from(n[o].createAndFill(null, i));
  let r = s.state.tr.replace(t.pos, t.pos, new S(i, 0, 0));
  return r.setSelection(A.near(r.doc.resolve(t.pos + 1))), s.dispatch(r), !1;
}
function rm(s) {
  if (!(s.selection instanceof B))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", z.create(s.doc, [pe.widget(s.selection.head, e, { key: "gapcursor" })]);
}
const om = ee.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      tm()
    ];
  },
  extendNodeSchema(s) {
    var e;
    const t = {
      name: s.name,
      options: s.options,
      storage: s.storage
    };
    return {
      allowGapCursor: (e = R(w(s, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), am = le.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["br", J(this.options.HTMLAttributes, s)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: s, chain: e, state: t, editor: n }) => s.first([
        () => s.exitCode(),
        () => s.command(() => {
          const { selection: i, storedMarks: r } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: a } = n.extensionManager, l = r || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: h, dispatch: c }) => {
            if (c && l && o) {
              const u = l.filter((d) => a.includes(d.type.name));
              h.ensureMarks(u);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), lm = le.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((s) => ({
      tag: `h${s}`,
      attrs: { level: s }
    }));
  },
  renderHTML({ node: s, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(s.attrs.level) ? s.attrs.level : this.options.levels[0]}`, J(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (s) => ({ commands: e }) => this.options.levels.includes(s.level) ? e.setNode(this.name, s) : !1,
      toggleHeading: (s) => ({ commands: e }) => this.options.levels.includes(s.level) ? e.toggleNode(this.name, "paragraph", s) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((s, e) => ({
      ...s,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((s) => zi({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${s}})\\s$`),
      type: this.type,
      getAttributes: {
        level: s
      }
    }));
  }
});
var ts = 200, G = function() {
};
G.prototype.append = function(e) {
  return e.length ? (e = G.from(e), !this.length && e || e.length < ts && this.leafAppend(e) || this.length < ts && e.leafPrepend(this) || this.appendInner(e)) : this;
};
G.prototype.prepend = function(e) {
  return e.length ? G.from(e).append(this) : this;
};
G.prototype.appendInner = function(e) {
  return new hm(this, e);
};
G.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? G.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
G.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
G.prototype.forEach = function(e, t, n) {
  t === void 0 && (t = 0), n === void 0 && (n = this.length), t <= n ? this.forEachInner(e, t, n, 0) : this.forEachInvertedInner(e, t, n, 0);
};
G.prototype.map = function(e, t, n) {
  t === void 0 && (t = 0), n === void 0 && (n = this.length);
  var i = [];
  return this.forEach(function(r, o) {
    return i.push(e(r, o));
  }, t, n), i;
};
G.from = function(e) {
  return e instanceof G ? e : e && e.length ? new ql(e) : G.empty;
};
var ql = /* @__PURE__ */ (function(s) {
  function e(n) {
    s.call(this), this.values = n;
  }
  s && (e.__proto__ = s), e.prototype = Object.create(s && s.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, r) {
    return i == 0 && r == this.length ? this : new e(this.values.slice(i, r));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, r, o, a) {
    for (var l = r; l < o; l++)
      if (i(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, r, o, a) {
    for (var l = r - 1; l >= o; l--)
      if (i(this.values[l], a + l) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= ts)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= ts)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
})(G);
G.empty = new ql([]);
var hm = /* @__PURE__ */ (function(s) {
  function e(t, n) {
    s.call(this), this.left = t, this.right = n, this.length = t.length + n.length, this.depth = Math.max(t.depth, n.depth) + 1;
  }
  return s && (e.__proto__ = s), e.prototype = Object.create(s && s.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(n) {
    return n < this.left.length ? this.left.get(n) : this.right.get(n - this.left.length);
  }, e.prototype.forEachInner = function(n, i, r, o) {
    var a = this.left.length;
    if (i < a && this.left.forEachInner(n, i, Math.min(r, a), o) === !1 || r > a && this.right.forEachInner(n, Math.max(i - a, 0), Math.min(this.length, r) - a, o + a) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(n, i, r, o) {
    var a = this.left.length;
    if (i > a && this.right.forEachInvertedInner(n, i - a, Math.max(r, a) - a, o + a) === !1 || r < a && this.left.forEachInvertedInner(n, Math.min(i, a), r, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(n, i) {
    if (n == 0 && i == this.length)
      return this;
    var r = this.left.length;
    return i <= r ? this.left.slice(n, i) : n >= r ? this.right.slice(n - r, i - r) : this.left.slice(n, r).append(this.right.slice(0, i - r));
  }, e.prototype.leafAppend = function(n) {
    var i = this.right.leafAppend(n);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(n) {
    var i = this.left.leafPrepend(n);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(n) {
    return this.left.depth >= Math.max(this.right.depth, n.depth) + 1 ? new e(this.left, new e(this.right, n)) : new e(this, n);
  }, e;
})(G);
const cm = 500;
class Te {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let n = this.items.length;
    for (; ; n--)
      if (this.items.get(n - 1).selection) {
        --n;
        break;
      }
    let i, r;
    t && (i = this.remapping(n, this.items.length), r = i.maps.length);
    let o = e.tr, a, l, h = [], c = [];
    return this.items.forEach((u, d) => {
      if (!u.step) {
        i || (i = this.remapping(n, d + 1), r = i.maps.length), r--, c.push(u);
        return;
      }
      if (i) {
        c.push(new ke(u.map));
        let f = u.step.map(i.slice(r)), p;
        f && o.maybeStep(f).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], h.push(new ke(p, void 0, void 0, h.length + c.length))), r--, p && i.appendMap(p, r);
      } else
        o.maybeStep(u.step);
      if (u.selection)
        return a = i ? u.selection.map(i.slice(r)) : u.selection, l = new Te(this.items.slice(0, n).append(c.reverse().concat(h)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: l, transform: o, selection: a };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, n, i) {
    let r = [], o = this.eventCount, a = this.items, l = !i && a.length ? a.get(a.length - 1) : null;
    for (let c = 0; c < e.steps.length; c++) {
      let u = e.steps[c].invert(e.docs[c]), d = new ke(e.mapping.maps[c], u, t), f;
      (f = l && l.merge(d)) && (d = f, c ? r.pop() : a = a.slice(0, a.length - 1)), r.push(d), t && (o++, t = void 0), i || (l = d);
    }
    let h = o - n.depth;
    return h > dm && (a = um(a, h), o -= h), new Te(a.append(r), o);
  }
  remapping(e, t) {
    let n = new un();
    return this.items.forEach((i, r) => {
      let o = i.mirrorOffset != null && r - i.mirrorOffset >= e ? n.maps.length - i.mirrorOffset : void 0;
      n.appendMap(i.map, o);
    }, e, t), n;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Te(this.items.append(e.map((t) => new ke(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let n = [], i = Math.max(0, this.items.length - t), r = e.mapping, o = e.steps.length, a = this.eventCount;
    this.items.forEach((d) => {
      d.selection && a--;
    }, i);
    let l = t;
    this.items.forEach((d) => {
      let f = r.getMirror(--l);
      if (f == null)
        return;
      o = Math.min(o, f);
      let p = r.maps[f];
      if (d.step) {
        let m = e.steps[f].invert(e.docs[f]), g = d.selection && d.selection.map(r.slice(l + 1, f));
        g && a++, n.push(new ke(p, m, g));
      } else
        n.push(new ke(p));
    }, i);
    let h = [];
    for (let d = t; d < o; d++)
      h.push(new ke(r.maps[d]));
    let c = this.items.slice(0, i).append(h).append(n), u = new Te(c, a);
    return u.emptyItemCount() > cm && (u = u.compress(this.items.length - n.length)), u;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), n = t.maps.length, i = [], r = 0;
    return this.items.forEach((o, a) => {
      if (a >= e)
        i.push(o), o.selection && r++;
      else if (o.step) {
        let l = o.step.map(t.slice(n)), h = l && l.getMap();
        if (n--, h && t.appendMap(h, n), l) {
          let c = o.selection && o.selection.map(t.slice(n));
          c && r++;
          let u = new ke(h.invert(), l, c), d, f = i.length - 1;
          (d = i.length && i[f].merge(u)) ? i[f] = d : i.push(u);
        }
      } else o.map && n--;
    }, this.items.length, 0), new Te(G.from(i.reverse()), r);
  }
}
Te.empty = new Te(G.empty, 0);
function um(s, e) {
  let t;
  return s.forEach((n, i) => {
    if (n.selection && e-- == 0)
      return t = i, !1;
  }), s.slice(t);
}
class ke {
  constructor(e, t, n, i) {
    this.map = e, this.step = t, this.selection = n, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new ke(t.getMap().invert(), t, this.selection);
    }
  }
}
class _e {
  constructor(e, t, n, i, r) {
    this.done = e, this.undone = t, this.prevRanges = n, this.prevTime = i, this.prevComposition = r;
  }
}
const dm = 20;
function fm(s, e, t, n) {
  let i = t.getMeta(mt), r;
  if (i)
    return i.historyState;
  t.getMeta(gm) && (s = new _e(s.done, s.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return s;
  if (o && o.getMeta(mt))
    return o.getMeta(mt).redo ? new _e(s.done.addTransform(t, void 0, n, Bn(e)), s.undone, Ko(t.mapping.maps), s.prevTime, s.prevComposition) : new _e(s.done, s.undone.addTransform(t, void 0, n, Bn(e)), null, s.prevTime, s.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let a = t.getMeta("composition"), l = s.prevTime == 0 || !o && s.prevComposition != a && (s.prevTime < (t.time || 0) - n.newGroupDelay || !pm(t, s.prevRanges)), h = o ? ui(s.prevRanges, t.mapping) : Ko(t.mapping.maps);
    return new _e(s.done.addTransform(t, l ? e.selection.getBookmark() : void 0, n, Bn(e)), Te.empty, h, t.time, a ?? s.prevComposition);
  } else return (r = t.getMeta("rebased")) ? new _e(s.done.rebased(t, r), s.undone.rebased(t, r), ui(s.prevRanges, t.mapping), s.prevTime, s.prevComposition) : new _e(s.done.addMaps(t.mapping.maps), s.undone.addMaps(t.mapping.maps), ui(s.prevRanges, t.mapping), s.prevTime, s.prevComposition);
}
function pm(s, e) {
  if (!e)
    return !1;
  if (!s.docChanged)
    return !0;
  let t = !1;
  return s.mapping.maps[0].forEach((n, i) => {
    for (let r = 0; r < e.length; r += 2)
      n <= e[r + 1] && i >= e[r] && (t = !0);
  }), t;
}
function Ko(s) {
  let e = [];
  for (let t = s.length - 1; t >= 0 && e.length == 0; t--)
    s[t].forEach((n, i, r, o) => e.push(r, o));
  return e;
}
function ui(s, e) {
  if (!s)
    return null;
  let t = [];
  for (let n = 0; n < s.length; n += 2) {
    let i = e.map(s[n], 1), r = e.map(s[n + 1], -1);
    i <= r && t.push(i, r);
  }
  return t;
}
function mm(s, e, t) {
  let n = Bn(e), i = mt.get(e).spec.config, r = (t ? s.undone : s.done).popEvent(e, n);
  if (!r)
    return null;
  let o = r.selection.resolve(r.transform.doc), a = (t ? s.done : s.undone).addTransform(r.transform, e.selection.getBookmark(), i, n), l = new _e(t ? a : r.remaining, t ? r.remaining : a, null, 0, -1);
  return r.transform.setSelection(o).setMeta(mt, { redo: t, historyState: l });
}
let di = !1, Go = null;
function Bn(s) {
  let e = s.plugins;
  if (Go != e) {
    di = !1, Go = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        di = !0;
        break;
      }
  }
  return di;
}
const mt = new he("history"), gm = new he("closeHistory");
function ym(s = {}) {
  return s = {
    depth: s.depth || 100,
    newGroupDelay: s.newGroupDelay || 500
  }, new Y({
    key: mt,
    state: {
      init() {
        return new _e(Te.empty, Te.empty, null, 0, -1);
      },
      apply(e, t, n) {
        return fm(t, n, e, s);
      }
    },
    config: s,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let n = t.inputType, i = n == "historyUndo" ? Xl : n == "historyRedo" ? Ql : null;
          return !i || !e.editable ? !1 : (t.preventDefault(), i(e.state, e.dispatch));
        }
      }
    }
  });
}
function Jl(s, e) {
  return (t, n) => {
    let i = mt.getState(t);
    if (!i || (s ? i.undone : i.done).eventCount == 0)
      return !1;
    if (n) {
      let r = mm(i, t, s);
      r && n(e ? r.scrollIntoView() : r);
    }
    return !0;
  };
}
const Xl = Jl(!1, !0), Ql = Jl(!0, !0), bm = ee.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: s, dispatch: e }) => Xl(s, e),
      redo: () => ({ state: s, dispatch: e }) => Ql(s, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      ym(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), xm = le.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["hr", J(this.options.HTMLAttributes, s)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: s, state: e }) => {
        if (!Rp(e, e.schema.nodes[this.name]))
          return !1;
        const { selection: t } = e, { $from: n, $to: i } = t, r = s();
        return n.parentOffset === 0 ? r.insertContentAt({
          from: Math.max(n.pos - 1, 0),
          to: i.pos
        }, {
          type: this.name
        }) : tp(t) ? r.insertContentAt(i.pos, {
          type: this.name
        }) : r.insertContent({ type: this.name }), r.command(({ tr: o, dispatch: a }) => {
          var l;
          if (a) {
            const { $to: h } = o.selection, c = h.end();
            if (h.nodeAfter)
              h.nodeAfter.isTextblock ? o.setSelection(A.create(o.doc, h.pos + 1)) : h.nodeAfter.isBlock ? o.setSelection(T.create(o.doc, h.pos)) : o.setSelection(A.create(o.doc, h.pos));
            else {
              const u = (l = h.parent.type.contentMatch.defaultType) === null || l === void 0 ? void 0 : l.create();
              u && (o.insert(c, u), o.setSelection(A.create(o.doc, c + 1)));
            }
            o.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      Kl({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), Sm = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, vm = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, wm = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, Tm = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, km = Fe.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (s) => s.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (s) => s.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["em", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: s }) => s.setMark(this.name),
      toggleItalic: () => ({ commands: s }) => s.toggleMark(this.name),
      unsetItalic: () => ({ commands: s }) => s.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      $t({
        find: Sm,
        type: this.type
      }),
      $t({
        find: wm,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      St({
        find: vm,
        type: this.type
      }),
      St({
        find: Tm,
        type: this.type
      })
    ];
  }
}), Dm = le.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["li", J(this.options.HTMLAttributes, s), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Em = "listItem", qo = "textStyle", Jo = /^(\d+)\.\s$/, Cm = le.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (s) => s.hasAttribute("start") ? parseInt(s.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (s) => s.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    const { start: e, ...t } = s;
    return e === 1 ? ["ol", J(this.options.HTMLAttributes, t), 0] : ["ol", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: s, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Em, this.editor.getAttributes(qo)).run() : s.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let s = bn({
      find: Jo,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (s = bn({
      find: Jo,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(qo) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      s
    ];
  }
}), Mm = le.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["p", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: s }) => s.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), Am = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, Om = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Im = Fe.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (s) => s.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["s", J(this.options.HTMLAttributes, s), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: s }) => s.setMark(this.name),
      toggleStrike: () => ({ commands: s }) => s.toggleMark(this.name),
      unsetStrike: () => ({ commands: s }) => s.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      $t({
        find: Am,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      St({
        find: Om,
        type: this.type
      })
    ];
  }
}), Nm = le.create({
  name: "text",
  group: "inline"
}), Rm = ee.create({
  name: "starterKit",
  addExtensions() {
    const s = [];
    return this.options.bold !== !1 && s.push(Bp.configure(this.options.bold)), this.options.blockquote !== !1 && s.push(Pp.configure(this.options.blockquote)), this.options.bulletList !== !1 && s.push(_p.configure(this.options.bulletList)), this.options.code !== !1 && s.push(Up.configure(this.options.code)), this.options.codeBlock !== !1 && s.push(Gp.configure(this.options.codeBlock)), this.options.document !== !1 && s.push(qp.configure(this.options.document)), this.options.dropcursor !== !1 && s.push(Qp.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && s.push(om.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && s.push(am.configure(this.options.hardBreak)), this.options.heading !== !1 && s.push(lm.configure(this.options.heading)), this.options.history !== !1 && s.push(bm.configure(this.options.history)), this.options.horizontalRule !== !1 && s.push(xm.configure(this.options.horizontalRule)), this.options.italic !== !1 && s.push(km.configure(this.options.italic)), this.options.listItem !== !1 && s.push(Dm.configure(this.options.listItem)), this.options.orderedList !== !1 && s.push(Cm.configure(this.options.orderedList)), this.options.paragraph !== !1 && s.push(Mm.configure(this.options.paragraph)), this.options.strike !== !1 && s.push(Im.configure(this.options.strike)), this.options.text !== !1 && s.push(Nm.configure(this.options.text)), s;
  }
}), Lm = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Pm = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", _i = "numeric", Wi = "ascii", Yi = "alpha", nn = "asciinumeric", Jt = "alphanumeric", Ui = "domain", Zl = "emoji", Vm = "scheme", $m = "slashscheme", fi = "whitespace";
function Fm(s, e) {
  return s in e || (e[s] = []), e[s];
}
function ct(s, e, t) {
  e[_i] && (e[nn] = !0, e[Jt] = !0), e[Wi] && (e[nn] = !0, e[Yi] = !0), e[nn] && (e[Jt] = !0), e[Yi] && (e[Jt] = !0), e[Jt] && (e[Ui] = !0), e[Zl] && (e[Ui] = !0);
  for (const n in e) {
    const i = Fm(n, t);
    i.indexOf(s) < 0 && i.push(s);
  }
}
function Hm(s, e) {
  const t = {};
  for (const n in e)
    e[n].indexOf(s) >= 0 && (t[n] = !0);
  return t;
}
function ue(s = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = s;
}
ue.groups = {};
ue.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(s) {
    const e = this, t = e.j[s];
    if (t)
      return t;
    for (let n = 0; n < e.jr.length; n++) {
      const i = e.jr[n][0], r = e.jr[n][1];
      if (r && i.test(s))
        return r;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(s, e = !1) {
    return e ? s in this.j : !!this.go(s);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(s, e, t, n) {
    for (let i = 0; i < s.length; i++)
      this.tt(s[i], e, t, n);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(s, e, t, n) {
    n = n || ue.groups;
    let i;
    return e && e.j ? i = e : (i = new ue(e), t && n && ct(e, t, n)), this.jr.push([s, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(s, e, t, n) {
    let i = this;
    const r = s.length;
    if (!r)
      return i;
    for (let o = 0; o < r - 1; o++)
      i = i.tt(s[o]);
    return i.tt(s[r - 1], e, t, n);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(s, e, t, n) {
    n = n || ue.groups;
    const i = this;
    if (e && e.j)
      return i.j[s] = e, e;
    const r = e;
    let o, a = i.go(s);
    if (a ? (o = new ue(), Object.assign(o.j, a.j), o.jr.push.apply(o.jr, a.jr), o.jd = a.jd, o.t = a.t) : o = new ue(), r) {
      if (n)
        if (o.t && typeof o.t == "string") {
          const l = Object.assign(Hm(o.t, n), t);
          ct(r, l, n);
        } else t && ct(r, t, n);
      o.t = r;
    }
    return i.j[s] = o, o;
  }
};
const I = (s, e, t, n, i) => s.ta(e, t, n, i), H = (s, e, t, n, i) => s.tr(e, t, n, i), Xo = (s, e, t, n, i) => s.ts(e, t, n, i), x = (s, e, t, n, i) => s.tt(e, t, n, i), Re = "WORD", ji = "UWORD", eh = "ASCIINUMERICAL", th = "ALPHANUMERICAL", xn = "LOCALHOST", Ki = "TLD", Gi = "UTLD", zn = "SCHEME", Mt = "SLASH_SCHEME", wr = "NUM", qi = "WS", Tr = "NL", sn = "OPENBRACE", rn = "CLOSEBRACE", ns = "OPENBRACKET", ss = "CLOSEBRACKET", is = "OPENPAREN", rs = "CLOSEPAREN", as = "OPENANGLEBRACKET", ls = "CLOSEANGLEBRACKET", hs = "FULLWIDTHLEFTPAREN", cs = "FULLWIDTHRIGHTPAREN", us = "LEFTCORNERBRACKET", ds = "RIGHTCORNERBRACKET", fs = "LEFTWHITECORNERBRACKET", ps = "RIGHTWHITECORNERBRACKET", ms = "FULLWIDTHLESSTHAN", gs = "FULLWIDTHGREATERTHAN", ys = "AMPERSAND", bs = "APOSTROPHE", xs = "ASTERISK", We = "AT", Ss = "BACKSLASH", vs = "BACKTICK", ws = "CARET", Ue = "COLON", kr = "COMMA", Ts = "DOLLAR", De = "DOT", ks = "EQUALS", Dr = "EXCLAMATION", ye = "HYPHEN", on = "PERCENT", Ds = "PIPE", Es = "PLUS", Cs = "POUND", an = "QUERY", Er = "QUOTE", nh = "FULLWIDTHMIDDLEDOT", Cr = "SEMI", Ee = "SLASH", ln = "TILDE", Ms = "UNDERSCORE", sh = "EMOJI", As = "SYM";
var ih = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: th,
  AMPERSAND: ys,
  APOSTROPHE: bs,
  ASCIINUMERICAL: eh,
  ASTERISK: xs,
  AT: We,
  BACKSLASH: Ss,
  BACKTICK: vs,
  CARET: ws,
  CLOSEANGLEBRACKET: ls,
  CLOSEBRACE: rn,
  CLOSEBRACKET: ss,
  CLOSEPAREN: rs,
  COLON: Ue,
  COMMA: kr,
  DOLLAR: Ts,
  DOT: De,
  EMOJI: sh,
  EQUALS: ks,
  EXCLAMATION: Dr,
  FULLWIDTHGREATERTHAN: gs,
  FULLWIDTHLEFTPAREN: hs,
  FULLWIDTHLESSTHAN: ms,
  FULLWIDTHMIDDLEDOT: nh,
  FULLWIDTHRIGHTPAREN: cs,
  HYPHEN: ye,
  LEFTCORNERBRACKET: us,
  LEFTWHITECORNERBRACKET: fs,
  LOCALHOST: xn,
  NL: Tr,
  NUM: wr,
  OPENANGLEBRACKET: as,
  OPENBRACE: sn,
  OPENBRACKET: ns,
  OPENPAREN: is,
  PERCENT: on,
  PIPE: Ds,
  PLUS: Es,
  POUND: Cs,
  QUERY: an,
  QUOTE: Er,
  RIGHTCORNERBRACKET: ds,
  RIGHTWHITECORNERBRACKET: ps,
  SCHEME: zn,
  SEMI: Cr,
  SLASH: Ee,
  SLASH_SCHEME: Mt,
  SYM: As,
  TILDE: ln,
  TLD: Ki,
  UNDERSCORE: Ms,
  UTLD: Gi,
  UWORD: ji,
  WORD: Re,
  WS: qi
});
const Ie = /[a-z]/, Wt = new RegExp("\\p{L}", "u"), pi = new RegExp("\\p{Emoji}", "u"), Ne = /\d/, mi = /\s/, Qo = "\r", gi = `
`, Bm = "️", zm = "‍", yi = "￼";
let Ln = null, Pn = null;
function _m(s = []) {
  const e = {};
  ue.groups = e;
  const t = new ue();
  Ln == null && (Ln = Zo(Lm)), Pn == null && (Pn = Zo(Pm)), x(t, "'", bs), x(t, "{", sn), x(t, "}", rn), x(t, "[", ns), x(t, "]", ss), x(t, "(", is), x(t, ")", rs), x(t, "<", as), x(t, ">", ls), x(t, "（", hs), x(t, "）", cs), x(t, "「", us), x(t, "」", ds), x(t, "『", fs), x(t, "』", ps), x(t, "＜", ms), x(t, "＞", gs), x(t, "&", ys), x(t, "*", xs), x(t, "@", We), x(t, "`", vs), x(t, "^", ws), x(t, ":", Ue), x(t, ",", kr), x(t, "$", Ts), x(t, ".", De), x(t, "=", ks), x(t, "!", Dr), x(t, "-", ye), x(t, "%", on), x(t, "|", Ds), x(t, "+", Es), x(t, "#", Cs), x(t, "?", an), x(t, '"', Er), x(t, "/", Ee), x(t, ";", Cr), x(t, "~", ln), x(t, "_", Ms), x(t, "\\", Ss), x(t, "・", nh);
  const n = H(t, Ne, wr, {
    [_i]: !0
  });
  H(n, Ne, n);
  const i = H(n, Ie, eh, {
    [nn]: !0
  }), r = H(n, Wt, th, {
    [Jt]: !0
  }), o = H(t, Ie, Re, {
    [Wi]: !0
  });
  H(o, Ne, i), H(o, Ie, o), H(i, Ne, i), H(i, Ie, i);
  const a = H(t, Wt, ji, {
    [Yi]: !0
  });
  H(a, Ie), H(a, Ne, r), H(a, Wt, a), H(r, Ne, r), H(r, Ie), H(r, Wt, r);
  const l = x(t, gi, Tr, {
    [fi]: !0
  }), h = x(t, Qo, qi, {
    [fi]: !0
  }), c = H(t, mi, qi, {
    [fi]: !0
  });
  x(t, yi, c), x(h, gi, l), x(h, yi, c), H(h, mi, c), x(c, Qo), x(c, gi), H(c, mi, c), x(c, yi, c);
  const u = H(t, pi, sh, {
    [Zl]: !0
  });
  x(u, "#"), H(u, pi, u), x(u, Bm, u);
  const d = x(u, zm);
  x(d, "#"), H(d, pi, u);
  const f = [[Ie, o], [Ne, i]], p = [[Ie, null], [Wt, a], [Ne, r]];
  for (let m = 0; m < Ln.length; m++)
    He(t, Ln[m], Ki, Re, f);
  for (let m = 0; m < Pn.length; m++)
    He(t, Pn[m], Gi, ji, p);
  ct(Ki, {
    tld: !0,
    ascii: !0
  }, e), ct(Gi, {
    utld: !0,
    alpha: !0
  }, e), He(t, "file", zn, Re, f), He(t, "mailto", zn, Re, f), He(t, "http", Mt, Re, f), He(t, "https", Mt, Re, f), He(t, "ftp", Mt, Re, f), He(t, "ftps", Mt, Re, f), ct(zn, {
    scheme: !0,
    ascii: !0
  }, e), ct(Mt, {
    slashscheme: !0,
    ascii: !0
  }, e), s = s.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < s.length; m++) {
    const g = s[m][0], v = s[m][1] ? {
      [Vm]: !0
    } : {
      [$m]: !0
    };
    g.indexOf("-") >= 0 ? v[Ui] = !0 : Ie.test(g) ? Ne.test(g) ? v[nn] = !0 : v[Wi] = !0 : v[_i] = !0, Xo(t, g, g, v);
  }
  return Xo(t, "localhost", xn, {
    ascii: !0
  }), t.jd = new ue(As), {
    start: t,
    tokens: Object.assign({
      groups: e
    }, ih)
  };
}
function rh(s, e) {
  const t = Wm(e.replace(/[A-Z]/g, (a) => a.toLowerCase())), n = t.length, i = [];
  let r = 0, o = 0;
  for (; o < n; ) {
    let a = s, l = null, h = 0, c = null, u = -1, d = -1;
    for (; o < n && (l = a.go(t[o])); )
      a = l, a.accepts() ? (u = 0, d = 0, c = a) : u >= 0 && (u += t[o].length, d++), h += t[o].length, r += t[o].length, o++;
    r -= u, o -= d, h -= u, i.push({
      t: c.t,
      // token type/name
      v: e.slice(r - h, r),
      // string value
      s: r - h,
      // start index
      e: r
      // end index (excluding)
    });
  }
  return i;
}
function Wm(s) {
  const e = [], t = s.length;
  let n = 0;
  for (; n < t; ) {
    let i = s.charCodeAt(n), r, o = i < 55296 || i > 56319 || n + 1 === t || (r = s.charCodeAt(n + 1)) < 56320 || r > 57343 ? s[n] : s.slice(n, n + 2);
    e.push(o), n += o.length;
  }
  return e;
}
function He(s, e, t, n, i) {
  let r;
  const o = e.length;
  for (let a = 0; a < o - 1; a++) {
    const l = e[a];
    s.j[l] ? r = s.j[l] : (r = new ue(n), r.jr = i.slice(), s.j[l] = r), s = r;
  }
  return r = new ue(t), r.jr = i.slice(), s.j[e[o - 1]] = r, r;
}
function Zo(s) {
  const e = [], t = [];
  let n = 0, i = "0123456789";
  for (; n < s.length; ) {
    let r = 0;
    for (; i.indexOf(s[n + r]) >= 0; )
      r++;
    if (r > 0) {
      e.push(t.join(""));
      for (let o = parseInt(s.substring(n, n + r), 10); o > 0; o--)
        t.pop();
      n += r;
    } else
      t.push(s[n]), n++;
  }
  return e;
}
const Sn = {
  defaultProtocol: "http",
  events: null,
  format: ea,
  formatHref: ea,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Mr(s, e = null) {
  let t = Object.assign({}, Sn);
  s && (t = Object.assign(t, s instanceof Mr ? s.o : s));
  const n = t.ignoreTags, i = [];
  for (let r = 0; r < n.length; r++)
    i.push(n[r].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
Mr.prototype = {
  o: Sn,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(s) {
    return s;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(s) {
    return this.get("validate", s.toString(), s);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(s, e, t) {
    const n = e != null;
    let i = this.o[s];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Sn[s], typeof i == "function" && n && (i = i(e, t))) : typeof i == "function" && n && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(s, e, t) {
    let n = this.o[s];
    return typeof n == "function" && e != null && (n = n(e, t.t, t)), n;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(s) {
    const e = s.render(this);
    return (this.get("render", null, s) || this.defaultRender)(e, s.t, s);
  }
};
function ea(s) {
  return s;
}
function oh(s, e) {
  this.t = "token", this.v = s, this.tk = e;
}
oh.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(s) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(s) {
    const e = this.toString(), t = s.get("truncate", e, this), n = s.get("format", e, this);
    return t && n.length > t ? n.substring(0, t) + "…" : n;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(s) {
    return s.get("formatHref", this.toHref(s.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(s = Sn.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(s),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(s) {
    return {
      type: this.t,
      value: this.toFormattedString(s),
      isLink: this.isLink,
      href: this.toFormattedHref(s),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(s) {
    return s.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(s) {
    const e = this, t = this.toHref(s.get("defaultProtocol")), n = s.get("formatHref", t, this), i = s.get("tagName", t, e), r = this.toFormattedString(s), o = {}, a = s.get("className", t, e), l = s.get("target", t, e), h = s.get("rel", t, e), c = s.getObj("attributes", t, e), u = s.getObj("events", t, e);
    return o.href = n, a && (o.class = a), l && (o.target = l), h && (o.rel = h), c && Object.assign(o, c), {
      tagName: i,
      attributes: o,
      content: r,
      eventListeners: u
    };
  }
};
function Ys(s, e) {
  class t extends oh {
    constructor(i, r) {
      super(i, r), this.t = s;
    }
  }
  for (const n in e)
    t.prototype[n] = e[n];
  return t.t = s, t;
}
const ta = Ys("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), na = Ys("text"), Ym = Ys("nl"), Vn = Ys("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(s = Sn.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${s}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const s = this.tk;
    return s.length >= 2 && s[0].t !== xn && s[1].t === Ue;
  }
}), ge = (s) => new ue(s);
function Um({
  groups: s
}) {
  const e = s.domain.concat([ys, xs, We, Ss, vs, ws, Ts, ks, ye, wr, on, Ds, Es, Cs, Ee, As, ln, Ms]), t = [bs, Ue, kr, De, Dr, on, an, Er, Cr, as, ls, sn, rn, ss, ns, is, rs, hs, cs, us, ds, fs, ps, ms, gs], n = [ys, bs, xs, Ss, vs, ws, Ts, ks, ye, sn, rn, on, Ds, Es, Cs, an, Ee, As, ln, Ms], i = ge(), r = x(i, ln);
  I(r, n, r), I(r, s.domain, r);
  const o = ge(), a = ge(), l = ge();
  I(i, s.domain, o), I(i, s.scheme, a), I(i, s.slashscheme, l), I(o, n, r), I(o, s.domain, o);
  const h = x(o, We);
  x(r, We, h), x(a, We, h), x(l, We, h);
  const c = x(r, De);
  I(c, n, r), I(c, s.domain, r);
  const u = ge();
  I(h, s.domain, u), I(u, s.domain, u);
  const d = x(u, De);
  I(d, s.domain, u);
  const f = ge(ta);
  I(d, s.tld, f), I(d, s.utld, f), x(h, xn, f);
  const p = x(u, ye);
  x(p, ye, p), I(p, s.domain, u), I(f, s.domain, u), x(f, De, d), x(f, ye, p);
  const m = x(f, Ue);
  I(m, s.numeric, ta);
  const g = x(o, ye), y = x(o, De);
  x(g, ye, g), I(g, s.domain, o), I(y, n, r), I(y, s.domain, o);
  const v = ge(Vn);
  I(y, s.tld, v), I(y, s.utld, v), I(v, s.domain, o), I(v, n, r), x(v, De, y), x(v, ye, g), x(v, We, h);
  const E = x(v, Ue), P = ge(Vn);
  I(E, s.numeric, P);
  const O = ge(Vn), $ = ge();
  I(O, e, O), I(O, t, $), I($, e, O), I($, t, $), x(v, Ee, O), x(P, Ee, O);
  const D = x(a, Ue), L = x(l, Ue), U = x(L, Ee), Ht = x(U, Ee);
  I(a, s.domain, o), x(a, De, y), x(a, ye, g), I(l, s.domain, o), x(l, De, y), x(l, ye, g), I(D, s.domain, O), x(D, Ee, O), x(D, an, O), I(Ht, s.domain, O), I(Ht, e, O), x(Ht, Ee, O);
  const Nr = [
    [sn, rn],
    // {}
    [ns, ss],
    // []
    [is, rs],
    // ()
    [as, ls],
    // <>
    [hs, cs],
    // （）
    [us, ds],
    // 「」
    [fs, ps],
    // 『』
    [ms, gs]
    // ＜＞
  ];
  for (let Us = 0; Us < Nr.length; Us++) {
    const [Rr, js] = Nr[Us], kn = x(O, Rr);
    x($, Rr, kn), x(kn, js, O);
    const wt = ge(Vn);
    I(kn, e, wt);
    const Bt = ge();
    I(kn, t), I(wt, e, wt), I(wt, t, Bt), I(Bt, e, wt), I(Bt, t, Bt), x(wt, js, O), x(Bt, js, O);
  }
  return x(i, xn, v), x(i, Tr, Ym), {
    start: i,
    tokens: ih
  };
}
function jm(s, e, t) {
  let n = t.length, i = 0, r = [], o = [];
  for (; i < n; ) {
    let a = s, l = null, h = null, c = 0, u = null, d = -1;
    for (; i < n && !(l = a.go(t[i].t)); )
      o.push(t[i++]);
    for (; i < n && (h = l || a.go(t[i].t)); )
      l = null, a = h, a.accepts() ? (d = 0, u = a) : d >= 0 && d++, i++, c++;
    if (d < 0)
      i -= c, i < n && (o.push(t[i]), i++);
    else {
      o.length > 0 && (r.push(bi(na, e, o)), o = []), i -= d, c -= d;
      const f = u.t, p = t.slice(i - c, i);
      r.push(bi(f, e, p));
    }
  }
  return o.length > 0 && r.push(bi(na, e, o)), r;
}
function bi(s, e, t) {
  const n = t[0].s, i = t[t.length - 1].e, r = e.slice(n, i);
  return new s(r, t);
}
const Km = typeof console < "u" && console && console.warn || (() => {
}), Gm = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", F = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function qm() {
  return ue.groups = {}, F.scanner = null, F.parser = null, F.tokenQueue = [], F.pluginQueue = [], F.customSchemes = [], F.initialized = !1, F;
}
function sa(s, e = !1) {
  if (F.initialized && Km(`linkifyjs: already initialized - will not register custom scheme "${s}" ${Gm}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(s))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  F.customSchemes.push([s, e]);
}
function Jm() {
  F.scanner = _m(F.customSchemes);
  for (let s = 0; s < F.tokenQueue.length; s++)
    F.tokenQueue[s][1]({
      scanner: F.scanner
    });
  F.parser = Um(F.scanner.tokens);
  for (let s = 0; s < F.pluginQueue.length; s++)
    F.pluginQueue[s][1]({
      scanner: F.scanner,
      parser: F.parser
    });
  return F.initialized = !0, F;
}
function Ar(s) {
  return F.initialized || Jm(), jm(F.parser.start, s, rh(F.scanner.start, s));
}
Ar.scan = rh;
function ah(s, e = null, t = null) {
  if (e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const n = new Mr(t), i = Ar(s), r = [];
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    a.isLink && (!e || a.t === e) && n.check(a) && r.push(a.toFormattedObject(n));
  }
  return r;
}
const Or = "[\0-   ᠎ -\u2029 　]", Xm = new RegExp(Or), Qm = new RegExp(`${Or}$`), Zm = new RegExp(Or, "g");
function eg(s) {
  return s.length === 1 ? s[0].isLink : s.length === 3 && s[1].isLink ? ["()", "[]"].includes(s[0].value + s[2].value) : !1;
}
function tg(s) {
  return new Y({
    key: new he("autolink"),
    appendTransaction: (e, t, n) => {
      const i = e.some((h) => h.docChanged) && !t.doc.eq(n.doc), r = e.some((h) => h.getMeta("preventAutolink"));
      if (!i || r)
        return;
      const { tr: o } = n, a = Uf(t.doc, [...e]);
      if (Zf(a).forEach(({ newRange: h }) => {
        const c = Kf(n.doc, h, (f) => f.isTextblock);
        let u, d;
        if (c.length > 1)
          u = c[0], d = n.doc.textBetween(u.pos, u.pos + u.node.nodeSize, void 0, " ");
        else if (c.length) {
          const f = n.doc.textBetween(h.from, h.to, " ", " ");
          if (!Qm.test(f))
            return;
          u = c[0], d = n.doc.textBetween(u.pos, h.to, void 0, " ");
        }
        if (u && d) {
          const f = d.split(Xm).filter(Boolean);
          if (f.length <= 0)
            return !1;
          const p = f[f.length - 1], m = u.pos + d.lastIndexOf(p);
          if (!p)
            return !1;
          const g = Ar(p).map((y) => y.toObject(s.defaultProtocol));
          if (!eg(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => n.schema.marks.code ? !n.doc.rangeHasMark(y.from, y.to, n.schema.marks.code) : !0).filter((y) => s.validate(y.value)).filter((y) => s.shouldAutoLink(y.value)).forEach((y) => {
            Sr(y.from, y.to, n.doc).some((v) => v.mark.type === s.type) || o.addMark(y.from, y.to, s.type.create({
              href: y.href
            }));
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function ng(s) {
  return new Y({
    key: new he("handleClickLink"),
    props: {
      handleClick: (e, t, n) => {
        var i, r;
        if (n.button !== 0 || !e.editable)
          return !1;
        let o = n.target;
        const a = [];
        for (; o.nodeName !== "DIV"; )
          a.push(o), o = o.parentNode;
        if (!a.find((d) => d.nodeName === "A"))
          return !1;
        const l = jl(e.state, s.type.name), h = n.target, c = (i = h?.href) !== null && i !== void 0 ? i : l.href, u = (r = h?.target) !== null && r !== void 0 ? r : l.target;
        return h && c ? (window.open(c, u), !0) : !1;
      }
    }
  });
}
function sg(s) {
  return new Y({
    key: new he("handlePasteLink"),
    props: {
      handlePaste: (e, t, n) => {
        const { state: i } = e, { selection: r } = i, { empty: o } = r;
        if (o)
          return !1;
        let a = "";
        n.content.forEach((h) => {
          a += h.textContent;
        });
        const l = ah(a, { defaultProtocol: s.defaultProtocol }).find((h) => h.isLink && h.value === a);
        return !a || !l ? !1 : s.editor.commands.setMark(s.type, {
          href: l.href
        });
      }
    }
  });
}
function it(s, e) {
  const t = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  return e && e.forEach((n) => {
    const i = typeof n == "string" ? n : n.scheme;
    i && t.push(i);
  }), !s || s.replace(Zm, "").match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `^(?:(?:${t.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
    "i"
  ));
}
const ig = Fe.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((s) => {
      if (typeof s == "string") {
        sa(s);
        return;
      }
      sa(s.scheme, s.optionalSlashes);
    });
  },
  onDestroy() {
    qm();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (s, e) => !!it(s, e.protocols),
      validate: (s) => !!s,
      shouldAutoLink: (s) => !!s
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(s) {
          return s.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (s) => {
          const e = s.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (t) => !!it(t, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return this.options.isAllowedUri(s.href, {
      defaultValidate: (e) => !!it(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", J(this.options.HTMLAttributes, s), 0] : [
      "a",
      J(this.options.HTMLAttributes, { ...s, href: "" }),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (s) => ({ chain: e }) => {
        const { href: t } = s;
        return this.options.isAllowedUri(t, {
          defaultValidate: (n) => !!it(n, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, s).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (s) => ({ chain: e }) => {
        const { href: t } = s;
        return this.options.isAllowedUri(t, {
          defaultValidate: (n) => !!it(n, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().toggleMark(this.name, s, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run() : !1;
      },
      unsetLink: () => ({ chain: s }) => s().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      St({
        find: (s) => {
          const e = [];
          if (s) {
            const { protocols: t, defaultProtocol: n } = this.options, i = ah(s).filter((r) => r.isLink && this.options.isAllowedUri(r.value, {
              defaultValidate: (o) => !!it(o, t),
              protocols: t,
              defaultProtocol: n
            }));
            i.length && i.forEach((r) => e.push({
              text: r.value,
              data: {
                href: r.href
              },
              index: r.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (s) => {
          var e;
          return {
            href: (e = s.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const s = [], { protocols: e, defaultProtocol: t } = this.options;
    return this.options.autolink && s.push(tg({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: (n) => this.options.isAllowedUri(n, {
        defaultValidate: (i) => !!it(i, e),
        protocols: e,
        defaultProtocol: t
      }),
      shouldAutoLink: this.options.shouldAutoLink
    })), this.options.openOnClick === !0 && s.push(ng({
      type: this.type
    })), this.options.linkOnPaste && s.push(sg({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type
    })), s;
  }
}), rg = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, og = le.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: s }) {
    return ["img", J(this.options.HTMLAttributes, s)];
  },
  addCommands() {
    return {
      setImage: (s) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: s
      })
    };
  },
  addInputRules() {
    return [
      Kl({
        find: rg,
        type: this.type,
        getAttributes: (s) => {
          const [, , e, t, n] = s;
          return { src: t, alt: e, title: n };
        }
      })
    ];
  }
}), ag = ee.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new Y({
        key: new he("placeholder"),
        props: {
          decorations: ({ doc: s, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: n } = e, i = [];
            if (!t)
              return null;
            const r = this.editor.isEmpty;
            return s.descendants((o, a) => {
              const l = n >= a && n <= a + o.nodeSize, h = !o.isLeaf && Ws(o);
              if ((l || !this.options.showOnlyCurrent) && h) {
                const c = [this.options.emptyNodeClass];
                r && c.push(this.options.emptyEditorClass);
                const u = pe.node(a, a + o.nodeSize, {
                  class: c.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: a,
                    hasAnchor: l
                  }) : this.options.placeholder
                });
                i.push(u);
              }
              return this.options.includeChildren;
            }), z.create(s, i);
          }
        }
      })
    ];
  }
}), lg = ee.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize",
      textCounter: (s) => s.length,
      wordCounter: (s) => s.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (s) => {
      const e = s?.node || this.editor.state.doc;
      if ((s?.mode || this.options.mode) === "textSize") {
        const n = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(n);
      }
      return e.nodeSize;
    }, this.storage.words = (s) => {
      const e = s?.node || this.editor.state.doc, t = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(t);
    };
  },
  addProseMirrorPlugins() {
    let s = !1;
    return [
      new Y({
        key: new he("characterCount"),
        appendTransaction: (e, t, n) => {
          if (s)
            return;
          const i = this.options.limit;
          if (i == null || i === 0) {
            s = !0;
            return;
          }
          const r = this.storage.characters({ node: n.doc });
          if (r > i) {
            const o = r - i, a = 0, l = o;
            console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
            const h = n.tr.deleteRange(a, l);
            return s = !0, h;
          }
          s = !0;
        },
        filterTransaction: (e, t) => {
          const n = this.options.limit;
          if (!e.docChanged || n === 0 || n === null || n === void 0)
            return !0;
          const i = this.storage.characters({ node: t.doc }), r = this.storage.characters({ node: e.doc });
          if (r <= n || i > n && r > n && r <= i)
            return !0;
          if (i > n && r > n && r > i || !e.getMeta("paste"))
            return !1;
          const a = e.selection.$head.pos, l = r - n, h = a - l, c = a;
          return e.deleteRange(h, c), !(this.storage.characters({ node: e.doc }) > n);
        }
      })
    ];
  }
});
function hg(s = {}) {
  let e;
  return {
    content: s.content || "",
    format: s.format || "html",
    characterCount: 0,
    wordCount: 0,
    updatedAt: Date.now(),
    init() {
      this.$nextTick(() => {
        this.initEditor();
      });
    },
    initEditor() {
      const t = [
        Rm.configure({
          heading: {
            levels: [1, 2, 3]
          }
        }),
        ig.configure({
          openOnClick: !1,
          HTMLAttributes: {
            class: "text-primary hover:underline"
          }
        }),
        og.configure({
          HTMLAttributes: {
            class: "max-w-full h-auto rounded-md"
          }
        }),
        lg
      ];
      s.placeholder && t.push(
        ag.configure({
          placeholder: s.placeholder
        })
      ), e = new Np({
        element: this.$refs.editorElement,
        extensions: t,
        content: this.getInitialContent(),
        editable: s.editable ?? !0,
        onUpdate: ({ editor: n }) => {
          this.updatedAt = Date.now(), this.updateContent(n), this.updateCounts(n);
        },
        onCreate: ({ editor: n }) => {
          this.updatedAt = Date.now(), this.updateCounts(n);
        },
        onSelectionUpdate: () => {
          this.updatedAt = Date.now();
        }
      }), this.$watch("content", (n) => {
        if (!e) return;
        const i = this.format === "json" ? JSON.stringify(e.getJSON()) : e.getHTML();
        n !== i && this.setEditorContent(n);
      });
    },
    getInitialContent() {
      if (!this.content) return "";
      if (this.format === "json")
        try {
          return JSON.parse(this.content);
        } catch {
          return "";
        }
      return this.content;
    },
    setEditorContent(t) {
      if (e) {
        if (!t) {
          e.commands.setContent("", !1);
          return;
        }
        if (this.format === "json")
          try {
            const n = typeof t == "string" ? JSON.parse(t) : t;
            e.commands.setContent(n, !1);
          } catch (n) {
            console.error("Invalid JSON content:", n);
          }
        else
          e.commands.setContent(t, !1);
      }
    },
    updateContent(t) {
      this.content = this.format === "json" ? JSON.stringify(t.getJSON()) : t.getHTML();
    },
    updateCounts(t) {
      const n = t.storage.characterCount;
      this.characterCount = n.characters(), this.wordCount = n.words();
    },
    // Toolbar command methods
    toggleBold() {
      e && e.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      e && e.chain().focus().toggleItalic().run();
    },
    toggleStrike() {
      e && e.chain().focus().toggleStrike().run();
    },
    toggleCode() {
      e && e.chain().focus().toggleCode().run();
    },
    toggleHeading(t) {
      e && e.chain().focus().toggleHeading({ level: t }).run();
    },
    toggleBulletList() {
      e && e.chain().focus().toggleBulletList().run();
    },
    toggleOrderedList() {
      e && e.chain().focus().toggleOrderedList().run();
    },
    toggleBlockquote() {
      e && e.chain().focus().toggleBlockquote().run();
    },
    toggleCodeBlock() {
      e && e.chain().focus().toggleCodeBlock().run();
    },
    setLink() {
      if (!e) return;
      const t = e.getAttributes("link").href, n = window.prompt("Enter URL:", t);
      if (n !== null) {
        if (n === "") {
          e.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        e.chain().focus().extendMarkRange("link").setLink({ href: n }).run();
      }
    },
    addImage() {
      if (!e) return;
      const t = window.prompt("Enter image URL:");
      t && e.chain().focus().setImage({ src: t }).run();
    },
    undo() {
      e && e.chain().focus().undo().run();
    },
    redo() {
      e && e.chain().focus().redo().run();
    },
    // State checks for active toolbar buttons
    isActive(t, n = {}) {
      return e ? (this.updatedAt, e.isActive(t, n)) : !1;
    },
    canUndo() {
      return e ? (this.updatedAt, e.can().undo()) : !1;
    },
    canRedo() {
      return e ? (this.updatedAt, e.can().redo()) : !1;
    },
    destroy() {
      e && e.destroy();
    }
  };
}
function cg(s = {}) {
  return {
    selectable: s.selectable || !1,
    selectMode: s.selectMode || "multiple",
    selectedRows: s.selectedRows || [],
    name: s.name || null,
    // Sort state - can be controlled via wire:model
    sortColumn: s.sortColumn || null,
    sortDirection: s.sortDirection || null,
    // Keyboard navigation
    highlightedRowIndex: -1,
    // Internal cleanup tracking
    _watchers: [],
    init() {
      const e = this.$watch("selectedRows", (t, n) => {
        this.$dispatch(k.TABLE_SELECTION_CHANGED, M({
          id: this.$id("table"),
          name: this.name,
          value: t,
          previousValue: n
        }));
      });
      this._watchers.push(e);
    },
    destroy() {
      this._watchers.forEach((e) => {
        typeof e == "function" && e();
      }), this._watchers = [];
    },
    // Keyboard navigation methods
    handleKeydown(e) {
      if (!this.selectable) return;
      const t = this.getAllRowValues();
      if (t.length !== 0)
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault(), this.highlightNext(t);
            break;
          case "ArrowUp":
            e.preventDefault(), this.highlightPrev(t);
            break;
          case " ":
          case "Enter":
            this.highlightedRowIndex >= 0 && this.highlightedRowIndex < t.length && (e.preventDefault(), this.toggleRow(t[this.highlightedRowIndex]));
            break;
          case "Escape":
            this.highlightedRowIndex = -1, this.updateRowFocus();
            break;
        }
    },
    highlightNext(e) {
      this.highlightedRowIndex < e.length - 1 ? this.highlightedRowIndex++ : this.highlightedRowIndex = 0, this.updateRowFocus();
    },
    highlightPrev(e) {
      this.highlightedRowIndex > 0 ? this.highlightedRowIndex-- : this.highlightedRowIndex = e.length - 1, this.updateRowFocus();
    },
    updateRowFocus() {
      if (!this.$refs.tbody) return;
      this.$refs.tbody.querySelectorAll("[data-spire-table-row-value]").forEach((t, n) => {
        t.tabIndex = n === this.highlightedRowIndex ? 0 : -1, n === this.highlightedRowIndex && t.focus();
      });
    },
    isRowSelected(e) {
      return Array.isArray(this.selectedRows) ? this.selectedRows.includes(e) : this.selectedRows === e;
    },
    toggleRow(e) {
      this.selectMode === "single" ? this.selectedRows = this.isRowSelected(e) ? [] : [e] : this.selectedRows.indexOf(e) > -1 ? this.selectedRows = this.selectedRows.filter((n) => n !== e) : this.selectedRows = [...this.selectedRows, e];
    },
    toggleSelectAll(e) {
      const t = this.getAllRowValues();
      e.target.checked ? this.selectedRows = [...t] : this.selectedRows = [];
    },
    getAllRowValues() {
      if (!this.$refs.tbody)
        return [];
      const e = this.$refs.tbody.querySelectorAll('[data-spire-table-row-value]:not([aria-disabled="true"])');
      return Array.from(e).map((t) => t.getAttribute("data-spire-table-row-value"));
    },
    get allSelected() {
      const e = this.getAllRowValues();
      return e.length > 0 && e.every((t) => this.isRowSelected(t));
    },
    get someSelected() {
      const e = this.getAllRowValues(), t = e.filter((n) => this.isRowSelected(n)).length;
      return t > 0 && t < e.length;
    },
    get selectedCount() {
      return Array.isArray(this.selectedRows) ? this.selectedRows.length : this.selectedRows ? 1 : 0;
    },
    toggleSort(e) {
      const t = {
        column: this.sortColumn,
        direction: this.sortDirection
      };
      this.sortColumn === e ? this.sortDirection === "asc" ? this.sortDirection = "desc" : this.sortDirection === "desc" ? (this.sortColumn = null, this.sortDirection = null) : this.sortDirection = "asc" : (this.sortColumn = e, this.sortDirection = "asc"), this.$dispatch(k.TABLE_SORT_CHANGED, M({
        id: this.$id("table"),
        name: this.name,
        value: {
          column: this.sortColumn,
          direction: this.sortDirection
        },
        previousValue: t
      }));
    },
    // Reset keyboard highlight when selection changes externally
    resetHighlight() {
      this.highlightedRowIndex = -1;
    }
  };
}
function ug(s = {}) {
  return {
    mode: s.mode || zt.MODE,
    min: s.min ?? zt.MIN,
    max: s.max ?? zt.MAX,
    step: s.step ?? zt.STEP,
    disabled: s.disabled || !1,
    readonly: s.readonly || !1,
    showTooltip: s.showTooltip ?? zt.SHOW_TOOLTIP,
    marks: s.marks || [],
    showSteps: s.showSteps || !1,
    name: s.name || null,
    minLabel: s.minLabel || "Minimum value",
    maxLabel: s.maxLabel || "Maximum value",
    valueLabel: s.valueLabel || "Value",
    value: s.value ?? null,
    displayValue: null,
    isDragging: !1,
    activeThumb: null,
    tooltipVisible: !1,
    tooltipValue: "",
    tooltipPosition: { x: 0, y: 0 },
    cleanup: null,
    isInternalUpdate: !1,
    init() {
      this.value === null && (this.value = this.mode === "range" ? { start: this.min, end: this.max } : this.min), this.isInternalUpdate = !0, this.normalizeValue(), this.isInternalUpdate = !1, this.$watch("value", () => {
        !this.isInternalUpdate && !this.isDragging && this.normalizeValue();
      }), this.setupGlobalListeners();
    },
    destroy() {
      this.cleanup && this.cleanup();
    },
    getCurrentValue() {
      return this.displayValue !== null ? this.displayValue : this.value;
    },
    setupGlobalListeners() {
      const e = (r) => this.handleMouseMove(r), t = () => this.handleMouseUp(), n = (r) => this.handleTouchMove(r), i = () => this.handleTouchEnd();
      document.addEventListener("mousemove", e), document.addEventListener("mouseup", t), document.addEventListener("touchmove", n, { passive: !1 }), document.addEventListener("touchend", i), this.cleanup = () => {
        document.removeEventListener("mousemove", e), document.removeEventListener("mouseup", t), document.removeEventListener("touchmove", n), document.removeEventListener("touchend", i);
      };
    },
    normalizeValue() {
      this.mode === "range" ? ((!this.value || typeof this.value != "object") && (this.value = { start: this.min, end: this.max }), this.value = {
        start: this.clampValue(this.value.start ?? this.min),
        end: this.clampValue(this.value.end ?? this.max)
      }, this.value.start > this.value.end && ([this.value.start, this.value.end] = [this.value.end, this.value.start])) : (typeof this.value == "object" && (this.value = this.min), this.value = this.clampValue(this.value ?? this.min));
    },
    clampValue(e) {
      const t = Number(e);
      if (isNaN(t)) return this.min;
      const n = Math.max(this.min, Math.min(this.max, t)), i = Math.round((n - this.min) / this.step);
      return this.min + i * this.step;
    },
    handleTrackClick(e) {
      if (this.disabled || this.readonly) return;
      e.preventDefault && e.preventDefault();
      const t = this.value, n = this.calculateValueFromEvent(e);
      if (this.mode === "range") {
        const i = Math.abs(n - this.value.start), r = Math.abs(n - this.value.end);
        this.activeThumb = i <= r ? "start" : "end", this.value[this.activeThumb] = n;
      } else
        this.value = n;
      this.$dispatch(k.SLIDER_CHANGED, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value,
        previousValue: t
      }));
    },
    handleTouchStart(e) {
      this.disabled || this.readonly || (e.preventDefault(), this.handleTrackClick(e.touches[0]));
    },
    startDrag(e, t) {
      this.disabled || this.readonly || (t.preventDefault(), t.stopPropagation(), this.isDragging = !0, this.activeThumb = e, this.showTooltip && this.showTooltipAt(t), t.currentTarget.focus());
    },
    handleMouseMove(e) {
      if (!this.isDragging || this.disabled || this.readonly) return;
      e.preventDefault();
      const t = this.calculateValueFromEvent(e);
      this.updateValue(t), this.showTooltip && this.updateTooltipPosition(e);
    },
    handleMouseUp() {
      this.isDragging && (this.displayValue !== null && (this.isInternalUpdate = !0, this.value = this.mode === "range" ? { ...this.displayValue } : this.displayValue, this.displayValue = null, this.$nextTick(() => {
        this.isInternalUpdate = !1;
      })), this.isDragging = !1, this.activeThumb = null, this.tooltipVisible = !1, this.$dispatch(k.SLIDER_CHANGE_END, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value
      })));
    },
    handleTouchMove(e) {
      if (!this.isDragging || this.disabled || this.readonly) return;
      e.preventDefault();
      const t = e.touches[0], n = this.calculateValueFromEvent(t);
      this.updateValue(n), this.showTooltip && this.updateTooltipPosition(t);
    },
    handleTouchEnd() {
      this.handleMouseUp();
    },
    updateValue(e) {
      this.displayValue === null && (this.displayValue = this.mode === "range" ? { ...this.value } : this.value), this.mode === "range" ? (this.displayValue[this.activeThumb] = e, this.activeThumb === "start" && this.displayValue.start > this.displayValue.end ? this.displayValue.start = this.displayValue.end : this.activeThumb === "end" && this.displayValue.end < this.displayValue.start && (this.displayValue.end = this.displayValue.start)) : this.displayValue = e;
    },
    calculateValueFromEvent(e) {
      const n = this.$refs.track.getBoundingClientRect(), i = Math.max(0, Math.min(1, (e.clientX - n.left) / n.width)), r = this.min + i * (this.max - this.min);
      return this.clampValue(r);
    },
    handleKeyDown(e, t) {
      if (this.disabled || this.readonly) return;
      const n = t.key;
      let i = !1, r = 0;
      const o = this.value;
      switch (n) {
        case "ArrowRight":
        case "ArrowUp":
          r = this.step, i = !0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          r = -this.step, i = !0;
          break;
        case "PageUp":
          r = this.step * 10, i = !0;
          break;
        case "PageDown":
          r = -this.step * 10, i = !0;
          break;
        case "Home":
          this.setThumbValue(e, this.min), i = !0;
          break;
        case "End":
          this.setThumbValue(e, this.max), i = !0;
          break;
      }
      if (r !== 0) {
        const a = this.mode === "range" ? this.value[e] : this.value;
        this.setThumbValue(e, a + r);
      }
      i && (t.preventDefault(), this.$dispatch(k.SLIDER_CHANGED, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value,
        previousValue: o
      })));
    },
    setThumbValue(e, t) {
      const n = this.clampValue(t);
      this.mode === "range" ? (this.value[e] = n, e === "start" && this.value.start > this.value.end ? this.value.start = this.value.end : e === "end" && this.value.end < this.value.start && (this.value.end = this.value.start)) : this.value = n;
    },
    jumpToValue(e) {
      if (this.disabled || this.readonly) return;
      const t = this.value, n = this.clampValue(e);
      if (this.mode === "range") {
        const i = Math.abs(n - this.value.start), r = Math.abs(n - this.value.end), o = i <= r ? "start" : "end";
        this.value[o] = n;
      } else
        this.value = n;
      this.$dispatch(k.SLIDER_CHANGED, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value,
        previousValue: t
      }));
    },
    showTooltipAt(e) {
      this.tooltipVisible = !0, this.updateTooltipValue(), this.updateTooltipPosition(e);
    },
    updateTooltipValue() {
      const e = this.getCurrentValue();
      this.mode === "range" ? this.tooltipValue = this.activeThumb === "start" ? this.formatAriaValue(e.start) : this.formatAriaValue(e.end) : this.tooltipValue = this.formatAriaValue(e);
    },
    updateTooltipPosition(e) {
      this.tooltipPosition = {
        x: e.clientX,
        y: e.clientY
      }, this.updateTooltipValue();
    },
    getFillStyle() {
      const e = this.getCurrentValue();
      if (this.mode === "range") {
        const t = this.valueToPercent(e.start), n = this.valueToPercent(e.end);
        return {
          left: `${t}%`,
          width: `${n - t}%`
        };
      } else
        return {
          left: "0%",
          width: `${this.valueToPercent(e)}%`
        };
    },
    getThumbStyle(e = null) {
      const t = this.getCurrentValue();
      let n;
      return this.mode === "range" ? n = this.valueToPercent(t[e]) : n = this.valueToPercent(t), {
        left: `${n}%`,
        top: "50%",
        transform: "translate(-50%, -50%)"
      };
    },
    getTooltipStyle() {
      return {
        position: "fixed",
        left: `${this.tooltipPosition.x}px`,
        top: `${this.tooltipPosition.y - 10 - 30}px`,
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 50
      };
    },
    getStepStyle(e) {
      return {
        left: `${this.valueToPercent(e)}%`,
        top: "50%",
        transform: "translate(-50%, -50%)"
      };
    },
    getMarkStyle(e) {
      return {
        left: `${this.valueToPercent(e)}%`,
        transform: "translateX(-50%)"
      };
    },
    valueToPercent(e) {
      return this.max === this.min ? 0 : (e - this.min) / (this.max - this.min) * 100;
    },
    isStepInRange(e) {
      const t = this.getCurrentValue();
      return this.mode === "range" ? e >= t.start && e <= t.end : e <= t;
    },
    get stepMarkers() {
      if (!this.showSteps) return [];
      const e = [];
      for (let t = this.min; t <= this.max; t += this.step)
        e.push(t);
      return e;
    },
    updateFromInput(e) {
      const t = parseFloat(e);
      if (isNaN(t)) return;
      const n = this.value, i = Math.min(Math.max(t, this.min), this.max), r = Math.round((i - this.min) / this.step), o = this.min + r * this.step;
      this.isInternalUpdate = !0, this.value = o, this.$nextTick(() => {
        this.isInternalUpdate = !1;
      }), this.$dispatch(k.SLIDER_CHANGED, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value,
        previousValue: n
      }));
    },
    updateRangeFromInput(e, t) {
      const n = parseFloat(t);
      if (isNaN(n)) return;
      const i = { ...this.value };
      let r = this.value.start, o = this.value.end;
      const a = Math.min(Math.max(n, this.min), this.max), l = Math.round((a - this.min) / this.step), h = this.min + l * this.step;
      e === "start" ? r = Math.min(h, o) : o = Math.max(h, r), this.isInternalUpdate = !0, this.value = { start: r, end: o }, this.$nextTick(() => {
        this.isInternalUpdate = !1;
      }), this.$dispatch(k.SLIDER_CHANGED, M({
        id: this.$id("slider"),
        name: this.name,
        value: this.value,
        previousValue: i
      }));
    },
    formatValue() {
      const e = this.getCurrentValue();
      if (this.mode === "range") {
        const t = this.formatAriaValue(e.start), n = this.formatAriaValue(e.end);
        return `${t} – ${n}`;
      }
      return this.formatAriaValue(e);
    },
    formatAriaValue(e) {
      return (Math.round(e * 100) / 100).toString();
    }
  };
}
function dg(s = {}) {
  return {
    position: s.position || "bottom-right",
    duration: s.duration || 5e3,
    variant: s.variant || "solid",
    toasts: [],
    nextId: 1,
    eventListeners: [],
    init() {
      this.addWindowListener(k.TOAST_ADD, (e) => {
        const t = Array.isArray(e.detail) ? e.detail[0] : e.detail;
        this.addToast(t);
      });
    },
    addToast(e = {}) {
      const t = e.showProgress === !0, n = {
        id: this.nextId++,
        title: e.title || "",
        message: e.message || "",
        color: e.color || "default",
        variant: e.variant || this.variant,
        duration: e.duration !== void 0 ? e.duration : this.duration,
        dismissible: e.dismissible !== !1,
        showProgress: t,
        progress: t ? 100 : null,
        timer: null,
        startTime: null,
        remainingTime: null,
        paused: !1
      };
      this.toasts.push(n), this.$nextTick(() => {
        this.showToast(n);
      });
    },
    showToast(e) {
      const t = document.getElementById(`toast-${e.id}`);
      t && (t.showPopover(), window.dispatchEvent(new CustomEvent(k.TOAST_SHOWN, {
        detail: { id: e.id, toast: e }
      })), e.duration > 0 && this.startTimer(e));
    },
    removeToast(e) {
      const t = this.toasts.find((i) => i.id === e);
      if (!t) return;
      t.timer && (clearInterval(t.timer), t.timer = null);
      const n = document.getElementById(`toast-${e}`);
      n && n.hidePopover(), this.toasts = this.toasts.filter((i) => i.id !== e), window.dispatchEvent(new CustomEvent(k.TOAST_HIDDEN, {
        detail: { id: e, toast: t }
      }));
    },
    startTimer(e) {
      e.duration <= 0 || (e.startTime = Date.now(), e.remainingTime = e.duration, e.paused = !1, e.timer = setInterval(() => {
        if (e.paused) return;
        const t = Date.now() - e.startTime, n = e.duration - t;
        n <= 0 ? this.removeToast(e.id) : e.showProgress && (e.progress = n / e.duration * 100);
      }, 50));
    },
    pauseTimer(e) {
      e.duration <= 0 || e.paused || (e.paused = !0, e.remainingTime = e.duration - (Date.now() - e.startTime));
    },
    resumeTimer(e) {
      e.duration <= 0 || !e.paused || (e.paused = !1, e.startTime = Date.now(), e.duration = e.remainingTime);
    },
    getIconName(e) {
      const t = {
        success: "check-circle",
        error: "alert-circle",
        warning: "alert-triangle",
        info: "info",
        default: "bell"
      };
      return t[e] || t.default;
    },
    getToastStyles(e) {
      const t = this.toasts.findIndex((c) => c.id === e.id);
      if (t === -1) return "";
      const n = 16, o = t * (80 + 16), a = {
        "top-left": {
          "--toast-top": `${n + o}px`,
          "--toast-left": `${n}px`,
          "--toast-right": "auto",
          "--toast-bottom": "auto",
          "--toast-centered": "0"
        },
        "top-center": {
          "--toast-top": `${n + o}px`,
          "--toast-left": "50%",
          "--toast-right": "auto",
          "--toast-bottom": "auto",
          "--toast-centered": "1"
        },
        "top-right": {
          "--toast-top": `${n + o}px`,
          "--toast-right": `${n}px`,
          "--toast-left": "auto",
          "--toast-bottom": "auto",
          "--toast-centered": "0"
        },
        "bottom-left": {
          "--toast-bottom": `${n + o}px`,
          "--toast-left": `${n}px`,
          "--toast-right": "auto",
          "--toast-top": "auto",
          "--toast-centered": "0"
        },
        "bottom-center": {
          "--toast-bottom": `${n + o}px`,
          "--toast-left": "50%",
          "--toast-right": "auto",
          "--toast-top": "auto",
          "--toast-centered": "1"
        },
        "bottom-right": {
          "--toast-bottom": `${n + o}px`,
          "--toast-right": `${n}px`,
          "--toast-left": "auto",
          "--toast-top": "auto",
          "--toast-centered": "0"
        }
      }, l = a[this.position] || a["bottom-right"];
      return `position: fixed; ${Object.entries(l).map(([c, u]) => `${c}: ${u}`).join("; ")}; top: var(--toast-top); right: var(--toast-right); bottom: var(--toast-bottom); left: var(--toast-left);`;
    },
    addWindowListener(e, t) {
      window.addEventListener(e, t), this.eventListeners.push({ event: e, handler: t });
    },
    destroy() {
      this.toasts.forEach((e) => {
        e.timer && clearInterval(e.timer);
      }), this.eventListeners.forEach(({ event: e, handler: t }) => {
        window.removeEventListener(e, t);
      }), this.eventListeners = [];
    }
  };
}
function Yt(s) {
  window.dispatchEvent(new CustomEvent(k.TOAST_ADD, {
    detail: s
  }));
}
const fg = {
  show: (s, e, t = {}) => Yt({ title: s, message: e, ...t }),
  success: (s, e, t = {}) => Yt({ title: s, message: e, color: "success", ...t }),
  error: (s, e, t = {}) => Yt({ title: s, message: e, color: "error", ...t }),
  warning: (s, e, t = {}) => Yt({ title: s, message: e, color: "warning", ...t }),
  info: (s, e, t = {}) => Yt({ title: s, message: e, color: "info", ...t })
};
function pg(s = {}) {
  return {
    // State
    activeTab: s.defaultValue || s.value || "",
    tabs: [],
    panels: [],
    orientation: s.orientation || "horizontal",
    activationMode: s.activationMode || "automatic",
    name: s.name || null,
    syncHash: s.syncHash || !1,
    tabsId: s.tabsId || null,
    // Cursor state for animation
    cursorStyle: {
      left: "0px",
      top: "0px",
      width: "0px",
      height: "0px"
    },
    cursorReady: !1,
    // Lazy loading tracking
    activatedTabs: /* @__PURE__ */ new Set(),
    // Resize observer
    resizeObserver: null,
    /**
     * Initialize the tabs component.
     */
    init() {
      this.$nextTick(() => {
        if (this.updateTabsAndPanels(), this.morphHandler = () => {
          this.$nextTick(() => {
            this.updateTabsAndPanels(), requestAnimationFrame(() => {
              this.updateCursorPosition(!1);
              const e = [50, 100, 200];
              let t = 0;
              const n = () => {
                this.cursorStyle.width === "0px" && t < e.length && setTimeout(() => {
                  this.updateCursorPosition(!1), t++, n();
                }, e[t]);
              };
              n();
            });
          });
        }, document.addEventListener("livewire:morphed", this.morphHandler), this.syncHash) {
          const e = window.location.hash.slice(1);
          e && this.tabs.find((t) => t.dataset.spireTabsValue === e) && (this.activeTab = e);
        }
        if (!this.activeTab && this.tabs.length > 0) {
          const e = this.tabs.find(
            (t) => t.getAttribute("aria-disabled") !== "true"
          );
          e && (this.activeTab = e.dataset.spireTabsValue);
        }
        this.activeTab && this.activatedTabs.add(this.activeTab), this.updateTabAttributes(), this.setupResizeObserver(), requestAnimationFrame(() => {
          this.updateCursorPosition(!1);
          const e = [50, 100, 200];
          let t = 0;
          const n = () => {
            this.cursorStyle.width === "0px" && t < e.length && setTimeout(() => {
              this.updateCursorPosition(!1), t++, n();
            }, e[t]);
          };
          n(), setTimeout(() => {
            this.cursorReady = !0;
          }, 50);
        }), this.syncHash && (this.hashChangeHandler = () => {
          const e = window.location.hash.slice(1);
          e && e !== this.activeTab && this.tabs.find((t) => t.dataset.spireTabsValue === e) && this.selectTab(e);
        }, window.addEventListener("hashchange", this.hashChangeHandler)), this.$watch("activeTab", (e, t) => {
          this.updateCursorPosition(!0), e && this.activatedTabs.add(e), this.syncHash && e !== window.location.hash.slice(1) && history.pushState(null, "", `#${e}`);
        });
      });
    },
    // Setup resize observer for cursor repositioning
    setupResizeObserver() {
      const e = this.$el.querySelector('[role="tablist"]');
      e && (this.resizeObserver = new ResizeObserver(() => {
        this.updateCursorPosition(!1);
      }), this.resizeObserver.observe(e));
    },
    // Update cursor position based on active tab
    updateCursorPosition(e = !0) {
      const t = this.$el.querySelector('[role="tablist"]');
      if (!t) return;
      const n = t.querySelector(`[data-spire-tabs-value="${this.activeTab}"]`);
      if (!n) return;
      const i = this.$el.dataset.spireVariant || "underline", r = this.$el.dataset.spireOrientation || "horizontal", o = i === "underline", a = r === "horizontal", l = o && a, h = o && !a;
      this.cursorStyle = {
        left: h ? "" : `${n.offsetLeft}px`,
        top: l ? "auto" : `${n.offsetTop}px`,
        width: h ? "" : `${n.offsetWidth}px`,
        height: l ? "" : `${n.offsetHeight}px`
      };
    },
    // Update tabs and panels from DOM
    updateTabsAndPanels() {
      const e = this.$el.querySelector('[role="tablist"]');
      e && (this.tabs = Array.from(e.children).filter(
        (t) => t.getAttribute("role") === "tab"
      )), this.panels = Array.from(
        this.$el.querySelectorAll(':scope > [role="tabpanel"]')
      );
    },
    // Tab selection
    selectTab(e) {
      if (this.isDisabled(e)) return;
      const t = this.activeTab;
      this.activeTab = e, this.updateTabAttributes(), this.$dispatch(k.TABS_CHANGED, M({
        id: this.$id("tabs"),
        name: this.name,
        value: e,
        previousValue: t
      }));
    },
    // Keyboard navigation
    handleKeydown(e) {
      const t = e.key, n = this.orientation === "horizontal", i = {
        [n ? "ArrowRight" : "ArrowDown"]: () => this.focusNextTab(),
        [n ? "ArrowLeft" : "ArrowUp"]: () => this.focusPrevTab(),
        Home: () => this.focusFirstTab(),
        End: () => this.focusLastTab(),
        Enter: () => this.activateFocusedTab(),
        " ": () => this.activateFocusedTab()
      };
      i[t] && (e.preventDefault(), i[t]());
    },
    // Focus management
    getCurrentTabIndex() {
      return this.tabs.findIndex((e) => e === document.activeElement);
    },
    findNextEnabledTab(e, t) {
      const n = this.tabs.length;
      let i = e + t;
      for (; i < 0; ) i += n;
      for (; i >= n; ) i -= n;
      let r = 0;
      for (; r < n; ) {
        if (this.tabs[i].getAttribute("aria-disabled") !== "true")
          return i;
        i = (i + t + n) % n, r++;
      }
      return e;
    },
    focusNextTab() {
      const e = this.getCurrentTabIndex(), t = this.findNextEnabledTab(
        e >= 0 ? e : -1,
        1
      );
      this.focusTab(t);
    },
    focusPrevTab() {
      const e = this.getCurrentTabIndex(), t = this.findNextEnabledTab(
        e >= 0 ? e : this.tabs.length,
        -1
      );
      this.focusTab(t);
    },
    focusFirstTab() {
      const e = this.findNextEnabledTab(-1, 1);
      this.focusTab(e);
    },
    focusLastTab() {
      const e = this.findNextEnabledTab(this.tabs.length, -1);
      this.focusTab(e);
    },
    focusTab(e) {
      if (!(e < 0 || e >= this.tabs.length) && (this.tabs.forEach((t, n) => {
        t.tabIndex = n === e ? 0 : -1;
      }), this.tabs[e].focus(), this.activationMode === "automatic")) {
        const t = this.tabs[e].dataset.spireTabsValue;
        t && !this.isDisabled(t) && this.selectTab(t);
      }
    },
    activateFocusedTab() {
      const e = this.getCurrentTabIndex();
      if (e >= 0) {
        const t = this.tabs[e].dataset.spireTabsValue;
        t && this.selectTab(t);
      }
    },
    // Helper methods
    isActive(e) {
      return this.activeTab === e;
    },
    getTabId(e) {
      return this.tabsId ? `${this.tabsId}-tab-${e}` : `tab-${e}`;
    },
    getPanelId(e) {
      return this.tabsId ? `${this.tabsId}-panel-${e}` : `panel-${e}`;
    },
    isDisabled(e) {
      return this.tabs.find((n) => n.dataset.spireTabsValue === e)?.getAttribute("aria-disabled") === "true";
    },
    // Check if tab has been activated (for lazy loading)
    hasBeenActivated(e) {
      return this.activatedTabs.has(e);
    },
    updateTabAttributes() {
      this.tabs.forEach((e) => {
        const t = e.dataset.spireTabsValue === this.activeTab;
        e.setAttribute("aria-selected", t ? "true" : "false"), document.activeElement !== e && (e.tabIndex = t ? 0 : -1);
      });
    },
    // Cleanup
    destroy() {
      this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.hashChangeHandler && (window.removeEventListener("hashchange", this.hashChangeHandler), this.hashChangeHandler = null), this.morphHandler && (document.removeEventListener("livewire:morphed", this.morphHandler), this.morphHandler = null);
    }
  };
}
function mg(s) {
  return {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
    "image/x-icon": ".ico",
    "application/pdf": ".pdf",
    "text/plain": ".txt",
    "text/html": ".html",
    "text/css": ".css",
    "text/javascript": ".js",
    "application/json": ".json",
    "application/xml": ".xml",
    "application/zip": ".zip",
    "application/x-rar-compressed": ".rar",
    "application/x-7z-compressed": ".7z",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
    "audio/mpeg": ".mp3",
    "audio/wav": ".wav",
    "audio/ogg": ".ogg",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/ogg": ".ogv"
  }[s] || "";
}
function gg(s = {}) {
  return {
    multiple: s.multiple || !1,
    maxFiles: s.maxFiles || null,
    maxSize: s.maxSize || null,
    accept: s.accept || [],
    autoUpload: s.autoUpload !== !1,
    wireModelName: s.wireModelName || null,
    removeEvent: s.removeEvent || "removeExistingFile",
    files: [],
    existingFiles: s.existingFiles || [],
    isDragging: !1,
    dragCounter: 0,
    dragListeners: null,
    urlInput: "",
    urlUploading: !1,
    urlError: null,
    validationErrors: [],
    validationErrorTimer: null,
    translations: s.translations || {},
    init() {
      this.existingFiles = this.normalizeExistingFiles(s.existingFiles || []), this.$nextTick(() => {
        this.setupDragListeners();
      });
    },
    normalizeExistingFiles(e) {
      return !e || !Array.isArray(e) ? [] : e.map((t) => t.original_url || t.url ? {
        id: t.id || t.uuid || this.generateId(),
        name: t.name || t.file_name || "Unknown",
        url: t.original_url || t.url,
        thumbnailUrl: t.preview_url || t.thumb_url || t.original_url || t.url,
        size: t.size || 0,
        type: t.mime_type || t.type || "application/octet-stream",
        isExisting: !0
      } : {
        id: t.id || this.generateId(),
        name: t.name || "Unknown",
        url: t.url || "",
        thumbnailUrl: t.thumbnailUrl || t.url || "",
        size: t.size || 0,
        type: t.type || "application/octet-stream",
        isExisting: !0
      });
    },
    setupDragListeners() {
      const e = this.$refs.dropzone;
      e && (this.dragListeners = {
        dragenter: (t) => {
          t.preventDefault(), t.stopPropagation(), this.dragCounter++, this.isDragging = !0;
        },
        dragleave: (t) => {
          t.preventDefault(), t.stopPropagation(), this.dragCounter--, this.dragCounter === 0 && (this.isDragging = !1);
        },
        dragover: (t) => {
          t.preventDefault(), t.stopPropagation();
        },
        drop: (t) => {
          t.preventDefault(), t.stopPropagation(), this.isDragging = !1, this.dragCounter = 0, this.handleFiles(t.dataTransfer.files);
        }
      }, Object.entries(this.dragListeners).forEach(([t, n]) => {
        e.addEventListener(t, n);
      }));
    },
    openFilePicker() {
      this.$refs.fileInput?.click();
    },
    handleFileInputChange(e) {
      this.handleFiles(e.target.files), e.target.value = "";
    },
    handleFiles(e) {
      const t = Array.from(e);
      if (this.clearValidationErrors(), this.maxFiles && this.files.length + this.existingFiles.length + t.length > this.maxFiles) {
        this.addValidationError(this.translations.maxFilesError.replace(":max", this.maxFiles));
        return;
      }
      const n = [];
      for (const i of t) {
        const r = this.validateFile(i);
        if (r.valid) {
          const o = this.createFileObject(i);
          n.push(o);
        } else
          this.addValidationError(r.error);
      }
      this.files = [...this.files, ...n], this.autoUpload && n.length > 0 && n.forEach((i) => this.uploadFile(i)), this.$dispatch(k.FILE_UPLOAD_ADDED, M({
        value: n,
        metadata: { totalFiles: this.files.length }
      }));
    },
    validateFile(e) {
      return this.maxSize && e.size > this.maxSize ? {
        valid: !1,
        error: this.translations.maxSizeError.replace(":max", this.formatFileSize(this.maxSize))
      } : this.accept.length > 0 && !this.accept.some((n) => n.endsWith("/*") ? e.type.startsWith(n.replace("/*", "/")) : n.startsWith(".") ? e.name.toLowerCase().endsWith(n.toLowerCase()) : e.type === n) ? {
        valid: !1,
        error: this.translations.invalidTypeError
      } : { valid: !0 };
    },
    createFileObject(e) {
      const t = this.generateId();
      let n = null;
      return e.type.startsWith("image/") && (n = URL.createObjectURL(e)), {
        id: t,
        file: e,
        name: e.name,
        size: e.size,
        type: e.type,
        progress: 0,
        status: "pending",
        previewUrl: n,
        error: null
      };
    },
    uploadFile(e) {
      if (!this.wireModelName || !this.$wire) {
        e.status = "uploaded", e.progress = 100;
        return;
      }
      e.status = "uploading";
      const t = this.multiple ? this.wireModelName : this.wireModelName;
      this.multiple ? this.$wire.uploadMultiple(
        t,
        [e.file],
        (n) => {
          e.status = "uploaded", e.progress = 100, this.announceStatus(`${e.name} uploaded successfully`), this.$dispatch(k.FILE_UPLOAD_COMPLETE, M({
            value: e,
            metadata: { uploadedFilenames: n }
          }));
        },
        () => {
          e.status = "error", e.error = this.translations.error, this.announceError(`Failed to upload ${e.name}`), this.$dispatch(k.FILE_UPLOAD_ERROR, M({
            value: e,
            metadata: { error: this.translations.error }
          }));
        },
        (n) => {
          e.progress = n.progress, this.$dispatch(k.FILE_UPLOAD_PROGRESS, M({
            value: e,
            metadata: { progress: n.progress }
          }));
        },
        () => {
          e.status = "pending", e.progress = 0;
        }
      ) : this.$wire.upload(
        t,
        e.file,
        (n) => {
          e.status = "uploaded", e.progress = 100, this.announceStatus(`${e.name} uploaded successfully`), this.$dispatch(k.FILE_UPLOAD_COMPLETE, M({
            value: e,
            metadata: { uploadedFilename: n }
          }));
        },
        () => {
          e.status = "error", e.error = this.translations.error, this.announceError(`Failed to upload ${e.name}`), this.$dispatch(k.FILE_UPLOAD_ERROR, M({
            value: e,
            metadata: { error: this.translations.error }
          }));
        },
        (n) => {
          e.progress = n.progress, this.$dispatch(k.FILE_UPLOAD_PROGRESS, M({
            value: e,
            metadata: { progress: n.progress }
          }));
        },
        () => {
          e.status = "pending", e.progress = 0;
        }
      );
    },
    retryUpload(e) {
      e.error = null, e.progress = 0, this.uploadFile(e);
    },
    removeFile(e) {
      e.previewUrl && URL.revokeObjectURL(e.previewUrl), this.files = this.files.filter((t) => t.id !== e.id), e.status === "uploading" && this.$wire && this.wireModelName && this.$wire.cancelUpload(this.wireModelName), this.$dispatch(k.FILE_UPLOAD_REMOVED, M({
        value: e,
        metadata: { remainingFiles: this.files.length }
      }));
    },
    removeExistingFile(e) {
      this.existingFiles = this.existingFiles.filter((t) => t.id !== e.id), this.$wire && this.$wire.call(this.removeEvent, e.id);
    },
    uploadAllPending() {
      this.files.filter((e) => e.status === "pending").forEach((e) => this.uploadFile(e));
    },
    clearAll() {
      this.files.forEach((e) => {
        e.previewUrl && URL.revokeObjectURL(e.previewUrl);
      }), this.files = [];
    },
    async uploadFromUrl() {
      const e = this.urlInput.trim();
      if (!e) {
        this.urlError = this.translations.urlInvalid;
        return;
      }
      try {
        new URL(e);
      } catch {
        this.urlError = this.translations.urlInvalid;
        return;
      }
      this.urlError = null, this.urlUploading = !0;
      try {
        const t = await fetch(e);
        if (!t.ok)
          throw new Error(`HTTP error! status: ${t.status}`);
        const n = await t.blob();
        let i = "";
        const r = t.headers.get("content-disposition");
        if (r) {
          const a = r.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          a && a[1] && (i = a[1].replace(/['"]/g, ""));
        }
        if (!i)
          try {
            const a = new URL(e);
            i = decodeURIComponent(a.pathname.split("/").pop() || "");
          } catch {
            i = e.split("/").pop().split("?")[0] || "";
          }
        if (i = i.split("?")[0].replace(/[<>:"/\\|?*]/g, "_").trim(), !i || !i.includes(".")) {
          const a = mg(n.type), l = i || `downloaded-file-${Date.now()}`;
          i = a ? `${l}${a}` : `${l}.bin`;
        }
        const o = new File([n], i, { type: n.type });
        this.handleFiles([o]), this.urlInput = "", this.announceStatus(`File from URL added: ${i}`);
      } catch (t) {
        console.error("[Spire FileUpload] URL fetch error:", t), t instanceof TypeError && (t.message.includes("Failed to fetch") || t.message.includes("NetworkError") || t.message.includes("CORS")) ? (this.urlError = this.translations.urlCorsError, this.announceError(this.translations.urlCorsError)) : (this.urlError = this.translations.urlError, this.announceError(this.translations.urlError));
      } finally {
        this.urlUploading = !1;
      }
    },
    clearUrlError() {
      this.urlError = null;
    },
    addValidationError(e) {
      this.validationErrors.includes(e) || this.validationErrors.push(e), this.announceError(e), this.validationErrorTimer && clearTimeout(this.validationErrorTimer), this.validationErrorTimer = setTimeout(() => {
        this.clearValidationErrors();
      }, 5e3);
    },
    clearValidationErrors() {
      this.validationErrors = [], this.validationErrorTimer && (clearTimeout(this.validationErrorTimer), this.validationErrorTimer = null);
    },
    get hasFiles() {
      return this.files.length > 0 || this.existingFiles.length > 0;
    },
    get isUploading() {
      return this.files.some((e) => e.status === "uploading");
    },
    get pendingCount() {
      return this.files.filter((e) => e.status === "pending").length;
    },
    get uploadedCount() {
      return this.files.filter((e) => e.status === "uploaded").length;
    },
    get errorCount() {
      return this.files.filter((e) => e.status === "error").length;
    },
    get totalProgress() {
      if (this.files.length === 0) return 0;
      const e = this.files.reduce((t, n) => t + n.progress, 0);
      return Math.round(e / this.files.length);
    },
    get canAddMore() {
      return this.maxFiles ? this.files.length + this.existingFiles.length < this.maxFiles : !0;
    },
    generateId() {
      return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },
    formatFileSize(e) {
      if (e === 0) return "0 B";
      const t = 1024, n = ["B", "KB", "MB", "GB"], i = Math.floor(Math.log(e) / Math.log(t));
      return parseFloat((e / Math.pow(t, i)).toFixed(1)) + " " + n[i];
    },
    isImage(e) {
      return e && e.startsWith("image/");
    },
    getFileIcon(e) {
      return e ? e.startsWith("image/") ? "image" : e.startsWith("video/") ? "video" : e.startsWith("audio/") ? "music" : e === "application/pdf" ? "file-text" : e.includes("spreadsheet") || e.includes("excel") ? "table" : e.includes("document") || e.includes("word") ? "file-text" : e.includes("zip") || e.includes("archive") ? "archive" : "file" : "file";
    },
    announceStatus(e) {
      const t = this.$refs.statusAnnouncer;
      t && (t.textContent = e);
    },
    announceError(e) {
      const t = this.$refs.errorAnnouncer;
      t && (t.textContent = e), console.warn("[Spire FileUpload]", e);
    },
    destroy() {
      this.files.forEach((t) => {
        t.previewUrl && URL.revokeObjectURL(t.previewUrl);
      });
      const e = this.$refs.dropzone;
      e && this.dragListeners && (Object.entries(this.dragListeners).forEach(([t, n]) => {
        e.removeEventListener(t, n);
      }), this.dragListeners = null), this.validationErrorTimer && (clearTimeout(this.validationErrorTimer), this.validationErrorTimer = null);
    }
  };
}
function yg(s = {}) {
  return {
    collapsed: s.collapsed || !1,
    mobileOpen: !1,
    eventListeners: [],
    mobileBreakpoint: s.mobileBreakpoint || 768,
    storageKey: s.storageKey || "spire-sidebar-collapsed",
    persist: s.persist !== !1,
    items: [],
    highlightedIndex: -1,
    typeaheadString: "",
    typeaheadTimeout: null,
    get sidebar() {
      return this.$refs.sidebar;
    },
    init() {
      if (this.persist && this.storageKey) {
        const t = localStorage.getItem(this.storageKey);
        t !== null && (this.collapsed = t === "true", this.sidebar.dataset.spireCollapsed = this.collapsed ? "true" : "false", this.sidebar.classList.toggle("spire-sidebar--collapsed", this.collapsed));
      }
      this.$nextTick(() => {
        this.updateNavigableItems();
      }), this.addWindowListener("keydown", (t) => {
        if (t.key === "Escape" && this.mobileOpen) {
          this.closeMobile();
          return;
        }
        if (!this.sidebar.contains(document.activeElement)) return;
        const n = document.activeElement?.tagName?.toLowerCase();
        if (!(n === "input" || n === "textarea"))
          switch (t.key) {
            case "ArrowDown":
              t.preventDefault(), this.navigateNext();
              break;
            case "ArrowUp":
              t.preventDefault(), this.navigatePrev();
              break;
            case "Home":
              t.preventDefault(), this.navigateFirst();
              break;
            case "End":
              t.preventDefault(), this.navigateLast();
              break;
            case "ArrowRight":
              this.handleArrowRight(t);
              break;
            case "ArrowLeft":
              this.handleArrowLeft(t);
              break;
            default:
              this.handleTypeahead(t);
          }
      }), this.addWindowListener("click", (t) => {
        if (this.mobileOpen && !this.sidebar.contains(t.target)) {
          const n = document.querySelector("[data-spire-sidebar-backdrop]");
          n && n.contains(t.target) && this.closeMobile();
        }
      }), this.addWindowListener("resize", () => {
        window.innerWidth >= this.mobileBreakpoint && this.mobileOpen && this.closeMobile();
      }), this.sidebar.addEventListener("sidebar-toggle", () => this.toggle()), this.sidebar.addEventListener("sidebar-open-mobile", () => this.openMobile()), this.sidebar.addEventListener("sidebar-close-mobile", () => this.closeMobile()), this.addWindowListener("spire-sidebar-toggle", () => this.toggle()), this.addWindowListener("spire-sidebar-open-mobile", () => this.openMobile()), this.sidebar.dataset.spireCollapsed === "true" && (this.collapsed = !0), this.$watch("collapsed", (t) => {
        this.sidebar.dataset.spireCollapsed = t ? "true" : "false", this.sidebar.classList.toggle("spire-sidebar--collapsed", t), this.persist && this.storageKey && localStorage.setItem(this.storageKey, t ? "true" : "false");
      }), this.$watch("mobileOpen", (t) => {
        this.sidebar.dataset.spireMobileOpen = t ? "true" : "false", t ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      });
    },
    toggle() {
      const e = this.collapsed;
      this.collapsed = !this.collapsed, this.$dispatch("sidebar-toggled", M({
        value: this.collapsed,
        previousValue: e,
        metadata: {
          source: "toggle"
        }
      }));
    },
    expand() {
      this.collapsed && this.toggle();
    },
    collapse() {
      this.collapsed || this.toggle();
    },
    openMobile() {
      this.mobileOpen = !0, this.collapsed && this.sidebar.classList.remove("spire-sidebar--collapsed"), this.$dispatch("sidebar-mobile-opened", M({
        value: !0
      })), this.$nextTick(() => {
        this.sidebar.querySelector('[data-spire-sidebar-item]:not([data-spire-disabled="true"])')?.focus();
      });
    },
    closeMobile() {
      this.mobileOpen = !1, this.collapsed && this.sidebar.classList.add("spire-sidebar--collapsed"), this.$dispatch("sidebar-mobile-closed", M({
        value: !1
      }));
    },
    toggleMobile() {
      this.mobileOpen ? this.closeMobile() : this.openMobile();
    },
    isMobile() {
      return window.innerWidth < this.mobileBreakpoint;
    },
    updateNavigableItems() {
      this.items = Array.from(
        this.sidebar.querySelectorAll('[data-spire-sidebar-item]:not([data-spire-disabled="true"])')
      ).filter((e) => e.offsetParent !== null);
    },
    navigateNext() {
      if (this.updateNavigableItems(), this.items.length === 0) return;
      const t = this.getCurrentItemIndex() + 1;
      t < this.items.length ? this.focusItem(t) : this.focusItem(0);
    },
    navigatePrev() {
      if (this.updateNavigableItems(), this.items.length === 0) return;
      const t = this.getCurrentItemIndex() - 1;
      t >= 0 ? this.focusItem(t) : this.focusItem(this.items.length - 1);
    },
    navigateFirst() {
      this.updateNavigableItems(), this.items.length > 0 && this.focusItem(0);
    },
    navigateLast() {
      this.updateNavigableItems(), this.items.length > 0 && this.focusItem(this.items.length - 1);
    },
    getCurrentItemIndex() {
      const e = document.activeElement;
      return this.items.indexOf(e);
    },
    focusItem(e) {
      e >= 0 && e < this.items.length && (this.items[e].focus(), this.highlightedIndex = e, this.items[e].scrollIntoView({
        block: "nearest",
        inline: "nearest"
      }));
    },
    handleArrowRight(e) {
      const t = document.activeElement;
      if (!t || !this.sidebar.contains(t)) return;
      const n = t.closest("[data-spire-sidebar-item-wrapper]");
      if (n) {
        const i = n.dataset.spireExpanded === "true", r = n.querySelector("[data-spire-sidebar-item-children]");
        if (r && !i) {
          e.preventDefault();
          const o = Alpine.$data(n);
          o && o.expand && (o.expand(), this.$nextTick(() => {
            this.updateNavigableItems();
            const a = r.querySelector('[data-spire-sidebar-item]:not([data-spire-disabled="true"])');
            a && a.focus();
          }));
        }
      }
    },
    handleArrowLeft(e) {
      const t = document.activeElement;
      if (!t || !this.sidebar.contains(t)) return;
      const n = t.closest("[data-spire-sidebar-item-children]");
      if (n) {
        e.preventDefault();
        const r = n.closest("[data-spire-sidebar-item-wrapper]");
        if (r) {
          const o = r.querySelector(":scope > [data-spire-sidebar-item]");
          o && o.focus();
        }
        return;
      }
      const i = t.closest("[data-spire-sidebar-item-wrapper]");
      if (i && i.dataset.spireExpanded === "true") {
        e.preventDefault();
        const o = Alpine.$data(i);
        o && o.collapse && (o.collapse(), this.$nextTick(() => {
          this.updateNavigableItems();
        }));
      }
    },
    handleTypeahead(e) {
      const t = e.key;
      if (t.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;
      clearTimeout(this.typeaheadTimeout), this.typeaheadString += t.toLowerCase(), this.updateNavigableItems();
      const n = this.findTypeaheadMatch(this.typeaheadString);
      n >= 0 && this.focusItem(n), this.typeaheadTimeout = setTimeout(() => {
        this.typeaheadString = "";
      }, oa);
    },
    findTypeaheadMatch(e) {
      const t = Math.max(0, this.highlightedIndex + 1);
      for (let n = 0; n < this.items.length; n++) {
        const i = (t + n) % this.items.length;
        if ((this.items[i].querySelector(".spire-sidebar-item-label")?.textContent?.toLowerCase() || this.items[i].textContent?.toLowerCase() || "").trim().startsWith(e))
          return i;
      }
      return -1;
    },
    addWindowListener(e, t) {
      window.addEventListener(e, t), this.eventListeners.push({ event: e, handler: t });
    },
    destroy() {
      this.eventListeners.forEach(({ event: e, handler: t }) => {
        window.removeEventListener(e, t);
      }), this.eventListeners = [], clearTimeout(this.typeaheadTimeout), document.body.style.overflow = "";
    }
  };
}
function bg(s = {}) {
  return {
    open: s.defaultOpen !== !1,
    id: s.id || null,
    persist: s.persist !== !1,
    storageKey: "spire-sidebar-sections",
    init() {
      if (this.persist && this.id) {
        const e = this.getStoredState();
        e !== null && (this.open = e);
      }
      this.$watch("open", (e) => {
        this.$el.dataset.spireOpen = e ? "true" : "false", this.persist && this.id && this.saveState(e);
      }), this.$el.dataset.spireOpen = this.open ? "true" : "false";
    },
    getStoredState() {
      try {
        const e = localStorage.getItem(this.storageKey);
        return e ? JSON.parse(e)[this.id] ?? null : null;
      } catch {
        return null;
      }
    },
    saveState(e) {
      try {
        let t = {};
        const n = localStorage.getItem(this.storageKey);
        n && (t = JSON.parse(n)), t[this.id] = e, localStorage.setItem(this.storageKey, JSON.stringify(t));
      } catch {
      }
    },
    toggle() {
      this.open = !this.open;
    },
    expand() {
      this.open = !0;
    },
    collapse() {
      this.open = !1;
    }
  };
}
function xg(s = {}) {
  return {
    expanded: s.defaultExpanded || !1,
    hasChildren: !1,
    id: s.id || null,
    persist: s.persist !== !1,
    storageKey: "spire-sidebar-items",
    init() {
      const e = this.$el.querySelector("[data-spire-sidebar-item-children]");
      if (this.hasChildren = e && e.children.length > 0, this.hasChildren && this.persist && this.id) {
        const t = this.getStoredState();
        t !== null && (this.expanded = t);
      }
      this.$watch("expanded", (t) => {
        this.$el.dataset.spireExpanded = t ? "true" : "false", this.hasChildren && this.persist && this.id && this.saveState(t);
      }), this.hasChildren && (this.$el.dataset.spireExpanded = this.expanded ? "true" : "false");
    },
    getStoredState() {
      try {
        const e = localStorage.getItem(this.storageKey);
        return e ? JSON.parse(e)[this.id] ?? null : null;
      } catch {
        return null;
      }
    },
    saveState(e) {
      try {
        let t = {};
        const n = localStorage.getItem(this.storageKey);
        n && (t = JSON.parse(n)), t[this.id] = e, localStorage.setItem(this.storageKey, JSON.stringify(t));
      } catch {
      }
    },
    toggle() {
      this.hasChildren && (this.expanded = !this.expanded);
    },
    expand() {
      this.hasChildren && (this.expanded = !0);
    },
    collapse() {
      this.hasChildren && (this.expanded = !1);
    }
  };
}
function Sg(s = {}) {
  return {
    ...W({
      type: s.type || "auto",
      trigger: s.trigger || "click",
      onInit() {
        this.setupKeyboard(), s.onInit?.call(this);
      }
    }),
    ...Ze({
      pattern: "roving-tabindex",
      role: "menu",
      itemSelector: "[role=menuitem]:not([disabled])",
      orientation: "vertical",
      wrap: !0,
      onSelect(e) {
        e?.click();
      }
    }),
    destroy() {
      W().destroy?.call(this), Ze().destroy?.call(this);
    }
  };
}
function vg(s = {}) {
  return {
    autoplay: s.autoplay ?? Tt.AUTOPLAY,
    interval: s.interval ?? Tt.INTERVAL,
    loop: s.loop ?? Tt.LOOP,
    pauseOnHover: s.pauseOnHover ?? Tt.PAUSE_ON_HOVER,
    pauseOnFocus: s.pauseOnFocus ?? Tt.PAUSE_ON_FOCUS,
    itemsPerViewConfig: s.itemsPerView ?? Tt.ITEMS_PER_VIEW,
    itemsPerView: 1,
    currentIndex: 0,
    currentPage: 0,
    totalSlides: 0,
    totalPages: 0,
    isPlaying: !1,
    isPaused: !1,
    isHovered: !1,
    isFocused: !1,
    autoplayTimer: null,
    scrollTimeout: null,
    resizeObserver: null,
    intersectionObserver: null,
    slideWidths: [],
    isNavigating: !1,
    mediaQueryListeners: [],
    trackEventListeners: [],
    init() {
      this.$nextTick(() => {
        this.setupResponsiveItemsPerView(), this.setupCarousel(), this.setupObservers(), this.setupEventListeners(), this.autoplay && this.play();
      });
    },
    destroy() {
      this.stop(), this.scrollTimeout && (clearTimeout(this.scrollTimeout), this.scrollTimeout = null), this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.intersectionObserver && (this.intersectionObserver.disconnect(), this.intersectionObserver = null), this.mediaQueryListeners.forEach(({ mql: e, handler: t }) => {
        e.removeEventListener("change", t);
      }), this.mediaQueryListeners = [], this.trackEventListeners.forEach(({ element: e, event: t, handler: n }) => {
        e.removeEventListener(t, n);
      }), this.trackEventListeners = [];
    },
    setupResponsiveItemsPerView() {
      if (typeof this.itemsPerViewConfig == "number") {
        this.itemsPerView = this.itemsPerViewConfig, this.updateCSSProperty();
        return;
      }
      const e = this.itemsPerViewConfig, t = this.getBreakpoints(), n = Object.keys(e).filter((r) => r !== "default").sort((r, o) => {
        const a = parseFloat(t[r]) || 0;
        return (parseFloat(t[o]) || 0) - a;
      }), i = () => {
        let r = e.default || 1;
        for (const o of n) {
          const a = t[o];
          if (a && window.matchMedia(`(min-width: ${a})`).matches) {
            r = e[o];
            break;
          }
        }
        r !== this.itemsPerView && (this.itemsPerView = r, this.totalPages = Math.ceil(this.totalSlides / this.itemsPerView), this.currentPage = Math.min(this.currentPage, this.totalPages - 1), this.updateCSSProperty());
      };
      i(), n.forEach((r) => {
        const o = t[r];
        if (!o) return;
        const a = window.matchMedia(`(min-width: ${o})`), l = () => i();
        a.addEventListener("change", l), this.mediaQueryListeners.push({ mql: a, handler: l });
      });
    },
    getBreakpoints() {
      const e = { ...Vr }, t = getComputedStyle(document.documentElement);
      return Object.keys(Vr).forEach((n) => {
        const i = t.getPropertyValue(`--breakpoint-${n}`).trim();
        i && (e[n] = i);
      }), e;
    },
    updateCSSProperty() {
      this.$el && this.$el.style.setProperty("--items-per-view", this.itemsPerView);
    },
    setupCarousel() {
      if (!this.$refs.track) return;
      const t = this.getSlides();
      this.totalSlides = t.length, this.totalPages = Math.ceil(this.totalSlides / this.itemsPerView), this.calculateSlideWidths();
    },
    setupObservers() {
      const e = this.$refs.track;
      e && (this.resizeObserver = new ResizeObserver(() => {
        this.calculateSlideWidths();
      }), this.resizeObserver.observe(e), this.intersectionObserver = new IntersectionObserver(
        (t) => {
          if (!this.isNavigating) {
            if (this.isAtMaxScroll()) {
              this.currentPage !== this.totalPages - 1 && (this.currentPage = this.totalPages - 1, this.currentIndex = (this.totalPages - 1) * this.itemsPerView, this.announceSlide(), this.dispatchChangeEvent());
              return;
            }
            t.forEach((n) => {
              if (n.isIntersecting && n.intersectionRatio >= 0.5) {
                const i = n.target, r = this.getSlideIndex(i);
                if (r !== -1 && r !== this.currentIndex) {
                  this.currentIndex = r;
                  const o = Math.floor(r / this.itemsPerView);
                  o !== this.currentPage && (this.currentPage = o, this.announceSlide(), this.dispatchChangeEvent());
                }
              }
            });
          }
        },
        {
          root: e,
          threshold: 0.5
        }
      ), this.getSlides().forEach((t) => {
        this.intersectionObserver.observe(t);
      }));
    },
    setupEventListeners() {
      const e = this.$refs.track;
      if (!e) return;
      const t = () => {
        this.updateCurrentIndexFromScroll();
      }, n = () => {
        this.scrollTimeout && clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout(() => {
          this.updateCurrentIndexFromScroll();
        }, jt);
      };
      e.addEventListener("scrollend", t), e.addEventListener("scroll", n), this.trackEventListeners.push(
        { element: e, event: "scrollend", handler: t },
        { element: e, event: "scroll", handler: n }
      );
    },
    calculateSlideWidths() {
      const e = this.getSlides();
      this.slideWidths = e.map((t) => t.offsetWidth);
    },
    getSlides() {
      const e = this.$refs.track;
      return e ? Array.from(e.querySelectorAll("[data-spire-carousel-slide]")) : [];
    },
    getSlideIndex(e) {
      return this.getSlides().indexOf(e);
    },
    updateCurrentIndexFromScroll() {
      if (this.isNavigating) return;
      const e = this.$refs.track;
      if (!e) return;
      if (this.isAtMaxScroll()) {
        this.currentPage !== this.totalPages - 1 && (this.currentPage = this.totalPages - 1, this.currentIndex = (this.totalPages - 1) * this.itemsPerView, this.announceSlide(), this.dispatchChangeEvent());
        return;
      }
      const t = e.scrollLeft, n = e.offsetWidth;
      let i = 0;
      const r = this.getSlides();
      for (let o = 0; o < r.length; o++) {
        const a = r[o].offsetWidth, l = i + a / 2;
        if (l >= t && l <= t + n) {
          if (o !== this.currentIndex) {
            this.currentIndex = o;
            const h = Math.floor(o / this.itemsPerView);
            h !== this.currentPage && (this.currentPage = h, this.announceSlide(), this.dispatchChangeEvent());
          }
          break;
        }
        i += a;
      }
    },
    goToSlide(e) {
      const t = this.$refs.track;
      if (!t) return;
      const n = this.getSlides();
      if (n.length === 0 || (this.loop ? e < 0 ? e = n.length - 1 : e >= n.length && (e = 0) : e = Math.max(0, Math.min(e, n.length - 1)), !n[e])) return;
      let r = 0;
      for (let a = 0; a < e; a++)
        r += n[a].offsetWidth;
      const o = this.getGap();
      r += o * e, this.isNavigating = !0, t.scrollTo({
        left: r,
        behavior: "smooth"
      }), this.currentIndex = e, this.currentPage = Math.floor(e / this.itemsPerView), setTimeout(() => {
        this.isNavigating = !1;
      }, Pr), this.isPlaying && this.resetAutoplayTimer();
    },
    goToPage(e) {
      const t = this.$refs.track;
      if (!t) return;
      this.loop ? e < 0 ? e = this.totalPages - 1 : e >= this.totalPages && (e = 0) : e = Math.max(0, Math.min(e, this.totalPages - 1));
      const n = this.getSlides();
      if (n.length === 0) return;
      const i = e === this.totalPages - 1, r = this.getGap();
      let o;
      if (i)
        o = t.scrollWidth - t.offsetWidth;
      else {
        const a = e * this.itemsPerView;
        o = 0;
        for (let l = 0; l < a; l++)
          o += n[l].offsetWidth + r;
      }
      this.isNavigating = !0, t.scrollTo({
        left: Math.max(0, o),
        behavior: "smooth"
      }), this.currentPage = e, this.currentIndex = e * this.itemsPerView, setTimeout(() => {
        this.isNavigating = !1;
      }, Pr), this.isPlaying && this.resetAutoplayTimer();
    },
    next() {
      this.goToPage(this.currentPage + 1);
    },
    previous() {
      this.goToPage(this.currentPage - 1);
    },
    play() {
      this.isPlaying || (this.isPlaying = !0, this.isPaused = !1, this.startAutoplayTimer(), this.updateLiveRegion());
    },
    pause() {
      this.isPlaying && (this.isPaused = !0, this.stopAutoplayTimer(), this.updateLiveRegion());
    },
    resume() {
      !this.isPlaying || !this.isPaused || (this.isPaused = !1, this.startAutoplayTimer());
    },
    stop() {
      this.isPlaying = !1, this.isPaused = !1, this.stopAutoplayTimer();
    },
    toggle() {
      this.isPlaying && !this.isPaused ? this.pause() : this.isPlaying && this.isPaused ? this.resume() : this.play();
    },
    startAutoplayTimer() {
      this.stopAutoplayTimer(), this.autoplayTimer = setInterval(() => {
        this.shouldPause() || this.next();
      }, this.interval);
    },
    stopAutoplayTimer() {
      this.autoplayTimer && (clearInterval(this.autoplayTimer), this.autoplayTimer = null);
    },
    resetAutoplayTimer() {
      this.isPlaying && !this.isPaused && this.startAutoplayTimer();
    },
    shouldPause() {
      return this.isPaused || this.pauseOnHover && this.isHovered || this.pauseOnFocus && this.isFocused;
    },
    handleMouseEnter() {
      this.isHovered = !0, this.pauseOnHover && this.isPlaying && !this.isPaused && this.stopAutoplayTimer();
    },
    handleMouseLeave() {
      this.isHovered = !1, this.pauseOnHover && this.isPlaying && !this.isPaused && this.startAutoplayTimer();
    },
    handleFocusIn() {
      this.isFocused = !0, this.pauseOnFocus && this.isPlaying && !this.isPaused && this.stopAutoplayTimer();
    },
    handleFocusOut() {
      this.isFocused = !1, this.pauseOnFocus && this.isPlaying && !this.isPaused && this.startAutoplayTimer();
    },
    handleKeyDown(e) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault(), this.previous();
          break;
        case "ArrowRight":
          e.preventDefault(), this.next();
          break;
        case "Home":
          e.preventDefault(), this.goToSlide(0);
          break;
        case "End":
          e.preventDefault(), this.goToSlide(this.totalSlides - 1);
          break;
      }
    },
    announceSlide() {
      const e = this.$refs.liveRegion;
      e && (e.textContent = `Page ${this.currentPage + 1} of ${this.totalPages}`);
    },
    updateLiveRegion() {
      const e = this.$refs.liveRegion;
      e && (this.isPlaying && !this.isPaused ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"));
    },
    getGap() {
      const e = this.$refs.track;
      if (!e) return 0;
      const t = getComputedStyle(e);
      return parseFloat(t.gap) || 0;
    },
    isAtMaxScroll() {
      const e = this.$refs.track;
      if (!e) return !1;
      const t = e.scrollWidth - e.offsetWidth;
      return t > 0 && e.scrollLeft >= t - bh;
    },
    canGoNext() {
      return this.loop ? !0 : this.currentPage < this.totalPages - 1;
    },
    canGoPrevious() {
      return this.loop ? !0 : this.currentPage > 0;
    },
    isCurrentSlide(e) {
      return this.currentIndex === e;
    },
    isCurrentPage(e) {
      return this.currentPage === e;
    },
    getIndicatorLabel(e) {
      return `Go to page ${e + 1} of ${this.totalPages}`;
    },
    dispatchChangeEvent() {
      this.$dispatch(k.CAROUSEL_CHANGE, M({
        index: this.currentIndex,
        page: this.currentPage,
        totalSlides: this.totalSlides,
        totalPages: this.totalPages
      }));
    }
  };
}
function wg(s = {}) {
  return {
    ...W({ trigger: "click" }),
    maxVisible: s.maxVisible || null,
    totalItems: 0,
    collapsedItems: [],
    init() {
      this.$nextTick(() => {
        this.resolveElements(), this.setupPopover(), this.setupAnchor(), this.setupEventListeners(), this.setupLivewireCompat(), this.calculateCollapse();
      });
    },
    calculateCollapse() {
      if (!this.maxVisible) return;
      const e = this.$el.querySelectorAll("[data-spire-breadcrumb-item]");
      if (this.totalItems = e.length, this.totalItems <= this.maxVisible) return;
      const t = this.maxVisible - 1, n = 1, i = this.totalItems - t;
      this.collapsedItems = [], e.forEach((o, a) => {
        if (a >= n && a < i) {
          const l = o.querySelector("a, span"), h = o.querySelector("[data-spire-breadcrumb-icon]");
          this.collapsedItems.push({
            text: l?.textContent?.trim() || "",
            href: l?.getAttribute("href") || null,
            icon: h?.getAttribute("data-spire-icon-name") || null
          }), o.style.display = "none";
          const c = o.nextElementSibling;
          c?.hasAttribute("data-spire-breadcrumb-separator") && (c.style.display = "none");
        }
      });
      const r = this.$el.querySelector("[data-spire-breadcrumb-collapse]");
      r && this.collapsedItems.length > 0 && (r.style.display = "flex");
    },
    navigateTo(e) {
      e && (window.location.href = e), this.hide();
    },
    destroy() {
      this.hoverTimer && (clearTimeout(this.hoverTimer), this.hoverTimer = null);
    }
  };
}
function Tg(s = {}) {
  return {
    thumbnails: s.thumbnails ?? !0,
    counter: s.counter ?? !0,
    captions: s.captions ?? !0,
    download: s.download ?? !0,
    zoom: s.zoom ?? !0,
    loop: s.loop ?? !1,
    closeOnBackdrop: s.closeOnBackdrop ?? !0,
    isOpen: !1,
    currentIndex: 0,
    items: [],
    loading: !1,
    zoomed: !1,
    zoomLevel: 1,
    zoomPosition: { x: 0, y: 0 },
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
    initialPinchDistance: 0,
    eventListeners: [],
    preloadedImages: /* @__PURE__ */ new Map(),
    animationTimer: null,
    get currentItem() {
      return this.items[this.currentIndex] || null;
    },
    get canGoNext() {
      return this.loop || this.currentIndex < this.items.length - 1;
    },
    get canGoPrevious() {
      return this.loop || this.currentIndex > 0;
    },
    get counterText() {
      return `${this.currentIndex + 1} / ${this.items.length}`;
    },
    init() {
      this.dialog = this.$el, this.addDocumentListener("click", (e) => {
        const t = e.target.closest("[data-spire-lightbox]");
        t && (e.preventDefault(), this.openFromTrigger(t));
      }), this.addDocumentListener("keydown", (e) => {
        this.isOpen && this.handleKeyDown(e);
      }), this.dialog.addEventListener("close", () => {
        this.isOpen = !1, this.resetZoom(), this.dispatchEvent(k.LIGHTBOX_CLOSED);
      }), this.dialog.addEventListener("click", (e) => {
        this.closeOnBackdrop && e.target === this.dialog && this.close();
      });
    },
    openFromTrigger(e) {
      const t = e.dataset.spireLightboxGroup;
      if (t) {
        const n = document.querySelectorAll(
          `[data-spire-lightbox][data-spire-lightbox-group="${t}"]`
        );
        this.items = Array.from(n).map((i) => this.extractItemData(i)), this.currentIndex = Array.from(n).indexOf(e);
      } else
        this.items = [this.extractItemData(e)], this.currentIndex = 0;
      this.open();
    },
    extractItemData(e) {
      let t = e.dataset.spireLightboxSrc || e.src || e.href || e.querySelector("img")?.src || "", n = e.dataset.spireLightboxType || this.detectType(t), i = e.dataset.spireLightboxTitle || e.alt || e.title || "", r = e.dataset.spireLightboxThumbnail || (e.tagName === "IMG" ? e.src : "") || e.querySelector("img")?.src || t;
      return {
        src: t,
        type: n,
        title: i,
        thumbnail: r,
        element: e
      };
    },
    detectType(e) {
      if (!e) return "image";
      const t = e.toLowerCase();
      return t.includes("youtube.com") || t.includes("youtu.be") ? "youtube" : t.includes("vimeo.com") ? "vimeo" : t.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) ? "video" : t.match(/\.pdf(\?|$)/i) ? "pdf" : (t.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i), "image");
    },
    open() {
      this.isOpen = !0, this.loading = !0, this.resetZoom(), this.dialog.showModal(), this.preloadCurrent(), this.preloadAdjacent(), this.dispatchEvent(k.LIGHTBOX_OPENED, {
        index: this.currentIndex,
        item: this.currentItem
      });
    },
    close() {
      this.dialog.close();
    },
    next() {
      if (!this.canGoNext) return;
      const e = this.currentIndex;
      this.currentIndex < this.items.length - 1 ? this.currentIndex++ : this.loop && (this.currentIndex = 0), this.onItemChange(e);
    },
    previous() {
      if (!this.canGoPrevious) return;
      const e = this.currentIndex;
      this.currentIndex > 0 ? this.currentIndex-- : this.loop && (this.currentIndex = this.items.length - 1), this.onItemChange(e);
    },
    goTo(e) {
      if (e < 0 || e >= this.items.length || e === this.currentIndex) return;
      const t = this.currentIndex;
      this.currentIndex = e, this.onItemChange(t);
    },
    onItemChange(e) {
      this.loading = !0, this.resetZoom(), this.preloadCurrent(), this.preloadAdjacent();
      const t = this.$el.querySelector("[data-spire-lightbox-content]");
      t && (this.animationTimer && clearTimeout(this.animationTimer), t.setAttribute("data-animating", "true"), this.animationTimer = setTimeout(() => {
        t.removeAttribute("data-animating"), this.animationTimer = null;
      }, 250)), this.dispatchEvent(k.LIGHTBOX_CHANGED, {
        index: this.currentIndex,
        previousIndex: e,
        item: this.currentItem
      });
    },
    preloadCurrent() {
      const e = this.currentItem;
      if (!e || e.type !== "image") {
        this.loading = !1;
        return;
      }
      if (this.preloadedImages.has(e.src)) {
        this.loading = !1;
        return;
      }
      const t = new Image();
      t.onload = () => {
        this.preloadedImages.set(e.src, !0), this.currentItem?.src === e.src && (this.loading = !1);
      }, t.onerror = () => {
        this.currentItem?.src === e.src && (this.loading = !1);
      }, t.src = e.src;
    },
    preloadAdjacent() {
      [-1, 1].forEach((e) => {
        const t = this.currentIndex + e;
        if (t >= 0 && t < this.items.length) {
          const n = this.items[t];
          if (n.type === "image" && !this.preloadedImages.has(n.src)) {
            const i = new Image();
            i.onload = () => this.preloadedImages.set(n.src, !0), i.src = n.src;
          }
        }
      });
    },
    toggleZoom() {
      !this.zoom || this.currentItem?.type !== "image" || (this.zoomed ? this.resetZoom() : (this.zoomLevel = 2, this.zoomed = !0));
    },
    resetZoom() {
      this.zoomed = !1, this.zoomLevel = 1, this.zoomPosition = { x: 0, y: 0 };
    },
    handleZoomPan(e) {
      if (!this.zoomed) return;
      const t = e.currentTarget.getBoundingClientRect(), n = ((e.clientX - t.left) / t.width - 0.5) * 100, i = ((e.clientY - t.top) / t.height - 0.5) * 100;
      this.zoomPosition = { x: -n, y: -i };
    },
    async downloadCurrent() {
      const e = this.currentItem;
      if (e)
        try {
          const n = await (await fetch(e.src)).blob(), i = URL.createObjectURL(n), r = document.createElement("a");
          r.href = i, r.download = e.title || this.getFilename(e.src), document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(i);
        } catch {
          window.open(e.src, "_blank");
        }
    },
    getFilename(e) {
      try {
        return new URL(e, window.location.origin).pathname.split("/").pop() || "download";
      } catch {
        return "download";
      }
    },
    handleKeyDown(e) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault(), this.previous();
          break;
        case "ArrowRight":
          e.preventDefault(), this.next();
          break;
        case "Escape":
          e.preventDefault(), this.close();
          break;
        case "Home":
          e.preventDefault(), this.goTo(0);
          break;
        case "End":
          e.preventDefault(), this.goTo(this.items.length - 1);
          break;
        case " ":
        case "Enter":
          (e.target === this.dialog || e.target.closest("[data-spire-lightbox-content]")) && (e.preventDefault(), this.toggleZoom());
          break;
      }
    },
    handleTouchStart(e) {
      e.touches.length === 1 ? (this.touchStartX = e.touches[0].clientX, this.touchStartY = e.touches[0].clientY) : e.touches.length === 2 && (this.initialPinchDistance = this.getPinchDistance(e.touches));
    },
    handleTouchMove(e) {
      if (e.touches.length === 2 && this.zoom) {
        e.preventDefault();
        const t = this.getPinchDistance(e.touches), n = t / this.initialPinchDistance;
        this.zoomLevel = Math.min(Math.max(1, n * this.zoomLevel), 4), this.zoomed = this.zoomLevel > 1, this.initialPinchDistance = t;
      }
    },
    handleTouchEnd(e) {
      e.changedTouches.length === 1 && !this.zoomed && (this.touchEndX = e.changedTouches[0].clientX, this.touchEndY = e.changedTouches[0].clientY, this.handleSwipe());
    },
    handleSwipe() {
      const e = this.touchEndX - this.touchStartX, t = this.touchEndY - this.touchStartY;
      Math.abs(e) > 50 && Math.abs(e) > Math.abs(t) && (e > 0 ? this.previous() : this.next());
    },
    getPinchDistance(e) {
      return Math.hypot(
        e[0].clientX - e[1].clientX,
        e[0].clientY - e[1].clientY
      );
    },
    getEmbedUrl(e) {
      const t = e.src;
      if (e.type === "youtube") {
        const n = t.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
        if (n)
          return `https://www.youtube.com/embed/${n[1]}?autoplay=1`;
      }
      if (e.type === "vimeo") {
        const n = t.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (n)
          return `https://player.vimeo.com/video/${n[1]}?autoplay=1`;
      }
      return t;
    },
    addDocumentListener(e, t) {
      document.addEventListener(e, t), this.eventListeners.push({ target: document, event: e, handler: t });
    },
    dispatchEvent(e, t = {}) {
      window.dispatchEvent(new CustomEvent(e, {
        detail: M({
          value: this.currentIndex,
          ...t
        })
      }));
    },
    destroy() {
      this.eventListeners.forEach(({ target: e, event: t, handler: n }) => {
        e.removeEventListener(t, n);
      }), this.eventListeners = [], this.animationTimer && (clearTimeout(this.animationTimer), this.animationTimer = null), this.preloadedImages.clear();
    }
  };
}
function kg(s = {}) {
  return {
    value: s.value || [],
    normalizedData: [],
    fields: [],
    hoveredIndex: -1,
    cursorX: 0,
    width: 0,
    height: 0,
    gutter: s.gutter || [8, 8, 8, 8],
    xDomain: [0, 1],
    yDomain: [0, 1],
    xRange: [0, 100],
    yRange: [0, 100],
    curve: s.curve || "smooth",
    autoGutter: s.autoGutter !== !1,
    gutterAdjustTimer: null,
    axisConfigs: {},
    resizeObserver: null,
    init() {
      this.$nextTick(() => {
        this.scanAxisConfigs(), this.processData(), this.setupResizeObserver(), this.calculateDimensions();
      }), this.$watch("value", () => {
        this.processData();
      });
    },
    scanAxisConfigs() {
      this.axisConfigs = {}, this.$el.querySelectorAll("[data-spire-chart-axis]").forEach((e) => {
        const t = e.dataset.spireChartAxis;
        this.axisConfigs[t] = {
          axis: t,
          field: e.dataset.spireAxisField || null,
          position: e.dataset.spireAxisPosition || "bottom",
          tickConfig: JSON.parse(e.dataset.spireAxisTickConfig || "{}"),
          tickPrefix: e.dataset.spireAxisTickPrefix || "",
          tickSuffix: e.dataset.spireAxisTickSuffix || "",
          format: JSON.parse(e.dataset.spireAxisFormat || "{}")
        };
      });
    },
    measureRenderedAxisText() {
      const e = {
        x: { maxHeight: 0, maxWidth: 0 },
        y: { maxHeight: 0, maxWidth: 0 }
      };
      return this.$el.querySelectorAll('[data-axis-type="x"] text[data-spire-chart-tick]').forEach((i) => {
        try {
          const r = i.getBBox();
          e.x.maxHeight = Math.max(e.x.maxHeight, r.height), e.x.maxWidth = Math.max(e.x.maxWidth, r.width);
        } catch {
        }
      }), this.$el.querySelectorAll('[data-axis-type="y"] text[data-spire-chart-tick]').forEach((i) => {
        try {
          const r = i.getBBox();
          e.y.maxHeight = Math.max(e.y.maxHeight, r.height), e.y.maxWidth = Math.max(e.y.maxWidth, r.width);
        } catch {
        }
      }), e;
    },
    adjustGutterFromRenderedText() {
      if (!this.autoGutter) return !1;
      const e = this.measureRenderedAxisText(), t = this.parseGutter(this.gutter);
      let n = !1;
      const i = 8, r = this.axisConfigs.x;
      if (r && r.position !== "top" && e.x.maxHeight > 0) {
        const a = Math.ceil(e.x.maxHeight + i + 8);
        a > t[2] && (t[2] = a, n = !0);
        const l = this.$el.querySelectorAll('[data-axis-type="x"] text[data-spire-chart-tick]');
        if (l.length > 0) {
          const h = l[l.length - 1];
          try {
            const c = h.getBBox(), u = h.getAttribute("text-anchor") || "middle";
            let d = 0;
            u === "middle" ? d = c.width / 2 : u === "start" && (d = c.width);
            const f = Math.ceil(d) + 16;
            f > t[1] && (t[1] = f, n = !0);
          } catch {
          }
        }
      }
      const o = this.axisConfigs.y;
      if (o && o.position !== "right" && e.y.maxWidth > 0) {
        const a = Math.ceil(e.y.maxWidth + 16);
        a > t[3] && (t[3] = a, n = !0);
        const l = Math.ceil(e.y.maxHeight / 2 + i + 4);
        l > t[0] && (t[0] = l, n = !0);
      }
      return n ? (this.gutter = t, this.calculateDimensions(), !0) : !1;
    },
    processData() {
      const e = this.value;
      if (!e || e.length === 0) {
        this.normalizedData = [], this.fields = [];
        return;
      }
      typeof e[0] == "number" ? (this.normalizedData = e.map((t, n) => ({
        _index: n,
        value: t
      })), this.fields = ["value"]) : (this.normalizedData = e.map((t, n) => ({
        ...t,
        _index: n
      })), e.length > 0 && (this.fields = Object.keys(e[0]).filter((t) => !t.startsWith("_")))), this.calculateScales();
    },
    setupResizeObserver() {
      const e = this.$el.querySelector("[data-spire-chart-svg]");
      e && (this.resizeObserver = new ResizeObserver(() => {
        this.calculateDimensions();
      }), this.resizeObserver.observe(e));
    },
    calculateDimensions() {
      const e = this.$el.querySelector("[data-spire-chart-svg]");
      if (!e) return;
      const t = e.getBoundingClientRect();
      this.width = t.width, this.height = t.height;
      const [n, i, r, o] = this.parseGutter(this.gutter);
      this.xRange = [o, this.width - i], this.yRange = [n, this.height - r], this.calculateScales();
    },
    parseGutter(e) {
      if (typeof e == "number")
        return [e, e, e, e];
      if (typeof e == "string") {
        const t = e.split(/\s+/).map(Number);
        return t.length === 1 ? [t[0], t[0], t[0], t[0]] : t.length === 2 ? [t[0], t[1], t[0], t[1]] : t.length === 3 ? [t[0], t[1], t[2], t[1]] : t.slice(0, 4);
      }
      return Array.isArray(e) ? e : [8, 8, 8, 8];
    },
    calculateScales() {
      if (this.normalizedData.length === 0) return;
      this.xDomain = [0, this.normalizedData.length - 1];
      const e = this.axisConfigs.x?.field || null;
      let t = 1 / 0, n = -1 / 0;
      this.normalizedData.forEach((l) => {
        this.fields.forEach((h) => {
          if (h === e) return;
          const c = this.getNumericValue(l[h]);
          c !== null && (t = Math.min(t, c), n = Math.max(n, c));
        });
      });
      const i = (n - t) * 0.05 || 1, o = this.axisConfigs.y?.tickConfig?.start;
      let a;
      o !== "auto" && o !== void 0 && o !== null ? a = parseFloat(o) : a = Math.min(0, t - i), this.yDomain = [a, n + i];
    },
    getNumericValue(e) {
      if (typeof e == "number") return e;
      if (e instanceof Date) return e.getTime();
      if (typeof e == "string") {
        const t = e.trim();
        if (/^-?\d+\.?\d*$/.test(t))
          return parseFloat(t);
        const n = new Date(e);
        if (!isNaN(n.getTime())) return n.getTime();
      }
      return null;
    },
    scaleX(e) {
      const [t, n] = this.xDomain, [i, r] = this.xRange;
      return n === t ? i : i + (e - t) / (n - t) * (r - i);
    },
    scaleY(e) {
      const [t, n] = this.yDomain, [i, r] = this.yRange;
      return n === t ? r : r - (e - t) / (n - t) * (r - i);
    },
    generateLinePath(e, t = null) {
      if (this.normalizedData.length === 0) return "";
      const n = t || this.curve, i = this.getFieldPoints(e);
      return i.length === 0 ? "" : i.length === 1 ? `M ${i[0].x} ${i[0].y}` : n === "none" ? this.generateLinearPath(i) : this.generateSmoothPath(i);
    },
    generateAreaPath(e, t = null) {
      if (this.normalizedData.length === 0) return "";
      const n = t || this.curve, i = this.getFieldPoints(e);
      if (i.length === 0) return "";
      const r = this.scaleY(0);
      let o;
      n === "none" ? o = this.generateLinearPath(i) : o = this.generateSmoothPath(i);
      const a = i[i.length - 1], l = i[0];
      return `${o} L ${a.x} ${r} L ${l.x} ${r} Z`;
    },
    getFieldPoints(e) {
      return this.normalizedData.map((t, n) => {
        const i = this.getNumericValue(t[e] ?? t.value);
        return i === null ? null : {
          x: this.scaleX(n),
          y: this.scaleY(i)
        };
      }).filter((t) => t !== null);
    },
    generateLinearPath(e) {
      return e.map((t, n) => `${n === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
    },
    generateSmoothPath(e) {
      if (e.length < 2)
        return e.length === 1 ? `M ${e[0].x} ${e[0].y}` : "";
      let t = `M ${e[0].x} ${e[0].y}`;
      for (let n = 0; n < e.length - 1; n++) {
        const i = e[Math.max(0, n - 1)], r = e[n], o = e[n + 1], a = e[Math.min(e.length - 1, n + 2)], l = 0.5, h = r.x + (o.x - i.x) * l / 3, c = r.y + (o.y - i.y) * l / 3, u = o.x - (a.x - r.x) * l / 3, d = o.y - (a.y - r.y) * l / 3;
        t += ` C ${h} ${c}, ${u} ${d}, ${o.x} ${o.y}`;
      }
      return t;
    },
    generateTicks(e, t = {}) {
      const {
        count: n = 5,
        start: i = "auto",
        end: r = "auto",
        values: o = null
      } = t;
      return o && Array.isArray(o) ? o : e === "x" ? this.generateXTicks(n) : this.generateYTicks(n, i, r);
    },
    getAxisConfigByType(e) {
      return this.axisConfigs[e] || null;
    },
    getAxisTicksByType(e) {
      const t = this.getAxisConfigByType(e);
      return t ? this.generateTicks(t.axis, t.tickConfig) : [];
    },
    getTickXByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? this.scaleX(t) : n.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getTickYByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? n.position === "top" ? this.yRange[0] : this.yRange[1] : this.scaleY(t) : 0;
    },
    getTickLabelByType(e, t) {
      const n = this.getAxisConfigByType(e);
      if (!n) return "";
      let i = t;
      return n.axis === "x" && n.field && this.normalizedData[t] && (i = this.normalizedData[t][n.field]), n.tickPrefix + this.formatValue(i, n.format) + n.tickSuffix;
    },
    getTickAnchorByType(e, t = "middle") {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? t : n.position === "right" ? "start" : "end" : t;
    },
    getTickDxByType(e, t = "0") {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? t : n.position === "right" ? "8" : "-8" : t;
    },
    getTickDyByType(e, t = "0") {
      const n = this.getAxisConfigByType(e);
      return n && n.axis === "x" ? "8" : t;
    },
    getGridX1ByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? this.scaleX(t) : this.xRange[0] : 0;
    },
    getGridY1ByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? this.yRange[0] : this.scaleY(t) : 0;
    },
    getGridX2ByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? this.scaleX(t) : this.xRange[1] : 0;
    },
    getGridY2ByType(e, t) {
      const n = this.getAxisConfigByType(e);
      return n ? n.axis === "x" ? this.yRange[1] : this.scaleY(t) : 0;
    },
    getAxisLineX1ByType(e) {
      const t = this.getAxisConfigByType(e);
      return t ? t.axis === "x" ? this.xRange[0] : t.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getAxisLineY1ByType(e) {
      const t = this.getAxisConfigByType(e);
      return t ? t.axis === "x" ? t.position === "top" ? this.yRange[0] : this.yRange[1] : this.yRange[0] : 0;
    },
    getAxisLineX2ByType(e) {
      const t = this.getAxisConfigByType(e);
      return t ? t.axis === "x" ? this.xRange[1] : t.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getAxisLineY2ByType(e) {
      const t = this.getAxisConfigByType(e);
      return t ? t.axis === "x" ? t.position === "top" ? this.yRange[0] : this.yRange[1] : this.yRange[1] : 0;
    },
    getAxisConfig(e) {
      const t = e.closest("[data-spire-chart-axis]");
      return t ? {
        axis: t.dataset.spireChartAxis || "x",
        field: t.dataset.spireAxisField || null,
        position: t.dataset.spireAxisPosition || "bottom",
        tickConfig: JSON.parse(t.dataset.spireAxisTickConfig || "{}"),
        tickPrefix: t.dataset.spireAxisTickPrefix || "",
        tickSuffix: t.dataset.spireAxisTickSuffix || "",
        format: JSON.parse(t.dataset.spireAxisFormat || "{}")
      } : null;
    },
    getAxisTicks(e) {
      const t = this.getAxisConfig(e);
      return t ? this.generateTicks(t.axis, t.tickConfig) : [];
    },
    getTickX(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? this.scaleX(t) : n.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getTickY(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? n.position === "top" ? this.yRange[0] : this.yRange[1] : this.scaleY(t) : 0;
    },
    getTickLabel(e, t) {
      const n = this.getAxisConfig(e);
      if (!n) return "";
      let i = t;
      return n.axis === "x" && n.field && this.normalizedData[t] && (i = this.normalizedData[t][n.field]), n.tickPrefix + this.formatValue(i, n.format) + n.tickSuffix;
    },
    getTickAnchor(e, t = "middle") {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? t : n.position === "right" ? "start" : "end" : t;
    },
    getTickDx(e, t = "0") {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? t : n.position === "right" ? "8" : "-8" : t;
    },
    getTickDy(e, t = "0") {
      const n = this.getAxisConfig(e);
      return n && n.axis === "x" ? "8" : t;
    },
    getGridX1(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? this.scaleX(t) : this.xRange[0] : 0;
    },
    getGridY1(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? this.yRange[0] : this.scaleY(t) : 0;
    },
    getGridX2(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? this.scaleX(t) : this.xRange[1] : 0;
    },
    getGridY2(e, t) {
      const n = this.getAxisConfig(e);
      return n ? n.axis === "x" ? this.yRange[1] : this.scaleY(t) : 0;
    },
    getAxisLineX1(e) {
      const t = this.getAxisConfig(e);
      return t ? t.axis === "x" ? this.xRange[0] : t.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getAxisLineY1(e) {
      const t = this.getAxisConfig(e);
      return t ? t.axis === "x" ? t.position === "top" ? this.yRange[0] : this.yRange[1] : this.yRange[0] : 0;
    },
    getAxisLineX2(e) {
      const t = this.getAxisConfig(e);
      return t ? t.axis === "x" ? this.xRange[1] : t.position === "right" ? this.xRange[1] : this.xRange[0] : 0;
    },
    getAxisLineY2(e) {
      const t = this.getAxisConfig(e);
      return t ? t.axis === "x" ? t.position === "top" ? this.yRange[0] : this.yRange[1] : this.yRange[1] : 0;
    },
    generateXTicks(e) {
      if (this.normalizedData.length === 0) return [];
      const t = this.normalizedData.length;
      if (t <= e)
        return this.normalizedData.map((r, o) => o);
      const n = [], i = (t - 1) / (e - 1);
      for (let r = 0; r < e; r++)
        n.push(Math.round(r * i));
      return n;
    },
    generateYTicks(e, t, n) {
      let [i, r] = this.yDomain;
      t === 0 || t === "0" ? i = 0 : t !== "auto" && t !== "min" && !isNaN(t) && (i = Number(t)), n !== "auto" && n !== "max" && !isNaN(n) && (r = Number(n));
      const a = (r - i) / (e - 1), l = Math.pow(10, Math.floor(Math.log10(a))), h = a / l;
      let c;
      h <= 1 ? c = l : h <= 2 ? c = 2 * l : h <= 5 ? c = 5 * l : c = 10 * l;
      const u = Math.floor(i / c) * c, d = Math.ceil(r / c) * c, f = [];
      for (let p = u; p <= d; p += c)
        f.push(Math.round(p * 1e10) / 1e10);
      return f;
    },
    getValueAtIndex(e, t) {
      if (e < 0 || e >= this.normalizedData.length) return null;
      const n = this.normalizedData[e];
      return n[t] ?? n.value ?? null;
    },
    getCurrentValue(e, t = null) {
      const n = this.hoveredIndex >= 0 ? this.hoveredIndex : this.normalizedData.length - 1;
      return this.getValueAtIndex(n, e) ?? t;
    },
    formatValue(e, t = {}) {
      if (e == null) return "";
      const n = this.parseDate(e);
      return n ? this.formatDate(n, t) : this.formatNumber(e, t);
    },
    formatNumber(e, t = {}) {
      try {
        return new Intl.NumberFormat(void 0, t).format(e);
      } catch {
        return String(e);
      }
    },
    formatDate(e, t = {}) {
      try {
        return new Intl.DateTimeFormat(void 0, t).format(e);
      } catch {
        return String(e);
      }
    },
    parseDate(e) {
      if (e instanceof Date) return e;
      if (typeof e == "string") {
        const t = new Date(e);
        if (!isNaN(t.getTime())) return t;
      }
      return null;
    },
    handleMouseMove(e) {
      const t = e.currentTarget;
      if (!t) return;
      const n = t.getBoundingClientRect(), i = e.clientX - n.left;
      this.cursorX = i, this.hoveredIndex = this.findNearestIndex(i);
    },
    handleMouseLeave() {
      this.hoveredIndex = -1;
    },
    findNearestIndex(e) {
      if (this.normalizedData.length === 0) return -1;
      let t = 1 / 0, n = -1;
      return this.normalizedData.forEach((i, r) => {
        const o = this.scaleX(r), a = Math.abs(e - o);
        a < t && (t = a, n = r);
      }), n;
    },
    getCursorX() {
      return this.hoveredIndex < 0 ? 0 : this.scaleX(this.hoveredIndex);
    },
    getPointY(e, t) {
      const n = this.getNumericValue(this.getValueAtIndex(e, t));
      return n === null ? 0 : this.scaleY(n);
    },
    getPoints(e) {
      return this.normalizedData.map((t, n) => ({
        x: this.scaleX(n),
        y: this.scaleY(this.getNumericValue(t[e] ?? t.value) || 0),
        index: n
      }));
    },
    renderPoints(e, t) {
      const n = "http://www.w3.org/2000/svg", i = this.getPoints(t), r = e.dataset.spirePointR || "4", o = e.dataset.spirePointStrokeWidth || "2", a = e.dataset.spirePointClass || "";
      e.innerHTML = "", i.forEach((l, h) => {
        const c = document.createElementNS(n, "circle");
        c.setAttribute("cx", l.x), c.setAttribute("cy", l.y), c.setAttribute("r", r), c.setAttribute("stroke-width", o), c.setAttribute("fill", "var(--color-surface, white)"), c.setAttribute("stroke", "currentColor"), c.setAttribute("data-spire-chart-point", ""), c.setAttribute("data-spire-index", h), a && c.setAttribute("class", a), e.appendChild(c);
      });
    },
    renderTicks(e, t) {
      const n = "http://www.w3.org/2000/svg", i = this.getAxisTicksByType(t), r = e.dataset.spireTickClass || "", o = e.dataset.spireTickDy || "0", a = e.dataset.spireTickDx || "0", l = e.dataset.spireTickAnchor || "middle";
      e.innerHTML = "", i.forEach((h, c) => {
        const u = document.createElementNS(n, "text");
        u.setAttribute("x", this.getTickXByType(t, h)), u.setAttribute("y", this.getTickYByType(t, h));
        let d;
        t === "x" ? c === 0 ? d = "start" : c === i.length - 1 ? d = "end" : d = "middle" : d = this.getTickAnchorByType(t, l), u.setAttribute("text-anchor", d), u.setAttribute("dominant-baseline", t === "x" ? "hanging" : "middle"), u.setAttribute("dx", this.getTickDxByType(t, a)), u.setAttribute("dy", this.getTickDyByType(t, o)), u.setAttribute("fill", "currentColor"), u.setAttribute("data-spire-chart-tick", ""), u.textContent = this.getTickLabelByType(t, h), r && u.setAttribute("class", r), e.appendChild(u);
      }), this.autoGutter && (this.gutterAdjustTimer && clearTimeout(this.gutterAdjustTimer), this.gutterAdjustTimer = setTimeout(() => {
        this.$nextTick(() => {
          this.adjustGutterFromRenderedText();
        });
      }, 50));
    },
    renderGridLines(e, t) {
      const n = "http://www.w3.org/2000/svg", i = this.getAxisTicksByType(t), r = e.dataset.spireGridClass || "";
      e.innerHTML = "", i.forEach((o) => {
        const a = document.createElementNS(n, "line");
        a.setAttribute("x1", this.getGridX1ByType(t, o)), a.setAttribute("y1", this.getGridY1ByType(t, o)), a.setAttribute("x2", this.getGridX2ByType(t, o)), a.setAttribute("y2", this.getGridY2ByType(t, o)), a.setAttribute("stroke", "currentColor"), a.setAttribute("data-spire-chart-grid-line", ""), r && a.setAttribute("class", r), e.appendChild(a);
      });
    },
    hasNegativeValues() {
      return this.yDomain[0] < 0;
    },
    getZeroY() {
      return this.scaleY(0);
    },
    setGutter(e) {
      this.gutter = this.parseGutter(e), this.calculateDimensions();
    },
    destroy() {
      this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.gutterAdjustTimer && (clearTimeout(this.gutterAdjustTimer), this.gutterAdjustTimer = null);
    }
  };
}
let xi = null, Ut = null;
async function Dg(s) {
  return xi || Ut || (Ut = fetch(s).then((e) => {
    if (!e.ok)
      throw new Error("Failed to fetch icons");
    return e.json();
  }).then((e) => (xi = e, e)).catch((e) => (console.error("Error fetching icons:", e), Ut = null, {})), Ut);
}
function Eg(s = {}) {
  return {
    findScrollableAncestor(e) {
      let t = e.parentElement;
      for (; t && t !== document.body; ) {
        const { overflow: n, overflowY: i } = window.getComputedStyle(t);
        if (["auto", "scroll"].includes(n) || ["auto", "scroll"].includes(i))
          return t;
        t = t.parentElement;
      }
      return null;
    },
    ...W({
      trigger: "click",
      onInit() {
        this.setupKeyboard(), this.$nextTick(() => {
          this.value && (this.selectedIcon = this.value);
        }), this.$watch("value", (e) => {
          this.selectedIcon = e || "";
        }), this.$watch("searchQuery", () => {
          this.$nextTick(() => {
            this.updateItems(), this.resetHighlight();
          });
        }), this.$watch("open", (e) => {
          e ? (!this.iconsLoaded && !this.isLoading && this.loadIcons(), this.$nextTick(() => {
            const t = this.$refs.searchInputWrapper;
            if (t) {
              const n = t.querySelector('input[type="text"]');
              if (n) {
                const i = this.findScrollableAncestor(n), r = i?.scrollTop;
                this.$focus.focus(n), i && r !== void 0 && (i.scrollTop = r);
              }
            }
          })) : (this.searchQuery = "", this.resetHighlight());
        });
      }
    }),
    ...Ze({
      pattern: "activedescendant",
      role: "listbox",
      itemSelector: '[role="option"]:not([aria-disabled="true"])',
      orientation: "vertical",
      wrap: !0,
      onSelect(e) {
        const t = e.getAttribute("data-icon-name");
        t && this.selectIcon(t);
      }
    }),
    value: s.value || "",
    selectedIcon: s.value || "",
    placeholder: s.placeholder || "Select an icon",
    searchPlaceholder: s.searchPlaceholder || "Search icons...",
    searchQuery: "",
    icons: [],
    iconHtmlCache: {},
    name: s.name || null,
    clearable: s.clearable || !1,
    iconsEndpoint: s.iconsEndpoint || "/spire-ui/api/icons",
    isLoading: !1,
    iconsLoaded: !1,
    get filteredIcons() {
      if (!this.searchQuery)
        return this.icons;
      const e = this.searchQuery.toLowerCase();
      return this.icons.filter(
        (t) => t.toLowerCase().includes(e)
      );
    },
    async loadIcons() {
      this.isLoading = !0;
      try {
        const e = await Dg(this.iconsEndpoint);
        this.icons = Object.keys(e), this.iconHtmlCache = e, this.iconsLoaded = !0;
      } catch (e) {
        console.error("Failed to load icons:", e);
      } finally {
        this.isLoading = !1;
      }
    },
    getIconHtml(e) {
      return this.iconHtmlCache[e] || "";
    },
    getSelectedIconHtml() {
      return this.selectedIcon ? this.iconHtmlCache[this.selectedIcon] ? this.iconHtmlCache[this.selectedIcon] : (!this.iconsLoaded && !this.isLoading && this.loadIcons(), "") : "";
    },
    selectIcon(e) {
      const t = this.value;
      this.value = e, this.selectedIcon = e, this.hide(), this.$dispatch(k.SELECT_CHANGED, M({
        id: this.$id("icon-picker"),
        name: this.name,
        value: e,
        previousValue: t,
        metadata: { icon: e }
      }));
    },
    clearSelection() {
      const e = this.value;
      this.value = "", this.selectedIcon = "", this.$dispatch(k.SELECT_CLEARED, M({
        id: this.$id("icon-picker"),
        name: this.name,
        value: "",
        previousValue: e
      }));
    },
    destroy() {
      W().destroy?.call(this), Ze().destroy?.call(this);
    }
  };
}
const Cg = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#78716c",
  "#71717a",
  "#000000"
];
function Si(s, e, t) {
  e /= 100, t /= 100;
  const n = (1 - Math.abs(2 * t - 1)) * e, i = n * (1 - Math.abs(s / 60 % 2 - 1)), r = t - n / 2;
  let o = 0, a = 0, l = 0;
  return 0 <= s && s < 60 ? (o = n, a = i, l = 0) : 60 <= s && s < 120 ? (o = i, a = n, l = 0) : 120 <= s && s < 180 ? (o = 0, a = n, l = i) : 180 <= s && s < 240 ? (o = 0, a = i, l = n) : 240 <= s && s < 300 ? (o = i, a = 0, l = n) : 300 <= s && s < 360 && (o = n, a = 0, l = i), o = Math.round((o + r) * 255), a = Math.round((a + r) * 255), l = Math.round((l + r) * 255), "#" + [o, a, l].map((h) => h.toString(16).padStart(2, "0")).join("");
}
function Mg(s) {
  s = s.replace("#", ""), s.length === 3 && (s = s.split("").map((h) => h + h).join(""));
  const e = parseInt(s.slice(0, 2), 16) / 255, t = parseInt(s.slice(2, 4), 16) / 255, n = parseInt(s.slice(4, 6), 16) / 255, i = Math.max(e, t, n), r = Math.min(e, t, n);
  let o, a, l = (i + r) / 2;
  if (i === r)
    o = a = 0;
  else {
    const h = i - r;
    switch (a = l > 0.5 ? h / (2 - i - r) : h / (i + r), i) {
      case e:
        o = ((t - n) / h + (t < n ? 6 : 0)) / 6;
        break;
      case t:
        o = ((n - e) / h + 2) / 6;
        break;
      case n:
        o = ((e - t) / h + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(o * 360),
    s: Math.round(a * 100),
    l: Math.round(l * 100)
  };
}
function ia(s) {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(s);
}
function Ag(s = {}) {
  return {
    findScrollableAncestor(e) {
      let t = e.parentElement;
      for (; t && t !== document.body; ) {
        const { overflow: n, overflowY: i } = window.getComputedStyle(t);
        if (["auto", "scroll"].includes(n) || ["auto", "scroll"].includes(i))
          return t;
        t = t.parentElement;
      }
      return null;
    },
    ...W({
      trigger: "click",
      onInit() {
        this.$nextTick(() => {
          this.value && this.setColorFromHex(this.value);
        }), this.$watch("value", (e) => {
          e && e !== this.currentHex ? this.setColorFromHex(e) : e || this.resetToDefault();
        }), this.$watch("open", (e) => {
          e && this.$nextTick(() => {
            this.drawGradient();
            const t = this.$refs.hexInputWrapper;
            if (t) {
              const n = t.querySelector('input[type="text"]');
              if (n) {
                const i = this.findScrollableAncestor(n), r = i?.scrollTop;
                this.$focus.focus(n), n.select(), i && r !== void 0 && (i.scrollTop = r);
              }
            }
          });
        });
      }
    }),
    value: s.value || "",
    placeholder: s.placeholder || "Select a color",
    presets: s.presets || Cg,
    name: s.name || null,
    clearable: s.clearable || !1,
    hue: 210,
    saturation: 100,
    lightness: 50,
    hexInput: "",
    isDraggingGradient: !1,
    isDraggingHue: !1,
    get currentHex() {
      return Si(this.hue, this.saturation, this.lightness);
    },
    get hueColor() {
      return Si(this.hue, 100, 50);
    },
    setColorFromHex(e) {
      if (!e || !ia(e)) return;
      e = e.startsWith("#") ? e : "#" + e;
      const t = Mg(e);
      this.hue = t.h, this.saturation = t.s, this.lightness = t.l, this.hexInput = e.toUpperCase();
    },
    resetToDefault() {
      this.hue = 210, this.saturation = 100, this.lightness = 50, this.hexInput = "";
    },
    drawGradient() {
      const e = this.$refs.gradientCanvas;
      if (!e) return;
      const t = e.getContext("2d"), n = e.width, i = e.height;
      for (let r = 0; r < n; r++)
        for (let o = 0; o < i; o++) {
          const a = r / n * 100, l = 100 - o / i * 100;
          t.fillStyle = Si(this.hue, a, l), t.fillRect(r, o, 1, 1);
        }
    },
    handleGradientMouseDown(e) {
      this.isDraggingGradient = !0, this.updateGradientFromEvent(e);
    },
    handleGradientMouseMove(e) {
      this.isDraggingGradient && this.updateGradientFromEvent(e);
    },
    handleGradientMouseUp() {
      this.isDraggingGradient = !1;
    },
    updateGradientFromEvent(e) {
      const t = this.$refs.gradientCanvas;
      if (!t) return;
      const n = t.getBoundingClientRect(), i = Math.max(0, Math.min(e.clientX - n.left, n.width)), r = Math.max(0, Math.min(e.clientY - n.top, n.height));
      this.saturation = Math.round(i / n.width * 100), this.lightness = Math.round(100 - r / n.height * 100), this.hexInput = this.currentHex.toUpperCase();
    },
    handleHueMouseDown(e) {
      this.isDraggingHue = !0, this.updateHueFromEvent(e);
    },
    handleHueMouseMove(e) {
      this.isDraggingHue && this.updateHueFromEvent(e);
    },
    handleHueMouseUp() {
      this.isDraggingHue = !1;
    },
    updateHueFromEvent(e) {
      const t = this.$refs.hueSlider;
      if (!t) return;
      const n = t.getBoundingClientRect(), i = Math.max(0, Math.min(e.clientX - n.left, n.width));
      this.hue = Math.round(i / n.width * 360), this.hexInput = this.currentHex.toUpperCase(), this.$nextTick(() => this.drawGradient());
    },
    handleHexInput(e) {
      let t = e.target.value.trim();
      t.startsWith("#") || (t = "#" + t), ia(t) && (this.setColorFromHex(t), this.$nextTick(() => this.drawGradient()));
    },
    selectPreset(e) {
      this.setColorFromHex(e), this.$nextTick(() => this.drawGradient());
    },
    selectColor() {
      const e = this.value, t = this.currentHex.toUpperCase();
      this.value = t, this.hide(), this.$dispatch(k.SELECT_CHANGED, M({
        id: this.$id("color-picker"),
        name: this.name,
        value: t,
        previousValue: e,
        metadata: { color: t }
      }));
    },
    clearSelection() {
      const e = this.value;
      this.value = "", this.resetToDefault(), this.$dispatch(k.SELECT_CLEARED, M({
        id: this.$id("color-picker"),
        name: this.name,
        value: "",
        previousValue: e
      }));
    },
    destroy() {
      W().destroy?.call(this);
    }
  };
}
function Og(s = {}) {
  const e = /* @__PURE__ */ new Date();
  return {
    events: s.events ?? [],
    view: s.view ?? "month",
    currentDate: s.date ? new Date(s.date) : e,
    locale: s.locale ?? null,
    firstDayOfWeek: s.firstDayOfWeek ?? 0,
    maxEventsPerDay: s.maxEventsPerDay ?? 3,
    weekends: s.weekends ?? !0,
    startHour: s.startHour ?? 6,
    endHour: s.endHour ?? 22,
    showViewSwitcher: s.showViewSwitcher ?? !0,
    mobileBreakpoint: s.mobileBreakpoint ?? 640,
    isMobile: !1,
    displayMonth: null,
    displayYear: null,
    weeks: [],
    dayNames: [],
    monthName: "",
    focusedDate: null,
    announcement: "",
    weekEventLayouts: [],
    morePopoverTrigger: null,
    weekDays: [],
    weekStart: null,
    weekEnd: null,
    currentDayDate: null,
    timeSlots: [],
    allDayEvents: [],
    timedEvents: [],
    morePopover: {
      open: !1,
      date: null,
      events: [],
      x: 0,
      y: 0
    },
    init() {
      this.displayMonth = this.currentDate.getMonth(), this.displayYear = this.currentDate.getFullYear(), this.focusedDate = this.getInitialFocusDate(), this.checkMobile(), window.addEventListener("resize", () => this.handleResize()), this.isMobile && this.view !== "day" && (this.view = "day"), this.updateCalendar(), this.$watch("events", () => {
        this.updateCalendar();
      }), this.$watch("view", () => {
        this.updateCalendar(), this.dispatchViewChange();
      });
    },
    checkMobile() {
      this.isMobile = window.innerWidth < this.mobileBreakpoint;
    },
    handleResize() {
      const t = this.isMobile;
      this.checkMobile(), this.isMobile && !t && this.view !== "day" && (this.view = "day");
    },
    getLocale() {
      return this.locale || navigator.language || "en-US";
    },
    getInitialFocusDate() {
      const t = C.today(), n = new Date(t);
      return n.getMonth() === this.displayMonth && n.getFullYear() === this.displayYear ? t : C.formatDate(this.displayYear, this.displayMonth, 1);
    },
    updateCalendar() {
      this.generateTimeSlots(), this.view === "month" ? (this.weeks = this.generateMonthGrid(), this.weekEventLayouts = this.calculateWeekEventLayouts()) : this.view === "week" ? this.generateWeekGrid() : this.view === "day" && this.generateDayData(), this.dayNames = C.getDayNames(
        this.firstDayOfWeek,
        this.getLocale(),
        "short"
      ), this.monthName = we.getMonthName(
        this.displayMonth,
        "long",
        this.getLocale()
      );
    },
    generateMonthGrid() {
      const t = [], n = new Date(this.displayYear, this.displayMonth, 1), i = new Date(this.displayYear, this.displayMonth + 1, 0);
      let o = n.getDay() - this.firstDayOfWeek;
      o < 0 && (o += 7);
      const a = new Date(n);
      a.setDate(a.getDate() - o);
      const l = new Date(a), h = C.today();
      for (let c = 0; c < 6; c++) {
        const u = [];
        for (let d = 0; d < 7; d++) {
          const f = C.formatDate(
            l.getFullYear(),
            l.getMonth(),
            l.getDate()
          ), p = l.getDay(), m = p === 0 || p === 6;
          if (!this.weekends && m) {
            l.setDate(l.getDate() + 1);
            continue;
          }
          u.push({
            date: f,
            day: l.getDate(),
            isCurrentMonth: l.getMonth() === this.displayMonth,
            isToday: f === h,
            isWeekend: m,
            events: this.getEventsForDate(f)
          }), l.setDate(l.getDate() + 1);
        }
        if (u.length > 0 && t.push(u), l.getMonth() !== this.displayMonth && l > i)
          break;
      }
      return t;
    },
    generateTimeSlots() {
      const t = [];
      for (let n = this.startHour; n < this.endHour; n++)
        t.push({
          hour: n,
          minute: 0,
          label: this.formatHourLabel(n),
          key: `${n}:00`
        });
      this.timeSlots = t;
    },
    formatHourLabel(t) {
      const n = /* @__PURE__ */ new Date();
      return n.setHours(t, 0, 0), new Intl.DateTimeFormat(this.getLocale(), {
        hour: "numeric",
        hour12: !0
      }).format(n);
    },
    generateWeekGrid() {
      C.formatDate(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      );
      let n = this.currentDate.getDay() - this.firstDayOfWeek;
      n < 0 && (n += 7);
      const i = new Date(this.currentDate);
      i.setDate(i.getDate() - n);
      const r = new Date(i);
      r.setDate(r.getDate() + 6), this.weekStart = C.formatDate(
        i.getFullYear(),
        i.getMonth(),
        i.getDate()
      ), this.weekEnd = C.formatDate(
        r.getFullYear(),
        r.getMonth(),
        r.getDate()
      );
      const o = [], a = new Date(i), l = C.today();
      for (let h = 0; h < 7; h++) {
        const c = C.formatDate(
          a.getFullYear(),
          a.getMonth(),
          a.getDate()
        ), u = a.getDay() === 0 || a.getDay() === 6;
        if (!this.weekends && u) {
          a.setDate(a.getDate() + 1);
          continue;
        }
        o.push({
          date: c,
          day: a.getDate(),
          dayName: this.getDayName(a.getDay()),
          isToday: c === l,
          isWeekend: u
        }), a.setDate(a.getDate() + 1);
      }
      this.weekDays = o, this.categorizeEventsForTimeGrid(this.weekStart, this.weekEnd);
    },
    getDayName(t) {
      const n = /* @__PURE__ */ new Date();
      return n.setDate(n.getDate() - n.getDay() + t), new Intl.DateTimeFormat(this.getLocale(), { weekday: "short" }).format(n);
    },
    generateDayData() {
      this.currentDayDate = C.formatDate(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      ), this.categorizeEventsForTimeGrid(this.currentDayDate, this.currentDayDate);
    },
    categorizeEventsForTimeGrid(t, n) {
      const i = this.events.filter((r) => {
        const o = this.getDatePart(r.start), a = r.end ? this.getDatePart(r.end) : o;
        return o <= n && a >= t;
      });
      this.allDayEvents = i.filter((r) => r.allDay), this.timedEvents = i.filter((r) => !r.allDay);
    },
    getEventsForDate(t) {
      return this.events.filter((n) => {
        const i = this.getDatePart(n.start), r = n.end ? this.getDatePart(n.end) : i;
        return t >= i && t <= r;
      }).sort((n, i) => n.allDay && !i.allDay ? -1 : !n.allDay && i.allDay ? 1 : new Date(n.start) - new Date(i.start));
    },
    getSingleDayEvents(t) {
      return t.events.filter((n) => !this.isMultiDayEvent(n));
    },
    getVisibleSingleDayEvents(t) {
      return this.getSingleDayEvents(t).slice(0, this.maxEventsPerDay);
    },
    getHiddenSingleDayEventsCount(t) {
      return Math.max(0, this.getSingleDayEvents(t).length - this.maxEventsPerDay);
    },
    getVisibleEvents(t) {
      return t.events.slice(0, this.maxEventsPerDay);
    },
    getHiddenEventsCount(t) {
      return Math.max(0, t.events.length - this.maxEventsPerDay);
    },
    getDatePart(t) {
      return t ? t.split(" ")[0].split("T")[0] : null;
    },
    getTimePart(t) {
      if (!t) return null;
      const n = t.split(" ");
      if (n.length > 1) return n[1];
      const i = t.split("T");
      return i.length > 1 ? i[1].substring(0, 5) : null;
    },
    formatEventTime(t) {
      if (t.allDay) return "";
      const n = this.getTimePart(t.start);
      if (!n) return "";
      try {
        const [i, r] = n.split(":"), o = /* @__PURE__ */ new Date();
        return o.setHours(parseInt(i, 10), parseInt(r, 10)), new Intl.DateTimeFormat(this.getLocale(), {
          hour: "numeric",
          minute: "2-digit"
        }).format(o);
      } catch {
        return n;
      }
    },
    formatEventTimeRange(t) {
      if (t.allDay) return "";
      const n = (o) => {
        if (!o) return null;
        const a = this.getTimePart(o);
        if (!a) return null;
        try {
          const [l, h] = a.split(":"), c = /* @__PURE__ */ new Date();
          return c.setHours(parseInt(l, 10), parseInt(h, 10)), new Intl.DateTimeFormat(this.getLocale(), {
            hour: "numeric",
            minute: "2-digit"
          }).format(c);
        } catch {
          return a;
        }
      }, i = n(t.start), r = n(t.end);
      return i && r ? `${i} - ${r}` : i || "";
    },
    getEventColor(t) {
      const n = {
        blue: "var(--color-primary)",
        red: "var(--color-danger)",
        green: "var(--color-success)",
        yellow: "var(--color-warning)",
        purple: "#8b5cf6",
        pink: "#ec4899",
        orange: "#f97316",
        teal: "#14b8a6"
      };
      return t.color?.startsWith("#") || t.color?.startsWith("rgb") ? t.color : n[t.color] || n.blue;
    },
    // ==================== Multi-Day Event Slot Assignment ====================
    getEventDurationInDays(t) {
      const n = this.getDatePart(t.start), i = t.end ? this.getDatePart(t.end) : n, r = new Date(n), o = new Date(i);
      return Math.ceil((o - r) / (1e3 * 60 * 60 * 24)) + 1;
    },
    getEventsForWeek(t, n) {
      return this.events.filter((i) => {
        const r = this.getDatePart(i.start), o = i.end ? this.getDatePart(i.end) : r;
        return r <= n && o >= t;
      });
    },
    findAvailableSlot(t, n, i) {
      let r = 0;
      for (; ; ) {
        if (!(t[r] || []).some(
          ([l, h]) => !(i < l || n > h)
        )) return r;
        if (r++, r > 10) break;
      }
      return r;
    },
    assignEventSlots(t, n) {
      const i = {}, r = {}, a = [...t.filter((h) => this.isMultiDayEvent(h))].sort((h, c) => {
        const u = this.getEventDurationInDays(h), d = this.getEventDurationInDays(c);
        return u !== d ? d - u : new Date(h.start) - new Date(c.start);
      }), l = n.map((h) => h.date);
      for (const h of a) {
        const c = this.getDatePart(h.start), u = h.end ? this.getDatePart(h.end) : c;
        let d = c < l[0] ? 0 : l.indexOf(c), f = u > l[l.length - 1] ? l.length - 1 : l.indexOf(u);
        d === -1 && (d = 0), f === -1 && (f = l.length - 1);
        const p = this.findAvailableSlot(r, d, f);
        r[p] || (r[p] = []), r[p].push([d, f]), i[h.id] = {
          slot: p,
          startCol: d,
          endCol: f,
          spanDays: f - d + 1,
          isStart: c >= l[0],
          isEnd: u <= l[l.length - 1]
        };
      }
      return { assignments: i, maxSlots: Object.keys(r).length };
    },
    calculateWeekEventLayouts() {
      const t = [];
      for (let n = 0; n < this.weeks.length; n++) {
        const i = this.weeks[n];
        if (i.length === 0) continue;
        const r = i[0].date, o = i[i.length - 1].date, a = this.getEventsForWeek(r, o), { assignments: l, maxSlots: h } = this.assignEventSlots(a, i);
        t.push({
          weekIndex: n,
          weekStart: r,
          weekEnd: o,
          slots: l,
          maxSlots: h
        });
      }
      return t;
    },
    getSpanningEventsForWeek(t) {
      if (!this.weeks || !this.weeks[t]) return [];
      const n = this.weeks[t], i = n[0].date, r = n[n.length - 1].date;
      return this.events.filter((o) => {
        if (!this.isMultiDayEvent(o)) return !1;
        const a = this.getDatePart(o.start), l = o.end ? this.getDatePart(o.end) : a;
        return a <= r && l >= i;
      });
    },
    getEventLayout(t, n) {
      return !this.weekEventLayouts || !this.weekEventLayouts[n] ? { slot: 0, startCol: 0, endCol: 0, spanDays: 1, isStart: !0, isEnd: !0 } : this.weekEventLayouts[n].slots[t.id] || { slot: 0, startCol: 0, endCol: 0, spanDays: 1, isStart: !0, isEnd: !0 };
    },
    getSpanningEventStyle(t, n) {
      const i = this.getEventLayout(t, n), r = this.weeks[n]?.length || 7, o = i.startCol / r * 100, a = i.spanDays / r * 100, h = i.slot * 22;
      return {
        "--event-color": this.getEventColor(t),
        left: `calc(${o}% + 4px)`,
        width: `calc(${a}% - 8px)`,
        top: `${h + 32}px`
      };
    },
    getSpanningSlotsCount(t) {
      return !this.weekEventLayouts || !this.weekEventLayouts[t] ? 0 : this.weekEventLayouts[t].maxSlots;
    },
    // ==================== Time Grid Event Positioning ====================
    getEventPosition(t) {
      const n = this.getTimePart(t.start), i = t.end ? this.getTimePart(t.end) : null;
      if (!n) return null;
      const [r, o] = n.split(":").map(Number), a = r * 60 + o;
      let l;
      if (i) {
        const [p, m] = i.split(":").map(Number);
        l = p * 60 + m;
      } else
        l = a + 60;
      const h = this.startHour * 60, u = this.endHour * 60 - h, d = (a - h) / u * 100, f = (l - a) / u * 100;
      return {
        top: Math.max(0, d),
        height: Math.min(100 - Math.max(0, d), f),
        startMinutes: a,
        endMinutes: l
      };
    },
    eventsOverlap(t, n) {
      return t.startMinutes < n.endMinutes && n.startMinutes < t.endMinutes;
    },
    getEventsWithColumns(t, n) {
      const r = t.filter((l) => this.getDatePart(l.start) === n).map((l) => ({ event: l, position: this.getEventPosition(l) })).filter((l) => l.position !== null).sort((l, h) => l.position.startMinutes - h.position.startMinutes), o = [];
      r.forEach((l) => {
        let h = 0;
        for (; o[h]?.some(
          (c) => this.eventsOverlap(c.position, l.position)
        ); )
          h++;
        o[h] || (o[h] = []), o[h].push(l), l.column = h;
      });
      const a = o.length || 1;
      return r.map((l) => ({
        ...l,
        columnWidth: 100 / a,
        columnLeft: l.column / a * 100,
        totalColumns: a
      }));
    },
    getCurrentTimePosition() {
      const t = /* @__PURE__ */ new Date(), n = t.getHours() * 60 + t.getMinutes(), i = this.startHour * 60, r = this.endHour * 60;
      return (n - i) / (r - i) * 100;
    },
    isWithinTimeRange() {
      const n = (/* @__PURE__ */ new Date()).getHours();
      return n >= this.startHour && n < this.endHour;
    },
    getAllDayEventsForDate(t) {
      return this.allDayEvents.filter((n) => {
        const i = this.getDatePart(n.start), r = n.end ? this.getDatePart(n.end) : i;
        return t >= i && t <= r;
      });
    },
    // ==================== Navigation ====================
    setView(t) {
      this.view = t;
    },
    previousPeriod() {
      this.view === "month" ? this.previousMonth() : this.view === "week" ? this.previousWeek() : this.view === "day" && this.previousDay();
    },
    nextPeriod() {
      this.view === "month" ? this.nextMonth() : this.view === "week" ? this.nextWeek() : this.view === "day" && this.nextDay();
    },
    previousMonth() {
      this.displayMonth--, this.displayMonth < 0 && (this.displayMonth = 11, this.displayYear--), this.updateCalendar(), this.updateFocusedDateForMonthChange(), this.announcement = `${this.monthName} ${this.displayYear}`, this.dispatchViewChange();
    },
    nextMonth() {
      this.displayMonth++, this.displayMonth > 11 && (this.displayMonth = 0, this.displayYear++), this.updateCalendar(), this.updateFocusedDateForMonthChange(), this.announcement = `${this.monthName} ${this.displayYear}`, this.dispatchViewChange();
    },
    previousWeek() {
      this.currentDate.setDate(this.currentDate.getDate() - 7), this.displayMonth = this.currentDate.getMonth(), this.displayYear = this.currentDate.getFullYear(), this.updateCalendar(), this.dispatchViewChange();
    },
    nextWeek() {
      this.currentDate.setDate(this.currentDate.getDate() + 7), this.displayMonth = this.currentDate.getMonth(), this.displayYear = this.currentDate.getFullYear(), this.updateCalendar(), this.dispatchViewChange();
    },
    previousDay() {
      this.currentDate.setDate(this.currentDate.getDate() - 1), this.displayMonth = this.currentDate.getMonth(), this.displayYear = this.currentDate.getFullYear(), this.updateCalendar(), this.dispatchViewChange();
    },
    nextDay() {
      this.currentDate.setDate(this.currentDate.getDate() + 1), this.displayMonth = this.currentDate.getMonth(), this.displayYear = this.currentDate.getFullYear(), this.updateCalendar(), this.dispatchViewChange();
    },
    goToToday() {
      const t = /* @__PURE__ */ new Date();
      this.displayMonth = t.getMonth(), this.displayYear = t.getFullYear(), this.currentDate = t, this.focusedDate = C.today(), this.updateCalendar(), this.dispatchViewChange();
    },
    dispatchViewChange() {
      let t, n;
      if (this.view === "month") {
        const i = new Date(this.displayYear, this.displayMonth, 1), r = new Date(this.displayYear, this.displayMonth + 1, 0);
        t = C.formatDate(i.getFullYear(), i.getMonth(), i.getDate()), n = C.formatDate(r.getFullYear(), r.getMonth(), r.getDate());
      } else this.view === "week" ? (t = this.weekStart, n = this.weekEnd) : this.view === "day" && (t = this.currentDayDate, n = this.currentDayDate);
      this.$dispatch("view-change", { view: this.view, start: t, end: n });
    },
    // ==================== Accessibility: Keyboard Navigation ====================
    handleDayKeydown(t, n, i) {
      const r = t.key;
      let o = !0;
      switch (r) {
        case "ArrowRight":
          this.moveFocusBy(1);
          break;
        case "ArrowLeft":
          this.moveFocusBy(-1);
          break;
        case "ArrowDown":
          this.moveFocusBy(7);
          break;
        case "ArrowUp":
          this.moveFocusBy(-7);
          break;
        case "Home":
          t.ctrlKey ? this.focusFirstDayOfYear() : this.focusFirstDayOfWeek();
          break;
        case "End":
          t.ctrlKey ? this.focusLastDayOfYear() : this.focusLastDayOfWeek();
          break;
        case "PageUp":
          this.moveFocusByMonths(t.shiftKey ? -12 : -1);
          break;
        case "PageDown":
          this.moveFocusByMonths(t.shiftKey ? 12 : 1);
          break;
        case "Enter":
        case " ":
          t.preventDefault(), this.handleDateClick(n, t);
          break;
        default:
          o = !1;
      }
      o && t.preventDefault();
    },
    moveFocusBy(t) {
      const n = new Date(this.focusedDate);
      n.setDate(n.getDate() + t);
      const i = C.formatDate(
        n.getFullYear(),
        n.getMonth(),
        n.getDate()
      );
      (n.getMonth() !== this.displayMonth || n.getFullYear() !== this.displayYear) && (this.displayMonth = n.getMonth(), this.displayYear = n.getFullYear(), this.updateCalendar(), this.dispatchViewChange()), this.setFocusedDate(i);
    },
    moveFocusByMonths(t) {
      const n = new Date(this.focusedDate), i = n.getDate();
      n.setMonth(n.getMonth() + t), n.getDate() !== i && n.setDate(0), this.displayMonth = n.getMonth(), this.displayYear = n.getFullYear(), this.updateCalendar(), this.dispatchViewChange(), this.setFocusedDate(C.formatDate(
        n.getFullYear(),
        n.getMonth(),
        n.getDate()
      ));
    },
    setFocusedDate(t) {
      this.focusedDate = t, this.$nextTick(() => {
        const n = this.$el.querySelector(`button[data-date="${t}"]`);
        n && n.focus();
      }), this.announceDate(t);
    },
    updateFocusedDateForMonthChange() {
      if (!this.focusedDate) {
        this.focusedDate = this.getInitialFocusDate();
        return;
      }
      const n = new Date(this.focusedDate).getDate(), i = new Date(this.displayYear, this.displayMonth + 1, 0).getDate(), r = Math.min(n, i);
      this.focusedDate = C.formatDate(this.displayYear, this.displayMonth, r);
    },
    focusFirstDayOfWeek() {
      const t = new Date(this.focusedDate), i = (t.getDay() - this.firstDayOfWeek + 7) % 7;
      t.setDate(t.getDate() - i), this.setFocusedDate(C.formatDate(
        t.getFullYear(),
        t.getMonth(),
        t.getDate()
      ));
    },
    focusLastDayOfWeek() {
      const t = new Date(this.focusedDate), n = t.getDay(), i = (this.firstDayOfWeek + 6 - n + 7) % 7;
      t.setDate(t.getDate() + i), this.setFocusedDate(C.formatDate(
        t.getFullYear(),
        t.getMonth(),
        t.getDate()
      ));
    },
    focusFirstDayOfYear() {
      const t = new Date(this.focusedDate).getFullYear();
      this.displayMonth = 0, this.displayYear = t, this.updateCalendar(), this.dispatchViewChange(), this.setFocusedDate(C.formatDate(t, 0, 1));
    },
    focusLastDayOfYear() {
      const t = new Date(this.focusedDate).getFullYear();
      this.displayMonth = 11, this.displayYear = t, this.updateCalendar(), this.dispatchViewChange(), this.setFocusedDate(C.formatDate(t, 11, 31));
    },
    // ==================== Accessibility: ARIA Labels & Announcements ====================
    getDayAriaLabel(t) {
      const n = new Date(t.date);
      let r = new Intl.DateTimeFormat(this.getLocale(), {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(n);
      t.isToday && (r += ", today");
      const o = t.events?.length || 0;
      return o > 0 && (r += `, ${o} ${o === 1 ? "event" : "events"}`), r;
    },
    getEventAriaLabel(t) {
      let n = t.title;
      if (t.allDay)
        n += ", all day event";
      else {
        const i = this.formatEventTimeRange(t);
        i && (n += `, ${i}`);
      }
      return t.location && (n += `, at ${t.location}`), n;
    },
    announceDate(t) {
      const n = this.findDayInGrid(t);
      n && (this.announcement = this.getDayAriaLabel(n));
    },
    findDayInGrid(t) {
      for (const n of this.weeks) {
        const i = n.find((r) => r.date === t);
        if (i) return i;
      }
      return null;
    },
    // ==================== Title Formatters ====================
    getWeekTitle() {
      if (!this.weekStart || !this.weekEnd) return "";
      const t = new Date(this.weekStart), n = new Date(this.weekEnd), i = new Intl.DateTimeFormat(this.getLocale(), {
        month: "short",
        day: "numeric"
      }).format(t), r = new Intl.DateTimeFormat(this.getLocale(), {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(n);
      return `${i} - ${r}`;
    },
    getDayTitle() {
      if (!this.currentDayDate) return "";
      const t = new Date(this.currentDayDate);
      return new Intl.DateTimeFormat(this.getLocale(), {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(t);
    },
    // ==================== Click Handlers ====================
    handleDateClick(t, n) {
      this.$dispatch("date-click", {
        date: t.date,
        allDay: !0,
        jsEvent: n
      });
    },
    handleTimeSlotClick(t, n, i) {
      this.$dispatch("date-click", {
        date: t,
        time: `${String(n).padStart(2, "0")}:00`,
        allDay: !1,
        jsEvent: i
      });
    },
    handleEventClick(t, n) {
      n.stopPropagation(), this.$dispatch("event-click", {
        event: t,
        jsEvent: n
      });
    },
    showMorePopover(t, n) {
      n.stopPropagation(), this.morePopoverTrigger = n.target;
      const i = n.target.getBoundingClientRect(), r = this.$el.getBoundingClientRect();
      this.morePopover = {
        open: !0,
        date: t.date,
        events: t.events,
        x: i.left - r.left,
        y: i.bottom - r.top + 4
      }, this.$nextTick(() => {
        const o = this.$refs.morePopover?.querySelector("button");
        o && o.focus();
      });
    },
    hideMorePopover() {
      this.morePopover.open = !1, this.$nextTick(() => {
        this.morePopoverTrigger && (this.morePopoverTrigger.focus(), this.morePopoverTrigger = null);
      });
    },
    formatPopoverDate(t) {
      if (!t) return "";
      const n = new Date(t);
      return new Intl.DateTimeFormat(this.getLocale(), {
        weekday: "long",
        month: "long",
        day: "numeric"
      }).format(n);
    },
    // ==================== Multi-Day Event Helpers ====================
    isMultiDayEvent(t) {
      if (!t.end) return !1;
      const n = this.getDatePart(t.start), i = this.getDatePart(t.end);
      return n !== i;
    },
    isEventStart(t, n) {
      return this.getDatePart(t.start) === n;
    },
    isEventEnd(t, n) {
      return t.end ? this.getDatePart(t.end) === n : !0;
    }
  };
}
let ra = !1;
function Ir(s) {
  ra || !s || (ra = !0, s.data("spireOverlay", W), s.data("spireKeyboard", Ze), s.data("spireInput", vh), s.data("spireSelect", wh), s.data("spireAutocomplete", kh), s.data("spireCalendar", Dh), s.data("spireDatepicker", Eh), s.data("spireTimepicker", Ch), s.data("spireModal", Mh), s.data("spirePhoneInput", Ah), s.data("spireProgress", Oh), s.data("spireProgressCircular", Ih), s.data("spireRating", Nh), s.data("spireTooltip", Lh), s.data("spireEditor", hg), s.data("spireTable", cg), s.data("spireSlider", ug), s.data("spireToast", dg), s.data("spireTabs", pg), s.data("spireFileUpload", gg), s.data("spireSidebar", yg), s.data("spireSidebarSection", bg), s.data("spireSidebarItem", xg), s.data("spireDropdown", Sg), s.data("spireCarousel", vg), s.data("spireBreadcrumbs", wg), s.data("spireLightbox", Tg), s.data("spireChart", kg), s.data("spireIconPicker", Eg), s.data("spireColorPicker", Ag), s.data("spireEventCalendar", Og));
}
document.addEventListener("livewire:init", () => {
  Ir(window.Alpine);
});
document.addEventListener("alpine:init", () => {
  Ir(window.Alpine);
});
function Ig() {
  window.ComponentClass = Ji, window.toast = fg, window.Alpine && Ir(window.Alpine);
}
export {
  Ji as ComponentClass,
  kh as autocompleteComponent,
  wg as breadcrumbsComponent,
  Dh as calendarComponent,
  vg as carouselComponent,
  kg as chartComponent,
  Eh as datepickerComponent,
  Sg as dropdownComponent,
  hg as editorComponent,
  Og as eventCalendarComponent,
  gg as fileUploadComponent,
  Ig as initializeSpireUI,
  vh as inputComponent,
  Ze as keyboard,
  Tg as lightboxComponent,
  Mh as modalComponent,
  W as overlay,
  Ah as phoneInputComponent,
  Ih as progressCircularComponent,
  Oh as progressComponent,
  Nh as ratingComponent,
  wh as selectComponent,
  yg as sidebarComponent,
  xg as sidebarItemComponent,
  bg as sidebarSectionComponent,
  ug as sliderComponent,
  cg as tableComponent,
  pg as tabsComponent,
  Ch as timepickerComponent,
  fg as toast,
  dg as toastComponent,
  Lh as tooltipComponent
};
//# sourceMappingURL=spire-ui.esm.js.map
