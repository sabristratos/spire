<?php

namespace SpireUI\Support\Synthesizers;

use Livewire\Mechanisms\HandleComponents\Synthesizers\Synth;
use SpireUI\Support\DateRange;

class DateRangeSynth extends Synth
{
    public static string $key = 'dateRange';

    public static function match($target): bool
    {
        return $target instanceof DateRange;
    }

    public function dehydrate(DateRange $target): array
    {
        return [
            $target->toArray(),
            ['class' => DateRange::class],
        ];
    }

    public function hydrate($value, $meta): DateRange
    {
        return DateRange::fromStrings(
            $value['start'] ?? null,
            $value['end'] ?? null,
            $value['preset'] ?? null
        );
    }

    public function get(&$target, $key)
    {
        if ($key === 'start') {
            return $target->start()?->format('Y-m-d');
        }

        if ($key === 'end') {
            return $target->end()?->format('Y-m-d');
        }

        if ($key === 'preset') {
            return $target->preset()?->value;
        }

        return null;
    }

    public function set(&$target, $key, $value)
    {
        $current = $target->toArray();

        if (is_array($value)) {
            $target = $this->hydrate($value, []);
        } else {
            if ($key === 'preset' && $value === '__rm__') {
                $value = null;
            }

            $current[$key] = $value;
            $target = $this->hydrate($current, []);
        }
    }

    public function unset(&$target, $key)
    {
        $current = $target->toArray();
        $current[$key] = null;
        $target = $this->hydrate($current, []);
    }
}
