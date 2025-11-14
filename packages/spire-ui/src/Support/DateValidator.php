<?php

namespace SpireUI\Support;

use Carbon\CarbonInterface;

class DateValidator
{
    /**
     * Check if a date is within the specified range.
     */
    public static function isDateInRange(
        CarbonInterface $date,
        ?CarbonInterface $minDate = null,
        ?CarbonInterface $maxDate = null
    ): bool {
        if ($minDate && $date->lt($minDate->startOfDay())) {
            return false;
        }

        if ($maxDate && $date->gt($maxDate->endOfDay())) {
            return false;
        }

        return true;
    }

    /**
     * Check if a date is disabled based on an array of disabled dates.
     */
    public static function isDateDisabled(
        CarbonInterface $date,
        array $disabledDates = []
    ): bool {
        $dateString = $date->toDateString();

        return in_array($dateString, $disabledDates);
    }

    /**
     * Check if a date falls on a disabled day of the week.
     */
    public static function isDayOfWeekDisabled(
        CarbonInterface $date,
        array $disabledDaysOfWeek = []
    ): bool {
        return in_array($date->dayOfWeek, $disabledDaysOfWeek);
    }

    /**
     * Check if a date is in the enabled dates list.
     */
    public static function isDateEnabled(
        CarbonInterface $date,
        array $enabledDates = []
    ): bool {
        if (empty($enabledDates)) {
            return true;
        }

        $dateString = $date->toDateString();

        return in_array($dateString, $enabledDates);
    }

    /**
     * Check if a date is valid based on all constraints.
     */
    public static function isDateValid(
        CarbonInterface $date,
        ?CarbonInterface $minDate = null,
        ?CarbonInterface $maxDate = null,
        array $disabledDates = [],
        array $disabledDaysOfWeek = [],
        array $enabledDates = []
    ): bool {
        if (! static::isDateInRange($date, $minDate, $maxDate)) {
            return false;
        }

        if (static::isDateDisabled($date, $disabledDates)) {
            return false;
        }

        if (static::isDayOfWeekDisabled($date, $disabledDaysOfWeek)) {
            return false;
        }

        if (! static::isDateEnabled($date, $enabledDates)) {
            return false;
        }

        return true;
    }

    /**
     * Validate a date range.
     */
    public static function isDateRangeValid(
        CarbonInterface $startDate,
        CarbonInterface $endDate,
        ?CarbonInterface $minDate = null,
        ?CarbonInterface $maxDate = null
    ): bool {
        if ($startDate->gt($endDate)) {
            return false;
        }

        if (! static::isDateInRange($startDate, $minDate, $maxDate)) {
            return false;
        }

        if (! static::isDateInRange($endDate, $minDate, $maxDate)) {
            return false;
        }

        return true;
    }

    /**
     * Check if a date is before another date.
     */
    public static function isBefore(
        CarbonInterface $date,
        CarbonInterface $compareDate
    ): bool {
        return $date->lt($compareDate);
    }

    /**
     * Check if a date is after another date.
     */
    public static function isAfter(
        CarbonInterface $date,
        CarbonInterface $compareDate
    ): bool {
        return $date->gt($compareDate);
    }

    /**
     * Check if a date is the same as another date (ignoring time).
     */
    public static function isSameDate(
        CarbonInterface $date1,
        CarbonInterface $date2
    ): bool {
        return $date1->isSameDay($date2);
    }

    /**
     * Check if a date is today.
     */
    public static function isToday(CarbonInterface $date): bool
    {
        return $date->isToday();
    }

    /**
     * Check if a date is in the past.
     */
    public static function isPast(CarbonInterface $date): bool
    {
        return $date->isPast();
    }

    /**
     * Check if a date is in the future.
     */
    public static function isFuture(CarbonInterface $date): bool
    {
        return $date->isFuture();
    }

    /**
     * Check if a date is a weekend day.
     */
    public static function isWeekend(CarbonInterface $date): bool
    {
        return $date->isWeekend();
    }

    /**
     * Check if a date is a weekday.
     */
    public static function isWeekday(CarbonInterface $date): bool
    {
        return $date->isWeekday();
    }

    /**
     * Filter an array of dates based on validation constraints.
     */
    public static function filterValidDates(
        array $dates,
        ?CarbonInterface $minDate = null,
        ?CarbonInterface $maxDate = null,
        array $disabledDates = [],
        array $disabledDaysOfWeek = [],
        array $enabledDates = []
    ): array {
        return array_filter($dates, function ($date) use (
            $minDate,
            $maxDate,
            $disabledDates,
            $disabledDaysOfWeek,
            $enabledDates
        ) {
            return static::isDateValid(
                $date,
                $minDate,
                $maxDate,
                $disabledDates,
                $disabledDaysOfWeek,
                $enabledDates
            );
        });
    }

    /**
     * Get validation error message for a date.
     */
    public static function getValidationError(
        CarbonInterface $date,
        ?CarbonInterface $minDate = null,
        ?CarbonInterface $maxDate = null,
        array $disabledDates = [],
        array $disabledDaysOfWeek = []
    ): ?string {
        if ($minDate && $date->lt($minDate->startOfDay())) {
            return __('spire-ui::date.error.before_min_date', [
                'date' => $minDate->toDateString(),
            ]);
        }

        if ($maxDate && $date->gt($maxDate->endOfDay())) {
            return __('spire-ui::date.error.after_max_date', [
                'date' => $maxDate->toDateString(),
            ]);
        }

        if (static::isDateDisabled($date, $disabledDates)) {
            return __('spire-ui::date.error.date_disabled');
        }

        if (static::isDayOfWeekDisabled($date, $disabledDaysOfWeek)) {
            return __('spire-ui::date.error.day_of_week_disabled');
        }

        return null;
    }
}
