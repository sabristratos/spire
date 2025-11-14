<?php

use Carbon\Carbon;
use SpireUI\Support\DateFormatter;

describe('DateFormatter', function () {
    test('formats date in short format', function () {
        $date = Carbon::parse('2025-11-15');
        $formatted = DateFormatter::format($date, 'short');

        expect($formatted)->toMatch('/\d{1,2}\/\d{1,2}\/\d{4}/');
    });

    test('formats date in medium format', function () {
        $date = Carbon::parse('2025-11-15');
        $formatted = DateFormatter::format($date, 'medium');

        expect($formatted)->toContain('Nov');
        expect($formatted)->toContain('15');
        expect($formatted)->toContain('2025');
    });

    test('formats date in long format', function () {
        $date = Carbon::parse('2025-11-15');
        $formatted = DateFormatter::format($date, 'long');

        expect($formatted)->toContain('November');
        expect($formatted)->toContain('15');
        expect($formatted)->toContain('2025');
    });

    test('formats date in full format', function () {
        $date = Carbon::parse('2025-11-15');
        $formatted = DateFormatter::format($date, 'full');

        expect($formatted)->toContain('Saturday');
        expect($formatted)->toContain('November');
    });

    test('formats date as ISO', function () {
        $date = Carbon::parse('2025-11-15 12:00:00');
        $formatted = DateFormatter::format($date, 'iso');

        expect($formatted)->toContain('2025-11-15');
        expect($formatted)->toContain('T');
    });

    test('formats date as ISO date only', function () {
        $date = Carbon::parse('2025-11-15 12:00:00');
        $formatted = DateFormatter::format($date, 'iso_date');

        expect($formatted)->toBe('2025-11-15');
    });

    test('formats time in 12-hour format', function () {
        $date = Carbon::parse('2025-11-15 15:45:00');
        $formatted = DateFormatter::formatTime($date, use24Hour: false);

        expect($formatted)->toMatch('/\d{1,2}:\d{2} [AP]M/');
    });

    test('formats time in 24-hour format', function () {
        $date = Carbon::parse('2025-11-15 15:45:00');
        $formatted = DateFormatter::formatTime($date, use24Hour: true);

        expect($formatted)->toBe('15:45');
    });

    test('formats datetime', function () {
        $date = Carbon::parse('2025-11-15 15:45:00');
        $formatted = DateFormatter::formatDateTime($date);

        expect($formatted)->toContain('Nov');
        expect($formatted)->toContain('15');
        expect($formatted)->toContain('2025');
    });

    test('formats date range', function () {
        $start = Carbon::parse('2025-11-15');
        $end = Carbon::parse('2025-11-20');
        $formatted = DateFormatter::formatRange($start, $end);

        expect($formatted)->toContain('Nov 15');
        expect($formatted)->toContain('Nov 20');
    });

    test('gets month name', function () {
        $monthName = DateFormatter::getMonthName(11, 'long');

        expect($monthName)->toBe('November');
    });

    test('gets short month name', function () {
        $monthName = DateFormatter::getMonthName(11, 'short');

        expect($monthName)->toBe('Nov');
    });

    test('gets day name', function () {
        $dayName = DateFormatter::getDayName(4, 'long');

        expect($dayName)->toBe('Thursday');
    });

    test('gets short day name', function () {
        $dayName = DateFormatter::getDayName(4, 'short');

        expect($dayName)->toBe('Thu');
    });

    test('parses date string', function () {
        $date = DateFormatter::parse('2025-11-15');

        expect($date->year)->toBe(2025);
        expect($date->month)->toBe(11);
        expect($date->day)->toBe(15);
    });

    test('checks RTL for Arabic', function () {
        expect(DateFormatter::isRTL('ar'))->toBeTrue();
        expect(DateFormatter::isRTL('en'))->toBeFalse();
    });

    test('gets first day of week for English', function () {
        $firstDay = DateFormatter::getFirstDayOfWeek('en');

        expect($firstDay)->toBe(0);
    });

    test('gets first day of week for French', function () {
        $firstDay = DateFormatter::getFirstDayOfWeek('fr');

        expect($firstDay)->toBe(1);
    });

    test('gets first day of week for Arabic', function () {
        $firstDay = DateFormatter::getFirstDayOfWeek('ar');

        expect($firstDay)->toBe(6);
    });

    test('short format uses locale-specific order', function () {
        $date = Carbon::parse('2025-11-15');

        $enFormat = DateFormatter::shortFormat($date, 'en');
        $frFormat = DateFormatter::shortFormat($date, 'fr');

        expect($enFormat)->toMatch('/11\/15\/2025/');
        expect($frFormat)->toMatch('/15\/11\/2025/');
    });
});
