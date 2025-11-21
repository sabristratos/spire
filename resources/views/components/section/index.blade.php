@props([
    'as' => 'section',
    'size' => spire_default('section', 'size', 'default'),
    'padding' => spire_default('section', 'padding', 'md'),
    'centered' => spire_default('section', 'centered', true),
])

@php
use SpireUI\Support\ComponentClass;

$sizes = config('spire-ui.defaults.section.sizes', [
    'narrow' => 'max-w-3xl',
    'default' => 'max-w-5xl',
    'wide' => 'max-w-7xl',
    'full' => 'max-w-full',
]);

$paddings = config('spire-ui.defaults.section.paddings', [
    'none' => '',
    'sm' => 'px-4 py-8 lg:py-12',
    'md' => 'px-4 sm:px-6 lg:px-8 py-12 lg:py-16',
    'lg' => 'px-4 sm:px-6 lg:px-8 py-16 lg:py-24',
]);

$builder = ComponentClass::make('section')
    ->modifier($size)
    ->addClass('w-full')
    ->addClass($sizes[$size] ?? $sizes['default'])
    ->addClass($paddings[$padding] ?? '')
    ->addIf($centered, 'mx-auto')
    ->dataAttribute('size', $size)
    ->dataAttribute('padding', $padding);

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<{{ $as }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $as }}>
