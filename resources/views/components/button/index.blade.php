@props([
    'variant' => 'solid',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'md',
    'disabled' => false,
    'loading' => false,
    'iconOnly' => false,
    'type' => 'button',
    'href' => null,
    'ariaLabel' => null,
    'pressed' => false,
])

@php
    use SpireUI\Support\ComponentStyles;

    $isLink = !is_null($href);
    $isDisabled = $disabled || $loading;

    $spinnerSizes = ComponentStyles::sizeVariants()['spinner'];

    $classString = ComponentStyles::buildClassString([
        ComponentStyles::buttonBase(),
        ComponentStyles::buttonSize($size, $iconOnly, $variant),
        ComponentStyles::radiusClasses($radius),
        ComponentStyles::buttonVariant($variant, $color),

        $isDisabled ? 'cursor-not-allowed opacity-50' . ($isLink ? ' pointer-events-none' : '') : '',
        $pressed ? 'shadow-inner' : '',

        ...ComponentStyles::buttonGroupClasses($radius, $variant),
    ]);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'disabled' => $isDisabled && !$isLink ? true : null,
        'type' => !$isLink ? $type : null,
        'href' => $isLink ? $href : null,
        'aria-label' => $ariaLabel,
        'aria-disabled' => $isDisabled ? 'true' : null,
        'aria-busy' => $loading ? 'true' : null,
        'aria-pressed' => $pressed ? 'true' : 'false',
        'data-spire-variant' => $variant,
        'data-spire-color' => $color,
        'data-spire-loading' => $loading ? 'true' : null,
    ]);

    $tag = $isLink ? 'a' : 'button';
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
@if($loading)
    @if(isset($spinner))
        {{ $spinner }}
    @else
        <svg class="animate-spin {{ $spinnerSizes[$size] ?? $spinnerSizes['md'] }}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    @endif
@endif

@if(isset($leading) && !$loading)
    {{ $leading }}
@endif

{{ $slot }}

@if(isset($trailing))
    {{ $trailing }}
@endif
</{{ $tag }}>
