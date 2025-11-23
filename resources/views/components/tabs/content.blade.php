@props([
    'value',
    'forceMount' => false,
    'lazy' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tabs-content');
@endphp

@if($lazy)
    {{-- Lazy loaded content: only renders after first activation --}}
    <template x-if="hasBeenActivated('{{ $value }}')">
        <div
            {{ $attributes->merge(['class' => $builder->build()]) }}
            role="tabpanel"
            x-bind:id="getPanelId('{{ $value }}')"
            x-bind:aria-labelledby="getTabId('{{ $value }}')"
            tabindex="0"
            x-show="isActive('{{ $value }}')"
            data-spire-tabs-value="{{ $value }}"
        >
            {{ $slot }}
        </div>
    </template>
@else
    <div
        {{ $attributes->merge(['class' => $builder->build()]) }}
        role="tabpanel"
        x-bind:id="getPanelId('{{ $value }}')"
        x-bind:aria-labelledby="getTabId('{{ $value }}')"
        tabindex="0"
        x-show="isActive('{{ $value }}')"
        @unless($forceMount) x-cloak @endunless
        data-spire-tabs-value="{{ $value }}"
    >
        {{ $slot }}
    </div>
@endif
