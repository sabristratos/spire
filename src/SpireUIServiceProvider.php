<?php

namespace SpireUI;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use SpireUI\Support\Synthesizers\DateRangePresetSynth;
use SpireUI\Support\Synthesizers\DateRangeSynth;

/**
 * Spire UI Laravel Service Provider.
 *
 * Registers and bootstraps the Spire UI component library:
 * - Loads configuration files
 * - Registers Blade components with configurable prefix
 * - Loads translations
 * - Publishes assets (config, views, lang, CSS, layouts)
 * - Registers Livewire synthesizers for custom types
 * - Configures default pagination views
 *
 * Configuration:
 * - Component prefix: Set via 'spire-ui.prefix' config (default: 'spire')
 * - Pagination: Auto-register via 'spire-ui.pagination.register_default' (default: true)
 *
 * Publishing tags:
 * - `spire-ui-config`: Configuration file
 * - `spire-ui-views`: Component views
 * - `spire-ui-lang`: Translation files
 * - `spire-ui-css`: Theme CSS file
 * - `spire-ui-layouts`: Layout components
 *
 * @example Publishing assets:
 * ```bash
 * php artisan vendor:publish --tag=spire-ui-config
 * php artisan vendor:publish --tag=spire-ui-views
 * ```
 *
 * @package SpireUI
 */
class SpireUIServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * Merges package configuration and loads helper functions.
     *
     * @return void
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/spire-ui.php',
            'spire-ui'
        );

        require_once __DIR__.'/helpers.php';
    }

    /**
     * Bootstrap services.
     *
     * Loads views, translations, registers components, and publishes assets.
     *
     * @return void
     */
    public function boot(): void
    {
        $prefix = config('spire-ui.prefix', 'spire');

        $this->loadViewsFrom(__DIR__.'/../resources/views', $prefix);

        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', $prefix);

        $this->publishes([
            __DIR__.'/../config/spire-ui.php' => config_path('spire-ui.php'),
        ], 'spire-ui-config');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/spire-ui'),
        ], 'spire-ui-views');

        $this->publishes([
            __DIR__.'/../resources/lang' => lang_path('vendor/spire-ui'),
        ], 'spire-ui-lang');

        $this->publishes([
            __DIR__.'/../resources/css/theme.css' => resource_path('css/spire-ui-theme.css'),
        ], 'spire-ui-css');

        $this->publishes([
            __DIR__.'/../resources/views/layouts' => resource_path('views/components/layouts'),
        ], 'spire-ui-layouts');

        $this->registerBladeComponents();
        $this->registerLivewireSynthesizers();
        $this->registerPaginationViews();
    }

    /**
     * Register default pagination views with Laravel.
     *
     * Sets Spire UI pagination components as default paginator views
     * if enabled in configuration.
     *
     * @return void
     */
    protected function registerPaginationViews(): void
    {
        if (config('spire-ui.pagination.register_default', true)) {
            $prefix = config('spire-ui.prefix', 'spire');

            Paginator::defaultView("{$prefix}::components.pagination.default");
            Paginator::defaultSimpleView("{$prefix}::components.pagination.simple");
        }
    }

    /**
     * Register Livewire property synthesizers.
     *
     * Registers custom synthesizers for serializing/deserializing
     * complex Spire UI types in Livewire components:
     * - DateRangePresetSynth: For DateRangePreset enum
     * - DateRangeSynth: For DateRange value objects
     *
     * @return void
     */
    protected function registerLivewireSynthesizers(): void
    {
        Livewire::propertySynthesizer(DateRangePresetSynth::class);
        Livewire::propertySynthesizer(DateRangeSynth::class);
    }

    /**
     * Register anonymous Blade components.
     *
     * Registers all Blade components in the package's views directory
     * with the configured prefix (default: 'spire').
     *
     * Components are used as: `<x-spire::button />`, `<x-spire::input />`
     *
     * @return void
     */
    protected function registerBladeComponents(): void
    {
        $this->loadViewComponentsAs(
            config('spire-ui.prefix', 'spire'),
            []
        );
    }
}
