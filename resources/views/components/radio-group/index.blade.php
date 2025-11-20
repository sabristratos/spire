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

$containerBuilder = ComponentClass::make('radio-group');

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$itemsBuilder = ComponentClass::make('radio-group-items')
    ->modifier($orientation)
    ->modifier("gap-{$gap}");
@endphp

<div
    class="{{ $containerBuilder->build() }}"
    role="radiogroup"
    @if($label) aria-labelledby="radio-group-label-{{ uniqid() }}" @endif
    @if($error) aria-invalid="true" @endif
    {{ $attributes->except('class') }}
>
    @if($label)
        <div class="spire-radio-group-label-wrapper">
            <label class="spire-radio-group-label">
                {{ $label }}
                @if($required)
                    <span class="spire-radio-group-required" aria-label="{{ __('spire-ui::spire-ui.required') }}">*</span>
                @endif
            </label>
        </div>
    @endif

    @if($description)
        <p class="spire-radio-group-description">
            {{ $description }}
        </p>
    @endif

    <div class="{{ $itemsBuilder->build() }}">
        {{ $slot }}
    </div>

    @if($helper)
        <p class="spire-radio-group-helper">
            {{ $helper }}
        </p>
    @endif

    @if($error)
        <p class="spire-radio-group-error" role="alert">
            <x-spire::icon name="alert-circle" class="w-4 h-4" />
            <span>{{ $error }}</span>
        </p>
    @endif
</div>
