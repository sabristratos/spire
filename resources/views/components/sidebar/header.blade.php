@props([
    'closable' => false,
])

<div {{ $attributes->merge(['class' => 'spire-sidebar-header']) }}>
    <div class="spire-sidebar-header-content flex-1">
        {{ $slot }}
    </div>

    @if(isset($collapsed))
        <div class="spire-sidebar-header-collapsed">
            {{ $collapsed }}
        </div>
    @endif

    @if($closable)
        <button
            type="button"
            class="spire-sidebar-close"
            x-on:click="closeMobile()"
            aria-label="{{ __('spire-ui::sidebar.close') }}"
        >
            <x-spire::icon name="x" class="w-5 h-5" />
        </button>
    @endif
</div>
