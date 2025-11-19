@props([
    'id' => null,
    'title' => null,
    'icon' => null,
    'defaultOpen' => true,
    'collapsible' => true,
    'persist' => true,
])

<div
    {{ $attributes->merge(['class' => 'spire-sidebar-section']) }}
    x-data="spireSidebarSection({
        defaultOpen: @js($defaultOpen),
        id: @js($id),
        persist: @js($persist)
    })"
    data-spire-sidebar-section
>
    @if($title && $collapsible)
        <button
            type="button"
            class="spire-sidebar-section-trigger"
            x-on:click="toggle()"
            x-bind:aria-expanded="open"
        >
            @if($icon)
                <x-spire::icon :name="$icon" class="w-4 h-4 flex-shrink-0" />
            @endif
            <span class="spire-sidebar-section-label">{{ $title }}</span>
            <x-spire::icon
                name="chevron-down"
                class="spire-sidebar-section-chevron"
                x-bind:class="{ 'rotate-180': open }"
            />
        </button>
    @elseif($title)
        <div class="spire-sidebar-section-trigger cursor-default">
            @if($icon)
                <x-spire::icon :name="$icon" class="w-4 h-4 flex-shrink-0" />
            @endif
            <span class="spire-sidebar-section-label">{{ $title }}</span>
        </div>
    @endif

    <div
        class="spire-sidebar-section-content"
        @if($collapsible)
            x-show="open"
            x-collapse
        @endif
    >
        {{ $slot }}
    </div>
</div>
