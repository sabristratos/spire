<?php

namespace SpireUI\Support;

/**
 * Component style utility class for Spire UI.
 *
 * Provides static methods for generating Tailwind CSS class strings for common
 * component styling patterns. This class serves as a central repository for
 * style mappings and is used by ComponentClass and individual components.
 *
 * Features:
 * - Color variant mappings (solid, bordered, flat, ghost, soft, link, shadow, dot)
 * - Size variant mappings for different component types
 * - Radius and shadow utilities
 * - Input-specific style classes
 * - Dropdown-specific style classes
 * - Button/avatar group classes with complex selectors
 *
 * @example Basic usage:
 * ```php
 * $classes = ComponentStyles::colorClasses('solid', 'primary');
 * // Returns: "bg-primary text-primary-foreground"
 *
 * $radius = ComponentStyles::radiusClasses('md');
 * // Returns: "rounded-md"
 * ```
 *
 * @package SpireUI\Support
 */
class ComponentStyles
{
    /**
     * Available component sizes.
     *
     * @var array<int, string>
     */
    public const SIZES = ['sm', 'md', 'lg', 'xl', '2xl'];

    /**
     * Available component colors.
     *
     * @var array<int, string>
     */
    public const COLORS = ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'featured'];

    /**
     * Available component variants.
     *
     * @var array<int, string>
     */
    public const VARIANTS = ['solid', 'bordered', 'flat', 'ghost', 'soft', 'link', 'shadow', 'dot'];

    /**
     * Available component radii (standard set).
     *
     * @var array<int, string>
     */
    public const RADII = ['none', 'sm', 'md', 'lg', 'full'];

    /**
     * Extended radii (includes xl and 2xl).
     *
     * @var array<int, string>
     */
    public const RADII_EXTENDED = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

    /**
     * Available component shadows.
     *
     * @var array<int, string>
     */
    public const SHADOWS = ['none', 'sm', 'md', 'lg', 'xl'];

    /**
     * Available padding options.
     *
     * @var array<int, string>
     */
    public const PADDINGS = ['none', 'sm', 'md', 'lg'];

    /**
     * Get color classes for a specific variant and color combination.
     *
     * Returns Tailwind classes for a given variant-color pair. Supports custom
     * overrides for specific combinations.
     *
     * @param string $variant The variant type (solid, bordered, flat, ghost, soft, link, shadow, dot)
     * @param string $color The color name (default, primary, secondary, success, error, warning, info, featured)
     * @param array<string, array<string, string>> $overrides Optional overrides for specific combinations
     * @return string The CSS classes for the color variant
     *
     * @example
     * ```php
     * ComponentStyles::colorClasses('solid', 'primary');
     * // Returns: "bg-primary text-primary-foreground"
     *
     * ComponentStyles::colorClasses('ghost', 'error');
     * // Returns: "bg-transparent hover:bg-error/10 active:bg-error/20 text-error"
     * ```
     */
    public static function colorClasses(string $variant, string $color, array $overrides = []): string
    {
        $variants = array_merge(static::colorVariants(), $overrides);

        return $variants[$variant][$color] ?? $variants['solid']['default'];
    }

    /**
     * Get all color variant mappings.
     *
     * Returns a complete mapping of all variant-color combinations with their
     * corresponding Tailwind classes.
     *
     * @return array<string, array<string, string>> Two-dimensional array [variant][color] => classes
     *
     * @example
     * ```php
     * $variants = ComponentStyles::colorVariants();
     * $solidPrimary = $variants['solid']['primary'];
     * // "bg-primary text-primary-foreground"
     * ```
     */
    public static function colorVariants(): array
    {
        return [
            'solid' => [
                'default' => 'bg-neutral text-white',
                'primary' => 'bg-primary text-primary-foreground',
                'secondary' => 'bg-secondary text-secondary-foreground',
                'success' => 'bg-success text-success-foreground',
                'error' => 'bg-error text-error-foreground',
                'warning' => 'bg-warning text-warning-foreground',
                'info' => 'bg-info text-info-foreground',
            ],
            'bordered' => [
                'default' => 'bg-transparent border-2 border-neutral text-neutral-foreground',
                'primary' => 'bg-transparent border-2 border-primary text-primary',
                'secondary' => 'bg-transparent border-2 border-secondary text-secondary',
                'success' => 'bg-transparent border-2 border-success text-success',
                'error' => 'bg-transparent border-2 border-error text-error',
                'warning' => 'bg-transparent border-2 border-warning text-warning',
                'info' => 'bg-transparent border-2 border-info text-info',
            ],
            'flat' => [
                'default' => 'bg-neutral/30 text-neutral-foreground',
                'primary' => 'bg-primary/30 text-primary',
                'secondary' => 'bg-secondary/30 text-secondary',
                'success' => 'bg-success/30 text-success',
                'error' => 'bg-error/30 text-error',
                'warning' => 'bg-warning/30 text-warning',
                'info' => 'bg-info/30 text-info',
            ],
            'ghost' => [
                'default' => 'bg-transparent hover:bg-hover active:bg-active text-text',
                'primary' => 'bg-transparent hover:bg-primary/10 active:bg-primary/20 text-primary',
                'secondary' => 'bg-transparent hover:bg-secondary/10 active:bg-secondary/20 text-secondary',
                'success' => 'bg-transparent hover:bg-success/10 active:bg-success/20 text-success',
                'error' => 'bg-transparent hover:bg-error/10 active:bg-error/20 text-error',
                'warning' => 'bg-transparent hover:bg-warning/10 active:bg-warning/20 text-warning',
                'info' => 'bg-transparent hover:bg-info/10 active:bg-info/20 text-info',
            ],
            'soft' => [
                'default' => 'bg-hover hover:bg-active text-text',
                'primary' => 'bg-primary/10 hover:bg-primary/20 active:bg-primary/30 text-primary',
                'secondary' => 'bg-secondary/10 hover:bg-secondary/20 active:bg-secondary/30 text-secondary',
                'success' => 'bg-success/10 hover:bg-success/20 active:bg-success/30 text-success',
                'error' => 'bg-error/10 hover:bg-error/20 active:bg-error/30 text-error',
                'warning' => 'bg-warning/10 hover:bg-warning/20 active:bg-warning/30 text-warning',
                'info' => 'bg-info/10 hover:bg-info/20 active:bg-info/30 text-info',
            ],
            'link' => [
                'default' => 'bg-transparent hover:underline text-text',
                'primary' => 'bg-transparent hover:underline text-primary',
                'secondary' => 'bg-transparent hover:underline text-secondary',
                'success' => 'bg-transparent hover:underline text-success',
                'error' => 'bg-transparent hover:underline text-error',
                'warning' => 'bg-transparent hover:underline text-warning',
                'info' => 'bg-transparent hover:underline text-info',
            ],
            'shadow' => [
                'default' => 'bg-neutral text-neutral-foreground shadow-lg',
                'primary' => 'bg-primary text-primary-foreground shadow-lg shadow-primary/30',
                'secondary' => 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30',
                'success' => 'bg-success text-success-foreground shadow-lg shadow-success/30',
                'error' => 'bg-error text-error-foreground shadow-lg shadow-error/30',
                'warning' => 'bg-warning text-warning-foreground shadow-lg shadow-warning/30',
                'info' => 'bg-info text-info-foreground shadow-lg shadow-info/30',
            ],
            'dot' => [
                'default' => 'bg-transparent text-text',
                'primary' => 'bg-transparent text-text',
                'secondary' => 'bg-transparent text-text',
                'success' => 'bg-transparent text-text',
                'error' => 'bg-transparent text-text',
                'warning' => 'bg-transparent text-text',
                'info' => 'bg-transparent text-text',
            ],
        ];
    }

    /**
     * Get ring (focus outline) color classes.
     *
     * Returns Tailwind ring color classes for focus states.
     *
     * @param string $color Color name (default, neutral, primary, secondary, success, error, warning, info)
     * @return string Ring color class (e.g., "ring-primary")
     *
     * @example
     * ```php
     * ComponentStyles::ringColorClasses('primary');
     * // Returns: "ring-primary"
     * ```
     */
    public static function ringColorClasses(string $color): string
    {
        $rings = [
            'default' => 'ring-neutral',
            'neutral' => 'ring-neutral',
            'primary' => 'ring-primary',
            'secondary' => 'ring-secondary',
            'success' => 'ring-success',
            'error' => 'ring-error',
            'warning' => 'ring-warning',
            'info' => 'ring-info',
        ];

        return $rings[$color] ?? $rings['default'];
    }

    /**
     * Get size classes for a specific component type.
     *
     * Returns Tailwind classes for component sizing. Different component types
     * (default, badge, spinner) have different sizing scales.
     *
     * @param string $size The size (sm, md, lg, xl, 2xl)
     * @param string $type The component type (default, badge, spinner)
     * @return string Size classes
     *
     * @example
     * ```php
     * ComponentStyles::sizeClasses('md', 'default');
     * // Returns: "w-10 h-10 text-sm"
     *
     * ComponentStyles::sizeClasses('md', 'badge');
     * // Returns: "px-2.5 py-1 text-sm gap-1.5"
     * ```
     */
    public static function sizeClasses(string $size, string $type = 'default'): string
    {
        $sizes = static::sizeVariants()[$type] ?? static::sizeVariants()['default'];

        return $sizes[$size] ?? $sizes['md'];
    }

    /**
     * Get all size variant mappings for different component types.
     *
     * @return array<string, array<string, string>> Nested array [type][size] => classes
     *
     * @example
     * ```php
     * $sizes = ComponentStyles::sizeVariants();
     * $badgeMd = $sizes['badge']['md'];
     * // "px-2.5 py-1 text-sm gap-1.5"
     * ```
     */
    public static function sizeVariants(): array
    {
        return [
            'default' => [
                'sm' => 'w-8 h-8 text-xs',
                'md' => 'w-10 h-10 text-sm',
                'lg' => 'w-12 h-12 text-base',
                'xl' => 'w-14 h-14 text-lg',
                '2xl' => 'w-16 h-16 text-xl',
            ],
            'badge' => [
                'sm' => 'px-2 py-0.5 text-xs gap-1',
                'md' => 'px-2.5 py-1 text-sm gap-1.5',
                'lg' => 'px-3 py-1.5 text-base gap-2',
            ],
            'spinner' => [
                'sm' => 'h-3 w-3',
                'md' => 'h-4 w-4',
                'lg' => 'h-5 w-5',
            ],
        ];
    }

    /**
     * Get border-radius classes.
     *
     * @param string $radius Radius size (none, sm, md, lg, xl, 2xl, full)
     * @param bool $extended Include xl and 2xl variants
     * @return string Radius class
     *
     * @example
     * ```php
     * ComponentStyles::radiusClasses('md');
     * // Returns: "rounded-md"
     *
     * ComponentStyles::radiusClasses('xl', true);
     * // Returns: "rounded-xl"
     * ```
     */
    public static function radiusClasses(string $radius, bool $extended = false): string
    {
        $radii = static::radiusVariants($extended);

        return $radii[$radius] ?? $radii['md'];
    }

    /**
     * Get all radius variant mappings.
     *
     * @param bool $extended Include xl and 2xl variants
     * @return array<string, string> Array [radius] => class
     *
     * @example
     * ```php
     * $radii = ComponentStyles::radiusVariants();
     * // ['none' => '', 'sm' => 'rounded-sm', 'md' => 'rounded-md', ...]
     * ```
     */
    public static function radiusVariants(bool $extended = false): array
    {
        $base = [
            'none' => '',
            'sm' => 'rounded-sm',
            'md' => 'rounded-md',
            'lg' => 'rounded-lg',
            'full' => 'rounded-full',
        ];

        if ($extended) {
            return [
                'none' => '',
                'sm' => 'rounded-sm',
                'md' => 'rounded-md',
                'lg' => 'rounded-lg',
                'xl' => 'rounded-xl',
                '2xl' => 'rounded-2xl',
                'full' => 'rounded-full',
            ];
        }

        return $base;
    }

    /**
     * Get box-shadow classes.
     *
     * @param string $shadow Shadow size (none, sm, md, lg, xl)
     * @return string Shadow class
     *
     * @example
     * ```php
     * ComponentStyles::shadowClasses('sm');
     * // Returns: "shadow-sm"
     * ```
     */
    public static function shadowClasses(string $shadow): string
    {
        $shadows = static::shadowVariants();

        return $shadows[$shadow] ?? $shadows['md'];
    }

    /**
     * Get all shadow variant mappings.
     *
     * @return array<string, string> Array [shadow] => class
     *
     * @example
     * ```php
     * $shadows = ComponentStyles::shadowVariants();
     * // ['none' => '', 'sm' => 'shadow-sm', 'md' => 'shadow', ...]
     * ```
     */
    public static function shadowVariants(): array
    {
        return [
            'none' => '',
            'sm' => 'shadow-sm',
            'md' => 'shadow',
            'lg' => 'shadow-md',
            'xl' => 'shadow-lg',
        ];
    }

    /**
     * Get padding classes.
     *
     * @param string $padding Padding size (none, sm, md, lg)
     * @return string Padding class
     *
     * @example
     * ```php
     * ComponentStyles::paddingClasses('md');
     * // Returns: "p-4"
     * ```
     */
    public static function paddingClasses(string $padding): string
    {
        $paddings = static::paddingVariants();

        return $paddings[$padding] ?? $paddings['md'];
    }

    /**
     * Get all padding variant mappings.
     *
     * @return array<string, string> Array [padding] => class
     *
     * @example
     * ```php
     * $paddings = ComponentStyles::paddingVariants();
     * // ['none' => '', 'sm' => 'p-3', 'md' => 'p-4', 'lg' => 'p-6']
     * ```
     */
    public static function paddingVariants(): array
    {
        return [
            'none' => '',
            'sm' => 'p-3',
            'md' => 'p-4',
            'lg' => 'p-6',
        ];
    }

    /**
     * Build a class string from an array, filtering out empty values.
     *
     * @param array<int|string, string> $classes Array of class names
     * @return string Space-separated class string
     *
     * @example
     * ```php
     * ComponentStyles::buildClassString(['bg-primary', '', 'text-white', null]);
     * // Returns: "bg-primary text-white"
     * ```
     */
    public static function buildClassString(array $classes): string
    {
        return implode(' ', array_filter($classes));
    }

    /**
     * Generate group-aware ring classes for avatar groups.
     *
     * Creates complex Tailwind selectors for avatars inside avatar groups with borders.
     * Uses data attribute selectors to apply ring classes only within bordered groups.
     *
     * @param array<int, string> $colors Array of color names to generate classes for
     * @return array<int, string> Array of Tailwind classes with complex selectors
     *
     * @example
     * ```php
     * ComponentStyles::avatarGroupRingClasses(['primary', 'secondary']);
     * // Returns classes like:
     * // "[div[data-spire-avatar-group-bordered]_&]:ring-2"
     * // "[div[data-spire-avatar-group-bordered]_&[data-spire-color=primary]]:ring-primary"
     * ```
     */
    public static function avatarGroupRingClasses(array $colors = ['default', 'neutral', 'primary', 'secondary', 'success', 'error', 'warning', 'info']): array
    {
        $classes = [
            '[div[data-spire-avatar-group-bordered]_&]:ring-2',
            '[div[data-spire-avatar-group-bordered]_&]:ring-offset-2',
        ];

        foreach ($colors as $color) {
            $ringClass = static::ringColorClasses($color);
            $classes[] = "[div[data-spire-avatar-group-bordered]_&[data-spire-color={$color}]]:{$ringClass}";
        }

        return $classes;
    }

    /**
     * Generate button group radius and border classes.
     *
     * Creates complex Tailwind selectors for buttons inside button groups.
     * Handles both horizontal and vertical button groups with proper radius
     * and border adjustments.
     *
     * @param string $radius Radius size (none, sm, md, lg, full)
     * @param string $variant Button variant (affects border removal logic)
     * @return array<int, string> Array of Tailwind classes with complex selectors
     *
     * @example
     * ```php
     * ComponentStyles::buttonGroupClasses('md', 'solid');
     * // Returns classes for:
     * // - Removing middle button radius
     * // - Applying radius to first/last buttons
     * // - Removing duplicate borders between buttons
     * ```
     */
    public static function buttonGroupClasses(string $radius, string $variant): array
    {
        $radiusSuffix = $radius === 'none' ? '' : "-{$radius}";

        $classes = [
            '[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:not(:first-child):not(:last-child)]:rounded-none',
            "[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:first-child]:rounded-s{$radiusSuffix}",
            '[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:first-child]:rounded-e-none',
            "[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:last-child]:rounded-e{$radiusSuffix}",
            '[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:last-child]:rounded-s-none',
            '[div[data-spire-button-group-vertical]_&:not(:first-child):not(:last-child)]:rounded-none',
            "[div[data-spire-button-group-vertical]_&:first-child]:rounded-t{$radiusSuffix}",
            '[div[data-spire-button-group-vertical]_&:first-child]:rounded-b-none',
            "[div[data-spire-button-group-vertical]_&:last-child]:rounded-b{$radiusSuffix}",
            '[div[data-spire-button-group-vertical]_&:last-child]:rounded-t-none',
        ];

        if ($variant === 'solid' || $variant === 'bordered') {
            $classes[] = '[div[data-spire-button-group]:not([data-spire-button-group-vertical])_&:not(:first-child)]:border-s-0';
            $classes[] = '[div[data-spire-button-group-vertical]_&:not(:first-child)]:border-t-0';
        }

        return $classes;
    }

    /**
     * Get the base class for the input's outer container.
     *
     * @return string Base class name
     */
    public static function inputContainerBase(): string
    {
        return 'spire-input-container';
    }

    /**
     * Get the base class for the input's inner box.
     *
     * @return string Base class name
     */
    public static function inputBoxBase(): string
    {
        return 'spire-input-box';
    }

    /**
     * Get the variant class for the input's inner box.
     *
     * @param string $variant Variant type (bordered, flat)
     * @return string Variant class name
     */
    public static function inputBoxVariant(string $variant): string
    {
        $variants = [
            'bordered' => 'spire-input-box--bordered',
            'flat' => 'spire-input-box--flat',
        ];

        return $variants[$variant] ?? $variants['bordered'];
    }

    /**
     * Get the size class for the input's inner box.
     *
     * @param string $size Size (sm, md, lg)
     * @return string Size class name
     */
    public static function inputBoxSize(string $size): string
    {
        $sizes = [
            'sm' => 'spire-input-box--sm',
            'md' => 'spire-input-box--md',
            'lg' => 'spire-input-box--lg',
        ];

        return $sizes[$size] ?? $sizes['md'];
    }

    /**
     * Get the base class for the <input> element.
     *
     * @return string Base class name
     */
    public static function inputBase(): string
    {
        return 'spire-input';
    }

    /**
     * Get the size class for shorthand icons in the input.
     *
     * @param string $size Size (sm, md, lg)
     * @return string Icon size class name
     */
    public static function inputIconSize(string $size): string
    {
        $sizes = [
            'sm' => 'spire-input-icon--sm',
            'md' => 'spire-input-icon--md',
            'lg' => 'spire-input-icon--lg',
        ];

        return $sizes[$size] ?? $sizes['md'];
    }

    /**
     * Get the base class for the dropdown content panel.
     *
     * @return string Base class name
     */
    public static function dropdownContentBase(): string
    {
        return 'spire-dropdown-content';
    }

    /**
     * Get the width class for the dropdown content panel.
     *
     * @param string $width Width size (sm, md, lg, xl, auto)
     * @return string Width class name
     */
    public static function dropdownContentWidth(string $width): string
    {
        $widths = [
            'sm' => 'spire-dropdown-content--sm',
            'md' => 'spire-dropdown-content--md',
            'lg' => 'spire-dropdown-content--lg',
            'xl' => 'spire-dropdown-content--xl',
            'auto' => 'spire-dropdown-content--auto',
        ];

        return $widths[$width] ?? $widths['md'];
    }

    /**
     * Get the base class for a dropdown item.
     *
     * @return string Base class name
     */
    public static function dropdownItemBase(): string
    {
        return 'spire-dropdown-item';
    }

    /**
     * Get the state class for a dropdown item.
     *
     * @param bool $disabled Whether the item is disabled
     * @param bool $destructive Whether the item is destructive (e.g., delete action)
     * @return string State class name
     */
    public static function dropdownItemState(bool $disabled, bool $destructive): string
    {
        if ($disabled) {
            return 'spire-dropdown-item--disabled';
        }
        if ($destructive) {
            return 'spire-dropdown-item--destructive';
        }

        return 'spire-dropdown-item--normal';
    }

    /**
     * Get the base class for a dropdown label.
     *
     * @return string Base class name
     */
    public static function dropdownLabelBase(): string
    {
        return 'spire-dropdown-label';
    }

    /**
     * Get the base class for a dropdown separator.
     *
     * @return string Base class name
     */
    public static function dropdownSeparatorBase(): string
    {
        return 'spire-dropdown-separator';
    }
}
