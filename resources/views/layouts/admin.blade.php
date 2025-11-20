<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>

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
<body class="overflow-hidden h-screen bg-body flex">
<x-spire::sidebar variant="bordered" collapsible drawer class="md:relative md:translate-x-0 md:z-auto" wire:ignore>
    <x-slot:header>
        <div class="flex items-center gap-2">
            <x-spire::icon name="command" class="w-6 h-6 text-primary" />
            <span class="font-semibold text-text spire-sidebar-header-content">Admin</span>
        </div>
    </x-slot:header>

    <x-spire::sidebar.content>
        <x-spire::sidebar.section title="Navigation" icon="menu" :collapsible="false">
            <x-spire::sidebar.item icon="layout-dashboard" href="#">
                Dashboard
            </x-spire::sidebar.item>
            <x-spire::sidebar.item icon="users" href="#">
                Users
            </x-spire::sidebar.item>
            <x-spire::sidebar.item icon="settings" href="#">
                Settings
            </x-spire::sidebar.item>
        </x-spire::sidebar.section>
    </x-spire::sidebar.content>

    <x-slot:footer>
        <div class="flex items-center gap-3">
            <x-spire::avatar src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name="John Doe" size="sm" radius="full" />
            <div class="flex-1 min-w-0 spire-sidebar-footer-content">
                <p class="text-sm font-medium text-text truncate">John Doe</p>
                <p class="text-xs text-text-muted truncate">john@example.com</p>
            </div>
        </div>
        <x-spire::sidebar.item icon="log-out" href="#">
            Sign Out
        </x-spire::sidebar.item>
    </x-slot:footer>
</x-spire::sidebar>

<div class="flex-1 flex flex-col overflow-auto">
    <x-spire::toast.container position="top-right" />

    <x-spire::header class="border-b border-border">
        <x-spire::header.toggle class="md:hidden" icon="panel-left" />

        <x-spire::header.brand name="Admin" class="max-md:hidden" />

        <x-spire::header.navbar class="max-md:hidden">
            <x-spire::header.item icon="layout-dashboard" href="#">Dashboard</x-spire::header.item>
            <x-spire::header.item icon="users" href="#">Users</x-spire::header.item>
            <x-spire::header.item icon="settings" href="#">Settings</x-spire::header.item>
        </x-spire::header.navbar>

        <x-spire::header.spacer />

        <x-spire::header.navbar>
            <x-spire::header.item icon="bell" label="Notifications" />
            <x-spire::header.item icon="search" label="Search" class="max-md:hidden" />
        </x-spire::header.navbar>

        <x-spire::dropdown>
            <x-spire::dropdown.trigger>
                <x-spire::avatar src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" name="John Doe" size="sm" radius="full" class="cursor-pointer" />
            </x-spire::dropdown.trigger>
            <x-spire::dropdown.content>
                <x-spire::dropdown.item icon="user">Profile</x-spire::dropdown.item>
                <x-spire::dropdown.item icon="settings">Settings</x-spire::dropdown.item>
                <x-spire::dropdown.separator />
                <x-spire::dropdown.item icon="log-out">Sign Out</x-spire::dropdown.item>
            </x-spire::dropdown.content>
        </x-spire::dropdown>
    </x-spire::header>

    <main class='flex-1 p-6'>
        {{ $slot }}
    </main>
</div>
@livewireScripts
</body>
</html>
