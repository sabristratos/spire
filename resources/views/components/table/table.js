import { SPIRE_EVENTS, createEventPayload } from '../../../js/shared/events';

export function tableComponent(config = {}) {
    return {
        selectable: config.selectable || false,
        selectMode: config.selectMode || 'multiple',
        selectedRows: config.selectedRows || [],
        name: config.name || null,

        // Sort state - can be controlled via wire:model
        sortColumn: config.sortColumn || null,
        sortDirection: config.sortDirection || null,

        // Keyboard navigation
        highlightedRowIndex: -1,

        // Internal cleanup tracking
        _watchers: [],

        init() {
            // Watch selectedRows for changes
            const unwatchSelection = this.$watch('selectedRows', (value, oldValue) => {
                this.$dispatch(SPIRE_EVENTS.TABLE_SELECTION_CHANGED, createEventPayload({
                    id: this.$id('table'),
                    name: this.name,
                    value: value,
                    previousValue: oldValue,
                }));
            });
            this._watchers.push(unwatchSelection);
        },

        destroy() {
            // Clean up all watchers
            this._watchers.forEach(unwatch => {
                if (typeof unwatch === 'function') {
                    unwatch();
                }
            });
            this._watchers = [];
        },

        // Keyboard navigation methods
        handleKeydown(event) {
            if (!this.selectable) return;

            const rows = this.getAllRowValues();
            if (rows.length === 0) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.highlightNext(rows);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.highlightPrev(rows);
                    break;
                case ' ':
                case 'Enter':
                    if (this.highlightedRowIndex >= 0 && this.highlightedRowIndex < rows.length) {
                        event.preventDefault();
                        this.toggleRow(rows[this.highlightedRowIndex]);
                    }
                    break;
                case 'Escape':
                    this.highlightedRowIndex = -1;
                    this.updateRowFocus();
                    break;
            }
        },

        highlightNext(rows) {
            if (this.highlightedRowIndex < rows.length - 1) {
                this.highlightedRowIndex++;
            } else {
                this.highlightedRowIndex = 0; // Wrap to first
            }
            this.updateRowFocus();
        },

        highlightPrev(rows) {
            if (this.highlightedRowIndex > 0) {
                this.highlightedRowIndex--;
            } else {
                this.highlightedRowIndex = rows.length - 1; // Wrap to last
            }
            this.updateRowFocus();
        },

        updateRowFocus() {
            if (!this.$refs.tbody) return;

            const rows = this.$refs.tbody.querySelectorAll('[data-spire-table-row-value]');
            rows.forEach((row, index) => {
                row.tabIndex = index === this.highlightedRowIndex ? 0 : -1;
                if (index === this.highlightedRowIndex) {
                    row.focus();
                }
            });
        },

        isRowSelected(value) {
            if (Array.isArray(this.selectedRows)) {
                return this.selectedRows.includes(value);
            }
            return this.selectedRows === value;
        },

        toggleRow(value) {
            if (this.selectMode === 'single') {
                this.selectedRows = this.isRowSelected(value) ? [] : [value];
            } else {
                const index = this.selectedRows.indexOf(value);
                if (index > -1) {
                    this.selectedRows = this.selectedRows.filter(v => v !== value);
                } else {
                    this.selectedRows = [...this.selectedRows, value];
                }
            }
        },

        toggleSelectAll(event) {
            const allRowValues = this.getAllRowValues();

            if (event.target.checked) {
                this.selectedRows = [...allRowValues];
            } else {
                this.selectedRows = [];
            }
        },

        getAllRowValues() {
            if (!this.$refs.tbody) {
                return [];
            }
            const rows = this.$refs.tbody.querySelectorAll('[data-spire-table-row-value]:not([aria-disabled="true"])');
            return Array.from(rows).map(row => row.getAttribute('data-spire-table-row-value'));
        },

        get allSelected() {
            const allRowValues = this.getAllRowValues();
            return allRowValues.length > 0 && allRowValues.every(value => this.isRowSelected(value));
        },

        get someSelected() {
            const allRowValues = this.getAllRowValues();
            const selectedCount = allRowValues.filter(value => this.isRowSelected(value)).length;
            return selectedCount > 0 && selectedCount < allRowValues.length;
        },

        get selectedCount() {
            return Array.isArray(this.selectedRows) ? this.selectedRows.length : (this.selectedRows ? 1 : 0);
        },

        toggleSort(column) {
            const previousSort = {
                column: this.sortColumn,
                direction: this.sortDirection
            };

            if (this.sortColumn === column) {
                if (this.sortDirection === 'asc') {
                    this.sortDirection = 'desc';
                } else if (this.sortDirection === 'desc') {
                    this.sortColumn = null;
                    this.sortDirection = null;
                } else {
                    this.sortDirection = 'asc';
                }
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }

            this.$dispatch(SPIRE_EVENTS.TABLE_SORT_CHANGED, createEventPayload({
                id: this.$id('table'),
                name: this.name,
                value: {
                    column: this.sortColumn,
                    direction: this.sortDirection
                },
                previousValue: previousSort,
            }));
        },

        // Reset keyboard highlight when selection changes externally
        resetHighlight() {
            this.highlightedRowIndex = -1;
        }
    };
}
