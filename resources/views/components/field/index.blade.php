@props([
    'label' => null,
    'for' => null,
    'required' => false,
    'error' => null,
    'helper' => null,
    'size' => 'md',
])

@php
$mergedAttributes = $attributes->merge([
    'class' => 'w-full',
    'data-spire-field' => 'true',
]);
@endphp

<div {{ $mergedAttributes }}>
    @if($label || isset($labelSlot))
        <div class="mb-1.5">
            @if(isset($labelSlot))
                {{ $labelSlot }}
            @else
                <x-spire::form.label :for="$for" :required="$required" :size="$size">
                    {{ $label }}
                </x-spire::form.label>
            @endif
        </div>
    @endif

    <div>
        {{ $slot }}
    </div>

    @if($error || isset($errorSlot))
        <div class="mt-1.5">
            @if(isset($errorSlot))
                {{ $errorSlot }}
            @else
                <x-spire::form.error :name="$error" />
            @endif
        </div>
    @elseif($helper || isset($helperSlot))
        <div class="mt-1.5">
            @if(isset($helperSlot))
                {{ $helperSlot }}
            @else
                <x-spire::form.helper :size="$size">
                    {{ $helper }}
                </x-spire::form.helper>
            @endif
        </div>
    @endif
</div>
