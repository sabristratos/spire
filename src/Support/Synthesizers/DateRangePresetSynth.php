<?php

namespace SpireUI\Support\Synthesizers;

use Livewire\Mechanisms\HandleComponents\Synthesizers\Synth;
use SpireUI\Support\DateRangePreset;

class DateRangePresetSynth extends Synth
{
    public static string $key = 'dateRangePreset';

    public static function match($target): bool
    {
        return $target instanceof DateRangePreset;
    }

    public function dehydrate(DateRangePreset $target): array
    {
        return [
            $target->value,
            ['class' => DateRangePreset::class],
        ];
    }

    public function hydrate($value, $meta): ?DateRangePreset
    {
        if ($value === '__rm__' || $value === null) {
            return null;
        }

        return DateRangePreset::from($value);
    }

    public function get(&$target, $key)
    {
        return $target->{$key};
    }

    public function set(&$target, $key, $value)
    {
        $target = $this->hydrate($value, []);
    }
}
