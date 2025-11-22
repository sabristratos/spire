@props([
    'value',
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tabs-trigger');
@endphp

<button
    {{ $attributes->merge(['class' => $builder->build()]) }}
    type="button"
    role="tab"
    x-bind:id="getTabId('{{ $value }}')"
    x-bind:aria-controls="getPanelId('{{ $value }}')"
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
    @click="!{{ $disabled ? 'true' : 'false' }} && selectTab('{{ $value }}')"
    @keydown="handleKeydown"
    data-spire-tabs-value="{{ $value }}"
>
    {{ $slot }}
</button>
