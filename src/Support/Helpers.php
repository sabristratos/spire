<?php

namespace SpireUI\Support;

/**
 * Helper functions for Spire UI component styling.
 *
 * These functions provide convenient access to ComponentStyles methods
 * for use in Blade templates and PHP code. All functions are aliased
 * to avoid conflicts with existing helpers.
 *
 * @package SpireUI\Support
 */

if (! function_exists('spire_color_classes')) {
    /**
     * Get color classes for a specific variant and color combination.
     *
     * Convenience wrapper for ComponentStyles::colorClasses().
     *
     * @param string $variant The variant type (solid, bordered, flat, ghost, soft, link, shadow, dot)
     * @param string $color The color name (default, primary, secondary, success, error, warning, info, featured)
     * @param array<string, array<string, string>> $overrides Optional overrides for specific combinations
     * @return string The CSS classes for the color variant
     *
     * @example
     * ```php
     * spire_color_classes('solid', 'primary');
     * // Returns: "bg-primary text-primary-foreground"
     * ```
     *
     * @see ComponentStyles::colorClasses()
     */
    function spire_color_classes(string $variant, string $color, array $overrides = []): string
    {
        return ComponentStyles::colorClasses($variant, $color, $overrides);
    }
}

if (! function_exists('spire_size_classes')) {
    /**
     * Get size classes for a specific component type.
     *
     * Convenience wrapper for ComponentStyles::sizeClasses().
     *
     * @param string $size The size (sm, md, lg, xl, 2xl)
     * @param string $type The component type (default, badge, spinner)
     * @return string Size classes
     *
     * @example
     * ```php
     * spire_size_classes('md', 'badge');
     * // Returns: "px-2.5 py-1 text-sm gap-1.5"
     * ```
     *
     * @see ComponentStyles::sizeClasses()
     */
    function spire_size_classes(string $size, string $type = 'default'): string
    {
        return ComponentStyles::sizeClasses($size, $type);
    }
}

if (! function_exists('spire_radius_classes')) {
    /**
     * Get border-radius classes.
     *
     * Convenience wrapper for ComponentStyles::radiusClasses().
     *
     * @param string $radius Radius size (none, sm, md, lg, xl, 2xl, full)
     * @param bool $extended Include xl and 2xl variants
     * @return string Radius class
     *
     * @example
     * ```php
     * spire_radius_classes('md');
     * // Returns: "rounded-md"
     * ```
     *
     * @see ComponentStyles::radiusClasses()
     */
    function spire_radius_classes(string $radius, bool $extended = false): string
    {
        return ComponentStyles::radiusClasses($radius, $extended);
    }
}

if (! function_exists('spire_build_classes')) {
    /**
     * Build a class string from an array, filtering out empty values.
     *
     * Convenience wrapper for ComponentStyles::buildClassString().
     *
     * @param array<int|string, string> $classes Array of class names
     * @return string Space-separated class string
     *
     * @example
     * ```php
     * spire_build_classes(['bg-primary', '', 'text-white', null]);
     * // Returns: "bg-primary text-white"
     * ```
     *
     * @see ComponentStyles::buildClassString()
     */
    function spire_build_classes(array $classes): string
    {
        return ComponentStyles::buildClassString($classes);
    }
}
