@props([
    'placement' => spire_default('popover', 'placement', 'bottom-start'),
    'type' => 'auto',
    'trigger' => 'click',
])

<div
    x-data="spireOverlay({ type: '{{ $type }}', trigger: '{{ $trigger }}' })"
    x-id="['popover']"
    wire:ignore.self
    {{ $attributes }}
>
    {{ $slot }}
</div>
