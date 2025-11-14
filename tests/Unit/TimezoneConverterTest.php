<?php

use Carbon\Carbon;
use SpireUI\Support\TimezoneConverter;

describe('TimezoneConverter', function () {
    test('converts date to app timezone', function () {
        config(['app.timezone' => 'America/New_York']);

        $date = Carbon::parse('2025-11-15 12:00:00', 'UTC');
        $converted = TimezoneConverter::toAppTimezone($date);

        expect($converted->timezone->getName())->toBe('America/New_York');
    });

    test('converts date to UTC', function () {
        $date = Carbon::parse('2025-11-15 12:00:00', 'America/New_York');
        $converted = TimezoneConverter::toUTC($date);

        expect($converted->timezone->getName())->toBe('UTC');
    });

    test('converts date between timezones', function () {
        $date = Carbon::parse('2025-11-15 12:00:00', 'America/New_York');
        $converted = TimezoneConverter::convert($date, 'Europe/Paris');

        expect($converted->timezone->getName())->toBe('Europe/Paris');
    });

    test('gets app timezone from config', function () {
        config(['app.timezone' => 'America/New_York']);

        expect(TimezoneConverter::getAppTimezone())->toBe('America/New_York');
    });

    test('parses and converts date string', function () {
        $converted = TimezoneConverter::parseAndConvert(
            '2025-11-15 12:00:00',
            'Europe/Paris'
        );

        expect($converted->timezone->getName())->toBe('Europe/Paris');
    });

    test('formats date for storage in UTC', function () {
        $date = Carbon::parse('2025-11-15 12:00:00', 'America/New_York');
        $stored = TimezoneConverter::formatForStorage($date);

        $utcDate = Carbon::parse($stored, 'UTC');

        expect($utcDate->timezone->getName())->toBe('UTC');
    });

    test('gets available timezones', function () {
        $timezones = TimezoneConverter::getAvailableTimezones();

        expect($timezones)->toBeArray();
        expect($timezones)->toContain('America/New_York');
        expect($timezones)->toContain('Europe/Paris');
    });

    test('gets common timezones grouped by region', function () {
        $timezones = TimezoneConverter::getCommonTimezones();

        expect($timezones)->toBeArray();
        expect($timezones)->toHaveKey('America');
        expect($timezones)->toHaveKey('Europe');
        expect($timezones['America'])->toHaveKey('America/New_York');
    });

    test('gets timezone abbreviation', function () {
        $date = Carbon::parse('2025-11-15 12:00:00');
        $abbr = TimezoneConverter::getTimezoneAbbreviation('America/New_York', $date);

        expect($abbr)->toBeString();
        expect($abbr)->toMatch('/EST|EDT/');
    });

    test('gets timezone offset', function () {
        $date = Carbon::parse('2025-11-15 12:00:00');
        $offset = TimezoneConverter::getTimezoneOffset('America/New_York', $date);

        expect($offset)->toBeString();
        expect($offset)->toMatch('/^[+-]\d{2}:\d{2}$/');
    });

    test('validates valid timezone', function () {
        expect(TimezoneConverter::isValidTimezone('America/New_York'))->toBeTrue();
        expect(TimezoneConverter::isValidTimezone('Invalid/Timezone'))->toBeFalse();
    });

    test('gets current time in specific timezone', function () {
        $now = TimezoneConverter::nowIn('America/New_York');

        expect($now->timezone->getName())->toBe('America/New_York');
    });

    test('gets current date in specific timezone', function () {
        $today = TimezoneConverter::todayIn('America/New_York');

        expect($today->timezone->getName())->toBe('America/New_York');
        expect($today->hour)->toBe(0);
        expect($today->minute)->toBe(0);
        expect($today->second)->toBe(0);
    });
});
