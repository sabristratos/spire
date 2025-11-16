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
    use SpireUI\Support\ComponentClass;

    $isLink = !is_null($href);
    $isDisabled = $disabled || $loading;

    $spinnerSizes = [
        'sm' => 'h-3 w-3',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
    ];

    $builder = ComponentClass::make('button')
        ->size($size)
        ->colorVariant($color, $variant)
        ->radius($radius)
        ->modifier('group')
        ->when($iconOnly, fn($b) => $b->modifier('icon-only'))
        ->when($variant === 'ghost', fn($b) => $b->modifier('ghost'))
        ->addIf($isDisabled, 'cursor-not-allowed', 'opacity-50', $isLink ? 'pointer-events-none' : '')
        ->addIf($pressed, 'shadow-inner');

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        'disabled' => $isDisabled && !$isLink ? true : null,
        'type' => !$isLink ? $type : null,
        'href' => $isLink ? $href : null,
        'aria-label' => $ariaLabel,
        'aria-disabled' => $isDisabled ? 'true' : null,
        'aria-busy' => $loading ? 'true' : null,
        'aria-pressed' => $pressed ? 'true' : 'false',
        ...$builder->dataAttribute('loading', $loading ? 'true' : null)
                   ->dataAttribute('disabled', $isDisabled ? 'true' : null)
                   ->getDataAttributes(),
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
