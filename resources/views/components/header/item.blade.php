@props([
    'icon' => null,
    'iconTrailing' => null,
    'href' => null,
    'route' => null,
    'active' => null,
    'current' => null,  // Deprecated: use 'active' instead
    'activeWhen' => null,
    'activeRoute' => null,
    'activeMatch' => 'exact',
    'autoActive' => true,
    'badge' => null,
    'badgeColor' => 'primary',
    'label' => null,
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

// Backward compatibility: support 'current' as alias for 'active'
$isActive = $active ?? $current;

// Auto-detect active state
if ($isActive === null && $autoActive) {
    // Priority 1: Custom activeWhen pattern
    if ($activeWhen !== null) {
        $isActive = spire_is_active(patterns: $activeWhen);
    }
    // Priority 2: Custom activeRoute pattern
    elseif ($activeRoute !== null) {
        $isActive = spire_is_active(patterns: $activeRoute);
    }
    // Priority 3: Named route detection
    elseif ($route !== null) {
        $isActive = spire_is_active(route: $route);
    }
    // Priority 4: href URL matching
    elseif ($href !== null) {
        $isActive = spire_is_active(href: $href, match: $activeMatch);
    }
}

// Fallback to false if still null
$isActive = $isActive ?? false;

// Generate href if route provided but href not
if ($href === null && $route !== null) {
    try {
        $href = route($route);
    } catch (\Exception $e) {
        // Route requires parameters or doesn't exist
        $href = null;
    }
}

$builder = ComponentClass::make('header-item')
    ->addIf($isActive, 'spire-header-item--active')
    ->addIf($isActive, 'spire-header-item--current')  // Backward compatibility
    ->addIf($disabled, 'spire-header-item--disabled')
    ->addIf(!$slot->isEmpty() && !$icon, 'spire-header-item--text-only')
    ->addIf($icon && $slot->isEmpty() && !$label, 'spire-header-item--icon-only');

$tag = $href && !$disabled ? 'a' : 'button';
$hasLabel = $icon && $slot->isEmpty() && $label;
@endphp

<{{ $tag }}
    @if($href && !$disabled) href="{{ $href }}" @endif
    @if($tag === 'button') type="button" @endif
    @if($disabled) disabled aria-disabled="true" @endif
    @if($isActive) aria-current="page" @endif
    @if($hasLabel) aria-label="{{ $label }}" title="{{ $label }}" @endif
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-header-item
    @if($isActive) data-spire-active="true" @endif
    @if($isActive) data-spire-current="true" @endif {{-- Backward compatibility --}}
>
    @if($icon)
        <x-spire::icon :name="$icon" class="spire-header-item-icon" />
    @endif

    @if(!$slot->isEmpty())
        <span class="spire-header-item-label">{{ $slot }}</span>
    @endif

    @if($iconTrailing)
        <x-spire::icon :name="$iconTrailing" class="spire-header-item-icon spire-header-item-icon--trailing" />
    @endif

    @if($badge)
        <span class="spire-header-item-badge spire-header-item-badge--{{ $badgeColor }}">
            {{ $badge }}
        </span>
    @endif
</{{ $tag }}>
