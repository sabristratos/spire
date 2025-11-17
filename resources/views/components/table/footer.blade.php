@php
use SpireUI\Support\ComponentClass;

$size = $size ?? 'md';

$builder = ComponentClass::make('table-footer')
    ->size($size);

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<tfoot {{ $mergedAttributes }}
       role="rowgroup">
    {{ $slot }}
</tfoot>
