@props(['showClear' => true, 'showToday' => true])

<div class="spire-calendar-footer">
    @if($showClear)
        <x-spire::button
            type="button"
            variant="ghost"
            size="sm"
            @click="clearSelection"
            x-bind:disabled="!hasSelection"
            x-bind:aria-label="'{{ __('spire::spire-ui.date.clear_selection') }}'"
        >
            {{ __('spire::spire-ui.common.clear') }}
        </x-spire::button>
    @else
        <div></div>
    @endif

    @if($showToday)
        <x-spire::button
            type="button"
            variant="solid"
            size="sm"
            color="primary"
            @click="selectToday"
            x-bind:disabled="isTodayDisabled"
            x-bind:aria-label="'{{ __('spire::spire-ui.date.select_today') }}'"
        >
            {{ __('spire::spire-ui.date.today') }}
        </x-spire::button>
    @endif
</div>
