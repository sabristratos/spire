@props([
    'variant' => 'flat',
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
    'sortColumn' => null,
    'sortDirection' => null,
    'responsive' => false,
    'breakpoint' => 'md',
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);

$wrapperBuilder = ComponentClass::make('table-wrapper')
    ->radius($radius)
    ->shadow($shadow);

$builder = ComponentClass::make('table')
    ->modifier($variant)
    ->when($striped, fn($b) => $b->modifier('striped'))
    ->when($hoverable, fn($b) => $b->modifier('hoverable'))
    ->when($responsive, fn($b) => $b->modifier('responsive')->modifier("responsive-{$breakpoint}"))
    ->dataAttribute('table-selectable', $selectable ? 'true' : 'false')
    ->dataAttribute('table-select-mode', $selectMode)
    ->dataAttribute('loading', $loading ? 'true' : null);

$elementBuilder = ComponentClass::make('table-element')
    ->when($layout === 'fixed', fn($b) => $b->modifier('fixed'));
@endphp

<div {{ $attributes->only(['class', 'id', 'wire:key'])->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}
     x-data="spireTable({
        @if($wireConfig->hasWireModel())
            selectedRows: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @else
            selectedRows: [],
        @endif
        selectable: {{ $selectable ? 'true' : 'false' }},
        selectMode: '{{ $selectMode }}',
        virtualScroll: {{ $virtualScroll ? 'true' : 'false' }},
        sortColumn: {{ $sortColumn ? "'" . $sortColumn . "'" : 'null' }},
        sortDirection: {{ $sortDirection ? "'" . $sortDirection . "'" : 'null' }}
     })"
     @keydown="handleKeydown($event)"
     aria-busy="{{ $loading ? 'true' : 'false' }}"
     role="grid">

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
                <table class="{{ $elementBuilder->build() }}">
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
