@props([
    'placement' => spire_default('dropdown', 'placement', 'bottom-start'),
    'type' => 'auto',
    'trigger' => 'click',
])

<div
    x-data="spireDropdown({ type: '{{ $type }}', trigger: '{{ $trigger }}' })"
    x-id="['popover']"
    wire:ignore.self
    {{ $attributes }}
>
    {{ $slot }}
</div>
