@props([
    'defaultCountry' => spire_default('phone-input', 'defaultCountry', 'us'),
    'placeholder' => null,
    'placement' => 'bottom-start',
    'size' => spire_default('phone-input', 'size', 'md'),
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => spire_default('phone-input', 'radius', 'md'),
    'disabled' => false,
    'required' => false,
    'preferredCountries' => [],
    'showDialCode' => true,
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.phone-input.placeholder');
$searchPlaceholderText = __('spire::spire-ui.phone-input.search_placeholder');
$noResultsText = __('spire::spire-ui.phone-input.no_results');

// Load country data
$countries = spire_phone_countries();
$countriesJson = json_encode($countries);
$preferredCountriesJson = json_encode($preferredCountries);

// Main container builder
$containerBuilder = ComponentClass::make('phone-input');
if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

// Box wrapper builder (unified border/focus like input-box)
$boxBuilder = ComponentClass::make('phone-input-box')
    ->extends('input-box')
    ->size($size)
    ->colorVariant($color, $variant)
    ->radius($radius);
@endphp

<div
    x-data="spirePhoneInput({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        defaultCountry: '{{ $defaultCountry }}',
        countries: {{ $countriesJson }},
        preferredCountries: {{ $preferredCountriesJson }}
    })"
    {{ $attributes->except(['class'])->merge(['class' => $containerBuilder->build(), ...$containerBuilder->getDataAttributes()]) }}
    {{ WireEntangle::filteredAttributes($attributes) }}
>

    <div wire:ignore class="w-full">
        <div
            x-id="['phone-popover']"
            class="relative w-full"
        >
            {{-- Unified box wrapper --}}
            <div class="{{ $boxBuilder->build() }}" x-ref="trigger" {!! collect($boxBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}>
                <button
                    type="button"
                    @click="toggle()"
                    class="spire-phone-input-country"
                    :aria-expanded="open"
                    aria-haspopup="listbox"
                    @if($disabled) disabled @endif
                >
                {{-- Flag icon --}}
                <span
                    class="spire-phone-input-flag fi fis"
                    :class="'fi-' + selectedCountryCode"
                ></span>

                @if($showDialCode)
                    <span
                        class="spire-phone-input-dial-code"
                        x-text="selectedCountry?.dialCode || ''"
                    ></span>
                @endif

                {{-- Chevron --}}
                <svg class="spire-phone-input-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
                </button>

                {{-- Vertical separator --}}
                <div class="spire-phone-input-separator"></div>

                {{-- Phone number input --}}
                <input
                    type="tel"
                    x-ref="phoneNumberInput"
                    x-model="phoneNumber"
                    @input="handlePhoneInput($event)"
                    class="spire-phone-input-number"
                    placeholder="{{ $placeholderText }}"
                    @if($disabled) disabled @endif
                    @if($required) required @endif
                >
            </div>

            {{-- Dropdown content --}}
            <div
                :id="$id('phone-popover')"
                x-ref="content"
                popover="auto"
                class="spire-overlay spire-phone-input-dropdown animate-dropdown-bounce"
                data-placement="{{ $placement }}"
                data-spire-phone-input-dropdown
                @toggle="handleToggle"
                @keydown.arrow-down.prevent="handleArrowDown"
                @keydown.arrow-up.prevent="handleArrowUp"
                @keydown.enter.prevent="selectHighlighted"
                @keydown.escape="hide"
                @keydown.home.prevent="handleHome"
                @keydown.end.prevent="handleEnd"
                role="listbox"
                tabindex="-1"
                :aria-activedescendant="highlightedIndex >= 0 ? $id('phone-option-' + highlightedIndex) : null"
            >
                {{-- Search input --}}
                <div class="spire-phone-input-search">
                    <input
                        type="text"
                        x-ref="searchInput"
                        x-model="searchQuery"
                        class="spire-phone-input-search-input"
                        placeholder="{{ $searchPlaceholderText }}"
                        autocomplete="off"
                        @keydown.arrow-down.prevent="handleArrowDown"
                        @keydown.arrow-up.prevent="handleArrowUp"
                        @keydown.enter.prevent="selectHighlighted"
                        @keydown.escape="searchQuery ? searchQuery = '' : hide()"
                    >
                </div>

                {{-- Country list with virtual scrolling --}}
                <div
                    class="spire-phone-input-list"
                    style="height: 280px;"
                    @scroll="handleScroll"
                >
                    <div
                        class="spire-phone-input-virtual"
                        :style="{
                            height: totalHeight + 'px',
                            paddingTop: paddingTop + 'px',
                            paddingBottom: paddingBottom + 'px'
                        }"
                    >
                        <template x-for="(country, index) in visibleCountries" :key="country.code">
                            <div
                                class="spire-phone-input-option"
                                :class="{
                                    'spire-phone-input-option--highlighted': highlightedIndex === (visibleStart + index),
                                    'spire-phone-input-option--selected': selectedCountryCode === country.code
                                }"
                                @click="selectCountryByCode(country.code)"
                                role="option"
                                :id="$id('phone-option-' + (visibleStart + index))"
                                :aria-selected="selectedCountryCode === country.code"
                                :data-spire-phone-country-code="country.code"
                            >
                                <span
                                    class="spire-phone-input-option-flag fi fis"
                                    :class="'fi-' + country.code"
                                ></span>
                                <span class="spire-phone-input-option-name" x-text="country.name"></span>
                                <span class="spire-phone-input-option-dial-code" x-text="country.dialCode"></span>
                            </div>
                        </template>

                        {{-- Empty state --}}
                        <div
                            x-show="filteredCountries.length === 0"
                            class="spire-phone-input-empty"
                        >
                            {{ $noResultsText }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
