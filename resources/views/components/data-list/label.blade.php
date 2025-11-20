@props([
    'color' => 'muted',
    'width' => null,
    'minWidth' => null,
    'maxWidth' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('data-list-label')
    ->modifier($color);

$inlineStyles = collect([
    'width' => $width,
    'min-width' => $minWidth,
    'max-width' => $maxWidth,
])->filter()->map(fn($value, $prop) => "{$prop}: {$value}")->implode('; ');
@endphp

<dt {{ $attributes->merge(['class' => $builder->build(), 'style' => $inlineStyles ?: null]) }}>
    {{ $slot }}
</dt>
