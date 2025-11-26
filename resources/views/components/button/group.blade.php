@props([
    'vertical' => false,
    'ariaLabel' => null,
])

@php
$groupClasses = 'inline-flex group gap-0 ' . ($vertical ? 'flex-col' : 'flex-row');
@endphp

<div {{ $attributes->merge(['class' => $groupClasses, 'aria-label' => $ariaLabel]) }} role="group" data-spire-button-group @if($vertical) data-spire-button-group-vertical @endif>
    {{ $slot }}
</div>
