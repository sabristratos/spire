@props([
    'vertical' => false,
    'ariaLabel' => null,
])

@php
$baseClasses = 'inline-flex group gap-0';

if ($vertical) {
    $layoutClasses = 'flex-col *:rounded-none *:border-b-0 [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b';
} else {
    $layoutClasses = 'flex-row *:rounded-none *:border-e-0 [&>*:first-child]:rounded-s-md [&>*:last-child]:rounded-e-md [&>*:last-child]:border-e';
}

$groupClasses = "$baseClasses $layoutClasses";
@endphp

<div {{ $attributes->merge(['class' => $groupClasses, 'aria-label' => $ariaLabel]) }} role="group" data-spire-button-group @if($vertical) data-spire-button-group-vertical @endif>
    {{ $slot }}
</div>
