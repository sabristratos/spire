@php
use SpireUI\Support\ComponentClass;

$value = $value ?? null;
$selected = $selected ?? false;
$disabled = $disabled ?? false;
$clickable = $clickable ?? false;
$selectable = $selectable ?? false;

$builder = ComponentClass::make('table-row')
    ->when($selectable, fn($b) => $b->modifier('selectable'))
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($clickable, fn($b) => $b->modifier('clickable'))
    ->dataAttribute('table-row-value', $value);

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<tr {{ $mergedAttributes }}
    role="row"
    @if($disabled) aria-disabled="true" @endif
    @if($selectable && $value !== null)
        x-bind:aria-selected="isRowSelected('{{ $value }}') ? 'true' : 'false'"
        x-bind:data-spire-table-row-selected="isRowSelected('{{ $value }}')"
        tabindex="-1"
        @if($clickable && !$disabled) @click="toggleRow('{{ $value }}')" @endif
    @endif>
    @if($selectable && $value !== null)
        <td class="spire-table-cell spire-table-checkbox-cell" role="gridcell">
            <x-spire::checkbox
                x-bind:checked="isRowSelected('{{ $value }}')"
                @change="toggleRow('{{ $value }}')"
                :disabled="$disabled"
                :aria-label="__('spire-ui::spire-ui.table.select_row')" />
        </td>
    @endif
    {{ $slot }}
</tr>
