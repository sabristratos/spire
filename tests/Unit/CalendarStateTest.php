<?php

use Carbon\Carbon;
use SpireUI\Support\CalendarState;

describe('CalendarState', function () {
    test('generates calendar grid for month', function () {
        $month = Carbon::parse('2025-11-01');
        $weeks = CalendarState::generateMonthGrid($month);

        expect($weeks)->toBeArray();
        expect($weeks)->toHaveCount(6);
        expect($weeks[0])->toHaveCount(7);
    });

    test('includes padding days from previous month', function () {
        $month = Carbon::parse('2025-11-01');
        $weeks = CalendarState::generateMonthGrid($month);

        $firstWeek = $weeks[0];
        $firstDay = $firstWeek[0];

        expect($firstDay['isCurrentMonth'])->toBeFalse();
        expect($firstDay['month'])->toBe(10);
    });

    test('includes padding days from next month', function () {
        $month = Carbon::parse('2025-11-01');
        $weeks = CalendarState::generateMonthGrid($month);

        $lastWeek = $weeks[count($weeks) - 1];
        $lastDay = $lastWeek[6];

        expect($lastDay['isCurrentMonth'])->toBeFalse();
        expect($lastDay['month'])->toBe(12);
    });

    test('identifies today correctly', function () {
        $today = Carbon::today();
        $weeks = CalendarState::generateMonthGrid($today);

        $foundToday = false;

        foreach ($weeks as $week) {
            foreach ($week as $day) {
                if ($day['isToday']) {
                    $foundToday = true;
                    expect($day['day'])->toBe($today->day);
                }
            }
        }

        expect($foundToday)->toBeTrue();
    });

    test('identifies weekends correctly', function () {
        $month = Carbon::parse('2025-11-01');
        $weeks = CalendarState::generateMonthGrid($month);

        foreach ($weeks as $week) {
            expect($week[0]['isWeekend'])->toBeTrue();
            expect($week[6]['isWeekend'])->toBeTrue();
        }
    });

    test('supports different first day of week', function () {
        $month = Carbon::parse('2025-11-01');

        $sundayFirst = CalendarState::generateMonthGrid($month, firstDayOfWeek: 0);
        $mondayFirst = CalendarState::generateMonthGrid($month, firstDayOfWeek: 1);

        expect($sundayFirst[0][0]['date'])->not->toBe($mondayFirst[0][0]['date']);
    });

    test('gets day names in correct order', function () {
        $dayNames = CalendarState::getDayNames(firstDayOfWeek: 0);

        expect($dayNames)->toHaveCount(7);
        expect($dayNames[0])->toContain('Sun');
    });

    test('gets day names starting with Monday', function () {
        $dayNames = CalendarState::getDayNames(firstDayOfWeek: 1);

        expect($dayNames)->toHaveCount(7);
        expect($dayNames[0])->toContain('Mon');
    });

    test('gets month names', function () {
        $monthNames = CalendarState::getMonthNames();

        expect($monthNames)->toHaveCount(12);
        expect($monthNames[0])->toBe('January');
        expect($monthNames[11])->toBe('December');
    });

    test('gets short month names', function () {
        $monthNames = CalendarState::getMonthNames(format: 'short');

        expect($monthNames)->toHaveCount(12);
        expect($monthNames[0])->toBe('Jan');
        expect($monthNames[11])->toBe('Dec');
    });

    test('gets first day of month', function () {
        $date = Carbon::parse('2025-11-15');
        $firstDay = CalendarState::getFirstDayOfMonth($date);

        expect($firstDay->day)->toBe(1);
        expect($firstDay->month)->toBe(11);
        expect($firstDay->year)->toBe(2025);
    });

    test('gets last day of month', function () {
        $date = Carbon::parse('2025-11-15');
        $lastDay = CalendarState::getLastDayOfMonth($date);

        expect($lastDay->day)->toBe(30);
        expect($lastDay->month)->toBe(11);
        expect($lastDay->year)->toBe(2025);
    });

    test('checks if dates are in same month', function () {
        $date1 = Carbon::parse('2025-11-01');
        $date2 = Carbon::parse('2025-11-30');
        $date3 = Carbon::parse('2025-12-01');

        expect(CalendarState::isSameMonth($date1, $date2))->toBeTrue();
        expect(CalendarState::isSameMonth($date1, $date3))->toBeFalse();
    });

    test('gets days in month', function () {
        $november = Carbon::parse('2025-11-01');
        $february = Carbon::parse('2024-02-01');

        expect(CalendarState::getDaysInMonth($november))->toBe(30);
        expect(CalendarState::getDaysInMonth($february))->toBe(29);
    });

    test('gets year range', function () {
        $years = CalendarState::getYearRange(2020, 2025);

        expect($years)->toHaveCount(6);
        expect($years[0])->toBe(2020);
        expect($years[5])->toBe(2025);
    });

    test('gets decade range', function () {
        $decade = CalendarState::getDecadeRange(2025);

        expect($decade)->toHaveCount(10);
        expect($decade[0])->toBe(2020);
        expect($decade[9])->toBe(2029);
    });

    test('checks if date is specific day of week', function () {
        $monday = Carbon::parse('2025-11-03');
        $saturday = Carbon::parse('2025-11-08');

        expect(CalendarState::isDayOfWeek($monday, 1))->toBeTrue();
        expect(CalendarState::isDayOfWeek($saturday, [0, 6]))->toBeTrue();
        expect(CalendarState::isDayOfWeek($monday, 0))->toBeFalse();
    });

    test('gets date range', function () {
        $start = Carbon::parse('2025-11-01');
        $end = Carbon::parse('2025-11-05');

        $dates = CalendarState::getDateRange($start, $end);

        expect($dates)->toHaveCount(5);
        expect($dates[0])->toBe('2025-11-01');
        expect($dates[4])->toBe('2025-11-05');
    });
});
