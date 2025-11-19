@props([
    'content' => '',
    'placement' => 'top',
    'trigger' => 'hover',
    'delay' => 300,
    'duration' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('tooltip')
    ->dataAttribute('placement', $placement)
    ->dataAttribute('trigger', $trigger);
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
        @mouseenter="trigger === 'hover' && handleMouseEnter()"
        @mouseleave="trigger === 'hover' && handleMouseLeave()"
        @click="trigger === 'click' && toggle()"
    >
        {{ $slot }}
    </div>

    <div
        x-ref="content"
        x-show="isOpen"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        popover="hint"
        class="spire-tooltip__content"
        style="display: none;"
    >
        {{ $content }}
    </div>
</div>
