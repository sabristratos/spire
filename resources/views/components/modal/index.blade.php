@props([
    'name' => null,
    'size' => 'xl',
    'variant' => 'modal',
    'position' => 'right',
    'dismissible' => true,
    'padding' => 'default',
])

@php
use SpireUI\Support\ComponentClass;

$wireModelAttrs = $attributes->whereStartsWith('wire:model');
$wireName = $wireModelAttrs->first();

$processedAttributes = $attributes->filter(function($value, $key) {
    return !str_starts_with($key, 'wire:model');
});

if ($wireModelAttrs->isNotEmpty()) {
    $processedAttributes = $processedAttributes->merge(['wire:model.self' => $wireName]);
}

$builder = ComponentClass::make('modal')
    ->modifier($variant)
    ->size($size)
    ->when($variant === 'flyout', fn($b) => $b->modifier("flyout-{$position}"))
    ->dataAttribute('dismissible', $dismissible ? 'true' : 'false');

if ($name) {
    $builder->dataAttribute('name', $name);
}

$bodyBuilder = ComponentClass::make('modal__body');
if ($padding !== 'default') {
    $bodyBuilder->modifier($padding);
}

$mergedAttributes = $processedAttributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
    'role' => 'dialog',
    'aria-modal' => 'true',
]);

if ($name) {
    $mergedAttributes = $mergedAttributes->merge([
        'aria-labelledby' => "{$name}-title",
    ]);
}
@endphp

<dialog
    wire:ignore.self
    x-data="spireModal({
        name: @js($name),
        dismissible: @js($dismissible),
        wireName: @js($wireName)
    })"
    x-id="['modal']"
    {{ $mergedAttributes }}
>
    @if($variant === 'flyout')
        @if(isset($header))
            {{ $header }}
        @endif

        <div class="{{ $bodyBuilder->build() }}">
            {{ $slot }}
        </div>

        @if(isset($footer))
            {{ $footer }}
        @endif
    @else
        <div class="spire-modal__content">
            @if(isset($header))
                {{ $header }}
            @endif

            <div class="{{ $bodyBuilder->build() }}">
                {{ $slot }}
            </div>

            @if(isset($footer))
                {{ $footer }}
            @endif
        </div>
    @endif
</dialog>
