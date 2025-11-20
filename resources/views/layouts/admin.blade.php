@props([
    'brandName' => 'Admin',
    'brandIcon' => 'command',
    'userName' => 'User',
    'userEmail' => null,
    'userAvatar' => null,
])

<div class="overflow-hidden h-screen bg-body flex">
    <x-spire::sidebar variant="bordered" collapsible drawer class="md:relative md:translate-x-0 md:z-auto" wire:ignore>
        <x-slot:header>
            <div class="flex items-center gap-2">
                <x-spire::icon :name="$brandIcon" class="w-6 h-6 text-primary" />
                <span class="font-semibold text-text spire-sidebar-header-content">{{ $brandName }}</span>
            </div>
        </x-slot:header>

        <x-spire::sidebar.content>
            @if(isset($sidebar))
                {{ $sidebar }}
            @else
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
            @endif
        </x-spire::sidebar.content>

        <x-slot:footer>
            <div class="flex items-center gap-3">
                <x-spire::avatar :src="$userAvatar" :name="$userName" size="sm" radius="full" />
                <div class="flex-1 min-w-0 spire-sidebar-footer-content">
                    <p class="text-sm font-medium text-text truncate">{{ $userName }}</p>
                    @if($userEmail)
                        <p class="text-xs text-text-muted truncate">{{ $userEmail }}</p>
                    @endif
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

            <x-spire::header.brand :name="$brandName" class="max-md:hidden" />

            @if(isset($headerNav))
                {{ $headerNav }}
            @else
                <x-spire::header.navbar class="max-md:hidden">
                    <x-spire::header.item icon="layout-dashboard" href="#">Dashboard</x-spire::header.item>
                    <x-spire::header.item icon="users" href="#">Users</x-spire::header.item>
                    <x-spire::header.item icon="settings" href="#">Settings</x-spire::header.item>
                </x-spire::header.navbar>
            @endif

            <x-spire::header.spacer />

            <x-spire::header.navbar>
                <x-spire::header.item icon="bell" label="Notifications" />
                <x-spire::header.item icon="search" label="Search" class="max-md:hidden" />
            </x-spire::header.navbar>

            <x-spire::dropdown>
                <x-spire::dropdown.trigger>
                    <x-spire::avatar :src="$userAvatar" :name="$userName" size="sm" radius="full" class="cursor-pointer" />
                </x-spire::dropdown.trigger>
                <x-spire::dropdown.content>
                    <x-spire::dropdown.item icon="user">Profile</x-spire::dropdown.item>
                    <x-spire::dropdown.item icon="settings">Settings</x-spire::dropdown.item>
                    <x-spire::dropdown.separator />
                    <x-spire::dropdown.item icon="log-out">Sign Out</x-spire::dropdown.item>
                </x-spire::dropdown.content>
            </x-spire::dropdown>
        </x-spire::header>

        <main {{ $attributes->merge(['class' => 'flex-1 p-6']) }}>
            {{ $slot }}
        </main>
    </div>
</div>
