@props([])

<div
    x-show="morePopover.open"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-100"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"
    @click.outside="hideMorePopover"
    @keydown.escape.window="hideMorePopover"
    class="spire-event-calendar__more-popover"
    :style="{ left: morePopover.x + 'px', top: morePopover.y + 'px' }"
    role="dialog"
    aria-modal="true"
>
    <div class="spire-event-calendar__more-popover-header">
        <span class="spire-event-calendar__more-popover-date" x-text="formatPopoverDate(morePopover.date)"></span>
        <button
            type="button"
            class="spire-event-calendar__more-popover-close"
            @click="hideMorePopover"
            aria-label="{{ __('spire::spire-ui.common.close') }}"
        >
            <x-spire::icon name="x" size="sm" />
        </button>
    </div>

    <div class="spire-event-calendar__more-popover-events">
        <template x-for="event in morePopover.events" :key="event.id">
            <template x-if="morePopover.date">
                <div x-data="{ day: { date: morePopover.date } }">
                    @if(isset($event))
                        {{ $event }}
                    @else
                        <x-spire::event-calendar.event />
                    @endif
                </div>
            </template>
        </template>
    </div>
</div>
