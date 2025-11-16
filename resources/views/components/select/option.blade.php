@props([
    'value' => '',
    'label' => null,
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

$displayLabel = $label ?? $slot->toHtml();

$builder = ComponentClass::make('select-option')
    ->modifier($disabled ? 'disabled' : 'normal');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'class' => $builder->build(),
    'role' => 'option',
    'data-spire-select-value' => $value,
    'data-spire-select-label' => $displayLabel,
    'data-spire-select-disabled' => $disabled ? 'true' : null,
]);
@endphp

<div
    {{ $mergedAttributes }}
    @click="if ($el.dataset.spireSelectDisabled !== 'true') { selectOption($el.dataset.spireSelectValue, $el.dataset.spireSelectLabel) }"
    :class="{ 'bg-primary/10': isSelected($el.dataset.spireSelectValue) }"
    :aria-selected="isSelected($el.dataset.spireSelectValue)"
>
    <span class="flex-1">{{ $slot }}</span>

    <x-spire::icon
        name="check"
        class="w-4 h-4 text-primary shrink-0"
        x-show="isSelected($el.dataset.spireSelectValue)"
        x-cloak
    />
</div>
