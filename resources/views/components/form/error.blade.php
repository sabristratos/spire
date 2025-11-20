@props([
    'name' => null,
    'message' => null,
    'icon' => 'alert-circle',
    'showIcon' => true,
])

@php
use SpireUI\Support\ComponentClass;

$errorMessage = null;

if (isset($slot) && !$slot->isEmpty()) {
    $errorMessage = $slot;
} elseif ($message) {
    $errorMessage = $message;
} elseif ($name && $errors->has($name)) {
    $errorMessage = $errors->first($name);
}

$builder = ComponentClass::make('error');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'data-spire-error' => 'true',
]);
@endphp

@if($errorMessage)
    <p {{ $mergedAttributes }}>
        @if($showIcon)
            <span class="shrink-0 flex">
                @if(isset($iconSlot) && !$iconSlot->isEmpty())
                    {{ $iconSlot }}
                @else
                    <x-spire::icon :name="$icon" class="w-[1em] h-[1em]" />
                @endif
            </span>
        @endif

        <span class="flex-1">
            @if(isset($slot) && !$slot->isEmpty())
                {{ $slot }}
            @else
                {{ $errorMessage }}
            @endif
        </span>
    </p>
@endif
