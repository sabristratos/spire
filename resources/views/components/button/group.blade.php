@props([
    'vertical' => false,
    'ariaLabel' => null,
])

@php
$conditionalClasses = [];

if ($vertical) {
    $conditionalClasses[] = 'flex-col';
} else {
    $conditionalClasses[] = 'flex-row';
}

$groupClasses = implode(' ', array_filter([
    'inline-flex group gap-0',
    ...$conditionalClasses,
]));
@endphp

<div {{ $attributes->merge(['class' => $groupClasses, 'aria-label' => $ariaLabel]) }} role="group" data-spire-button-group @if($vertical) data-spire-button-group-vertical @endif>
    {{ $slot }}
</div>
