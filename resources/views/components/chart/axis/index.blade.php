@props([
    'axis' => 'x',
    'field' => null,
    'scale' => 'auto',
    'position' => null,
    'tickCount' => 5,
    'tickStart' => 'auto',
    'tickEnd' => 'auto',
    'tickValues' => null,
    'tickPrefix' => '',
    'tickSuffix' => '',
    'format' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-axis')
    ->modifier($axis);

// Default position based on axis
$position = $position ?? ($axis === 'x' ? 'bottom' : 'left');

// Parse tick values if string
$tickValuesArray = $tickValues;
if (is_string($tickValues)) {
    $tickValuesArray = json_decode($tickValues, true);
}

// Build tick config as JSON for data attribute
$tickConfig = [
    'count' => (int) $tickCount,
    'start' => $tickStart,
    'end' => $tickEnd,
    'values' => $tickValuesArray,
];
@endphp

<g
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-chart-axis="{{ $axis }}"
    data-spire-axis-field="{{ $field ?? '' }}"
    data-spire-axis-position="{{ $position }}"
    data-spire-axis-tick-config="{{ json_encode($tickConfig) }}"
    data-spire-axis-tick-prefix="{{ $tickPrefix }}"
    data-spire-axis-tick-suffix="{{ $tickSuffix }}"
    data-spire-axis-format="{{ json_encode($format ?? new stdClass()) }}"
>
    {{ $slot }}
</g>
