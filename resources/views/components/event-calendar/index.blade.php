@props([
    'events' => [],
    'view' => 'month',
    'date' => null,
    'locale' => null,
    'firstDayOfWeek' => spire_default('datepicker', 'firstDayOfWeek', null),
    'maxEventsPerDay' => 3,
    'weekends' => true,
    'startHour' => 6,
    'endHour' => 22,
    'showViewSwitcher' => true,
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\DateFormatter;

$currentLocale = $locale ?? app()->getLocale();
$currentFirstDayOfWeek = $firstDayOfWeek ?? DateFormatter::getFirstDayOfWeek($currentLocale);

$builder = ComponentClass::make('event-calendar');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}
@endphp

<div
    x-data="spireEventCalendar({
        events: {{ Js::from($events) }},
        view: '{{ $view }}',
        date: {{ $date ? "'{$date}'" : 'null' }},
        locale: '{{ $currentLocale }}',
        firstDayOfWeek: {{ $currentFirstDayOfWeek }},
        maxEventsPerDay: {{ $maxEventsPerDay }},
        weekends: {{ $weekends ? 'true' : 'false' }},
        startHour: {{ $startHour }},
        endHour: {{ $endHour }},
        showViewSwitcher: {{ $showViewSwitcher ? 'true' : 'false' }},
    })"
    {{ $attributes->except(['class', 'events'])->merge([
        'class' => $builder->build(),
        'data-spire-event-calendar' => 'true',
    ]) }}
>
    <x-spire::event-calendar.header />

    <template x-if="view === 'month'">
        <x-spire::event-calendar.month-view>
            @if(isset($event))
                <x-slot:event>{{ $event }}</x-slot:event>
            @endif
            @if(isset($dayCell))
                <x-slot:dayCell>{{ $dayCell }}</x-slot:dayCell>
            @endif
        </x-spire::event-calendar.month-view>
    </template>

    <template x-if="view === 'week'">
        <x-spire::event-calendar.week-view>
            @if(isset($event))
                <x-slot:event>{{ $event }}</x-slot:event>
            @endif
        </x-spire::event-calendar.week-view>
    </template>

    <template x-if="view === 'day'">
        <x-spire::event-calendar.day-view>
            @if(isset($event))
                <x-slot:event>{{ $event }}</x-slot:event>
            @endif
        </x-spire::event-calendar.day-view>
    </template>

    <x-spire::event-calendar.more-popover>
        @if(isset($event))
            <x-slot:event>{{ $event }}</x-slot:event>
        @endif
    </x-spire::event-calendar.more-popover>
</div>
