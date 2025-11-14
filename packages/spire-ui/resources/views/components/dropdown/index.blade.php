@props([
    'placement' => 'bottom-start',
    'type' => 'auto',
    'trigger' => 'click',
])

<div
    x-data="{
        ...overlay({
            type: '{{ $type }}',
            trigger: '{{ $trigger }}',
            onInit() { this.setupKeyboard(); },
            extend: window.keyboard({
                pattern: 'roving-tabindex',
                role: 'menu',
                itemSelector: '[role=menuitem]:not([disabled])',
                orientation: 'vertical',
                wrap: true,
                onSelect(item) { item?.click(); }
            })
        })
    }"
    x-id="['popover']"
    wire:ignore
    {{ $attributes }}
>
    {{ $slot }}
</div>
