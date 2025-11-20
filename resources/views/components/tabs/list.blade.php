@props([
    'label' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tabs-list');
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()]) }}
    role="tablist"
    x-bind:aria-orientation="orientation"
    x-bind:class="{
        'spire-tabs-list--horizontal': orientation === 'horizontal',
        'spire-tabs-list--vertical': orientation === 'vertical',
        'spire-tabs-list--full-width': $el.closest('[data-spire-tabs]')?.dataset.spireFullWidth === 'true',
        'spire-tabs-list--scrollable': $el.closest('[data-spire-tabs]')?.dataset.spireScrollable === 'true'
    }"
    @if($label)
        aria-label="{{ $label }}"
    @endif
>
    {{-- Animated cursor indicator --}}
    <span
        class="spire-tabs-cursor"
        x-bind:class="[
            cursorReady ? 'spire-tabs-cursor--animated' : '',
            'spire-tabs-cursor--' + ($el.closest('[data-spire-tabs]')?.dataset.spireVariant || 'underline'),
            'spire-tabs-cursor--color-' + ($el.closest('[data-spire-tabs]')?.dataset.spireColor || 'primary')
        ]"
        x-bind:style="{
            left: cursorStyle.left,
            top: cursorStyle.top,
            width: cursorStyle.width,
            height: cursorStyle.height
        }"
        aria-hidden="true"
    ></span>

    {{ $slot }}
</div>
