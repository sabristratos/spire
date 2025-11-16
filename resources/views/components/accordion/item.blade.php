@props([
    'title' => null,
    'subtitle' => null,
    'isDisabled' => false,
    'hideIcon' => false,
    'icon' => 'chevron-down',
    'isOpen' => false,
    'index' => null,
])

@php
use SpireUI\Support\ComponentClass;

$itemId = 'accordion-item-' . uniqid();
$buttonId = $itemId . '-button';
$contentId = $itemId . '-content';

$parentSize = 'md';

$buttonBuilder = ComponentClass::make('accordion-button')
    ->modifier($isDisabled ? 'disabled' : 'normal')
    ->modifier($parentSize);

$contentBuilder = ComponentClass::make('accordion-content')
    ->modifier($parentSize);

$mergedAttributes = $attributes->merge([
    'data-spire-accordion-item' => 'true',
    'data-spire-disabled' => $isDisabled ? 'true' : null,
]);

@endphp

<div {{ $mergedAttributes }}
    x-data="{
        open: {{ $isOpen ? 'true' : 'false' }},
        allowMultiple: false,
        init() {
            const parent = this.$el.closest('[data-spire-accordion]');
            this.allowMultiple = parent?.getAttribute('data-spire-allow-multiple') === 'true';

            const defaultOpenJson = parent?.getAttribute('data-spire-default-open');
            if (defaultOpenJson) {
                try {
                    const defaultOpenArray = JSON.parse(defaultOpenJson);
                    if (defaultOpenArray.includes({{ $index }})) {
                        this.open = true;
                    }
                } catch (e) {}
            }
        }
    }"
    role="region">
    <button
        type="button"
        id="{{ $buttonId }}"
        class="{{ $buttonBuilder->build() }}"
        @if(!$isDisabled)
            x-on:click="allowMultiple ? (open = !open) : (openItem = (openItem === {{ $index }}) ? null : {{ $index }})"
        @endif
        x-bind:aria-expanded="allowMultiple ? open : (openItem === {{ $index }})"
        aria-controls="{{ $contentId }}"
        {{ $isDisabled ? 'disabled' : '' }}
        data-spire-accordion-trigger="true"
    >
        <div class="flex-1 flex items-start gap-3">
            @if(isset($startContent))
                <div class="shrink-0">
                    {{ $startContent }}
                </div>
            @endif

            <div class="flex-1">
                @if($title || isset($titleSlot))
                    <div class="font-semibold text-text">
                        {{ $titleSlot ?? $title }}
                    </div>
                @endif

                @if($subtitle || isset($subtitleSlot))
                    <div class="text-sm text-text-muted mt-1">
                        {{ $subtitleSlot ?? $subtitle }}
                    </div>
                @endif
            </div>
        </div>

        @if(!$hideIcon)
            <div class="shrink-0 ml-3">
                @if(isset($endContent))
                    {{ $endContent }}
                @else
                    <x-spire::icon
                        name="{{ $icon }}"
                        class="w-5 h-5 text-text-muted transition-transform duration-300 ease-out"
                        x-bind:class="{ 'rotate-180': allowMultiple ? open : (openItem === {{ $index}}) }"
                    />
                @endif
            </div>
        @endif
    </button>

    <div
        id="{{ $contentId }}"
        role="region"
        aria-labelledby="{{ $buttonId }}"
        x-show="allowMultiple ? open : (openItem === {{ $index }})"
        x-collapse.duration.300ms
        data-spire-accordion-content="true"
    >
        <div class="{{ $contentBuilder->build() }}">
            {{ $slot }}
        </div>
    </div>
</div>
