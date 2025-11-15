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

    $buttonSizes = [
        'sm' => 'sm',
        'md' => 'sm',
        'lg' => 'sm',
    ];
    $buttonSize = $buttonSizes[$size] ?? $buttonSizes['md'];

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
        'class' => ComponentStyles::inputContainerBase(),
    ]);

    $inputBoxClasses = ComponentStyles::buildClassString([
        ComponentStyles::inputBoxBase(),
        ComponentStyles::inputBoxVariant($variant),
        ComponentStyles::inputBoxSize($size),
        ComponentStyles::radiusClasses($radius),
    ]);

    $inputClasses = ComponentStyles::inputBase();

    $inputAttributes = $attributes->except(['class', 'style'])->merge([
        'type' => $viewable ? '' : $type,
        'disabled' => $disabled ? true : null,
        'readonly' => $readonly ? true : null,
        'required' => $required ? true : null,
        'placeholder' => $placeholder,
        'data-spire-input' => 'true',
        'data-spire-variant' => $variant,
        'data-spire-size' => $size,
        'class' => $inputClasses,
    ]);

    if ($viewable) {
        $inputAttributes = $inputAttributes->merge([
            'x-bind:type' => "showPassword ? 'text' : '{$type}'",
        ]);
    }
@endphp

@if($needsAlpineData)
    <div {{ $wrapperAttributes }} x-data="{{ $alpineData }}" x-init="console.log('[INPUT] Component initialized, clearable:', {{ $clearable ? 'true' : 'false' }}); @if($clearable) console.log('[INPUT] Initial inputValue:', inputValue); $watch('inputValue', value => console.log('[INPUT] inputValue changed:', value, 'length:', value?.length, 'shouldShow:', !!(value && value.length > 0))) @endif">
        @else
            <div {{ $wrapperAttributes }}>
                @endif
                <div class="{{ $inputBoxClasses }}">
                    @if($hasLeadingContent)
                        <div class="flex items-center shrink-0">
                            @if(isset($leading))
                                {{ $leading }}
                            @elseif($icon)
                                <x-spire::icon :name="$icon" class="{{ ComponentStyles::inputIconSize($size) }} text-text-muted" />
                            @endif
                        </div>
                    @endif

                    <input {{ $inputAttributes }}
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
                                        :aria-label="__('spire::form.clear')"
                                    >
                                        <x-spire::icon name="x-close" class="{{ ComponentStyles::inputIconSize($size) }}" />
                                    </x-spire::button>
                                @endif

                                @if($viewable)
                                    <x-spire::button
                                        type="button"
                                        variant="ghost"
                                        :size="$buttonSize"
                                        icon-only
                                        @click="showPassword = !showPassword"
                                        x-bind:aria-label="showPassword ? '{{ __('spire::form.hide_password') }}' : '{{ __('spire::form.show_password') }}'"
                                    >
                                        <x-spire::icon x-show="!showPassword" x-cloak name="eye" class="{{ ComponentStyles::inputIconSize($size) }}" />
                                        <x-spire::icon x-show="showPassword" x-cloak name="eye-off" class="{{ ComponentStyles::inputIconSize($size) }}" />
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
                                        <x-spire::icon name="copy-01" class="{{ ComponentStyles::inputIconSize($size) }}" />
                                    </x-spire::button>
                                @endif

                                @if($iconTrailing)
                                    <x-spire::icon :name="$iconTrailing" class="{{ ComponentStyles::inputIconSize($size) }} text-text-muted" />
                                @endif
                            @endif
                        </div>
                    @endif
                </div>
            </div>
