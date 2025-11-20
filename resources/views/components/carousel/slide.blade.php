@props([
    'label' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('carousel__slide');
@endphp

<div
    {{ $attributes->merge([
        'class' => $builder->build(),
        'role' => 'group',
        'aria-roledescription' => 'slide',
    ]) }}
    @if($label)
        aria-label="{{ $label }}"
    @endif
    data-spire-carousel-slide
>
    {{ $slot }}
</div>
