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

    <div class="max-w-7xl mx-auto px-6 py-16">
        <header class="text-center mb-16">
            <h1 class="text-5xl font-bold text-text mb-4">Spire UI Components</h1>
            <p class="text-xl text-text-muted max-w-2xl mx-auto">Form Components Showcase</p>
        </header>

        {{-- Livewire Form Testing Section --}}
        <div class="mb-32">
            <h2 class="text-4xl font-bold text-text mb-4">Livewire Form Integration</h2>
            <p class="text-lg text-text-muted mb-8">Testing wire:model, validation, error handling, and all interactive features</p>

            <livewire:contact-form />
        </div>

        <div class="mb-32">
            <h2 class="text-4xl font-bold text-text mb-4">Input Component</h2>
            <p class="text-lg text-text-muted mb-8">Flexible input component with convenience props for icons and interactive features</p>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Basic Inputs</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input placeholder="Basic text input" />
                    <x-spire::input type="email" placeholder="Email input" />
                    <x-spire::input type="password" placeholder="Password input" />
                    <x-spire::input type="search" placeholder="Search input" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">With Icons (Shorthand)</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input icon="mail" placeholder="Email with leading icon" />
                    <x-spire::input iconTrailing="check-circle" placeholder="Input with trailing icon" />
                    <x-spire::input icon="search-md" iconTrailing="filter" placeholder="Both icons" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Clearable Inputs</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input clearable value="Try clearing me" placeholder="Clearable input" />
                    <x-spire::input icon="search-md" clearable placeholder="Search with clear" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Password with Toggle (Viewable)</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input type="password" viewable value="secret123" placeholder="Toggle visibility" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Copyable Input</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input readonly copyable value="pk_test_51H0BqXEzQ7dE0Y1I2F3g4h5J6k7L8m9N0o1P2q3R4s5T6u7V8w9X0y1Z2" />
                    <p class="text-sm text-text-muted">Click the copy button to copy to clipboard</p>
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Sizes</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input size="sm" icon="mail" placeholder="Small input" />
                    <x-spire::input size="md" icon="mail" placeholder="Medium input (default)" />
                    <x-spire::input size="lg" icon="mail" placeholder="Large input" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Variants</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input variant="bordered" placeholder="Bordered (default)" />
                    <x-spire::input variant="flat" placeholder="Flat variant" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">States</h3>
                <div class="space-y-4 max-w-md">
                    <x-spire::input placeholder="Normal state" />
                    <x-spire::input disabled placeholder="Disabled state" />
                    <x-spire::input readonly value="Read-only value" />
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">With Field Component</h3>
                <div class="space-y-6 max-w-md">
                    <x-spire::field
                        label="Email Address"
                        for="email"
                        required
                        helper="We'll never share your email"
                    >
                        <x-spire::input
                            id="email"
                            type="email"
                            icon="mail"
                            placeholder="you@example.com"
                        />
                    </x-spire::field>

                    <x-spire::field
                        label="Search"
                        for="search"
                        helper="Search by name, email, or phone"
                    >
                        <x-spire::input
                            id="search"
                            icon="search-md"
                            clearable
                            placeholder="Start typing..."
                        />
                    </x-spire::field>

                    <x-spire::field
                        label="Password"
                        for="password"
                        required
                        helper="Must be at least 8 characters"
                    >
                        <x-spire::input
                            id="password"
                            type="password"
                            viewable
                            placeholder="Enter password"
                        />
                    </x-spire::field>

                    <x-spire::field
                        label="API Token"
                        for="token"
                        helper="Click the copy button to copy"
                    >
                        <x-spire::input
                            id="token"
                            readonly
                            copyable
                            value="pk_test_abc123xyz789"
                        />
                    </x-spire::field>
                </div>
            </div>

            <div class="mb-12">
                <h3 class="text-2xl font-semibold text-text mb-4">Complete Form Example</h3>
                <div class="max-w-md space-y-6">
                    <x-spire::form.label for="fullname" required>
                        Full Name
                    </x-spire::form.label>
                    <x-spire::input id="fullname" icon="user-01" placeholder="John Doe" />

                    <div class="mt-6">
                        <x-spire::form.label for="email2" required>
                            Email Address
                        </x-spire::form.label>
                        <div class="mt-1.5">
                            <x-spire::input id="email2" type="email" icon="mail" placeholder="john@example.com" />
                        </div>
                        <div class="mt-1.5">
                            <x-spire::form.helper>
                                We'll send a confirmation email to this address
                            </x-spire::form.helper>
                        </div>
                    </div>

                    <div class="mt-6">
                        <x-spire::form.label for="password2" required>
                            Password
                        </x-spire::form.label>
                        <div class="mt-1.5">
                            <x-spire::input id="password2" type="password" viewable />
                        </div>
                        <div class="mt-1.5">
                            <x-spire::form.helper size="sm">
                                Must contain at least 8 characters, one uppercase, and one number
                            </x-spire::form.helper>
                        </div>
                    </div>

                    <div class="mt-8">
                        <x-spire::button type="submit" color="primary" class="w-full">
                            Create Account
                        </x-spire::button>
                    </div>
                </div>
            </div>
        </div>
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
