@props([
    'variant' => 'regular',
    'size' => spire_default('radio', 'size', 'md'),
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

$indicatorBuilder = ComponentClass::make('radio-indicator')
    ->size($size)
    ->color($color)
    ->radius('full');

$dotSizes = [
    'sm' => 'spire-radio-dot--sm',
    'md' => 'spire-radio-dot--md',
    'lg' => 'spire-radio-dot--lg',
];

$dotSize = $dotSizes[$size] ?? $dotSizes['md'];
@endphp

@if($variant === 'regular')
    <label
        for="{{ $radioId }}"
        {{ $attributes->merge(['class' => $containerBuilder->build()])->whereDoesntStartWith('wire:model')->whereDoesntStartWith('x-model')->except(['id', 'wire:key', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
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
            @if(!$attributes->has('x-bind:checked'))
                @checked($checked)
            @endif
            @if(!$attributes->has('x-bind:disabled'))
                @disabled($disabled)
            @endif
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
            <div class="spire-radio-dot {{ $dotSize }}"></div>
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
        {{ $attributes->merge(['class' => $containerBuilder->build()])->whereDoesntStartWith('wire:model')->whereDoesntStartWith('x-model')->except(['id', 'wire:key', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
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
            @if(!$attributes->has('x-bind:checked'))
                @checked($checked)
            @endif
            @if(!$attributes->has('x-bind:disabled'))
                @disabled($disabled)
            @endif
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
        {{ $attributes->merge(['class' => $containerBuilder->build()])->whereDoesntStartWith('wire:model')->whereDoesntStartWith('x-model')->except(['id', 'wire:key', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
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
            @if(!$attributes->has('x-bind:checked'))
                @checked($checked)
            @endif
            @if(!$attributes->has('x-bind:disabled'))
                @disabled($disabled)
            @endif
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
            <div class="spire-radio-dot {{ $dotSize }}"></div>
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
