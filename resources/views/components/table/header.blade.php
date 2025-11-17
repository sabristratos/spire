@php
$stickyHeader = $stickyHeader ?? false;

$headerClasses = collect(['spire-table-header'])
    ->when($stickyHeader, fn($c) => $c->push('spire-table-header--sticky'))
    ->implode(' ');
@endphp

<thead class="{{ $headerClasses }}"
       role="rowgroup"
       {{ $attributes }}>
    {{ $slot }}
</thead>
