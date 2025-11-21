@aware(['placement' => 'bottom-start'])

@props([
    'width' => 'md',
])

@php
    use SpireUI\Support\ComponentClass;

    $builder = ComponentClass::make('dropdown-content')
        ->addClass('spire-overlay')
        ->addClass('spire-overlay--padded-sm')
        ->addClass('animate-dropdown-bounce')
        ->dataAttribute('dropdown-content', '');

    $widthClass = match($width) {
        'sm' => 'spire-overlay--sm',
        'md' => 'spire-overlay--md',
        'lg' => 'spire-overlay--lg',
        'xl' => 'spire-overlay--xl',
        'full' => 'spire-overlay--full',
        'auto' => 'spire-overlay--auto',
        default => 'spire-overlay--md',
    };
    $builder->addClass($widthClass);

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'data-placement' => $placement,
        'popover' => 'auto',
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
        'role' => 'menu',
        'tabindex' => '-1',
    ]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    {{ $mergedAttributes }}
>
    {{ $slot }}
</div>
