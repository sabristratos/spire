@props([
    'icon' => null,
    'shortcut' => null,
    'disabled' => false,
    'href' => null,
    'destructive' => false,
])

@php
    use SpireUI\Support\ComponentStyles;

    $classString = ComponentStyles::buildClassString([
        ComponentStyles::dropdownItemBase(),
        ComponentStyles::dropdownItemState($disabled, $destructive),
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
