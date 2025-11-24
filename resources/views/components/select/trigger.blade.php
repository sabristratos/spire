@props([
    'multiple' => false,
    'size' => spire_default('select', 'size', 'md'),
    'variant' => spire_default('select', 'variant', spire_default('select', 'input-variant', 'bordered')),
    'color' => 'default',
    'radius' => spire_default('select', 'radius', 'md'),
    'maxTagsDisplay' => 2,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('select-trigger')
    ->extends('input-box')
    ->size($size)
    ->colorVariant($color, $variant)
    ->radius($radius);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'class' => $builder->build(),
    'type' => 'button',
    '@click' => 'toggle()',
    'aria-haspopup' => 'listbox',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
    ...$builder->getDataAttributes(),
]);
@endphp

<div x-ref="trigger" class="w-full">
    <button {{ $mergedAttributes }}>
        @if($multiple)
            {{-- Multiselect: Show tags for selected items --}}
            <div class="flex-1 flex items-center gap-1.5 min-w-0" x-show="selectedItems.length > 0">
                <template x-for="(item, index) in selectedItems.slice(0, {{ $maxTagsDisplay }})" :key="item.value">
                    <span class="spire-select-tag">
                        <span class="truncate max-w-[8rem]" x-text="item.label"></span>
                        <button
                            type="button"
                            @click.stop="removeOption(item.value)"
                            class="shrink-0 flex items-center justify-center hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            :aria-label="'Remove ' + item.label"
                        >
                            <x-spire::icon name="x" class="w-3 h-3" />
                        </button>
                    </span>
                </template>

                <span
                    x-show="selectedItems.length > {{ $maxTagsDisplay }}"
                    class="spire-select-tag"
                    x-text="moreItemsText.replace(':count', selectedItems.length - {{ $maxTagsDisplay }})"
                ></span>
            </div>

            <span class="flex-1 text-left truncate spire-select-trigger__placeholder" x-text="placeholder" x-show="selectedItems.length === 0"></span>
        @else
            {{-- Single select: Show selected label or placeholder --}}
            <span class="flex-1 text-left truncate text-text" x-text="selectedLabel" x-show="selectedLabel"></span>
            <span class="flex-1 text-left truncate spire-select-trigger__placeholder" x-text="placeholder" x-show="!selectedLabel"></span>
        @endif

        <x-spire::icon name="chevron-down" class="w-4 h-4 shrink-0 text-muted transition-transform" x-bind:class="open ? 'rotate-180' : ''" />
    </button>
</div>
