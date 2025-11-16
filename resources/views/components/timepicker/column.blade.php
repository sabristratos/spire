@props([
    'type' => 'hour',
    'label' => '',
])

@php
$columnId = "column-{$type}";
@endphp

<div class="flex flex-col gap-1 min-w-[4rem]">
    {{-- Column label --}}
    <div class="spire-timepicker-column__header">
        {{ $label }}
    </div>

    {{-- Arrow up --}}
    <button
        type="button"
        @click="scrollUp{{ ucfirst($type) }}"
        aria-label="{{ __('spire::spire-ui.timepicker.previous') }} {{ strtolower($label) }}"
        class="flex items-center justify-center h-6 text-text-muted hover:text-text active:scale-95 transition-all"
    >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    </button>

    {{-- iOS-style scrollable picker --}}
    <div class="relative h-[120px]">
        {{-- Scrollable container --}}
        <div x-ref="{{ $type }}Container" class="h-full rounded-md overflow-hidden spire-timepicker-column">
            <div
                x-ref="{{ $type }}Column"
                class="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory py-10 hide-scrollbar"
                role="listbox"
                :aria-label="'{{ $label }}'"
                @scroll="handleScroll{{ ucfirst($type) }}"
                @keydown.arrow-down.prevent="highlightNext{{ ucfirst($type) }}"
                @keydown.arrow-up.prevent="highlightPrev{{ ucfirst($type) }}"
                @keydown.home.prevent="highlightFirst{{ ucfirst($type) }}"
                @keydown.end.prevent="highlightLast{{ ucfirst($type) }}"
                tabindex="0"
            >
                <template x-for="(item, index) in {{ $type }}Options" :key="item.value">
                    <div
                        class="flex items-center justify-center h-10 px-2 text-sm snap-center snap-always transition-all duration-200 cursor-pointer hover:bg-hover"
                        :class="{ 'font-bold text-text': {{ $type }} === item.value, 'text-text-muted': {{ $type }} !== item.value }"
                        role="option"
                        :aria-selected="{{ $type }} === item.value"
                        :data-spire-time-{{ $type }}="item.value"
                        @click="select{{ ucfirst($type) }}(item.value)"
                    >
                        <span x-text="item.label"></span>
                    </div>
                </template>
            </div>
        </div>

        {{-- Center selection indicator (positioned on top) --}}
        <div class="spire-timepicker-column__indicator"></div>

        {{-- Top fade gradient (positioned on top) --}}
        <div class="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-surface to-transparent pointer-events-none z-20"></div>

        {{-- Bottom fade gradient (positioned on top) --}}
        <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none z-20"></div>
    </div>

    {{-- Arrow down --}}
    <button
        type="button"
        @click="scrollDown{{ ucfirst($type) }}"
        aria-label="{{ __('spire::spire-ui.timepicker.next') }} {{ strtolower($label) }}"
        class="flex items-center justify-center h-6 text-text-muted hover:text-text active:scale-95 transition-all"
    >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </button>
</div>
