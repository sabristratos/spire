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
$triggerId = 'trigger-' . uniqid();
@endphp

<span
    id="{{ $triggerId }}"
    aria-describedby="{{ $tooltipId }}"
    class="contents"
    @if($trigger === 'click')
        tabindex="0"
    @endif
>{{ $slot }}</span><div
    id="{{ $tooltipId }}"
    x-data="spireTooltip({
        triggerId: '{{ $triggerId }}',
        placement: '{{ $placement }}',
        trigger: '{{ $trigger }}',
        delay: {{ $delay }},
        duration: {{ $duration ?? 'null' }}
    })"
    x-id="['tooltip']"
    x-ref="content"
    popover="hint"
    role="tooltip"
    class="spire-tooltip__content animate-tooltip-bounce"
    data-placement="{{ $placement }}"
    {{ $attributes->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}
>
    {{ $content }}
</div>
