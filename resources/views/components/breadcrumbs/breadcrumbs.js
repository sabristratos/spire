import { overlay } from '../../../js/shared/overlay';

/**
 * Breadcrumbs Alpine component
 *
 * Handles collapse functionality for long breadcrumb trails
 * Uses overlay for the dropdown of hidden items
 */
export function breadcrumbsComponent(config = {}) {
    return {
        ...overlay({ trigger: 'click' }),

        maxVisible: config.maxVisible || null,
        totalItems: 0,
        collapsedItems: [],

        init() {
            this.$nextTick(() => {
                this.setupPopover();
                this.setupAnchor();
                this.setupEventListeners();
                this.setupLivewireCompat();
                this.calculateCollapse();
            });
        },

        calculateCollapse() {
            if (!this.maxVisible) return;

            const items = this.$el.querySelectorAll('[data-spire-breadcrumb-item]');
            this.totalItems = items.length;

            if (this.totalItems <= this.maxVisible) return;

            // Calculate which items to collapse
            // Keep first item, collapse middle items, keep last (maxVisible - 1) items
            const keepAtEnd = this.maxVisible - 1;
            const startCollapse = 1;
            const endCollapse = this.totalItems - keepAtEnd;

            this.collapsedItems = [];

            items.forEach((item, index) => {
                if (index >= startCollapse && index < endCollapse) {
                    // Store item data before hiding
                    const link = item.querySelector('a, span');
                    const icon = item.querySelector('[data-spire-breadcrumb-icon]');

                    this.collapsedItems.push({
                        text: link?.textContent?.trim() || '',
                        href: link?.getAttribute('href') || null,
                        icon: icon?.getAttribute('data-spire-icon-name') || null
                    });

                    // Hide the item and its separator
                    item.style.display = 'none';
                    const separator = item.nextElementSibling;
                    if (separator?.hasAttribute('data-spire-breadcrumb-separator')) {
                        separator.style.display = 'none';
                    }
                }
            });

            // Show collapse trigger if items were collapsed
            const collapseTrigger = this.$el.querySelector('[data-spire-breadcrumb-collapse]');
            if (collapseTrigger && this.collapsedItems.length > 0) {
                collapseTrigger.style.display = 'flex';
            }
        },

        navigateTo(href) {
            if (href) {
                window.location.href = href;
            }
            this.hide();
        },

        destroy() {
            if (this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        }
    };
}
