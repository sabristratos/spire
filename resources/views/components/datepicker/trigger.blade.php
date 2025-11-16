@props([
    'size' => 'md',
    'variant' => 'bordered',
    'radius' => 'md',
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'error' => false,
    'mode' => 'single',
])

@php
use SpireUI\Support\ComponentClass;

$containerBuilder = ComponentClass::make('datepicker-container');

$boxBuilder = ComponentClass::make('datepicker-box')
    ->size($size)
    ->variant($variant)
    ->radius($radius)
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($error, fn($b) => $b->modifier('error'))
    ->when($readonly, fn($b) => $b->modifier('readonly'))
    ->modifier($mode);

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
                class="ml-auto shrink-0"
                :aria-label="__('spire::spire-ui.datepicker.open_picker')"
                :disabled="$disabled"
            >
                <x-spire::icon name="calendar" class="w-4 h-4" />
            </x-spire::button>

            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                icon-only
                class="shrink-0 spire-datepicker-trigger__clear-btn"
                x-show="value"
                @click.stop="clearDate()"
                aria-label="{{ __('spire::spire-ui.datepicker.clear') }}"
                :disabled="$disabled"
            >
                <x-spire::icon name="x-circle" class="w-4 h-4" />
            </x-spire::button>
        @elseif($mode === 'range')
            {{-- Range mode: Display start and end dates --}}
            <div class="spire-datepicker-trigger__range">
                <div class="spire-datepicker-trigger__range-display">
                    <span x-text="formattedRangeStart || '{{ __('spire::spire-ui.datepicker.start_date') }}'" class="spire-datepicker-trigger__range-value"></span>
                    <span class="spire-datepicker-trigger__range-separator">-</span>
                    <span x-text="formattedRangeEnd || '{{ __('spire::spire-ui.datepicker.end_date') }}'" class="spire-datepicker-trigger__range-value"></span>
                </div>

                <x-spire::button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon-only
                    class="ml-auto shrink-0"
                    :aria-label="__('spire::spire-ui.datepicker.open_picker')"
                    :disabled="$disabled"
                >
                    <x-spire::icon name="calendar" class="w-4 h-4" />
                </x-spire::button>

                <x-spire::button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon-only
                    class="shrink-0 spire-datepicker-trigger__clear-btn"
                    x-show="value && (value.start || value.end)"
                    @click.stop="clearDate()"
                    aria-label="{{ __('spire::spire-ui.datepicker.clear') }}"
                    :disabled="$disabled"
                >
                    <x-spire::icon name="x-circle" class="w-4 h-4" />
                </x-spire::button>
            </div>
        @else
            {{-- Multiple mode: Display count --}}
            <div class="spire-datepicker-trigger__multiple">
                <div class="spire-datepicker-trigger__multiple-display">
                    <span x-text="formattedMultiple || placeholder" class="spire-datepicker-trigger__multiple-value"></span>
                </div>

                <div class="spire-datepicker-trigger__multiple-actions">
                    <span x-show="selectedCount > 0" x-text="`{{ __('spire::spire-ui.datepicker.dates_count', ['count' => '']) }}`.replace(':count', selectedCount)" class="spire-datepicker-trigger__count-badge"></span>

                    <x-spire::button
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon-only
                        class="shrink-0"
                        :aria-label="__('spire::spire-ui.datepicker.open_picker')"
                        :disabled="$disabled"
                    >
                        <x-spire::icon name="calendar" class="w-4 h-4" />
                    </x-spire::button>

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
                        <x-spire::icon name="x-circle" class="w-4 h-4" />
                    </x-spire::button>
                </div>
            </div>
        @endif
    </div>
</div>
