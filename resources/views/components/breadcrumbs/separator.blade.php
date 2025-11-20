@props([
    'icon' => 'chevron-right',
    'text' => null,
])

<span
    class="spire-breadcrumbs__separator"
    aria-hidden="true"
    data-spire-breadcrumb-separator
    {{ $attributes }}
>
    @if($text)
        <span class="spire-breadcrumbs__separator-text">{{ $text }}</span>
    @elseif($icon)
        <x-spire::icon :name="$icon" class="spire-breadcrumbs__separator-icon" />
    @endif
</span>
