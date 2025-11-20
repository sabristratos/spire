@props([
    'value',
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tabs-trigger');

$tabId = 'tab-' . $value;
$panelId = 'panel-' . $value;
@endphp

<button
    {{ $attributes->merge(['class' => $builder->build()]) }}
    type="button"
    role="tab"
    id="{{ $tabId }}"
    aria-controls="{{ $panelId }}"
    x-bind:aria-selected="isActive('{{ $value }}') ? 'true' : 'false'"
    x-bind:tabindex="isActive('{{ $value }}') ? 0 : -1"
    x-bind:class="[
        $el.closest('[data-spire-tabs]')?.dataset.spireSize === 'sm' ? 'spire-tabs-trigger--sm' : '',
        $el.closest('[data-spire-tabs]')?.dataset.spireSize === 'md' ? 'spire-tabs-trigger--md' : '',
        $el.closest('[data-spire-tabs]')?.dataset.spireSize === 'lg' ? 'spire-tabs-trigger--lg' : '',
        'spire-tabs-trigger--' + ($el.closest('[data-spire-tabs]')?.dataset.spireVariant || 'underline'),
        'spire-tabs-trigger--' + ($el.closest('[data-spire-tabs]')?.dataset.spireColor || 'primary'),
    ]"
    @if($disabled) aria-disabled="true" @endif
    @click="selectTab('{{ $value }}')"
    @keydown="handleKeydown"
    data-spire-tabs-value="{{ $value }}"
>
    {{ $slot }}
</button>
