@props([
    'placement' => 'bottom-start',
    'size' => spire_default('color-picker', 'size', 'md'),
    'variant' => spire_default('color-picker', 'variant', spire_default('color-picker', 'input-variant', 'bordered')),
    'color' => 'default',
    'radius' => spire_default('color-picker', 'radius', 'md'),
    'disabled' => false,
    'clearable' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('color-picker-trigger')
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
    'aria-haspopup' => 'dialog',
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
        <span class="flex items-center gap-2 flex-1 min-w-0" x-show="value">
            <span
                class="shrink-0 w-5 h-5 rounded border border-border"
                :style="'background-color: ' + value"
            ></span>
            <span class="truncate text-text font-mono text-sm" x-text="value"></span>
        </span>

        <span class="flex-1 text-left truncate spire-select-trigger__placeholder" x-text="placeholder" x-show="!value"></span>

        <div class="flex items-center gap-1 shrink-0">
            @if($clearable)
                <button
                    type="button"
                    @click.stop="clearSelection()"
                    class="p-0.5 hover:bg-hover rounded transition-colors"
                    x-show="value"
                    x-cloak
                    aria-label="{{ __('spire::spire-ui.color-picker.clear') }}"
                >
                    <x-spire::icon name="x" class="w-4 h-4 text-muted" />
                </button>
            @endif

            <x-spire::icon name="chevron-down" class="w-4 h-4 text-muted transition-transform" x-bind:class="open ? 'rotate-180' : ''" />
        </div>
    </div>
</div>
