<?php

namespace SpireUI\Support;

class WireEntangleConfig
{
    public function __construct(
        public readonly ?string $wireModel = null,
        public readonly bool $isLive = false,
    ) {}

    public function hasWireModel(): bool
    {
        return $this->wireModel !== null && $this->wireModel !== '';
    }

    public function liveModifier(): string
    {
        return $this->isLive ? 'true' : 'false';
    }

    public function needsHiddenInput(): bool
    {
        return ! $this->hasWireModel();
    }
}
