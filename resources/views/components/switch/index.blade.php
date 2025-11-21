@props([
    'name' => null,
    'value' => '1',
    'checked' => false,
    'disabled' => false,
    'required' => false,
    'size' => 'md',
    'color' => 'primary',
    'radius' => 'full',
    'label' => null,
    'description' => null,
    'id' => null,
])

@php
    use SpireUI\Support\ComponentClass;
    use SpireUI\Support\WireEntangle;

    $wireConfig = WireEntangle::fromAttributes($attributes);
    $switchId = $id ?? 'switch-' . uniqid();
    $labelId = $switchId . '-label';
    $descriptionId = $description ? $switchId . '-description' : null;

    $trackBuilder = ComponentClass::make('switch-track')
        ->size($size)
        ->color($color)
        ->radius($radius)
        ->addIf($disabled, 'cursor-not-allowed', 'opacity-50');

    $thumbBuilder = ComponentClass::make('switch-thumb')
        ->size($size)
        ->radius($radius);

    $containerClasses = ComponentClass::make('switch-container')
        ->addIf($disabled, 'opacity-50')
        ->build();

    $wrapperClasses = ComponentClass::make('switch-wrapper')
        ->addIf($disabled, 'cursor-not-allowed')
        ->build();

    $inputAttributes = [
        'type' => 'checkbox',
        'id' => $switchId,
        'value' => $value,
        'checked' => $checked,
        'disabled' => $disabled,
        'required' => $required,
        'role' => 'switch',
        'aria-checked' => $checked ? 'true' : 'false',
        'aria-labelledby' => $label || $slot->isNotEmpty() ? $labelId : null,
        'aria-describedby' => $descriptionId,
        'class' => 'spire-switch-input peer',
    ];

    if ($wireConfig->hasWireModel()) {
        $inputAttributes['wire:model' . ($wireConfig->isLive ? '.live' : '')] = $wireConfig->wireModel;
    } elseif ($name) {
        $inputAttributes['name'] = $name;
    }

    $mergedAttributes = WireEntangle::filteredAttributes($attributes);
@endphp

<div class="{{ $containerClasses }}" {{ $mergedAttributes }}>
    <label class="{{ $wrapperClasses }}" for="{{ $switchId }}">
        <input
            type="checkbox"
            id="{{ $switchId }}"
            value="{{ $value }}"
            class="spire-switch-input peer"
            role="switch"
            aria-checked="{{ $checked ? 'true' : 'false' }}"
            @if($label || $slot->isNotEmpty()) aria-labelledby="{{ $labelId }}" @endif
            @if($descriptionId) aria-describedby="{{ $descriptionId }}" @endif
            @if($wireConfig->hasWireModel())
                wire:model{{ $wireConfig->isLive ? '.live' : '' }}="{{ $wireConfig->wireModel }}"
            @elseif($name)
                name="{{ $name }}"
            @endif
            @if($checked) checked @endif
            @if($disabled) disabled @endif
            @if($required) required @endif
        >

        <div class="spire-switch-label-wrapper" id="{{ $labelId }}">
            @if($slot->isNotEmpty())
                {{ $slot }}
            @else
                @if($label)
                    <span class="spire-switch-label">
                        {{ $label }}
                        @if($required)
                            <span class="text-error">*</span>
                        @endif
                    </span>
                @endif

                @if($description)
                    <span class="spire-switch-description" id="{{ $descriptionId }}">
                        {{ $description }}
                    </span>
                @endif
            @endif
        </div>

        <div class="{{ $trackBuilder->build() }}" {!! collect($trackBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}>
            @if(isset($uncheckedIcon))
                <span class="spire-switch-icon spire-switch-icon--unchecked">
                    {{ $uncheckedIcon }}
                </span>
            @endif

            @if(isset($checkedIcon))
                <span class="spire-switch-icon spire-switch-icon--checked">
                    {{ $checkedIcon }}
                </span>
            @endif

            <div class="{{ $thumbBuilder->build() }}"></div>
        </div>
    </label>
</div>
