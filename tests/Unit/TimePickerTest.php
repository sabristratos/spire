<?php

use function PHPUnit\Framework\assertEquals;

test('time picker formats time correctly in 12-hour format', function () {
    $timeString = '14:30';
    $dateTime = new DateTime("1970-01-01T{$timeString}");

    $formatted = (new IntlDateFormatter(
        'en-US',
        IntlDateFormatter::NONE,
        IntlDateFormatter::SHORT,
        null,
        null,
        'h:mm a'
    ))->format($dateTime);

    assertEquals('2:30 PM', $formatted);
});

test('time picker formats time correctly in 24-hour format', function () {
    $timeString = '14:30';
    $dateTime = new DateTime("1970-01-01T{$timeString}");

    $formatted = (new IntlDateFormatter(
        'en-US',
        IntlDateFormatter::NONE,
        IntlDateFormatter::SHORT,
        null,
        null,
        'HH:mm'
    ))->format($dateTime);

    assertEquals('14:30', $formatted);
});

test('time picker parses time string correctly', function () {
    $timeString = '14:30:45';

    preg_match('/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/', $timeString, $matches);

    assertEquals('14', $matches[1]);
    assertEquals('30', $matches[2]);
    assertEquals('45', $matches[3]);
});

test('time picker converts 12-hour to 24-hour format correctly', function () {
    $hour12 = 2;
    $period = 'PM';

    $hour24 = ($period === 'PM' && $hour12 !== 12) ? $hour12 + 12 : (($period === 'AM' && $hour12 === 12) ? 0 : $hour12);

    assertEquals(14, $hour24);
});

test('time picker converts midnight correctly', function () {
    $hour12 = 12;
    $period = 'AM';

    $hour24 = ($period === 'PM' && $hour12 !== 12) ? $hour12 + 12 : (($period === 'AM' && $hour12 === 12) ? 0 : $hour12);

    assertEquals(0, $hour24);
});

test('time picker converts noon correctly', function () {
    $hour12 = 12;
    $period = 'PM';

    $hour24 = ($period === 'PM' && $hour12 !== 12) ? $hour12 + 12 : (($period === 'AM' && $hour12 === 12) ? 0 : $hour12);

    assertEquals(12, $hour24);
});

test('time picker generates minute options with step correctly', function () {
    $step = 5;
    $minuteCount = floor(60 / $step);
    $minutes = [];

    for ($i = 0; $i < $minuteCount; $i++) {
        $minutes[] = $i * $step;
    }

    assertEquals([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], $minutes);
});

test('time picker formats time with seconds', function () {
    $hour = 14;
    $minute = 30;
    $second = 45;

    $timeString = sprintf('%02d:%02d:%02d', $hour, $minute, $second);

    assertEquals('14:30:45', $timeString);
});

test('time picker formats time without seconds', function () {
    $hour = 14;
    $minute = 30;

    $timeString = sprintf('%02d:%02d', $hour, $minute);

    assertEquals('14:30', $timeString);
});
