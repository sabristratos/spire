@props([
    'variant' => 'bordered',
    'size' => 'md',
    'radius' => 'md',
    'shadow' => 'none',
    'selectable' => false,
    'selectMode' => 'multiple',
    'stickyHeader' => false,
    'striped' => false,
    'hoverable' => true,
    'maxHeight' => null,
    'virtualScroll' => false,
    'loading' => false,
    'emptyMessage' => null,
    'topContentPlacement' => 'inside',
    'bottomContentPlacement' => 'inside',
    'layout' => 'auto',
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);

$wrapperBuilder = ComponentClass::make('table-wrapper')
    ->radius($radius)
    ->shadow($shadow);

$builder = ComponentClass::make('table')
    ->when($striped, fn($b) => $b->modifier('striped'))
    ->when($hoverable, fn($b) => $b->modifier('hoverable'))
    ->dataAttribute('selectable', $selectable ? 'true' : null)
    ->dataAttribute('select-mode', $selectMode);

$elementBuilder = ComponentClass::make('table-element')
    ->when($layout === 'fixed', fn($b) => $b->modifier('fixed'));

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<div {{ $attributes->only(['class', 'id', 'wire:key']) }}
     x-data="spireTable({
        @if($wireConfig->hasWireModel())
            selectedRows: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @else
            selectedRows: [],
        @endif
        selectable: {{ $selectable ? 'true' : 'false' }},
        selectMode: '{{ $selectMode }}',
        virtualScroll: {{ $virtualScroll ? 'true' : 'false' }}
     })"
     x-init="init()">

    <div class="{{ $wrapperBuilder->build() }}" {!! collect($wrapperBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}>
        @if($topContentPlacement === 'outside' && isset($topContent))
            <div class="spire-table-top-content">
                {{ $topContent }}
            </div>
        @endif

        @if($loading)
            <x-spire::table.loading-state />
        @elseif($empty ?? false)
            <x-spire::table.empty-state :message="$emptyMessage" />
        @else
            @if($topContentPlacement === 'inside' && isset($topContent))
                <div class="spire-table-top-content">
                    {{ $topContent }}
                </div>
            @endif

            <div class="spire-table-container {{ $maxHeight ? 'spire-table-container--max-height' : '' }}"
                 @if($maxHeight) style="max-height: {{ $maxHeight }}" @endif>
                <table class="{{ $elementBuilder->build() }}" role="table">
                    {{ $slot }}
                </table>
            </div>

            @if($bottomContentPlacement === 'inside' && isset($bottomContent))
                <div class="spire-table-bottom-content">
                    {{ $bottomContent }}
                </div>
            @endif
        @endif

        @if($bottomContentPlacement === 'outside' && isset($bottomContent))
            <div class="spire-table-bottom-content">
                {{ $bottomContent }}
            </div>
        @endif
    </div>
</div>
