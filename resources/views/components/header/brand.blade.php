@props([
    'href' => '/',
    'logo' => null,
    'logoDark' => null,
    'name' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('header-brand');
$tag = $href ? 'a' : 'div';
@endphp

<{{ $tag }}
    @if($href) href="{{ $href }}" @endif
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-header-brand
>
    @if($logo)
        <img
            src="{{ $logo }}"
            alt="{{ $name ?? 'Logo' }}"
            class="spire-header-brand-logo {{ $logoDark ? 'dark:hidden' : '' }}"
        >
        @if($logoDark)
            <img
                src="{{ $logoDark }}"
                alt="{{ $name ?? 'Logo' }}"
                class="spire-header-brand-logo hidden dark:block"
            >
        @endif
    @endif

    @if($name)
        <span class="spire-header-brand-name">{{ $name }}</span>
    @endif

    {{ $slot }}
</{{ $tag }}>
