@props([
    'multiple' => false,
    'placement' => 'bottom-start',
    'width' => 'auto',
    'searchable' => false,
    'searchPlaceholder' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('select-content')
    ->addClass('spire-overlay')
    ->addClass('spire-overlay--padded-sm')
    ->addClass('animate-dropdown-bounce');

// Width variants using shared overlay system
$widthClass = match($width) {
    'sm' => 'spire-overlay--sm',
    'md' => 'spire-overlay--md',
    'lg' => 'spire-overlay--lg',
    'xl' => 'spire-overlay--xl',
    'full' => 'spire-overlay--full',
    'auto' => 'spire-overlay--anchor',
    default => 'spire-overlay--md',
};
$builder->addClass($widthClass);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'data-placement' => $placement,
    'data-spire-select-content' => true,
    'popover' => 'auto',
    'class' => $builder->build(),
    'role' => 'listbox',
    'aria-multiselectable' => $multiple ? 'true' : 'false',
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    @keydown.arrow-down.prevent="highlightNext"
    @keydown.arrow-up.prevent="highlightPrev"
    @keydown.enter.prevent="selectHighlighted"
    @keydown.escape="hide"
    @keydown.home.prevent="highlightFirst"
    @keydown.end.prevent="highlightLast"
    :aria-activedescendant="highlightedIndex >= 0 ? $id('option-' + highlightedIndex) : null"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    {{-- Live region for screen reader announcements --}}
    <div class="sr-only" aria-live="polite" aria-atomic="true">
        <span x-text="filteredOptions.length + ' {{ __('spire::spire-ui.select.results_available') }}'"></span>
    </div>

    @if($slot->isNotEmpty())
        {{ $slot }}
    @else
        <div class="max-h-60 flex flex-col overflow-hidden">
            @if($multiple)
                {{-- Multiselect controls header --}}
                <div class="spire-select-actions" x-show="displayOptions.length > 0">
                    <span class="text-xs text-muted" x-text="selectedValues.length + ' / ' + selectableOptions.length + ' {{ __('spire::spire-ui.select.selected') }}'"></span>

                    <div class="flex items-center gap-1">
                        <button
                            type="button"
                            @click="selectAll"
                            class="px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 rounded transition-colors"
                            :disabled="allSelected"
                            :class="{ 'opacity-50 cursor-not-allowed': allSelected }"
                            x-text="selectAllText"
                        ></button>

                        <span class="text-muted">|</span>

                        <button
                            type="button"
                            @click="clearAll"
                            class="px-2 py-1 text-xs font-medium text-muted hover:bg-hover rounded transition-colors"
                            :disabled="selectedValues.length === 0"
                            :class="{ 'opacity-50 cursor-not-allowed': selectedValues.length === 0 }"
                            x-text="clearAllText"
                        ></button>
                    </div>
                </div>
            @endif

            @if($searchable)
                <div class="p-2" x-ref="searchInputWrapper">
                    <x-spire::input
                        x-model="searchQuery"
                        type="text"
                        size="sm"
                        :placeholder="$searchPlaceholder"
                        clearable
                        @keydown.arrow-down.prevent="highlightNext"
                        @keydown.arrow-up.prevent="highlightPrev"
                        @keydown.enter.prevent="selectHighlighted"
                        @keydown.escape="searchQuery ? searchQuery = '' : hide()"
                    />
                </div>
            @endif

            <div class="spire-select-options flex-1 min-h-0">
                {{-- WARNING: x-html renders raw HTML from slot content. Ensure option content is trusted to prevent XSS. --}}
                <template x-for="(option, index) in filteredOptions" :key="option.value">
                <div
                    class="spire-select-option spire-select-option--normal"
                    :class="{
                        'spire-select-option--selected': isSelected(option.value),
                        'bg-hover': highlightedIndex === index && !isSelected(option.value),
                        'spire-select-option--disabled': option.disabled || (multiple && isMaxReached && !isSelected(option.value))
                    }"
                    @click="if (!option.disabled && !(multiple && isMaxReached && !isSelected(option.value))) { selectOption(option.value, option.label) }"
                    role="option"
                    :id="$id('option-' + index)"
                    :aria-selected="isSelected(option.value)"
                    :aria-disabled="option.disabled || (multiple && isMaxReached && !isSelected(option.value))"
                >
                    <span class="flex-1" x-html="option.html"></span>

                    <x-spire::icon
                        name="check"
                        class="w-4 h-4 text-primary shrink-0"
                        x-show="isSelected(option.value)"
                        x-cloak
                    />
                </div>
            </template>

            <div x-show="filteredOptions.length === 0 && !searchQuery" class="spire-select-empty">
                {{ __('spire::spire-ui.select.no_options') }}
            </div>

                <div x-show="filteredOptions.length === 0 && searchQuery" class="spire-select-empty">
                    {{ __('spire::spire-ui.select.no_results') }}
                </div>
            </div>
        </div>
    @endif
</div>
