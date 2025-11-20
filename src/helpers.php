<?php

/**
 * Global helper functions for Spire UI.
 *
 * This file contains global helper functions that are available throughout
 * the application. All functions are defined within existence checks to
 * prevent conflicts with user-defined functions.
 *
 * @package SpireUI
 */

if (! function_exists('spire_default')) {
    /**
     * Get a default value for a Spire UI component property.
     *
     * Checks component-specific config first, then falls back to global defaults.
     * This allows per-component customization while providing sensible defaults.
     *
     * Priority order:
     * 1. Component-specific: `spire-ui.defaults.{component}.{property}`
     * 2. Global default: `spire-ui.defaults.{property}`
     * 3. Provided fallback value
     *
     * @param string $component The component name (e.g., 'input', 'button', 'select')
     * @param string $property The property name (e.g., 'size', 'radius', 'variant')
     * @param mixed $fallback The fallback value if no config exists
     * @return mixed The resolved configuration value
     *
     * @example Component-specific default:
     * ```php
     * // config/spire-ui.php:
     * 'defaults' => [
     *     'button' => ['size' => 'lg'],
     *     'size' => 'md',
     * ]
     *
     * spire_default('button', 'size', 'sm'); // Returns: 'lg' (component-specific)
     * spire_default('input', 'size', 'sm');  // Returns: 'md' (global default)
     * spire_default('input', 'color', 'primary'); // Returns: 'primary' (fallback)
     * ```
     *
     * @example In Blade components:
     * ```php
     * @props([
     *     'size' => spire_default('button', 'size', 'md'),
     *     'radius' => spire_default('button', 'radius', 'md'),
     * ])
     * ```
     */
    function spire_default(string $component, string $property, mixed $fallback = null): mixed
    {
        $value = config("spire-ui.defaults.{$component}.{$property}");

        if ($value !== null) {
            return $value;
        }

        $value = config("spire-ui.defaults.{$property}");

        return $value ?? $fallback;
    }
}

if (! function_exists('spire_phone_countries')) {
    /**
     * Get the phone input country data.
     *
     * Returns an array of country calling codes, flags, and metadata
     * used by the phone-input component.
     *
     * Data includes:
     * - Country codes (ISO 3166-1 alpha-2)
     * - Country names
     * - Calling codes (e.g., +1, +44, +33)
     * - Flag emojis
     *
     * @return array<int, array{code: string, name: string, dialCode: string, flag: string}>
     *
     * @example
     * ```php
     * $countries = spire_phone_countries();
     * // [
     * //   ['code' => 'US', 'name' => 'United States', 'dialCode' => '+1', 'flag' => '🇺🇸'],
     * //   ['code' => 'GB', 'name' => 'United Kingdom', 'dialCode' => '+44', 'flag' => '🇬🇧'],
     * //   ...
     * // ]
     * ```
     *
     * @example In Blade components:
     * ```blade
     * @foreach(spire_phone_countries() as $country)
     *     <option value="{{ $country['dialCode'] }}">
     *         {{ $country['flag'] }} {{ $country['name'] }} ({{ $country['dialCode'] }})
     *     </option>
     * @endforeach
     * ```
     */
    function spire_phone_countries(): array
    {
        return include __DIR__ . '/../resources/views/components/phone-input/country-data.php';
    }
}

if (! function_exists('spire_is_active')) {
    /**
     * Check if a URL or route should be marked as active.
     *
     * This helper function determines if a navigation item should display
     * an active state based on the current request URL or route.
     *
     * Supports multiple matching strategies:
     * - Exact URL path matching
     * - Named route matching
     * - Wildcard pattern matching (e.g., 'users/*')
     * - Route pattern matching (e.g., 'admin.*')
     *
     * @param string|null $href URL to check against current request
     * @param string|null $route Named route to check
     * @param string|array|null $patterns Custom URL or route patterns
     * @param string $match Matching strategy: 'exact' or 'starts-with'
     * @return bool True if the item should be marked as active
     *
     * @example Basic URL matching:
     * ```php
     * spire_is_active(href: '/dashboard') // true when on /dashboard
     * spire_is_active(href: '/users')     // false when on /dashboard
     * ```
     *
     * @example Named route matching:
     * ```php
     * spire_is_active(route: 'dashboard')     // true when route name is 'dashboard'
     * spire_is_active(route: 'users.index')   // true when on users.index route
     * ```
     *
     * @example Wildcard pattern matching:
     * ```php
     * spire_is_active(patterns: 'users/*')                    // matches /users/123, /users/edit
     * spire_is_active(patterns: ['users/*', 'profile/*'])     // matches either pattern
     * spire_is_active(patterns: 'admin.*')                    // matches admin.* routes
     * ```
     *
     * @example Starts-with matching:
     * ```php
     * spire_is_active(href: '/users', match: 'starts-with')  // matches /users, /users/123
     * ```
     *
     * @example In Blade components:
     * ```blade
     * <x-spire::sidebar.item
     *     href="/users"
     *     :active="spire_is_active(href: '/users', match: 'starts-with')"
     * />
     * ```
     */
    function spire_is_active(
        ?string $href = null,
        ?string $route = null,
        string|array|null $patterns = null,
        string $match = 'exact'
    ): bool {
        // Custom patterns have priority
        if ($patterns !== null) {
            $patterns = is_array($patterns) ? $patterns : [$patterns];

            // Check if patterns are route names (contain dot) or URL paths
            $firstPattern = $patterns[0] ?? '';
            if (str_contains($firstPattern, '.') || str_contains($firstPattern, '*')) {
                // Try route pattern matching first
                try {
                    if (request()->routeIs(...$patterns)) {
                        return true;
                    }
                } catch (\Exception $e) {
                    // Fall through to URL pattern matching
                }
            }

            // URL pattern matching
            return request()->is(...$patterns);
        }

        // Named route check
        if ($route !== null) {
            // Direct route name match
            if (request()->routeIs($route)) {
                return true;
            }

            // Also check if route URL matches current URL
            try {
                $routeUrl = route($route, [], false);
                return request()->is(ltrim($routeUrl, '/'));
            } catch (\Exception $e) {
                // Route doesn't exist or requires parameters
                return false;
            }
        }

        // URL href check
        if ($href !== null) {
            // Skip external URLs
            if (str_starts_with($href, 'http') || str_starts_with($href, '//')) {
                return false;
            }

            // Skip hash links
            if (str_starts_with($href, '#')) {
                return false;
            }

            // Extract path from href (ignore query string and hash)
            $path = ltrim(parse_url($href, PHP_URL_PATH) ?? '', '/');

            // Empty path check
            if ($path === '') {
                return false;
            }

            if ($match === 'exact') {
                return request()->is($path);
            } elseif ($match === 'starts-with') {
                return request()->is($path, "$path/*");
            }
        }

        return false;
    }
}
