@props([
    'name' => null,
    'message' => null,
    'icon' => 'alert-circle',
    'showIcon' => true,
])

@php
use SpireUI\Support\ComponentStyles;

$errorMessage = null;

if (isset($slot) && !$slot->isEmpty()) {
    $errorMessage = $slot;
} elseif ($message) {
    $errorMessage = $message;
} elseif ($name && $errors->has($name)) {
    $errorMessage = $errors->first($name);
}

$classString = ComponentStyles::buildClassString([
    'flex',
    'items-center',
    'gap-1.5',
    'text-sm',
    'text-error',
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
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
