@props([
    'placement' => 'bottom-start',
    'size' => spire_default('icon-picker', 'size', 'md'),
    'variant' => spire_default('icon-picker', 'variant', spire_default('icon-picker', 'input-variant', 'bordered')),
    'color' => 'default',
    'radius' => spire_default('icon-picker', 'radius', 'md'),
    'disabled' => false,
    'clearable' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('icon-picker-trigger')
    ->extends('input-box')
    ->size($size)
    ->colorVariant($color, $variant)
    ->radius($radius);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'class' => $builder->build() . ' cursor-pointer',
    'role' => 'combobox',
    'tabindex' => '0',
    'aria-haspopup' => 'listbox',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
    '@click' => $disabled ? '' : 'toggle()',
    '@keydown.enter.prevent' => $disabled ? '' : 'toggle()',
    '@keydown.space.prevent' => $disabled ? '' : 'toggle()',
    ':class' => "{ 'opacity-50 cursor-not-allowed': " . ($disabled ? 'true' : 'false') . " }",
    ...$builder->getDataAttributes(),
]);
@endphp

<div x-ref="trigger" class="w-full">
    <div {{ $mergedAttributes }}>
        <span class="flex items-center gap-2 flex-1 min-w-0" x-show="selectedIcon">
            <span
                class="shrink-0 flex items-center justify-center w-5 h-5"
                x-html="getSelectedIconHtml()"
            ></span>
            <span class="truncate text-text" x-text="selectedIcon"></span>
        </span>

        <span class="flex-1 text-left truncate spire-select-trigger__placeholder" x-text="placeholder" x-show="!selectedIcon"></span>

        <div class="flex items-center gap-1 shrink-0">
            @if($clearable)
                <button
                    type="button"
                    @click.stop="clearSelection()"
                    class="p-0.5 hover:bg-hover rounded transition-colors"
                    x-show="selectedIcon"
                    x-cloak
                    aria-label="{{ __('spire::spire-ui.icon-picker.clear') }}"
                >
                    <x-spire::icon name="x" class="w-4 h-4 text-text-muted" />
                </button>
            @endif

            <x-spire::icon name="chevron-down" class="w-4 h-4 text-text-muted transition-transform" x-bind:class="open ? 'rotate-180' : ''" />
        </div>
    </div>
</div>
