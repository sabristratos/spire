@php
$rows = $rows ?? 5;
@endphp

<div class="spire-table-loading-state" role="status" aria-label="{{ __('spire-ui::spire-ui.table.loading') }}" {{ $attributes }}>
    @if(isset($slot) && !$slot->isEmpty())
        {{ $slot }}
    @else
        <div class="spire-table-loading-skeleton">
            @for($i = 0; $i < $rows; $i++)
                <div class="spire-table-loading-skeleton-row"></div>
            @endfor
        </div>
    @endif
</div>
