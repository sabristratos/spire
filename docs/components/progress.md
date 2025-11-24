# Progress

Display progress indicators for tasks, uploads, or any operation with measurable completion.

## Linear Progress

### Basic Usage

```blade
<x-spire::progress :value="75" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | int/float | `0` | Current progress value |
| `max` | int | `100` | Maximum value |
| `size` | string | `'md'` | Height: `sm`, `md`, `lg` |
| `color` | string | `'primary'` | Color theme |
| `variant` | string | `'solid'` | Visual style: `solid`, `striped`, `gradient` |
| `animated` | bool | `false` | Animate striped pattern |
| `indeterminate` | bool | `false` | Unknown progress state |
| `showLabel` | bool | `false` | Display percentage |
| `labelPosition` | string | `'inside'` | Label position: `inside`, `outside`, `top` |
| `radius` | string | `'full'` | Border radius |
| `label` | string | `null` | Custom label text |

### Sizes

```blade
<x-spire::progress :value="60" size="sm" />
<x-spire::progress :value="60" size="md" />
<x-spire::progress :value="60" size="lg" />
```

### Colors

```blade
<x-spire::progress :value="60" color="primary" />
<x-spire::progress :value="60" color="secondary" />
<x-spire::progress :value="60" color="success" />
<x-spire::progress :value="60" color="error" />
<x-spire::progress :value="60" color="warning" />
<x-spire::progress :value="60" color="info" />
```

### Variants

#### Solid (Default)

```blade
<x-spire::progress :value="60" variant="solid" />
```

#### Striped

```blade
<x-spire::progress :value="60" variant="striped" />
```

#### Animated Stripes

```blade
<x-spire::progress :value="60" variant="striped" animated />
```

#### Gradient

```blade
<x-spire::progress :value="60" variant="gradient" color="primary" />
<x-spire::progress :value="60" variant="gradient" color="success" />
```

### With Labels

#### Inside (Default)

```blade
<x-spire::progress :value="75" size="lg" showLabel />
```

#### Outside

```blade
<x-spire::progress :value="75" showLabel labelPosition="outside" />
```

#### Top

```blade
<x-spire::progress :value="75" showLabel labelPosition="top" />
```

#### Custom Label

```blade
<x-spire::progress :value="3" :max="10" showLabel label="3 of 10 files" />
```

### Indeterminate State

For operations with unknown duration:

```blade
<x-spire::progress indeterminate />
<x-spire::progress indeterminate color="info" />
```

---

## Circular Progress

### Basic Usage

```blade
<x-spire::progress.circular :value="75" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | int/float | `0` | Current progress value |
| `max` | int | `100` | Maximum value |
| `size` | int | `48` | Diameter in pixels |
| `strokeWidth` | int | `4` | Circle stroke width |
| `color` | string | `'primary'` | Color theme |
| `showLabel` | bool | `true` | Show percentage in center |
| `indeterminate` | bool | `false` | Spinning animation |
| `label` | string | `null` | Custom label text |
| `trackColor` | string | `null` | Background track color |

### Sizes

```blade
<x-spire::progress.circular :value="60" :size="32" />
<x-spire::progress.circular :value="60" :size="48" />
<x-spire::progress.circular :value="60" :size="64" />
<x-spire::progress.circular :value="60" :size="96" />
```

### Colors

```blade
<x-spire::progress.circular :value="60" color="primary" />
<x-spire::progress.circular :value="60" color="success" />
<x-spire::progress.circular :value="60" color="error" />
```

### Stroke Width

```blade
<x-spire::progress.circular :value="60" :strokeWidth="2" />
<x-spire::progress.circular :value="60" :strokeWidth="6" />
<x-spire::progress.circular :value="60" :strokeWidth="8" />
```

### Custom Content

Use the slot for custom center content:

```blade
<x-spire::progress.circular :value="75" :size="80" :showLabel="false">
    <x-spire::icon name="check" class="w-6 h-6 text-success" />
</x-spire::progress.circular>
```

### Indeterminate

```blade
<x-spire::progress.circular indeterminate />
<x-spire::progress.circular indeterminate color="info" :size="64" />
```

---

## Livewire Integration

### Basic Binding

```blade
{{-- In your Livewire component --}}
<x-spire::progress :value="$uploadProgress" />
```

### With Wire:poll

```blade
<div wire:poll.500ms>
    <x-spire::progress :value="$this->taskProgress" showLabel />
</div>
```

### File Upload Example

```php
// Livewire Component
class FileUploader extends Component
{
    public $uploadProgress = 0;

    public function updatedFile()
    {
        // Progress updates automatically during upload
    }

    public function render()
    {
        return view('livewire.file-uploader');
    }
}
```

```blade
{{-- file-uploader.blade.php --}}
<div>
    <input type="file" wire:model="file">

    <x-spire::progress
        :value="$uploadProgress"
        color="info"
        showLabel
        labelPosition="outside"
    />
</div>
```

---

## Alpine.js Integration

### Reactive Value

```blade
<div x-data="{ progress: 0 }">
    <x-spire::progress x-bind:value="progress" />

    <button @click="progress += 10">Increment</button>
</div>
```

### Event-Driven Updates

```blade
<x-spire::progress
    x-data="{ value: 0 }"
    x-bind:value="value"
    @file-progress.window="value = $event.detail.percent"
/>
```

### Custom Events

Dispatch events to update progress:

```javascript
// Dispatch from anywhere
window.dispatchEvent(new CustomEvent('file-progress', {
    detail: { percent: 50 }
}));
```

### Using Component Methods

```blade
<div x-data="spireProgress({ value: 0 })" x-ref="progress">
    <div class="spire-progress">
        <div class="spire-progress--bar" x-bind:style="'width: ' + currentValue + '%'"></div>
    </div>

    <button @click="increment(10)">+10%</button>
    <button @click="decrement(10)">-10%</button>
    <button @click="complete()">Complete</button>
    <button @click="reset()">Reset</button>
</div>
```

---

## Examples

### Task Progress

```blade
<div class="space-y-4">
    <div>
        <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">Uploading files...</span>
            <span class="text-sm text-muted">3/10</span>
        </div>
        <x-spire::progress :value="30" color="info" />
    </div>
</div>
```

### Multi-step Form

```blade
<div class="mb-6">
    <x-spire::progress :value="$step * 25" :max="100" color="primary" />
    <div class="flex justify-between mt-2 text-sm text-muted">
        <span>Step {{ $step }} of 4</span>
        <span>{{ $step * 25 }}%</span>
    </div>
</div>
```

### Download Progress

```blade
<div class="flex items-center gap-4">
    <x-spire::progress.circular :value="$downloadProgress" :size="48" color="success" />
    <div>
        <p class="font-medium">Downloading...</p>
        <p class="text-sm text-muted">{{ $downloadedMB }} / {{ $totalMB }} MB</p>
    </div>
</div>
```

### Status Indicators

```blade
<div class="space-y-3">
    <div class="flex items-center gap-3">
        <x-spire::progress.circular :value="100" :size="24" color="success" :showLabel="false" />
        <span>Completed tasks</span>
    </div>
    <div class="flex items-center gap-3">
        <x-spire::progress.circular :value="60" :size="24" color="warning" :showLabel="false" />
        <span>In progress</span>
    </div>
    <div class="flex items-center gap-3">
        <x-spire::progress.circular indeterminate :size="24" color="info" />
        <span>Loading...</span>
    </div>
</div>
```

### Skill Bars

```blade
<div class="space-y-4">
    @foreach($skills as $skill => $level)
        <div>
            <div class="flex justify-between mb-1">
                <span class="text-sm font-medium">{{ $skill }}</span>
                <span class="text-sm text-muted">{{ $level }}%</span>
            </div>
            <x-spire::progress :value="$level" variant="gradient" color="primary" size="sm" />
        </div>
    @endforeach
</div>
```

---

## Accessibility

The progress components include proper ARIA attributes:

- `role="progressbar"` - Identifies the element as a progress indicator
- `aria-valuenow` - Current value (omitted for indeterminate)
- `aria-valuemin` - Minimum value (0)
- `aria-valuemax` - Maximum value
- `aria-label` - Descriptive label for screen readers

For indeterminate progress, the `aria-valuenow` is omitted to indicate unknown progress.
