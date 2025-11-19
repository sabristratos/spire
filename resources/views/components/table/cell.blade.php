@php
use SpireUI\Support\ComponentClass;

$align = $align ?? 'left';
$size = $size ?? 'md';
$numeric = $numeric ?? false;
$label = $label ?? null;
$responsive = $responsive ?? 'secondary';

$builder = ComponentClass::make('table-cell')
    ->size($size)
    ->modifier($align)
    ->when($numeric, fn($b) => $b->modifier('numeric'))
    ->when($responsive !== 'secondary', fn($b) => $b->modifier("responsive-{$responsive}"))
    ->when($label, fn($b) => $b->dataAttribute('label', $label));

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<td {{ $mergedAttributes }} role="cell">
    {{ $slot }}
</td>
