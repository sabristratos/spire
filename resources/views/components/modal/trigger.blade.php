@props([
    'name' => null,
])

@php
if (!$name) {
    throw new \InvalidArgumentException('Modal trigger requires a "name" prop to identify which modal to open');
}

$mergedAttributes = $attributes->merge([
    'data-spire-modal-trigger' => '',
    'data-spire-modal-name' => $name,
]);
@endphp

<div
    x-data="{
        open() {
            window.dispatchEvent(new CustomEvent('spire-modal:open-' + @js($name)));
        }
    }"
    @click="open()"
    {{ $mergedAttributes }}
>
    {{ $slot }}
</div>
