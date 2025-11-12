<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }} - Theme Demo</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="scheme-light-dark bg-body text-text antialiased" x-data="{ darkMode: false }" x-init="darkMode = localStorage.getItem('darkMode') === 'true'; $watch('darkMode', val => { localStorage.setItem('darkMode', val); document.documentElement.classList.toggle('dark', val); })">
    <div class="min-h-screen p-12">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-semibold">Spire UI Component Demo</h1>
            <button
                @click="darkMode = !darkMode"
                class="px-4 py-2 rounded-md border border-border hover:bg-surface"
            >
                <span x-show="!darkMode">🌙 Dark</span>
                <span x-show="darkMode">☀️ Light</span>
            </button>
        </div>

        <div class="space-y-12">
            <section>
                <h2 class="text-2xl font-semibold mb-6">Icons</h2>
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-medium mb-3">Basic Icons</h3>
                        <div class="flex items-center gap-4">
                            <x-spire::icon name="activity" class="w-6 h-6" />
                            <x-spire::icon name="camera-01" class="w-6 h-6" />
                            <x-spire::icon name="alert-circle" class="w-6 h-6" />
                            <x-spire::icon name="check" class="w-6 h-6" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Different Sizes</h3>
                        <div class="flex items-center gap-4">
                            <x-spire::icon name="activity" class="w-4 h-4" />
                            <x-spire::icon name="activity" class="w-6 h-6" />
                            <x-spire::icon name="activity" class="w-8 h-8" />
                            <x-spire::icon name="activity" class="w-12 h-12" />
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Colored Icons</h3>
                        <div class="flex items-center gap-4">
                            <x-spire::icon name="check" class="w-8 h-8 text-success" />
                            <x-spire::icon name="alert-circle" class="w-8 h-8 text-error" />
                            <x-spire::icon name="camera-01" class="w-8 h-8 text-primary" />
                            <x-spire::icon name="activity" class="w-8 h-8 text-secondary" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 class="text-2xl font-semibold mb-6">Buttons</h2>
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-medium mb-3">Solid Variant (Default)</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button>Default</x-spire::button>
                            <x-spire::button color="primary">Primary</x-spire::button>
                            <x-spire::button color="secondary">Secondary</x-spire::button>
                            <x-spire::button color="success">Success</x-spire::button>
                            <x-spire::button color="error">Error</x-spire::button>
                            <x-spire::button color="warning">Warning</x-spire::button>
                            <x-spire::button color="info">Info</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Bordered Variant</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button variant="bordered">Default</x-spire::button>
                            <x-spire::button variant="bordered" color="primary">Primary</x-spire::button>
                            <x-spire::button variant="bordered" color="secondary">Secondary</x-spire::button>
                            <x-spire::button variant="bordered" color="success">Success</x-spire::button>
                            <x-spire::button variant="bordered" color="error">Error</x-spire::button>
                            <x-spire::button variant="bordered" color="warning">Warning</x-spire::button>
                            <x-spire::button variant="bordered" color="info">Info</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Ghost Variant</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button variant="ghost">Default</x-spire::button>
                            <x-spire::button variant="ghost" color="primary">Primary</x-spire::button>
                            <x-spire::button variant="ghost" color="secondary">Secondary</x-spire::button>
                            <x-spire::button variant="ghost" color="success">Success</x-spire::button>
                            <x-spire::button variant="ghost" color="error">Error</x-spire::button>
                            <x-spire::button variant="ghost" color="warning">Warning</x-spire::button>
                            <x-spire::button variant="ghost" color="info">Info</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Link Variant</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button variant="link">Default</x-spire::button>
                            <x-spire::button variant="link" color="primary">Primary</x-spire::button>
                            <x-spire::button variant="link" color="secondary">Secondary</x-spire::button>
                            <x-spire::button variant="link" color="success">Success</x-spire::button>
                            <x-spire::button variant="link" color="error">Error</x-spire::button>
                            <x-spire::button variant="link" color="warning">Warning</x-spire::button>
                            <x-spire::button variant="link" color="info">Info</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Button Sizes</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button size="sm" color="primary">Small</x-spire::button>
                            <x-spire::button size="md" color="primary">Medium</x-spire::button>
                            <x-spire::button size="lg" color="primary">Large</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Button Radius</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button radius="none" color="primary">None</x-spire::button>
                            <x-spire::button radius="sm" color="primary">Small</x-spire::button>
                            <x-spire::button radius="md" color="primary">Medium</x-spire::button>
                            <x-spire::button radius="lg" color="primary">Large</x-spire::button>
                            <x-spire::button radius="full" color="primary">Full</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Buttons with Icons</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button color="success">
                                <x-slot:leading>
                                    <x-spire::icon name="check" class="w-4 h-4" />
                                </x-slot:leading>
                                Approve
                            </x-spire::button>
                            <x-spire::button color="error" variant="bordered">
                                Delete
                                <x-slot:trailing>
                                    <x-spire::icon name="annotation-x" class="w-4 h-4" />
                                </x-slot:trailing>
                            </x-spire::button>
                            <x-spire::button color="primary" variant="ghost">
                                <x-slot:leading>
                                    <x-spire::icon name="arrow-up" class="w-4 h-4" />
                                </x-slot:leading>
                                Upload
                            </x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Icon Only Buttons</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button icon-only color="primary">
                                <x-spire::icon name="annotation-heart" class="w-5 h-5" />
                            </x-spire::button>
                            <x-spire::button icon-only color="error" variant="bordered">
                                <x-spire::icon name="annotation-x" class="w-5 h-5" />
                            </x-spire::button>
                            <x-spire::button icon-only color="success" variant="ghost" size="sm">
                                <x-spire::icon name="check" class="w-4 h-4" />
                            </x-spire::button>
                            <x-spire::button icon-only color="primary" size="lg" radius="full">
                                <x-spire::icon name="annotation-plus" class="w-6 h-6" />
                            </x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Loading & Disabled States</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button loading color="primary">Loading...</x-spire::button>
                            <x-spire::button disabled color="secondary">Disabled</x-spire::button>
                            <x-spire::button loading disabled color="success">Loading Disabled</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Full Width Button</h3>
                        <x-spire::button class="w-full" color="primary">Full Width Button</x-spire::button>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Button Groups (Horizontal)</h3>
                        <div class="space-y-3">
                            <x-spire::button.group>
                                <x-spire::button>Left</x-spire::button>
                                <x-spire::button>Center</x-spire::button>
                                <x-spire::button>Right</x-spire::button>
                            </x-spire::button.group>

                            <x-spire::button.group>
                                <x-spire::button color="primary">One</x-spire::button>
                                <x-spire::button color="primary">Two</x-spire::button>
                                <x-spire::button color="primary">Three</x-spire::button>
                                <x-spire::button color="primary">Four</x-spire::button>
                            </x-spire::button.group>

                            <x-spire::button.group>
                                <x-spire::button variant="bordered" color="secondary">Option A</x-spire::button>
                                <x-spire::button variant="bordered" color="secondary">Option B</x-spire::button>
                                <x-spire::button variant="bordered" color="secondary">Option C</x-spire::button>
                            </x-spire::button.group>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Button Groups (Vertical)</h3>
                        <x-spire::button.group vertical aria-label="View options">
                            <x-spire::button color="primary">Top</x-spire::button>
                            <x-spire::button color="primary">Middle</x-spire::button>
                            <x-spire::button color="primary">Bottom</x-spire::button>
                        </x-spire::button.group>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Soft Variant</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button variant="soft">Default</x-spire::button>
                            <x-spire::button variant="soft" color="primary">Primary</x-spire::button>
                            <x-spire::button variant="soft" color="secondary">Secondary</x-spire::button>
                            <x-spire::button variant="soft" color="success">Success</x-spire::button>
                            <x-spire::button variant="soft" color="error">Error</x-spire::button>
                            <x-spire::button variant="soft" color="warning">Warning</x-spire::button>
                            <x-spire::button variant="soft" color="info">Info</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Link Buttons</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button href="#" color="primary">Link Button</x-spire::button>
                            <x-spire::button href="#" variant="bordered" color="secondary">Bordered Link</x-spire::button>
                            <x-spire::button href="#" disabled color="error">Disabled Link</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Pressed/Toggle State</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button pressed color="primary">Selected</x-spire::button>
                            <x-spire::button color="primary">Not Selected</x-spire::button>
                            <x-spire::button pressed variant="bordered" color="secondary">Active Filter</x-spire::button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-medium mb-3">Icon-Only with ARIA Labels</h3>
                        <div class="flex flex-wrap items-center gap-3">
                            <x-spire::button icon-only color="primary" aria-label="Like this item">
                                <x-spire::icon name="annotation-heart" class="w-5 h-5" />
                            </x-spire::button>
                            <x-spire::button icon-only color="error" variant="bordered" aria-label="Delete item">
                                <x-spire::icon name="annotation-x" class="w-5 h-5" />
                            </x-spire::button>
                            <x-spire::button icon-only color="success" variant="soft" size="sm" aria-label="Confirm">
                                <x-spire::icon name="check" class="w-4 h-4" />
                            </x-spire::button>
                            <x-spire::button icon-only color="primary" size="lg" radius="full" aria-label="Add new item">
                                <x-spire::icon name="annotation-plus" class="w-6 h-6" />
                            </x-spire::button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>
