@props([])

<div {{ $attributes->merge(['class' => 'spire-sidebar-footer']) }}>
    <div class="spire-sidebar-footer-content flex-1">
        {{ $slot }}
    </div>

    @if(isset($collapsed))
        <div class="spire-sidebar-footer-collapsed">
            {{ $collapsed }}
        </div>
    @endif
</div>
