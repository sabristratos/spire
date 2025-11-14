@props([
    'icon' => null,
    'shortcut' => null,
    'disabled' => false,
    'href' => null,
    'destructive' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors rounded-md';

$stateClasses = [
    'disabled' => 'text-text-disabled cursor-not-allowed',
    'destructive' => 'text-error hover:bg-error/10 focus:bg-error/10',
    'normal' => 'text-text hover:bg-hover focus:bg-hover',
];

$selectedState = $disabled ? 'disabled' : ($destructive ? 'destructive' : 'normal');

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $stateClasses[$selectedState],
]);

$tag = $href ? 'a' : 'button';

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'role' => 'menuitem',
    'tabindex' => $disabled ? '-1' : '0',
    'disabled' => $disabled && !$href ? true : null,
]);

if ($href) {
    $mergedAttributes = $mergedAttributes->merge(['href' => $href]);
}

if ($tag === 'button') {
    $mergedAttributes = $mergedAttributes->merge(['type' => 'button']);
}
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
    @if($icon)
        <x-spire::icon :name="$icon" class="w-4 h-4 shrink-0" />
    @endif

    <span class="flex-1 text-left">{{ $slot }}</span>

    @if($shortcut)
        <span class="text-xs text-text-muted shrink-0">{{ $shortcut }}</span>
    @endif
</{{ $tag }}>
