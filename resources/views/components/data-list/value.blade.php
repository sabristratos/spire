@props([])

<dd {{ $attributes->merge(['class' => 'spire-data-list-value']) }}>
    {{ $slot }}
</dd>
