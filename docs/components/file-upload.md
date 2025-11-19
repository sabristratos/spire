# File Upload

A comprehensive file upload component with drag-and-drop support, image previews, progress tracking, and Livewire integration.

## Basic Usage

```blade
<x-spire::file-upload wire:model="photos" />
```

## Multiple Files

```blade
<x-spire::file-upload wire:model="photos" multiple />
```

## With File Restrictions

```blade
<x-spire::file-upload
    wire:model="documents"
    :accept="['image/*', 'application/pdf']"
    :max-size="5242880"
    :max-files="10"
    multiple
/>
```

## Displaying Existing Files

### With Spatie Media Library

```blade
<x-spire::file-upload
    wire:model="newPhotos"
    :existing="$product->getMedia('gallery')"
    remove-event="removeGalleryImage"
    multiple
/>
```

### With Simple Array

```blade
<x-spire::file-upload
    wire:model="newPhotos"
    :existing="[
        ['id' => 1, 'name' => 'photo.jpg', 'url' => '/storage/photos/photo.jpg', 'size' => 102400, 'type' => 'image/jpeg'],
        ['id' => 2, 'name' => 'document.pdf', 'url' => '/storage/docs/document.pdf', 'size' => 204800, 'type' => 'application/pdf'],
    ]"
    remove-event="removeFile"
    multiple
/>
```

## Manual Upload Mode

By default, files upload immediately when selected. Use `auto-upload="false"` to queue files and upload on demand:

```blade
<x-spire::file-upload
    wire:model="photos"
    :auto-upload="false"
    multiple
/>
```

## Upload from URL

Enable the URL upload feature to allow users to add files from external URLs:

```blade
<x-spire::file-upload
    wire:model="photos"
    :url-upload="true"
    multiple
/>
```

This displays a URL input field where users can paste a direct link to a file. The component will fetch the file and add it to the upload queue.

**Note:** URL uploads are subject to CORS restrictions. The target server must allow cross-origin requests, or the file fetch will fail with an appropriate error message.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `wire:model` | string | - | Livewire property to bind uploaded files |
| `accept` | array\|string | `[]` | Accepted MIME types or extensions |
| `max-size` | int | `null` | Maximum file size in bytes |
| `max-files` | int | `null` | Maximum number of files allowed |
| `multiple` | bool | `false` | Allow multiple file selection |
| `existing` | array\|Collection | `[]` | Existing files to display |
| `auto-upload` | bool | `true` | Auto-upload files when selected |
| `remove-event` | string | `'removeExistingFile'` | Livewire event name for removing existing files |
| `disabled` | bool | `false` | Disable the upload component |
| `url-upload` | bool | `false` | Show "Upload from URL" section |

## Livewire Integration

### Basic Component

```php
<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;

class ProductForm extends Component
{
    use WithFileUploads;

    public $photos = [];

    public function save()
    {
        $this->validate([
            'photos.*' => 'image|max:5120', // 5MB max
        ]);

        foreach ($this->photos as $photo) {
            $photo->store('photos');
        }
    }

    public function render()
    {
        return view('livewire.product-form');
    }
}
```

```blade
{{-- livewire/product-form.blade.php --}}
<form wire:submit="save">
    <x-spire::file-upload
        wire:model="photos"
        :accept="['image/*']"
        :max-size="5242880"
        multiple
    />

    @error('photos.*')
        <p class="text-error text-sm">{{ $message }}</p>
    @enderror

    <x-spire::button type="submit">Save</x-spire::button>
</form>
```

### With Existing Files (Spatie Media Library)

```php
<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\On;

class ProductGallery extends Component
{
    use WithFileUploads;

    public Product $product;
    public $newPhotos = [];

    public function mount(Product $product)
    {
        $this->product = $product;
    }

    #[On('removeGalleryImage')]
    public function removeGalleryImage($mediaId)
    {
        $this->product->deleteMedia($mediaId);
    }

    public function save()
    {
        $this->validate([
            'newPhotos.*' => 'image|max:5120',
        ]);

        foreach ($this->newPhotos as $photo) {
            $this->product
                ->addMedia($photo)
                ->toMediaCollection('gallery');
        }

        $this->newPhotos = [];

        session()->flash('success', 'Photos uploaded successfully');
    }

    public function render()
    {
        return view('livewire.product-gallery');
    }
}
```

```blade
{{-- livewire/product-gallery.blade.php --}}
<div>
    <x-spire::file-upload
        wire:model="newPhotos"
        :existing="$product->getMedia('gallery')"
        remove-event="removeGalleryImage"
        :accept="['image/*']"
        :max-files="20"
        multiple
    />

    <x-spire::button wire:click="save" class="mt-4">
        Save Gallery
    </x-spire::button>
</div>
```

## Accepted File Types

### By MIME Type

```blade
{{-- Images only --}}
<x-spire::file-upload :accept="['image/*']" />

{{-- Specific image types --}}
<x-spire::file-upload :accept="['image/jpeg', 'image/png', 'image/webp']" />

{{-- Documents --}}
<x-spire::file-upload :accept="['application/pdf', 'application/msword']" />
```

### By Extension

```blade
{{-- By file extension --}}
<x-spire::file-upload :accept="['.pdf', '.doc', '.docx']" />
```

### Mixed

```blade
{{-- Combine MIME types and extensions --}}
<x-spire::file-upload :accept="['image/*', '.pdf', 'application/vnd.ms-excel']" />
```

## Events

The component emits events that you can listen to:

### Alpine Events

| Event | Description | Payload |
|-------|-------------|---------|
| `spire-file-upload-added` | Files have been added to the queue | `{ value: [files], metadata: { totalFiles } }` |
| `spire-file-upload-removed` | A file has been removed | `{ value: file, metadata: { remainingFiles } }` |
| `spire-file-upload-progress` | Upload progress update | `{ value: file, metadata: { progress } }` |
| `spire-file-upload-complete` | File upload completed | `{ value: file, metadata: { uploadedFilename } }` |
| `spire-file-upload-error` | File upload failed | `{ value: file, metadata: { error } }` |

```blade
<x-spire::file-upload
    wire:model="photos"
    @spire-file-upload-added="console.log('Files added:', $event.detail)"
    @spire-file-upload-removed="console.log('File removed:', $event.detail)"
    @spire-file-upload-progress="console.log('Upload progress:', $event.detail)"
    @spire-file-upload-complete="console.log('Upload complete:', $event.detail)"
    @spire-file-upload-error="console.log('Upload error:', $event.detail)"
/>
```

### Livewire Events

For removing existing files, the component calls the Livewire method specified in `remove-event`:

```php
#[On('removeExistingFile')]
public function removeExistingFile($fileId)
{
    // Handle file removal
    Media::find($fileId)?->delete();
}
```

## Accessibility

The file upload component includes:

- Keyboard navigation (Enter/Space to open file picker)
- ARIA labels for all interactive elements
- Screen reader announcements for upload status
- Focus management
- Visible focus indicators

## Styling

### CSS Classes

The component uses BEM-style classes:

- `.spire-file-upload` - Main container
- `.spire-file-upload-zone` - Drop zone
- `.spire-file-upload-zone--dragging` - Active drag state
- `.spire-file-upload-preview` - File preview item
- `.spire-file-upload-progress` - Progress bar
- `.spire-file-upload-existing-item` - Existing file item

### Customization

You can customize the appearance using Tailwind classes:

```blade
<x-spire::file-upload
    wire:model="photos"
    class="max-w-md"
/>
```

## File Size Formatting

The component automatically formats file sizes:

- Bytes: "512 B"
- Kilobytes: "1.5 KB"
- Megabytes: "2.4 MB"
- Gigabytes: "1.2 GB"

## Progress Tracking

When `auto-upload` is enabled, each file shows:

- Upload progress percentage
- Visual progress bar
- Status indicator (uploading/uploaded/error)

## Error Handling

The component validates files before upload:

- **File size**: Shows "File size exceeds X" error
- **File type**: Shows "File type not allowed" error
- **Max files**: Shows "Maximum X files allowed" error

Failed uploads can be retried using the retry button.

## See Also

- [Input](/docs/components/input.md) - Text input component
- [Form](/docs/components/form.md) - Form layout components
- [Button](/docs/components/button.md) - Button component
