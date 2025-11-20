@props([
    'size' => 'md',
    'variant' => 'bordered',
    'collapsed' => false,
    'collapsible' => false,
    'position' => 'left',
    'drawer' => false,
    'persist' => true,
    'storageKey' => 'spire-sidebar-collapsed',
    'showToggle' => true,
    'toggleIcon' => 'chevron-left',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('sidebar')
    ->size($size)
    ->modifier($variant)
    ->when($collapsed, fn($b) => $b->modifier('collapsed'))
    ->when($drawer, fn($b) => $b->modifier('drawer'))
    ->dataAttribute('position', $position)
    ->dataAttribute('collapsible', $collapsible ? 'true' : 'false')
    ->dataAttribute('collapsed', $collapsed ? 'true' : 'false');
@endphp

<div
    x-data="spireSidebar({ collapsed: @js($collapsed), persist: @js($persist), storageKey: @js($storageKey) })"
    x-cloak
    class="contents"
>
    <aside
        x-ref="sidebar"
        {{ $attributes->merge([
            'class' => $builder->build(),
            ...$builder->getDataAttributes(),
        ]) }}
        role="navigation"
        aria-label="{{ __('spire-ui::sidebar.navigation') }}"
    >
        @if($collapsible && $showToggle)
            <button
                type="button"
                class="spire-sidebar-toggle-integrated"
                x-on:click="toggle()"
                x-bind:aria-expanded="!collapsed"
                aria-label="{{ __('spire-ui::sidebar.toggle') }}"
            >
                <x-spire::icon
                    :name="$toggleIcon"
                    class="w-4 h-4 transition-transform"
                    x-bind:class="collapsed ? 'rotate-180' : ''"
                />
            </button>
        @endif

        @if(isset($header))
            <div class="spire-sidebar-header">
                {{ $header }}
            </div>
        @endif

        {{ $slot }}

        @if(isset($footer))
            <div class="spire-sidebar-footer">
                {{ $footer }}
            </div>
        @endif
    </aside>

    @if($drawer)
        {{-- Backdrop for mobile drawer --}}
        <div
            x-show="mobileOpen"
            x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            class="spire-sidebar-backdrop"
            data-spire-sidebar-backdrop
            x-on:click="closeMobile()"
        ></div>
    @endif
</div>
