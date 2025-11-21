@props([
    'variant' => spire_default('textarea', 'variant', spire_default('textarea', 'input-variant', 'bordered')),
    'color' => 'default',
    'size' => spire_default('textarea', 'size', 'md'),
    'radius' => spire_default('textarea', 'radius', 'md'),
    'rows' => 4,
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'placeholder' => null,
    'resize' => 'vertical',
    'invalid' => false,
    'errorId' => null,
    'describedBy' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('textarea')
    ->extends('input-box')
    ->size($size)
    ->radius($radius)
    ->colorVariant($color, $variant)
    ->modifier("resize-{$resize}")
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($readonly, fn($b) => $b->modifier('readonly'));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$ariaDescriptions = array_filter([$describedBy, $errorId]);
$ariaDescribedBy = !empty($ariaDescriptions) ? implode(' ', $ariaDescriptions) : null;

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'rows' => $rows,
    'disabled' => $disabled ? true : null,
    'readonly' => $readonly ? true : null,
    'required' => $required ? true : null,
    'placeholder' => $placeholder,
    'aria-invalid' => $invalid ? 'true' : null,
    'aria-errormessage' => $invalid && $errorId ? $errorId : null,
    'aria-describedby' => $ariaDescribedBy,
    ...$builder->getDataAttributes(),
]);
@endphp

<textarea {{ $mergedAttributes }}>{{ $slot }}</textarea>
