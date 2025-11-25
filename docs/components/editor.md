# Editor Component

Rich text editor built on Tiptap providing a full-featured WYSIWYG editing experience with a customizable toolbar. Supports HTML and JSON output formats with full Livewire integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Visual style: `bordered`, `flat` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `radius` | string | `'md'` | Border radius (bordered variant only) |
| `format` | string | `'html'` | Output format: `html`, `json` |
| `placeholder` | string | `null` | Placeholder text when empty |
| `toolbar` | boolean | `true` | Show the toolbar |
| `buttons` | array | (see below) | Toolbar buttons to display |
| `showCharCount` | boolean | `false` | Show character and word count |
| `disabled` | boolean | `false` | Disables the editor |
| `editable` | boolean | `true` | Whether content can be edited |

### Default Buttons

```php
['bold', 'italic', 'strike', 'code', 'heading', 'bulletList', 'orderedList', 'blockquote', 'link', 'image', 'undo', 'redo']
```

---

## Examples

### Basic Editor

```blade
<x-spire::editor wire:model="content" />
```

### With Placeholder and Character Count

```blade
<x-spire::editor
    wire:model="content"
    placeholder="Start writing your article..."
    :show-char-count="true"
/>
```

### Custom Toolbar Buttons

Select only the buttons you need:

```blade
<x-spire::editor
    wire:model="content"
    :buttons="['bold', 'italic', 'heading', 'bulletList', 'orderedList', 'link', 'undo', 'redo']"
/>
```

### Minimal Toolbar

For simple text input with basic formatting:

```blade
<x-spire::editor
    wire:model="content"
    :buttons="['bold', 'italic', 'link', 'undo', 'redo']"
/>
```

### No Toolbar

Content-only editor for a clean writing experience:

```blade
<x-spire::editor
    wire:model="content"
    :toolbar="false"
    placeholder="Just start typing..."
/>
```

### JSON Output Format

Get the content as a ProseMirror JSON document:

```blade
<x-spire::editor
    wire:model="jsonContent"
    format="json"
/>
```

### Different Variants and Sizes

```blade
{{-- Bordered (default) --}}
<x-spire::editor
    wire:model="content"
    variant="bordered"
    size="md"
/>

{{-- Flat variant --}}
<x-spire::editor
    wire:model="content"
    variant="flat"
/>

{{-- Large size --}}
<x-spire::editor
    wire:model="content"
    size="lg"
/>

{{-- Small size --}}
<x-spire::editor
    wire:model="content"
    size="sm"
/>
```

### Disabled State

```blade
<x-spire::editor
    wire:model="content"
    :disabled="true"
/>
```

### Read-Only State

Display content without allowing edits:

```blade
<x-spire::editor
    wire:model="content"
    :editable="false"
/>
```

### Live Updates

Update Livewire property on every change:

```blade
<x-spire::editor wire:model.live="content" />
```

### In a Livewire Component

```php
// App/Livewire/ArticleEditor.php
class ArticleEditor extends Component
{
    public string $content = '';

    public function save()
    {
        $this->validate([
            'content' => 'required|min:100',
        ]);

        Article::create([
            'content' => $this->content,
        ]);

        $this->dispatch('article-saved');
    }

    public function render()
    {
        return view('livewire.article-editor');
    }
}
```

```blade
{{-- resources/views/livewire/article-editor.blade.php --}}
<div>
    <x-spire::field label="Content" error="content">
        <x-spire::editor
            wire:model="content"
            placeholder="Write your article..."
            :show-char-count="true"
        />
    </x-spire::field>

    <div class="mt-4">
        <x-spire::button color="primary" wire:click="save">
            Save Article
        </x-spire::button>
    </div>
</div>
```

### Code-Focused Editor

For technical content with code blocks:

```blade
<x-spire::editor
    wire:model="documentation"
    :buttons="['bold', 'italic', 'code', 'heading', 'bulletList', 'orderedList', 'codeBlock', 'link', 'undo', 'redo']"
    placeholder="Write documentation..."
/>
```

---

## Toolbar Buttons

### Available Buttons

| Button | Description |
|--------|-------------|
| `bold` | Bold text formatting |
| `italic` | Italic text formatting |
| `strike` | Strikethrough text |
| `code` | Inline code formatting |
| `heading` | Heading levels (H1, H2) |
| `bulletList` | Unordered bullet list |
| `orderedList` | Numbered list |
| `blockquote` | Block quote |
| `codeBlock` | Code block with syntax |
| `link` | Hyperlink (prompts for URL) |
| `image` | Image embed (prompts for URL) |
| `undo` | Undo last action |
| `redo` | Redo last action |

### Button Groups

When customizing buttons, consider logical groupings:

```blade
{{-- Text formatting --}}
:buttons="['bold', 'italic', 'strike', 'code']"

{{-- Structure --}}
:buttons="['heading', 'bulletList', 'orderedList', 'blockquote']"

{{-- Media --}}
:buttons="['link', 'image']"

{{-- History --}}
:buttons="['undo', 'redo']"
```

---

## Output Formats

### HTML Format (Default)

Returns content as an HTML string:

```php
public string $content = '';

// After editing:
// $this->content = '<p>Hello <strong>world</strong></p>'
```

### JSON Format

Returns content as a ProseMirror JSON document structure:

```php
public array $jsonContent = [];

// After editing:
// $this->jsonContent = ['type' => 'doc', 'content' => [...]]
```

JSON format is useful when you need to:
- Store the document structure for later manipulation
- Render content on different platforms
- Implement collaborative editing features

---

## Best Practices

### Do

- Use `placeholder` to guide users on what to write
- Enable `showCharCount` for content with length requirements
- Customize `buttons` to show only relevant formatting options
- Use `wire:model.live` when you need real-time content sync
- Use `format="json"` when you need to process the document structure
- Provide appropriate field labels and error messages

### Don't

- Don't include all buttons if users only need basic formatting
- Don't use the editor for simple single-line text (use input instead)
- Don't disable both toolbar and character count without clear purpose
- Don't forget to validate content on the server side
- Don't rely solely on client-side content length - validate in PHP

---

## Accessibility

- Toolbar buttons have proper labels for screen readers
- Keyboard shortcuts for common formatting (Cmd/Ctrl+B for bold, etc.)
- Focus indicators on editor and toolbar buttons
- ARIA attributes for editor state

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + B` | Bold |
| `Cmd/Ctrl + I` | Italic |
| `Cmd/Ctrl + U` | Underline |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + K` | Insert link |

---

## Technical Notes

### Alpine.js x-model Support

The editor supports Alpine.js `x-model` for two-way binding without Livewire:

```blade
<div x-data="{ content: '' }">
    <x-spire::editor
        x-model="content"
        placeholder="Start writing..."
        :show-char-count="true"
    />
    <p class="mt-2 text-sm text-muted">
        Content length: <span x-text="content.length"></span> characters
    </p>
</div>

{{-- With JSON format --}}
<div x-data="{ doc: {} }">
    <x-spire::editor x-model="doc" format="json" />
</div>
```

**Data types:**
- HTML format: String (HTML markup)
- JSON format: Object (ProseMirror document structure)

### Livewire Integration

The editor uses `wire:model` with Alpine's `$wire.entangle()` for two-way binding:

```blade
<x-spire::editor wire:model="content" />
```

The component wrapper uses `wire:ignore` to prevent Livewire from re-rendering the Tiptap editor DOM on updates.

### Translations

The editor component supports these translation keys under `spire-ui::spire-ui.editor`:

- `bold` - "Bold"
- `italic` - "Italic"
- `strike` - "Strikethrough"
- `code` - "Code"
- `heading` - "Heading"
- `bullet_list` - "Bullet list"
- `ordered_list` - "Numbered list"
- `blockquote` - "Quote"
- `code_block` - "Code block"
- `link` - "Link"
- `image` - "Image"
- `undo` - "Undo"
- `redo` - "Redo"
- `characters` - "characters"
- `words` - "words"
- `enter_url` - "Enter URL"
- `enter_image_url` - "Enter image URL"

### Dependencies

The editor requires Tiptap packages:
- `@tiptap/core`
- `@tiptap/starter-kit`
- `@tiptap/extension-link`
- `@tiptap/extension-image`
- `@tiptap/extension-placeholder`
- `@tiptap/extension-character-count`
