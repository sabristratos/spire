@props([
    'variant' => spire_default('input', 'variant', spire_default('input', 'input-variant', 'bordered')),
    'color' => 'default',
    'size' => spire_default('input', 'size', 'md'),
    'radius' => spire_default('input', 'radius', 'md'),
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
    'invalid' => false,
    'errorId' => null,
    'describedBy' => null,
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

    $containerBuilder = ComponentClass::make('input-container');
    if ($customClass = $attributes->get('class')) {
        $containerBuilder->addClass($customClass);
    }

    $mergedAttributes = [
        'class' => $containerBuilder->build(),
    ];

    if ($customStyle = $attributes->get('style')) {
        $mergedAttributes['style'] = $customStyle;
    }

    $wrapperAttributes = $attributes->only(['class', 'style'])->merge($mergedAttributes);

    $inputBoxBuilder = ComponentClass::make('input-box')
        ->modifier($variant)
        ->modifier($size)
        ->radius($radius)
        ->when($hasTrailingContent, fn($b) => $b->modifier('has-trailing'));

    $inputBoxClasses = $inputBoxBuilder->build();

    $inputBuilder = ComponentClass::make('input')
        ->dataAttribute('input', 'true')
        ->dataAttribute('variant', $variant)
        ->dataAttribute('size', $size);

    $ariaDescriptions = array_filter([$describedBy, $errorId]);
    $ariaDescribedBy = !empty($ariaDescriptions) ? implode(' ', $ariaDescriptions) : null;

    $inputAttributes = $attributes->except(['class', 'style'])->merge([
        'type' => $viewable ? '' : $type,
        'disabled' => $disabled ? true : null,
        'readonly' => $readonly ? true : null,
        'required' => $required ? true : null,
        'placeholder' => $placeholder,
        'class' => $inputBuilder->build(),
        'aria-invalid' => $invalid ? 'true' : null,
        'aria-errormessage' => $invalid && $errorId ? $errorId : null,
        'aria-describedby' => $ariaDescribedBy,
        ...$inputBuilder->getDataAttributes(),
    ]);

    if ($viewable) {
        $inputAttributes = $inputAttributes->merge([
            'x-bind:type' => "showPassword ? 'text' : '{$type}'",
        ]);
    }
@endphp

<div {{ $wrapperAttributes }}
    @if($needsAlpineData)
        x-data="spireInput({
            clearable: {{ $clearable ? 'true' : 'false' }},
            viewable: {{ $viewable ? 'true' : 'false' }},
            copyable: {{ $copyable ? 'true' : 'false' }},
            @if($attributes->wire('model')->value())
                wire: true
            @endif
        })"
    @endif
>
                <div class="{{ $inputBoxClasses }}">
                    @if($hasLeadingContent)
                        <div class="flex items-center shrink-0">
                            @if($icon)
                                <x-spire::icon :name="$icon" class="{{ $iconSizeClass }} text-muted" />
                            @endif
                            @if(isset($leading))
                                {{ $leading }}
                            @endif
                        </div>
                    @endif

                    <input {{ $inputAttributes }}
                           x-ref="input"
                           @if($clearable)
                               @input="handleInput($event)"
                           x-init="inputValue = $el.value"
                        @endif
                    />

                    @if($hasTrailingContent)
                        <div class="flex items-center shrink-0">
                            @if(isset($trailing))
                                {{ $trailing }}
                            @endif

                            @if($clearable)
                                <x-spire::button
                                    type="button"
                                    variant="ghost"
                                    :size="$buttonSize"
                                    icon-only
                                    x-show="hasValue"
                                    x-cloak
                                    @click="clearInput()"
                                    :aria-label="__('spire::form.clear')"
                                >
                                    <x-spire::icon name="x" class="{{ $iconSizeClass }}" />
                                </x-spire::button>
                            @endif

                            @if($viewable)
                                <x-spire::button
                                    type="button"
                                    variant="ghost"
                                    :size="$buttonSize"
                                    icon-only
                                    @click="togglePasswordVisibility()"
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
                                    @click="copyToClipboard()"
                                    aria-label="Copy to clipboard"
                                >
                                    <x-spire::icon name="copy" class="{{ $iconSizeClass }}" />
                                </x-spire::button>
                            @endif

                            @if($iconTrailing)
                                <x-spire::icon :name="$iconTrailing" class="{{ $iconSizeClass }} text-muted" />
                            @endif
                        </div>
                    @endif
                </div>
            </div>
