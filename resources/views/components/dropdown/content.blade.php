@aware(['placement' => 'bottom-start'])

@props([
    'width' => 'md',
])

@php
    use SpireUI\Support\ComponentClass;

    $builder = ComponentClass::make('dropdown-content')
        ->modifier($width)
        ->addClass('animate-dropdown-bounce');

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'data-placement' => $placement,
        'popover' => 'auto',
        'class' => $builder->build(),
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
