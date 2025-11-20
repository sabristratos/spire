@php
$message = $message ?? __('spire-ui::spire-ui.table.empty_message');
$iconName = $iconName ?? 'clipboard-x';
@endphp

<div class="spire-table-empty-state" role="status" {{ $attributes }}>
    @if(isset($icon))
        {{ $icon }}
    @else
        <x-spire::icon :name="$iconName" class="spire-table-empty-icon" />
    @endif

    <p class="spire-table-empty-message">
        {{ $slot->isEmpty() ? $message : $slot }}
    </p>
</div>
