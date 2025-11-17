<?php

namespace SpireUI\Support;

class ComponentClass
{
    protected array $classes = [];

    protected array $dataAttributes = [];

    public function __construct(protected string $component)
    {
        $this->classes[] = "spire-{$component}";
    }

    public static function make(string $component): self
    {
        return new self($component);
    }

    public function size(string $size): self
    {
        $this->classes[] = "spire-{$this->component}--{$size}";
        $this->dataAttributes['data-spire-size'] = $size;

        return $this;
    }

    public function variant(string $variant): self
    {
        $this->classes[] = "spire-{$this->component}--{$variant}";
        $this->dataAttributes['data-spire-variant'] = $variant;

        return $this;
    }

    public function color(string $color): self
    {
        $this->classes[] = "spire-{$this->component}--{$color}";
        $this->dataAttributes['data-spire-color'] = $color;

        return $this;
    }

    public function colorVariant(string $color, string $variant): self
    {
        $this->classes[] = "spire-{$this->component}--{$color}-{$variant}";
        $this->dataAttributes['data-spire-color'] = $color;
        $this->dataAttributes['data-spire-variant'] = $variant;

        return $this;
    }

    public function modifier(string $modifier): self
    {
        $this->classes[] = "spire-{$this->component}--{$modifier}";

        return $this;
    }

    public function radius(string $radius): self
    {
        $class = ComponentStyles::radiusClasses($radius);

        if ($class) {
            $this->classes[] = $class;
        }

        return $this;
    }

    public function shadow(string $shadow): self
    {
        $class = ComponentStyles::shadowClasses($shadow);

        if ($class) {
            $this->classes[] = $class;
        }

        return $this;
    }

    public function addClasses(string ...$classes): self
    {
        $this->classes = array_merge($this->classes, array_filter($classes));

        return $this;
    }

    public function addClass(string $class): self
    {
        $this->classes[] = $class;

        return $this;
    }

    public function when(?bool $condition, callable $callback): self
    {
        if ($condition) {
            $callback($this);
        }

        return $this;
    }

    public function addIf(?bool $condition, string ...$classes): self
    {
        if ($condition) {
            $this->classes = array_merge($this->classes, array_filter($classes));
        }

        return $this;
    }

    public function unless(?bool $condition, callable $callback): self
    {
        if (! $condition) {
            $callback($this);
        }

        return $this;
    }

    public function dataAttribute(string $key, mixed $value): self
    {
        if ($value !== null) {
            $this->dataAttributes["data-spire-{$key}"] = $value;
        }

        return $this;
    }

    public function getDataAttributes(): array
    {
        return $this->dataAttributes;
    }

    public function build(): string
    {
        return implode(' ', array_filter(array_unique($this->classes)));
    }

    public function toArray(): array
    {
        return array_values(array_filter(array_unique($this->classes)));
    }
}
