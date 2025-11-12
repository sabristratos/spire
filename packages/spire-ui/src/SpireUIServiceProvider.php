<?php

namespace SpireUI;

use Illuminate\Support\ServiceProvider;

class SpireUIServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/spire-ui.php',
            'spire-ui'
        );
    }

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

        $this->registerBladeComponents();
    }

    protected function registerBladeComponents(): void
    {
        $this->loadViewComponentsAs(
            config('spire-ui.prefix', 'spire'),
            []
        );
    }
}
