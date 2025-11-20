# Lightbox

A full-featured lightbox component for displaying images, videos, and PDFs in an overlay. Supports grouping, keyboard navigation, touch gestures, zoom, and more.

## Basic Usage

First, place the lightbox component once in your layout:

```blade
<x-spire::lightbox />
```

Then add the `data-spire-lightbox` attribute to any element you want to open in the lightbox:

```blade
<img src="photo.jpg" data-spire-lightbox alt="My photo">
```

The source is automatically detected from the element's `src` or `href` attribute.

## Grouped Gallery

Group multiple items together for navigation:

```blade
<div class="grid grid-cols-3 gap-4">
    <img src="img1.jpg" data-spire-lightbox data-spire-lightbox-group="gallery" alt="Image 1">
    <img src="img2.jpg" data-spire-lightbox data-spire-lightbox-group="gallery" alt="Image 2">
    <img src="img3.jpg" data-spire-lightbox data-spire-lightbox-group="gallery" alt="Image 3">
</div>
```

## With Captions

Add captions using the `data-spire-lightbox-title` attribute or the element's `alt`/`title` attribute:

```blade
<img
    src="photo.jpg"
    data-spire-lightbox
    data-spire-lightbox-title="A beautiful sunset over the mountains"
    alt="Sunset"
>
```

## Explicit Source

When the thumbnail differs from the full-size image:

```blade
<img
    src="thumbnail.jpg"
    data-spire-lightbox
    data-spire-lightbox-src="full-size.jpg"
    alt="Product photo"
>
```

## Videos

### Self-hosted Video

```blade
<img
    src="video-thumb.jpg"
    data-spire-lightbox
    data-spire-lightbox-type="video"
    data-spire-lightbox-src="/videos/demo.mp4"
    alt="Demo video"
>
```

### YouTube

```blade
<img
    src="yt-thumb.jpg"
    data-spire-lightbox
    data-spire-lightbox-src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    alt="YouTube video"
>
```

### Vimeo

```blade
<img
    src="vimeo-thumb.jpg"
    data-spire-lightbox
    data-spire-lightbox-src="https://vimeo.com/123456789"
    alt="Vimeo video"
>
```

## PDFs

```blade
<button
    data-spire-lightbox
    data-spire-lightbox-type="pdf"
    data-spire-lightbox-src="/documents/report.pdf"
>
    View PDF
</button>
```

## Anchor Links

Links are also supported - the source is taken from `href`:

```blade
<a href="photo.jpg" data-spire-lightbox>
    View Image
</a>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `thumbnails` | boolean | `true` | Show thumbnail strip for grouped items |
| `counter` | boolean | `true` | Show "1 / 5" counter |
| `captions` | boolean | `true` | Show titles/captions |
| `download` | boolean | `true` | Show download button |
| `zoom` | boolean | `true` | Enable zoom for images |
| `loopNavigation` | boolean | `false` | Loop navigation at the ends |
| `closeOnBackdrop` | boolean | `true` | Close when clicking the backdrop |

### Example with Custom Props

```blade
<x-spire::lightbox
    :thumbnails="false"
    :download="false"
    :loopNavigation="true"
/>
```

## Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-spire-lightbox` | Required. Marks element as a lightbox trigger |
| `data-spire-lightbox-group` | Groups items together for navigation |
| `data-spire-lightbox-src` | Explicit source URL (optional if element has `src`/`href`) |
| `data-spire-lightbox-type` | Content type: `image`, `video`, `youtube`, `vimeo`, `pdf` |
| `data-spire-lightbox-title` | Caption text |
| `data-spire-lightbox-thumbnail` | Custom thumbnail for the strip |

## Source Detection

The lightbox automatically detects the source in this priority:

1. `data-spire-lightbox-src` (explicit)
2. `src` attribute (for `<img>` and `<video>`)
3. `href` attribute (for `<a>`)

## Type Detection

If not specified, the type is auto-detected from the URL:

- YouTube/Vimeo URLs → `youtube`/`vimeo`
- `.mp4`, `.webm`, `.ogg`, `.mov` → `video`
- `.pdf` → `pdf`
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.avif` → `image`

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `←` Arrow Left | Previous item |
| `→` Arrow Right | Next item |
| `Escape` | Close lightbox |
| `Home` | Go to first item |
| `End` | Go to last item |
| `Space` / `Enter` | Toggle zoom (images only) |

## Touch Gestures

- **Swipe left/right**: Navigate between items
- **Pinch**: Zoom in/out (images only)

## Events

Listen for lightbox events on the window:

```javascript
window.addEventListener('spire-lightbox-opened', (e) => {
    console.log('Lightbox opened', e.detail);
    // { value: 0, index: 0, item: {...}, timestamp: ... }
});

window.addEventListener('spire-lightbox-closed', (e) => {
    console.log('Lightbox closed', e.detail);
});

window.addEventListener('spire-lightbox-changed', (e) => {
    console.log('Item changed', e.detail);
    // { value: 1, index: 1, previousIndex: 0, item: {...}, timestamp: ... }
});
```

## Styling

The lightbox uses these CSS classes that you can customize:

```css
.spire-lightbox { /* Dialog container */ }
.spire-lightbox__container { /* Inner container */ }
.spire-lightbox__close { /* Close button */ }
.spire-lightbox__counter { /* Counter badge */ }
.spire-lightbox__content { /* Content area */ }
.spire-lightbox__loading { /* Loading spinner */ }
.spire-lightbox__image { /* Image element */ }
.spire-lightbox__video { /* Video element */ }
.spire-lightbox__iframe { /* YouTube/Vimeo iframe */ }
.spire-lightbox__pdf { /* PDF iframe */ }
.spire-lightbox__nav { /* Navigation arrows */ }
.spire-lightbox__nav--prev { /* Previous arrow */ }
.spire-lightbox__nav--next { /* Next arrow */ }
.spire-lightbox__bottom { /* Bottom bar */ }
.spire-lightbox__caption { /* Caption text */ }
.spire-lightbox__thumbnails { /* Thumbnail strip */ }
.spire-lightbox__thumbnail { /* Individual thumbnail */ }
.spire-lightbox__thumbnail--active { /* Active thumbnail */ }
.spire-lightbox__actions { /* Action buttons container */ }
.spire-lightbox__action { /* Individual action button */ }
```

## Complete Example

```blade
{{-- In your layout (once) --}}
<x-spire::lightbox :loop="true" />

{{-- Product gallery --}}
<div class="grid grid-cols-4 gap-4">
    @foreach($product->images as $image)
        <img
            src="{{ $image->thumbnail_url }}"
            data-spire-lightbox
            data-spire-lightbox-group="product-{{ $product->id }}"
            data-spire-lightbox-src="{{ $image->full_url }}"
            data-spire-lightbox-title="{{ $image->caption }}"
            alt="{{ $image->alt }}"
            class="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        >
    @endforeach
</div>

{{-- Video preview --}}
<div class="mt-4">
    <img
        src="{{ $product->video_thumbnail }}"
        data-spire-lightbox
        data-spire-lightbox-group="product-{{ $product->id }}"
        data-spire-lightbox-src="{{ $product->video_url }}"
        alt="Product video"
        class="rounded-lg cursor-pointer"
    >
</div>

{{-- PDF manual --}}
<button
    data-spire-lightbox
    data-spire-lightbox-type="pdf"
    data-spire-lightbox-src="{{ $product->manual_pdf }}"
    class="btn btn-secondary"
>
    View Manual
</button>
```

## Accessibility

The lightbox component includes:

- Native `<dialog>` element for proper modal behavior
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management when opening/closing
- Screen reader announcements for counter

## Browser Support

The lightbox uses the native `<dialog>` element which is supported in all modern browsers. For older browsers, consider adding the dialog polyfill.
