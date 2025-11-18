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
    'tooltip' => null,
    'tooltipPlacement' => 'top',
    'tooltipDelay' => 300,
])

@php
    use SpireUI\Support\ComponentClass;

    $isLink = !is_null($href);

    // Detect if disabled is an Alpine.js expression (string) rather than a boolean
    $hasAlpineDisabled = is_string($disabled) && (
        str_starts_with($disabled, '!') ||     // Negation: !someMethod()
        str_starts_with($disabled, '$') ||     // Alpine magic: $store.something
        str_contains($disabled, '(') ||        // Method call: someMethod()
        str_contains($disabled, '.') ||        // Property access: some.property
        str_contains($disabled, '&&') ||       // Logical AND: condition && method()
        str_contains($disabled, '||')          // Logical OR: condition || method()
    );

    // Only evaluate disabled as boolean if it's not an Alpine expression
    $isDisabled = !$hasAlpineDisabled && ($disabled || $loading);

    $spinnerColor = $color === 'default' ? 'primary' : $color;

    // Spinner sizing: smaller for text buttons, adaptive for icon-only
    $spinnerSize = $iconOnly ? null : match($size) {
        'sm' => 'sm',
        'md' => 'sm',
        'lg' => 'md',
        default => 'sm',
    };

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

    // Extract custom data-* attributes to preserve them
    $customDataAttributes = collect($attributes->getAttributes())
        ->filter(fn($value, $key) => str_starts_with($key, 'data-'))
        ->toArray();

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
        ...$customDataAttributes,
    ]);

    $tag = $isLink ? 'a' : 'button';
    $hasTooltip = !is_null($tooltip) && $tooltip !== '';
@endphp

@if($hasTooltip)
<div x-data="spireOverlay({ trigger: 'hover', placement: '{{ $tooltipPlacement }}', delay: {{ $tooltipDelay }} })">
    <{{ $tag }} {{ $mergedAttributes }} x-ref="trigger">
    @if($loading)
        @if(isset($spinner))
            {{ $spinner }}
        @else
            <x-spire::spinner
                :variant="config('spire-ui.spinner.default_variant', 'ring')"
                :size="$spinnerSize"
                :color="$spinnerColor"
            />
        @endif
    @endif

    @if(isset($leading) && !$loading)
        {{ $leading }}
    @endif

    @if(!$loading)
        {{ $slot }}
    @endif

    @if(isset($trailing))
        {{ $trailing }}
    @endif
    </{{ $tag }}>

    <div x-ref="content" x-show="open" x-cloak popover="hint" class="spire-tooltip-content animate-pop" data-placement="{{ $tooltipPlacement }}">
        {{ $tooltip }}
    </div>
</div>
@else
<{{ $tag }} {{ $mergedAttributes }}>
@if($loading)
    @if(isset($spinner))
        {{ $spinner }}
    @else
        <x-spire::spinner
            :variant="config('spire-ui.spinner.default_variant', 'ring')"
            :size="$spinnerSize"
            :color="$spinnerColor"
        />
    @endif
@endif

@if(isset($leading) && !$loading)
    {{ $leading }}
@endif

@if(!$loading)
    {{ $slot }}
@endif

@if(isset($trailing))
    {{ $trailing }}
@endif
</{{ $tag }}>
@endif
