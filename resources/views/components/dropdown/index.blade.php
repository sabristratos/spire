@props([
    'placement' => 'bottom-start',
    'type' => 'auto',
    'trigger' => 'click',
])

<div
    x-data="spireDropdown({ type: '{{ $type }}', trigger: '{{ $trigger }}' })"
    x-id="['popover']"
    wire:ignore
    {{ $attributes }}
>
    {{ $slot }}
</div>
