@props([
    'type' => 'hour',
    'label' => '',
])

@php
$columnId = "column-{$type}";
@endphp

<div class="flex flex-col gap-1 min-w-[4rem]">
    {{-- Column label --}}
    <div class="text-xs font-medium text-text-muted text-center px-1">
        {{ $label }}
    </div>

    {{-- Arrow up --}}
    <button
        type="button"
        @click="scrollUp{{ ucfirst($type) }}"
        aria-label="{{ __('spire-ui::timepicker.previous') }} {{ strtolower($label) }}"
        class="flex items-center justify-center h-6 text-text-muted hover:text-text active:scale-95 transition-all"
    >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    </button>

    {{-- iOS-style scrollable picker --}}
    <div class="relative h-[120px] rounded-md overflow-hidden">
        {{-- Center selection indicator (enhanced) --}}
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 border-y-2 border-primary/40 bg-primary/10 pointer-events-none z-10 rounded-sm shadow-sm"></div>

        {{-- Top fade gradient --}}
        <div class="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-body to-transparent pointer-events-none z-20"></div>

        {{-- Bottom fade gradient --}}
        <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-body to-transparent pointer-events-none z-20"></div>

        {{-- Scrollable list with adjusted padding --}}
        <div
            x-ref="{{ $type }}Column"
            class="h-full overflow-y-auto scroll-smooth snap-y snap-mandatory py-10 hide-scrollbar"
            role="listbox"
            :aria-label="'{{ $label }}'"
            @scroll="handleScroll{{ ucfirst($type) }}"
            @keydown.arrow-down.prevent="highlightNext{{ ucfirst($type) }}"
            @keydown.arrow-up.prevent="highlightPrev{{ ucfirst($type) }}"
            @keydown.enter.prevent="selectHighlighted{{ ucfirst($type) }}"
            @keydown.home.prevent="highlightFirst{{ ucfirst($type) }}"
            @keydown.end.prevent="highlightLast{{ ucfirst($type) }}"
            tabindex="0"
        >
            <template x-for="(item, index) in {{ $type }}Options" :key="item.value">
                <div
                    class="flex items-center justify-center h-10 px-2 text-sm snap-center transition-all duration-200"
                    role="option"
                    :aria-selected="{{ $type }} === item.value"
                    :data-spire-time-{{ $type }}="item.value"
                >
                    <span x-text="item.label"></span>
                </div>
            </template>
        </div>
    </div>

    {{-- Arrow down --}}
    <button
        type="button"
        @click="scrollDown{{ ucfirst($type) }}"
        aria-label="{{ __('spire-ui::timepicker.next') }} {{ strtolower($label) }}"
        class="flex items-center justify-center h-6 text-text-muted hover:text-text active:scale-95 transition-all"
    >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </button>
</div>
