@props(['preset'])

<button
    type="button"
    @click="selectPreset({{ json_encode($preset) }})"
    x-bind:aria-label="`{{ __('spire::spire-ui.date.select') }} ${{{ json_encode($preset['label']) }}}`"
    :data-spire-active="isPresetActive({{ json_encode($preset) }}) ? 'true' : null"
    class="px-2.5 py-1.5 text-xs text-left rounded transition-colors text-text hover:bg-hover focus-visible:outline-2 focus-visible:outline-primary data-[spire-active=true]:bg-primary/10 data-[spire-active=true]:text-primary data-[spire-active=true]:font-medium"
>
    {{ $preset['label'] }}
</button>
