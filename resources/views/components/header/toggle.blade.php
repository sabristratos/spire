@props([
    'icon' => 'bars-2',
    'target' => null,
    'mobile' => true,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('header-toggle');

if ($target) {
    $eventName = $mobile ? 'sidebar-open-mobile' : 'sidebar-toggle';
    $clickHandler = "document.getElementById('{$target}')?.dispatchEvent(new CustomEvent('{$eventName}'))";
} else {
    $eventName = $mobile ? 'spire-sidebar-open-mobile' : 'spire-sidebar-toggle';
    $clickHandler = "window.dispatchEvent(new CustomEvent('{$eventName}'))";
}
@endphp

<button
    type="button"
    x-data
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-on:click="{{ $clickHandler }}"
    aria-label="{{ __('spire::spire-ui.header.toggle_menu') }}"
    data-spire-header-toggle
>
    <x-spire::icon :name="$icon" class="spire-header-toggle-icon" />
</button>
