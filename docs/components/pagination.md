# Pagination Component

Pagination component for Laravel paginators with automatic Livewire support. Registers as Laravel's default pagination view for zero-config usage.

## Overview

The pagination component provides styled navigation for paginated data. It:

- Automatically registers as Laravel's default pagination view
- Detects Livewire context and uses appropriate navigation methods
- Supports both full pagination (with page numbers) and simple pagination (previous/next only)
- Works with `LengthAwarePaginator`, `Paginator`, and `CursorPaginator`

## Installation

The pagination views are automatically registered when you install Spire UI. No additional configuration required.

### Livewire Integration

For Livewire components, add the `WithSpirePagination` trait alongside `WithPagination`:

```php
use Livewire\Component;
use Livewire\WithPagination;
use SpireUI\Traits\WithSpirePagination;

class UserList extends Component
{
    use WithPagination, WithSpirePagination;

    public function render()
    {
        return view('livewire.user-list', [
            'users' => User::paginate(10),
        ]);
    }
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `onEachSide` | integer | `1` | Number of page links on each side of current page |
| `showInfo` | boolean | `false` | Show "Showing X to Y of Z results" info |
| `showFirstLast` | boolean | `true` | Show first/last page navigation buttons |
| `previousLabel` | string | `'Previous'` | Custom label for previous button (simple variant) |
| `nextLabel` | string | `'Next'` | Custom label for next button (simple variant) |

---

## Usage

### Basic Usage (Zero Config)

Simply call `->links()` on any Laravel paginator:

```blade
{{ $users->links() }}
```

This automatically uses Spire UI's styled pagination.

### With Options

Pass options via the `data` parameter:

```blade
{{ $users->links(data: ['showInfo' => true, 'size' => 'sm']) }}
```

### Simple Pagination

For previous/next only navigation:

```blade
{{-- In your controller/component --}}
$users = User::simplePaginate(10);

{{-- In your view --}}
{{ $users->links() }}
```

### Cursor Pagination

For cursor-based pagination:

```blade
{{-- In your controller/component --}}
$users = User::cursorPaginate(10);

{{-- In your view --}}
{{ $users->links() }}
```

### In Table Footer

Common pattern with the table component:

```blade
<x-spire::table hoverable>
    <thead>
        <tr>
            <x-spire::table.header-cell>Name</x-spire::table.header-cell>
            <x-spire::table.header-cell>Email</x-spire::table.header-cell>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
            <x-spire::table.row>
                <x-spire::table.cell>{{ $user->name }}</x-spire::table.cell>
                <x-spire::table.cell>{{ $user->email }}</x-spire::table.cell>
            </x-spire::table.row>
        @endforeach
    </tbody>

    <x-slot:bottomContent>
        {{ $users->links(data: ['showInfo' => true]) }}
    </x-slot:bottomContent>
</x-spire::table>
```

### With Card Component

```blade
<x-spire::card>
    <x-spire::card.body>
        {{-- Content --}}
    </x-spire::card.body>
    <x-spire::card.footer>
        {{ $items->links(data: ['showInfo' => true, 'size' => 'sm']) }}
    </x-spire::card.footer>
</x-spire::card>
```

### Livewire Component Example

```php
<?php

namespace App\Livewire;

use App\Models\User;
use Livewire\Component;
use Livewire\WithPagination;
use SpireUI\Traits\WithSpirePagination;

class UserList extends Component
{
    use WithPagination, WithSpirePagination;

    public string $search = '';

    public function updatedSearch()
    {
        $this->resetPage();
    }

    public function render()
    {
        return view('livewire.user-list', [
            'users' => User::query()
                ->when($this->search, fn($q) => $q->where('name', 'like', "%{$this->search}%"))
                ->paginate(10),
        ]);
    }
}
```

```blade
{{-- resources/views/livewire/user-list.blade.php --}}
<div>
    <x-spire::input
        wire:model.live.debounce.300ms="search"
        placeholder="Search users..."
        icon="search"
    />

    <ul class="mt-4 space-y-2">
        @foreach($users as $user)
            <li>{{ $user->name }}</li>
        @endforeach
    </ul>

    <div class="mt-4">
        {{ $users->links() }}
    </div>
</div>
```

### Array/Collection Pagination

For paginating arrays or collections (e.g., in demo components):

```php
use Illuminate\Pagination\LengthAwarePaginator;
use Livewire\WithPagination;
use SpireUI\Traits\WithSpirePagination;

class DemoComponent extends Component
{
    use WithPagination, WithSpirePagination;

    public int $perPage = 10;

    public function getUsersProperty(): LengthAwarePaginator
    {
        $items = collect([
            ['id' => 1, 'name' => 'John'],
            ['id' => 2, 'name' => 'Jane'],
            // ...
        ]);

        $page = $this->getPage();

        return new LengthAwarePaginator(
            $items->forPage($page, $this->perPage)->values(),
            $items->count(),
            $this->perPage,
            $page,
            ['path' => request()->url(), 'pageName' => 'page']
        );
    }

    public function render()
    {
        return view('livewire.demo-component');
    }
}
```

```blade
{{-- In the view --}}
@foreach($this->users as $user)
    {{-- ... --}}
@endforeach

{{ $this->users->links() }}
```

---

## Configuration

### Disabling Auto-Registration

To prevent Spire UI from registering as Laravel's default pagination view:

```php
// config/spire-ui.php
'pagination' => [
    'register_default' => false,
],
```

Or via environment variable:

```env
SPIRE_UI_PAGINATION_DEFAULT=false
```

When disabled, you can still use Spire pagination explicitly:

```blade
{{ $users->links('spire::components.pagination.default') }}
```

### Using Custom Pagination View

You can always specify a custom view:

```blade
{{-- Use Spire pagination explicitly --}}
{{ $users->links('spire::components.pagination.default') }}

{{-- Use simple pagination --}}
{{ $users->links('spire::components.pagination.simple') }}

{{-- Use Laravel's default --}}
{{ $users->links('pagination::tailwind') }}
```

---

## Variants

### Default (Full Pagination)

Shows page numbers with ellipsis for large page counts:

```
[<<] [<] [1] [...] [4] [5] [6] [...] [10] [>] [>>]
```

### Simple Pagination

Shows only previous/next buttons:

```
[< Previous] [Next >]
```

Used automatically with `simplePaginate()` or cursor pagination.

---

## Sizes

### Small (`sm`)

```blade
{{ $users->links(data: ['size' => 'sm']) }}
```

### Medium (`md`) - Default

```blade
{{ $users->links() }}
```

### Large (`lg`)

```blade
{{ $users->links(data: ['size' => 'lg']) }}
```

---

## Accessibility

- Uses semantic `<nav>` element with `role="navigation"`
- Includes `aria-label` for navigation context
- Current page marked with `aria-current="page"`
- Disabled buttons have `aria-disabled="true"`
- All navigation buttons have descriptive `aria-label` attributes
- First/last page buttons include clear labels

---

## Customization

### Custom Previous/Next Labels

For simple pagination:

```blade
{{ $users->links(data: [
    'previousLabel' => 'Back',
    'nextLabel' => 'Forward',
]) }}
```

### Adjust Page Links

Control how many page links appear on each side of current page:

```blade
{{-- Show more pages: 1 2 3 [4] 5 6 7 --}}
{{ $users->links(data: ['onEachSide' => 3]) }}

{{-- Minimal: 1 ... [4] ... 10 --}}
{{ $users->links(data: ['onEachSide' => 0]) }}
```

### Hide First/Last Buttons

```blade
{{ $users->links(data: ['showFirstLast' => false]) }}
```

---

## Best Practices

### Do

- Use `WithSpirePagination` trait in all Livewire components with pagination
- Reset to page 1 when filters change using `$this->resetPage()`
- Show pagination info (`showInfo`) for data-heavy tables
- Use smaller size (`sm`) in compact layouts like table footers
- Consider `simplePaginate()` for infinite scroll or when total count isn't needed

### Don't

- Don't forget `WithSpirePagination` trait in Livewire (falls back to Livewire's default)
- Don't use full pagination for very large datasets (use cursor pagination instead)
- Don't hide pagination when there's only one page - let users see the count

---

## Technical Notes

### Livewire Detection

The pagination component automatically detects when it's rendered within a Livewire component and uses `wire:click` with Livewire's pagination methods (`gotoPage`, `previousPage`, `nextPage`) instead of `<a>` links.

### URL Window Algorithm

The component uses Laravel's `UrlWindow` class to calculate which page numbers to display with proper ellipsis placement, ensuring a clean UI even with hundreds of pages.

### WithSpirePagination Trait

The trait is necessary for Livewire components because Livewire's `WithPagination` trait overrides `Paginator::defaultView()` on every component render. The trait provides:

```php
public function paginationView()
{
    return 'spire::components.pagination.default';
}

public function paginationSimpleView()
{
    return 'spire::components.pagination.simple';
}
```

---

## CSS Classes

The pagination component uses BEM-style classes for styling:

- `.spire-pagination` - Main container
- `.spire-pagination__info` - Results info text
- `.spire-pagination__nav` - Navigation buttons container
- `.spire-pagination__button` - Navigation button
- `.spire-pagination__button--icon` - Icon-only button
- `.spire-pagination__button--active` - Current page
- `.spire-pagination__button--disabled` - Disabled state
- `.spire-pagination__ellipsis` - Ellipsis separator
- `.spire-pagination__icon` - Icon element
- `.spire-pagination--sm` / `--lg` - Size modifiers
