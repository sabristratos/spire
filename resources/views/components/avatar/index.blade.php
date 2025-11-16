@props([
    'src' => null,
    'name' => null,
    'alt' => '',
    'size' => 'md',
    'radius' => 'full',
    'color' => 'primary',
    'isBordered' => false,
    'isDisabled' => false,
    'showFallback' => true,
])

@php
use SpireUI\Support\ComponentClass;

$initials = '';
if ($name) {
    $words = array_filter(explode(' ', trim($name)));
    $initials = strtoupper(
        (isset($words[0]) ? mb_substr($words[0], 0, 1) : '') .
        (isset($words[1]) ? mb_substr($words[1], 0, 1) : '')
    );
}

$builder = ComponentClass::make('avatar')
    ->size($size)
    ->radius($radius)
    ->when($isDisabled, fn($b) => $b->modifier('disabled'))
    ->when($isBordered, fn($b) => $b->modifier('bordered')->modifier("ring-{$color}"));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'data-spire-avatar' => 'true',
    'data-spire-size' => $size,
    'data-spire-color' => $color,
    'aria-label' => $alt ?: $name,
]);
@endphp

<span {{ $mergedAttributes }} x-data="{ imageError: false }">
    @if($src)
        <img
            src="{{ $src }}"
            alt="{{ $alt ?: $name }}"
            class="w-full h-full object-cover"
            x-show="!imageError"
            x-on:error="imageError = true"
        />
    @endif

    @if($showFallback)
        <span
            class="flex items-center justify-center w-full h-full spire-badge--{{ $color }}-solid"
            x-show="{{ $src ? 'imageError' : 'true' }}"
            x-cloak
        >
            @if($initials)
                {{ $initials }}
            @elseif(isset($icon))
                {{ $icon }}
            @else
                <svg class="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
            @endif
        </span>
    @endif
</span>
