@props([
    'thumbnails' => true,
    'counter' => true,
    'captions' => true,
    'download' => true,
    'zoom' => true,
    'loopNavigation' => false,
    'closeOnBackdrop' => true,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('lightbox');

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
]);
@endphp

<dialog
    x-data="spireLightbox({
        thumbnails: {{ $thumbnails ? 'true' : 'false' }},
        counter: {{ $counter ? 'true' : 'false' }},
        captions: {{ $captions ? 'true' : 'false' }},
        download: {{ $download ? 'true' : 'false' }},
        zoom: {{ $zoom ? 'true' : 'false' }},
        loop: {{ $loopNavigation ? 'true' : 'false' }},
        closeOnBackdrop: {{ $closeOnBackdrop ? 'true' : 'false' }}
    })"
    {{ $mergedAttributes }}
>
    <div class="spire-lightbox__container">
        <button
            type="button"
            class="spire-lightbox__close"
            @click="close()"
            :aria-label="'{{ __('spire-ui::lightbox.close') }}'"
        >
            <x-spire::icon name="x" class="size-6" />
        </button>

        <div
            x-show="counter && items.length > 1"
            x-cloak
            class="spire-lightbox__counter"
            x-text="counterText"
            aria-live="polite"
        ></div>

        <div
            class="spire-lightbox__content"
            data-spire-lightbox-content
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
        >
            <div x-show="loading" x-cloak class="spire-lightbox__loading">
                <x-spire::icon name="loader-2" class="size-8 animate-spin" />
            </div>

            <template x-if="currentItem && currentItem.type === 'image'">
                <div
                    class="spire-lightbox__image-wrapper"
                    :class="{ 'spire-lightbox__image-wrapper--zoomed': zoomed }"
                    @click="toggleZoom()"
                    @mousemove="handleZoomPan"
                >
                    <img
                        :src="currentItem.src"
                        :alt="currentItem.title"
                        class="spire-lightbox__image"
                        :style="zoomed ? `transform: scale(${zoomLevel}) translate(${zoomPosition.x}%, ${zoomPosition.y}%)` : ''"
                        x-on:load="loading = false"
                        x-on:error="loading = false"
                    >
                </div>
            </template>

            <template x-if="currentItem && currentItem.type === 'video'">
                <video
                    :src="currentItem.src"
                    class="spire-lightbox__video"
                    controls
                    autoplay
                    x-on:loadeddata="loading = false"
                    x-on:error="loading = false"
                >
                    {{ __('spire-ui::lightbox.video_not_supported') }}
                </video>
            </template>

            <template x-if="currentItem && (currentItem.type === 'youtube' || currentItem.type === 'vimeo')">
                <iframe
                    :src="getEmbedUrl(currentItem)"
                    class="spire-lightbox__iframe"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    x-on:load="loading = false"
                ></iframe>
            </template>

            <template x-if="currentItem && currentItem.type === 'pdf'">
                <iframe
                    :src="currentItem.src"
                    class="spire-lightbox__pdf"
                    frameborder="0"
                    x-on:load="loading = false"
                ></iframe>
            </template>
        </div>

        <button
            x-show="items.length > 1"
            x-cloak
            type="button"
            class="spire-lightbox__nav spire-lightbox__nav--prev"
            @click="previous()"
            :disabled="!canGoPrevious"
            :aria-label="'{{ __('spire-ui::lightbox.previous') }}'"
        >
            <x-spire::icon name="chevron-left" class="size-8" />
        </button>

        <button
            x-show="items.length > 1"
            x-cloak
            type="button"
            class="spire-lightbox__nav spire-lightbox__nav--next"
            @click="next()"
            :disabled="!canGoNext"
            :aria-label="'{{ __('spire-ui::lightbox.next') }}'"
        >
            <x-spire::icon name="chevron-right" class="size-8" />
        </button>

        <div class="spire-lightbox__bottom">
            <div
                x-show="captions && currentItem && currentItem.title"
                x-cloak
                class="spire-lightbox__caption"
                x-text="currentItem?.title"
            ></div>

            <div
                x-show="thumbnails && items.length > 1"
                x-cloak
                class="spire-lightbox__thumbnails"
            >
                <template x-for="(item, index) in items" :key="index">
                    <button
                        type="button"
                        class="spire-lightbox__thumbnail"
                        :class="{ 'spire-lightbox__thumbnail--active': index === currentIndex }"
                        @click="goTo(index)"
                        :aria-label="'{{ __('spire-ui::lightbox.go_to_slide') }} ' + (index + 1)"
                    >
                        <img
                            x-show="item.thumbnail && item.type === 'image'"
                            :src="item.thumbnail"
                            :alt="item.title"
                            class="spire-lightbox__thumbnail-image"
                        >
                        <template x-if="item.type === 'video' || item.type === 'youtube' || item.type === 'vimeo'">
                            <div class="spire-lightbox__thumbnail-icon">
                                <x-spire::icon name="play" class="size-4" />
                            </div>
                        </template>
                        <template x-if="item.type === 'pdf'">
                            <div class="spire-lightbox__thumbnail-icon">
                                <x-spire::icon name="file-text" class="size-4" />
                            </div>
                        </template>
                    </button>
                </template>
            </div>

            <div class="spire-lightbox__actions">
                <button
                    x-show="zoom && currentItem && currentItem.type === 'image'"
                    x-cloak
                    type="button"
                    class="spire-lightbox__action"
                    @click="toggleZoom()"
                    :aria-label="zoomed ? '{{ __('spire-ui::lightbox.zoom_out') }}' : '{{ __('spire-ui::lightbox.zoom_in') }}'"
                >
                    <x-spire::icon x-show="!zoomed" name="zoom-in" class="size-5" />
                    <x-spire::icon x-show="zoomed" x-cloak name="zoom-out" class="size-5" />
                </button>

                <button
                    x-show="download && currentItem"
                    x-cloak
                    type="button"
                    class="spire-lightbox__action"
                    @click="downloadCurrent()"
                    :aria-label="'{{ __('spire-ui::lightbox.download') }}'"
                >
                    <x-spire::icon name="download" class="size-5" />
                </button>
            </div>
        </div>
    </div>
</dialog>
