@props([
    'name' => null,
    'message' => null,
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
        @if(isset($slot) && !$slot->isEmpty())
            {{ $slot }}
        @else
            {{ $errorMessage }}
        @endif
    </p>
@endif
