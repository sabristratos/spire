@props([
    'variant' => config('spire-ui.defaults.carousel.controls.variant', 'bordered'),
    'size' => config('spire-ui.defaults.carousel.controls.size', config('spire-ui.defaults.size', 'sm')),
])

<x-spire::button
    :variant="$variant"
    :size="$size"
    iconOnly
    x-bind:disabled="pauseOnHover && isHovered"
    x-on:click="toggle"
    x-bind:aria-label="isPlaying && !isPaused && !(pauseOnHover && isHovered) ? '{{ __('spire-ui.carousel.pause') }}' : '{{ __('spire-ui.carousel.play') }}'"
    x-bind:aria-pressed="isPlaying && !isPaused && !(pauseOnHover && isHovered)"
    {{ $attributes }}
>
    @if($slot->isNotEmpty())
        {{ $slot }}
    @else
        <template x-if="isPlaying && !isPaused && !(pauseOnHover && isHovered)">
            <x-spire::icon name="pause" class="size-4" />
        </template>
        <template x-if="!isPlaying || isPaused || (pauseOnHover && isHovered)">
            <x-spire::icon name="play" class="size-4" />
        </template>
    @endif
</x-spire::button>
