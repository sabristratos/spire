@props([
    'placement' => 'bottom-start',
    'searchPlaceholder' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('icon-picker-content')
    ->addClass('spire-overlay')
    ->addClass('spire-overlay--padded-sm')
    ->addClass('animate-dropdown-bounce');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'data-placement' => $placement,
    'popover' => 'auto',
    'class' => $builder->build(),
    'role' => 'listbox',
    'aria-label' => __('spire::spire-ui.icon-picker.aria_label'),
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
    :aria-activedescendant="highlightedIndex >= 0 ? $id('icon-' + highlightedIndex) : null"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    {{-- Live region for screen reader announcements --}}
    <div class="sr-only" aria-live="polite" aria-atomic="true">
        <span x-text="filteredIcons.length + ' {{ __('spire::spire-ui.icon-picker.results_available') }}'"></span>
    </div>

    <div class="max-h-60 flex flex-col overflow-hidden">
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

        <div class="spire-select-options flex-1 min-h-0">
            <div x-show="isLoading" class="flex items-center justify-center p-8">
                <x-spire::spinner size="md" />
            </div>

            <div x-show="!isLoading" class="grid grid-cols-6 gap-1 p-2 pt-0" x-ref="iconsGrid">
                <template x-for="(icon, index) in filteredIcons" :key="icon">
                    <button
                        type="button"
                        class="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
                        :class="{
                            'bg-primary/10 ring-2 ring-primary': selectedIcon === icon,
                            'bg-hover': highlightedIndex === index && selectedIcon !== icon
                        }"
                        @click="selectIcon(icon)"
                        role="option"
                        :id="$id('icon-' + index)"
                        :aria-selected="selectedIcon === icon"
                        :title="icon"
                        :data-icon-name="icon"
                        x-html="getIconHtml(icon)"
                    >
                    </button>
                </template>
            </div>

            <div x-show="!isLoading && filteredIcons.length === 0 && searchQuery" class="spire-select-empty">
                {{ __('spire::spire-ui.icon-picker.no_results') }}
            </div>
        </div>
    </div>
</div>
