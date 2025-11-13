<?php

namespace SpireUI\Support;

if (! function_exists('spire_color_classes')) {
    /**
     * Get color classes for a specific variant and color.
     */
    function spire_color_classes(string $variant, string $color, array $overrides = []): string
    {
        return ComponentStyles::colorClasses($variant, $color, $overrides);
    }
}

if (! function_exists('spire_size_classes')) {
    /**
     * Get size classes for a specific size variant.
     */
    function spire_size_classes(string $size, string $type = 'default'): string
    {
        return ComponentStyles::sizeClasses($size, $type);
    }
}

if (! function_exists('spire_radius_classes')) {
    /**
     * Get radius classes.
     */
    function spire_radius_classes(string $radius, bool $extended = false): string
    {
        return ComponentStyles::radiusClasses($radius, $extended);
    }
}

if (! function_exists('spire_build_classes')) {
    /**
     * Build a class string from an array, filtering out empty values.
     */
    function spire_build_classes(array $classes): string
    {
        return ComponentStyles::buildClassString($classes);
    }
}
