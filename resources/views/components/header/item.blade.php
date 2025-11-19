@props([
    'icon' => null,
    'iconTrailing' => null,
    'href' => null,
    'current' => false,
    'badge' => null,
    'badgeColor' => 'primary',
    'label' => null,
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('header-item')
    ->addIf($current, 'spire-header-item--current')
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
    @if($current) aria-current="page" @endif
    @if($hasLabel) aria-label="{{ $label }}" title="{{ $label }}" @endif
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-header-item
    @if($current) data-spire-current="true" @endif
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
