@props([
    'href' => '#',
    'variant' => config('spire-ui.defaults.link.variant', 'default'),
    'external' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('link')
    ->modifier($variant);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$externalAttributes = $external ? [
    'target' => '_blank',
    'rel' => 'noopener noreferrer',
] : [];

$mergedAttributes = $attributes->merge([
    'href' => $href,
    'class' => $builder->build(),
    ...$externalAttributes,
]);
@endphp

<a {{ $mergedAttributes }}>
    {{ $slot }}
    @if($external)
        <x-spire::icon name="heroicon-m-arrow-top-right-on-square" class="w-3.5 h-3.5 inline-block ml-0.5" />
    @endif
</a>
