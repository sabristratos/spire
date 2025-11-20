@props([
    'content' => '',
    'placement' => 'top',
    'trigger' => 'hover',
    'delay' => spire_default('tooltip', 'delay', 300),
    'duration' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tooltip')
    ->dataAttribute('placement', $placement)
    ->dataAttribute('trigger', $trigger);

$tooltipId = 'tooltip-' . uniqid();
@endphp

<div
    x-data="spireTooltip({
        placement: '{{ $placement }}',
        trigger: '{{ $trigger }}',
        delay: {{ $delay }},
        duration: {{ $duration ?? 'null' }}
    })"
    {{ $attributes->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}
>
    <div
        x-ref="trigger"
        class="spire-tooltip__trigger"
        aria-describedby="{{ $tooltipId }}"
        @if($trigger === 'click')
            @click="toggle()"
            @keydown.enter.prevent="toggle()"
            @keydown.space.prevent="toggle()"
            @keydown.escape="hide()"
            tabindex="0"
        @endif
    >
        {{ $slot }}
    </div>

    <div
        id="{{ $tooltipId }}"
        x-ref="content"
        popover="hint"
        role="tooltip"
        class="spire-tooltip__content animate-tooltip-bounce"
        data-placement="{{ $placement }}"
    >
        {{ $content }}
    </div>
</div>
