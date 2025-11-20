@props([
    'y1' => '0',
    'y2' => '6',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-mark');
@endphp

<g data-spire-chart-marks>
    <template x-for="(tick, index) in ticks" :key="index">
        <line
            {{ $attributes->merge(['class' => $builder->build()]) }}
            :x1="axis === 'x' ? getTickPosition(tick) : (position === 'right' ? $parent.xRange[1] : $parent.xRange[0])"
            :y1="axis === 'x' ? (position === 'top' ? $parent.yRange[0] - {{ $y2 }} : $parent.yRange[1]) : getTickPosition(tick)"
            :x2="axis === 'x' ? getTickPosition(tick) : (position === 'right' ? $parent.xRange[1] + {{ $y2 }} : $parent.xRange[0] - {{ $y2 }})"
            :y2="axis === 'x' ? (position === 'top' ? $parent.yRange[0] : $parent.yRange[1] + {{ $y2 }}) : getTickPosition(tick)"
            stroke="currentColor"
            data-spire-chart-mark
        />
    </template>
</g>
