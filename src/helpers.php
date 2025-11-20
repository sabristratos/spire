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
