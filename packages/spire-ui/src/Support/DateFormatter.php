<?php

namespace SpireUI\Support;

use Carbon\CarbonInterface;
use Illuminate\Support\Facades\App;

class DateFormatter
{
    /**
     * Format a date for display using a predefined format.
     */
    public static function format(
        CarbonInterface $date,
        string $format = 'medium',
        ?string $locale = null
    ): string {
        $locale = $locale ?? static::getLocale();

        $date = $date->copy()->locale($locale);

        return match ($format) {
            'short' => static::shortFormat($date, $locale),
            'medium' => static::mediumFormat($date, $locale),
            'long' => static::longFormat($date, $locale),
            'full' => static::fullFormat($date, $locale),
            'iso' => $date->toIso8601String(),
            'iso_date' => $date->toDateString(),
            'iso_time' => $date->toTimeString(),
            default => $date->format($format),
        };
    }

    /**
     * Format a date using the short format.
     */
    public static function shortFormat(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();

        return match ($locale) {
            'ar' => $date->format('d/m/Y'),
            'fr' => $date->format('d/m/Y'),
            default => $date->format('m/d/Y'),
        };
    }

    /**
     * Format a date using the medium format.
     */
    public static function mediumFormat(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();
        $date = $date->copy()->locale($locale);

        return match ($locale) {
            'ar' => $date->format('d M Y'),
            'fr' => $date->format('d M Y'),
            default => $date->format('M d, Y'),
        };
    }

    /**
     * Format a date using the long format.
     */
    public static function longFormat(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();
        $date = $date->copy()->locale($locale);

        return match ($locale) {
            'ar' => $date->format('d F Y'),
            'fr' => $date->format('d F Y'),
            default => $date->format('F d, Y'),
        };
    }

    /**
     * Format a date using the full format.
     */
    public static function fullFormat(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();
        $date = $date->copy()->locale($locale);

        return match ($locale) {
            'ar' => $date->format('l، d F Y'),
            'fr' => $date->format('l d F Y'),
            default => $date->format('l, F d, Y'),
        };
    }

    /**
     * Format time for display.
     */
    public static function formatTime(
        CarbonInterface $date,
        bool $use24Hour = false,
        ?string $locale = null
    ): string {
        $locale = $locale ?? static::getLocale();
        $date = $date->copy()->locale($locale);

        return $use24Hour ? $date->format('H:i') : $date->format('g:i A');
    }

    /**
     * Format datetime for display.
     */
    public static function formatDateTime(
        CarbonInterface $date,
        string $dateFormat = 'medium',
        bool $use24Hour = false,
        ?string $locale = null
    ): string {
        $formattedDate = static::format($date, $dateFormat, $locale);
        $formattedTime = static::formatTime($date, $use24Hour, $locale);

        return "{$formattedDate} {$formattedTime}";
    }

    /**
     * Format a date for display relative to now (e.g., "2 hours ago").
     */
    public static function relative(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();

        return $date->copy()->locale($locale)->diffForHumans();
    }

    /**
     * Format a date for calendar display (e.g., "Today", "Tomorrow", or formatted date).
     */
    public static function calendar(CarbonInterface $date, ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();
        $date = $date->copy()->locale($locale);

        if ($date->isToday()) {
            return __('spire-ui::date.today');
        }

        if ($date->isTomorrow()) {
            return __('spire-ui::date.tomorrow');
        }

        if ($date->isYesterday()) {
            return __('spire-ui::date.yesterday');
        }

        if ($date->isCurrentWeek()) {
            return $date->dayName;
        }

        return static::format($date, 'medium', $locale);
    }

    /**
     * Get the locale for date formatting.
     */
    public static function getLocale(): string
    {
        return App::getLocale();
    }

    /**
     * Format a date range.
     */
    public static function formatRange(
        CarbonInterface $startDate,
        CarbonInterface $endDate,
        string $format = 'medium',
        ?string $locale = null
    ): string {
        $locale = $locale ?? static::getLocale();
        $separator = __('spire-ui::date.range_separator');

        $start = static::format($startDate, $format, $locale);
        $end = static::format($endDate, $format, $locale);

        return "{$start} {$separator} {$end}";
    }

    /**
     * Get month name for a month number.
     */
    public static function getMonthName(int $month, string $format = 'long', ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();

        $monthNames = __('spire-ui::date.months', [], $locale);

        return $format === 'short'
            ? $monthNames['short'][$month - 1]
            : $monthNames['long'][$month - 1];
    }

    /**
     * Get day name for a day of week number.
     */
    public static function getDayName(int $dayOfWeek, string $format = 'long', ?string $locale = null): string
    {
        $locale = $locale ?? static::getLocale();

        $dayNames = __('spire-ui::date.days', [], $locale);

        return $format === 'short'
            ? $dayNames['short'][$dayOfWeek]
            : $dayNames['long'][$dayOfWeek];
    }

    /**
     * Parse a date string and return a Carbon instance.
     */
    public static function parse(
        string $dateString,
        ?string $format = null,
        ?string $timezone = null
    ): CarbonInterface {
        if ($format) {
            return \Carbon\Carbon::createFromFormat($format, $dateString, $timezone);
        }

        return \Carbon\Carbon::parse($dateString, $timezone);
    }

    /**
     * Check if date format is RTL (for Arabic).
     */
    public static function isRTL(?string $locale = null): bool
    {
        $locale = $locale ?? static::getLocale();

        return in_array($locale, ['ar', 'he']);
    }

    /**
     * Get the first day of week for a locale.
     */
    public static function getFirstDayOfWeek(?string $locale = null): int
    {
        $locale = $locale ?? static::getLocale();

        return match ($locale) {
            'ar' => 6,
            'fr' => 1,
            default => 0,
        };
    }
}
