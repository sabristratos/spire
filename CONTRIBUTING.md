# Contributing to Spire UI

Thank you for considering contributing to Spire UI! We welcome contributions from the community.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/sabristratos/spire/issues) to avoid duplicates.

When reporting a bug, please include:
- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (PHP version, Laravel version, browser, OS)
- **Code samples** demonstrating the issue

### Suggesting Enhancements

We love to receive enhancement suggestions! Please open an issue with:
- **Clear title and description** of the enhancement
- **Use case** - why is this enhancement needed?
- **Proposed solution** - how would it work?
- **Alternatives considered**
- **Additional context** - mockups, examples, etc.

### Pull Requests

1. **Fork the repository** and create your branch from `master`
2. **Install dependencies**: `composer install && npm install`
3. **Make your changes** following our coding standards
4. **Add tests** if applicable
5. **Update documentation** if you're changing functionality
6. **Run tests**: `composer test` or `php artisan test`
7. **Format code**: `vendor/bin/pint --dirty`
8. **Commit your changes** with clear, descriptive messages
9. **Push to your fork** and submit a pull request

## Development Setup

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js & npm
- Laravel 11.x or 12.x (for testing)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/spire.git
cd spire

# Install dependencies
composer install
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Build assets
npm run build

# Start development server
composer run dev
```

### Running Tests

```bash
# Run all tests
composer test

# Run specific test file
php artisan test tests/Unit/ComponentClassTest.php

# Run tests with coverage
php artisan test --coverage
```

### Code Style

We use **Laravel Pint** for code formatting:

```bash
# Format changed files
vendor/bin/pint --dirty

# Format all files
vendor/bin/pint

# Check formatting without making changes
vendor/bin/pint --test
```

## Component Development Guidelines

### Creating a New Component

1. **Create component folder** in `packages/spire-ui/resources/views/components/`
2. **Create Blade template** (`index.blade.php`)
3. **Create CSS file** (optional, co-located)
4. **Create JavaScript file** (optional, co-located, must use Alpine.js)
5. **Add translations** to `resources/lang/{en,fr,ar}/spire-ui.php`
6. **Register component** (automatic via service provider)
7. **Write tests** (unit, feature, and/or browser tests)
8. **Write documentation** in `docs/components/`

### Component Structure

```
components/{component-name}/
├── index.blade.php          # Main component template
├── {component-name}.css     # Component-specific styles (optional)
├── {component-name}.js      # Alpine.js component (optional)
├── {child}.blade.php        # Child components (optional)
└── ...
```

### CSS Guidelines

- Use **BEM-like naming**: `.spire-{component}--{modifier}`
- Co-locate styles in component folder
- Use `@layer components` in CSS
- Use Tailwind utilities via `@apply`
- Define styles in theme tokens when possible
- Add styles to `resources/css/index.css` imports

Example:
```css
@layer components {
    .spire-button {
        @apply inline-flex items-center justify-center;
        @apply font-medium transition-colors;
    }

    .spire-button--sm { @apply h-8 px-3 text-sm; }
    .spire-button--md { @apply h-10 px-4 text-base; }
}
```

### JavaScript Guidelines

- Use **Alpine.js** for all component interactivity
- Co-locate scripts in component folder
- Export component function from module
- Register in `resources/js/index.js`
- Use camelCase for Alpine component names: `spire{Component}`
- Add JSDoc documentation
- Implement `destroy()` method for cleanup if using timers/listeners

Example:
```javascript
/**
 * Example Alpine.js component.
 *
 * @param {Object} options - Configuration options
 * @returns {Object} Alpine component object
 */
export function exampleComponent(options = {}) {
    return {
        value: options.value || '',

        init() {
            // Initialize component
        },

        destroy() {
            // Clean up resources
        }
    };
}
```

### Data Attributes

- **Always prefix with `data-spire-`**
- Use for component state and configuration
- Examples: `data-spire-size`, `data-spire-variant`, `data-spire-loading`

### Blade Component Guidelines

- Use **anonymous components** (no PHP class)
- Use `ComponentClass` API for building classes
- Use `spire_default()` helper for default props
- Validate props using `@props` directive
- Add proper attributes merging with `$attributes`
- Support `wire:model` for form inputs
- Include proper ARIA attributes for accessibility

Example:
```blade
@props([
    'size' => spire_default('button', 'size', 'md'),
    'color' => 'primary',
    'variant' => 'solid',
])

@php
use SpireUI\Support\ComponentClass;

$classes = ComponentClass::make('button')
    ->size($size)
    ->colorVariant($color, $variant)
    ->build();
@endphp

<button {{ $attributes->merge(['class' => $classes, ...$classes->getDataAttributes()]) }}>
    {{ $slot }}
</button>
```

### Accessibility Requirements

All components must be accessible:

- ✅ **Keyboard navigation** - All interactive elements must be keyboard accessible
- ✅ **ARIA attributes** - Proper roles, labels, and states
- ✅ **Focus management** - Visible focus indicators, focus trapping where needed
- ✅ **Screen reader support** - Meaningful labels and announcements
- ✅ **Color contrast** - WCAG AA compliant (4.5:1 for text)

### Translation Guidelines

Add translations to all three language files:

```php
// resources/lang/en/spire-ui.php
'button' => [
    'loading' => 'Loading...',
],

// resources/lang/fr/spire-ui.php
'button' => [
    'loading' => 'Chargement...',
],

// resources/lang/ar/spire-ui.php (RTL)
'button' => [
    'loading' => 'جار التحميل...',
],
```

### Documentation Guidelines

Create documentation file in `docs/components/{component-name}.md`:

```markdown
# Component Name

Brief description of the component.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | string | `'value'` | Prop description |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `event-name` | `{ value }` | Event description |

## Examples

### Basic Usage
\`\`\`blade
<x-spire::component />
\`\`\`

### With Livewire
\`\`\`blade
<x-spire::component wire:model="property" />
\`\`\`

## Accessibility

- Keyboard navigation details
- ARIA attributes used
- Screen reader considerations

## Best Practices

- Tips and recommendations
- Common use cases
- Gotchas to avoid
```

## Testing Guidelines

### Unit Tests

Test utility classes and helpers:

```php
it('builds component class with size', function () {
    $class = ComponentClass::make('button')
        ->size('md')
        ->build();

    expect($class)->toContain('spire-button--md');
});
```

### Feature Tests

Test Livewire component integration:

```php
it('can update value via livewire', function () {
    Livewire::test(ComponentTest::class)
        ->set('value', 'new value')
        ->assertSet('value', 'new value');
});
```

### Browser Tests

Test Alpine.js interactivity (Pest v4):

```php
it('opens dropdown on click', function () {
    visit('/components/dropdown')
        ->click('[data-spire-dropdown-trigger]')
        ->assertSee('Dropdown Item')
        ->assertNoJavascriptErrors();
});
```

## Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests after first line

Examples:
```
Add tooltip component with positioning

- Implement tooltip component using Popover API
- Add automatic positioning with fallback
- Include delay configuration
- Add comprehensive test coverage

Closes #123
```

## Pull Request Process

1. **Update CHANGELOG.md** with your changes
2. **Update documentation** if changing functionality
3. **Ensure all tests pass**
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested

### PR Title Format

- `feat: Add new component`
- `fix: Resolve issue with...`
- `docs: Update component documentation`
- `refactor: Improve code structure`
- `test: Add missing tests`
- `chore: Update dependencies`

## Questions?

Feel free to ask questions by:
- Opening a [Discussion](https://github.com/sabristratos/spire/discussions)
- Joining our community chat (if available)
- Commenting on relevant issues

Thank you for contributing to Spire UI! 🎉
