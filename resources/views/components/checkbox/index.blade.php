@props([
    'variant' => 'regular',
    'size' => 'md',
    'color' => 'primary',
    'radius' => 'md',
    'name' => null,
    'value' => null,
    'checked' => false,
    'indeterminate' => false,
    'disabled' => false,
    'required' => false,
    'label' => null,
    'description' => null,
    'id' => null,
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$checkboxId = $id ?? 'spire-checkbox-' . uniqid();
$labelId = $checkboxId . '-label';
$descriptionId = $checkboxId . '-description';
$wireConfig = WireEntangle::fromAttributes($attributes);

$containerBuilder = ComponentClass::make('checkbox')
    ->modifier($variant)
    ->size($size)
    ->when($disabled, fn($b) => $b->addClass('opacity-50 cursor-not-allowed'));

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$boxBuilder = ComponentClass::make('checkbox-box')
    ->size($size)
    ->color($color)
    ->radius($radius);

$iconSizes = [
    'sm' => 'w-3 h-3',
    'md' => 'w-4 h-4',
    'lg' => 'w-5 h-5',
];

$iconSize = $iconSizes[$size] ?? $iconSizes['md'];
@endphp

@if($variant === 'regular')
    <label
        for="{{ $checkboxId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="checkbox"
            id="{{ $checkboxId }}"
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
            class="spire-checkbox-input peer"
            aria-labelledby="{{ $labelId }}"
            @if($description)
                aria-describedby="{{ $descriptionId }}"
            @endif
            x-effect="$el.indeterminate = $el.hasAttribute('indeterminate') && $el.getAttribute('indeterminate') !== 'false'"
            {{ $attributes->except(['class', 'id', 'wire:key', 'indeterminate', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
        >

        <div
            class="{{ $boxBuilder->build() }}"
            {!! collect($boxBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
        >
            <div class="spire-checkbox-icon spire-checkbox-icon--check">
                @if($checkIcon ?? false)
                    {{ $checkIcon }}
                @else
                    <x-spire::icon name="check" class="{{ $iconSize }}" />
                @endif
            </div>
            <div class="spire-checkbox-icon spire-checkbox-icon--indeterminate">
                <x-spire::icon name="minus" class="{{ $iconSize }}" />
            </div>
        </div>

        @if($label || $description)
            <div class="spire-checkbox-content">
                @if($label)
                    <span id="{{ $labelId }}" class="spire-checkbox-label spire-checkbox-label--{{ $size }}">
                        {{ $label }}
                        @if($required)
                            <span class="spire-checkbox-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                        @endif
                    </span>
                @endif

                @if($description)
                    <span id="{{ $descriptionId }}" class="spire-checkbox-description spire-checkbox-description--{{ $size }}">
                        {{ $description }}
                    </span>
                @endif
            </div>
        @endif
    </label>
@elseif($variant === 'pill')
    <label
        for="{{ $checkboxId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="checkbox"
            id="{{ $checkboxId }}"
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
            class="spire-checkbox-input peer"
            aria-labelledby="{{ $labelId }}"
            x-effect="$el.indeterminate = $el.hasAttribute('indeterminate') && $el.getAttribute('indeterminate') !== 'false'"
            {{ $attributes->except(['class', 'id', 'wire:key', 'indeterminate', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
        >

        @if($label)
            <span id="{{ $labelId }}" class="spire-checkbox-pill-label spire-checkbox-pill-label--{{ $size }}">
                {{ $label }}
                @if($required)
                    <span class="spire-checkbox-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                @endif
            </span>
        @endif
    </label>
@elseif($variant === 'card')
    <label
        for="{{ $checkboxId }}"
        class="{{ $containerBuilder->build() }}"
        {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        <input
            type="checkbox"
            id="{{ $checkboxId }}"
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
            class="spire-checkbox-input peer"
            aria-labelledby="{{ $labelId }}"
            @if($description)
                aria-describedby="{{ $descriptionId }}"
            @endif
            x-effect="$el.indeterminate = $el.hasAttribute('indeterminate') && $el.getAttribute('indeterminate') !== 'false'"
            {{ $attributes->except(['class', 'id', 'wire:key', 'indeterminate', 'checked', 'disabled', 'required', 'name', 'value', 'label', 'description']) }}
        >

        <div
            class="{{ $boxBuilder->build() }} spire-checkbox-box--card"
            {!! collect($boxBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
        >
            <div class="spire-checkbox-icon spire-checkbox-icon--check">
                @if($checkIcon ?? false)
                    {{ $checkIcon }}
                @else
                    <x-spire::icon name="check" class="{{ $iconSize }}" />
                @endif
            </div>
            <div class="spire-checkbox-icon spire-checkbox-icon--indeterminate">
                <x-spire::icon name="minus" class="{{ $iconSize }}" />
            </div>
        </div>

        @if($label || $description)
            <div class="spire-checkbox-card-header-content">
                @if($label)
                    <span id="{{ $labelId }}" class="spire-checkbox-label spire-checkbox-label--{{ $size }}">
                        {{ $label }}
                        @if($required)
                            <span class="spire-checkbox-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                        @endif
                    </span>
                @endif

                @if($description)
                    <span id="{{ $descriptionId }}" class="spire-checkbox-description spire-checkbox-description--{{ $size }}">
                        {{ $description }}
                    </span>
                @endif
            </div>
        @endif

        @if($slot->isNotEmpty())
            <div class="spire-checkbox-card-content">
                {{ $slot }}
            </div>
        @endif
    </label>
@endif
