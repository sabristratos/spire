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
$isLink = !is_null($href);
$isDisabled = $disabled || $loading;

$baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all shadow-sm active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

$sizeClasses = [
    'sm' => $iconOnly ? 'h-8 w-8' : 'h-8 px-3 text-sm',
    'md' => $iconOnly ? 'h-10 w-10' : 'h-10 px-4 text-base',
    'lg' => $iconOnly ? 'h-12 w-12' : 'h-12 px-6 text-lg',
];

$spinnerSizes = [
    'sm' => 'h-3 w-3',
    'md' => 'h-4 w-4',
    'lg' => 'h-5 w-5',
];

$radiusClasses = [
    'none' => 'rounded-none',
    'sm' => 'rounded-sm',
    'md' => 'rounded-md',
    'lg' => 'rounded-lg',
    'full' => 'rounded-full',
];

$variantClasses = [
    'solid' => [
        'default' => 'bg-neutral text-white border border-neutral-border inset-shadow-button hover:bg-neutral-hover active:bg-neutral-active active:inset-shadow-button-active focus-visible:outline-neutral',
        'primary' => 'bg-primary text-primary-foreground border border-primary-border inset-shadow-button hover:bg-primary-hover active:bg-primary-active active:inset-shadow-button-active focus-visible:outline-primary',
        'secondary' => 'bg-secondary text-secondary-foreground border border-secondary-border inset-shadow-button hover:bg-secondary-hover active:bg-secondary-active active:inset-shadow-button-active focus-visible:outline-secondary',
        'success' => 'bg-success text-success-foreground border border-success-border inset-shadow-button hover:bg-success-hover active:bg-success-active active:inset-shadow-button-active focus-visible:outline-success',
        'error' => 'bg-error text-error-foreground border border-error-border inset-shadow-button hover:bg-error-hover active:bg-error-active active:inset-shadow-button-active focus-visible:outline-error',
        'warning' => 'bg-warning text-warning-foreground border border-warning-border inset-shadow-button hover:bg-warning-hover active:bg-warning-active active:inset-shadow-button-active focus-visible:outline-warning',
        'info' => 'bg-info text-info-foreground border border-info-border inset-shadow-button hover:bg-info-hover active:bg-info-active active:inset-shadow-button-active focus-visible:outline-info',
    ],
    'bordered' => [
        'default' => 'bg-transparent text-neutral-foreground border border-neutral hover:bg-neutral/50 active:bg-neutral/70 focus-visible:outline-neutral',
        'primary' => 'bg-transparent text-primary border border-primary hover:bg-primary/20 active:bg-primary/15 focus-visible:outline-primary',
        'secondary' => 'bg-transparent text-secondary border border-secondary hover:bg-secondary/20 active:bg-secondary/15 focus-visible:outline-secondary',
        'success' => 'bg-transparent text-success border border-success hover:bg-success/20 active:bg-success/15 focus-visible:outline-success',
        'error' => 'bg-transparent text-error border border-error hover:bg-error/20 active:bg-error/15 focus-visible:outline-error',
        'warning' => 'bg-transparent text-warning border border-warning hover:bg-warning/20 active:bg-warning/15 focus-visible:outline-warning',
        'info' => 'bg-transparent text-info border border-info hover:bg-info/20 active:bg-info/15 focus-visible:outline-info',
    ],
    'ghost' => [
        'default' => 'bg-transparent text-neutral-foreground hover:bg-neutral/50 active:bg-neutral/70 focus-visible:outline-neutral',
        'primary' => 'bg-transparent text-primary hover:bg-primary/20 active:bg-primary/30 focus-visible:outline-primary',
        'secondary' => 'bg-transparent text-secondary hover:bg-secondary/20 active:bg-secondary/30 focus-visible:outline-secondary',
        'success' => 'bg-transparent text-success hover:bg-success/20 active:bg-success/30 focus-visible:outline-success',
        'error' => 'bg-transparent text-error hover:bg-error/20 active:bg-error/30 focus-visible:outline-error',
        'warning' => 'bg-transparent text-warning hover:bg-warning/20 active:bg-warning/30 focus-visible:outline-warning',
        'info' => 'bg-transparent text-info hover:bg-info/20 active:bg-info/30 focus-visible:outline-info',
    ],
    'soft' => [
        'default' => 'bg-neutral/50 text-neutral-foreground hover:bg-neutral/70 active:bg-neutral/70 focus-visible:outline-neutral',
        'primary' => 'bg-primary/20 text-primary hover:bg-primary/35 active:bg-primary/20 focus-visible:outline-primary',
        'secondary' => 'bg-secondary/20 text-secondary hover:bg-secondary/35 active:bg-secondary/20 focus-visible:outline-secondary',
        'success' => 'bg-success/20 text-success hover:bg-success/35 active:bg-success/20 focus-visible:outline-success',
        'error' => 'bg-error/20 text-error hover:bg-error/35 active:bg-error/20 focus-visible:outline-error',
        'warning' => 'bg-warning/20 text-warning hover:bg-warning/35 active:bg-warning/20 focus-visible:outline-warning',
        'info' => 'bg-info/20 text-info hover:bg-info/35 active:bg-info/20 focus-visible:outline-info',
    ],
    'link' => [
        'default' => 'bg-transparent text-neutral-foreground underline-offset-4 hover:underline focus-visible:outline-neutral',
        'primary' => 'bg-transparent text-primary underline-offset-4 hover:underline focus-visible:outline-primary',
        'secondary' => 'bg-transparent text-secondary underline-offset-4 hover:underline focus-visible:outline-secondary',
        'success' => 'bg-transparent text-success underline-offset-4 hover:underline focus-visible:outline-success',
        'error' => 'bg-transparent text-error underline-offset-4 hover:underline focus-visible:outline-error',
        'warning' => 'bg-transparent text-warning underline-offset-4 hover:underline focus-visible:outline-warning',
        'info' => 'bg-transparent text-info underline-offset-4 hover:underline focus-visible:outline-info',
    ],
];

$conditionalClasses = [];

if ($isDisabled) {
    $conditionalClasses[] = 'cursor-not-allowed opacity-50';
    if ($isLink) {
        $conditionalClasses[] = 'pointer-events-none';
    }
}

if ($pressed) {
    $conditionalClasses[] = 'shadow-inner';
}

$groupClasses = ['[[data-spire-button-group]_&]:rounded-none'];

$radiusSuffix = $radius === 'none' ? '' : "-{$radius}";
$groupClasses[] = "first:[[data-spire-button-group]:not([data-spire-button-group-vertical])_&]:rounded-s{$radiusSuffix}";
$groupClasses[] = "last:[[data-spire-button-group]:not([data-spire-button-group-vertical])_&]:rounded-e{$radiusSuffix}";
$groupClasses[] = "first:[[data-spire-button-group-vertical]_&]:rounded-t{$radiusSuffix}";
$groupClasses[] = "last:[[data-spire-button-group-vertical]_&]:rounded-b{$radiusSuffix}";

if ($variant === 'solid' || $variant === 'bordered') {
    $groupClasses[] = '[[data-spire-button-group]:not([data-spire-button-group-vertical])_&]:border-s-0';
    $groupClasses[] = 'first:[[data-spire-button-group]:not([data-spire-button-group-vertical])_&]:border-s-[1px]';
    $groupClasses[] = '[[data-spire-button-group-vertical]_&]:border-t-0';
    $groupClasses[] = 'first:[[data-spire-button-group-vertical]_&]:border-t-[1px]';
}

$classString = implode(' ', array_filter([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    $radiusClasses[$radius] ?? $radiusClasses['md'],
    $variantClasses[$variant][$color] ?? $variantClasses[$variant]['default'],
    ...$conditionalClasses,
    ...$groupClasses,
]));

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
