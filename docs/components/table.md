# Table Component

Full-featured data table component with row selection, sorting, loading states, and customizable cells. Built with Alpine.js for interactivity and seamless Livewire integration.

## Components Overview

The Table component consists of multiple sub-components:

- `table` - Main container
- `table.header` - Header container (`<thead>`)
- `table.header-cell` - Header cell (`<th>`)
- `table.body` - Body container (`<tbody>`)
- `table.row` - Table row (`<tr>`)
- `table.cell` - Table cell (`<td>`)
- `table.footer` - Footer container (`<tfoot>`)
- `table.empty-state` - Empty data state
- `table.loading-state` - Loading skeleton state

## Props

### Table (Main)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Visual variant style |
| `size` | string | `'md'` | Table size: `sm`, `md`, `lg` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg` |
| `shadow` | string | `'none'` | Box shadow: `none`, `sm`, `md`, `lg` |
| `selectable` | boolean | `false` | Enable row selection with checkboxes |
| `selectMode` | string | `'multiple'` | Selection mode: `single`, `multiple` |
| `striped` | boolean | `false` | Alternate row background colors |
| `hoverable` | boolean | `true` | Highlight rows on hover |
| `maxHeight` | string | `null` | Maximum height with overflow scroll |
| `loading` | boolean | `false` | Show loading skeleton state |
| `emptyMessage` | string | `null` | Custom message when no data |
| `topContentPlacement` | string | `'inside'` | Top content placement: `inside`, `outside` |
| `bottomContentPlacement` | string | `'inside'` | Bottom content placement: `inside`, `outside` |
| `layout` | string | `'auto'` | Table layout: `auto`, `fixed` |
| `virtualScroll` | boolean | `false` | Enable virtual scrolling for large datasets (experimental) |
| `responsive` | boolean | `false` | Enable responsive card layout on mobile |
| `breakpoint` | string | `'md'` | Breakpoint for responsive switch: `sm`, `md`, `lg` |

### Table.header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stickyHeader` | boolean | `false` | Make header sticky when scrolling |

### Table.header-cell

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortable` | boolean | `false` | Enable sorting on this column |
| `sortKey` | string | `null` | Unique key for sorting identification |
| `align` | string | `'left'` | Text alignment: `left`, `center`, `right` |
| `width` | string | `null` | Column width (e.g., `'200px'`, `'25%'`) |
| `size` | string | `'md'` | Cell padding size: `sm`, `md`, `lg` |
| `isCheckboxCell` | boolean | `false` | Render as checkbox cell for select-all |
| `responsive` | string | `'secondary'` | Responsive behavior: `primary`, `secondary`, `actions`, `hidden` |

### Table.row

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | `null` | Row value for selection tracking |
| `selected` | boolean | `false` | Whether row is selected |
| `disabled` | boolean | `false` | Disable row interaction |
| `clickable` | boolean | `false` | Enable row click for selection |
| `selectable` | boolean | `null` | Show selection checkbox in this row |

### Table.cell

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | string | `'left'` | Text alignment: `left`, `center`, `right` |
| `size` | string | `'md'` | Cell padding size: `sm`, `md`, `lg` |
| `numeric` | boolean | `false` | Use monospace font for numbers |
| `label` | string | `null` | Label shown on mobile in DataList format |
| `responsive` | string | `'secondary'` | Responsive behavior: `primary`, `secondary`, `actions`, `hidden` |

### Table.footer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Footer cell padding size: `sm`, `md`, `lg` |

### Table.empty-state

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | string | (translated) | Message to display when table is empty |
| `iconName` | string | `'clipboard-x'` | Icon name from icon set |

### Table.loading-state

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | integer | `5` | Number of skeleton rows to display |

---

## Slots

### Table (Main)

| Slot | Description |
|------|-------------|
| Default | Table content (header, body, footer) |
| `topContent` | Content above the table (search, filters, bulk actions) |
| `bottomContent` | Content below the table (pagination, summary) |

### Table.header

| Slot | Description |
|------|-------------|
| Default | Header rows and cells |

### Table.body

| Slot | Description |
|------|-------------|
| Default | Table rows |

### Table.row

| Slot | Description |
|------|-------------|
| Default | Table cells |

### Table.header-cell

| Slot | Description |
|------|-------------|
| Default | Header cell content |

### Table.cell

| Slot | Description |
|------|-------------|
| Default | Cell content |

### Table.footer

| Slot | Description |
|------|-------------|
| Default | Footer rows |

### Table.empty-state

| Slot | Description |
|------|-------------|
| Default | Custom empty message content |
| `icon` | Custom icon |

### Table.loading-state

| Slot | Description |
|------|-------------|
| Default | Custom loading content |

---

## Examples

### Basic Table

```blade
<x-spire::table>
    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Email</x-spire::table.header-cell>
            <x-spire::table.header-cell>Role</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
            <x-spire::table.row>
                <x-spire::table.cell>{{ $user->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $user->email }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $user->role }}</x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### Striped and Hoverable

```blade
<x-spire::table striped hoverable>
    <thead>
        <tr>
            <x-spire::table.header-cell>Product</x-spire::table.header-cell>
            <x-spire::table.header-cell align="right">Price</x-spire::table.header-cell>
            <x-spire::table.header-cell align="center">Stock</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
            <x-spire::table.row>
                <x-spire::table.cell>{{ $product->name }}</x-spire::table.cell>
                <x-spire::table.cell align="right" numeric>
                    ${{ number_format($product->price, 2) }}
                </x-spire::table.cell>
                <x-spire::table.cell align="center">
                    {{ $product->stock }}
                </x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### Row Selection (Multiple)

```blade
<x-spire::table
    :selectable="true"
    selectMode="multiple"
    wire:model="selectedRows"
>
    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Status</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($items as $item)
            <x-spire::table.row
                :value="$item->id"
                :selectable="true"
            >
                <x-spire::table.cell>{{ $item->name }}</x-spire::table.cell>
                <x-spire::table.cell>
                    <x-spire::badge :color="$item->active ? 'success' : 'default'">
                        {{ $item->active ? 'Active' : 'Inactive' }}
                    </x-spire::badge>
                </x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### Row Selection (Single)

```blade
<x-spire::table
    :selectable="true"
    selectMode="single"
    wire:model="selectedItem"
>
    <thead>
        <tr>
            <x-spire::table.header-cell>Option</x-spire::table.header-cell>
            <x-spire::table.header-cell>Description</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($options as $option)
            <x-spire::table.row
                :value="$option->id"
                :selectable="true"
            >
                <x-spire::table.cell>{{ $option->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $option->description }}</x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### Sortable Columns

```blade
<x-spire::table
    hoverable
    x-data="{
        sortColumn: @entangle('sortColumn'),
        sortDirection: @entangle('sortDirection'),
        toggleSort(column) {
            $wire.toggleSort(column);
        }
    }"
>
    <thead>
        <tr>
            <x-spire::table.header-cell
                sortable
                sortKey="name"
                @click="toggleSort('name')"
            >
                Name
            </x-spire::table.header-cell>
            <x-spire::table.header-cell
                sortable
                sortKey="price"
                align="right"
                @click="toggleSort('price')"
            >
                Price
            </x-spire::table.header-cell>
            <x-spire::table.header-cell
                sortable
                sortKey="created_at"
                @click="toggleSort('created_at')"
            >
                Created
            </x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
            <x-spire::table.row>
                <x-spire::table.cell>{{ $product->name }}</x-spire::table.cell>
                <x-spire::table.cell align="right" numeric>
                    ${{ number_format($product->price, 2) }}
                </x-spire::table.cell>
                <x-spire::table.cell>
                    {{ $product->created_at->format('M d, Y') }}
                </x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### With Custom Cell Content

```blade
<x-spire::table hoverable>
    <thead>
        <tr>
            <x-spire::table.header-cell>User</x-spire::table.header-cell>
            <x-spire::table.header-cell>Category</x-spire::table.header-cell>
            <x-spire::table.header-cell align="center">Status</x-spire::table.header-cell>
            <x-spire::table.header-cell align="center">Actions</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
            <x-spire::table.row>
                <x-spire::table.cell>
                    <div class="flex items-center gap-3">
                        <x-spire::avatar
                            :src="$user->avatar"
                            :name="$user->name"
                            size="sm"
                        />
                        <div>
                            <div class="font-medium text-text">{{ $user->name }}</div>
                            <div class="text-sm text-text-muted">{{ $user->email }}</div>
                        </div>
                    </div>
                </x-spire::table.cell>
                <x-spire::table.cell>
                    <x-spire::badge color="default">{{ $user->category }}</x-spire::badge>
                </x-spire::table.cell>
                <x-spire::table.cell align="center">
                    @if($user->active)
                        <x-spire::badge color="success">Active</x-spire::badge>
                    @else
                        <x-spire::badge color="error">Inactive</x-spire::badge>
                    @endif
                </x-spire::table.cell>
                <x-spire::table.cell align="center">
                    <x-spire::dropdown>
                        <x-slot:trigger>
                            <x-spire::button icon-only variant="ghost" size="sm" aria-label="Actions">
                                <x-spire::icon name="dots-vertical" />
                            </x-spire::button>
                        </x-slot:trigger>
                        <x-spire::dropdown.item>Edit</x-spire::dropdown.item>
                        <x-spire::dropdown.item>View Details</x-spire::dropdown.item>
                        <x-spire::dropdown.item color="error">Delete</x-spire::dropdown.item>
                    </x-spire::dropdown>
                </x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### With Top and Bottom Content

```blade
<x-spire::table
    :selectable="true"
    selectMode="multiple"
    wire:model="selectedRows"
>
    <x-slot:topContent>
        <div class="flex items-center justify-between">
            <x-spire::input
                type="search"
                placeholder="Search..."
                wire:model.live.debounce.300ms="search"
                class="max-w-xs"
            />
            <div class="flex gap-2">
                <x-spire::button
                    variant="bordered"
                    :disabled="empty($selectedRows)"
                    wire:click="bulkDelete"
                >
                    Delete Selected
                </x-spire::button>
                <x-spire::button color="primary" wire:click="create">
                    Add New
                </x-spire::button>
            </div>
        </div>
    </x-slot:topContent>

    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Email</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
            <x-spire::table.row :value="$user->id" :selectable="true">
                <x-spire::table.cell>{{ $user->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $user->email }}</x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>

    <x-slot:bottomContent>
        {{ $users->links() }}
    </x-slot:bottomContent>
</x-spire::table>
```

### Loading State

```blade
<x-spire::table :loading="$isLoading">
    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Email</x-spire::table.header-cell>
            <x-spire::table.header-cell>Role</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @if($isLoading)
            <x-spire::table.loading-state :rows="5" />
        @else
            @foreach($users as $user)
                <x-spire::table.row>
                    <x-spire::table.cell>{{ $user->name }}</x-spire::table.cell>
                    <x-spire::table.cell>{{ $user->email }}</x-spire::table.cell>
                    <x-spire::table.cell>{{ $user->role }}</x-spire::table.cell>
                </x-spire::table.row>
            @endforeach
        @endif
    </tbody>
</x-spire::table>
```

### Empty State

```blade
<x-spire::table>
    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Email</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @forelse($users as $user)
            <x-spire::table.row>
                <x-spire::table.cell>{{ $user->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $user->email }}</x-spire::table.cell>
            </x-spire::table.row>
        @empty
            <tr>
                <td colspan="2">
                    <x-spire::table.empty-state message="No users found" />
                </td>
            </tr>
        @endforelse
    </tbody>
</x-spire::table>
```

### With Sticky Header and Max Height

```blade
<x-spire::table maxHeight="400px">
    <x-spire::table.header :stickyHeader="true">
        <tr>
            <x-spire::table.header-cell>ID</x-spire::table.header-cell>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Description</x-spire::table.header-cell>
        </tr>
    </x-spire::table.header>
    <tbody>
        @foreach($items as $item)
            <x-spire::table.row>
                <x-spire::table.cell numeric>{{ $item->id }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $item->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $item->description }}</x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>
</x-spire::table>
```

### Responsive Table (Mobile Cards)

Enable responsive mode to automatically switch from table layout to card layout on smaller screens. Each row becomes a card with primary content as the header and secondary content displayed as a DataList.

```blade
<x-spire::table
    responsive
    breakpoint="md"
    selectable
    selectMode="multiple"
    wire:model="selectedUsers"
>
    <x-spire::table.header>
        <x-spire::table.header-cell isCheckboxCell />
        <x-spire::table.header-cell responsive="primary">User</x-spire::table.header-cell>
        <x-spire::table.header-cell>Email</x-spire::table.header-cell>
        <x-spire::table.header-cell>Role</x-spire::table.header-cell>
        <x-spire::table.header-cell responsive="hidden">Experience</x-spire::table.header-cell>
        <x-spire::table.header-cell responsive="actions">Actions</x-spire::table.header-cell>
    </x-spire::table.header>

    <x-spire::table.body>
        @foreach($users as $user)
            <x-spire::table.row :value="(string) $user->id" :selectable="true">
                {{-- Primary: Shown as card header --}}
                <x-spire::table.cell responsive="primary">
                    <div class="flex items-center gap-3">
                        <x-spire::avatar :src="$user->avatar" :name="$user->name" size="sm" />
                        <span class="font-medium">{{ $user->name }}</span>
                    </div>
                </x-spire::table.cell>

                {{-- Secondary: Shown as DataList items with labels --}}
                <x-spire::table.cell label="Email">{{ $user->email }}</x-spire::table.cell>
                <x-spire::table.cell label="Role">
                    <x-spire::badge>{{ $user->role }}</x-spire::badge>
                </x-spire::table.cell>

                {{-- Hidden: Not shown on mobile --}}
                <x-spire::table.cell responsive="hidden">{{ $user->experience }} yrs</x-spire::table.cell>

                {{-- Actions: Shown at bottom of card --}}
                <x-spire::table.cell responsive="actions">
                    <x-spire::button size="sm" variant="ghost">Edit</x-spire::button>
                    <x-spire::button size="sm" variant="ghost" color="error">Delete</x-spire::button>
                </x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </x-spire::table.body>
</x-spire::table>
```

**Responsive Types:**

- `primary` - Shown prominently as the card header (no label)
- `secondary` (default) - Shown as DataList items with labels
- `actions` - Shown at the bottom of the card with separator
- `hidden` - Not displayed on mobile

**Breakpoints:**

- `sm` - Card layout below 640px
- `md` - Card layout below 768px (default)
- `lg` - Card layout below 1024px

### Full Featured Example with Livewire

```blade
<x-spire::table
    hoverable
    :selectable="true"
    selectMode="multiple"
    wire:model="selectedRows"
    x-data="{
        sortColumn: @entangle('sortColumn'),
        sortDirection: @entangle('sortDirection'),
        toggleSort(column) {
            $wire.toggleSort(column);
        }
    }"
>
    <x-slot:topContent>
        <div class="flex items-center justify-between">
            <span class="text-sm text-text-muted">
                {{ count($selectedRows) }} selected
            </span>
            <x-spire::button
                variant="bordered"
                color="error"
                :disabled="empty($selectedRows)"
                wire:click="bulkDelete"
            >
                Delete Selected
            </x-spire::button>
        </div>
    </x-slot:topContent>

    <thead>
        <tr>
            <x-spire::table.header-cell
                sortable
                sortKey="name"
                @click="toggleSort('name')"
            >
                Product
            </x-spire::table.header-cell>
            <x-spire::table.header-cell>Category</x-spire::table.header-cell>
            <x-spire::table.header-cell
                sortable
                sortKey="price"
                align="right"
                @click="toggleSort('price')"
            >
                Price
            </x-spire::table.header-cell>
            <x-spire::table.header-cell
                sortable
                sortKey="stock"
                align="center"
                @click="toggleSort('stock')"
            >
                Stock
            </x-spire::table.header-cell>
            <x-spire::table.header-cell align="center">Actions</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @forelse($products as $product)
            <x-spire::table.row
                wire:key="product-{{ $product['id'] }}"
                :value="$product['id']"
                :selectable="true"
            >
                <x-spire::table.cell>
                    <div>
                        <div class="font-medium text-text">{{ $product['name'] }}</div>
                        <div class="text-sm text-text-muted">{{ $product['sku'] }}</div>
                    </div>
                </x-spire::table.cell>
                <x-spire::table.cell>
                    <x-spire::badge color="default">{{ $product['category'] }}</x-spire::badge>
                </x-spire::table.cell>
                <x-spire::table.cell align="right" numeric>
                    ${{ number_format($product['price'], 2) }}
                </x-spire::table.cell>
                <x-spire::table.cell align="center">
                    @if($product['stock'] === 0)
                        <x-spire::badge color="error">Out of Stock</x-spire::badge>
                    @elseif($product['stock'] <= 10)
                        <x-spire::badge color="warning">{{ $product['stock'] }} left</x-spire::badge>
                    @else
                        <x-spire::badge color="success">{{ $product['stock'] }} in stock</x-spire::badge>
                    @endif
                </x-spire::table.cell>
                <x-spire::table.cell align="center">
                    <x-spire::dropdown>
                        <x-slot:trigger>
                            <x-spire::button
                                icon-only
                                variant="ghost"
                                size="sm"
                                aria-label="Row actions"
                            >
                                <x-spire::icon name="dots-vertical" />
                            </x-spire::button>
                        </x-slot:trigger>
                        <x-spire::dropdown.item wire:click="edit({{ $product['id'] }})">
                            Edit
                        </x-spire::dropdown.item>
                        <x-spire::dropdown.item wire:click="duplicate({{ $product['id'] }})">
                            Duplicate
                        </x-spire::dropdown.item>
                        <x-spire::dropdown.item
                            color="error"
                            wire:click="delete({{ $product['id'] }})"
                        >
                            Delete
                        </x-spire::dropdown.item>
                    </x-spire::dropdown>
                </x-spire::table.cell>
            </x-spire::table.row>
        @empty
            <tr>
                <td colspan="5">
                    <x-spire::table.empty-state message="No products found" />
                </td>
            </tr>
        @endforelse
    </tbody>

    <x-slot:bottomContent>
        {{ $products->links() }}
    </x-slot:bottomContent>
</x-spire::table>
```

---

## Alpine.js API

The table component uses Alpine.js for interactive functionality like selection and sorting.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `sortColumn` | string | Currently sorted column key |
| `sortDirection` | string | Sort direction: `'asc'`, `'desc'`, or `null` |
| `allSelected` | boolean | Whether all rows are selected |
| `someSelected` | boolean | Whether some (not all) rows are selected |
| `selectedCount` | number | Number of selected rows |

### Methods

| Method | Description |
|--------|-------------|
| `isRowSelected(value)` | Check if a specific row is selected |
| `toggleRow(value)` | Toggle selection state of a row |
| `toggleSelectAll(event)` | Toggle selection of all rows |
| `getAllRowValues()` | Get all row values from the DOM |
| `toggleSort(column)` | Toggle sort on a column |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spire-table-selection-changed` | `{ value, previousValue, name }` | Dispatched when selection changes. `value` is array of selected row values. |
| `spire-table-sort-changed` | `{ value, previousValue, name }` | Dispatched when sort changes. `value` is `{ column, direction }`. |

### Listening to Events

```javascript
window.addEventListener('spire-table-selection-changed', (event) => {
    console.log('Selected rows:', event.detail.value);
});

window.addEventListener('spire-table-sort-changed', (event) => {
    console.log('Sort:', event.detail.value.column, event.detail.value.direction);
});
```

---

## Best Practices

### Do

- Use `wire:key` on rows when using Livewire to ensure proper DOM diffing
- Always provide a unique `value` prop on rows when using selection
- Use `numeric` prop on cells containing numbers for proper alignment
- Add `align="right"` for numeric columns and `align="center"` for status/action columns
- Use `loading-state` component during async data fetches
- Provide meaningful `empty-state` messages
- Use `topContent` slot for search, filters, and bulk actions
- Use `bottomContent` slot for pagination
- Leverage Livewire's `wire:model` for two-way binding of selected rows

### Don't

- Don't mix `selectMode="single"` with bulk action UI patterns
- Don't forget to handle empty states gracefully
- Don't use selection without providing `value` props on rows
- Don't overload cells with too much content - keep them scannable
- Don't use `striped` and heavy custom row backgrounds together
- Don't forget `wire:key` when rows can be reordered or filtered

---

## Accessibility

- Table uses semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- Header cells use `scope="col"` for proper screen reader navigation
- Sortable columns have `aria-sort` attribute indicating current sort state
- Selection checkboxes have proper labels for screen readers
- Empty and loading states are announced to assistive technologies
- Focus management for interactive elements within cells
- Keyboard navigation support for sortable headers

---

## Technical Notes

### Livewire Integration

The table supports two-way binding with Livewire through `wire:model`:

```blade
<x-spire::table
    :selectable="true"
    selectMode="multiple"
    wire:model="selectedRows"
>
```

In your Livewire component:

```php
public array $selectedRows = [];
```

### Sorting with Livewire

For sortable columns, sync the sort state with your Livewire component:

```blade
<x-spire::table
    x-data="{
        sortColumn: @entangle('sortColumn'),
        sortDirection: @entangle('sortDirection'),
        toggleSort(column) {
            $wire.toggleSort(column);
        }
    }"
>
```

In your Livewire component:

```php
public ?string $sortColumn = 'name';
public ?string $sortDirection = 'asc';

public function toggleSort($column)
{
    if ($this->sortColumn === $column) {
        $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : null;
        if ($this->sortDirection === null) {
            $this->sortColumn = null;
        }
    } else {
        $this->sortColumn = $column;
        $this->sortDirection = 'asc';
    }
}
```

### Translations

The table component supports these translation keys under `spire-ui::spire-ui.table`:

- `select_all` - "Select all"
- `deselect_all` - "Deselect all"
- `rows_selected` - ":count rows selected" (with pluralization)
- `no_data` - "No data available"
- `loading` - "Loading..."
- `empty_message` - "No items to display"
- `sort_ascending` - "Sort ascending"
- `sort_descending` - "Sort descending"
- `remove_sort` - "Remove sort"
- `sort_by` - "Sort by :column"
- `select_row` - "Select row"
- `row_actions` - "Row actions"
