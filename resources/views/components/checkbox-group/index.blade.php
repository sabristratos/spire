@props([
    'orientation' => 'vertical',
    'gap' => 'md',
    'label' => null,
    'description' => null,
    'error' => null,
    'helper' => null,
    'required' => false,
])

@php
use SpireUI\Support\ComponentClass;

$groupId = 'spire-checkbox-group-' . uniqid();
$labelId = $groupId . '-label';
$descriptionId = $groupId . '-description';
$helperId = $groupId . '-helper';
$errorId = $groupId . '-error';

$containerBuilder = ComponentClass::make('checkbox-group')
    ->modifier($orientation)
    ->dataAttribute('gap', $gap);

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$itemsBuilder = ComponentClass::make('checkbox-group-items')
    ->modifier($orientation)
    ->modifier("gap-{$gap}");
@endphp

<div
    id="{{ $groupId }}"
    class="{{ $containerBuilder->build() }}"
    {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    role="group"
    @if($label)
        aria-labelledby="{{ $labelId }}"
    @endif
    @if($description)
        aria-describedby="{{ $descriptionId }}"
    @endif
    {{ $attributes }}
>
    @if($label)
        <div class="spire-checkbox-group-label-wrapper">
            <label id="{{ $labelId }}" class="spire-checkbox-group-label">
                {{ $label }}
                @if($required)
                    <span class="spire-checkbox-group-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                @endif
            </label>
        </div>
    @endif

    @if($description)
        <p id="{{ $descriptionId }}" class="spire-checkbox-group-description">
            {{ $description }}
        </p>
    @endif

    <div
        class="{{ $itemsBuilder->build() }}"
        {!! collect($itemsBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
        data-spire-orientation="{{ $orientation }}"
    >
        {{ $slot }}
    </div>

    @if($helper)
        <p id="{{ $helperId }}" class="spire-checkbox-group-helper">
            {{ $helper }}
        </p>
    @endif

    @if($error)
        <p id="{{ $errorId }}" class="spire-checkbox-group-error">
            <x-spire::icon name="alert-circle" class="w-4 h-4" />
            <span>{{ $error }}</span>
        </p>
    @endif
</div>
