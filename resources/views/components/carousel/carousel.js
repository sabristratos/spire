import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';
import {
    CAROUSEL_DEFAULTS,
    CAROUSEL_SCROLL_ANIMATION_DURATION,
    CAROUSEL_SCROLL_END_TOLERANCE,
    CAROUSEL_DEFAULT_BREAKPOINTS,
    SCROLL_DEBOUNCE_MS
} from '../../../js/shared/component-constants';

export function carouselComponent(config = {}) {
    return {
        autoplay: config.autoplay ?? CAROUSEL_DEFAULTS.AUTOPLAY,
        interval: config.interval ?? CAROUSEL_DEFAULTS.INTERVAL,
        loop: config.loop ?? CAROUSEL_DEFAULTS.LOOP,
        pauseOnHover: config.pauseOnHover ?? CAROUSEL_DEFAULTS.PAUSE_ON_HOVER,
        pauseOnFocus: config.pauseOnFocus ?? CAROUSEL_DEFAULTS.PAUSE_ON_FOCUS,
        itemsPerViewConfig: config.itemsPerView ?? CAROUSEL_DEFAULTS.ITEMS_PER_VIEW,
        itemsPerView: 1,

        currentIndex: 0,
        currentPage: 0,
        totalSlides: 0,
        totalPages: 0,
        isPlaying: false,
        isPaused: false,
        isHovered: false,
        isFocused: false,

        autoplayTimer: null,
        scrollTimeout: null,
        resizeObserver: null,
        intersectionObserver: null,
        slideWidths: [],
        isNavigating: false,
        mediaQueryListeners: [],
        trackEventListeners: [],

        init() {
            this.$nextTick(() => {
                this.setupResponsiveItemsPerView();
                this.setupCarousel();
                this.setupObservers();
                this.setupEventListeners();

                if (this.autoplay) {
                    this.play();
                }
            });
        },

        destroy() {
            this.stop();

            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = null;
            }

            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }

            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
                this.intersectionObserver = null;
            }

            this.mediaQueryListeners.forEach(({ mql, handler }) => {
                mql.removeEventListener('change', handler);
            });
            this.mediaQueryListeners = [];

            this.trackEventListeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this.trackEventListeners = [];
        },

        setupResponsiveItemsPerView() {
            if (typeof this.itemsPerViewConfig === 'number') {
                this.itemsPerView = this.itemsPerViewConfig;
                this.updateCSSProperty();
                return;
            }

            const breakpointConfig = this.itemsPerViewConfig;
            const breakpoints = this.getBreakpoints();

            const sortedBreakpoints = Object.keys(breakpointConfig)
                .filter(key => key !== 'default')
                .sort((a, b) => {
                    const aValue = parseFloat(breakpoints[a]) || 0;
                    const bValue = parseFloat(breakpoints[b]) || 0;
                    return bValue - aValue;
                });

            const updateItemsPerView = () => {
                let newValue = breakpointConfig.default || 1;

                for (const breakpoint of sortedBreakpoints) {
                    const minWidth = breakpoints[breakpoint];
                    if (minWidth && window.matchMedia(`(min-width: ${minWidth})`).matches) {
                        newValue = breakpointConfig[breakpoint];
                        break;
                    }
                }

                if (newValue !== this.itemsPerView) {
                    this.itemsPerView = newValue;
                    this.totalPages = Math.ceil(this.totalSlides / this.itemsPerView);
                    this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
                    this.updateCSSProperty();
                }
            };

            updateItemsPerView();

            sortedBreakpoints.forEach(breakpoint => {
                const minWidth = breakpoints[breakpoint];
                if (!minWidth) return;

                const mql = window.matchMedia(`(min-width: ${minWidth})`);
                const handler = () => updateItemsPerView();

                mql.addEventListener('change', handler);
                this.mediaQueryListeners.push({ mql, handler });
            });
        },

        getBreakpoints() {
            const breakpoints = { ...CAROUSEL_DEFAULT_BREAKPOINTS };
            const rootStyles = getComputedStyle(document.documentElement);

            Object.keys(CAROUSEL_DEFAULT_BREAKPOINTS).forEach(bp => {
                const customValue = rootStyles.getPropertyValue(`--breakpoint-${bp}`).trim();
                if (customValue) {
                    breakpoints[bp] = customValue;
                }
            });

            return breakpoints;
        },

        updateCSSProperty() {
            if (this.$el) {
                this.$el.style.setProperty('--items-per-view', this.itemsPerView);
            }
        },

        setupCarousel() {
            const track = this.$refs.track;
            if (!track) return;

            const slides = this.getSlides();
            this.totalSlides = slides.length;
            this.totalPages = Math.ceil(this.totalSlides / this.itemsPerView);
            this.calculateSlideWidths();
        },

        setupObservers() {
            const track = this.$refs.track;
            if (!track) return;

            this.resizeObserver = new ResizeObserver(() => {
                this.calculateSlideWidths();
            });
            this.resizeObserver.observe(track);

            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    if (this.isNavigating) return;

                    if (this.isAtMaxScroll()) {
                        if (this.currentPage !== this.totalPages - 1) {
                            this.currentPage = this.totalPages - 1;
                            this.currentIndex = (this.totalPages - 1) * this.itemsPerView;
                            this.announceSlide();
                            this.dispatchChangeEvent();
                        }
                        return;
                    }

                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                            const slide = entry.target;
                            const index = this.getSlideIndex(slide);
                            if (index !== -1 && index !== this.currentIndex) {
                                this.currentIndex = index;
                                const newPage = Math.floor(index / this.itemsPerView);
                                if (newPage !== this.currentPage) {
                                    this.currentPage = newPage;
                                    this.announceSlide();
                                    this.dispatchChangeEvent();
                                }
                            }
                        }
                    });
                },
                {
                    root: track,
                    threshold: 0.5
                }
            );

            this.getSlides().forEach((slide) => {
                this.intersectionObserver.observe(slide);
            });
        },

        setupEventListeners() {
            const track = this.$refs.track;
            if (!track) return;

            const scrollEndHandler = () => {
                this.updateCurrentIndexFromScroll();
            };

            const scrollHandler = () => {
                if (this.scrollTimeout) {
                    clearTimeout(this.scrollTimeout);
                }
                this.scrollTimeout = setTimeout(() => {
                    this.updateCurrentIndexFromScroll();
                }, SCROLL_DEBOUNCE_MS);
            };

            track.addEventListener('scrollend', scrollEndHandler);
            track.addEventListener('scroll', scrollHandler);

            this.trackEventListeners.push(
                { element: track, event: 'scrollend', handler: scrollEndHandler },
                { element: track, event: 'scroll', handler: scrollHandler }
            );
        },

        calculateSlideWidths() {
            const slides = this.getSlides();
            this.slideWidths = slides.map(slide => slide.offsetWidth);
        },

        getSlides() {
            const track = this.$refs.track;
            if (!track) return [];
            return Array.from(track.querySelectorAll('[data-spire-carousel-slide]'));
        },

        getSlideIndex(slide) {
            return this.getSlides().indexOf(slide);
        },

        updateCurrentIndexFromScroll() {
            if (this.isNavigating) return;

            const track = this.$refs.track;
            if (!track) return;

            if (this.isAtMaxScroll()) {
                if (this.currentPage !== this.totalPages - 1) {
                    this.currentPage = this.totalPages - 1;
                    this.currentIndex = (this.totalPages - 1) * this.itemsPerView;
                    this.announceSlide();
                    this.dispatchChangeEvent();
                }
                return;
            }

            const scrollLeft = track.scrollLeft;
            const trackWidth = track.offsetWidth;

            let accumulatedWidth = 0;
            const slides = this.getSlides();

            for (let i = 0; i < slides.length; i++) {
                const slideWidth = slides[i].offsetWidth;
                const slideCenter = accumulatedWidth + slideWidth / 2;

                if (slideCenter >= scrollLeft && slideCenter <= scrollLeft + trackWidth) {
                    if (i !== this.currentIndex) {
                        this.currentIndex = i;
                        const newPage = Math.floor(i / this.itemsPerView);
                        if (newPage !== this.currentPage) {
                            this.currentPage = newPage;
                            this.announceSlide();
                            this.dispatchChangeEvent();
                        }
                    }
                    break;
                }
                accumulatedWidth += slideWidth;
            }
        },

        goToSlide(index) {
            const track = this.$refs.track;
            if (!track) return;

            const slides = this.getSlides();
            if (slides.length === 0) return;

            if (this.loop) {
                if (index < 0) {
                    index = slides.length - 1;
                } else if (index >= slides.length) {
                    index = 0;
                }
            } else {
                index = Math.max(0, Math.min(index, slides.length - 1));
            }

            const targetSlide = slides[index];
            if (!targetSlide) return;

            let scrollPosition = 0;
            for (let i = 0; i < index; i++) {
                scrollPosition += slides[i].offsetWidth;
            }

            const gap = this.getGap();
            scrollPosition += gap * index;

            this.isNavigating = true;

            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });

            this.currentIndex = index;
            this.currentPage = Math.floor(index / this.itemsPerView);

            setTimeout(() => {
                this.isNavigating = false;
            }, CAROUSEL_SCROLL_ANIMATION_DURATION);

            if (this.isPlaying) {
                this.resetAutoplayTimer();
            }
        },

        goToPage(pageIndex) {
            const track = this.$refs.track;
            if (!track) return;

            if (this.loop) {
                if (pageIndex < 0) {
                    pageIndex = this.totalPages - 1;
                } else if (pageIndex >= this.totalPages) {
                    pageIndex = 0;
                }
            } else {
                pageIndex = Math.max(0, Math.min(pageIndex, this.totalPages - 1));
            }

            const slides = this.getSlides();
            if (slides.length === 0) return;

            const isLastPage = pageIndex === this.totalPages - 1;
            const gap = this.getGap();

            let scrollPosition;
            if (isLastPage) {
                scrollPosition = track.scrollWidth - track.offsetWidth;
            } else {
                const slideIndex = pageIndex * this.itemsPerView;
                scrollPosition = 0;
                for (let i = 0; i < slideIndex; i++) {
                    scrollPosition += slides[i].offsetWidth + gap;
                }
            }

            this.isNavigating = true;

            track.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });

            this.currentPage = pageIndex;
            this.currentIndex = pageIndex * this.itemsPerView;

            setTimeout(() => {
                this.isNavigating = false;
            }, CAROUSEL_SCROLL_ANIMATION_DURATION);

            if (this.isPlaying) {
                this.resetAutoplayTimer();
            }
        },

        next() {
            this.goToPage(this.currentPage + 1);
        },

        previous() {
            this.goToPage(this.currentPage - 1);
        },

        play() {
            if (this.isPlaying) return;

            this.isPlaying = true;
            this.isPaused = false;
            this.startAutoplayTimer();
            this.updateLiveRegion();
        },

        pause() {
            if (!this.isPlaying) return;

            this.isPaused = true;
            this.stopAutoplayTimer();
            this.updateLiveRegion();
        },

        resume() {
            if (!this.isPlaying || !this.isPaused) return;

            this.isPaused = false;
            this.startAutoplayTimer();
        },

        stop() {
            this.isPlaying = false;
            this.isPaused = false;
            this.stopAutoplayTimer();
        },

        toggle() {
            if (this.isPlaying && !this.isPaused) {
                this.pause();
            } else if (this.isPlaying && this.isPaused) {
                this.resume();
            } else {
                this.play();
            }
        },

        startAutoplayTimer() {
            this.stopAutoplayTimer();

            this.autoplayTimer = setInterval(() => {
                if (!this.shouldPause()) {
                    this.next();
                }
            }, this.interval);
        },

        stopAutoplayTimer() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        },

        resetAutoplayTimer() {
            if (this.isPlaying && !this.isPaused) {
                this.startAutoplayTimer();
            }
        },

        shouldPause() {
            return this.isPaused ||
                   (this.pauseOnHover && this.isHovered) ||
                   (this.pauseOnFocus && this.isFocused);
        },

        handleMouseEnter() {
            this.isHovered = true;
            if (this.pauseOnHover && this.isPlaying && !this.isPaused) {
                this.stopAutoplayTimer();
            }
        },

        handleMouseLeave() {
            this.isHovered = false;
            if (this.pauseOnHover && this.isPlaying && !this.isPaused) {
                this.startAutoplayTimer();
            }
        },

        handleFocusIn() {
            this.isFocused = true;
            if (this.pauseOnFocus && this.isPlaying && !this.isPaused) {
                this.stopAutoplayTimer();
            }
        },

        handleFocusOut() {
            this.isFocused = false;
            if (this.pauseOnFocus && this.isPlaying && !this.isPaused) {
                this.startAutoplayTimer();
            }
        },

        handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.previous();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.next();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    event.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        },

        announceSlide() {
            const liveRegion = this.$refs.liveRegion;
            if (liveRegion) {
                liveRegion.textContent = `Page ${this.currentPage + 1} of ${this.totalPages}`;
            }
        },

        updateLiveRegion() {
            const liveRegion = this.$refs.liveRegion;
            if (!liveRegion) return;

            if (this.isPlaying && !this.isPaused) {
                liveRegion.setAttribute('aria-live', 'off');
            } else {
                liveRegion.setAttribute('aria-live', 'polite');
            }
        },

        getGap() {
            const track = this.$refs.track;
            if (!track) return 0;

            const style = getComputedStyle(track);
            return parseFloat(style.gap) || 0;
        },

        isAtMaxScroll() {
            const track = this.$refs.track;
            if (!track) return false;

            const maxScroll = track.scrollWidth - track.offsetWidth;
            return maxScroll > 0 && track.scrollLeft >= maxScroll - CAROUSEL_SCROLL_END_TOLERANCE;
        },

        canGoNext() {
            if (this.loop) return true;
            return this.currentPage < this.totalPages - 1;
        },

        canGoPrevious() {
            if (this.loop) return true;
            return this.currentPage > 0;
        },

        isCurrentSlide(index) {
            return this.currentIndex === index;
        },

        isCurrentPage(pageIndex) {
            return this.currentPage === pageIndex;
        },

        getIndicatorLabel(index) {
            return `Go to page ${index + 1} of ${this.totalPages}`;
        },

        dispatchChangeEvent() {
            this.$dispatch(SPIRE_EVENTS.CAROUSEL_CHANGE, createEventPayload({
                index: this.currentIndex,
                page: this.currentPage,
                totalSlides: this.totalSlides,
                totalPages: this.totalPages
            }));
        }
    };
}
