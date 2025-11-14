<?php

namespace SpireUI\Support;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JsonSerializable;

class DateRange extends CarbonPeriod implements Arrayable, Jsonable, JsonSerializable
{
    protected $preset = null;

    public function __construct(?Carbon $start = null, ?Carbon $end = null, ?DateRangePreset $preset = null)
    {
        if ($start || $end) {
            parent::__construct($start, $end ?? $start);
        }

        $this->preset = $preset;
    }

    public static function fromStrings(?string $start = null, ?string $end = null, ?string $preset = null): static
    {
        $startCarbon = $start ? Carbon::parse($start) : null;
        $endCarbon = $end ? Carbon::parse($end) : null;

        // Handle Livewire's "__rm__" special value for removing presets
        if ($preset === '__rm__') {
            $preset = null;
        }

        $presetEnum = $preset ? DateRangePreset::from($preset) : null;

        return new static($startCarbon, $endCarbon, $presetEnum);
    }

    public function start(): ?Carbon
    {
        return $this->getStartDate();
    }

    public function end(): ?Carbon
    {
        return $this->getEndDate();
    }

    public function days(): int
    {
        if (! $this->start() || ! $this->end()) {
            return 0;
        }

        return $this->start()->diffInDays($this->end()) + 1;
    }

    public function preset(): ?DateRangePreset
    {
        return $this->preset;
    }

    public function toArray(): array
    {
        return [
            'start' => $this->start()?->format('Y-m-d'),
            'end' => $this->end()?->format('Y-m-d'),
            'preset' => $this->preset?->value,
        ];
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->jsonSerialize(), $options);
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public static function today(): static
    {
        $today = Carbon::today();

        return new static($today, $today, DateRangePreset::Today);
    }

    public static function yesterday(): static
    {
        $yesterday = Carbon::yesterday();

        return new static($yesterday, $yesterday, DateRangePreset::Yesterday);
    }

    public static function thisWeek(): static
    {
        $start = Carbon::today()->startOfWeek();
        $end = Carbon::today()->endOfWeek();

        return new static($start, $end, DateRangePreset::ThisWeek);
    }

    public static function lastWeek(): static
    {
        $start = Carbon::today()->subWeek()->startOfWeek();
        $end = Carbon::today()->subWeek()->endOfWeek();

        return new static($start, $end, DateRangePreset::LastWeek);
    }

    public static function last7Days(): static
    {
        $start = Carbon::today()->subDays(6);
        $end = Carbon::today();

        return new static($start, $end, DateRangePreset::Last7Days);
    }

    public static function last30Days(): static
    {
        $start = Carbon::today()->subDays(29);
        $end = Carbon::today();

        return new static($start, $end, DateRangePreset::Last30Days);
    }

    public static function thisMonth(): static
    {
        $start = Carbon::today()->startOfMonth();
        $end = Carbon::today()->endOfMonth();

        return new static($start, $end, DateRangePreset::ThisMonth);
    }

    public static function lastMonth(): static
    {
        $start = Carbon::today()->subMonth()->startOfMonth();
        $end = Carbon::today()->subMonth()->endOfMonth();

        return new static($start, $end, DateRangePreset::LastMonth);
    }

    public static function thisQuarter(): static
    {
        $start = Carbon::today()->startOfQuarter();
        $end = Carbon::today()->endOfQuarter();

        return new static($start, $end, DateRangePreset::ThisQuarter);
    }

    public static function lastQuarter(): static
    {
        $start = Carbon::today()->subQuarter()->startOfQuarter();
        $end = Carbon::today()->subQuarter()->endOfQuarter();

        return new static($start, $end, DateRangePreset::LastQuarter);
    }

    public static function thisYear(): static
    {
        $start = Carbon::today()->startOfYear();
        $end = Carbon::today()->endOfYear();

        return new static($start, $end, DateRangePreset::ThisYear);
    }

    public static function lastYear(): static
    {
        $start = Carbon::today()->subYear()->startOfYear();
        $end = Carbon::today()->subYear()->endOfYear();

        return new static($start, $end, DateRangePreset::LastYear);
    }

    public static function yearToDate(): static
    {
        $start = Carbon::today()->startOfYear();
        $end = Carbon::today();

        return new static($start, $end, DateRangePreset::YearToDate);
    }

    public static function allTime(): static
    {
        return new static(null, null, DateRangePreset::AllTime);
    }
}
