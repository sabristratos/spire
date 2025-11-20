@props([
    'variant' => 'bordered',
    'color' => 'default',
    'size' => spire_default('textarea', 'size', 'md'),
    'radius' => spire_default('textarea', 'radius', 'md'),
    'rows' => 4,
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'placeholder' => null,
    'resize' => 'vertical',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('textarea')
    ->size($size)
    ->radius($radius)
    ->colorVariant($color, $variant)
    ->modifier("resize-{$resize}")
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($readonly, fn($b) => $b->modifier('readonly'));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'rows' => $rows,
    'disabled' => $disabled ? true : null,
    'readonly' => $readonly ? true : null,
    'required' => $required ? true : null,
    'placeholder' => $placeholder,
    'data-spire-textarea' => 'true',
    ...$builder->getDataAttributes(),
]);
@endphp

<textarea {{ $mergedAttributes }}>{{ $slot }}</textarea>
