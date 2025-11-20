@props([
    'autoplay' => config('spire-ui.defaults.carousel.autoplay', false),
    'interval' => config('spire-ui.defaults.carousel.interval', 5000),
    'loop' => config('spire-ui.defaults.carousel.loop', false),
    'pauseOnHover' => true,
    'pauseOnFocus' => true,
    'itemsPerView' => 1,
    'gap' => config('spire-ui.defaults.carousel.gap', 'md'),
    'showArrows' => config('spire-ui.defaults.carousel.showArrows', true),
    'showIndicators' => config('spire-ui.defaults.carousel.showIndicators', true),
    'showPlayPause' => null,
    'indicatorVariant' => 'dots',
    'indicatorSize' => 'md',
    'snapAlign' => 'start',
    'label' => null,
])

@php
use SpireUI\Support\ComponentClass;

// Check for custom slots
$hasCustomNavigation = isset($navigation);
$hasCustomIndicators = isset($indicators);

// Determine if play/pause should show (default to true if autoplay is enabled)
$showPlayPauseButton = $showPlayPause ?? $autoplay;

// Build component classes
$itemsModifier = is_array($itemsPerView) ? 'items-auto' : (is_numeric($itemsPerView) ? "items-{$itemsPerView}" : 'items-auto');

$builder = ComponentClass::make('carousel')
    ->modifier($itemsModifier)
    ->modifier("gap-{$gap}")
    ->modifier("align-{$snapAlign}")
    ->modifier("indicators-{$indicatorVariant}")
    ->modifier("indicators-{$indicatorSize}");

if (!$showArrows) {
    $builder->modifier('nav-hidden');
}

// Calculate gap value for CSS custom property
$gapValues = [
    'none' => '0px',
    'sm' => '0.5rem',
    'md' => '1rem',
    'lg' => '1.5rem',
    'xl' => '2rem',
];
$gapValue = $gapValues[$gap] ?? '1rem';

// Handle responsive items per view
$isResponsive = is_array($itemsPerView);
$itemsPerViewJson = $isResponsive ? json_encode($itemsPerView) : $itemsPerView;
$initialItems = $isResponsive ? ($itemsPerView['default'] ?? 1) : $itemsPerView;

$carouselId = 'carousel-' . uniqid();
@endphp

<div
    x-data="spireCarousel({
        autoplay: {{ $autoplay ? 'true' : 'false' }},
        interval: {{ $interval }},
        loop: {{ $loop ? 'true' : 'false' }},
        pauseOnHover: {{ $pauseOnHover ? 'true' : 'false' }},
        pauseOnFocus: {{ $pauseOnFocus ? 'true' : 'false' }},
        itemsPerView: {{ $itemsPerViewJson }}
    })"
    {{ $attributes->merge([
        'class' => $builder->build(),
        'role' => 'region',
        'aria-roledescription' => 'carousel',
        'aria-label' => $label ?? __('spire-ui.carousel.label'),
        'style' => "--carousel-gap: {$gapValue}; --items-per-view: {$initialItems};",
    ]) }}
    x-on:mouseenter="handleMouseEnter"
    x-on:mouseleave="handleMouseLeave"
    x-on:focusin="handleFocusIn"
    x-on:focusout="handleFocusOut"
    x-on:keydown="handleKeyDown"
    data-spire-carousel
>
    {{-- Custom Navigation Slot (top placement) --}}
    @if($hasCustomNavigation)
        {{ $navigation }}
    @endif

    {{-- Carousel Track --}}
    <div
        x-ref="track"
        class="spire-carousel__track"
        role="group"
        aria-atomic="false"
        aria-live="off"
        tabindex="0"
    >
        {{ $slot }}
    </div>

    {{-- Custom Indicators Slot --}}
    @if($hasCustomIndicators)
        {{ $indicators }}
    @endif

    {{-- Default Controls (only if no custom slots provided) --}}
    @if(!$hasCustomNavigation && !$hasCustomIndicators && ($showIndicators || $showArrows || $showPlayPauseButton))
        <div class="spire-carousel__controls">
            {{-- Indicators (left) --}}
            @if($showIndicators)
                <div
                    class="spire-carousel__indicators"
                    role="tablist"
                    aria-label="{{ __('spire-ui.carousel.slide_indicators') }}"
                >
                    <template x-for="(_, index) in totalPages" x-bind:key="index">
                        <button
                            type="button"
                            class="spire-carousel__indicator"
                            role="tab"
                            x-on:click="goToPage(index)"
                            x-bind:aria-selected="isCurrentPage(index)"
                            x-bind:aria-current="isCurrentPage(index) ? 'true' : null"
                            x-bind:aria-label="getIndicatorLabel(index)"
                            x-bind:tabindex="isCurrentPage(index) ? 0 : -1"
                            x-bind:data-spire-carousel-active="isCurrentPage(index)"
                        >
                            @if($indicatorVariant === 'numbers')
                                <span x-text="index + 1"></span>
                            @endif
                        </button>
                    </template>
                </div>
            @else
                <div></div>
            @endif

            {{-- Navigation + Play/Pause (right) --}}
            @if($showArrows || $showPlayPauseButton)
                <div class="flex items-center gap-2">
                    @if($showArrows)
                        <x-spire::carousel.previous />
                        <x-spire::carousel.next />
                    @endif

                    @if($showPlayPauseButton)
                        <x-spire::carousel.play-pause />
                    @endif
                </div>
            @endif
        </div>
    @endif

    {{-- Live Region for Screen Readers --}}
    <div
        x-ref="liveRegion"
        class="spire-carousel__live-region"
        aria-live="polite"
        aria-atomic="true"
    ></div>
</div>
