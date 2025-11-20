<?php

namespace SpireUI\Support;

use Illuminate\View\ComponentAttributeBag;

class WireEntangle
{
    public static function fromAttributes(ComponentAttributeBag $attributes): WireEntangleConfig
    {
        $wireModel = $attributes->wire('model')->value() ?? null;
        $isLive = $wireModel && $attributes->wire('model')->hasModifier('live');

        return new WireEntangleConfig(
            wireModel: $wireModel,
            isLive: $isLive
        );
    }

    public static function alpineConfig(ComponentAttributeBag $attributes, array $additionalConfig = []): string
    {
        $config = static::fromAttributes($attributes);
        $configParts = [];

        if ($config->hasWireModel()) {
            $configParts[] = "value: \$wire.entangle('{$config->wireModel}', {$config->liveModifier()})";
        }

        foreach ($additionalConfig as $key => $value) {
            $configParts[] = "{$key}: {$value}";
        }

        return implode(', ', $configParts);
    }

    public static function hiddenInputAttributes(ComponentAttributeBag $attributes): ComponentAttributeBag
    {
        return $attributes->only('name');
    }

    public static function filteredAttributes(ComponentAttributeBag $attributes): ComponentAttributeBag
    {
        return $attributes->whereDoesntStartWith('wire:model')->except('name');
    }
}
