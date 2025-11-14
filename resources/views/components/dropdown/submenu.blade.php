@props([
    'label' => '',
    'icon' => null,
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors rounded-md';

$stateClasses = [
    'disabled' => 'text-text-disabled cursor-not-allowed',
    'normal' => 'text-text hover:bg-hover focus:bg-hover',
];

$selectedState = $disabled ? 'disabled' : 'normal';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $stateClasses[$selectedState],
]);
@endphp

<div
    x-data="{
        disabled: {{ $disabled ? 'true' : 'false' }},
        ...overlay({
            trigger: 'hover'
        }),
        show() {
            if (this.disabled) return;
            this.$refs.content?.showPopover();
        }
    }"
    x-id="['popover']"
    {{ $attributes }}
>
    <div x-ref="trigger">
        <button
            type="button"
            class="{{ $classString }}"
            role="menuitem"
            aria-haspopup="true"
            :aria-expanded="open"
            {{ $disabled ? 'disabled' : '' }}
        >
            @if($icon)
                <x-spire::icon :name="$icon" class="w-4 h-4 shrink-0" />
            @endif

            <span class="flex-1 text-left">{{ $label }}</span>

            <x-spire::icon name="chevron-right" class="w-4 h-4 shrink-0" />
        </button>
    </div>

    <div
        x-ref="content"
        :id="$id('popover')"
        popover="auto"
        class="min-w-[12rem] bg-surface border border-border rounded-lg shadow-lg p-1 animate-dropdown-bounce"
        role="menu"
        style="
            position-area: inline-end span-block-start;
            margin-inline-start: 0.25rem;
        "
    >
        {{ $slot }}
    </div>
</div>
