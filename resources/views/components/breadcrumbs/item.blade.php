@props([
    'href' => null,
    'current' => false,
    'icon' => null,
    'disabled' => false,
    'separator' => 'chevron-right',
    'separatorText' => null,
    'last' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('breadcrumbs-item');

if ($current) {
    $builder->modifier('current');
} elseif ($disabled) {
    $builder->modifier('disabled');
}

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$isLink = $href && !$current && !$disabled;
$separatorIcon = $separatorText ? null : $separator;
@endphp

<li
    class="spire-breadcrumbs__item {{ $builder->build() }}"
    data-spire-breadcrumb-item
    {{ $attributes->only(['data-*']) }}
>
    @if($isLink)
        <a href="{{ $href }}" class="spire-breadcrumbs__link">
            @if($icon)
                <x-spire::icon :name="$icon" class="spire-breadcrumbs__icon" data-spire-breadcrumb-icon data-spire-icon-name="{{ $icon }}" />
            @endif
            {{ $slot }}
        </a>
    @else
        <span
            class="spire-breadcrumbs__text"
            @if($current) aria-current="page" @endif
            @if($disabled) aria-disabled="true" @endif
        >
            @if($icon)
                <x-spire::icon :name="$icon" class="spire-breadcrumbs__icon" data-spire-breadcrumb-icon data-spire-icon-name="{{ $icon }}" />
            @endif
            {{ $slot }}
        </span>
    @endif

    @if(!$last && !$current)
        <x-spire::breadcrumbs.separator :icon="$separatorIcon" :text="$separatorText" />
    @endif
</li>
