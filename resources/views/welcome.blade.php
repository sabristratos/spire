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


<div class="flex items-center justify-center p-6 h-screen max-w-7xl mx-auto">
    <x-spire::input icon="user" placeholder="Search..." clearable class="w-xl">
    </x-spire::input>
    <div class="flex h-60 w-full items-start justify-center p-10">

        {{--
          This is the main dropdown component.
          We assume the files are in a 'dropdown' folder, e.g.:
          - components/dropdown/index.blade.php -> <x-spire::dropdown>
          - components/dropdown/trigger.blade.php -> <x-spire::dropdown.trigger>
          - components/dropdown/content.blade.php -> <x-spire::dropdown.content>
          - etc.
        --}}
        <x-spire::dropdown>

            {{-- 1. The Trigger --}}
            <x-spire::dropdown.trigger>
                {{-- We use the Button component as the trigger --}}
                <x-spire::button color="primary">
                    Open Menu
                    <x-slot:trailing>
                        <x-spire::icon name="chevron-down" class="w-4 h-4" />
                    </x-slot:trailing>
                </x-spire::button>
            </x-spire::dropdown.trigger>

            {{-- 2. The Content --}}
            <x-spire::dropdown.content width="md">

                {{-- Label Item --}}
                <x-spire::dropdown.label>
                    Account
                </x-spire::dropdown.label>

                {{-- Standard Item --}}
                <x-spire::dropdown.item icon="user-01">
                    Profile
                </x-spire::dropdown.item>

                {{-- Link (href) Item --}}
                <x-spire::dropdown.item icon="settings-01" href="#">
                    Settings
                </x-spire::dropdown.item>

                {{-- Item with Shortcut --}}
                <x-spire::dropdown.item icon="keyboard-01" shortcut="⌘K">
                    Keyboard
                </x-spire::dropdown.item>

                {{-- Separator --}}
                <x-spire::dropdown.separator />

                {{-- Submenu Item --}}
                <x-spire::dropdown.submenu label="Share" icon="share-01">
                    <x-spire::dropdown.item icon="link-01">
                        Copy Link
                    </x-spire::dropdown.item>
                    <x-spire::dropdown.item icon="mail-01">
                        Email
                    </x-spire::dropdown.item>

                    {{-- Nested Submenu --}}
                    <x-spire::dropdown.submenu label="More" icon="dots-horizontal">
                        <x-spire::dropdown.item>Sub-item 1</x-spire::dropdown.item>
                        <x-spire::dropdown.item>Sub-item 2</x-spire::dropdown.item>
                    </x-spire::dropdown.submenu>

                </x-spire::dropdown.submenu>

                {{-- Disabled Submenu Item --}}
                <x-spire::dropdown.submenu label="Team" icon="users-01" disabled>
                    {{-- These will not be shown --}}
                    <x-spire::dropdown.item>Team Settings</x-spire::dropdown.item>
                </x-spire::dropdown.submenu>

                {{-- Separator --}}
                <x-spire::dropdown.separator />

                {{-- Disabled Item --}}
                <x-spire::dropdown.item icon="life-buoy-01" disabled>
                    Help (Disabled)
                </x-spire::dropdown.item>

                {{-- Destructive Item --}}
                <x-spire::dropdown.item icon="log-out-01" destructive>
                    Log Out
                </x-spire::dropdown.item>

            </x-spire::dropdown.content>

        </x-spire::dropdown>

    </div>
</div>

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
