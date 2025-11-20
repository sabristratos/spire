@props([
    'title' => null,
    'description' => null,
    'icon' => null,
    'iconSize' => 'lg',
    'color' => 'default',
    'variant' => 'default',
    'radius' => 'lg',
    'hideIcon' => false,
    'loading' => false,
])

@php
use SpireUI\Support\ComponentClass;

    // Icon size mapping
    $iconSizeClasses = [
        'sm' => 'w-8 h-8',
        'md' => 'w-12 h-12',
        'lg' => 'w-16 h-16',
        'xl' => 'w-24 h-24',
    ];

    $iconClass = $iconSizeClasses[$iconSize] ?? $iconSizeClasses['lg'];

    // Build component classes using ComponentClass
    $builder = ComponentClass::make('empty-state')
        ->color($color)
        ->variant($variant)
        ->radius($radius)
        ->dataAttribute('loading', $loading ? 'true' : 'false');

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
        'role' => 'status',
        'aria-live' => 'polite',
    ]);

    // Default title and description
    $defaultTitle = $title ?? __('spire::spire-ui.empty_state.default_title');
    $defaultDescription = $description ?? __('spire::spire-ui.empty_state.default_description');
@endphp

<div {{ $mergedAttributes }}>
    @if($loading)
        {{-- Loading State --}}
        <div class="spire-empty-state__loading">
            <div class="spire-empty-state__loading-icon animate-pulse">
                <div class="spire-empty-state__loading-circle"></div>
            </div>
            <div class="spire-empty-state__loading-text animate-pulse">
                <div class="spire-empty-state__loading-title"></div>
                <div class="spire-empty-state__loading-description"></div>
            </div>
        </div>
    @else
        {{-- Icon/Illustration Section --}}
        @if(!$hideIcon)
            <div class="spire-empty-state__icon" data-icon-size="{{ $iconSize }}">
                @if(isset($illustration))
                    {{-- Custom illustration slot --}}
                    <div class="spire-empty-state__illustration">
                        {{ $illustration }}
                    </div>
                @elseif($icon)
                    {{-- Icon from name or slot --}}
                    @if(is_string($icon))
                        <x-spire::icon :name="$icon" :class="$iconClass" />
                    @else
                        {{ $icon }}
                    @endif
                @else
                    {{-- Default icon --}}
                    <x-spire::icon name="inbox" :class="$iconClass" />
                @endif
            </div>
        @endif

        {{-- Content Section --}}
        <div class="spire-empty-state__content">
            {{-- Title --}}
            @if(isset($titleSlot) || $title)
                <div class="spire-empty-state__title">
                    {{ $titleSlot ?? $defaultTitle }}
                </div>
            @endif

            {{-- Description --}}
            @if(isset($descriptionSlot) || $description)
                <div class="spire-empty-state__description">
                    {{ $descriptionSlot ?? $defaultDescription }}
                </div>
            @endif

            {{-- Default slot for custom content --}}
            @if(isset($slot) && !$slot->isEmpty() && !isset($titleSlot) && !isset($descriptionSlot))
                {{ $slot }}
            @endif
        </div>

        {{-- Actions Section --}}
        @if(isset($actions))
            <div class="spire-empty-state__actions">
                {{ $actions }}
            </div>
        @endif
    @endif
</div>
