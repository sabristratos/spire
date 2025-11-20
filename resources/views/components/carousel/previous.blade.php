@props([
    'variant' => config('spire-ui.defaults.carousel.controls.variant', 'bordered'),
    'size' => config('spire-ui.defaults.carousel.controls.size', config('spire-ui.defaults.size', 'sm')),
])

<x-spire::button
    :variant="$variant"
    :size="$size"
    iconOnly
    x-bind:disabled="!canGoPrevious()"
    :ariaLabel="__('spire-ui.carousel.previous')"
    x-on:click="previous"
    {{ $attributes }}
>
    @if($slot->isNotEmpty())
        {{ $slot }}
    @else
        <x-spire::icon name="chevron-left" class="size-4" />
    @endif
</x-spire::button>
