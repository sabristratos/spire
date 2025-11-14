@props([
    'placement' => 'bottom-start',
    'width' => 'auto',
    'highlightMatches' => true,
])

@php
use SpireUI\Support\ComponentStyles;

$widthClasses = [
    'auto' => 'w-[anchor-size(width)]',
    'sm' => 'min-w-[12rem]',
    'md' => 'min-w-[14rem]',
    'lg' => 'min-w-[16rem]',
    'xl' => 'min-w-[20rem]',
    'full' => 'w-full',
];

$baseClasses = 'animate-dropdown-bounce bg-surface border border-border rounded-lg shadow-lg';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $widthClasses[$width] ?? $widthClasses['auto'],
]);

$mergedAttributes = $attributes->merge([
    'data-placement' => $placement,
    'data-spire-autocomplete-content' => true,
    'popover' => 'manual',
    'class' => $classString,
    'role' => 'listbox',
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    :aria-activedescendant="highlightedIndex >= 0 ? $id('option-' + highlightedIndex) : null"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    @if($slot->isNotEmpty())
        {{ $slot }}
    @else
        <div class="max-h-[400px] flex flex-col overflow-hidden">
            <div class="flex-1 min-h-0 overflow-y-auto p-1 space-y-1">
                <template x-for="(option, index) in filteredOptions" :key="option.value">
                    <div
                        class="flex items-center gap-3 w-full px-3 py-1.5 text-sm transition-colors rounded-md cursor-pointer text-text hover:bg-hover"
                        :class="{
                            'bg-hover': highlightedIndex === index,
                            'text-text-disabled cursor-not-allowed opacity-50': option.disabled
                        }"
                        @click="if (!option.disabled) { selectOption(option.value, option.label) }"
                        role="option"
                        :id="$id('option-' + index)"
                        :aria-selected="value === option.value"
                        :aria-disabled="option.disabled"
                    >
                        <span class="flex-1" x-html="option.highlightedHtml || option.html"></span>
                    </div>
                </template>

                <div x-show="filteredOptions.length === 0 && inputValue.length >= minChars" class="px-3 py-8 text-center text-sm text-text-muted">
                    {{ __('spire::spire-ui.autocomplete.no_results') }}
                </div>

                <div x-show="inputValue.length > 0 && inputValue.length < minChars" class="px-3 py-4 text-center text-xs text-text-muted">
                    {{ __('spire::spire-ui.autocomplete.min_chars_message', ['count' => ':minChars']) }}
                </div>
            </div>
        </div>
    @endif
</div>
