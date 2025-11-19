@php
use SpireUI\Support\ComponentClass;

$size = $size ?? 'md';
$align = $align ?? 'left';

$builder = ComponentClass::make('table-footer')
    ->size($size)
    ->when($align !== 'left', fn($b) => $b->modifier($align));

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<tfoot {{ $mergedAttributes }}
       role="rowgroup">
    {{ $slot }}
</tfoot>
