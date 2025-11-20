import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function lightboxComponent(config = {}) {
    return {
        thumbnails: config.thumbnails ?? true,
        counter: config.counter ?? true,
        captions: config.captions ?? true,
        download: config.download ?? true,
        zoom: config.zoom ?? true,
        loop: config.loop ?? false,
        closeOnBackdrop: config.closeOnBackdrop ?? true,

        isOpen: false,
        currentIndex: 0,
        items: [],
        loading: false,
        zoomed: false,
        zoomLevel: 1,
        zoomPosition: { x: 0, y: 0 },

        touchStartX: 0,
        touchStartY: 0,
        touchEndX: 0,
        touchEndY: 0,
        initialPinchDistance: 0,

        eventListeners: [],
        preloadedImages: new Map(),
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
            this.dialog = this.$el;

            this.addDocumentListener('click', (e) => {
                const trigger = e.target.closest('[data-spire-lightbox]');
                if (trigger) {
                    e.preventDefault();
                    this.openFromTrigger(trigger);
                }
            });

            this.addDocumentListener('keydown', (e) => {
                if (!this.isOpen) return;
                this.handleKeyDown(e);
            });

            this.dialog.addEventListener('close', () => {
                this.isOpen = false;
                this.resetZoom();
                this.dispatchEvent(SPIRE_EVENTS.LIGHTBOX_CLOSED);
            });

            this.dialog.addEventListener('click', (e) => {
                if (this.closeOnBackdrop && e.target === this.dialog) {
                    this.close();
                }
            });
        },

        openFromTrigger(trigger) {
            const group = trigger.dataset.spireLightboxGroup;

            if (group) {
                const groupTriggers = document.querySelectorAll(
                    `[data-spire-lightbox][data-spire-lightbox-group="${group}"]`
                );
                this.items = Array.from(groupTriggers).map(el => this.extractItemData(el));
                this.currentIndex = Array.from(groupTriggers).indexOf(trigger);
            } else {
                this.items = [this.extractItemData(trigger)];
                this.currentIndex = 0;
            }

            this.open();
        },

        extractItemData(element) {
            let src = element.dataset.spireLightboxSrc
                || element.src
                || element.href
                || element.querySelector('img')?.src
                || '';

            let type = element.dataset.spireLightboxType || this.detectType(src);

            let title = element.dataset.spireLightboxTitle
                || element.alt
                || element.title
                || '';

            let thumbnail = element.dataset.spireLightboxThumbnail
                || (element.tagName === 'IMG' ? element.src : '')
                || element.querySelector('img')?.src
                || src;

            return {
                src,
                type,
                title,
                thumbnail,
                element
            };
        },

        detectType(src) {
            if (!src) return 'image';

            const url = src.toLowerCase();

            if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
            if (url.includes('vimeo.com')) return 'vimeo';

            if (url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i)) return 'video';
            if (url.match(/\.pdf(\?|$)/i)) return 'pdf';
            if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i)) return 'image';

            return 'image';
        },

        open() {
            this.isOpen = true;
            this.loading = true;
            this.resetZoom();
            this.dialog.showModal();
            this.preloadCurrent();
            this.preloadAdjacent();

            this.dispatchEvent(SPIRE_EVENTS.LIGHTBOX_OPENED, {
                index: this.currentIndex,
                item: this.currentItem
            });
        },

        close() {
            this.dialog.close();
        },

        next() {
            if (!this.canGoNext) return;

            const previousIndex = this.currentIndex;

            if (this.currentIndex < this.items.length - 1) {
                this.currentIndex++;
            } else if (this.loop) {
                this.currentIndex = 0;
            }

            this.onItemChange(previousIndex);
        },

        previous() {
            if (!this.canGoPrevious) return;

            const previousIndex = this.currentIndex;

            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else if (this.loop) {
                this.currentIndex = this.items.length - 1;
            }

            this.onItemChange(previousIndex);
        },

        goTo(index) {
            if (index < 0 || index >= this.items.length || index === this.currentIndex) return;

            const previousIndex = this.currentIndex;
            this.currentIndex = index;
            this.onItemChange(previousIndex);
        },

        onItemChange(previousIndex) {
            this.loading = true;
            this.resetZoom();
            this.preloadCurrent();
            this.preloadAdjacent();

            const contentEl = this.$el.querySelector('[data-spire-lightbox-content]');
            if (contentEl) {
                if (this.animationTimer) {
                    clearTimeout(this.animationTimer);
                }

                contentEl.setAttribute('data-animating', 'true');
                this.animationTimer = setTimeout(() => {
                    contentEl.removeAttribute('data-animating');
                    this.animationTimer = null;
                }, 250);
            }

            this.dispatchEvent(SPIRE_EVENTS.LIGHTBOX_CHANGED, {
                index: this.currentIndex,
                previousIndex,
                item: this.currentItem
            });
        },

        preloadCurrent() {
            const item = this.currentItem;
            if (!item || item.type !== 'image') {
                this.loading = false;
                return;
            }

            if (this.preloadedImages.has(item.src)) {
                this.loading = false;
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.preloadedImages.set(item.src, true);
                if (this.currentItem?.src === item.src) {
                    this.loading = false;
                }
            };
            img.onerror = () => {
                if (this.currentItem?.src === item.src) {
                    this.loading = false;
                }
            };
            img.src = item.src;
        },

        preloadAdjacent() {
            [-1, 1].forEach(offset => {
                const index = this.currentIndex + offset;
                if (index >= 0 && index < this.items.length) {
                    const item = this.items[index];
                    if (item.type === 'image' && !this.preloadedImages.has(item.src)) {
                        const img = new Image();
                        img.onload = () => this.preloadedImages.set(item.src, true);
                        img.src = item.src;
                    }
                }
            });
        },

        toggleZoom() {
            if (!this.zoom || this.currentItem?.type !== 'image') return;

            if (this.zoomed) {
                this.resetZoom();
            } else {
                this.zoomLevel = 2;
                this.zoomed = true;
            }
        },

        resetZoom() {
            this.zoomed = false;
            this.zoomLevel = 1;
            this.zoomPosition = { x: 0, y: 0 };
        },

        handleZoomPan(e) {
            if (!this.zoomed) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;

            this.zoomPosition = { x: -x, y: -y };
        },

        async downloadCurrent() {
            const item = this.currentItem;
            if (!item) return;

            try {
                const response = await fetch(item.src);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = item.title || this.getFilename(item.src);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                window.open(item.src, '_blank');
            }
        },

        getFilename(url) {
            try {
                return new URL(url, window.location.origin).pathname.split('/').pop() || 'download';
            } catch {
                return 'download';
            }
        },

        handleKeyDown(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previous();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.close();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goTo(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goTo(this.items.length - 1);
                    break;
                case ' ':
                case 'Enter':
                    if (e.target === this.dialog || e.target.closest('[data-spire-lightbox-content]')) {
                        e.preventDefault();
                        this.toggleZoom();
                    }
                    break;
            }
        },

        handleTouchStart(e) {
            if (e.touches.length === 1) {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                this.initialPinchDistance = this.getPinchDistance(e.touches);
            }
        },

        handleTouchMove(e) {
            if (e.touches.length === 2 && this.zoom) {
                e.preventDefault();
                const currentDistance = this.getPinchDistance(e.touches);
                const scale = currentDistance / this.initialPinchDistance;

                this.zoomLevel = Math.min(Math.max(1, scale * this.zoomLevel), 4);
                this.zoomed = this.zoomLevel > 1;
                this.initialPinchDistance = currentDistance;
            }
        },

        handleTouchEnd(e) {
            if (e.changedTouches.length === 1 && !this.zoomed) {
                this.touchEndX = e.changedTouches[0].clientX;
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleSwipe();
            }
        },

        handleSwipe() {
            const deltaX = this.touchEndX - this.touchStartX;
            const deltaY = this.touchEndY - this.touchStartY;
            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    this.previous();
                } else {
                    this.next();
                }
            }
        },

        getPinchDistance(touches) {
            return Math.hypot(
                touches[0].clientX - touches[1].clientX,
                touches[0].clientY - touches[1].clientY
            );
        },

        getEmbedUrl(item) {
            const src = item.src;

            if (item.type === 'youtube') {
                const match = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
                if (match) {
                    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
                }
            }

            if (item.type === 'vimeo') {
                const match = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                if (match) {
                    return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
                }
            }

            return src;
        },

        addDocumentListener(event, handler) {
            document.addEventListener(event, handler);
            this.eventListeners.push({ target: document, event, handler });
        },

        dispatchEvent(eventName, detail = {}) {
            window.dispatchEvent(new CustomEvent(eventName, {
                detail: createEventPayload({
                    value: this.currentIndex,
                    ...detail
                })
            }));
        },

        destroy() {
            this.eventListeners.forEach(({ target, event, handler }) => {
                target.removeEventListener(event, handler);
            });
            this.eventListeners = [];

            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
                this.animationTimer = null;
            }

            this.preloadedImages.clear();
        }
    };
}
