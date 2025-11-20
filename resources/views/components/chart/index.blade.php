@props([
    'value' => null,
    'curve' => 'smooth',
    'autoGutter' => true,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart');

// Get wire:model binding
$wireModel = $attributes->whereStartsWith('wire:model')->first();
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()])->except(['wire:model', 'wire:model.live']) }}
    x-data="spireChart({
        @if($wireModel)
            value: $wire.entangle('{{ $attributes->wire('model')->value() }}'),
        @else
            value: {{ json_encode($value ?? []) }},
        @endif
        curve: '{{ $curve }}',
        autoGutter: {{ $autoGutter ? 'true' : 'false' }}
    })"
    data-spire-chart
>
    <div wire:ignore class="contents">
        {{ $slot }}
    </div>
</div>
