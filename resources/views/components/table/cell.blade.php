@php
use SpireUI\Support\ComponentClass;

$align = $align ?? 'left';
$size = $size ?? 'md';
$numeric = $numeric ?? false;

$builder = ComponentClass::make('table-cell')
    ->size($size)
    ->modifier($align)
    ->when($numeric, fn($b) => $b->modifier('numeric'));

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<td {{ $mergedAttributes }} role="cell">
    {{ $slot }}
</td>
