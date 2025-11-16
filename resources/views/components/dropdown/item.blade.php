@props([
    'icon' => null,
    'shortcut' => null,
    'disabled' => false,
    'href' => null,
    'destructive' => false,
])

@php
    use SpireUI\Support\ComponentClass;

    $builder = ComponentClass::make('dropdown-item');

    if ($disabled) {
        $builder->modifier('disabled');
    } elseif ($destructive) {
        $builder->modifier('destructive');
    } else {
        $builder->modifier('normal');
    }

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $tag = $href ? 'a' : 'button';

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
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
