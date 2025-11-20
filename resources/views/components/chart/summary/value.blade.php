@props([
    'field' => 'value',
    'fallback' => null,
    'format' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-summary-value');
@endphp

<span
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-data="{
        field: '{{ $field }}',
        fallback: {{ $fallback ? "'" . $fallback . "'" : 'null' }},
        format: {{ $format ? json_encode($format) : '{}' }},

        getChart() {
            const chartEl = this.$el.closest('[data-spire-chart]');
            return chartEl ? Alpine.$data(chartEl) : null;
        },

        get value() {
            const chart = this.getChart();
            return chart ? chart.getCurrentValue(this.field, this.fallback) : this.fallback;
        },

        get formatted() {
            if (this.value === null || this.value === undefined) {
                return this.fallback ?? '';
            }
            const chart = this.getChart();
            return chart ? chart.formatValue(this.value, this.format) : this.value;
        }
    }"
    data-spire-chart-summary-value
    x-text="formatted"
></span>
