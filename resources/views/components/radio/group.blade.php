@props([
    'label' => null,
    'description' => null,
    'helper' => null,
    'error' => null,
    'required' => false,
    'orientation' => 'vertical',
    'gap' => 'md',
])

@php
use SpireUI\Support\ComponentClass;

$groupId = 'spire-radio-group-' . uniqid();
$labelId = $groupId . '-label';
$descriptionId = $groupId . '-description';
$helperId = $groupId . '-helper';
$errorId = $groupId . '-error';

$containerBuilder = ComponentClass::make('radio-group')
    ->modifier($orientation)
    ->dataAttribute('gap', $gap);

$itemsBuilder = ComponentClass::make('radio-group-items')
    ->modifier($orientation)
    ->modifier("gap-{$gap}");

$ariaDescribedBy = collect([
    $description ? $descriptionId : null,
    $helper ? $helperId : null,
    $error ? $errorId : null,
])->filter()->implode(' ') ?: null;

$mergedAttributes = $attributes->merge([
    'id' => $groupId,
    'class' => $containerBuilder->build(),
    'role' => 'radiogroup',
    'aria-labelledby' => $label ? $labelId : null,
    'aria-describedby' => $ariaDescribedBy,
    'aria-invalid' => $error ? 'true' : null,
    ...$containerBuilder->getDataAttributes(),
]);
@endphp

<div {{ $mergedAttributes }}>
    @if($label)
        <div class="spire-radio-group-label-wrapper">
            <label id="{{ $labelId }}" class="spire-radio-group-label">
                {{ $label }}
                @if($required)
                    <span class="spire-radio-group-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                @endif
            </label>
        </div>
    @endif

    @if($description)
        <p id="{{ $descriptionId }}" class="spire-radio-group-description">
            {{ $description }}
        </p>
    @endif

    <div
        class="{{ $itemsBuilder->build() }}"
        {!! collect($itemsBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    >
        {{ $slot }}
    </div>

    @if($helper)
        <p id="{{ $helperId }}" class="spire-radio-group-helper">
            {{ $helper }}
        </p>
    @endif

    @if($error)
        <p id="{{ $errorId }}" class="spire-radio-group-error" role="alert">
            <x-spire::icon name="alert-circle" class="w-4 h-4" />
            <span>{{ $error }}</span>
        </p>
    @endif
</div>
