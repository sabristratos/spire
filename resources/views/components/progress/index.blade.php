@props([
    'value' => 0,
    'max' => 100,
    'size' => config('spire-ui.defaults.progress.size', config('spire-ui.defaults.size', 'md')),
    'color' => config('spire-ui.defaults.progress.color', 'primary'),
    'variant' => config('spire-ui.defaults.progress.variant', 'solid'),
    'animated' => false,
    'indeterminate' => false,
    'showLabel' => false,
    'labelPosition' => 'inside',
    'radius' => config('spire-ui.defaults.progress.radius', 'full'),
    'label' => null,
])

@php
use SpireUI\Support\ComponentClass;

// Calculate percentage
$percentage = $max > 0 ? min(100, max(0, ($value / $max) * 100)) : 0;
$displayLabel = $label ?? round($percentage) . '%';

// Build container classes
$containerBuilder = ComponentClass::make('progress')
    ->size($size)
    ->radius($radius)
    ->when($indeterminate, fn($b) => $b->modifier('indeterminate'))
    ->dataAttribute('indeterminate', $indeterminate ? 'true' : 'false');

// Map colors to background classes
$colorBgMap = [
    'primary' => 'bg-primary',
    'secondary' => 'bg-secondary',
    'success' => 'bg-success',
    'error' => 'bg-error',
    'warning' => 'bg-warning',
    'info' => 'bg-info',
    'featured' => 'bg-featured',
    'default' => 'bg-text-muted',
];

$bgColorClass = $colorBgMap[$color] ?? 'bg-primary';

// Build bar classes
$barBuilder = ComponentClass::make('progress')
    ->modifier('bar')
    ->when($variant !== 'gradient', fn($b) => $b->addClass($bgColorClass))
    ->when($variant === 'striped', fn($b) => $b->modifier('striped'))
    ->when($variant === 'gradient', fn($b) => $b->modifier('gradient')->modifier('color-' . $color))
    ->when($animated && $variant === 'striped', fn($b) => $b->modifier('animated'));

// Build label classes based on position
$labelBuilder = ComponentClass::make('progress')
    ->modifier('label')
    ->modifier("label-{$labelPosition}");

// Determine if label should be inside the bar
$labelInside = $labelPosition === 'inside';
$labelOutside = $labelPosition === 'outside';
$labelTop = $labelPosition === 'top';
@endphp

@if($labelTop && $showLabel)
<div class="spire-progress-wrapper">
    <div class="spire-progress-top">
        <span {{ $attributes->only(['wire:model', 'x-text'])->merge(['class' => $labelBuilder->build()]) }}>
            {{ $displayLabel }}
        </span>
    </div>
@endif

<div
    {{ $attributes->except(['wire:model', 'x-text'])->merge([
        'class' => $containerBuilder->build(),
        'role' => 'progressbar',
        'aria-valuenow' => $indeterminate ? null : $value,
        'aria-valuemin' => 0,
        'aria-valuemax' => $max,
        'aria-label' => $indeterminate ? __('spire-ui::progress.loading') : $displayLabel,
        ...$containerBuilder->getDataAttributes(),
    ]) }}
    @if(!$indeterminate)
    x-data="spireProgress({ value: {{ $percentage }} })"
    @endif
>
    <div
        class="{{ $barBuilder->build() }}"
        @if(!$indeterminate)
        x-bind:style="'width: ' + currentValue + '%'"
        style="width: {{ $percentage }}%"
        @endif
    >
        @if($labelInside && $showLabel && !$indeterminate)
        <span class="{{ $labelBuilder->build() }}">
            {{ $displayLabel }}
        </span>
        @endif
    </div>

    @if($labelOutside && $showLabel && !$indeterminate)
    <span class="{{ $labelBuilder->build() }}">
        {{ $displayLabel }}
    </span>
    @endif
</div>

@if($labelTop && $showLabel)
</div>
@endif
