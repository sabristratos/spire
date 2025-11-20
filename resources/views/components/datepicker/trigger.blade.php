@props([
    'size' => spire_default('datepicker', 'size', 'md'),
    'variant' => 'bordered',
    'radius' => spire_default('datepicker', 'radius', 'md'),
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'error' => false,
    'mode' => 'single',
])

@php
use SpireUI\Support\ComponentClass;

$containerBuilder = ComponentClass::make('datepicker__container');

$boxBuilder = ComponentClass::make('datepicker__box')
    ->size($size)
    ->variant($variant)
    ->radius($radius)
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($error, fn($b) => $b->modifier('error'))
    ->when($readonly, fn($b) => $b->modifier('readonly'))
    ->modifier($mode)
    ->modifier('has-trailing');

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$wrapperAttributes = $attributes->only(['class', 'style'])->merge([
    'class' => $containerBuilder->build(),
]);

$boxAttributes = $attributes->except(['class', 'style'])->merge([
    'class' => $boxBuilder->build(),
    'aria-haspopup' => 'dialog',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
    ...$boxBuilder->getDataAttributes(),
]);
@endphp

<div {{ $wrapperAttributes }}>
    <div x-ref="trigger" {{ $boxAttributes }}>
        @if($mode === 'single')
            {{-- Single mode: Segmented inputs --}}
            <div class="spire-datepicker-trigger__segments" data-form-type="other">
                <template x-for="(segment, index) in segmentOrder" :key="segment">
                    <div class="contents">
                        <input
                            type="text"
                            inputmode="numeric"
                            :maxlength="segment === 'year' ? 4 : 2"
                            :placeholder="getSegmentPlaceholders()[segment]"
                            autocomplete="off"
                            data-lpignore="true"
                            data-form-type="other"
                            x-init="$refs[segment + 'Segment'] = $el"
                            x-model="segmentValues[segment]"
                            @input="handleSegmentInput(segment, $event)"
                            @paste.prevent="handleSegmentPaste($event)"
                            @keydown="handleSegmentKeydown(segment, $event)"
                            @focus="focusedSegment = segment; $event.target.select()"
                            :aria-label="segment === 'month' ? '{{ __('spire::spire-ui.datepicker.month') }}' : segment === 'day' ? '{{ __('spire::spire-ui.datepicker.day') }}' : '{{ __('spire::spire-ui.datepicker.year') }}'"
                            :class="segment === 'year' ? 'spire-datepicker-trigger__segment spire-datepicker-trigger__segment--year' : 'spire-datepicker-trigger__segment'"
                            :disabled="@js($disabled)"
                            :readonly="@js($readonly)"
                            :required="@js($required)"
                            :aria-invalid="@js($error)"
                        />

                        <span x-show="index < segmentOrder.length - 1" class="spire-datepicker-trigger__separator" x-text="segmentSeparator"></span>
                    </div>
                </template>
            </div>

            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                icon-only
                class="ml-auto shrink-0 spire-datepicker-trigger__clear-btn"
                x-show="value"
                @click.stop="clearDate()"
                aria-label="{{ __('spire::spire-ui.datepicker.clear') }}"
                :disabled="$disabled"
            >
                <x-spire::icon name="x" class="w-4 h-4" />
            </x-spire::button>

            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                icon-only
                class="shrink-0"
                @click="toggle()"
                :aria-label="__('spire::spire-ui.datepicker.open_picker')"
                :disabled="$disabled"
            >
                <x-spire::icon name="calendar" class="w-4 h-4" />
            </x-spire::button>
        @elseif($mode === 'range')
            {{-- Range mode: Display start and end dates --}}
            <div class="spire-datepicker-trigger__range">
                <div class="spire-datepicker-trigger__range-display">
                    <span
                        x-text="formattedRangeStart || '{{ __('spire::spire-ui.datepicker.start_date') }}'"
                        :class="formattedRangeStart ? 'spire-datepicker-trigger__range-value' : 'spire-datepicker-trigger__range-value spire-datepicker-trigger__range-value--placeholder'"
                    ></span>
                    <span class="spire-datepicker-trigger__range-separator">-</span>
                    <span
                        x-text="formattedRangeEnd || '{{ __('spire::spire-ui.datepicker.end_date') }}'"
                        :class="formattedRangeEnd ? 'spire-datepicker-trigger__range-value' : 'spire-datepicker-trigger__range-value spire-datepicker-trigger__range-value--placeholder'"
                    ></span>
                </div>

                <x-spire::button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon-only
                    class="ml-auto shrink-0 spire-datepicker-trigger__clear-btn"
                    x-show="value && (value.start || value.end)"
                    @click.stop="clearDate()"
                    aria-label="{{ __('spire::spire-ui.datepicker.clear') }}"
                    :disabled="$disabled"
                >
                    <x-spire::icon name="x" class="w-4 h-4" />
                </x-spire::button>

                <x-spire::button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon-only
                    class="shrink-0"
                    @click="toggle()"
                    :aria-label="__('spire::spire-ui.datepicker.open_picker')"
                    :disabled="$disabled"
                >
                    <x-spire::icon name="calendar" class="w-4 h-4" />
                </x-spire::button>
            </div>
        @else
            {{-- Multiple mode: Display chips --}}
            <div class="spire-datepicker-trigger__multiple">
                {{-- Chips display --}}
                <div class="spire-datepicker__chips-container" x-show="selectedCount > 0">
                    <template x-for="(date, index) in selectedDates.slice(0, maxChipsDisplay)" :key="date.value">
                        <span class="spire-datepicker__chip">
                            <span class="spire-datepicker__chip-label" x-text="date.label"></span>
                            <button
                                type="button"
                                @click.stop="removeDate(date.value)"
                                class="spire-datepicker__chip-remove"
                                :aria-label="`{{ __('spire::spire-ui.datepicker.remove_date') }}`.replace(':date', date.label)"
                                {{ $disabled ? 'disabled' : '' }}
                            >
                                <x-spire::icon name="x" class="w-3 h-3" />
                            </button>
                        </span>
                    </template>

                    {{-- Overflow indicator --}}
                    <span
                        x-show="selectedCount > maxChipsDisplay"
                        class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-neutral-200 dark:bg-neutral-700 text-text-muted"
                        x-text="'+ ' + (selectedCount - maxChipsDisplay) + ' more'"
                    ></span>
                </div>

                {{-- Placeholder when empty --}}
                <span x-show="selectedCount === 0" x-text="placeholder" class="spire-datepicker-trigger__multiple-value"></span>

                <div class="spire-datepicker-trigger__multiple-actions">
                    <x-spire::button
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon-only
                        class="shrink-0 spire-datepicker-trigger__clear-btn"
                        x-show="selectedCount > 0"
                        @click.stop="clearDate()"
                        aria-label="{{ __('spire::spire-ui.datepicker.clear') }}"
                        :disabled="$disabled"
                    >
                        <x-spire::icon name="x" class="w-4 h-4" />
                    </x-spire::button>

                    <x-spire::button
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon-only
                        class="shrink-0"
                        @click="toggle()"
                        aria-label="{{ __('spire::spire-ui.datepicker.open_picker') }}"
                        :disabled="$disabled"
                    >
                        <x-spire::icon name="calendar" class="w-4 h-4" />
                    </x-spire::button>
                </div>
            </div>
        @endif
    </div>
</div>
