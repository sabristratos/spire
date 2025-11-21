@props([
    'url' => null,
    'title' => '',
    'platforms' => ['facebook', 'x', 'linkedin', 'whatsapp', 'email', 'reddit', 'telegram', 'pinterest', 'native'],
    'iconOnly' => true,
    'size' => 'md',
    'variant' => 'ghost',
    'color' => 'default',
    'radius' => 'md',
    'gap' => 'gap-1',
])

@php
    use SpireUI\Support\ComponentClass;

    $shareUrl = $url ?? request()->url();

    $builder = ComponentClass::make('social-share')
        ->size($size)
        ->radius($radius);

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build() . ' flex flex-wrap items-center ' . $gap,
        ...$builder->getDataAttributes(),
    ]);
@endphp

<div {{ $mergedAttributes }}>
    @foreach($platforms as $platform)
        <x-spire::social-share.button
            :platform="$platform"
            :url="$shareUrl"
            :title="$title"
            :icon-only="$iconOnly"
            :size="$size"
            :variant="$variant"
            :color="$color"
            :radius="$radius"
        />
    @endforeach
</div>
