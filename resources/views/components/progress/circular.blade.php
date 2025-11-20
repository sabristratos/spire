@props([
    'value' => 0,
    'max' => 100,
    'size' => config('spire-ui.defaults.progress.circular.size', 48),
    'strokeWidth' => config('spire-ui.defaults.progress.circular.strokeWidth', 4),
    'color' => config('spire-ui.defaults.progress.color', 'primary'),
    'showLabel' => true,
    'indeterminate' => false,
    'label' => null,
    'trackColor' => null,
])

@php
use SpireUI\Support\ComponentClass;

// Calculate dimensions
$radius = ($size - $strokeWidth) / 2;
$circumference = 2 * pi() * $radius;
$percentage = $max > 0 ? min(100, max(0, ($value / $max) * 100)) : 0;
$offset = $circumference - ($percentage / 100) * $circumference;
$displayLabel = $label ?? round($percentage) . '%';
$center = $size / 2;

// Build container classes
$containerBuilder = ComponentClass::make('progress-circular')
    ->color($color)
    ->when($indeterminate, fn($b) => $b->modifier('indeterminate'))
    ->dataAttribute('indeterminate', $indeterminate ? 'true' : 'false');

// Build label classes
$labelBuilder = ComponentClass::make('progress-circular')
    ->modifier('label');

// Color class for the progress stroke
$strokeColorClass = "stroke-{$color}";
$trackColorClass = $trackColor ? "stroke-{$trackColor}" : 'stroke-border';
@endphp

<div
    {{ $attributes->merge([
        'class' => $containerBuilder->build(),
        'role' => 'progressbar',
        'aria-valuenow' => $indeterminate ? null : $value,
        'aria-valuemin' => 0,
        'aria-valuemax' => $max,
        'aria-label' => $indeterminate ? __('spire-ui::progress.loading') : $displayLabel,
        'style' => "width: {$size}px; height: {$size}px;",
        ...$containerBuilder->getDataAttributes(),
    ]) }}
    @if(!$indeterminate)
    x-data="spireProgressCircular({ value: {{ $percentage }}, circumference: {{ $circumference }}, offset: {{ $offset }} })"
    @endif
>
    <svg
        class="spire-progress-circular__svg"
        width="{{ $size }}"
        height="{{ $size }}"
        viewBox="0 0 {{ $size }} {{ $size }}"
    >
        {{-- Background track --}}
        <circle
            class="spire-progress-circular__track {{ $trackColorClass }}"
            cx="{{ $center }}"
            cy="{{ $center }}"
            r="{{ $radius }}"
            stroke-width="{{ $strokeWidth }}"
            fill="none"
        />

        {{-- Progress arc --}}
        <circle
            class="spire-progress-circular__bar {{ $strokeColorClass }}"
            cx="{{ $center }}"
            cy="{{ $center }}"
            r="{{ $radius }}"
            stroke-width="{{ $strokeWidth }}"
            fill="none"
            stroke-linecap="round"
            @if(!$indeterminate)
            x-bind:stroke-dashoffset="currentOffset"
            stroke-dasharray="{{ $circumference }}"
            stroke-dashoffset="{{ $offset }}"
            @else
            stroke-dasharray="{{ $circumference * 0.25 }} {{ $circumference * 0.75 }}"
            @endif
            transform="rotate(-90 {{ $center }} {{ $center }})"
        />
    </svg>

    @if($showLabel && !$indeterminate)
    <span class="{{ $labelBuilder->build() }}">
        {{ $slot->isEmpty() ? $displayLabel : $slot }}
    </span>
    @elseif(!$slot->isEmpty())
    <span class="{{ $labelBuilder->build() }}">
        {{ $slot }}
    </span>
    @endif
</div>
