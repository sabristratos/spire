<?php

namespace SpireUI\Support;

/**
 * Fluent component class builder for Spire UI components.
 *
 * This class provides a fluent API for building CSS class strings and data attributes
 * following the BEM-like naming convention (spire-{component}--{modifier}).
 *
 * Key features:
 * - Automatic class name generation with consistent naming
 * - Automatic data attribute generation (data-spire-*)
 * - Chainable methods for easy composition
 * - Integration with ComponentStyles for Tailwind utilities
 * - Conditional class application
 *
 * @example Basic usage:
 * ```php
 * $builder = ComponentClass::make('button')
 *     ->size('md')
 *     ->colorVariant('primary', 'solid')
 *     ->radius('md')
 *     ->build();
 * // Returns: "spire-button spire-button--md spire-button--primary-solid rounded-md"
 * ```
 *
 * @example With data attributes:
 * ```php
 * $builder = ComponentClass::make('button')
 *     ->size('lg')
 *     ->dataAttribute('loading', 'true');
 *
 * $classes = $builder->build();
 * $dataAttrs = $builder->getDataAttributes();
 * // $dataAttrs = ['data-spire-size' => 'lg', 'data-spire-loading' => 'true']
 * ```
 *
 * @example Conditional classes:
 * ```php
 * $builder = ComponentClass::make('button')
 *     ->size('md')
 *     ->when($isLoading, fn($b) => $b->modifier('loading'))
 *     ->addIf($isDisabled, 'opacity-50', 'cursor-not-allowed');
 * ```
 *
 * @package SpireUI\Support
 */
class ComponentClass
{
    /**
     * @var array<int, string> List of CSS classes to be applied
     */
    protected array $classes = [];

    /**
     * @var array<string, mixed> Data attributes to be applied (data-spire-*)
     */
    protected array $dataAttributes = [];

    /**
     * Create a new ComponentClass instance.
     *
     * @param string $component The base component name (e.g., 'button', 'input')
     */
    public function __construct(protected string $component)
    {
        $this->classes[] = "spire-{$component}";
    }

    /**
     * Create a new ComponentClass instance (static factory method).
     *
     * @param string $component The base component name (e.g., 'button', 'input')
     * @return self
     *
     * @example
     * ```php
     * $builder = ComponentClass::make('button');
     * ```
     */
    public static function make(string $component): self
    {
        return new self($component);
    }

    /**
     * Add a size modifier class and corresponding data attribute.
     *
     * Generates: spire-{component}--{size} and data-spire-size="{size}"
     *
     * @param string $size Size value (e.g., 'sm', 'md', 'lg')
     * @return self
     *
     * @example
     * ```php
     * ->size('md')  // Adds: spire-button--md, data-spire-size="md"
     * ```
     */
    public function size(string $size): self
    {
        $this->classes[] = "spire-{$this->component}--{$size}";
        $this->dataAttributes['data-spire-size'] = $size;

        return $this;
    }

    /**
     * Add a variant modifier class and corresponding data attribute.
     *
     * Generates: spire-{component}--{variant} and data-spire-variant="{variant}"
     *
     * @param string $variant Variant value (e.g., 'solid', 'outline', 'ghost')
     * @return self
     *
     * @example
     * ```php
     * ->variant('outline')  // Adds: spire-button--outline, data-spire-variant="outline"
     * ```
     */
    public function variant(string $variant): self
    {
        $this->classes[] = "spire-{$this->component}--{$variant}";
        $this->dataAttributes['data-spire-variant'] = $variant;

        return $this;
    }

    /**
     * Add a color modifier class and corresponding data attribute.
     *
     * Generates: spire-{component}--{color} and data-spire-color="{color}"
     *
     * @param string $color Color value (e.g., 'primary', 'secondary', 'success')
     * @return self
     *
     * @example
     * ```php
     * ->color('primary')  // Adds: spire-button--primary, data-spire-color="primary"
     * ```
     */
    public function color(string $color): self
    {
        $this->classes[] = "spire-{$this->component}--{$color}";
        $this->dataAttributes['data-spire-color'] = $color;

        return $this;
    }

    /**
     * Add a combined color-variant modifier class and corresponding data attributes.
     *
     * Generates: spire-{component}--{color}-{variant} and both data attributes
     *
     * @param string $color Color value (e.g., 'primary', 'secondary', 'success')
     * @param string $variant Variant value (e.g., 'solid', 'outline', 'ghost')
     * @return self
     *
     * @example
     * ```php
     * ->colorVariant('primary', 'solid')
     * // Adds: spire-button--primary-solid, data-spire-color="primary", data-spire-variant="solid"
     * ```
     */
    public function colorVariant(string $color, string $variant): self
    {
        $this->classes[] = "spire-{$this->component}--{$color}-{$variant}";
        $this->dataAttributes['data-spire-color'] = $color;
        $this->dataAttributes['data-spire-variant'] = $variant;

        return $this;
    }

    /**
     * Add a custom modifier class.
     *
     * Generates: spire-{component}--{modifier}
     *
     * @param string $modifier Custom modifier name (e.g., 'icon-only', 'loading')
     * @return self
     *
     * @example
     * ```php
     * ->modifier('icon-only')  // Adds: spire-button--icon-only
     * ```
     */
    public function modifier(string $modifier): self
    {
        $this->classes[] = "spire-{$this->component}--{$modifier}";

        return $this;
    }

    /**
     * Add a border-radius utility class from ComponentStyles.
     *
     * @param string $radius Radius size (e.g., 'none', 'sm', 'md', 'lg', 'full')
     * @return self
     *
     * @example
     * ```php
     * ->radius('md')  // Adds: rounded-md
     * ```
     */
    public function radius(string $radius): self
    {
        $class = ComponentStyles::radiusClasses($radius);

        if ($class) {
            $this->classes[] = $class;
        }

        return $this;
    }

    /**
     * Add a box-shadow utility class from ComponentStyles.
     *
     * @param string $shadow Shadow size (e.g., 'none', 'sm', 'md', 'lg', 'xl')
     * @return self
     *
     * @example
     * ```php
     * ->shadow('sm')  // Adds: shadow-sm
     * ```
     */
    public function shadow(string $shadow): self
    {
        $class = ComponentStyles::shadowClasses($shadow);

        if ($class) {
            $this->classes[] = $class;
        }

        return $this;
    }

    /**
     * Add multiple custom classes at once.
     *
     * Empty strings are automatically filtered out.
     *
     * @param string ...$classes Variable number of class names to add
     * @return self
     *
     * @example
     * ```php
     * ->addClasses('custom-class', 'another-class', 'more')
     * ```
     */
    public function addClasses(string ...$classes): self
    {
        $this->classes = array_merge($this->classes, array_filter($classes));

        return $this;
    }

    /**
     * Add a single custom class.
     *
     * @param string $class Class name to add
     * @return self
     *
     * @example
     * ```php
     * ->addClass('custom-class')
     * ```
     */
    public function addClass(string $class): self
    {
        $this->classes[] = $class;

        return $this;
    }

    /**
     * Execute a callback when a condition is true.
     *
     * Useful for conditional method chaining without breaking fluency.
     *
     * @param bool|null $condition Condition to evaluate
     * @param callable(self): void $callback Callback receiving the builder instance
     * @return self
     *
     * @example
     * ```php
     * ->when($isLoading, function($builder) {
     *     $builder->modifier('loading')->dataAttribute('loading', 'true');
     * })
     * ```
     */
    public function when(?bool $condition, callable $callback): self
    {
        if ($condition) {
            $callback($this);
        }

        return $this;
    }

    /**
     * Add classes conditionally.
     *
     * Classes are only added if the condition is true. Empty strings are filtered out.
     *
     * @param bool|null $condition Condition to evaluate
     * @param string ...$classes Classes to add if condition is true
     * @return self
     *
     * @example
     * ```php
     * ->addIf($isDisabled, 'opacity-50', 'cursor-not-allowed')
     * ```
     */
    public function addIf(?bool $condition, string ...$classes): self
    {
        if ($condition) {
            $this->classes = array_merge($this->classes, array_filter($classes));
        }

        return $this;
    }

    /**
     * Execute a callback when a condition is false.
     *
     * Opposite of when() - executes callback only when condition is falsy.
     *
     * @param bool|null $condition Condition to evaluate
     * @param callable(self): void $callback Callback receiving the builder instance
     * @return self
     *
     * @example
     * ```php
     * ->unless($isDisabled, function($builder) {
     *     $builder->addClass('hover:opacity-80');
     * })
     * ```
     */
    public function unless(?bool $condition, callable $callback): self
    {
        if (! $condition) {
            $callback($this);
        }

        return $this;
    }

    /**
     * Add a custom data attribute with the spire prefix.
     *
     * Automatically prefixes the key with "data-spire-".
     * Null values are ignored.
     *
     * @param string $key Attribute name (will be prefixed with data-spire-)
     * @param mixed $value Attribute value (null values are ignored)
     * @return self
     *
     * @example
     * ```php
     * ->dataAttribute('loading', 'true')  // Adds: data-spire-loading="true"
     * ->dataAttribute('count', 5)          // Adds: data-spire-count="5"
     * ```
     */
    public function dataAttribute(string $key, mixed $value): self
    {
        if ($value !== null) {
            $this->dataAttributes["data-spire-{$key}"] = $value;
        }

        return $this;
    }

    /**
     * Get all data attributes as an associative array.
     *
     * Returns attributes in the format expected by Blade components.
     *
     * @return array<string, mixed> Associative array of data attributes
     *
     * @example
     * ```php
     * $attrs = $builder->getDataAttributes();
     * // ['data-spire-size' => 'md', 'data-spire-loading' => 'true']
     * ```
     */
    public function getDataAttributes(): array
    {
        return $this->dataAttributes;
    }

    /**
     * Build and return the final class string.
     *
     * Filters out empty strings, removes duplicates, and joins with spaces.
     *
     * @return string Space-separated CSS class string
     *
     * @example
     * ```php
     * $classes = $builder->build();
     * // "spire-button spire-button--md spire-button--primary-solid rounded-md"
     * ```
     */
    public function build(): string
    {
        return implode(' ', array_filter(array_unique($this->classes)));
    }

    /**
     * Get classes as an indexed array.
     *
     * Returns unique, non-empty classes as an indexed array.
     * Useful for debugging or manual class manipulation.
     *
     * @return array<int, string> Indexed array of class names
     *
     * @example
     * ```php
     * $classArray = $builder->toArray();
     * // ['spire-button', 'spire-button--md', 'spire-button--primary-solid']
     * ```
     */
    public function toArray(): array
    {
        return array_values(array_filter(array_unique($this->classes)));
    }
}
