@aware(['placement'])

<div
    x-ref="trigger"
    @click="toggle()"
    {{ $attributes }}
>
    {{ $slot }}
</div>
