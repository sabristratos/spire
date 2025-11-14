@props([
    'variant' => 'bordered',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'md',
    'type' => 'text',
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'placeholder' => null,
    'icon' => null,
    'iconTrailing' => null,
    'clearable' => false,
    'viewable' => false,
    'copyable' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'flex items-center gap-2 transition-fast';

$sizeClasses = [
    'sm' => 'h-8 px-2 text-sm',
    'md' => 'h-10 px-2 text-base',
    'lg' => 'h-12 px-2 text-lg',
];

$iconSizes = [
    'sm' => 'w-4 h-4',
    'md' => 'w-4 h-4',
    'lg' => 'w-5 h-5',
];

$buttonSizes = [
    'sm' => 'sm',
    'md' => 'sm',
    'lg' => 'sm',
];

$iconSize = $iconSizes[$size] ?? $iconSizes['md'];
$buttonSize = $buttonSizes[$size] ?? $buttonSizes['md'];

$variantKey = "input-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$conditionalClasses = [];

if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}

if ($readonly) {
    $conditionalClasses[] = 'cursor-default';
}

$containerClassString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
    ...$conditionalClasses,
]);

$wrapperBaseClasses = ComponentStyles::buildClassString([
    'w-full',
    'transition-fast',
    'has-[:disabled]:bg-surface-subtle',
    'has-[:disabled]:cursor-not-allowed',
]);

$hasLeadingContent = isset($leading) || $icon;
$hasTrailingContent = isset($trailing) || $iconTrailing || $clearable || $viewable || $copyable;

$needsAlpineData = $clearable || $viewable || $copyable;
$alpineDataParts = [];

if ($clearable) {
    $alpineDataParts[] = 'inputValue: \'\'';
}

if ($viewable) {
    $alpineDataParts[] = 'showPassword: false';
}

$alpineData = !empty($alpineDataParts) ? '{ ' . implode(', ', $alpineDataParts) . ' }' : '{}';

$wrapperAttributes = $attributes->only(['class', 'style'])->merge([
    'class' => $wrapperBaseClasses,
]);

$inputAttributes = $attributes->except(['class', 'style'])->merge([
    'type' => $viewable ? '' : $type,
    'disabled' => $disabled ? true : null,
    'readonly' => $readonly ? true : null,
    'required' => $required ? true : null,
    'placeholder' => $placeholder,
    'data-spire-input' => 'true',
    'data-spire-variant' => $variant,
    'data-spire-size' => $size,
]);

if ($viewable) {
    $inputAttributes = $inputAttributes->merge([
        'x-bind:type' => "showPassword ? 'text' : '{$type}'",
    ]);
}
@endphp

@if($needsAlpineData)
    <div {{ $wrapperAttributes }} x-data="{{ $alpineData }}" x-init="console.log('[INPUT] Component initialized, clearable:', {{ $clearable ? 'true' : 'false' }}); console.log('[INPUT] Initial inputValue:', inputValue); $watch('inputValue', value => console.log('[INPUT] inputValue changed:', value, 'length:', value?.length, 'shouldShow:', !!(value && value.length > 0)))">
@else
    <div {{ $wrapperAttributes }}>
@endif
    <div class="{{ $containerClassString }}">
        @if($hasLeadingContent)
            <div class="flex items-center shrink-0">
                @if(isset($leading))
                    {{ $leading }}
                @elseif($icon)
                    <x-spire::icon :name="$icon" class="{{ $iconSize }} text-text-muted" />
                @endif
            </div>
        @endif

        <input {{ $inputAttributes->except(['class'])->merge([
            'class' => 'flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-text placeholder:text-text-muted disabled:text-text-disabled disabled:cursor-not-allowed min-w-0'
        ]) }}
            x-ref="input"
            @if($clearable)
                @input="inputValue = $event.target.value; $dispatch('input-change', { value: $event.target.value })"
                x-init="inputValue = $el.value"
            @endif
        />

        @if($hasTrailingContent)
            <div class="flex items-center shrink-0 gap-2">
                @if(isset($trailing))
                    {{ $trailing }}
                @else
                    @if($clearable)
                        <x-spire::button
                            type="button"
                            variant="ghost"
                            :size="$buttonSize"
                            icon-only
                            x-show="inputValue && inputValue.length > 0"
                            x-init="console.log('[INPUT CLEAR] Clear button initialized', { inputValue, show: inputValue && inputValue.length > 0 })"
                            x-effect="console.log('[INPUT CLEAR] x-show evaluated:', { inputValue, length: inputValue?.length, show: inputValue && inputValue.length > 0 })"
                            x-cloak
                            @click="console.log('[INPUT CLEAR] Clear button clicked'); inputValue = ''; $refs.input.value = ''; $refs.input.dispatchEvent(new Event('input')); $dispatch('input-cleared'); $refs.input.focus()"
                            :aria-label="__('spire::spire-ui.form.clear')"
                        >
                            <x-spire::icon name="x-close" class="{{ $iconSize }}" />
                        </x-spire::button>
                    @endif

                    @if($viewable)
                        <x-spire::button
                            type="button"
                            variant="ghost"
                            :size="$buttonSize"
                            icon-only
                            @click="showPassword = !showPassword"
                            x-bind:aria-label="showPassword ? '{{ __('spire::spire-ui.form.hide_password') }}' : '{{ __('spire::spire-ui.form.show_password') }}'"
                        >
                            <x-spire::icon x-show="!showPassword" x-cloak name="eye" class="{{ $iconSize }}" />
                            <x-spire::icon x-show="showPassword" x-cloak name="eye-off" class="{{ $iconSize }}" />
                        </x-spire::button>
                    @endif

                    @if($copyable)
                        <x-spire::button
                            type="button"
                            variant="ghost"
                            :size="$buttonSize"
                            icon-only
                            @click="navigator.clipboard.writeText($refs.input.value); $dispatch('copied')"
                            aria-label="Copy to clipboard"
                        >
                            <x-spire::icon name="copy-01" class="{{ $iconSize }}" />
                        </x-spire::button>
                    @endif

                    @if($iconTrailing)
                        <x-spire::icon :name="$iconTrailing" class="{{ $iconSize }} text-text-muted" />
                    @endif
                @endif
            </div>
        @endif
    </div>
</div>
