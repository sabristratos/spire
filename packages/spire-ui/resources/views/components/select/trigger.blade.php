@props([
    'multiple' => false,
    'size' => 'md',
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
    'maxTagsDisplay' => 2,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'flex items-center justify-between gap-2 w-full transition-fast';

$sizeClasses = [
    'sm' => 'h-8 px-2 text-sm',
    'md' => 'h-10 px-2 text-base',
    'lg' => 'h-12 px-2 text-lg',
];

$variantKey = "input-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'type' => 'button',
    'aria-haspopup' => 'listbox',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
]);
@endphp

<div x-ref="trigger" class="w-full">
    <button {{ $mergedAttributes }}>
        @if($multiple)
            {{-- Multiselect: Show tags for selected items --}}
            <div class="flex-1 flex items-center gap-1.5 min-w-0" x-show="selectedItems.length > 0">
                <template x-for="(item, index) in selectedItems.slice(0, {{ $maxTagsDisplay }})" :key="item.value">
                    <span
                        class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                        data-spire-select-tag
                    >
                        <span class="truncate max-w-[8rem]" x-text="item.label"></span>
                        <button
                            type="button"
                            @click.stop="removeOption(item.value)"
                            class="shrink-0 hover:bg-primary/20 rounded-sm p-0.5 transition-colors"
                            :aria-label="'Remove ' + item.label"
                        >
                            <x-spire::icon name="x" class="w-3 h-3" />
                        </button>
                    </span>
                </template>

                <span
                    x-show="selectedItems.length > {{ $maxTagsDisplay }}"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-surface-hover text-text-muted"
                    x-text="moreItemsText.replace(':count', selectedItems.length - {{ $maxTagsDisplay }})"
                ></span>
            </div>

            <span class="flex-1 text-left truncate text-text-muted" x-text="placeholder" x-show="selectedItems.length === 0"></span>
        @else
            {{-- Single select: Show selected label or placeholder --}}
            <span class="flex-1 text-left truncate text-text" x-text="selectedLabel" x-show="selectedLabel"></span>
            <span class="flex-1 text-left truncate text-text-muted" x-text="placeholder" x-show="!selectedLabel"></span>
        @endif

        <x-spire::icon name="chevron-down" class="w-4 h-4 shrink-0 text-text-muted transition-transform" x-bind:class="open ? 'rotate-180' : ''" />
    </button>
</div>
