@props([
    'title' => null,
    'description' => null,
    'color' => 'default',
    'variant' => 'flat',
    'radius' => 'md',
    'closable' => false,
    'hideIcon' => false,
    'icon' => null,
])

@php
use SpireUI\Support\ComponentClass;

    $defaultIcons = [
        'default' => 'info',
        'primary' => 'info',
        'secondary' => 'info',
        'success' => 'check-circle',
        'error' => 'alert-circle',
        'warning' => 'alert-triangle',
        'info' => 'info',
    ];

    $iconName = $icon ?? $defaultIcons[$color];

    $builder = ComponentClass::make('alert')
        ->colorVariant($color, $variant)
        ->radius($radius)
        ->dataAttribute('closable', $closable ? 'true' : 'false');

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
        'role' => 'alert',
        'aria-live' => 'polite',
    ]);
@endphp

<div
    {{ $mergedAttributes }}
    @if($closable)
        x-data="{ visible: true }"
        x-show="visible"
        x-cloak
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
    @endif
>
    @if(isset($startContent))
        <div class="shrink-0">
            {{ $startContent }}
        </div>
    @endif

    @if(!$hideIcon)
        <div class="flex shrink-0">
            @if(isset($icon) && is_string($icon))
                <x-spire::icon :name="$iconName" class="w-5 h-5" />
            @elseif(isset($icon))
                {{ $icon }}
            @else
                <x-spire::icon :name="$iconName" class="w-5 h-5" />
            @endif
        </div>
    @endif

    <div class="flex-1 min-w-0">
        @if($title)
            <div class="font-semibold text-sm mb-1">
                {{ $title }}
            </div>
        @endif

        @if($description || $slot->isNotEmpty())
            <div class="text-sm opacity-90">
                {{ $description ?? $slot }}
            </div>
        @endif
    </div>

    @if(isset($endContent))
        <div class="shrink-0">
            {{ $endContent }}
        </div>
    @endif

    @if($closable)
        <button
            type="button"
            @click="visible = false"
            class="shrink-0 p-0.5 -mt-0.5 -mr-0.5 rounded opacity-70 hover:opacity-100 transition-opacity"
            aria-label="{{ __('spire::spire-ui.alert.close') }}"
        >
            <x-spire::icon name="x" class="w-4 h-4" />
        </button>
    @endif
</div>
