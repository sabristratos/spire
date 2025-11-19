@props([
    'target' => null,
    'mobile' => false,
])

@php
if ($target) {
    $eventName = $mobile ? 'sidebar-open-mobile' : 'sidebar-toggle';
    $clickHandler = "document.getElementById('{$target}')?.dispatchEvent(new CustomEvent('{$eventName}'))";
} else {
    $eventName = $mobile ? 'spire-sidebar-open-mobile' : 'spire-sidebar-toggle';
    $clickHandler = "window.dispatchEvent(new CustomEvent('{$eventName}'))";
}
@endphp

<button
    {{ $attributes->merge(['class' => 'spire-sidebar-toggle']) }}
    type="button"
    x-on:click="{{ $clickHandler }}"
    aria-label="{{ $mobile ? __('spire-ui::sidebar.menu') : __('spire-ui::sidebar.toggle') }}"
>
    @if($slot->isEmpty())
        @if($mobile)
            <x-spire::icon name="menu" class="w-5 h-5" />
        @else
            <x-spire::icon name="panel-left" class="w-5 h-5" />
        @endif
    @else
        {{ $slot }}
    @endif
</button>
