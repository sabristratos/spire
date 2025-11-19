@props([
    'sticky' => false,
    'container' => false,
    'blur' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('header')
    ->addClass('shrink-0')
    ->addIf($sticky, 'spire-header--sticky')
    ->addIf($blur, 'spire-header--blur');
@endphp

<header
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-header
    @if($sticky) data-spire-sticky="true" @endif
>
    @if($container)
        <div class="spire-header-container">
            {{ $slot }}
        </div>
    @else
        {{ $slot }}
    @endif
</header>
