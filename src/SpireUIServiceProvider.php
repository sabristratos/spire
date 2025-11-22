<?php

namespace SpireUI;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use SpireUI\Http\Controllers\AssetController;
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
 * - Registers asset routes and Blade directives
 *
 * Configuration:
 * - Component prefix: Set via 'spire-ui.prefix' config (default: 'spire')
 * - Pagination: Auto-register via 'spire-ui.pagination.register_default' (default: true)
 * - Asset route: Set via 'spire-ui.asset_route' config (default: 'spire-ui')
 *
 * Publishing tags:
 * - `spire-ui-config`: Configuration file
 * - `spire-ui-views`: Component views
 * - `spire-ui-lang`: Translation files
 * - `spire-ui-css`: Theme CSS file
 * - `spire-ui-layouts`: Layout components
 *
 * Blade Directives:
 * - `@spireStyles`: Outputs the CSS link tag
 * - `@spireScripts`: Outputs the JS script tags with initialization
 *
 * @example Usage in layout:
 * ```blade
 * <head>
 *
 *     @spireStyles
 * </head>
 * <body>
 *     ...
 *
 *     @spireScripts
 * </body>
 * ```
 */
class SpireUIServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/spire-ui.php',
            'spire-ui'
        );

        require_once __DIR__.'/helpers.php';
    }

    public function boot(): void
    {
        $prefix = config('spire-ui.prefix', 'spire');

        if ($this->app->runningInConsole()) {
            $this->commands([
                Console\InstallCommand::class,
            ]);
        }

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

        $this->registerAssetRoutes();
        $this->registerBladeDirectives();
        $this->registerBladeComponents();
        $this->registerLivewireSynthesizers();
        $this->registerPaginationViews();
    }

    protected function registerAssetRoutes(): void
    {
        Route::get(
            config('spire-ui.asset_route', 'spire-ui').'/{file}',
            AssetController::class
        )->name('spire-ui.asset');
    }

    protected function registerBladeDirectives(): void
    {
        Blade::directive('spireStyles', function () {
            return '<?php echo \'<link rel="stylesheet" href="\' . route(\'spire-ui.asset\', \'spire-ui.css\') . \'">\'; ?>';
        });

        Blade::directive('spireScripts', function () {
            return '<?php echo \'<script src="\' . route(\'spire-ui.asset\', \'spire-ui.iife.js\') . \'"></script>
<script>SpireUI.initializeSpireUI();</script>\'; ?>';
        });
    }

    protected function registerPaginationViews(): void
    {
        if (config('spire-ui.pagination.register_default', true)) {
            $prefix = config('spire-ui.prefix', 'spire');

            Paginator::defaultView("{$prefix}::components.pagination.default");
            Paginator::defaultSimpleView("{$prefix}::components.pagination.simple");
        }
    }

    protected function registerLivewireSynthesizers(): void
    {
        Livewire::propertySynthesizer(DateRangePresetSynth::class);
        Livewire::propertySynthesizer(DateRangeSynth::class);
    }

    protected function registerBladeComponents(): void
    {
        $this->loadViewComponentsAs(
            config('spire-ui.prefix', 'spire'),
            []
        );
    }
}
