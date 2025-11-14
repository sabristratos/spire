<?php

namespace SpireUI\Support;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTimeZone;

class TimezoneConverter
{
    /**
     * Convert a date to the application's timezone.
     */
    public static function toAppTimezone(CarbonInterface $date): CarbonInterface
    {
        return $date->copy()->setTimezone(config('app.timezone'));
    }

    /**
     * Convert a date to the user's timezone.
     */
    public static function toUserTimezone(
        CarbonInterface $date,
        ?string $userTimezone = null
    ): CarbonInterface {
        $timezone = $userTimezone ?? static::getUserTimezone();

        return $date->copy()->setTimezone($timezone);
    }

    /**
     * Convert a date to UTC.
     */
    public static function toUTC(CarbonInterface $date): CarbonInterface
    {
        return $date->copy()->setTimezone('UTC');
    }

    /**
     * Convert a date from one timezone to another.
     */
    public static function convert(
        CarbonInterface $date,
        string $toTimezone,
        ?string $fromTimezone = null
    ): CarbonInterface {
        $converted = $date->copy();

        if ($fromTimezone) {
            $converted->setTimezone($fromTimezone);
        }

        return $converted->setTimezone($toTimezone);
    }

    /**
     * Get the user's timezone from the authenticated user or fallback to app timezone.
     */
    public static function getUserTimezone(): string
    {
        if (auth()->check() && method_exists(auth()->user(), 'timezone')) {
            return auth()->user()->timezone ?? config('app.timezone');
        }

        return config('app.timezone');
    }

    /**
     * Get the application's timezone.
     */
    public static function getAppTimezone(): string
    {
        return config('app.timezone');
    }

    /**
     * Parse a date string and convert to the specified timezone.
     */
    public static function parseAndConvert(
        string $dateString,
        string $toTimezone,
        ?string $fromTimezone = null
    ): CarbonInterface {
        $date = Carbon::parse($dateString, $fromTimezone ?? config('app.timezone'));

        return $date->setTimezone($toTimezone);
    }

    /**
     * Format a date for storage in the database (UTC).
     */
    public static function formatForStorage(
        CarbonInterface $date,
        ?string $userTimezone = null
    ): string {
        $timezone = $userTimezone ?? static::getUserTimezone();

        return $date->copy()->setTimezone($timezone)->setTimezone('UTC')->toDateTimeString();
    }

    /**
     * Format a date for display to the user.
     */
    public static function formatForDisplay(
        CarbonInterface $date,
        ?string $userTimezone = null
    ): CarbonInterface {
        return static::toUserTimezone($date, $userTimezone);
    }

    /**
     * Get a list of all available timezones.
     */
    public static function getAvailableTimezones(): array
    {
        return DateTimeZone::listIdentifiers();
    }

    /**
     * Get a list of common timezones grouped by region.
     */
    public static function getCommonTimezones(): array
    {
        return [
            'UTC' => [
                'UTC' => 'UTC',
            ],
            'America' => [
                'America/New_York' => 'Eastern Time (US & Canada)',
                'America/Chicago' => 'Central Time (US & Canada)',
                'America/Denver' => 'Mountain Time (US & Canada)',
                'America/Los_Angeles' => 'Pacific Time (US & Canada)',
                'America/Anchorage' => 'Alaska',
                'America/Phoenix' => 'Arizona',
                'America/Toronto' => 'Toronto',
                'America/Vancouver' => 'Vancouver',
            ],
            'Europe' => [
                'Europe/London' => 'London',
                'Europe/Paris' => 'Paris',
                'Europe/Berlin' => 'Berlin',
                'Europe/Rome' => 'Rome',
                'Europe/Madrid' => 'Madrid',
                'Europe/Amsterdam' => 'Amsterdam',
                'Europe/Brussels' => 'Brussels',
                'Europe/Vienna' => 'Vienna',
                'Europe/Warsaw' => 'Warsaw',
                'Europe/Athens' => 'Athens',
                'Europe/Istanbul' => 'Istanbul',
                'Europe/Moscow' => 'Moscow',
            ],
            'Asia' => [
                'Asia/Dubai' => 'Dubai',
                'Asia/Kabul' => 'Kabul',
                'Asia/Karachi' => 'Karachi',
                'Asia/Kolkata' => 'Kolkata',
                'Asia/Bangkok' => 'Bangkok',
                'Asia/Singapore' => 'Singapore',
                'Asia/Hong_Kong' => 'Hong Kong',
                'Asia/Shanghai' => 'Beijing',
                'Asia/Tokyo' => 'Tokyo',
                'Asia/Seoul' => 'Seoul',
                'Asia/Riyadh' => 'Riyadh',
                'Asia/Jerusalem' => 'Jerusalem',
                'Asia/Beirut' => 'Beirut',
                'Asia/Baghdad' => 'Baghdad',
            ],
            'Africa' => [
                'Africa/Cairo' => 'Cairo',
                'Africa/Johannesburg' => 'Johannesburg',
                'Africa/Lagos' => 'Lagos',
                'Africa/Nairobi' => 'Nairobi',
                'Africa/Casablanca' => 'Casablanca',
            ],
            'Australia' => [
                'Australia/Sydney' => 'Sydney',
                'Australia/Melbourne' => 'Melbourne',
                'Australia/Brisbane' => 'Brisbane',
                'Australia/Perth' => 'Perth',
                'Australia/Adelaide' => 'Adelaide',
            ],
            'Pacific' => [
                'Pacific/Auckland' => 'Auckland',
                'Pacific/Fiji' => 'Fiji',
                'Pacific/Honolulu' => 'Hawaii',
            ],
        ];
    }

    /**
     * Get the timezone abbreviation for a timezone.
     */
    public static function getTimezoneAbbreviation(
        string $timezone,
        ?CarbonInterface $date = null
    ): string {
        $date = $date ?? now();

        return $date->copy()->setTimezone($timezone)->format('T');
    }

    /**
     * Get the offset in hours for a timezone.
     */
    public static function getTimezoneOffset(
        string $timezone,
        ?CarbonInterface $date = null
    ): string {
        $date = $date ?? now();

        return $date->copy()->setTimezone($timezone)->format('P');
    }

    /**
     * Check if a timezone is valid.
     */
    public static function isValidTimezone(string $timezone): bool
    {
        return in_array($timezone, DateTimeZone::listIdentifiers());
    }

    /**
     * Get the current time in a specific timezone.
     */
    public static function nowIn(string $timezone): CarbonInterface
    {
        return Carbon::now($timezone);
    }

    /**
     * Get the current date in a specific timezone (start of day).
     */
    public static function todayIn(string $timezone): CarbonInterface
    {
        return Carbon::today($timezone);
    }
}
