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
    use SpireUI\Support\ComponentClass;

    $buttonSizes = [
        'sm' => 'sm',
        'md' => 'sm',
        'lg' => 'sm',
    ];
    $buttonSize = $buttonSizes[$size] ?? $buttonSizes['md'];

    $iconSizeClasses = [
        'sm' => 'spire-input-icon--sm',
        'md' => 'spire-input-icon--md',
        'lg' => 'spire-input-icon--lg',
    ];
    $iconSizeClass = $iconSizeClasses[$size] ?? $iconSizeClasses['md'];

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

    $containerBuilder = ComponentClass::make('input-container');
    if ($customClass = $attributes->get('class')) {
        $containerBuilder->addClass($customClass);
    }
    if ($customStyle = $attributes->get('style')) {
        $containerBuilder->addClass($customStyle);
    }

    $wrapperAttributes = $attributes->only(['class', 'style'])->merge([
        'class' => $containerBuilder->build(),
    ]);

    $inputBoxBuilder = ComponentClass::make('input-box')
        ->modifier($variant)
        ->modifier($size)
        ->radius($radius);

    $inputBoxClasses = $inputBoxBuilder->build();

    $inputClasses = 'spire-input';

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
    <div {{ $wrapperAttributes }} x-data="{{ $alpineData }}">
        @else
            <div {{ $wrapperAttributes }}>
                @endif
                <div class="{{ $inputBoxClasses }}">
                    @if($hasLeadingContent)
                        <div class="flex items-center shrink-0">
                            @if(isset($leading))
                                {{ $leading }}
                            @elseif($icon)
                                <x-spire::icon :name="$icon" class="{{ $iconSizeClass }} text-text-muted" />
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
                        @if(isset($trailing))
                            {{ $trailing }}
                        @else
                            <div class="flex items-center shrink-0">
                                @if($clearable)
                                    <x-spire::button
                                        type="button"
                                        variant="ghost"
                                        :size="$buttonSize"
                                        icon-only
                                        x-show="inputValue && inputValue.length > 0"
                                        x-cloak
                                        @click="inputValue = ''; $refs.input.value = ''; $refs.input.dispatchEvent(new Event('input')); $dispatch('input-cleared'); $refs.input.focus()"
                                        :aria-label="__('spire::form.clear')"
                                    >
                                        <x-spire::icon name="x-close" class="{{ $iconSizeClass }}" />
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
                                        <x-spire::icon x-show="!showPassword" x-cloak name="eye" class="{{ $iconSizeClass }}" />
                                        <x-spire::icon x-show="showPassword" x-cloak name="eye-off" class="{{ $iconSizeClass }}" />
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
                                        <x-spire::icon name="copy-01" class="{{ $iconSizeClass }}" />
                                    </x-spire::button>
                                @endif

                                @if($iconTrailing)
                                    <x-spire::icon :name="$iconTrailing" class="{{ $iconSizeClass }} text-text-muted" />
                                @endif
                            </div>
                        @endif
                    @endif
                </div>
            </div>
