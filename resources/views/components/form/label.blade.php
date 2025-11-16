@props([
    'for' => null,
    'required' => false,
    'size' => 'md',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('label')
    ->size($size);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'for' => $for,
    'class' => $builder->build(),
    'data-spire-label' => 'true',
]);
@endphp

<label {{ $mergedAttributes }}>
    {{ $slot }}
    @if($required)
        <span class="text-error">*</span>
    @endif
</label>
