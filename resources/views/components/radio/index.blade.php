@props([
    'variant' => 'regular',
    'size' => 'md',
    'color' => 'primary',
    'radius' => 'md',
    'name' => null,
    'value' => null,
    'checked' => false,
    'disabled' => false,
    'required' => false,
    'label' => null,
    'description' => null,
    'id' => null,
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$radioId = $id ?? 'spire-radio-' . uniqid();
$labelId = $radioId . '-label';
$descriptionId = $radioId . '-description';
$wireConfig = WireEntangle::fromAttributes($attributes);

$containerBuilder = ComponentClass::make('radio')
    ->modifier($variant)
    ->size($size)
    ->when($disabled, fn($b) => $b->addClass('opacity-50 cursor-not-allowed'));

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$indicatorBuilder = ComponentClass::make('radio-indicator')
    ->size($size)
    ->color($color)
    ->radius('full');

$iconSizes = [
    'sm' => 'w-3 h-3',
    'md' => 'w-4 h-4',
    'lg' => 'w-5 h-5',
];

$iconSize = $iconSizes[$size] ?? $iconSizes['md'];
@endphp

@if($variant === 'regular')
    <label
        for="{{ $radioId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="radio"
            id="{{ $radioId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            @if($wireConfig->hasWireModel())
                {{ $wireConfig->isLive ? 'wire:model.live' : 'wire:model' }}="{{ $wireConfig->wireModel }}"
            @endif
            @checked($checked)
            @disabled($disabled)
            @required($required)
            class="spire-radio-input peer"
            aria-labelledby="{{ $labelId }}"
            @if($description)
                aria-describedby="{{ $descriptionId }}"
            @endif
            {{ WireEntangle::filteredAttributes($attributes) }}
        >

        <div
            class="{{ $indicatorBuilder->build() }}"
            {!! collect($indicatorBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
        >
            <div class="spire-radio-icon">
                @if($radioIcon ?? false)
                    {{ $radioIcon }}
                @else
                    <x-spire::icon name="circle" class="{{ $iconSize }}" />
                @endif
            </div>
        </div>

        @if($label || $description)
            <div class="spire-radio-content">
                @if($label)
                    <span id="{{ $labelId }}" class="spire-radio-label spire-radio-label--{{ $size }}">
                        {{ $label }}
                        @if($required)
                            <span class="spire-radio-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                        @endif
                    </span>
                @endif

                @if($description)
                    <span id="{{ $descriptionId }}" class="spire-radio-description spire-radio-description--{{ $size }}">
                        {{ $description }}
                    </span>
                @endif
            </div>
        @endif
    </label>
@elseif($variant === 'pill')
    <label
        for="{{ $radioId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="radio"
            id="{{ $radioId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            @if($wireConfig->hasWireModel())
                {{ $wireConfig->isLive ? 'wire:model.live' : 'wire:model' }}="{{ $wireConfig->wireModel }}"
            @endif
            @checked($checked)
            @disabled($disabled)
            @required($required)
            class="spire-radio-input peer"
            aria-labelledby="{{ $labelId }}"
            {{ WireEntangle::filteredAttributes($attributes) }}
        >

        @if($label)
            <span id="{{ $labelId }}" class="spire-radio-pill-label spire-radio-pill-label--{{ $size }}">
                {{ $label }}
                @if($required)
                    <span class="spire-radio-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                @endif
            </span>
        @endif
    </label>
@elseif($variant === 'card')
    <label
        for="{{ $radioId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="radio"
            id="{{ $radioId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            @if($wireConfig->hasWireModel())
                {{ $wireConfig->isLive ? 'wire:model.live' : 'wire:model' }}="{{ $wireConfig->wireModel }}"
            @endif
            @checked($checked)
            @disabled($disabled)
            @required($required)
            class="spire-radio-input peer"
            aria-labelledby="{{ $labelId }}"
            @if($description)
                aria-describedby="{{ $descriptionId }}"
            @endif
            {{ WireEntangle::filteredAttributes($attributes) }}
        >

        <div
            class="{{ $indicatorBuilder->build() }} spire-radio-indicator--card"
            {!! collect($indicatorBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
        >
            <div class="spire-radio-icon">
                @if($radioIcon ?? false)
                    {{ $radioIcon }}
                @else
                    <x-spire::icon name="circle" class="{{ $iconSize }}" />
                @endif
            </div>
        </div>

        @if($label || $description)
            <div class="spire-radio-card-header-content">
                @if($label)
                    <span id="{{ $labelId }}" class="spire-radio-label spire-radio-label--{{ $size }}">
                        {{ $label }}
                        @if($required)
                            <span class="spire-radio-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                        @endif
                    </span>
                @endif

                @if($description)
                    <span id="{{ $descriptionId }}" class="spire-radio-description spire-radio-description--{{ $size }}">
                        {{ $description }}
                    </span>
                @endif
            </div>
        @endif

        @if($slot->isNotEmpty())
            <div class="spire-radio-card-content">
                {{ $slot }}
            </div>
        @endif
    </label>
@endif
