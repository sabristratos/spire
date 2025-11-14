<?php

namespace SpireUI\Support;

use Carbon\Carbon;
use Carbon\CarbonInterface;

class CalendarState
{
    /**
     * Generate a calendar grid for the given month.
     *
     * Returns an array of weeks, where each week contains 7 days.
     * Days from adjacent months are included as padding to complete the grid.
     */
    public static function generateMonthGrid(
        CarbonInterface $month,
        int $firstDayOfWeek = 0
    ): array {
        $month = $month->copy()->startOfMonth();
        $startOfCalendar = static::getCalendarStartDate($month, $firstDayOfWeek);

        $weeks = [];
        $currentDate = $startOfCalendar->copy();

        $weeksToShow = static::getWeeksInMonthGrid($month, $firstDayOfWeek);

        for ($week = 0; $week < $weeksToShow; $week++) {
            $days = [];

            for ($day = 0; $day < 7; $day++) {
                $days[] = [
                    'date' => $currentDate->toDateString(),
                    'day' => $currentDate->day,
                    'month' => $currentDate->month,
                    'year' => $currentDate->year,
                    'isCurrentMonth' => $currentDate->month === $month->month,
                    'isToday' => $currentDate->isToday(),
                    'isWeekend' => $currentDate->isWeekend(),
                    'dayOfWeek' => $currentDate->dayOfWeek,
                    'carbon' => $currentDate->copy(),
                ];

                $currentDate->addDay();
            }

            $weeks[] = $days;
        }

        return $weeks;
    }

    /**
     * Get the start date for the calendar grid.
     */
    public static function getCalendarStartDate(
        CarbonInterface $month,
        int $firstDayOfWeek = 0
    ): CarbonInterface {
        $startOfMonth = $month->copy()->startOfMonth();
        $dayOfWeek = $startOfMonth->dayOfWeek;

        $daysToSubtract = ($dayOfWeek - $firstDayOfWeek + 7) % 7;

        return $startOfMonth->copy()->subDays($daysToSubtract);
    }

    /**
     * Determine how many weeks should be shown in the calendar grid.
     */
    public static function getWeeksInMonthGrid(
        CarbonInterface $month,
        int $firstDayOfWeek = 0
    ): int {
        $startOfCalendar = static::getCalendarStartDate($month, $firstDayOfWeek);
        $endOfMonth = $month->copy()->endOfMonth();

        $daysInGrid = $startOfCalendar->diffInDays($endOfMonth) + 1;

        return (int) ceil($daysInGrid / 7);
    }

    /**
     * Get an array of day names for the calendar header.
     */
    public static function getDayNames(
        int $firstDayOfWeek = 0,
        string $format = 'short'
    ): array {
        $startDate = Carbon::parse('next Sunday');

        if ($firstDayOfWeek > 0) {
            $startDate->addDays($firstDayOfWeek);
        }

        $days = [];

        for ($i = 0; $i < 7; $i++) {
            $date = $startDate->copy()->addDays($i);

            $days[] = [
                'dayOfWeek' => $date->dayOfWeek,
                'short' => $date->shortDayName,
                'long' => $date->dayName,
                'min' => substr($date->shortDayName, 0, 1),
            ][$format] ?? $date->shortDayName;
        }

        return $days;
    }

    /**
     * Get an array of month names.
     */
    public static function getMonthNames(string $format = 'long'): array
    {
        $months = [];

        for ($month = 1; $month <= 12; $month++) {
            $date = Carbon::create(null, $month, 1);

            $months[] = [
                'month' => $month,
                'short' => $date->shortMonthName,
                'long' => $date->monthName,
            ];
        }

        return $format === 'short'
            ? array_column($months, 'short')
            : array_column($months, 'long');
    }

    /**
     * Get the first day of the month.
     */
    public static function getFirstDayOfMonth(CarbonInterface $date): CarbonInterface
    {
        return $date->copy()->startOfMonth();
    }

    /**
     * Get the last day of the month.
     */
    public static function getLastDayOfMonth(CarbonInterface $date): CarbonInterface
    {
        return $date->copy()->endOfMonth();
    }

    /**
     * Check if a date is in the same month as another date.
     */
    public static function isSameMonth(
        CarbonInterface $date1,
        CarbonInterface $date2
    ): bool {
        return $date1->year === $date2->year && $date1->month === $date2->month;
    }

    /**
     * Get the number of days in a month.
     */
    public static function getDaysInMonth(CarbonInterface $date): int
    {
        return $date->daysInMonth;
    }

    /**
     * Get an array of years for a year picker.
     */
    public static function getYearRange(int $start, int $end): array
    {
        $years = [];

        for ($year = $start; $year <= $end; $year++) {
            $years[] = $year;
        }

        return $years;
    }

    /**
     * Get a decade range (10 years) around a given year.
     */
    public static function getDecadeRange(int $year): array
    {
        $startYear = (int) floor($year / 10) * 10;
        $endYear = $startYear + 9;

        return static::getYearRange($startYear, $endYear);
    }

    /**
     * Check if a date falls on a specific day of the week.
     */
    public static function isDayOfWeek(
        CarbonInterface $date,
        int|array $dayOfWeek
    ): bool {
        $daysToCheck = is_array($dayOfWeek) ? $dayOfWeek : [$dayOfWeek];

        return in_array($date->dayOfWeek, $daysToCheck);
    }

    /**
     * Get the week number of the year for a date.
     */
    public static function getWeekNumber(CarbonInterface $date): int
    {
        return $date->weekOfYear;
    }

    /**
     * Get all dates in a date range.
     */
    public static function getDateRange(
        CarbonInterface $start,
        CarbonInterface $end
    ): array {
        $dates = [];
        $current = $start->copy();

        while ($current->lte($end)) {
            $dates[] = $current->toDateString();
            $current->addDay();
        }

        return $dates;
    }
}
