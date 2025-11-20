@props([
    'id' => null,
    'icon' => null,
    'href' => null,
    'active' => false,
    'disabled' => false,
    'badge' => null,
    'badgeColor' => 'primary',
    'shortcut' => null,
    'description' => null,
    'defaultExpanded' => false,
    'persist' => true,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('sidebar-item')
    ->when($active, fn($b) => $b->modifier('active'))
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->dataAttribute('active', $active ? 'true' : 'false')
    ->dataAttribute('disabled', $disabled ? 'true' : 'false')
    ->when($badge, fn($b) => $b->dataAttribute('has-badge', 'true'))
    ->when($badge, fn($b) => $b->dataAttribute('badge-color', $badgeColor));

// Check if slot has content (for nested items)
$hasChildren = isset($children) && trim($children) !== '';

// Use button for items with children (they toggle expand/collapse), link for navigation
$tag = ($href && !$disabled && !$hasChildren) ? 'a' : 'button';
@endphp

<div
    x-data="spireSidebarItem({
        defaultExpanded: @js($defaultExpanded),
        id: @js($id),
        persist: @js($persist)
    })"
    data-spire-sidebar-item-wrapper
>
    <{{ $tag }}
        @if($tag === 'a')
            href="{{ $href }}"
        @else
            type="button"
        @endif
        {{ $attributes->merge([
            'class' => $builder->build(),
            ...$builder->getDataAttributes(),
        ]) }}
        data-spire-sidebar-item
        @if($disabled)
            aria-disabled="true"
            @if($tag === 'button') disabled @endif
        @endif
        @if($active)
            aria-current="page"
        @endif
        @if($hasChildren)
            x-on:click="toggle()"
            x-bind:aria-expanded="expanded"
        @endif
    >
        @if($icon)
            <x-spire::tooltip placement="right" :delay="200" class="spire-sidebar-item-tooltip">
                <x-spire::icon :name="$icon" class="spire-sidebar-item-icon" />

                <x-slot:content>
                    @if(isset($label))
                        {{ $label }}@if($badge) ({{ $badge }})@endif
                    @else
                        {{ $slot }}@if($badge) ({{ $badge }})@endif
                    @endif
                </x-slot:content>
            </x-spire::tooltip>
        @endif

        <span class="spire-sidebar-item-label">
            @if(isset($label))
                {{ $label }}
            @else
                {{ $slot }}
            @endif

            @if($description)
                <span class="spire-sidebar-item-description">{{ $description }}</span>
            @endif
        </span>

        @if($badge)
            <span class="spire-sidebar-item-badge spire-sidebar-item-badge--{{ $badgeColor }}">
                {{ $badge }}
            </span>
        @endif

        @if($shortcut)
            <kbd class="spire-sidebar-item-shortcut">{{ $shortcut }}</kbd>
        @endif

        @if($hasChildren)
            <x-spire::icon
                name="chevron-down"
                class="spire-sidebar-item-chevron"
                x-bind:class="{ 'rotate-180': expanded }"
            />
        @endif
    </{{ $tag }}>

    @if($hasChildren)
        <div
            class="spire-sidebar-item-children"
            data-spire-sidebar-item-children
            x-show="expanded"
            x-collapse
        >
            {{ $children }}
        </div>
    @endif
</div>
