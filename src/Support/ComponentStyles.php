<?php

namespace SpireUI\Support;

class ComponentStyles
{
    /**
     * Available component sizes.
     */
    public const SIZES = ['sm', 'md', 'lg', 'xl', '2xl'];

    /**
     * Available component colors.
     */
    public const COLORS = ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'featured'];

    /**
     * Available component variants.
     */
    public const VARIANTS = ['solid', 'bordered', 'flat', 'ghost', 'soft', 'link', 'shadow', 'dot'];

    /**
     * Available component radii.
     */
    public const RADII = ['none', 'sm', 'md', 'lg', 'full'];

    /**
     * Extended radii (includes xl and 2xl).
     */
    public const RADII_EXTENDED = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

    /**
     * Available component shadows.
     */
    public const SHADOWS = ['none', 'sm', 'md', 'lg', 'xl'];

    /**
     * Available padding options.
     */
    public const PADDINGS = ['none', 'sm', 'md', 'lg'];

    /**
     * Get color classes for a specific variant and color.
     *
     * @param  string  $variant  The variant type (solid, bordered, flat, ghost, soft, link, shadow, dot)
     * @param  string  $color  The color name (default, primary, secondary, success, error, warning, info)
     * @param  array  $overrides  Optional overrides for specific color/variant combinations
     * @return string The CSS classes for the color variant
     */
    public static function colorClasses(string $variant, string $color, array $overrides = []): string
    {
        $variants = array_merge(static::colorVariants(), $overrides);

        return $variants[$variant][$color] ?? $variants['solid']['default'];
    }

    /**
     * Get all color variant mappings.
     *
     * @return array<string, array<string, string>>
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
     * Get ring (border) color classes.
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
     * Get size classes for a specific size variant.
     *
     * @param  string  $size  The size (sm, md, lg, xl, 2xl)
     * @param  string  $type  The type (default, avatar, badge, spinner)
     */
    public static function sizeClasses(string $size, string $type = 'default'): string
    {
        $sizes = static::sizeVariants()[$type] ?? static::sizeVariants()['default'];

        return $sizes[$size] ?? $sizes['md'];
    }

    /**
     * Get all size variant mappings.
     *
     * @return array<string, array<string, string>>
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
     * Get radius classes.
     *
     * @param  bool  $extended  Include xl and 2xl variants
     */
    public static function radiusClasses(string $radius, bool $extended = false): string
    {
        $radii = static::radiusVariants($extended);

        return $radii[$radius] ?? $radii['md'];
    }

    /**
     * Get all radius variant mappings.
     *
     * @return array<string, string>
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
     * Get shadow classes.
     */
    public static function shadowClasses(string $shadow): string
    {
        $shadows = static::shadowVariants();

        return $shadows[$shadow] ?? $shadows['md'];
    }

    /**
     * Get all shadow variant mappings.
     *
     * @return array<string, string>
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
     */
    public static function paddingClasses(string $padding): string
    {
        $paddings = static::paddingVariants();

        return $paddings[$padding] ?? $paddings['md'];
    }

    /**
     * Get all padding variant mappings.
     *
     * @return array<string, string>
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
     */
    public static function buildClassString(array $classes): string
    {
        return implode(' ', array_filter($classes));
    }

    /**
     * Generate group-aware ring classes for avatar groups.
     *
     * @param  array  $colors  Array of color names to generate classes for
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
     */
    public static function inputContainerBase(): string
    {
        return 'spire-input-container';
    }

    /**
     * Get the base class for the input's inner box.
     */
    public static function inputBoxBase(): string
    {
        return 'spire-input-box';
    }

    /**
     * Get the variant class for the input's inner box.
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
     */
    public static function inputBase(): string
    {
        return 'spire-input';
    }

    /**
     * Get the size class for shorthand icons in the input.
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
     */
    public static function dropdownContentBase(): string
    {
        return 'spire-dropdown-content';
    }

    /**
     * Get the width class for the dropdown content panel.
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
     */
    public static function dropdownItemBase(): string
    {
        return 'spire-dropdown-item';
    }

    /**
     * Get the state class for a dropdown item.
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
     */
    public static function dropdownLabelBase(): string
    {
        return 'spire-dropdown-label';
    }

    /**
     * Get the base class for a dropdown separator.
     */
    public static function dropdownSeparatorBase(): string
    {
        return 'spire-dropdown-separator';
    }
}
