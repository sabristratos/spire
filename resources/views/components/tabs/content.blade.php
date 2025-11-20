@props([
    'value',
    'forceMount' => false,
    'lazy' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tabs-content');

$tabId = 'tab-' . $value;
$panelId = 'panel-' . $value;
@endphp

@if($lazy)
    {{-- Lazy loaded content: only renders after first activation --}}
    <template x-if="hasBeenActivated('{{ $value }}')">
        <div
            {{ $attributes->merge(['class' => $builder->build()]) }}
            role="tabpanel"
            id="{{ $panelId }}"
            aria-labelledby="{{ $tabId }}"
            tabindex="0"
            x-show="isActive('{{ $value }}')"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 translate-y-1"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100 translate-y-0"
            x-transition:leave-end="opacity-0 translate-y-1"
            data-spire-tabs-value="{{ $value }}"
        >
            {{ $slot }}
        </div>
    </template>
@else
    <div
        {{ $attributes->merge(['class' => $builder->build()]) }}
        role="tabpanel"
        id="{{ $panelId }}"
        aria-labelledby="{{ $tabId }}"
        tabindex="0"
        x-show="isActive('{{ $value }}')"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 translate-y-1"
        x-transition:enter-end="opacity-100 translate-y-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 translate-y-0"
        x-transition:leave-end="opacity-0 translate-y-1"
        @unless($forceMount) x-cloak @endunless
        data-spire-tabs-value="{{ $value }}"
    >
        {{ $slot }}
    </div>
@endif
