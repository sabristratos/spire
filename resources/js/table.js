import { SPIRE_EVENTS, createEventPayload } from './events';

export function tableComponent(config = {}) {
    return {
        selectable: config.selectable || false,
        selectMode: config.selectMode || 'multiple',
        selectedRows: config.selectedRows || [],
        name: config.name || null,

        sortColumn: null,
        sortDirection: null,

        init() {
            this.$watch('selectedRows', (value, oldValue) => {
                this.$dispatch(SPIRE_EVENTS.TABLE_SELECTION_CHANGED, createEventPayload({
                    id: this.$id('table'),
                    name: this.name,
                    value: value,
                    previousValue: oldValue,
                }));
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
            const rows = this.$refs.tbody.querySelectorAll('[data-spire-table-row-value]');
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
        }
    };
}
