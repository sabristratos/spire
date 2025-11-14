@props([
    'placement' => 'bottom-start',
    'type' => 'auto',
    'trigger' => 'click',
])

<div
    x-data="overlay({ type: '{{ $type }}', trigger: '{{ $trigger }}' })"
    x-id="['popover']"
    wire:ignore.self
    {{ $attributes }}
>
    {{ $slot }}
</div>
