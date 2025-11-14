<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }} - Theme Demo</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <script>
        (function() {
            const theme = localStorage.getItem('theme') ||
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>

    @livewireStyles
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-body text-text antialiased" x-data="themeManager()" x-init="init()">

    @livewire('component-demo')

    {{-- Floating Theme Toggle Button --}}
    <div class="fixed bottom-6 right-6 z-50">
        <x-spire::button
            @click="toggleTheme()"
            icon-only
            color="primary"
            size="lg"
            radius="full"
            x-bind:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            class="shadow-lg hover:shadow-xl transition-shadow"
        >
            <x-spire::icon name="sun" class="w-6 h-6" x-show="!isDark" x-cloak />
            <x-spire::icon name="moon-02" class="w-6 h-6" x-show="isDark" x-cloak />
        </x-spire::button>
    </div>

    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('themeManager', () => ({
                isDark: false,

                init() {
                    this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

                    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                        if (!localStorage.getItem('theme')) {
                            this.setTheme(e.matches ? 'dark' : 'light');
                        }
                    });
                },

                toggleTheme() {
                    this.setTheme(this.isDark ? 'light' : 'dark');
                },

                setTheme(theme) {
                    this.isDark = theme === 'dark';
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('theme', theme);
                }
            }));
        });
    </script>

    @livewireScripts
</body>
</html>
