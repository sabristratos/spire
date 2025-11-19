@php
use SpireUI\Support\ComponentClass;

$sortable = $sortable ?? false;
$sortKey = $sortKey ?? null;
$align = $align ?? 'left';
$width = $width ?? null;
$size = $size ?? 'md';
$isCheckboxCell = $isCheckboxCell ?? false;
$label = $label ?? null;
$responsive = $responsive ?? 'secondary';

$builder = ComponentClass::make('table-header-cell')
    ->size($size)
    ->modifier($align)
    ->when($sortable, fn($b) => $b->modifier('sortable'))
    ->when($isCheckboxCell, fn($b) => $b->addClass('spire-table-checkbox-cell'))
    ->when($responsive !== 'secondary', fn($b) => $b->dataAttribute('table-responsive', $responsive));

$contentClasses = collect(['spire-table-header-cell-content'])
    ->when($align === 'center', fn($c) => $c->push('spire-table-header-cell-content--center'))
    ->when($align === 'right', fn($c) => $c->push('spire-table-header-cell-content--right'))
    ->implode(' ');

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);

if ($sortable && $sortKey) {
    $mergedAttributes = $mergedAttributes->merge([
        'data-spire-table-sort-key' => $sortKey,
    ]);
}
@endphp

<th {{ $mergedAttributes }}
    role="columnheader"
    @if($width) style="width: {{ $width }}" @endif
    @if($sortable && $sortKey)
        @click="toggleSort('{{ $sortKey }}')"
        x-bind:data-spire-table-sort-direction="sortColumn === '{{ $sortKey }}' ? sortDirection : null"
        x-bind:aria-sort="sortColumn === '{{ $sortKey }}' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'"
    @endif>
    @if($isCheckboxCell)
        <x-spire::checkbox
            x-bind:checked="allSelected"
            x-bind:indeterminate="someSelected"
            @change="toggleSelectAll($event)"
            :aria-label="__('spire-ui::spire-ui.table.select_all')" />
    @else
        <div class="{{ $contentClasses }}">
            <span>{{ $slot }}</span>
            @if($sortable)
                <x-spire::icon
                    name="chevron-up"
                    class="spire-table-sort-icon"
                    x-bind:class="{
                        'spire-table-sort-icon--asc': sortColumn === '{{ $sortKey }}' && sortDirection === 'asc',
                        'spire-table-sort-icon--desc': sortColumn === '{{ $sortKey }}' && sortDirection === 'desc',
                        'opacity-0': sortColumn !== '{{ $sortKey }}'
                    }" />
            @endif
        </div>
    @endif
</th>
