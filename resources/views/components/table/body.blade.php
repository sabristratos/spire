@php
$virtualScroll = $virtualScroll ?? false;
@endphp

<tbody class="spire-table-body"
       role="rowgroup"
       x-ref="tbody"
       {{ $attributes }}>
    {{ $slot }}
</tbody>
