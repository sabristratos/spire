@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('header-navbar');
@endphp

<nav
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-header-navbar
>
    {{ $slot }}
</nav>
