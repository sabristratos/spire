<div class="spire-event-calendar__header">
    <div class="spire-event-calendar__header-title">
        <h2 id="spire-event-calendar-title" class="spire-event-calendar__month-year" aria-live="polite">
            <template x-if="view === 'month'">
                <span>
                    <span x-text="monthName"></span>
                    <span x-text="displayYear"></span>
                </span>
            </template>
            <template x-if="view === 'week'">
                <span x-text="getWeekTitle()"></span>
            </template>
            <template x-if="view === 'day'">
                <span x-text="getDayTitle()"></span>
            </template>
        </h2>
    </div>

    <div class="spire-event-calendar__header-nav">
        <template x-if="showViewSwitcher">
            <x-spire::tabs x-model="view" variant="pills" color="neutral" size="sm" class="spire-event-calendar__view-switcher">
                <x-spire::tabs.list>
                    <x-spire::tabs.trigger value="month">
                        {{ __('spire::spire-ui.event_calendar.month') }}
                    </x-spire::tabs.trigger>
                    <x-spire::tabs.trigger value="week">
                        {{ __('spire::spire-ui.event_calendar.week') }}
                    </x-spire::tabs.trigger>
                    <x-spire::tabs.trigger value="day">
                        {{ __('spire::spire-ui.event_calendar.day') }}
                    </x-spire::tabs.trigger>
                </x-spire::tabs.list>
            </x-spire::tabs>
        </template>

        <x-spire::button
            type="button"
            variant="ghost"
            size="sm"
            @click="goToToday"
            :aria-label="__('spire::spire-ui.event_calendar.today')"
        >
            {{ __('spire::spire-ui.event_calendar.today') }}
        </x-spire::button>

        <div class="spire-event-calendar__header-arrows">
            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                icon-only
                @click="previousPeriod"
                :aria-label="__('spire::spire-ui.event_calendar.previous')"
            >
                <x-spire::icon name="chevron-left" size="sm" />
            </x-spire::button>

            <x-spire::button
                type="button"
                variant="ghost"
                size="sm"
                icon-only
                @click="nextPeriod"
                :aria-label="__('spire::spire-ui.event_calendar.next')"
            >
                <x-spire::icon name="chevron-right" size="sm" />
            </x-spire::button>
        </div>
    </div>
</div>
