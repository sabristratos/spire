<?php

use Carbon\Carbon;
use SpireUI\Support\DateValidator;

describe('DateValidator', function () {
    test('validates date is in range', function () {
        $date = Carbon::parse('2025-11-15');
        $minDate = Carbon::parse('2025-11-01');
        $maxDate = Carbon::parse('2025-11-30');

        expect(DateValidator::isDateInRange($date, $minDate, $maxDate))->toBeTrue();
    });

    test('validates date is before min date', function () {
        $date = Carbon::parse('2025-10-31');
        $minDate = Carbon::parse('2025-11-01');

        expect(DateValidator::isDateInRange($date, $minDate))->toBeFalse();
    });

    test('validates date is after max date', function () {
        $date = Carbon::parse('2025-12-01');
        $maxDate = Carbon::parse('2025-11-30');

        expect(DateValidator::isDateInRange($date, maxDate: $maxDate))->toBeFalse();
    });

    test('validates date without constraints', function () {
        $date = Carbon::parse('2025-11-15');

        expect(DateValidator::isDateInRange($date))->toBeTrue();
    });

    test('checks if date is disabled', function () {
        $date = Carbon::parse('2025-11-15');
        $disabledDates = ['2025-11-15', '2025-11-16'];

        expect(DateValidator::isDateDisabled($date, $disabledDates))->toBeTrue();
    });

    test('checks if date is not disabled', function () {
        $date = Carbon::parse('2025-11-15');
        $disabledDates = ['2025-11-16', '2025-11-17'];

        expect(DateValidator::isDateDisabled($date, $disabledDates))->toBeFalse();
    });

    test('checks if day of week is disabled', function () {
        $saturday = Carbon::parse('2025-11-08');
        $sunday = Carbon::parse('2025-11-09');

        expect(DateValidator::isDayOfWeekDisabled($saturday, [0, 6]))->toBeTrue();
        expect(DateValidator::isDayOfWeekDisabled($sunday, [0, 6]))->toBeTrue();
    });

    test('checks if day of week is not disabled', function () {
        $monday = Carbon::parse('2025-11-03');

        expect(DateValidator::isDayOfWeekDisabled($monday, [0, 6]))->toBeFalse();
    });

    test('validates date against all constraints', function () {
        $date = Carbon::parse('2025-11-15');
        $minDate = Carbon::parse('2025-11-01');
        $maxDate = Carbon::parse('2025-11-30');

        expect(DateValidator::isDateValid($date, $minDate, $maxDate))->toBeTrue();
    });

    test('validates date fails when disabled', function () {
        $date = Carbon::parse('2025-11-15');
        $disabledDates = ['2025-11-15'];

        expect(DateValidator::isDateValid(
            $date,
            disabledDates: $disabledDates
        ))->toBeFalse();
    });

    test('validates date fails when day of week disabled', function () {
        $saturday = Carbon::parse('2025-11-08');

        expect(DateValidator::isDateValid(
            $saturday,
            disabledDaysOfWeek: [0, 6]
        ))->toBeFalse();
    });

    test('validates date with enabled dates whitelist', function () {
        $date = Carbon::parse('2025-11-15');
        $enabledDates = ['2025-11-15', '2025-11-16'];

        expect(DateValidator::isDateValid(
            $date,
            enabledDates: $enabledDates
        ))->toBeTrue();
    });

    test('validates date fails when not in enabled dates', function () {
        $date = Carbon::parse('2025-11-15');
        $enabledDates = ['2025-11-16', '2025-11-17'];

        expect(DateValidator::isDateValid(
            $date,
            enabledDates: $enabledDates
        ))->toBeFalse();
    });

    test('validates date range', function () {
        $start = Carbon::parse('2025-11-01');
        $end = Carbon::parse('2025-11-30');

        expect(DateValidator::isDateRangeValid($start, $end))->toBeTrue();
    });

    test('validates date range fails when start after end', function () {
        $start = Carbon::parse('2025-11-30');
        $end = Carbon::parse('2025-11-01');

        expect(DateValidator::isDateRangeValid($start, $end))->toBeFalse();
    });

    test('checks if date is before another', function () {
        $date1 = Carbon::parse('2025-11-14');
        $date2 = Carbon::parse('2025-11-15');

        expect(DateValidator::isBefore($date1, $date2))->toBeTrue();
        expect(DateValidator::isBefore($date2, $date1))->toBeFalse();
    });

    test('checks if date is after another', function () {
        $date1 = Carbon::parse('2025-11-15');
        $date2 = Carbon::parse('2025-11-14');

        expect(DateValidator::isAfter($date1, $date2))->toBeTrue();
        expect(DateValidator::isAfter($date2, $date1))->toBeFalse();
    });

    test('checks if dates are the same', function () {
        $date1 = Carbon::parse('2025-11-15 10:00:00');
        $date2 = Carbon::parse('2025-11-15 15:00:00');
        $date3 = Carbon::parse('2025-11-16 10:00:00');

        expect(DateValidator::isSameDate($date1, $date2))->toBeTrue();
        expect(DateValidator::isSameDate($date1, $date3))->toBeFalse();
    });

    test('checks if date is today', function () {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        expect(DateValidator::isToday($today))->toBeTrue();
        expect(DateValidator::isToday($yesterday))->toBeFalse();
    });

    test('checks if date is in the past', function () {
        $yesterday = Carbon::yesterday();
        $tomorrow = Carbon::tomorrow();

        expect(DateValidator::isPast($yesterday))->toBeTrue();
        expect(DateValidator::isPast($tomorrow))->toBeFalse();
    });

    test('checks if date is in the future', function () {
        $tomorrow = Carbon::tomorrow();
        $yesterday = Carbon::yesterday();

        expect(DateValidator::isFuture($tomorrow))->toBeTrue();
        expect(DateValidator::isFuture($yesterday))->toBeFalse();
    });

    test('checks if date is weekend', function () {
        $saturday = Carbon::parse('2025-11-08');
        $monday = Carbon::parse('2025-11-03');

        expect(DateValidator::isWeekend($saturday))->toBeTrue();
        expect(DateValidator::isWeekend($monday))->toBeFalse();
    });

    test('checks if date is weekday', function () {
        $monday = Carbon::parse('2025-11-03');
        $saturday = Carbon::parse('2025-11-08');

        expect(DateValidator::isWeekday($monday))->toBeTrue();
        expect(DateValidator::isWeekday($saturday))->toBeFalse();
    });

    test('filters valid dates from array', function () {
        $dates = [
            Carbon::parse('2025-11-01'),
            Carbon::parse('2025-11-15'),
            Carbon::parse('2025-12-01'),
        ];

        $minDate = Carbon::parse('2025-11-01');
        $maxDate = Carbon::parse('2025-11-30');

        $validDates = DateValidator::filterValidDates($dates, $minDate, $maxDate);

        expect($validDates)->toHaveCount(2);
    });

});
