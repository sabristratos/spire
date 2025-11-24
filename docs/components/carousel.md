# Carousel Component

A modern, accessible carousel/slider component for displaying content in a horizontal scrollable container with navigation controls, indicators, and optional auto-play functionality.

## Overview

The Carousel component provides a flexible solution for showcasing content with:

- **CSS Scroll-Snap** - Smooth, native scrolling with snap-to-slide behavior
- **Auto-play** - Automatic slide advancement with pause controls (WCAG compliant)
- **Multiple items** - Display multiple slides at once with responsive breakpoints
- **Touch support** - Native swipe gestures on mobile devices

**Key features:**
- Configurable items per view (1-6 or responsive)
- Navigation arrows and dot indicators
- Auto-play with play/pause controls
- Loop/infinite scroll option
- Keyboard navigation
- Full ARIA accessibility
- Multiple indicator styles (dots, lines, numbers)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoplay` | boolean | `false` | Enable automatic slide advancement |
| `interval` | int | `5000` | Auto-play interval in milliseconds |
| `loop` | boolean | `false` | Enable infinite loop behavior |
| `pauseOnHover` | boolean | `true` | Pause auto-play on mouse hover |
| `pauseOnFocus` | boolean | `true` | Pause auto-play when focused |
| `itemsPerView` | int\|array | `1` | Number of visible slides (1-6 or responsive) |
| `gap` | string | `'md'` | Gap between slides: `none`, `sm`, `md`, `lg`, `xl` |
| `showArrows` | boolean | `true` | Show prev/next navigation arrows |
| `showIndicators` | boolean | `true` | Show slide indicators |
| `showPlayPause` | boolean | `null` | Show play/pause button (auto if autoplay) |
| `indicatorVariant` | string | `'dots'` | Indicator style: `dots`, `lines`, `numbers` |
| `indicatorSize` | string | `'md'` | Indicator size: `sm`, `md`, `lg` |
| `snapAlign` | string | `'start'` | Snap alignment: `start`, `center`, `end` |
| `label` | string | `null` | Accessible label for the carousel |

---

## Sub-Components

The carousel provides composable sub-components for custom navigation layouts:

| Component | Description |
|-----------|-------------|
| `<x-spire::carousel.previous />` | Previous page button |
| `<x-spire::carousel.next />` | Next page button |
| `<x-spire::carousel.indicators />` | Page indicators (dots, lines, numbers) |
| `<x-spire::carousel.play-pause />` | Auto-play toggle button |

### Sub-Component Props

**Previous / Next:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Button variant |
| `size` | string | `'sm'` | Button size |

**Indicators:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'dots'` | Style: `dots`, `lines`, `numbers` |
| `size` | string | `'md'` | Size: `sm`, `md`, `lg` |

**Play/Pause:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Button variant |
| `size` | string | `'sm'` | Button size |

---

## Examples

### Basic Usage

```blade
<x-spire::carousel>
    <x-spire::carousel.slide>
        <img src="/slide-1.jpg" alt="Slide 1" class="w-full" />
    </x-spire::carousel.slide>
    <x-spire::carousel.slide>
        <img src="/slide-2.jpg" alt="Slide 2" class="w-full" />
    </x-spire::carousel.slide>
    <x-spire::carousel.slide>
        <img src="/slide-3.jpg" alt="Slide 3" class="w-full" />
    </x-spire::carousel.slide>
</x-spire::carousel>
```

### Hero Banner with Auto-play

```blade
<x-spire::carousel
    autoplay
    :interval="4000"
    loop
    label="Featured promotions"
>
    <x-spire::carousel.slide label="Summer Sale Banner">
        <div class="relative aspect-[21/9] bg-gradient-to-r from-primary to-secondary">
            <div class="absolute inset-0 flex items-center justify-center">
                <h2 class="text-4xl font-bold text-white">Summer Sale - 50% Off</h2>
            </div>
        </div>
    </x-spire::carousel.slide>
    <x-spire::carousel.slide label="New Arrivals Banner">
        <div class="relative aspect-[21/9] bg-gradient-to-r from-secondary to-featured">
            <div class="absolute inset-0 flex items-center justify-center">
                <h2 class="text-4xl font-bold text-white">New Arrivals</h2>
            </div>
        </div>
    </x-spire::carousel.slide>
</x-spire::carousel>
```

### Product Grid (Multiple Items)

```blade
<x-spire::carousel
    :itemsPerView="4"
    gap="lg"
    :showIndicators="false"
    label="Featured products"
>
    @foreach($products as $product)
        <x-spire::carousel.slide :label="$product->name">
            <x-product-card :product="$product" />
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Responsive Items Per View

```blade
<x-spire::carousel
    :itemsPerView="[
        'default' => 1,
        'sm' => 2,
        'md' => 3,
        'lg' => 4,
        'xl' => 5,
    ]"
    gap="md"
>
    @foreach($items as $item)
        <x-spire::carousel.slide>
            <x-item-card :item="$item" />
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

**Available breakpoints:**

| Breakpoint | Default Width | Description |
|------------|---------------|-------------|
| `default` | - | Base value (mobile-first) |
| `xs` | 30rem (480px) | Extra small screens |
| `sm` | 40rem (640px) | Small screens |
| `md` | 48rem (768px) | Medium screens |
| `lg` | 64rem (1024px) | Large screens |
| `xl` | 80rem (1280px) | Extra large screens |
| `2xl` | 96rem (1536px) | 2X large screens |
| `3xl` | 120rem (1920px) | 3X large screens |

**Custom breakpoints:** The carousel automatically detects custom Tailwind breakpoints defined in your CSS:

```css
@theme {
    --breakpoint-xs: 30rem;
    --breakpoint-3xl: 120rem;
}
```

Then use them in your carousel:

```blade
<x-spire::carousel
    :itemsPerView="[
        'default' => 1,
        'xs' => 2,
        'sm' => 3,
        '3xl' => 6,
    ]"
>
```

### Testimonials Carousel

```blade
<x-spire::carousel
    autoplay
    :interval="6000"
    loop
    indicatorVariant="lines"
    :showArrows="false"
    label="Customer testimonials"
>
    @foreach($testimonials as $testimonial)
        <x-spire::carousel.slide>
            <x-spire::card class="p-6 text-center">
                <x-spire::avatar
                    :src="$testimonial->avatar"
                    :alt="$testimonial->name"
                    size="lg"
                    class="mx-auto mb-4"
                />
                <p class="text-lg italic text-muted mb-4">
                    "{{ $testimonial->content }}"
                </p>
                <p class="font-semibold">{{ $testimonial->name }}</p>
                <p class="text-sm text-muted">{{ $testimonial->title }}</p>
            </x-spire::card>
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Product Image Gallery

```blade
<x-spire::carousel
    snapAlign="center"
    gap="sm"
    indicatorVariant="numbers"
    label="Product images"
>
    @foreach($product->images as $index => $image)
        <x-spire::carousel.slide :label="'Product image ' . ($index + 1)">
            <img
                src="{{ $image->url }}"
                alt="{{ $product->name }} - Image {{ $index + 1 }}"
                class="w-full aspect-square object-cover rounded-lg"
            />
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Card Header Carousel

For use inside card components:

```blade
<x-spire::card>
    <x-spire::carousel
        :showArrows="false"
        indicatorSize="sm"
        class="rounded-t-lg overflow-hidden"
    >
        @foreach($images as $image)
            <x-spire::carousel.slide>
                <img src="{{ $image }}" class="w-full aspect-video object-cover" />
            </x-spire::carousel.slide>
        @endforeach
    </x-spire::carousel>
    <div class="p-4">
        <h3 class="font-semibold">{{ $title }}</h3>
        <p class="text-muted">{{ $description }}</p>
    </div>
</x-spire::card>
```

### Without Indicators

```blade
<x-spire::carousel :showIndicators="false">
    <!-- slides -->
</x-spire::carousel>
```

### Without Arrows

```blade
<x-spire::carousel
    :showArrows="false"
    indicatorVariant="dots"
>
    <!-- slides -->
</x-spire::carousel>
```

### Infinite Loop

```blade
<x-spire::carousel loop>
    <!-- slides -->
</x-spire::carousel>
```

---

## Custom Navigation Layouts

Use named slots and sub-components for complete control over navigation placement.

### Custom Controls Position

```blade
<x-spire::carousel :showArrows="false" :showIndicators="false">
    {{-- Custom navigation at top-right --}}
    <x-slot:navigation>
        <div class="absolute top-4 right-4 flex gap-2 z-10">
            <x-spire::carousel.previous />
            <x-spire::carousel.next />
        </div>
    </x-slot:navigation>

    {{-- Custom indicators at bottom-center --}}
    <x-slot:indicators>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
            <x-spire::carousel.indicators variant="dots" />
        </div>
    </x-slot:indicators>

    <x-spire::carousel.slide>Slide 1</x-spire::carousel.slide>
    <x-spire::carousel.slide>Slide 2</x-spire::carousel.slide>
</x-spire::carousel>
```

### Header with Navigation

```blade
<x-spire::carousel :showArrows="false" :showIndicators="false">
    <x-slot:navigation>
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Featured Products</h2>
            <div class="flex gap-2">
                <x-spire::carousel.previous />
                <x-spire::carousel.next />
            </div>
        </div>
    </x-slot:navigation>

    @foreach($products as $product)
        <x-spire::carousel.slide>
            <x-product-card :product="$product" />
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Custom Button Styling

```blade
<x-spire::carousel :showArrows="false">
    <x-slot:navigation>
        <div class="flex gap-2">
            {{-- Custom icons and styling --}}
            <x-spire::carousel.previous variant="ghost" size="lg">
                <x-spire::icon name="arrow-left" class="size-5" />
            </x-spire::carousel.previous>

            <x-spire::carousel.next variant="ghost" size="lg">
                <x-spire::icon name="arrow-right" class="size-5" />
            </x-spire::carousel.next>
        </div>
    </x-slot:navigation>

    <!-- slides -->
</x-spire::carousel>
```

### Only Custom Indicators

```blade
<x-spire::carousel :showIndicators="false">
    {{-- Navigation arrows use defaults, indicators are custom --}}
    <x-slot:indicators>
        <div class="mt-6 flex justify-center">
            <x-spire::carousel.indicators variant="numbers" size="lg" />
        </div>
    </x-slot:indicators>

    <!-- slides -->
</x-spire::carousel>
```

### Auto-play with Custom Play/Pause

```blade
<x-spire::carousel autoplay :showPlayPause="false">
    <x-slot:navigation>
        <div class="absolute bottom-4 right-4">
            <x-spire::carousel.play-pause variant="solid" />
        </div>
    </x-slot:navigation>

    <!-- slides -->
</x-spire::carousel>
```

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `currentIndex` | number | Current active slide index (0-based) |
| `currentPage` | number | Current active page index (0-based) |
| `totalSlides` | number | Total number of slides |
| `totalPages` | number | Total number of pages |
| `itemsPerView` | number | Current items per view (updates on breakpoint change) |
| `isPlaying` | boolean | Whether auto-play is running |
| `isPaused` | boolean | Whether auto-play is paused |
| `isHovered` | boolean | Whether carousel is hovered |
| `autoplay` | boolean | Auto-play enabled |
| `interval` | number | Auto-play interval in ms |
| `loop` | boolean | Loop enabled |

### Key Methods

| Method | Description |
|--------|-------------|
| `goToSlide(index)` | Navigate to specific slide |
| `goToPage(index)` | Navigate to specific page |
| `next()` | Go to next page |
| `previous()` | Go to previous page |
| `play()` | Start auto-play |
| `pause()` | Pause auto-play |
| `resume()` | Resume paused auto-play |
| `stop()` | Stop auto-play completely |
| `toggle()` | Toggle play/pause |
| `canGoNext()` | Check if can navigate forward |
| `canGoPrevious()` | Check if can navigate backward |
| `isCurrentPage(index)` | Check if page is current |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `spire:carousel-change` | `{ index, page, totalSlides, totalPages }` | Fired when page changes |

---

## Accessibility

### ARIA Support

- `role="region"` with `aria-roledescription="carousel"` on container
- `role="group"` with `aria-roledescription="slide"` on each slide
- `aria-label` on carousel and individual slides
- `aria-live="polite"` for screen reader announcements (off during auto-play)
- `role="tablist"` on indicators with `role="tab"` on each indicator
- `aria-current` on active indicator
- `aria-disabled` on navigation buttons

### Keyboard Navigation

- **Arrow Left/Right** - Navigate between slides
- **Home** - Go to first slide
- **End** - Go to last slide
- **Tab** - Navigate through interactive elements

### Auto-play Requirements (WCAG 2.2.2)

When auto-play is enabled:
- Play/pause button is always visible
- Auto-play pauses on hover (configurable)
- Auto-play pauses on focus (configurable)
- Screen reader announcements are disabled during auto-play

---

## Indicator Variants

### Dots (Default)

```blade
<x-spire::carousel indicatorVariant="dots">
```

Circular dots that expand when active.

### Lines

```blade
<x-spire::carousel indicatorVariant="lines">
```

Horizontal lines, good for testimonials.

### Numbers

```blade
<x-spire::carousel indicatorVariant="numbers">
```

Numbered indicators, good for galleries.

---

## Gap Options

| Gap | Value | Use Case |
|-----|-------|----------|
| `none` | 0 | Full-width banners |
| `sm` | 0.5rem | Compact layouts |
| `md` | 1rem | Default spacing |
| `lg` | 1.5rem | Product grids |
| `xl` | 2rem | Spacious layouts |

---

## Best Practices

### Do

- Use `label` prop for accessible carousel identification
- Use `loop` for continuous content like testimonials
- Set appropriate `interval` (4-6 seconds for readable content)
- Use `pauseOnHover` and `pauseOnFocus` for auto-play
- Provide `label` on slides with important content
- Use appropriate `itemsPerView` for your content type
- Consider disabling auto-play for content-heavy carousels

### Don't

- Don't use auto-play for critical content users need to read
- Don't set interval too short (< 3 seconds)
- Don't hide both arrows and indicators (no way to navigate)
- Don't use carousel for content that should be immediately visible
- Don't forget to test keyboard navigation

---

## Common Patterns

### E-commerce Hero Banner

```blade
<x-spire::carousel
    autoplay
    :interval="5000"
    loop
    class="mb-8"
    label="Promotional banners"
>
    @foreach($banners as $banner)
        <x-spire::carousel.slide :label="$banner->alt_text">
            <a href="{{ $banner->link }}">
                <img
                    src="{{ $banner->image }}"
                    alt="{{ $banner->alt_text }}"
                    class="w-full"
                />
            </a>
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Product Category Showcase

```blade
<x-spire::carousel
    :itemsPerView="5"
    gap="md"
    :showIndicators="false"
    label="Shop by category"
>
    @foreach($categories as $category)
        <x-spire::carousel.slide>
            <a href="{{ route('category', $category) }}" class="block text-center">
                <img
                    src="{{ $category->image }}"
                    alt="{{ $category->name }}"
                    class="w-full aspect-square object-cover rounded-lg mb-2"
                />
                <span class="font-medium">{{ $category->name }}</span>
            </a>
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

### Related Products

```blade
<div class="mt-12">
    <h2 class="text-xl font-semibold mb-4">You May Also Like</h2>
    <x-spire::carousel
        :itemsPerView="4"
        gap="lg"
        :showIndicators="false"
        label="Related products"
    >
        @foreach($relatedProducts as $product)
            <x-spire::carousel.slide>
                <x-product-card :product="$product" />
            </x-spire::carousel.slide>
        @endforeach
    </x-spire::carousel>
</div>
```

### Image Lightbox Preview

```blade
<x-spire::carousel
    snapAlign="center"
    indicatorVariant="numbers"
    class="bg-black"
    label="Product gallery"
>
    @foreach($images as $index => $image)
        <x-spire::carousel.slide>
            <div class="flex items-center justify-center min-h-[60vh]">
                <img
                    src="{{ $image->large_url }}"
                    alt="Image {{ $index + 1 }}"
                    class="max-w-full max-h-[60vh] object-contain"
                />
            </div>
        </x-spire::carousel.slide>
    @endforeach
</x-spire::carousel>
```

---

## Technical Notes

### Scroll Behavior

The carousel uses CSS `scroll-snap-type: x mandatory` for native scroll snapping:
- Smooth scrolling with `scroll-behavior: smooth`
- Respects `prefers-reduced-motion` (disables smooth scroll)
- Touch/swipe works natively without JavaScript

### Performance

- Uses Intersection Observer for slide tracking
- Resize Observer for responsive recalculation
- Native scroll instead of transform animations
- Lazy loading compatible (add `loading="lazy"` to images)

### Translations

Key translations under `spire-ui::spire-ui.carousel`:

- `label` - Default carousel label
- `previous`, `next` - Navigation buttons
- `play`, `pause` - Auto-play controls
- `slide_indicators` - Indicator group label
- `go_to_slide` - Individual indicator labels
- `slide_of` - Screen reader announcements

### Form Integration

The carousel doesn't directly integrate with forms, but you can use Alpine.js to track the current page or index:

```blade
<div x-data="{ selectedPage: 0 }">
    <x-spire::carousel
        x-on:spire:carousel-change="selectedPage = $event.detail.page"
    >
        <!-- slides -->
    </x-spire::carousel>

    <input type="hidden" wire:model="selectedPage" x-model="selectedPage" />
</div>
```

---

## Styling

### Custom CSS Variables

```css
/* Override gap value */
.my-carousel {
    --carousel-gap: 2rem;
}

/* Custom items per view */
.my-carousel {
    --items-per-view: 3;
}
```

### Custom Indicator Colors

```css
.my-carousel .spire-carousel__indicator {
    @apply bg-white/50;
}

.my-carousel .spire-carousel__indicator[aria-current="true"],
.my-carousel .spire-carousel__indicator[data-spire-carousel-active="true"] {
    @apply bg-white;
}
```
